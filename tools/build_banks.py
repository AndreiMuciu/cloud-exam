#!/usr/bin/env python3
"""Build the question banks for the AWS exam simulator.

Downloads every public source, normalises it to one schema, merges duplicates
per exam and writes  ../data/<EXAM-CODE>.js  plus  ../data/index.js.

    python3 tools/build_banks.py            # download + build everything
    python3 tools/build_banks.py --offline  # reuse files already in tools/cache/

Question schema (one object per question):
    id           "<source-prefix>:<source-id>"        stable, unique inside an exam
    sources      ["kn:14-19", "dt:87"]                 every place the same question was found
    q            question text (may contain \n)
    img          optional absolute image URL shown under the question
    options      [{"k": "A", "t": "..."}, ...]
    answer       ["B"] or ["A", "C"]
    multi        true when more than one answer is expected
    explanation  URL or plain text, or null
"""
import argparse
import html
import json
import os
import re
import sys
import urllib.request
import io
import subprocess
import tarfile
from collections import Counter

HERE = os.path.dirname(os.path.abspath(__file__))
CACHE = os.path.join(HERE, 'cache')
OUT = os.path.normpath(os.path.join(HERE, '..', 'data'))

# --------------------------------------------------------------------------- sources
KN = 'https://raw.githubusercontent.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes/master/practice-exam/practice-exam-{n}.md'
DT = 'https://raw.githubusercontent.com/Ditectrev/{repo}/main/README.md'
CC = 'https://raw.githubusercontent.com/nastaso/cloudcertprep/main/src/data/{path}.json'
JX = 'https://raw.githubusercontent.com/Jeffrey-Xu/aws-sap-c02-exam-app/main/public/data/questions.json'

DITECTREV = {
    'CLF-C02': 'Amazon-Web-Services-AWS-Certified-Cloud-Practitioner-CLF-C02-Practice-Tests-Exams-Questions-Answers',
    'SAA-C03': 'AWS-Certified-Solutions-Architect-Associate-SAA-C03-Practice-Tests-Exams-Questions-Answers',
    'DVA-C02': 'Amazon-Web-Services-AWS-Developer-Associate-DVA-C02-Practice-Tests-Exams-Questions-Answers',
    'SOA-C03': 'AWS-Certified-CloudOps-Engineer-Associate-SOA-C03-Practice-Tests-Exams-Questions-Answers',
    'SCS-C02': 'Amazon-Web-Services-Certified-AWS-Certified-Security-Specialty-SCS-C02-Practice-Tests-Exams-Question',
    'ANS-C01': 'Amazon-Web-Services-Certified-AWS-Certified-Advanced-Networking-Specialty-ANS-C01-Practice-Test-Exam',
    'MLS-C01': 'Amazon-Web-Services-Certified-AWS-Certified-Machine-Learning-MLS-C01-Practice-Tests-Exams-Question',
    'DAS-C01': 'Amazon-Web-Services-Certified-AWS-Certified-Data-Analytics-DAS-C01-Practice-Tests-Exams-Question',
    'DBS-C01': 'Amazon-Web-Services-Certified-AWS-Certified-Database-DBS-C01-Practice-Tests-Exams-Questions-Answers',
    # Microsoft Azure
    'AZ-900': 'Microsoft-Azure-AZ-900-Microsoft-Azure-Fundamentals-Practice-Tests-Exams-Questions-Answers',
    'AZ-104': 'Microsoft-Azure-AZ-104-Microsoft-Azure-Administrator-Practice-Tests-Exams-Questions-Answers',
    'AZ-204': 'Microsoft-Azure-AZ-204-Developing-Solutions-for-Microsoft-Azure-Practice-Tests-Exams-Question-Answer',
    'AZ-305': 'Microsoft-Azure-AZ-305-Designing-Microsoft-Azure-Infrastructure-Solutions-Practice-Tests-Exams-QA',
    'AZ-400': 'Microsoft-Azure-AZ-400-Designing-and-Implementing-Microsoft-DevOps-Solutions-Practice-Tests-Exams-QA',
    'AZ-500': 'Microsoft-Azure-AZ-500-Azure-Security-Engineer-Practice-Tests-Exams-Questions-Answers',
    'AZ-800': 'Microsoft-Azure-AZ-800-Windows-Server-Hybrid-Administrator-Practice-Tests-Exams-Questions-Answers',
    'SC-900': 'Microsoft-SC-900-Microsoft-Security-Compliance-and-Identity-Fundamentals-Practice-Tests-Exams-QA',
    'DP-900': 'DP-900',
    'DP-203': 'DP-203',
    # Google Cloud
    'GCP-ACE': 'Google-Cloud-Platform-GCP-Associate-Cloud-Engineer-Practice-Tests-Exams-Questions-Answers',
}

# Kubernetes / Terraform sources
NOSA = 'https://raw.githubusercontent.com/nosadaniel/kcna_cert_demo_quiz/main/kcna_questions_answers.js'
MEIB = 'https://raw.githubusercontent.com/meibraransari/kcna-playground/main/data/questionSets/questionSet{n}.json'
MSAHIHI = 'https://raw.githubusercontent.com/msahihi/{repo}/main/mock-questions/mock-exam-set-{n}.md'
SONUK = 'https://raw.githubusercontent.com/sonukkushwaha0801/Terraform-associate-004-exam-prep/main/{dir}/Domain-{n}-Practice-Questions{suffix}.md'
SONUK_DIRS = ['01-Infrastructure-as-Code-IaC-with-Terraform', '02-Terraform-Fundamentals', '03-Core-Terraform-Workflow',
              '04-Terraform-Configuration', '05-Terraform-Modules', '06-Terraform-State-Management',
              '07-Maintain-Infrastructure-with-Terraform', '08-HCP-Terraform']
IBUTCAT = 'https://raw.githubusercontent.com/iButcat/terraform-associate-practice/main/sample-questions.md'

SOURCES_META = {
    'kn': {'name': 'kananinirav', 'url': 'https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes', 'license': 'MIT'},
    'dt': {'name': 'Ditectrev', 'url': 'https://github.com/Ditectrev', 'license': 'no license file (public README, commercial product) - personal use only'},
    'cc': {'name': 'cloudcertprep', 'url': 'https://github.com/nastaso/cloudcertprep', 'license': 'MIT'},
    'jx': {'name': 'Jeffrey-Xu/aws-sap-c02-exam-app', 'url': 'https://github.com/Jeffrey-Xu/aws-sap-c02-exam-app', 'license': 'MIT'},
    'nd': {'name': 'nosadaniel/kcna_cert_demo_quiz', 'url': 'https://github.com/nosadaniel/kcna_cert_demo_quiz', 'license': 'MIT'},
    'mb': {'name': 'meibraransari/kcna-playground', 'url': 'https://github.com/meibraransari/kcna-playground', 'license': 'Apache-2.0 (large, likely AI-generated set)'},
    'ms': {'name': 'msahihi study guides', 'url': 'https://github.com/msahihi', 'license': 'MIT'},
    'sk': {'name': 'sonukkushwaha0801/Terraform-associate-004-exam-prep', 'url': 'https://github.com/sonukkushwaha0801/Terraform-associate-004-exam-prep', 'license': 'no license file - personal use only'},
    'ib': {'name': 'iButcat/terraform-associate-practice', 'url': 'https://github.com/iButcat/terraform-associate-practice', 'license': 'MIT'},
    'qp': {'name': 'quizplay-io', 'url': 'https://github.com/quizplay-io', 'license': 'AGPL-3.0 (36 "original" questions per set)'},
    'ks': {'name': 'kiran-saikia/AWS--MLS-C01--studypack', 'url': 'https://github.com/kiran-saikia/AWS--MLS-C01--studypack', 'license': 'CC BY-NC-SA 4.0'},
    'cr': {'name': 'calvinrodrigues500/gcp-ace-practice-questions', 'url': 'https://github.com/calvinrodrigues500/gcp-ace-practice-questions', 'license': 'MIT'},
    'sw': {'name': 'slackwero/google-GCP-associate-cloud-engineer-exam-prep', 'url': 'https://github.com/slackwero/google-GCP-associate-cloud-engineer-exam-prep', 'license': 'MIT (large bilingual course bank, likely AI-generated)'},
    'mm': {'name': 'martinmichelca/az305-prep', 'url': 'https://github.com/martinmichelca/az305-prep', 'license': 'no license file - personal use only'},
    'tl': {'name': 'tuladhar/kcsa-quiz', 'url': 'https://github.com/tuladhar/kcsa-quiz', 'license': 'no license file - personal use only'},
    'zt': {'name': 'ziyad-tarek1/CKA-Exam-Practice-Questions', 'url': 'https://github.com/ziyad-tarek1/CKA-Exam-Practice-Questions', 'license': 'MIT'},
    'tw': {'name': 'techwithmohamed/CKA-Certified-Kubernetes-Administrator', 'url': 'https://github.com/techwithmohamed/CKA-Certified-Kubernetes-Administrator', 'license': 'MIT'},
    'cm': {'name': 'chadmcrowell/CKA-Exercises', 'url': 'https://github.com/chadmcrowell/CKA-Exercises', 'license': 'no license file - personal use only'},
    'aj': {'name': 'alijahnas/CKA-practice-exercises', 'url': 'https://github.com/alijahnas/CKA-practice-exercises', 'license': 'GPL-3.0'},
    'cj': {'name': 'chojuninengu/terraform-associate-practice-exam', 'url': 'https://github.com/chojuninengu/terraform-associate-practice-exam', 'license': 'no license file; content matches a paid Udemy practice test - personal study only'},
    'ir': {'name': 'iamirtasam/AWS-AI-Practitioner-Exam-Mock', 'url': 'https://github.com/iamirtasam/AWS-AI-Practitioner-Exam-Mock', 'license': 'MIT'},
    'dl': {'name': 'darlantls/aif-c01-practice-exam', 'url': 'https://github.com/darlantls/aif-c01-practice-exam', 'license': 'no license file - personal use only'},
    'am': {'name': 'AfsalMadathingal/aws-aif-c01-practice-test', 'url': 'https://github.com/AfsalMadathingal/aws-aif-c01-practice-test', 'license': 'no license file - personal use only'},
    'lj': {'name': 'LinanJ11/dea-c01-study', 'url': 'https://github.com/LinanJ11/dea-c01-study', 'license': 'no license file (exam-dump style, Chinese explanations dropped) - personal use only'},
    'aa': {'name': 'ahmedasmar/aws-certified-devops-pro-exam-prep', 'url': 'https://github.com/ahmedasmar/aws-certified-devops-pro-exam-prep', 'license': 'no license file - personal use only'},
    'rx': {'name': 'r3xakead0/aws-sap-c02-simulator', 'url': 'https://github.com/r3xakead0/aws-sap-c02-simulator', 'license': 'MIT (questions scraped from ExamTopics discussions, community answers)'},
    'tk': {'name': 'tuladhar/kcna-quiz', 'url': 'https://github.com/tuladhar/kcna-quiz', 'license': 'no license file - personal use only'},
    'ty': {'name': 'therayy/Vault-Associate', 'url': 'https://github.com/therayy/Vault-Associate', 'license': 'no license file - personal use only'},
    'fp': {'name': 'fphilippon/terraform-pro-cert-prep', 'url': 'https://github.com/fphilippon/terraform-pro-cert-prep', 'license': 'Apache-2.0'},
    'dh': {'name': 'devopshubproject/cka-lab', 'url': 'https://github.com/devopshubproject/cka-lab', 'license': 'no license file - personal use only'},
}

