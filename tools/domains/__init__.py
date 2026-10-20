"""Exam domains (the vendor's "content outline") and a classifier that puts every question in one of them.

Each exam guide splits the exam into domains with a weight, e.g. CLF-C02: Cloud Concepts 24 %, Security and
Compliance 30 %, Cloud Technology and Services 34 %, Billing, Pricing and Support 12 %. The simulator draws an exam's
questions per domain in those proportions, so the taxonomy lives here and every question gets a `domain` id.

Taxonomy per exam (see aws.py, azure.py, other.py):
    'guide'    where the domains/weights come from (exam guide / study guide and its version)
    'note'     optional caveat shown in the app (e.g. weights not published by the vendor)
    'domains'  [{'id', 'name', 'weight', 'kw': [keyword, ...]}, ...]   weights are percentages; ranges use the midpoint
    'hints'    [(regex, domain id), ...] matched against "<source id>" and "hint=<source label>" of every occurrence:
               the source's own domain label wins over the keyword score.

Keywords: plain lowercase phrases matched on word boundaries; "*" matches the rest of a word ("polic*", "team* must"); "re:<regex>" is a raw regex.
Every keyword hit scores its number of words (so "secrets manager" beats "manager"): x2 in the question stem,
x1.5 in a correct option, x0.5 in another option. When the best domain is not clearly ahead, a naive-Bayes model
trained on the confidently placed questions of the same exam decides.
"""
from . import aws, azure, other
from .classifier import classify, evaluate, meta  # noqa: F401

TAXONOMY = {**aws.EXAMS, **azure.EXAMS, **other.EXAMS}
