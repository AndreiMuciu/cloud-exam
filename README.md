# Cert Exam Simulator

Single-page exam simulator (no build step; two vendored libraries: js-yaml and webernetes) for **AWS, Microsoft Azure, Google Cloud, Kubernetes (CNCF) and HashiCorp Terraform**
certifications. Open `index.html` in a browser, nothing to install.

```bash
open index.html            # macOS
# or serve it: python3 -m http.server 8080  ->  http://localhost:8080
```

## Exams included (35 exams, 13254 items)

| Vendor | Code | Exam | Level | Bank | Simulated as | Pass | Sources |
| --- | --- | --- | --- | ---: | --- | ---: | --- |
| AWS | AIF-C01 | AI Practitioner | Foundational | 1320 | 65 q / 90 min / 15 unscored | 700 | cloudcertprep, iamirtasam, AfsalMadathingal, darlantls |
| AWS | CLF-C02 | Cloud Practitioner | Foundational | 1352 | 65 q / 90 min / 15 unscored | 700 | cloudcertprep, kananinirav, Ditectrev |
| AWS | DEA-C01 | Data Engineer Associate | Associate | 340 | 65 q / 130 min / 15 unscored | 720 | LinanJ11 |
| AWS | DVA-C02 | Developer Associate | Associate | 386 | 65 q / 130 min / 15 unscored | 720 | Ditectrev |
| AWS | SAA-C03 | Solutions Architect Associate | Associate | 771 | 65 q / 130 min / 15 unscored | 720 | Ditectrev |
| AWS | SOA-C03 | CloudOps Engineer Associate | Associate | 395 | 65 q / 130 min / 15 unscored | 720 | Ditectrev |
| AWS | DOP-C02 | DevOps Engineer Professional | Professional | 168 | 75 q / 180 min / 10 unscored | 750 | ahmedasmar |
| AWS | SAP-C02 | Solutions Architect Professional | Professional | 540 | 75 q / 180 min / 10 unscored | 750 | Jeffrey-Xu, r3xakead0 |
| AWS | ANS-C01 | Advanced Networking Specialty | Specialty | 91 | 65 q / 170 min / 15 unscored | 750 | Ditectrev |
| AWS | DAS-C01 | Data Analytics Specialty (retired 2024-04-09) | Specialty | 83 | 65 q / 180 min / 15 unscored | 750 | Ditectrev |
| AWS | DBS-C01 | Database Specialty (retired 2024-04-30) | Specialty | 168 | 65 q / 180 min / 15 unscored | 750 | Ditectrev |
| AWS | MLS-C01 | Machine Learning Specialty (retired 2025-03-31) | Specialty | 136 | 65 q / 180 min / 15 unscored | 750 | Ditectrev, kiran-saikia |
| AWS | SCS-C02 | Security Specialty | Specialty | 391 | 65 q / 170 min / 15 unscored | 750 | Ditectrev |
| Azure | AZ-900 | Azure Fundamentals | Foundational | 578 | 40 q / 45 min / 0 unscored | 700 | Ditectrev, quizplay-io |
| Azure | DP-900 | Azure Data Fundamentals | Foundational | 343 | 40 q / 45 min / 0 unscored | 700 | Ditectrev, quizplay-io |
| Azure | SC-900 | Security, Compliance & Identity Fundamentals | Foundational | 307 | 40 q / 45 min / 0 unscored | 700 | Ditectrev, quizplay-io |
| Azure | AI-103 | Azure AI Apps and Agents Developer (AI-102 successor, beta) | Associate | 31 | 50 q / 100 min / 0 unscored | 700 | quizplay-io |
| Azure | AI-200 | Developing AI Cloud Solutions on Azure (AZ-204 successor) | Associate | 96 | 50 q / 100 min / 0 unscored | 700 | quizplay-io |
| Azure | AZ-104 | Azure Administrator | Associate | 347 | 50 q / 100 min / 0 unscored | 700 | Ditectrev, quizplay-io |
| Azure | AZ-204 | Developing Solutions for Azure | Associate | 255 | 50 q / 100 min / 0 unscored | 700 | Ditectrev, quizplay-io |
| Azure | AZ-500 | Azure Security Engineer | Associate | 313 | 50 q / 100 min / 0 unscored | 700 | Ditectrev, quizplay-io |
| Azure | AZ-700 | Azure Network Engineer Associate | Associate | 32 | 50 q / 100 min / 0 unscored | 700 | quizplay-io |
| Azure | AZ-800 | Windows Server Hybrid Administrator | Associate | 178 | 50 q / 100 min / 0 unscored | 700 | Ditectrev, quizplay-io |
| Azure | DP-203 | Azure Data Engineer (retired 2025-03-31) | Associate | 252 | 50 q / 100 min / 0 unscored | 700 | Ditectrev |
| Azure | SC-300 | Identity and Access Administrator Associate | Associate | 31 | 50 q / 100 min / 0 unscored | 700 | quizplay-io |
| Azure | SC-500 | End-to-End Security Controls for Cloud and AI Workloads (AZ-500 successor) | Associate | 93 | 50 q / 100 min / 0 unscored | 700 | quizplay-io |
| Azure | AZ-305 | Azure Solutions Architect Expert | Professional | 285 | 50 q / 100 min / 0 unscored | 700 | Ditectrev, martinmichelca, quizplay-io |
| Azure | AZ-400 | Azure DevOps Engineer Expert | Professional | 322 | 50 q / 100 min / 0 unscored | 700 | Ditectrev |
| GCP | GCP-ACE | Associate Cloud Engineer | Associate | 1765 | 50 q / 120 min / 0 unscored | 700 | Ditectrev, calvinrodrigues500, slackwero |
| Kubernetes | KCNA | Kubernetes and Cloud Native Associate | Foundational | 751 | 60 q / 90 min / 0 unscored | 75% | nosadaniel, msahihi study guides, tuladhar, meibraransari |
| Kubernetes | KCSA | Kubernetes and Cloud Native Security Associate | Foundational | 269 | 60 q / 90 min / 0 unscored | 75% | msahihi study guides, tuladhar |
| Kubernetes | CKA | Certified Kubernetes Administrator — hands-on tasks | Associate | 222 | 17 tasks / 120 min / 0 unscored | 66% | techwithmohamed, ziyad-tarek1, devopshubproject, chadmcrowell, alijahnas |
| HashiCorp | TF-ASSOC | Terraform Associate (003/004) | Associate | 588 | 57 q / 60 min / 0 unscored | 70% | iButcat, sonukkushwaha0801, chojuninengu |
| HashiCorp | VAULT-ASSOC | Vault Associate (002) | Associate | 51 | 60 q / 60 min / 0 unscored | 70% | therayy |
| HashiCorp | TF-PRO | Terraform Authoring & Operations Professional — hands-on tasks | Professional | 4 | 4 tasks / 240 min / 0 unscored | 70% | fphilippon |

