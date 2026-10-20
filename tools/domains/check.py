#!/usr/bin/env python3
"""Inspect the domain classification of one exam without running the whole build.

    python3 tools/build_banks.py --offline --dump-raw /tmp/raw     # once: merged banks with source labels
    python3 tools/domains/check.py /tmp/raw aws SAA-C03            # vendor module: aws | azure | other
    python3 tools/domains/check.py /tmp/raw aws SAA-C03 --samples 8 --domain cost

Loads only classifier.py and the one vendor module, so a half-edited sibling module does not break it.
Prints per-domain counts against the exam-guide weights, how items were placed, accuracy against source labels
(when a source labels domains) and random sample stems per domain to eyeball.
"""
import argparse
import importlib.util
import json
import os
import random
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))


def load(name):
    spec = importlib.util.spec_from_file_location(name, os.path.join(HERE, f'{name}.py'))
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('raw'); ap.add_argument('vendor'); ap.add_argument('code')
    ap.add_argument('--samples', type=int, default=5); ap.add_argument('--domain'); ap.add_argument('--seed', type=int, default=1)
    a = ap.parse_args()
    clf, tax = load('classifier'), load(a.vendor).EXAMS[a.code]
    qs = json.load(open(os.path.join(a.raw, f'{a.code}.json')))
    ev = clf.evaluate(tax, [dict(q) for q in qs])
    how = clf.classify(tax, qs)
    c = Counter(q['domain'] for q in qs)
    tw = sum(d['weight'] for d in tax['domains'])
    print(f'{a.code}: {len(qs)} items, placed by {how}')
    if ev:
        (n, k), (_, cv) = ev['keywords'], ev['cv']
        print(f'source labels n={n}: keywords-only {100 * k / n:.0f}%, 5-fold {100 * cv / n:.0f}%')
        print('  top keyword confusions (expected -> got):', [(x, y, m) for (x, y), m in ev['confusion'].most_common() if x != y][:6])
    for d in tax['domains']:
        print(f"  {d['id']:14} guide {100 * d['weight'] / tw:5.1f}%   bank {100 * c[d['id']] / len(qs):5.1f}%  ({c[d['id']]})  {d['name']}")
    rnd = random.Random(a.seed)
    for d in tax['domains']:
        if a.domain and d['id'] != a.domain:
            continue
        items = [q for q in qs if q['domain'] == d['id']]
        print(f"\n== {d['id']} ({len(items)})")
        for q in rnd.sample(items, min(a.samples, len(items))):
            stem = (q.get('q') or q.get('task') or '').replace('\n', ' ')
            print(f"  [{q['id']}] {stem[-170:]}")


if __name__ == '__main__':
    main()
