"""Keyword + naive-Bayes domain classifier (no imports from this package, so tools/domains/check.py can load it alone).
See __init__.py for the taxonomy format."""
import math
import re
from collections import Counter, defaultdict


def _compile(kw):
    if kw.startswith('re:'):
        return re.compile(kw[3:], re.I)
    body = re.escape(kw.lower()).replace(r'\ ', r'[\s-]+').replace(r'\*', '[a-z0-9]*')   # "*" = any word ending
    return re.compile(r'(?<![a-z0-9])' + body + r'(?![a-z0-9])', re.I)


_CACHE = {}


def _patterns(tax):
    key = id(tax)
    if key not in _CACHE:
        _CACHE[key] = [(d['id'], [(_compile(k), max(1, len(k.split()))) for k in d['kw']]) for d in tax['domains']]
    return _CACHE[key]


def _texts(q):
    if q.get('kind') == 'lab':
        return q['task'], '', ''
    right = ' \n '.join(o['t'] for o in q['options'] if o['k'] in q['answer'])
    wrong = ' \n '.join(o['t'] for o in q['options'] if o['k'] not in q['answer'])
    return q['q'], right, wrong


def keyword_scores(tax, q):
    stem, right, wrong = _texts(q)
    out = {}
    for did, pats in _patterns(tax):
        s = 0.0
        for rx, w in pats:
            s += w * (2 * min(2, len(rx.findall(stem))) + 1.5 * min(1, len(rx.findall(right))) + 0.5 * min(1, len(rx.findall(wrong))))
        out[did] = s
    return out


def hinted(tax, q):
    rules = tax.get('hints', [])
    keys = list(q.get('sources', [q['id']])) + ([f"hint={q['hint']}"] if q.get('hint') else [])
    for rx, did in rules:
        if any(re.search(rx, k, re.I) for k in keys):
            return did
    return None


def _tokens(q):
    stem, right, wrong = _texts(q)
    w = re.findall(r'[a-z][a-z0-9]+', (stem + ' ' + right).lower())
    return w + [a + '_' + b for a, b in zip(w, w[1:])]


class _NB:
    def __init__(self, docs, labels, ids):
        self.ids = ids
        self.prior = Counter(labels)
        self.counts = defaultdict(Counter)
        for toks, lab in zip(docs, labels):
            self.counts[lab].update(set(toks))
        self.total = {d: sum(self.counts[d].values()) for d in ids}
        self.vocab = len({t for c in self.counts.values() for t in c}) or 1

    def posterior(self, toks):
        n = sum(self.prior.values()) or 1
        lp = {}
        for d in self.ids:
            s = math.log((self.prior[d] + 1) / (n + len(self.ids)))
            c, tot = self.counts[d], self.total[d]
            for t in set(toks):
                s += math.log((c[t] + 1) / (tot + self.vocab))
            lp[d] = s
        m = max(lp.values())
        z = sum(math.exp(v - m) for v in lp.values())
        return {d: math.exp(v - m) / z for d, v in lp.items()}


def classify(tax, questions, use_hints=True):
    """Set q['domain'] on every question; returns {'hint': n, 'keyword': n, 'model': n} (how each one was placed)."""
    ids = [d['id'] for d in tax['domains']]
    how, scores, sure = Counter(), {}, {}
    for q in questions:
        h = hinted(tax, q) if use_hints else None
        if h:
            sure[q['id']] = h; how['hint'] += 1; continue
        sc = keyword_scores(tax, q)
        scores[q['id']] = sc
        top = sorted(sc.values(), reverse=True)
        best = max(sc, key=sc.get)
        if top[0] >= 2 and top[0] >= 1.5 * top[1]:
            sure[q['id']] = best
    by_id = {q['id']: q for q in questions}
    labelled = [i for i in sure if i not in scores]
    if len(labelled) >= 100:                          # enough source labels: let the model trained on them decide the rest
        for i in [i for i in sure if i in scores]:
            del sure[i]
    how['keyword'] = sum(1 for i in sure if i in scores)
    train = [(by_id[i], d) for i, d in sure.items()]
    nb = _NB([_tokens(q) for q, _ in train], [d for _, d in train], ids) if train else None
    for q in questions:
        if q['id'] in sure:
            q['domain'] = sure[q['id']]; continue
        sc = scores[q['id']]
        tot = sum(sc.values())
        post = nb.posterior(_tokens(q)) if nb else {d: 0 for d in ids}
        mix = {d: post[d] + (sc[d] / tot if tot else 0) for d in ids}
        q['domain'] = max(mix, key=mix.get); how['model'] += 1
    return dict(how)


def meta(t, questions):
    """Domain list for data/index.js: [{id, name, weight, count}], plus guide/note."""
    c = Counter(q.get('domain') for q in questions)
    total = sum(d['weight'] for d in t['domains'])
    return {'guide': t['guide'], **({'note': t['note']} if t.get('note') else {}),
            'domains': [{'id': d['id'], 'name': d['name'], 'weight': round(100 * d['weight'] / total, 1), 'count': c[d['id']]} for d in t['domains']]}


def evaluate(tax, questions, folds=5):
    """How well the classifier matches the questions whose source labels their domain.
    Returns {'keywords': (n, correct), 'cv': (n, correct), 'confusion': Counter[(expected, got)]}:
      keywords  classifier run with no source labels at all (what exams without labelled sources get)
      cv        k-fold: each fold's labels hidden, the other folds' labels used (what unlabelled items of a partly labelled exam get)
    """
    gold = {q['id']: hinted(tax, q) for q in questions}
    gold = {k: v for k, v in gold.items() if v}
    if not gold:
        return None
    copies = [dict(q) for q in questions]
    classify(tax, copies, use_hints=False)
    got = {q['id']: q['domain'] for q in copies}
    conf = Counter((gold[i], got[i]) for i in gold)
    kw = (len(gold), sum(v for (a, b), v in conf.items() if a == b))
    order = sorted(gold)
    ok = 0
    for f in range(folds):
        hide = set(order[f::folds])
        copies = []
        for q in questions:
            c = dict(q)
            if c['id'] in hide:
                c.pop('hint', None); c['sources'] = ['?']
            copies.append(c)
        classify(tax, copies)
        ok += sum(1 for c in copies if c['id'] in hide and c['domain'] == gold[c['id']])
    return {'keywords': kw, 'cv': (len(gold), ok), 'confusion': conf}