Exam parameters come from the vendors' exam guides. Where a vendor does not publish a value the table uses the commonly
cited figure: Microsoft does not publish question counts (40–60) or unscored counts, Google and HashiCorp do not publish
the pass mark (~70%). AWS, Microsoft and Google exams are shown on a 100–1000 scale (linear approximation, not the
vendors' real algorithm); Kubernetes and Terraform exams are scored as a plain percentage of the scored questions.

**CKA is hands-on**, not multiple choice, so it is simulated differently: each item is a real task with a reference
solution. You do the task in your own cluster (kind, minikube, killercoda…), reveal the solution and grade yourself
Solved / Partially (½) / Not solved. The 222 tasks come from five community repos (techwithmohamed mock exams + 31 exercises, ziyad-tarek1, alijahnas, chadmcrowell, devopshubproject); the real exam has 15–20 tasks, 120
minutes and a 66% pass mark. CKAD / CKS could be added the same way.

HashiCorp has five certifications: Terraform Associate (MCQ, here with 588 q), Vault Associate 002 (MCQ, here with 51 q
from one community repo; certbase.pro lists 76 more behind its site), Consul Associate (retires 2026-07-15, nothing open
found), Terraform Authoring & Operations Professional (4 h, 4 hands-on scenarios + 12 MCQ; here as 4 local-only labs from
fphilippon) and Vault Operations Professional (hands-on, nothing open found).

Not included: AWS MLA-C01, Azure AI-102, Consul Associate, Vault Operations Professional — no open, answer-keyed sets
were found. ANS-C01, DAS-C01 and DBS-C01 stay small: the only other hits were dump sites (ExamTopics,
ITExams, VMExam…), which were not scraped. AZ-700, SC-300 and AI-103 have a single 36-question quizplay set each;
AI-200 / SC-500 are the 2026 successors of AZ-204 / AZ-500 (three quizplay sets each).

**Everything here is for personal study only.** Several sources have no licence, one (chojuninengu) is a re-upload of
a paid Udemy practice test and two (r3xakead0, LinanJ11) are ExamTopics-derived dumps; see the table below.
Sites such as ExamTopics, ITExams, VMExam, Whizlabs or Tutorials Dojo were deliberately not scraped (commercial / ToS).

## What it does

- **Exam mode** – official question count and clock per exam (all configurable), no feedback until submit.
  On submit, the unscored items are picked at random where the real exam has them. You get the raw percentage over all
  questions, the percentage over the scored questions, the scaled score (or percentage) with the per-exam pass mark,
  time used, and a full review with filters (wrong / correct / unanswered / flagged / unscored). Explanations are
  shown where the source had one (link or text).
- **Hands-on mode (CKA, TF-PRO)** – task + an answer editor (YAML manifests and kubectl commands, `Tab` = 2 spaces) + three ways to check:
  1. **Check my answer** – heuristic, in the browser: your YAML is parsed (js-yaml) and every `path=value` leaf of the
     reference solution's manifests is looked up in yours; kubectl commands are compared token by token. You get a
     match percentage, the missing fields/tokens, YAML syntax errors and a suggested grade (≥75% solved, ≥40% partial),
     which you can override. A different but valid approach scores low: the reference is the judge, not the checker.
  2. **Run in browser cluster** – a Kubernetes cluster simulated *inside the browser tab*
     ([ngrok/webernetes](https://github.com/ngrok/webernetes), Apache-2.0, vendored as `vendor/webernetes.js`, 541 KB).
     Your manifests are applied to a fresh 3-node cluster: the report shows API validation errors (422s, missing
     namespace…), each pod's phase / Ready / node, deployment ready replicas and strategy, service endpoints and an
     HTTP probe through the NodePort or ClusterIP DNS, Warning events, and a diff of your objects against the
     reference solution's manifests (names, replicas, images, service ports, selectors). Supported kinds: Namespace,
     Pod, Deployment, ReplicaSet, Service. Not simulated: volumes, ConfigMaps/Secrets, RBAC, NetworkPolicy, resources,
     affinity, real images (any image name starts a stub HTTP server), kubectl commands. Needs the app served over
     http (`python3 -m http.server 8080`), not `file://`.
  3. **kubectl dry-run** – real API-server validation against *your* cluster (kind, minikube, k3d…) through a tiny local
     helper: `python3 tools/lab_server.py` (127.0.0.1:8766, runs only `kubectl apply --dry-run=server -f -`, creates
     nothing). Catches schema errors, unknown fields, admission failures; does not judge whether the task is solved.
     The button is hidden until you click *enable kubectl dry-run* in a task and the helper answers. The helper also
     serves the app, so the easiest local setup is just `python3 tools/lab_server.py` and open http://127.0.0.1:8766/.
  4. **Reveal solution** and grade yourself.
  Same timer / navigator / review as the rest; the review keeps your answer next to the reference. The Kubernetes-only
  tools (browser cluster, kubectl dry-run) appear only on Kubernetes exams; Terraform labs get the heuristic check
  (HCL blocks and `terraform` commands compared token by token) and the reference `.tf` files.
- **Practice mode** – untimed, instant feedback per question, filter by source (for CLF-C02 also by kananinirav
  practice exam number, e.g. *practice exam 14*) or *only questions I got wrong before*.
- Exam picker grouped by vendor, flag questions, navigator grid, keyboard shortcuts
  (`A`–`E` / `1`–`7` select, `←` `→` navigate, `F` flag, `Enter` check/next in practice).
- Exam progress is saved in `localStorage`; a refresh or accidental tab close can be resumed and the clock keeps running.
- History per exam with pass rate, average, best score and "redo my wrong answers"; a per-exam mistake pool.
- Questions with diagrams (Ditectrev) load the image from the source repo (needs internet for those items only);
  code snippets (YAML, HCL) keep their indentation.
- Optional pause (off by default; the real exams have no pause). Light/dark theme.

## How reliable are the answers?

Nobody verified these banks against the real exams; treat them as study material, not as an answer key.
What can be measured: when the same question appears in two sources, how often do the marked answers disagree?

- CLF-C02: 1436 duplicated items, 27 real disagreements (~2%). Most of the rest are naming updates (TCO Calculator → Pricing Calculator).
- SAP-C02: 517 duplicates between Jeffrey-Xu and the ExamTopics scrape, 6 real disagreements (~1%).
- Ditectrev Azure banks contradict *themselves*: DP-900 has 31 stems that appear twice with the same options, 18 of them
  with a different marked answer (e.g. "relational data is stored in…": tabular vs hierarchical folders).
- KCNA: 1340 duplicates, 0 disagreements (but the biggest source there is templated/AI-generated).

Every real disagreement is kept in the data as `disputed` and shown in the app as a "⚠ disputed answer" badge with the
alternative answer (63 items in total). Rough confidence by source type:

| Tier | Sources | Expectation |
| --- | --- | --- |
| Community-reviewed dumps | kananinirav, cloudcertprep (reviewed copy), Ditectrev AWS, ExamTopics-derived (Jeffrey-Xu, r3xakead0, LinanJ11) | Closest to real exam wording; a few % wrong keys, outdated service names |
| Author-written, curated | msahihi, iButcat, sonukkushwaha0801, nosadaniel, calvin, techwithmohamed, ziyad-tarek1, alijahnas, chadmcrowell | Good explanations, exam-style but not exam questions |
| Ditectrev Azure / GCP | dt Azure banks | Internal contradictions found; use with the disputed flag in mind |
| Generated / templated | meibraransari, slackwero, quizplay, iamirtasam, darlantls, ahmedasmar, martinmichelca, AfsalMadathingal | Plausible, but factual errors likely; good for breadth, not for trusting a single item |

## Hosting it (Netlify, GitHub Pages, any static host)

Everything is static: upload the folder (or point the host at it). `data/` is ~16 MB, `vendor/` 0.6 MB; `tools/cache/`
is not needed at runtime. Two things depend on where the page runs:

- **Run in browser cluster** works anywhere served over http(s), not from `file://`.
- **kubectl dry-run** needs `tools/lab_server.py` running on the *visitor's* machine. From an https page Chrome asks
  once for *local network access* permission before calling `http://127.0.0.1:8766`; Safari/Firefox may refuse the
  http-from-https call entirely, in which case open the app from the helper (`http://127.0.0.1:8766/`) instead.
  Without a helper the button simply stays hidden; nothing else in the app depends on it.

## Data layout

```
data/index.js      catalogue: exam metadata + counts + source credits   (window.EXAM_INDEX)
data/<CODE>.js     one bank per exam, loaded on demand                    (window.QUESTION_BANKS[CODE])
tools/build_banks.py   downloads every source, normalises, dedupes, writes data/
tools/cache/       raw downloads (kept so the build can run offline)
```

Question schema: `{id, sources[], q, img?, options[{k,t}], answer[], multi, explanation}`;
hands-on task schema (CKA): `{id, sources[], kind: "lab", task, solution, weight?}` (markdown kept, rendered in-app).
`id` is `<source>:<source-id>` (`kn:14-19` = kananinirav practice exam 14, question 19; `dt:87` = Ditectrev item 87).
Duplicates inside an exam are merged by question text (plus options for short stems) and every occurrence is kept in
`sources`, which is what the practice-mode source filter uses.

## Sources and licences

| Prefix | Source | Used for | Licence |
| --- | --- | --- | --- |
| `kn` | [kananinirav/AWS-Certified-Cloud-Practitioner-Notes](https://github.com/kananinirav/AWS-Certified-Cloud-Practitioner-Notes) | CLF-C02 | MIT |
| `cc` | [nastaso/cloudcertprep](https://github.com/nastaso/cloudcertprep) | CLF-C02, AIF-C01 | MIT |
| `jx` | [Jeffrey-Xu/aws-sap-c02-exam-app](https://github.com/Jeffrey-Xu/aws-sap-c02-exam-app) | SAP-C02 | MIT (question text only; its templated explanations are not used) |
| `nd` | [nosadaniel/kcna_cert_demo_quiz](https://github.com/nosadaniel/kcna_cert_demo_quiz) | KCNA | MIT |
| `ms` | [msahihi/KCNA-study-guide](https://github.com/msahihi/KCNA-study-guide), [msahihi/KCSA-study-guide](https://github.com/msahihi/KCSA-study-guide) | KCNA, KCSA | MIT |
| `mb` | [meibraransari/kcna-playground](https://github.com/meibraransari/kcna-playground) | KCNA | Apache-2.0. 1500 templated items that collapse to ~160 unique after dedupe; looks AI-generated, lowest-quality source |
| `ib` | [iButcat/terraform-associate-practice](https://github.com/iButcat/terraform-associate-practice) | TF-ASSOC | MIT |
| `sk` | [sonukkushwaha0801/Terraform-associate-004-exam-prep](https://github.com/sonukkushwaha0801/Terraform-associate-004-exam-prep) | TF-ASSOC | **No licence file.** Personal study only. |
| `dt` | [Ditectrev](https://github.com/Ditectrev) practice-test repositories | AWS, Azure, GCP | **No licence file.** Public READMEs of a commercial product. Personal study only; do not redistribute. |
| `qp` | [quizplay-io](https://github.com/quizplay-io) question sets | AZ-900/104/204/305/500/800/700, SC-900/300, DP-900 | AGPL-3.0. 36 "original" questions per set; ordering/matching items skipped |
| `ks` | [kiran-saikia/AWS--MLS-C01--studypack](https://github.com/kiran-saikia/AWS--MLS-C01--studypack) | MLS-C01 | CC BY-NC-SA 4.0 (turned out to be the same bank as Ditectrev's, adds 0 new) |
| `cr` | [calvinrodrigues500/gcp-ace-practice-questions](https://github.com/calvinrodrigues500/gcp-ace-practice-questions) | GCP-ACE | MIT |
| `sw` | [slackwero/google-GCP-associate-cloud-engineer-exam-prep](https://github.com/slackwero/google-GCP-associate-cloud-engineer-exam-prep) | GCP-ACE | MIT. 1516 bilingual course questions, likely AI-generated; English side used |
| `mm` | [martinmichelca/az305-prep](https://github.com/martinmichelca/az305-prep) | AZ-305 | **No licence file.** Personal study only. |
| `tl` | [tuladhar/kcsa-quiz](https://github.com/tuladhar/kcsa-quiz) | KCSA | **No licence file.** Extracted from the built Next.js chunks. Personal study only. |
| `tw` | [techwithmohamed/CKA-Certified-Kubernetes-Administrator](https://github.com/techwithmohamed/CKA-Certified-Kubernetes-Administrator) mock exams | CKA | MIT |
| `zt` | [ziyad-tarek1/CKA-Exam-Practice-Questions](https://github.com/ziyad-tarek1/CKA-Exam-Practice-Questions) | CKA | MIT |
| `aj` | [alijahnas/CKA-practice-exercises](https://github.com/alijahnas/CKA-practice-exercises) | CKA | GPL-3.0 |
| `cm` | [chadmcrowell/CKA-Exercises](https://github.com/chadmcrowell/CKA-Exercises) | CKA | **No licence file.** Personal study only. |
| `dh` | [devopshubproject/cka-lab](https://github.com/devopshubproject/cka-lab) | CKA | **No licence file.** Personal study only. |
| `ty` | [therayy/Vault-Associate](https://github.com/therayy/Vault-Associate) | VAULT-ASSOC | **No licence file.** Answers written as text, matched back to the option. Personal study only. |
| `fp` | [fphilippon/terraform-pro-cert-prep](https://github.com/fphilippon/terraform-pro-cert-prep) | TF-PRO | Apache-2.0. Challenge/solution `.tf` labs, local-only (`terraform_data`). |
| `cj` | [chojuninengu/terraform-associate-practice-exam](https://github.com/chojuninengu/terraform-associate-practice-exam) | TF-ASSOC | **No licence; content matches a paid Udemy practice test.** Personal study only. Free-text-answer items skipped. |
| `ir` | [iamirtasam/AWS-AI-Practitioner-Exam-Mock](https://github.com/iamirtasam/AWS-AI-Practitioner-Exam-Mock) | AIF-C01 | MIT |
| `am` | [AfsalMadathingal/aws-aif-c01-practice-test](https://github.com/AfsalMadathingal/aws-aif-c01-practice-test) | AIF-C01 | **No licence file.** Personal study only. |
| `dl` | [darlantls/aif-c01-practice-exam](https://github.com/darlantls/aif-c01-practice-exam) | AIF-C01 | **No licence file.** Bank extracted from the single-file HTML simulator. Personal study only. |
| `rx` | [r3xakead0/aws-sap-c02-simulator](https://github.com/r3xakead0/aws-sap-c02-simulator) | SAP-C02 | MIT, but the questions are scraped from ExamTopics (same bank as Jeffrey-Xu; adds 11). ExamTopics' suggested answer used. |
| `aa` | [ahmedasmar/aws-certified-devops-pro-exam-prep](https://github.com/ahmedasmar/aws-certified-devops-pro-exam-prep) | DOP-C02 | **No licence file.** Original exam-style questions. Personal study only. |
| `lj` | [LinanJ11/dea-c01-study](https://github.com/LinanJ11/dea-c01-study) | DEA-C01 | **No licence file.** Dump-style questions with Chinese explanations (dropped); reviewed answers from its manifest. Personal study only. |
| `tk` | [tuladhar/kcna-quiz](https://github.com/tuladhar/kcna-quiz) | KCNA | **No licence file.** Extracted from the built Next.js chunks. Personal study only. |

Not usable: `bradmccoydev/terraform-cert-practice-questions` (flash-card Q&A, not multiple choice), `sv222` CKA README
(conceptual Q&A), `codingnconcepts.com` Terraform questions (no answers on the free page), commercial dump sites (ToS, anti-bot).

Data-quality decisions made during the build (all in `tools/build_banks.py`):

- For CLF-C02, cloudcertprep wins on duplicates against kananinirav: it is a reviewed copy with updated service
  names (TCO Calculator → Pricing Calculator, Personal Health Dashboard → AWS Health Dashboard, …) and text explanations.
- `kn:22-25` had answer `BD` for a single-choice question; kept `B`. `kn:11-9` had broken option text; the intact `kn:20-23` copy is used.
- Ordering/matching items from cloudcertprep AIF-C01 (10) are skipped: not multiple choice.
- Ditectrev items whose *options* are images, or that have no marked answer, are skipped; images in the question stem are
  kept. Azure banks lose the most this way (many drag-and-drop / hot-area items), hence "bank" < "items in repo".
- Duplicate key is question text head+tail (case-study series share a long prefix), plus options for very short stems.
- The build prints every remaining answer conflict between duplicate sources; the first source in the list wins.

## Rebuilding the banks

```bash
python3 tools/build_banks.py             # downloads into tools/cache/ then writes data/
python3 tools/build_banks.py --offline   # reuse the cache
```
