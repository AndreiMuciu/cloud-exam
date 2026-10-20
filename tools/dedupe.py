"""Near-duplicate detection for question banks.

The exact key in build_banks.qkey only catches questions whose text is identical once punctuation is dropped.
The sources also repeat the same question with small editorial changes: "(Select TWO)" suffixes, curly vs straight
quotes, image placeholders ("[Imagen]: 32_assets/img_001.png"), singular/plural typos ("customer" vs "customers").

Two questions are the same when, after the normalisation below, they have
  * the same stem (articles and noise phrases removed, light plural stemming; short stems also need the same
    symbols and mostly the same option words), or
  * the same option set and stems that differ only by up to two single-word typos (character similarity >= 0.8)
    or, for long stems, up to two dropped words that are not negations/qualifiers/numbers.
Questions whose text is in two different images are never merged. A word difference that is only a digit ("User1" vs "User2", "VM1" vs "VM3") or a different word ("public" vs
"private") is never a typo, so Microsoft "series" items and scenario variants stay separate.
"""
import difflib
import re

STOP = {'a', 'an', 'the'}          # only articles: "to"/"from", "can"/"cannot" change the meaning
NOISE = [
    r'\[question \d+\]\([^)]*\)', r'\[imagen\]:\s*\S+', r'!\[[^\]]*\]\([^)]*\)', r'https?://\S+',
    r'\((?:select|choose|pick) (?:two|three|four|2|3|4)[^)]*\)', r'\b(?:select|choose|pick) (?:two|three|four|2|3|4)(?: answers?| options?| responses?)?\b',
    r'each correct answer presents (?:a )?(?:complete|part of the) solution', r'note:? each correct selection is worth one point',
]


def words(text):
    t = text.lower().replace('’', "'").replace('‘', "'").replace('“', '"').replace('”', '"')
    for n in NOISE:
        t = re.sub(n, ' ', t)
    out = []
    for w in re.findall(r'[a-z0-9]+', t):
        if w in STOP:
            continue
        if len(w) > 3 and w.endswith('s') and not w.endswith('ss'):
            w = w[:-1]
        out.append(w)
    return out


def opt_key(options):
    return frozenset(' '.join(words(o)) for o in options)


def stem_key(text):
    """Joined without spaces, like build_banks.qkey, so "user name" and "username" collide.
    Short stems keep their symbols: "What does the ~ symbol represent" is not "What does the + symbol represent"."""
    k = ''.join(words(text))
    if is_short(text):
        k += '|' + ''.join(re.findall(r'[~+*=<>#$%&|^@!]', text))
    return k


def is_short(text):
    """Short/generic stems ("Which statement is true?") are only the same question when the options agree too."""
    return len(''.join(words(text))) < 55


def opt_overlap(a, b):
    wa = {w for o in a for w in words(o)}
    wb = {w for o in b for w in words(o)}
    return len(wa & wb) / max(1, len(wa | wb))


def source(q):
    return q['id'].split(':')[0]


def images(q):
    t = q.get('q', '')
    refs = set(re.findall(r'\]\(((?:images?/)?[^)\s]+\.(?:png|jpe?g|gif|svg))\)', t, re.I))
    refs |= set(re.findall(r'\[Imagen\]:\s*(\S+)', t))
    if q.get('img'):
        refs.add(q['img'])
    return refs


def compatible(a, b):
    """a, b share a stem key (or are typo variants): reject pairs that only look alike."""
    ia, ib = images(a), images(b)
    if ia and ib and ia != ib and source(a) == source(b):   # Ditectrev puts the real question (table, chart) in a per-item image
        return False
    if is_short(a['q']) or is_short(b['q']):
        return opt_overlap([o['t'] for o in a['options']], [o['t'] for o in b['options']]) >= 0.8
    return True


def _typo(a, b):
    if re.sub(r'\d', '', a) == re.sub(r'\d', '', b):  # differ only by digits: User1/User2 -> different question
        return False
    if a[:-1] == b[:-1] or a.startswith(b) or b.startswith(a):  # VNETA/VNET2, UserA/User1, Computer/Computer1
        return False
    return min(len(a), len(b)) >= 4 and difflib.SequenceMatcher(None, a, b).ratio() >= 0.8


KEEP = {'not', 'no', 'never', 'cannot', 'except', 'least', 'most', 'without', 'only', 'all', 'none'}


def near_same(wa, wb):
    """wa, wb: word lists from words(). True when they differ by at most two single-word typos, or (long stems only)
    by up to two dropped words that do not change the meaning ("A company has ..." cut off by a scraper)."""
    if len(wa) < 8 or len(wb) < 8:
        return False
    diffs = 0
    for tag, i1, i2, j1, j2 in difflib.SequenceMatcher(None, wa, wb, autojunk=False).get_opcodes():
        if tag == 'equal':
            continue
        if tag in ('insert', 'delete'):
            gap = wa[i1:i2] + wb[j1:j2]
            if min(len(wa), len(wb)) < 15 or KEEP & set(gap) or any(re.search(r'\d', g) for g in gap):
                return False
            diffs += len(gap)
            continue
        if i2 - i1 != j2 - j1:
            return False
        for a, b in zip(wa[i1:i2], wb[j1:j2]):
            if not _typo(a, b):
                return False
            diffs += 1
    return 0 < diffs <= 2