QUIZPLAY_SETS = {'AZ-900': 3, 'AZ-104': 3, 'AZ-204': 1, 'AZ-305': 3, 'AZ-500': 1, 'AZ-800': 1, 'SC-900': 3, 'DP-900': 3, 'AZ-700': 1, 'SC-300': 1, 'AI-200': 3, 'SC-500': 3, 'AI-103': 1}
CHOJ = 'https://raw.githubusercontent.com/chojuninengu/terraform-associate-practice-exam/main/processed-exams/terraform-practice-exam-{n}.md'
IRTASAM = 'https://raw.githubusercontent.com/iamirtasam/AWS-AI-Practitioner-Exam-Mock/main/data/{f}.js'
IRTASAM_FILES = ['qb-1-1', 'qb-1-2', 'qb-1-3', 'qb-2-1', 'qb-2-2', 'qb-2-3', 'qb-3-1', 'qb-3-2', 'qb-3-3', 'qb-3-4', 'qb-4-1', 'qb-4-2', 'qb-5-1', 'qb-5-2']
DARLAN = 'https://raw.githubusercontent.com/darlantls/aif-c01-practice-exam/master/aif-c01-simulado.html'
AHMED = 'https://raw.githubusercontent.com/ahmedasmar/aws-certified-devops-pro-exam-prep/main/data/questions.js'
THERAYY = 'https://raw.githubusercontent.com/therayy/Vault-Associate/main/README.md'
THERAYY_IMG = 'https://raw.githubusercontent.com/therayy/Vault-Associate/main/'
TWM_EX = 'https://raw.githubusercontent.com/techwithmohamed/CKA-Certified-Kubernetes-Administrator/main/exercises/{d}/README.md'
KIRAN_Q = 'https://raw.githubusercontent.com/kiran-saikia/AWS--MLS-C01--studypack/main/MLS-C01-Questions.md'
KIRAN_A = 'https://raw.githubusercontent.com/kiran-saikia/AWS--MLS-C01--studypack/main/MLS-C01-Answers.md'
KIRAN_IMG = 'https://raw.githubusercontent.com/kiran-saikia/AWS--MLS-C01--studypack/main/'
CALVIN = 'https://raw.githubusercontent.com/calvinrodrigues500/gcp-ace-practice-questions/main/data.json'
MARTIN = 'https://raw.githubusercontent.com/martinmichelca/az305-prep/main/src/questions.js'
ZIYAD = 'https://raw.githubusercontent.com/ziyad-tarek1/CKA-Exam-Practice-Questions/main/README.md'
TWM = 'https://raw.githubusercontent.com/techwithmohamed/CKA-Certified-Kubernetes-Administrator/main/mock-exams/MOCK-EXAM-0{n}{suffix}.md'
CHAD = 'https://raw.githubusercontent.com/chadmcrowell/CKA-Exercises/main/{f}.md'
CHAD_FILES = ['cluster-architecture', 'networking', 'scheduling', 'storage', 'troubleshooting']
ALI = 'https://raw.githubusercontent.com/alijahnas/CKA-practice-exercises/CKA-v1.27/{f}.md'
ALI_FILES = ['cluster-architecture-installation-configuration', 'workloads-scheduling', 'services-networking', 'storage', 'troubleshooting']

# Official exam parameters from the vendors' exam guides.
#   scoring 'scaled'  -> 100-1000 scale, `pass` is the scaled pass mark (AWS, Microsoft, Google)
#   scoring 'percent' -> plain percentage of scored questions, `passPct` is the pass mark (Linux Foundation, HashiCorp)
# Microsoft does not publish question counts (40-60) or unscored counts; Google/HashiCorp do not publish the pass mark.
EXAMS = {
    'CLF-C02': {'name': 'Cloud Practitioner', 'level': 'Foundational', 'questions': 65, 'minutes': 90, 'unscored': 15, 'pass': 700},
    'AIF-C01': {'name': 'AI Practitioner', 'level': 'Foundational', 'questions': 65, 'minutes': 90, 'unscored': 15, 'pass': 700},
    'SAA-C03': {'name': 'Solutions Architect Associate', 'level': 'Associate', 'questions': 65, 'minutes': 130, 'unscored': 15, 'pass': 720},
    'DVA-C02': {'name': 'Developer Associate', 'level': 'Associate', 'questions': 65, 'minutes': 130, 'unscored': 15, 'pass': 720},
    'SOA-C03': {'name': 'CloudOps Engineer Associate', 'level': 'Associate', 'questions': 65, 'minutes': 130, 'unscored': 15, 'pass': 720},
    'SAP-C02': {'name': 'Solutions Architect Professional', 'level': 'Professional', 'questions': 75, 'minutes': 180, 'unscored': 10, 'pass': 750},
    'DOP-C02': {'name': 'DevOps Engineer Professional', 'level': 'Professional', 'questions': 75, 'minutes': 180, 'unscored': 10, 'pass': 750},
    'DEA-C01': {'name': 'Data Engineer Associate', 'level': 'Associate', 'questions': 65, 'minutes': 130, 'unscored': 15, 'pass': 720},
    'SCS-C02': {'name': 'Security Specialty', 'level': 'Specialty', 'questions': 65, 'minutes': 170, 'unscored': 15, 'pass': 750},
    'ANS-C01': {'name': 'Advanced Networking Specialty', 'level': 'Specialty', 'questions': 65, 'minutes': 170, 'unscored': 15, 'pass': 750},
    'MLS-C01': {'name': 'Machine Learning Specialty', 'level': 'Specialty', 'questions': 65, 'minutes': 180, 'unscored': 15, 'pass': 750, 'retired': '2025-03-31'},
    'DAS-C01': {'name': 'Data Analytics Specialty', 'level': 'Specialty', 'questions': 65, 'minutes': 180, 'unscored': 15, 'pass': 750, 'retired': '2024-04-09'},
    'DBS-C01': {'name': 'Database Specialty', 'level': 'Specialty', 'questions': 65, 'minutes': 180, 'unscored': 15, 'pass': 750, 'retired': '2024-04-30'},
    # Microsoft Azure (scale 1-1000, pass 700; fundamentals 45 min, role-based 100 min; 40-60 questions)
    'AZ-900': {'vendor': 'Azure', 'name': 'Azure Fundamentals', 'level': 'Foundational', 'questions': 40, 'minutes': 45, 'unscored': 0, 'pass': 700},
    'SC-900': {'vendor': 'Azure', 'name': 'Security, Compliance & Identity Fundamentals', 'level': 'Foundational', 'questions': 40, 'minutes': 45, 'unscored': 0, 'pass': 700},
    'DP-900': {'vendor': 'Azure', 'name': 'Azure Data Fundamentals', 'level': 'Foundational', 'questions': 40, 'minutes': 45, 'unscored': 0, 'pass': 700},
    'AZ-104': {'vendor': 'Azure', 'name': 'Azure Administrator', 'level': 'Associate', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    'AZ-204': {'vendor': 'Azure', 'name': 'Developing Solutions for Azure', 'level': 'Associate', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    'AZ-500': {'vendor': 'Azure', 'name': 'Azure Security Engineer', 'level': 'Associate', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    'AZ-800': {'vendor': 'Azure', 'name': 'Windows Server Hybrid Administrator', 'level': 'Associate', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    'DP-203': {'vendor': 'Azure', 'name': 'Azure Data Engineer', 'level': 'Associate', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700, 'retired': '2025-03-31'},
    'AZ-305': {'vendor': 'Azure', 'name': 'Azure Solutions Architect Expert', 'level': 'Professional', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    'AZ-400': {'vendor': 'Azure', 'name': 'Azure DevOps Engineer Expert', 'level': 'Professional', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    'AZ-700': {'vendor': 'Azure', 'name': 'Azure Network Engineer Associate', 'level': 'Associate', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    'SC-300': {'vendor': 'Azure', 'name': 'Identity and Access Administrator Associate', 'level': 'Associate', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    'AI-200': {'vendor': 'Azure', 'name': 'Developing AI Cloud Solutions on Azure (AZ-204 successor)', 'level': 'Associate', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    'SC-500': {'vendor': 'Azure', 'name': 'End-to-End Security Controls for Cloud and AI Workloads (AZ-500 successor)', 'level': 'Associate', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    'AI-103': {'vendor': 'Azure', 'name': 'Azure AI Apps and Agents Developer (AI-102 successor, beta)', 'level': 'Associate', 'questions': 50, 'minutes': 100, 'unscored': 0, 'pass': 700},
    # Google Cloud (pass mark not published; ~70% is the commonly cited estimate)
    'GCP-ACE': {'vendor': 'GCP', 'name': 'Associate Cloud Engineer', 'level': 'Associate', 'questions': 50, 'minutes': 120, 'unscored': 0, 'pass': 700},
    # Linux Foundation / CNCF (multiple choice ones only; CKA/CKAD/CKS are hands-on and cannot be simulated here)
    'KCNA': {'vendor': 'Kubernetes', 'name': 'Kubernetes and Cloud Native Associate', 'level': 'Foundational', 'questions': 60, 'minutes': 90, 'unscored': 0, 'scoring': 'percent', 'passPct': 75},
    'KCSA': {'vendor': 'Kubernetes', 'name': 'Kubernetes and Cloud Native Security Associate', 'level': 'Foundational', 'questions': 60, 'minutes': 90, 'unscored': 0, 'scoring': 'percent', 'passPct': 75},
    # Hands-on (performance-based) exam: tasks with a reference solution and self-grading, no multiple choice.
    'CKA': {'vendor': 'Kubernetes', 'name': 'Certified Kubernetes Administrator', 'level': 'Associate', 'kind': 'lab', 'questions': 17, 'minutes': 120, 'unscored': 0, 'scoring': 'percent', 'passPct': 66},
    # HashiCorp (pass mark not published; ~70% commonly cited)
    'TF-ASSOC': {'vendor': 'HashiCorp', 'name': 'Terraform Associate (003/004)', 'level': 'Associate', 'questions': 57, 'minutes': 60, 'unscored': 0, 'scoring': 'percent', 'passPct': 70},
    'VAULT-ASSOC': {'vendor': 'HashiCorp', 'name': 'Vault Associate (002)', 'level': 'Associate', 'questions': 60, 'minutes': 60, 'unscored': 0, 'scoring': 'percent', 'passPct': 70},
    # Real exam: 4 hands-on scenarios + 12 multiple choice, 4 h. Only the scenarios are simulated here (local-only Terraform labs).
    'TF-PRO': {'vendor': 'HashiCorp', 'name': 'Terraform Authoring & Operations Professional', 'level': 'Professional', 'kind': 'lab', 'questions': 4, 'minutes': 240, 'unscored': 0, 'scoring': 'percent', 'passPct': 70},
}
for _c, _m in EXAMS.items():
    _m.setdefault('vendor', 'AWS'); _m.setdefault('scoring', 'scaled'); _m.setdefault('kind', 'mcq')

# Known bad items in the sources (verified by hand while building).
SKIP_IDS = {'kn:11-9'}                      # broken option text; kn:20-23 is the same question, intact
FIX_ANSWERS = {'kn:22-25': ['B']}           # source says "BD" for a single-choice question
PREFER_ANSWER_FROM = {}                     # question-key -> id whose answer wins on conflict (default: first seen)

# --------------------------------------------------------------------------- helpers
def fetch(url, name, offline):
    os.makedirs(CACHE, exist_ok=True)
    path = os.path.join(CACHE, name)
    if offline or os.path.exists(path):
        if not os.path.exists(path):
            sys.exit(f'offline and missing cache file {path}')
        return open(path, encoding='utf-8').read()
    print('  fetch', url)
    req = urllib.request.Request(url, headers={'User-Agent': 'aws-exam-sim-build'})
    with urllib.request.urlopen(req, timeout=60) as r:
        data = r.read().decode('utf-8')
    open(path, 'w', encoding='utf-8').write(data)
    return data


def clean_md(s):
    """Strip the little markdown the sources use, keep plain text. Fenced code blocks keep their indentation."""
    code = []
    def stash(m):
        code.append(m.group(1).rstrip('\n'))
        return f'\x00{len(code) - 1}\x00'
    s = re.sub(r'```\w*[ \t]*\n(.*?)```', stash, s, flags=re.S)
    s = s.replace('<br/>', '\n').replace('<br>', '\n').replace('<br />', '\n')
    s = re.sub(r'^\[(?:KCNA|KCSA)[^\]]*\]\s*', '', s)            # "[KCNA Practice #288]" prefixes
    s = re.sub(r'^\|[\s:|-]+\|\s*$', '', s, flags=re.M)          # markdown table separator rows
    s = re.sub(r'^\|\s*(.*?)\s*\|\s*$', lambda m: ' | '.join(c.strip() for c in m.group(1).split('|')), s, flags=re.M)
    s = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', s)                 # images (handled separately)
    s = re.sub(r'\[([^\]]+)\]\((https?://[^)]+)\)', r'\1', s)  # links -> text
    s = re.sub(r'<(https?://[^>]+)>', r'\1', s)
    s = re.sub(r'\*\*([^*]+)\*\*', r'\1', s)
    s = re.sub(r'(?<!\w)_([^_]+)_(?!\w)', r'\1', s)
    s = re.sub(r'`([^`]*)`', r'\1', s)
    s = re.sub(r'\\([.*_`\[\]()#>-])', r'\1', s)
    s = html.unescape(s)
    s = re.sub(r'[ \t]+', ' ', s)
    s = re.sub(r' *\n *', '\n', s)
    s = re.sub(r'\n{3,}', '\n\n', s)
    s = re.sub(r'\x00(\d+)\x00', lambda m: '\n' + html.unescape(code[int(m.group(1))]) + '\n', s)
    return re.sub(r'\n{3,}', '\n\n', s).strip()


def qkey(text, options=()):
    """Dedupe key: normalised question text; short/generic stems ("Which statement is true?") also include the options."""
    n = re.sub(r'\W+', '', text.lower())
    k = n                                                   # full text: Microsoft "series" items differ only mid-stem
    if len(n) < 60:
        k += '|' + '|'.join(sorted(re.sub(r'\W+', '', o.lower()) for o in options))
    return k


def letters(n):
    return [chr(65 + i) for i in range(n)]


def make(qid, q, options, answer, explanation=None, img=None):
    opts = [{'k': k, 't': t} for k, t in zip(letters(len(options)), options)]
    answer = sorted(set(answer))
    return {'id': qid, 'sources': [qid], 'q': q, **({'img': img} if img else {}),
            'options': opts, 'answer': answer, 'multi': len(answer) > 1, 'explanation': explanation or None}


# --------------------------------------------------------------------------- parsers
def parse_kananinirav(offline):
    out = []
    for n in range(1, 24):
        txt = fetch(KN.format(n=n), f'kn-{n}.md', offline)
        body = txt.split('\n', 5)[-1] if txt.startswith('---') else txt
        for part in re.split(r'\n(?=\d+\. )', '\n' + body):
            m = re.match(r'(\d+)\. (.*)', part, re.S)
            if not m:
                continue
            num, rest = int(m.group(1)), m.group(2)
            qid = f'kn:{n}-{num}'
            lines = rest.split('\n')
            qlines, opts, k = [], [], 0
            while k < len(lines) and not re.match(r'\s*- [A-F]\. ', lines[k]):
                qlines.append(lines[k].strip()); k += 1
            while k < len(lines):
                om = re.match(r'\s*- ([A-F])\. ?(.*)', lines[k])
                if om:
                    opts.append(om.group(2).strip()); k += 1
                elif lines[k].strip() == '' or lines[k].lstrip().startswith('<details'):
                    break
                else:
                    opts[-1] += ' ' + lines[k].strip(); k += 1
            tail = '\n'.join(lines[k:])
            am = re.search(r'Correct [Aa]nswer:?\s*([A-Fa-f][A-Fa-f ,]*)', tail)
            if not am or len(opts) < 2:
                warn(f'{qid}: unparsable'); continue
            ans = [c.upper() for c in am.group(1) if c.upper() in 'ABCDEF']
            em = re.search(r'(?:Explanation|Reference):?\s*<?(https?://[^>\s]+)>?', tail)
            out.append(make(qid, clean_md(' '.join(qlines)), [clean_md(o) for o in opts], ans, em.group(1) if em else None))
    return out


def parse_ditectrev(code, offline):
    repo = DITECTREV[code]
    txt = fetch(DT.format(repo=repo), f'dt-{code}.md', offline)
    img_base = f'https://raw.githubusercontent.com/Ditectrev/{repo}/main/'
    out = []
    blocks = re.split(r'\n### ', '\n' + txt.split('\n### ', 1)[1]) if '\n### ' in txt else []
    for i, block in enumerate(blocks, 1):
        qid = f'dt:{i}'
        lines = block.split('\n')
        qlines, opts, k = [], [], 0
        while k < len(lines) and not re.match(r'- \[( |x)\] ', lines[k]):
            qlines.append(lines[k]); k += 1
        while k < len(lines):
            om = re.match(r'- \[( |x)\] (.*)', lines[k])
            if om:
                opts.append([om.group(1) == 'x', om.group(2).strip()]); k += 1
            elif lines[k].strip() == '' or lines[k].startswith('**[') or lines[k].startswith('---'):
                break
            else:
                opts[-1][1] += ' ' + lines[k].strip(); k += 1
        qraw = '\n'.join(l for l in qlines if not l.startswith('**[⬆') and l.strip() != '---')
        im = re.search(r'!\[[^\]]*\]\(([^)]+)\)', qraw)
        img = None
        if im:
            src = im.group(1).strip()
            img = src if src.startswith('http') else img_base + src.lstrip('./')
        q = clean_md(qraw)
        ans = [l for l, (x, _) in zip(letters(len(opts)), opts) if x]
        if len(opts) < 2 or not ans or len(ans) == len(opts) or not q:
            warn(f'dt {code} #{i}: skipped (opts={len(opts)} ans={len(ans)})'); continue
        if any('![' in t for _, t in opts):
            warn(f'dt {code} #{i}: skipped (image in options)'); continue
        out.append(make(qid, q, [clean_md(t) for _, t in opts], ans, None, img))
    return out


def parse_cloudcertprep(code, offline):
    out = []
    domains = {'CLF-C02': 4, 'AIF-C01': 5}[code]
    for d in range(1, domains + 1):
        items = json.loads(fetch(CC.format(path=f'{code.lower()}/domain{d}'), f'cc-{code}-d{d}.json', offline))
        for it in items:
            if 'answer' not in it or it.get('type') in ('ordering', 'matching'):
                warn(f'cc {code} {it["id"]}: skipped ({it.get("type", "no answer")} item)'); continue
            keys = sorted(it['options'])
            texts = [it['options'][k] for k in keys]
            remap = dict(zip(keys, letters(len(keys))))
            ans = [remap[a] for a in it['answer'] if a in remap]
            if not ans:
                warn(f'cc {code} {it["id"]}: no answer'); continue
            out.append(make(f'cc:{it["id"]}', clean_md(it['question']), [clean_md(t) for t in texts], ans, (it.get('explanation') or '').strip() or None))
    return out


def parse_jeffreyxu(offline):
    items = json.loads(fetch(JX, 'jx-sap.json', offline))
    out = []
    for it in items:
        opts = sorted(it['options'], key=lambda o: o['letter'])
        remap = {o['letter']: l for o, l in zip(opts, letters(len(opts)))}
        ans = [remap[c] for c in str(it['correct_answer']) if c in remap]
        if not ans or len(opts) < 2:
            warn(f'jx {it["id"]}: bad'); continue
        # The explanations in this dataset are templated boilerplate, so they are not carried over.
        out.append(make(f'jx:{it["id"]}', clean_md(it['question']), [clean_md(o['text']) for o in opts], ans))
    return out


def md_question_blocks(text, heading_re=r'^### Question \d+'):
    """Split a markdown mock exam into blocks starting at each question heading."""
    lines = text.split('\n')
    starts = [i for i, l in enumerate(lines) if re.match(heading_re, l)]
    for a, b in zip(starts, starts[1:] + [len(lines)]):
        yield '\n'.join(lines[a + 1:b])


def md_split_options(block, opt_re=r'^([A-F])[.)](?:\s+(.*))?$'):
    """Return (question_text, [option texts], remainder) from a block using `A. text` style option lines.
    An option may also be `A.` alone followed by a fenced code block (code snippet answers)."""
    lines = block.split('\n')
    q, opts, k = [], [], 0
    while k < len(lines) and not re.match(opt_re, lines[k].strip()):
        q.append(lines[k]); k += 1
    while k < len(lines):
        l = lines[k].strip()
        m = re.match(opt_re, l)
        if m:
            opts.append((m.group(2) or '').strip())
        elif l.startswith(('<details', '**Answer', '**Correct', '---', '*Explanation', '#')):
            break
        elif l == '' or l.startswith('```'):
            pass
        elif opts:
            opts[-1] = (opts[-1] + ' ' + l).strip()
        k += 1
    return '\n'.join(q), opts, '\n'.join(lines[k:])


def parse_nosadaniel(offline):
    txt = fetch(NOSA, 'nd-kcna.js', offline)
    items = json.loads(txt[txt.index('['):txt.rindex(']') + 1])
    out = []
    for it in items:
        idx = it.get('correct')
        if not isinstance(idx, int) or idx >= len(it['options']):
            warn(f'nd {it["id"]}: bad answer'); continue
        out.append(make(f'nd:{it["id"]}', clean_md(it['question']), [clean_md(o) for o in it['options']], [chr(65 + idx)], (it.get('explanation') or '').strip() or None))
    return out


def parse_meibraransari(offline):
    out = []
    for n in range(1, 6):
        data = json.loads(fetch(MEIB.format(n=n), f'mb-kcna-{n}.json', offline))
        for it in (data['questions'] if isinstance(data, dict) else data):
            idx = it.get('correctAnswer')
            idxs = idx if isinstance(idx, list) else [idx]
            if not all(isinstance(i, int) and i < len(it['options']) for i in idxs):
                warn(f'mb {it["id"]}: bad answer'); continue
            out.append(make(f'mb:{it["id"]}', clean_md(it['question']), [clean_md(o) for o in it['options']], [chr(65 + i) for i in idxs], (it.get('explanation') or '').strip() or None))
    return out


def parse_msahihi(code, repo, sets, offline):
    out = []
    for n in range(1, sets + 1):
        txt = fetch(MSAHIHI.format(repo=repo, n=n), f'ms-{code}-{n}.md', offline)
        for i, block in enumerate(md_question_blocks(txt), 1):
            q, opts, rest = md_split_options(block)
            am = re.search(r'\*\*(?:Correct )?Answer:?\s*([A-F](?:\s*,\s*[A-F])*)\*\*', rest)
            if not am or len(opts) < 2:
                warn(f'ms {code} set{n} #{i}: unparsable'); continue
            ans = re.findall(r'[A-F]', am.group(1))
            expl = rest[am.end():].replace('</details>', '')
            expl = clean_md(re.sub(r'\*\*(Why .*?|Explanation):?\*\*', r'\1:', expl))
            out.append(make(f'ms:{code.lower()}-{n}-{i}', clean_md(q), [clean_md(o) for o in opts], ans, expl or None))
    return out


def parse_sonuk(offline):
    out = []
    for n, d in enumerate(SONUK_DIRS, 1):
        qtxt = fetch(SONUK.format(dir=d, n=n, suffix=''), f'sk-tf-{n}-q.md', offline)
        atxt = fetch(SONUK.format(dir=d, n=n, suffix='-Answers'), f'sk-tf-{n}-a.md', offline)
        # Answer key is a markdown table with one or more "| N | X |" pairs per row.
        key = {}
        for row in atxt.split('\n'):
            if not row.startswith('|'):
                continue
            cells = [c.strip() for c in row.strip().strip('|').split('|')]
            for a, b in zip(cells[::2], cells[1::2]):
                if a.isdigit() and re.fullmatch(r'[A-F](\s*,\s*[A-F])*', b):
                    key[int(a)] = re.findall(r'[A-F]', b)
        # Per-question explanations live under "## Question N" in the answers file.
        expl = {int(m.group(1)): clean_md(re.sub(r'\*\*(Correct Answer|Explanation|Why .*?):?\*\*', r'\1:', m.group(2)))
                for m in re.finditer(r'^## Question (\d+)\n(.*?)(?=^## Question \d+|^---\s*$|\Z)', atxt, re.S | re.M)}
        for i, block in enumerate(md_question_blocks(qtxt), 1):
            q, opts, _ = md_split_options(block)
            if i not in key or len(opts) < 2:
                warn(f'sk tf d{n} #{i}: no answer/options'); continue
            out.append(make(f'sk:{n}-{i}', clean_md(q), [clean_md(o) for o in opts], key[i], expl.get(i)))
    return out


def parse_ibutcat(offline):
    txt = fetch(IBUTCAT, 'ib-tf.md', offline)
    out = []
    for i, block in enumerate(md_question_blocks(txt), 1):
        q, opts, rest = md_split_options(block)
        am = re.search(r'\*\*Answer:?\s*([A-F](?:\s*,\s*[A-F])*)\*\*', rest)
        if not am or len(opts) < 2:
            warn(f'ib tf #{i}: unparsable'); continue
        em = re.search(r'\*Explanation:?\s*(.*?)\*\s*$', rest, re.S | re.M)
        out.append(make(f'ib:{i}', clean_md(q), [clean_md(o) for o in opts], re.findall(r'[A-F]', am.group(1)), clean_md(em.group(1)) if em else None))
    return out



def fetch_tarball(owner_repo, ref, name, offline):
    """Download a repo tarball once and extract it under cache/tarballs/<name>/. Returns the extracted root dir."""
    root = os.path.join(CACHE, 'tarballs', name)
    if os.path.isdir(root):
        return root
    if offline:
        sys.exit(f'offline and missing tarball dir {root}')
    url = f'https://api.github.com/repos/{owner_repo}/tarball/{ref}'
    print('  fetch', url)
    req = urllib.request.Request(url, headers={'User-Agent': 'aws-exam-sim-build'})
    with urllib.request.urlopen(req, timeout=120) as r:
        data = r.read()
    os.makedirs(root, exist_ok=True)
    with tarfile.open(fileobj=io.BytesIO(data), mode='r:gz') as tf:
        members = tf.getmembers()
        prefix = members[0].name.split('/')[0] + '/'
        for m in members:
            if m.isfile() and m.name.startswith(prefix):
                m.name = m.name[len(prefix):]
                tf.extract(m, root)
    return root


def read_file(path):
    return open(path, encoding='utf-8').read()


def node_json(js_expr_or_script):
    """Evaluate a JavaScript snippet with node and return the JSON it prints. Returns None when node is missing."""
    try:
        out = subprocess.run(['node', '-e', js_expr_or_script], capture_output=True, text=True, timeout=60)
    except FileNotFoundError:
        warn('node not found - JS-embedded sources skipped'); return None
    if out.returncode != 0:
        warn(f'node failed: {out.stderr[:200]}'); return None
    return json.loads(out.stdout)


def strings_in(obj):
    if isinstance(obj, str): return [obj]
    if isinstance(obj, dict): return [x for v in obj.values() for x in strings_in(v)]
    if isinstance(obj, list): return [x for v in obj for x in strings_in(v)]
    return []


# ---------------------------------------------------------------------- extra MCQ sources
def parse_quizplay(code, offline):
    out = []
    for n in range(1, QUIZPLAY_SETS[code] + 1):
        repo = f'quiz-player-quizzes-{code.lower()}-question-set-{n}'
        root = fetch_tarball(f'quizplay-io/{repo}', 'main', f'qp-{code}-{n}', offline)
        quiz = json.loads(read_file(os.path.join(root, 'quiz.json')))
        for qpath in quiz.get('questions', []):
            fp = os.path.join(root, qpath)
            if not os.path.exists(fp):
                warn(f'qp {code} set{n}: missing {qpath}'); continue
            it = json.loads(read_file(fp))
            if 'options' not in it or it.get('type') in ('ordering', 'matching'):
                warn(f'qp {code} set{n} {it.get("id")}: skipped ({it.get("type", "no options")})'); continue
            opts = [o['text'] if isinstance(o, dict) else str(o) for o in it['options']]
            ans = [chr(65 + i) for i, o in enumerate(it['options']) if isinstance(o, dict) and o.get('correct')]
            if not ans or len(ans) == len(opts):
                warn(f'qp {code} set{n} {it.get("id")}: no/all correct'); continue
            q = it['question']
            if it.get('caseStudy'):
                cs = os.path.join(root, it['caseStudy'])
                if os.path.exists(cs):
                    tabs = json.loads(read_file(cs)).get('tabs', [])
                    q = '\n\n'.join(f"{t.get('title', 'Case study')}: {t.get('content', '')}" for t in tabs) + '\n\n' + q
            qid = f'qp:{code.lower()}-{n}-{it.get("id", os.path.basename(qpath))}'
            out.append(make(qid, clean_md(q), [clean_md(o) for o in opts], ans, clean_md(it.get('explanation') or '') or None))
    return out


def parse_kiran_mls(offline):
    """Ditectrev-style markdown, but the answers live in a second file (only the correct option is listed, as [x])."""
    qtxt = fetch(KIRAN_Q, 'ks-mls-q.md', offline)
    atxt = fetch(KIRAN_A, 'ks-mls-a.md', offline)
    answers = {}
    for block in re.split(r'\n### ', '\n' + atxt)[1:]:
        stem = block.split('\n', 1)[0]
        answers[qkey(clean_md(stem))] = [clean_md(m) for m in re.findall(r'^- \[x\] (.*)$', block, re.M)]
    out = []
    for i, block in enumerate(re.split(r'\n### ', '\n' + qtxt)[1:], 1):
        lines = block.split('\n')
        stem = lines[0]
        q, opts, _ = md_split_options('\n'.join(lines[1:]), opt_re=r'^- \[( |x)\] (.*)')
        opts = [clean_md(o) for o in opts]
        correct_texts = answers.get(qkey(clean_md(stem)))
        if not correct_texts or len(opts) < 2:
            warn(f'ks mls #{i}: no answer'); continue
        norm = lambda t: re.sub(r'\W+', '', t.lower())
        ans = [chr(65 + k) for k, o in enumerate(opts) if norm(o) in {norm(c) for c in correct_texts}]
        if not ans:
            warn(f'ks mls #{i}: answer text not among options'); continue
        im = re.search(r'!\[[^\]]*\]\(([^)]+)\)', block)
        img = (im.group(1) if im.group(1).startswith('http') else KIRAN_IMG + im.group(1).lstrip('./')) if im else None
        out.append(make(f'ks:{i}', clean_md(stem + '\n' + q), opts, ans, None, img))
    return out


def parse_calvin_gcp(offline):
    items = json.loads(fetch(CALVIN, 'cr-gcp.json', offline))
    out = []
    for it in items:
        idx = it.get('correct')
        idxs = idx if isinstance(idx, list) else [idx]
        if not all(isinstance(i, int) and i < len(it['options']) for i in idxs):
            warn(f'cr {it.get("id")}: bad answer'); continue
        out.append(make(f'cr:{it["id"]}', clean_md(it['question']), [clean_md(o) for o in it['options']], [chr(65 + i) for i in idxs], clean_md(it.get('explanation') or '') or None))
    return out


def parse_slackwero_gcp(offline):
    root = fetch_tarball('slackwero/google-GCP-associate-cloud-engineer-exam-prep', 'main', 'sw-gcp', offline)
    out = []
    import glob
    for f in sorted(glob.glob(os.path.join(root, 'quiz-app', 'data', 'preguntas', '*.json'))):
        for it in json.loads(read_file(f)).get('preguntas', []):
            opts = [o.get('en') or o.get('es') for o in it.get('opciones', [])]
            ans = [a for a in it.get('respuesta', []) if re.fullmatch(r'[A-H]', a) and ord(a) - 65 < len(opts)]
            if not ans or len(opts) < 2:
                warn(f'sw {it.get("id")}: bad'); continue
            expl = (it.get('explicacion') or {}).get('en') if isinstance(it.get('explicacion'), dict) else it.get('explicacion')
            out.append(make(f'sw:{it["id"]}', clean_md(it['pregunta'].get('en') or it['pregunta'].get('es')), [clean_md(o) for o in opts], ans, clean_md(expl or '') or None))
    return out


def parse_martin_az305(offline):
    js = fetch(MARTIN, 'mm-az305.js', offline)
    data = node_json(js.replace('export ', '') + '\nconsole.log(JSON.stringify(questions));')
    out = []
    for i, it in enumerate(data or [], 1):
        idx = it.get('answer')
        idxs = idx if isinstance(idx, list) else [idx]
        if not all(isinstance(k, int) and k < len(it['options']) for k in idxs):
            warn(f'mm #{i}: bad answer'); continue
        q = it.get('scenario') or it.get('question') or ''
        expl = it.get('rationale') or ''
        out.append(make(f'mm:{it.get("id", i)}', clean_md(q), [clean_md(o) for o in it['options']], [chr(65 + k) for k in idxs], clean_md(expl) or None))
    return out


def parse_tuladhar_kcsa(offline):
    """Questions are embedded as a JS array literal inside Next.js page chunks."""
    root = fetch_tarball('tuladhar/kcsa-quiz', 'main', 'tl-kcsa', offline)
    import glob
    out = []
    for f in sorted(glob.glob(os.path.join(root, 'out', '_next', 'static', 'chunks', 'app', '*', 'page-*.js'))):
        s = read_file(f)
        i = s.find('[{question:')
        if i < 0:
            continue
        depth = 0
        for j in range(i, len(s)):
            if s[j] == '[': depth += 1
            elif s[j] == ']':
                depth -= 1
                if depth == 0: break
        data = node_json('console.log(JSON.stringify((' + s[i:j + 1] + ')))')
        domain = os.path.basename(os.path.dirname(f))
        for k, it in enumerate(data or [], 1):
            opts = it['options']
            ans = [chr(65 + opts.index(c)) for c in it.get('correctAnswers', []) if c in opts]
            if not ans:
                warn(f'tl {domain} #{k}: no answer'); continue
            out.append(make(f'tl:{domain}-{k}', clean_md(it['question']), [clean_md(o) for o in opts], ans))
    return out


# ---------------------------------------------------------------------- hands-on lab tasks (CKA)
def lab(qid, task, solution, weight=None):
    task = clean_lab_md(task); solution = clean_lab_md(solution)
    if len(task) < 15 or len(solution) < 10:
        return None
    return {'id': qid, 'sources': [qid], 'kind': 'lab', 'task': task, 'solution': solution, **({'weight': weight} if weight else {})}


def clean_lab_md(s):
    """Light cleanup that keeps markdown (fences, lists, inline code) for the in-app renderer."""
    s = re.sub(r'</?(details|summary|p)[^>]*>', '', s)
    s = re.sub(r'\*\*(Task|Answer|Solution)\s*:?\*\*\s*:?', '', s)
    s = re.sub(r'^#{1,4}\s*\*\*?(Answer|Solution)\*\*?:?\s*$', '', s, flags=re.M)
    s = re.sub(r'^\*\*Time:.*$', '', s, flags=re.M)
    s = re.sub(r'^\s*(show|solution|answer|click to reveal.*)\s*$', '', s, flags=re.M | re.I)   # leftover <summary> labels
    s = re.sub(r'^---\s*$', '', s, flags=re.M)
    s = re.sub(r'\n{3,}', '\n\n', s)
    return s.strip()


def parse_ziyad_cka(offline):
    txt = fetch(ZIYAD, 'zt-cka.md', offline)
    out = []
    for i, block in enumerate(re.split(r'\n## ', '\n' + txt)[1:], 1):
        head, body = block.split('\n', 1) if '\n' in block else (block, '')
        wm = re.search(r'[Ww]eightage\s*[:=]?\s*\**\s*(\d+)\s*%', head)
        parts = re.split(r'(?:#+\s*)?\*\*Answer:?\*\*:?', body, maxsplit=1)
        if len(parts) != 2:
            warn(f'zt cka #{i}: no answer marker'); continue
        item = lab(f'zt:{i}', parts[0], parts[1], int(wm.group(1)) if wm else None)
        if item: out.append(item)
    return out


def parse_twm_cka(offline):
    out = []
    for n in (1, 2):
        ex = fetch(TWM.format(n=n, suffix=''), f'tw-cka-m{n}.md', offline)
        so = fetch(TWM.format(n=n, suffix='-SOLUTIONS'), f'tw-cka-s{n}.md', offline)
        sols = {int(m.group(1)): m.group(2) for m in re.finditer(r'^## Solution (\d+)[^\n]*\n(.*?)(?=^## Solution \d+|\Z)', so, re.S | re.M)}
        for m in re.finditer(r'^## Question (\d+):?\s*([^\n]*)\n(.*?)(?=^## Question \d+|\Z)', ex, re.S | re.M):
            k = int(m.group(1))
            if k not in sols:
                warn(f'tw cka mock{n} q{k}: no solution'); continue
            item = lab(f'tw:{n}-{k}', f'**{m.group(2).strip()}**\n\n{m.group(3)}', sols[k])
            if item: out.append(item)
    return out


def parse_chad_cka(offline):
    out = []
    for f in CHAD_FILES:
        txt = fetch(CHAD.format(f=f), f'cm-cka-{f}.md', offline)
        for i, m in enumerate(re.finditer(r'^### ([^\n]+)\n(.*?)<details>(.*?)</details>', txt, re.S | re.M), 1):
            item = lab(f'cm:{f}-{i}', m.group(1) + '\n' + m.group(2), m.group(3))
            if item: out.append(item)
    return out


def parse_ali_cka(offline):
    out = []
    for f in ALI_FILES:
        txt = fetch(ALI.format(f=f), f'aj-cka-{f}.md', offline)
        # "Questions:" bullet group followed by a <details>Solution</details>
        for i, m in enumerate(re.finditer(r'Questions?:\s*\n((?:- [^\n]*\n?)+)\s*<details>(.*?)</details>', txt, re.S), 1):
            item = lab(f'aj:{f}-{i}', m.group(1), m.group(2))
            if item: out.append(item)
    return out


def parse_dh_cka(offline):
    root = fetch_tarball('devopshubproject/cka-lab', 'main', 'dh-cka', offline)
    import glob
    out = []
    for d in sorted(glob.glob(os.path.join(root, 'Task*')), key=lambda p: int(re.sub(r'\D', '', os.path.basename(p)) or 0)):
        tpath = os.path.join(d, 'task.md')
        if not os.path.exists(tpath):
            continue
        task = read_file(tpath)
        sol_parts = []
        for sf in sorted(glob.glob(os.path.join(d, 'solution', '*'))):
            body = read_file(sf).strip()
            if not body:
                continue
            if sf.endswith('.md'):
                sol_parts.append(body)
            else:
                sol_parts.append(f'`{os.path.basename(sf)}`:\n```yaml\n{body}\n```')
        n = os.path.basename(d)
        item = lab(f'dh:{n}', task, '\n\n'.join(sol_parts))
        if item: out.append(item)
        else: warn(f'dh cka {n}: empty task or solution')
    return out


def merge_labs(exam, lists):
    seen, out = {}, []
    for lst in lists:
        for it in lst:
            key = qkey(re.sub(r'`', '', it['task'])[:400])
            if key in seen:
                seen[key]['sources'].append(it['id']); continue
            seen[key] = it; out.append(it)
    return out



def parse_chojuninengu_tf(offline):
    """6 processed exams: '## Question N' / 'A) text' / '**Correct Answer: A, C**' / '### Explanation'. Free-text answers are skipped."""
    out = []
    for n in range(1, 7):
        txt = fetch(CHOJ.format(n=n), f'cj-tf-{n}.md', offline)
        for m in re.finditer(r'^## Question (\d+)\n(.*?)(?=^## Question \d+|\Z)', txt, re.S | re.M):
            k, body = int(m.group(1)), m.group(2)
            qm = re.search(r'### Question\n(.*?)### Answer Options\n(.*?)\*\*Correct Answer:\s*([^*\n]+)\*\*(.*)', body, re.S)
            if not qm:
                warn(f'cj tf e{n} q{k}: unparsable'); continue
            q, optblock, ans_raw, rest = qm.groups()
            opts = re.findall(r'^([A-F])\)\s*(.*)$', optblock, re.M)
            letters_ = [o[0] for o in opts]
            ans = [a.strip() for a in re.split(r'\s*,\s*', ans_raw.strip())]
            if not opts or not all(re.fullmatch(r'[A-F]', a) and a in letters_ for a in ans):
                warn(f'cj tf e{n} q{k}: free-text answer, skipped'); continue
            expl = re.sub(r'^### Explanation\s*', '', rest.strip())
            expl = re.sub(r'\n---\s*$', '', expl)
            out.append(make(f'cj:{n}-{k}', clean_md(q), [clean_md(o[1]) for o in opts], ans, clean_md(expl) or None))
    return out


def parse_irtasam_aif(offline):
    out = []
    for f in IRTASAM_FILES:
        js = fetch(IRTASAM.format(f=f), f'ir-aif-{f}.js', offline)
        data = node_json('window={QBANK:[]};' + js + ';console.log(JSON.stringify(window.QBANK));')
        for it in data or []:
            idxs = it.get('answer') if isinstance(it.get('answer'), list) else [it.get('answer')]
            if not all(isinstance(i, int) and i < len(it['options']) for i in idxs):
                warn(f'ir {it.get("id")}: bad answer'); continue
            out.append(make(f'ir:{it["id"]}', clean_md(it['stem']), [clean_md(o) for o in it['options']], [chr(65 + i) for i in idxs], clean_md(it.get('explanation') or '') or None))
    return out


def parse_darlan_aif(offline):
    """Single-file HTML simulator; the bank is a JS array literal `const BANK = [...]` with keys q/o/a/e."""
    html_ = fetch(DARLAN, 'dl-aif.html', offline)
    i = html_.find('const BANK = [')
    if i < 0:
        warn('dl: BANK not found'); return []
    i = html_.index('[', i); depth = 0
    for j in range(i, len(html_)):
        if html_[j] == '[': depth += 1
        elif html_[j] == ']':
            depth -= 1
            if depth == 0: break
    data = node_json('console.log(JSON.stringify((' + html_[i:j + 1] + ')))')
    out = []
    for k, it in enumerate(data or [], 1):
        a = it.get('a'); idxs = a if isinstance(a, list) else [a]
        if not all(isinstance(x, int) and x < len(it.get('o', [])) for x in idxs):
            warn(f'dl #{k}: bad answer'); continue
        out.append(make(f'dl:{k}', clean_md(it['q']), [clean_md(o) for o in it['o']], [chr(65 + x) for x in idxs], clean_md(it.get('e') or '') or None))
    return out


def parse_afsal_aif(offline):
    root = fetch_tarball('AfsalMadathingal/aws-aif-c01-practice-test', 'main', 'am-aif', offline)
    import glob
    out = []
    for f in sorted(glob.glob(os.path.join(root, 'questions', '*.json'))):
        for it in json.loads(read_file(f)).get('questions', []):
            keys = [o['id'] for o in it['options']]
            ans_raw = it.get('correctAnswer') or it.get('correctAnswers') or []
            ans_raw = ans_raw if isinstance(ans_raw, list) else [ans_raw]
            ans = [chr(65 + keys.index(a)) for a in ans_raw if a in keys]
            if not ans:
                warn(f'am {it.get("id")}: no answer'); continue
            out.append(make(f'am:{it["id"]}', clean_md(it['question']), [clean_md(o['text']) for o in it['options']], ans, clean_md(it.get('explanation') or '') or None))
    return out


def parse_linan_dea(offline):
    """341 markdown files with Chinese headings; answer taken from manifest.json (reviewed_answer)."""
    root = fetch_tarball('LinanJ11/dea-c01-study', 'main', 'lj-dea', offline)
    manifest = json.loads(read_file(os.path.join(root, 'manifest.json')))
    out = []
    for m in manifest:
        fp = os.path.join(root, m['file'])
        if not os.path.exists(fp):
            warn(f'lj dea {m["id"]}: missing file'); continue
        txt = read_file(fp)
        qm = re.search(r'## 题目\s*\n(.*?)\n## 选项\s*\n(.*?)\n## 答案', txt, re.S)
        if not qm:
            warn(f'lj dea {m["id"]}: unparsable'); continue
        opts = re.findall(r'^\*\*([A-F])\.\*\*\s*(.*)$', qm.group(2), re.M)
        ans = re.findall(r'[A-F]', m.get('reviewed_answer') or m.get('source_answer') or '')
        if len(opts) < 2 or not ans or not all(a in [o[0] for o in opts] for a in ans):
            warn(f'lj dea {m["id"]}: bad options/answer'); continue
        out.append(make(f'lj:{m["id"]}', clean_md(qm.group(1)), [clean_md(o[1]) for o in opts], ans))
    return out


def parse_ahmed_dop(offline):
    js = fetch(AHMED, 'aa-dop.js', offline)
    data = node_json('window={};' + js + ';console.log(JSON.stringify(window.QUESTIONS));')
    out = []
    for it in data or []:
        keys = [o['key'] for o in it['options']]
        ans = [chr(65 + keys.index(a)) for a in it.get('correct', []) if a in keys]
        if not ans:
            warn(f'aa {it.get("id")}: no answer'); continue
        out.append(make(f'aa:{it["id"]}', clean_md(it['stem']), [clean_md(o['text']) for o in it['options']], ans, clean_md(it.get('explanation') or '') or None))
    return out


def parse_r3x_sap(offline):
    """ExamTopics discussion scrape: answers.platform = ExamTopics' suggested answer (community answers not used)."""
    root = fetch_tarball('r3xakead0/aws-sap-c02-simulator', 'main', 'rx-sap', offline)
    import glob
    out = []
    for f in sorted(glob.glob(os.path.join(root, 'questions', '*.json'))):
        try:
            it = json.loads(read_file(f))
        except Exception:
            warn(f'rx {os.path.basename(f)}: bad json'); continue
        keys = [o['key'] for o in it.get('options', [])]
        ans = [a for a in (it.get('answers') or {}).get('platform', []) if a in keys]
        if not ans or len(keys) < 2:
            warn(f'rx {os.path.basename(f)}: no answer'); continue
        out.append(make(f'rx:{it.get("topic", 1)}-{it.get("number")}', clean_md(it['question']), [clean_md(o['text']) for o in it['options']], ans))
    return out


def parse_tuladhar_kcna(offline):
    root = fetch_tarball('tuladhar/kcna-quiz', 'main', 'tk-kcna', offline)
    import glob
    out = []
    for f in sorted(glob.glob(os.path.join(root, 'out', '_next', 'static', 'chunks', 'app', '*', 'page-*.js'))):
        s_ = read_file(f)
        i = s_.find('[{question:')
        if i < 0:
            continue
        depth = 0
        for j in range(i, len(s_)):
            if s_[j] == '[': depth += 1
            elif s_[j] == ']':
                depth -= 1
                if depth == 0: break
        data = node_json('console.log(JSON.stringify((' + s_[i:j + 1] + ')))')
        domain = os.path.basename(os.path.dirname(f))
        for k, it in enumerate(data or [], 1):
            opts = it['options']
            ans = [chr(65 + opts.index(c)) for c in it.get('correctAnswers', []) if c in opts]
            if not ans:
                warn(f'tk {domain} #{k}: no answer'); continue
            out.append(make(f'tk:{domain}-{k}', clean_md(it['question']), [clean_md(o) for o in opts], ans))
    return out


def parse_twm_exercises_cka(offline):
    """31 exercise READMEs: '## Tasks' numbered list is the task, <details><summary>Solution</summary> is the solution."""
    dirs = ['01-pod-basics', '02-multi-container-pod', '03-configmap-secret', '04-rbac', '05-networkpolicy', '06-deployment-rollout',
            '07-statefulset', '08-node-drain-cordon', '09-kubeadm-upgrade', '10-static-pod', '11-troubleshoot-cluster', '12-storage-pv-pvc',
            '13-helm-install-upgrade', '14-kustomize-overlays', '15-gateway-api', '16-hpa', '17-kubectl-debug', '18-cri-dockerd-setup',
            '19-ingress-classic', '20-pod-security-standards', '21-jobs-cronjobs', '22-priorityclass', '23-resource-requests-tuning',
            '24-priorityclass-patch', '25-storage-waitforfirstconsumer', '26-cri-dockerd-setup', '27-cni-tigera-install',
            '28-network-policy-complex', '29-troubleshoot-etcd-endpoint', '30-tls-configuration-update', '31-argocd-gitops-setup']
    out = []
    for d in dirs:
        try:
            txt = fetch(TWM_EX.format(d=d), f'tw-ex-{d}.md', offline)
        except Exception as e:
            warn(f'tw ex {d}: {e}'); continue
        title = re.match(r'#\s*(.*)', txt)
        tm = re.search(r'^## Tasks\s*\n(.*?)(?=^## )', txt, re.S | re.M)
        sm = re.search(r'<details>\s*<summary>\s*Solution\s*</summary>(.*?)</details>', txt, re.S | re.I)
        if not tm or not sm:
            warn(f'tw ex {d}: no tasks/solution'); continue
        item = lab(f'tw:ex-{d}', f'**{title.group(1).strip() if title else d}**\n\n{tm.group(1)}', sm.group(1))
        if item: out.append(item)
    return out



def parse_therayy_vault(offline):
    """'> #### Qn:' stem, '- [ ]' options, <details>Answer</details> with the answer written out (matched to an option)."""
    txt = fetch(THERAYY, 'ty-vault.md', offline)
    out = []
    norm = lambda t: re.sub(r'\W+', '', t.lower())
    for i, block in enumerate(re.split(r'\n> #{2,5} Q\d+:?\s*', '\n' + txt)[1:], 1):
        stem, _, rest = block.partition('\n')
        opts = [clean_md(m) for m in re.findall(r'^- \[[ x]\]\s*(.*)$', rest, re.M)]
        am = re.search(r'<details>\s*<summary>\s*Answer\s*</summary>(.*?)</details>', rest, re.S | re.I)
        if len(opts) < 2 or not am:
            warn(f'ty vault #{i}: no options/answer'); continue
        answer_text = clean_md(am.group(1))
        first_line = clean_md(am.group(1).strip().split('\n')[0])
        if any(len(o) < 3 or o.startswith(('`yaml', '```')) for o in opts) or len(set(opts)) != len(opts):
            warn(f'ty vault #{i}: broken options'); continue
        nf = norm(first_line)
        multi_stem = bool(re.search(r'\b(two|three|multiple|all that apply|which .* are)\b', stem, re.I)) or ' & ' in first_line
        # candidates: options whose text occurs in the first answer line (need >= 8 chars unless an exact match)
        cands = []
        for k, o in enumerate(opts):
            no = norm(o)
            if not no: continue
            if no == nf: cands.append((0, k)); continue
            pos = nf.find(no)
            if pos >= 0 and (len(no) >= 8 or no == nf): cands.append((pos, k))
        cands.sort()
        if not cands:
            scored = sorted(((len(os.path.commonprefix([norm(o), norm(answer_text)])), k) for k, o in enumerate(opts)), reverse=True)
            if scored and scored[0][0] >= 12: cands = [(0, scored[0][1])]
        if not cands:
            warn(f'ty vault #{i}: answer text not matched'); continue
        ans = [chr(65 + k) for _, k in (cands if multi_stem else cands[:1])]
        im = re.search(r'!\[[^\]]*\]\(([^)]+)\)', stem + '\n' + rest.split('<details>')[0])
        img = (THERAYY_IMG + im.group(1).lstrip('./')) if im and not im.group(1).startswith('http') else (im.group(1) if im else None)
        expl = answer_text if len(answer_text) > len(first_line) + 20 else None
        out.append(make(f'ty:{i}', clean_md(stem), opts, ans, expl, img))
    return out


def parse_fphilippon_tfpro(offline):
    """4 local-only Terraform labs: README = task, solution/*.tf = reference."""
    root = fetch_tarball('fphilippon/terraform-pro-cert-prep', 'main', 'fp-tfpro', offline)
    import glob
    out = []
    for d in sorted(glob.glob(os.path.join(root, 'labs', '*'))):
        readme = os.path.join(d, 'README.md')
        if not os.path.exists(readme):
            continue
        task = read_file(readme)
        parts = []
        for f in sorted(glob.glob(os.path.join(d, 'solution', '**', '*.tf'), recursive=True)) or sorted(glob.glob(os.path.join(d, '*.tf'))):
            rel = os.path.relpath(f, d)
            parts.append(f'`{rel}`:\n```hcl\n{read_file(f).strip()}\n```')
        chal = sorted(glob.glob(os.path.join(d, 'challenge', '*.tf')))
        if chal:
            task += '\n\nStarting point (`challenge/`):\n' + '\n'.join(f'`{os.path.basename(f)}`:\n```hcl\n{read_file(f).strip()}\n```' for f in chal)
        item = lab(f'fp:{os.path.basename(d)}', task, '\n\n'.join(parts))
        if item: out.append(item)
        else: warn(f'fp {os.path.basename(d)}: empty')
    return out


# --------------------------------------------------------------------------- merge
WARNINGS = []
def warn(msg):
    WARNINGS.append(msg)


def merge(exam, lists):
    seen, out = {}, []
    for lst in lists:
        for q in lst:
            if q['id'] in SKIP_IDS:
                continue
            if q['id'] in FIX_ANSWERS:
                q['answer'] = FIX_ANSWERS[q['id']]; q['multi'] = len(q['answer']) > 1
            key = qkey(q['q'], [o['t'] for o in q['options']])
            if key in seen:
                prev = seen[key]
                # Same question: compare answers by option *text* since letters may differ between sources.
                prev_ans = {o['t'].lower().rstrip('.') for o in prev['options'] if o['k'] in prev['answer']}
                this_ans = {o['t'].lower().rstrip('.') for o in q['options'] if o['k'] in q['answer']}
                if prev_ans != this_ans:
                    warn(f'{exam}: answer conflict {prev["id"]} {sorted(prev_ans)[:1]} vs {q["id"]} {sorted(this_ans)[:1]} (kept {prev["id"]})')
                    # Cosmetic differences ("RDS" vs "Amazon RDS") are not disputes; real ones are recorded so the UI can flag the item.
                    import difflib
                    sim = difflib.SequenceMatcher(None, ' | '.join(sorted(prev_ans)), ' | '.join(sorted(this_ans))).ratio()
                    if sim < 0.6:
                        alt = [o['t'] for o in q['options'] if o['k'] in q['answer']]
                        prev.setdefault('disputed', []).append({'source': q['id'], 'answer': alt})
                prev['sources'].append(q['id'])
                if not prev['explanation'] and q['explanation']:
                    prev['explanation'] = q['explanation']
                if not prev.get('img') and q.get('img'):
                    prev['img'] = q['img']
                continue
            seen[key] = q
            out.append(q)
    return out


def write_js(path, header, var, value):
    with open(path, 'w', encoding='utf-8') as f:
        f.write(header)
        if isinstance(value, list):
            f.write(f'{var} = [\n')
            for v in value:
                f.write(json.dumps(v, ensure_ascii=False) + ',\n')
            f.write('];\n')
        else:
            f.write(f'{var} = {json.dumps(value, ensure_ascii=False, indent=1)};\n')


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument('--offline', action='store_true')
    args = ap.parse_args()
    os.makedirs(OUT, exist_ok=True)

    banks = {}
    print('CLF-C02'); # cloudcertprep is a reviewed, service-name-updated copy of most kananinirav items (TCO Calculator -> Pricing Calculator etc.)
    # and carries text explanations, so it wins on duplicates. kananinirav ids stay in `sources` for the per-exam filter.
    banks['CLF-C02'] = merge('CLF-C02', [parse_cloudcertprep('CLF-C02', args.offline), parse_kananinirav(args.offline), parse_ditectrev('CLF-C02', args.offline)])
    print('AIF-C01'); banks['AIF-C01'] = merge('AIF-C01', [parse_cloudcertprep('AIF-C01', args.offline), parse_irtasam_aif(args.offline), parse_afsal_aif(args.offline), parse_darlan_aif(args.offline)])
    print('SAP-C02'); banks['SAP-C02'] = merge('SAP-C02', [parse_jeffreyxu(args.offline), parse_r3x_sap(args.offline)])
    print('DOP-C02'); banks['DOP-C02'] = merge('DOP-C02', [parse_ahmed_dop(args.offline)])
    print('DEA-C01'); banks['DEA-C01'] = merge('DEA-C01', [parse_linan_dea(args.offline)])
    for code in DITECTREV:
        if code == 'CLF-C02':
            continue
        extra = []
        if code == 'MLS-C01': extra.append(parse_kiran_mls(args.offline))
        if code == 'GCP-ACE': extra += [parse_calvin_gcp(args.offline), parse_slackwero_gcp(args.offline)]
        if code == 'AZ-305': extra.append(parse_martin_az305(args.offline))
        if code in QUIZPLAY_SETS: extra.append(parse_quizplay(code, args.offline))
        print(code); banks[code] = merge(code, [parse_ditectrev(code, args.offline)] + extra)
    for code in ('AZ-700', 'SC-300', 'AI-200', 'SC-500', 'AI-103'):
        print(code); banks[code] = merge(code, [parse_quizplay(code, args.offline)])
    print('KCNA'); banks['KCNA'] = merge('KCNA', [parse_nosadaniel(args.offline), parse_msahihi('KCNA', 'KCNA-study-guide', 2, args.offline), parse_tuladhar_kcna(args.offline), parse_meibraransari(args.offline)])
    print('KCSA'); banks['KCSA'] = merge('KCSA', [parse_msahihi('KCSA', 'KCSA-study-guide', 2, args.offline), parse_tuladhar_kcsa(args.offline)])
    print('CKA'); banks['CKA'] = merge_labs('CKA', [parse_twm_cka(args.offline), parse_twm_exercises_cka(args.offline), parse_ziyad_cka(args.offline), parse_dh_cka(args.offline), parse_chad_cka(args.offline), parse_ali_cka(args.offline)])
    print('VAULT-ASSOC'); banks['VAULT-ASSOC'] = merge('VAULT-ASSOC', [parse_therayy_vault(args.offline)])
    print('TF-PRO'); banks['TF-PRO'] = merge_labs('TF-PRO', [parse_fphilippon_tfpro(args.offline)])
    print('TF-ASSOC'); banks['TF-ASSOC'] = merge('TF-ASSOC', [parse_ibutcat(args.offline), parse_sonuk(args.offline), parse_chojuninengu_tf(args.offline)])

    index = {'generated': __import__('datetime').date.today().isoformat(), 'sources': SOURCES_META, 'exams': {}}
    for code, meta in EXAMS.items():
        qs = banks[code]
        src_counts = Counter(s.split(':')[0] for q in qs for s in q['sources'])
        index['exams'][code] = {**meta, 'code': code, 'count': len(qs), 'multi': sum(q.get('multi', False) for q in qs), 'disputed': sum(1 for q in qs if q.get('disputed')),
                                'withExplanation': sum(1 for q in qs if q.get('explanation') or q.get('solution')), 'sources': dict(src_counts),
                                'file': f'data/{code}.js'}
        write_js(os.path.join(OUT, f'{code}.js'),
                 f'// {code} {meta["name"]} - {len(qs)} questions. Generated by tools/build_banks.py, do not edit by hand.\n',
                 f'window.QUESTION_BANKS = window.QUESTION_BANKS || {{}};\nwindow.QUESTION_BANKS["{code}"]', qs)
        print(f'{code:8} {len(qs):5} questions  {dict(src_counts)}')
    write_js(os.path.join(OUT, 'index.js'), '// Exam catalogue. Generated by tools/build_banks.py.\n', 'window.EXAM_INDEX', index)

    if WARNINGS:
        print(f'\n{len(WARNINGS)} warnings:')
        for w in WARNINGS:
            print(' ', w)


if __name__ == '__main__':
    main()
