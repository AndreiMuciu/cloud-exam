window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "3.4-001",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "easy",
    stem: "A news media company uses a foundation model on Amazon Bedrock to generate short summaries of long articles. Reviewers have written reference summaries for a sample of articles. Which metric is MOST appropriate for automatically scoring the generated summaries against those references?",
    options: [
      "BLEU",
      "ROUGE",
      "Perplexity",
      "Mean absolute error"
    ],
    answer: [1],
    explanation: "ROUGE compares overlapping n-grams between generated text and one or more reference texts, with an emphasis on recall, which is why it is the standard automatic metric for summarization. It answers the question of how much of the reference content the summary managed to capture. BLEU is the precision-oriented counterpart used mainly for translation, and perplexity measures next-token prediction rather than agreement with a reference summary.",
    rationales: [
      "BLEU is a precision-focused n-gram metric designed for machine translation quality, not summary content coverage.",
      "",
      "Perplexity measures how well a model predicts a text sample and needs no reference summary, so it cannot score content overlap.",
      "Mean absolute error applies to numeric regression predictions, not generated text."
    ],
    services: ["Amazon Bedrock"],
    tags: ["rouge", "automatic evaluation", "summarization"]
  },
  {
    id: "3.4-002",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "easy",
    stem: "A logistics company is comparing two foundation models that translate shipping instructions from English to Spanish. The team has professional human translations to use as references. Which metric should the team use to score the machine translations automatically?",
    options: [
      "Perplexity",
      "R-squared",
      "BLEU",
      "Silhouette score"
    ],
    answer: [2],
    explanation: "BLEU scores machine translation by measuring the precision of n-gram matches between the candidate translation and one or more human reference translations, with a penalty for output that is too short. It is the long-standing default automatic metric for translation tasks. Perplexity does not use references, and the other options belong to regression and clustering evaluation.",
    rationales: [
      "Perplexity evaluates a model's ability to predict tokens in a sample and does not compare output to reference translations.",
      "R-squared reports variance explained by a regression model, which is unrelated to text quality.",
      "",
      "Silhouette score measures how well clusters are separated in unsupervised learning."
    ],
    services: [],
    tags: ["bleu", "translation", "automatic evaluation"]
  },
  {
    id: "3.4-003",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "easy",
    stem: "A healthcare provider evaluates model-generated patient discharge instructions. Valid answers often reword the reference text with synonyms, so exact word overlap scores are unfairly low. Which metric best captures whether the generated text means the same thing as the reference?",
    options: [
      "BERTScore",
      "Exact match",
      "ROUGE-1",
      "Word error rate"
    ],
    answer: [0],
    explanation: "BERTScore compares contextual embeddings of the candidate and reference text, so it rewards outputs that are semantically equivalent even when the wording differs. That makes it a better fit than surface overlap metrics when paraphrasing is expected. Exact match and n-gram overlap metrics penalize legitimate synonyms and reordering.",
    rationales: [
      "",
      "Exact match requires the strings to be identical, which is far too strict for paraphrased instructions.",
      "ROUGE-1 counts unigram overlap and gives no credit for synonyms that carry the same meaning.",
      "Word error rate measures speech transcription errors against a spoken reference."
    ],
    services: [],
    tags: ["bertscore", "semantic similarity", "metrics"]
  },
  {
    id: "3.4-004",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A gaming company continues pre-training a foundation model on its own corpus of in-game chat logs. During training the team wants a single intrinsic number that shows how well the model predicts held-out text from that corpus. Which metric should the team track?",
    options: [
      "F1 score",
      "BLEU",
      "Toxicity score",
      "Perplexity"
    ],
    answer: [3],
    explanation: "Perplexity measures how well a language model predicts a sample of text; lower perplexity means the model assigns higher probability to the held-out tokens. Because it needs only the text itself and no labeled references, it is the usual intrinsic metric for tracking language modeling quality during pre-training. The other metrics all require task-specific labels or references.",
    rationales: [
      "F1 balances precision and recall for classification or span-matching tasks with labeled ground truth.",
      "BLEU needs reference translations and evaluates a translation task, not language modeling fit.",
      "Toxicity score rates harmful content in output and says nothing about prediction quality.",
      ""
    ],
    services: [],
    tags: ["perplexity", "continued pre-training", "metrics"]
  },
  {
    id: "3.4-005",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A financial services firm wants to compare three foundation models in Amazon Bedrock on accuracy, robustness, and toxicity using curated or custom datasets, without building its own scoring pipeline. Which capability meets this requirement with the LEAST operational overhead?",
    options: [
      "Amazon SageMaker Model Monitor",
      "Amazon Bedrock Guardrails",
      "Amazon SageMaker Ground Truth labeling jobs",
      "Amazon Bedrock Model Evaluation automatic evaluation jobs"
    ],
    answer: [3],
    explanation: "Amazon Bedrock Model Evaluation runs automatic evaluation jobs that score models on built-in task types such as text summarization, question answering, and classification using either AWS-curated built-in datasets or your own prompt dataset, reporting metrics including accuracy, robustness, and toxicity. It is managed, so no scoring code or infrastructure is required. Model Monitor watches deployed SageMaker endpoints for drift, and Guardrails filters content at runtime rather than benchmarking models.",
    rationales: [
      "Model Monitor detects data and model quality drift for deployed SageMaker endpoints; it does not benchmark candidate foundation models.",
      "Guardrails applies content and topic filters to requests and responses at inference time instead of producing evaluation scores.",
      "Ground Truth creates labeled training datasets and does not compare foundation model outputs.",
      ""
    ],
    services: ["Amazon Bedrock", "Amazon Bedrock Model Evaluation"],
    tags: ["bedrock model evaluation", "automatic evaluation"]
  },
  {
    id: "3.4-006",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A public sector agency must judge whether chatbot answers are empathetic, appropriately worded for citizens, and aligned with agency tone. Automated overlap metrics have not correlated with reviewer opinions. Which evaluation approach should the agency use?",
    options: [
      "Increase the number of ROUGE reference summaries per prompt",
      "Track perplexity on a held-out citizen inquiry dataset",
      "Use an Amazon Bedrock Model Evaluation human-based evaluation with agency subject matter experts",
      "Measure exact match against a list of approved answers"
    ],
    answer: [2],
    explanation: "Subjective qualities such as tone, empathy, and brand or agency style are best judged by people, and Amazon Bedrock Model Evaluation supports human-based evaluation jobs where your own workforce or an AWS managed team rates model responses against custom criteria. Automated overlap and probability metrics cannot represent these preferences. This is the classic case for human evaluation rather than a purely automatic metric.",
    rationales: [
      "Adding references improves overlap statistics but still measures word overlap rather than empathy or tone.",
      "Perplexity reflects token prediction quality and has no relationship to perceived empathy.",
      "",
      "Exact match rejects any acceptable rewording and cannot express degrees of appropriateness."
    ],
    services: ["Amazon Bedrock", "Amazon Bedrock Model Evaluation"],
    tags: ["human evaluation", "bedrock model evaluation"]
  },
  {
    id: "3.4-007",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A retail company needs to score thousands of generated product descriptions for helpfulness and correctness every week. Hiring human reviewers for every response is too slow and expensive, but simple overlap metrics miss quality problems. Which evaluation option in Amazon Bedrock best balances these constraints?",
    options: [
      "Model Evaluation with an LLM-as-a-judge evaluator model",
      "A human-based evaluation job with a managed workforce for every response",
      "Amazon Bedrock Guardrails with a denied topics policy",
      "Provisioned Throughput for the generating model"
    ],
    answer: [0],
    explanation: "Amazon Bedrock Model Evaluation supports LLM-as-a-judge, where a separate foundation model rates responses on quality dimensions such as helpfulness, correctness, faithfulness, and harmfulness. It scales far beyond human review while capturing nuance that n-gram overlap metrics miss, which suits high-volume weekly scoring. Guardrails and Provisioned Throughput address runtime safety and capacity, not evaluation.",
    rationales: [
      "",
      "Full human review of every response is exactly the cost and latency problem the company is trying to avoid.",
      "Guardrails blocks or filters content at inference time and does not produce quality scores for evaluation.",
      "Provisioned Throughput reserves model capacity and has no evaluation function."
    ],
    services: ["Amazon Bedrock", "Amazon Bedrock Model Evaluation"],
    tags: ["llm-as-a-judge", "bedrock model evaluation"]
  },
  {
    id: "3.4-008",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A manufacturing company built a Retrieval Augmented Generation assistant over equipment manuals using Amazon Bedrock Knowledge Bases. Users report answers that sound confident but contain claims that do not appear in the retrieved manual passages. Which evaluation dimension should the team measure first?",
    options: [
      "Perplexity of the generator model",
      "BLEU score against the original manuals",
      "Faithfulness of the answer to the retrieved context",
      "Latency per token during generation"
    ],
    answer: [2],
    explanation: "Faithfulness, also called groundedness, measures whether every claim in the generated answer is supported by the retrieved passages, so it directly targets confident but unsupported statements. RAG evaluation typically separates retrieval relevance, faithfulness to context, and answer correctness so teams know which stage to fix. Perplexity, BLEU, and latency do not detect unsupported claims.",
    rationales: [
      "Perplexity reflects general language modeling fit and cannot tell whether a claim came from the retrieved context.",
      "BLEU compares output with reference text and is not designed to verify grounding in retrieved passages.",
      "",
      "Latency is a performance measure and unrelated to factual grounding."
    ],
    services: ["Amazon Bedrock Knowledge Bases", "Amazon Bedrock"],
    tags: ["rag evaluation", "faithfulness"]
  },
  {
    id: "3.4-009",
    domain: 3,
    task: "3.4",
    type: "multi",
    difficulty: "medium",
    stem: "An insurance company is evaluating a RAG assistant that answers policy questions from an internal document store. The team wants to isolate problems in the retrieval stage rather than the generation stage. Which two measurements are MOST useful for that purpose? (Select TWO.)",
    options: [
      "The proportion of retrieved passages that are relevant to the user question",
      "Whether the correct supporting passage appears in the top results for a question",
      "The perplexity of the generator model on the final answer",
      "The average number of output tokens per answer",
      "The politeness rating of the answer as judged by reviewers"
    ],
    answer: [0, 1],
    explanation: "Retrieval quality is measured by how relevant the returned passages are and whether the passage that actually contains the answer is retrieved at all, often expressed as context precision and context recall. If retrieval fails, no amount of prompt tuning on the generator will fix the answer. Generator perplexity, output length, and politeness describe the generation stage or style rather than retrieval.",
    rationales: [
      "",
      "",
      "Perplexity describes the generator's token predictions and does not indicate whether retrieval returned the right documents.",
      "Output length is a formatting characteristic that says nothing about retrieval quality.",
      "Politeness is a style judgment about generated text, not a retrieval measurement."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["rag evaluation", "retrieval relevance"]
  },
  {
    id: "3.4-010",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "easy",
    stem: "A media streaming company wants to compare several publicly available foundation models on general reasoning and knowledge before running its own tests. Which resource provides standardized tasks and scores for this kind of comparison?",
    options: [
      "Public benchmark datasets such as MMLU and HellaSwag",
      "Amazon CloudWatch custom metrics",
      "AWS Trusted Advisor checks",
      "AWS Cost and Usage Reports"
    ],
    answer: [0],
    explanation: "Benchmark datasets provide a fixed set of tasks and scoring rules so different models can be compared on the same footing, and well-known examples include MMLU for multitask knowledge and HellaSwag for commonsense reasoning. They give a useful first screen, though results still need validation on company-specific data. The other options report operational, account, or cost information rather than model capability.",
    rationales: [
      "",
      "CloudWatch collects operational telemetry from AWS resources, not standardized model capability scores.",
      "Trusted Advisor recommends account level best practices for cost, security, and limits.",
      "Cost and Usage Reports detail AWS spend and provide no model quality information."
    ],
    services: [],
    tags: ["benchmark datasets", "model selection"]
  },
  {
    id: "3.4-011",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "hard",
    stem: "A logistics company selected a foundation model that ranked highest on a public reasoning benchmark, but the model performs poorly on the company's freight documents, which use uncommon abbreviations and internal codes. What is the MOST likely explanation?",
    options: [
      "Public benchmarks report only latency, so quality was never measured",
      "The benchmark tasks do not represent the company's domain-specific data and terminology",
      "Benchmark scores are only valid for models that have been fine-tuned",
      "The benchmark measured perplexity, which is always inversely related to accuracy"
    ],
    answer: [1],
    explanation: "A benchmark score reflects performance on that benchmark's distribution of tasks and language. When production inputs differ in vocabulary, format, or domain, high benchmark scores can be misleading, which is why teams evaluate candidate models on a representative sample of their own data. This mismatch, not a defect in the scoring method, is the usual cause of the gap.",
    rationales: [
      "Public benchmarks report task quality scores, not latency alone.",
      "",
      "Benchmarks are commonly used to compare base models and do not require fine-tuning to be valid.",
      "Lower perplexity often correlates with better language modeling but is not a guaranteed inverse of task accuracy."
    ],
    services: [],
    tags: ["benchmark datasets", "misleading metrics"]
  },
  {
    id: "3.4-012",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A bank measures a claims classification model with accuracy only. Fraudulent claims make up 2 percent of the dataset, and the model reaches 98 percent accuracy by predicting the majority class every time. Which metric would expose this weakness?",
    options: [
      "Perplexity",
      "BLEU",
      "F1 score",
      "Total inference cost"
    ],
    answer: [2],
    explanation: "F1 is the harmonic mean of precision and recall, so a model that never predicts the minority class scores near zero on the fraud class even when overall accuracy is high. This is the classic example of a metric being misleading on imbalanced data. Perplexity and BLEU apply to generated text, and cost is an operational figure.",
    rationales: [
      "Perplexity measures token prediction on text samples and does not evaluate classification balance.",
      "BLEU compares generated text with reference translations and is unrelated to class imbalance.",
      "",
      "Inference cost reports spend and reveals nothing about the model's ability to detect the minority class."
    ],
    services: [],
    tags: ["f1", "misleading metrics", "imbalanced data"]
  },
  {
    id: "3.4-013",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "easy",
    stem: "A company evaluates a question answering model on a test set where each question has one exact correct answer string, such as a date or a product code. Which metric counts the percentage of predictions that are identical to the ground truth?",
    options: [
      "BERTScore",
      "ROUGE-L",
      "Perplexity",
      "Exact match"
    ],
    answer: [3],
    explanation: "Exact match scores a prediction as correct only when it matches the reference answer string exactly, which suits closed-form answers like dates, codes, or entity names. It is often reported alongside F1, which gives partial credit for token overlap. Embedding and n-gram metrics measure similarity rather than strict equality.",
    rationales: [
      "BERTScore measures semantic similarity with embeddings and gives partial credit to near matches.",
      "ROUGE-L rewards the longest common subsequence overlap rather than requiring identical strings.",
      "Perplexity measures language modeling fit, not answer correctness.",
      ""
    ],
    services: [],
    tags: ["exact match", "question answering", "metrics"]
  },
  {
    id: "3.4-014",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "During an automatic evaluation job in Amazon Bedrock Model Evaluation, a team reviews the robustness score for a summarization task. What does this score indicate?",
    options: [
      "How often the model produces harmful or offensive language",
      "How much the model's output quality changes when inputs contain small perturbations such as typos or case changes",
      "How closely the model's summaries match human-written references",
      "How quickly the model responds under concurrent load"
    ],
    answer: [1],
    explanation: "Robustness in model evaluation measures how stable the output quality remains when the input is perturbed in small, semantics-preserving ways such as typos, whitespace, or case changes. A model with poor robustness degrades sharply on slightly noisy real-world input. Toxicity covers harmful language, accuracy-style metrics cover reference agreement, and load response time is a performance concern.",
    rationales: [
      "Harmful or offensive output is captured by the toxicity metric, not robustness.",
      "",
      "Agreement with references is measured by accuracy metrics such as ROUGE or BERTScore in the job results.",
      "Throughput and latency under load are operational performance measurements, not evaluation metrics in the job."
    ],
    services: ["Amazon Bedrock Model Evaluation"],
    tags: ["robustness", "bedrock model evaluation"]
  },
  {
    id: "3.4-015",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "easy",
    stem: "A social platform must verify that a foundation model rarely produces hateful or insulting content before launching a public chatbot. Which evaluation metric addresses this requirement directly?",
    options: [
      "BLEU",
      "Exact match",
      "Toxicity score",
      "Context precision"
    ],
    answer: [2],
    explanation: "Toxicity metrics score generated text for harmful content such as hate speech, insults, and threats, and are included in Amazon Bedrock Model Evaluation automatic jobs. Measuring toxicity before launch is part of responsible model evaluation. Translation overlap, string equality, and retrieval precision do not assess harmfulness.",
    rationales: [
      "BLEU measures translation overlap with references and is silent about harmful content.",
      "Exact match checks string equality with a ground truth answer, not safety.",
      "",
      "Context precision evaluates the relevance of retrieved passages in a RAG pipeline."
    ],
    services: ["Amazon Bedrock Model Evaluation"],
    tags: ["toxicity", "responsible ai", "automatic evaluation"]
  },
  {
    id: "3.4-016",
    domain: 3,
    task: "3.4",
    type: "multi",
    difficulty: "medium",
    stem: "A software company wants to know whether its new generative AI coding assistant actually meets business objectives after deployment. Which two measurements MOST directly indicate business value rather than model quality alone? (Select TWO.)",
    options: [
      "Change in average time developers need to complete a ticket",
      "BERTScore of assistant responses against curated references",
      "Cost per inference request compared with the productivity gain",
      "Perplexity of the model on an internal code corpus",
      "ROUGE-2 score on a summarization benchmark"
    ],
    answer: [0, 2],
    explanation: "Business value is judged by outcomes such as productivity gains, user engagement, conversion, and whether the cost per inference is justified by the benefit delivered. Ticket completion time captures productivity, and comparing inference cost against that gain captures return on the investment. BERTScore, perplexity, and ROUGE measure model output quality but do not by themselves demonstrate business impact.",
    rationales: [
      "",
      "BERTScore reports semantic similarity to references, which is a model quality signal, not a business outcome.",
      "",
      "Perplexity is an intrinsic language modeling measure with no direct business interpretation.",
      "ROUGE-2 measures bigram overlap for summarization tasks and does not show business value."
    ],
    services: [],
    tags: ["business metrics", "productivity", "cost per inference"]
  },
  {
    id: "3.4-017",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "An online retailer replaced its rule-based product search with a generative AI shopping assistant. Which metric BEST shows whether the change met the stated business objective of selling more items?",
    options: [
      "Average tokens generated per session",
      "Conversion rate from assistant session to completed purchase",
      "ROUGE-L score of assistant replies",
      "Number of foundation models evaluated during selection"
    ],
    answer: [1],
    explanation: "When the objective is selling more, conversion rate from an assisted session to a completed purchase measures the outcome directly. Business objective evaluation looks at engagement, conversion, revenue, and cost rather than intrinsic text scores. Token counts and reference overlap describe output characteristics, and the number of models evaluated is a process detail.",
    rationales: [
      "Tokens per session reflects verbosity and cost, not whether customers bought more.",
      "",
      "ROUGE-L compares replies with reference text and does not measure purchases.",
      "The count of evaluated models describes the selection process, not business results."
    ],
    services: [],
    tags: ["business metrics", "conversion"]
  },
  {
    id: "3.4-018",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A travel company wants to release a new prompt template for its booking assistant. The team plans to route 10 percent of live traffic to the new template and compare completed bookings with the existing template over two weeks. Which practice is the team using?",
    options: [
      "Shadow deployment",
      "A/B testing",
      "Blue/green deployment with full cutover",
      "Continued pre-training"
    ],
    answer: [1],
    explanation: "A/B testing splits live traffic between two variants and compares outcome metrics for each group, which is how the team can attribute a change in bookings to the new prompt template. A shadow deployment sends copies of traffic to the new variant without returning its responses to users, so it cannot measure user outcomes like bookings. Blue/green shifts all traffic at once, and continued pre-training is a training technique.",
    rationales: [
      "Shadow deployment mirrors requests to a candidate without exposing responses to users, so booking outcomes cannot be compared.",
      "",
      "Blue/green switches all traffic to the new version, which removes the concurrent comparison group.",
      "Continued pre-training extends model training on additional data and is not a release comparison method."
    ],
    services: [],
    tags: ["a/b testing", "deployment", "business metrics"]
  },
  {
    id: "3.4-019",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "hard",
    stem: "Before exposing a new foundation model version to customers, a bank wants to send copies of real production requests to the candidate model, log its responses for offline review, and continue serving only the current model's responses to users. Which approach matches this requirement?",
    options: [
      "A/B testing with a 50/50 traffic split",
      "Human-based evaluation job with a managed workforce",
      "Canary release that serves 5 percent of users from the candidate",
      "Shadow deployment of the candidate model"
    ],
    answer: [3],
    explanation: "A shadow deployment mirrors live traffic to a candidate model and records its responses without returning them to users, which gives realistic input coverage at zero customer risk. A/B tests and canary releases both expose real users to candidate responses. Human-based evaluation jobs score responses but do not replay production traffic.",
    rationales: [
      "An A/B split returns candidate responses to half of the users, which the bank wants to avoid.",
      "A human evaluation job rates prompts and responses offline and does not mirror live production traffic.",
      "A canary release serves a small share of real users from the candidate, so customers still see its output.",
      ""
    ],
    services: [],
    tags: ["shadow deployment", "deployment", "evaluation"]
  },
  {
    id: "3.4-020",
    domain: 3,
    task: "3.4",
    type: "multi",
    difficulty: "medium",
    stem: "A hospital network is designing a human-in-the-loop review process for a generative AI service that drafts clinical summaries. Which two AWS options support routing model outputs to human reviewers? (Select TWO.)",
    options: [
      "Amazon Augmented AI (A2I)",
      "Amazon Bedrock Model Evaluation human-based evaluation jobs",
      "Amazon SageMaker Feature Store",
      "AWS AI Service Cards",
      "Amazon Bedrock Flows"
    ],
    answer: [0, 1],
    explanation: "Amazon Augmented AI (A2I) builds human review workflows for machine learning predictions, and Amazon Bedrock Model Evaluation human-based evaluation jobs let an internal team or an AWS managed workforce rate model responses against custom criteria. Both put people in the loop. Feature Store manages features, AI Service Cards are documentation, and Flows orchestrates generative AI workflows without providing a review workforce.",
    rationales: [
      "",
      "",
      "Feature Store stores and serves curated ML features and has no human review capability.",
      "AI Service Cards document intended use and limitations of AWS AI services; they are documentation, not a review workflow.",
      "Bedrock Flows orchestrates prompts, knowledge bases, and agents but does not supply human reviewers."
    ],
    services: ["Amazon Augmented AI (A2I)", "Amazon Bedrock Model Evaluation"],
    tags: ["human-in-the-loop", "human evaluation"]
  },
  {
    id: "3.4-021",
    domain: 3,
    task: "3.4",
    type: "ordering",
    difficulty: "medium",
    stem: "A fintech startup is setting up its first evaluation of candidate foundation models for a customer support summarization use case. Place the steps in the correct order.",
    options: [
      "Run the evaluation and compute metric scores for each candidate model",
      "Define the task type and the evaluation metrics that matter for the use case",
      "Compare results and select the model that best meets requirements",
      "Assemble a representative prompt dataset with reference summaries"
    ],
    answer: [1, 3, 0, 2],
    explanation: "Evaluation starts by defining the task and choosing metrics aligned with it, because the metric choice drives what data is needed. The team then builds a representative dataset with references, runs the evaluation to score each candidate, and finally compares results to select a model. Running an evaluation before defining metrics or gathering representative data produces numbers that cannot support a decision.",
    rationales: [],
    services: [],
    tags: ["evaluation workflow", "model selection"]
  },
  {
    id: "3.4-022",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "easy",
    stem: "Which statement correctly contrasts automatic evaluation with human evaluation of foundation models?",
    options: [
      "Automatic evaluation is scalable and repeatable, while human evaluation better captures subjective qualities such as tone and helpfulness",
      "Automatic evaluation requires no reference data, while human evaluation always does",
      "Human evaluation is cheaper and faster than automatic evaluation at large scale",
      "Automatic evaluation can only be performed on models hosted outside AWS"
    ],
    answer: [0],
    explanation: "Automatic evaluation computes metrics such as ROUGE, BLEU, or accuracy programmatically, so it is fast, cheap, and repeatable across many models and prompts. Human evaluation costs more and scales poorly, but people can judge subjective dimensions like tone, helpfulness, and appropriateness that automated metrics approximate poorly. Teams typically combine both.",
    rationales: [
      "",
      "Many automatic metrics such as ROUGE and BLEU specifically require reference outputs, while human raters can judge responses without references.",
      "Human review is generally slower and more expensive than computing automated metrics at scale.",
      "Automatic evaluation is available for models on AWS, including through Amazon Bedrock Model Evaluation."
    ],
    services: [],
    tags: ["automatic evaluation", "human evaluation"]
  },
  {
    id: "3.4-023",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A team runs an Amazon Bedrock Model Evaluation automatic job for a question answering task but has no custom prompt dataset prepared. What can the team use instead?",
    options: [
      "The model's original pre-training corpus",
      "CloudTrail logs from previous invocations",
      "A Guardrails configuration exported as a dataset",
      "A built-in curated dataset provided for the selected task type"
    ],
    answer: [3],
    explanation: "Amazon Bedrock Model Evaluation provides built-in curated datasets for supported task types such as question answering, summarization, and text classification, so teams can start evaluating without preparing their own data. Custom datasets are recommended later to reflect the company's real inputs. Pre-training corpora, audit logs, and Guardrails configurations are not evaluation datasets.",
    rationales: [
      "The pre-training corpus belongs to the model provider and is not available or suitable as an evaluation set.",
      "CloudTrail records API activity for auditing and is not formatted as prompts with references.",
      "Guardrails configurations define content policies and cannot serve as an evaluation dataset.",
      ""
    ],
    services: ["Amazon Bedrock Model Evaluation"],
    tags: ["bedrock model evaluation", "benchmark datasets"]
  },
  {
    id: "3.4-024",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "hard",
    stem: "A customer support assistant scores well on ROUGE against reference answers, yet users rate its answers as unhelpful because they are generic and evade the actual question. What does this situation illustrate?",
    options: [
      "ROUGE was computed incorrectly and should be recalculated",
      "N-gram overlap with references can be high even when responses fail user needs, so the metric is misleading for this goal",
      "The model has high perplexity, which always causes generic answers",
      "User ratings are invalid unless collected through a benchmark dataset"
    ],
    answer: [1],
    explanation: "Overlap metrics reward sharing words with the reference, and generic text that reuses common phrasing can score well while failing to address the user's specific problem. This is a standard example of a benchmark metric being misleading relative to the business goal, which is why human feedback or LLM-as-a-judge assessments complement automatic scores. The fix is better-aligned evaluation, not recomputing the same metric.",
    rationales: [
      "The score can be computed correctly and still fail to reflect helpfulness; the issue is metric validity, not arithmetic.",
      "",
      "Perplexity was not measured here, and it does not deterministically cause generic answers.",
      "Direct user ratings are a legitimate evaluation signal and do not require a benchmark dataset."
    ],
    services: [],
    tags: ["misleading metrics", "rouge", "human evaluation"]
  },
  {
    id: "3.4-025",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A media company fine-tuned a foundation model and wants to confirm the tuned version outperforms the base version on the company's own summarization examples. Which approach provides the clearest evidence?",
    options: [
      "Review the model provider's published benchmark scores for the base model",
      "Run the same evaluation dataset and metrics against both the base and fine-tuned models and compare scores",
      "Compare the number of training tokens used in each model",
      "Check that the fine-tuned model has lower inference latency"
    ],
    answer: [1],
    explanation: "A controlled comparison holds the dataset and metrics constant and varies only the model, which isolates the effect of fine-tuning. Amazon Bedrock Model Evaluation supports evaluating custom and base models this way. Published benchmarks, training token counts, and latency do not tell you whether quality improved on the company's data.",
    rationales: [
      "Published benchmark scores describe other datasets and say nothing about the fine-tuned model on company examples.",
      "",
      "Training token volume is an input to training, not evidence of output quality.",
      "Lower latency is a performance property and does not indicate better summaries."
    ],
    services: ["Amazon Bedrock Model Evaluation", "Amazon Bedrock"],
    tags: ["model comparison", "fine-tuning", "evaluation"]
  },
  {
    id: "3.4-026",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A telecom company wants human reviewers to rate model responses on a scale for clarity and accuracy, using its own internal employees as the workforce. Which capability supports this requirement?",
    options: [
      "Amazon Bedrock Model Evaluation human-based evaluation with a custom work team and custom rating criteria",
      "Amazon SageMaker Clarify bias metrics",
      "Amazon Bedrock Guardrails contextual grounding check",
      "Amazon SageMaker Autopilot leaderboard"
    ],
    answer: [0],
    explanation: "Human-based evaluation jobs in Amazon Bedrock Model Evaluation let you bring your own work team, define custom rating metrics and instructions, and collect ratings such as Likert scales or thumbs up and down. Clarify measures bias and explainability for ML datasets and models, the Guardrails grounding check filters ungrounded responses at runtime, and the Autopilot leaderboard ranks automatically trained tabular candidate models.",
    rationales: [
      "",
      "Clarify computes bias and feature attribution metrics rather than collecting human ratings of generated text.",
      "The contextual grounding check filters responses at inference time and does not gather reviewer scores.",
      "Autopilot ranks candidate models it trained on tabular data and involves no human rating workflow."
    ],
    services: ["Amazon Bedrock Model Evaluation"],
    tags: ["human evaluation", "bedrock model evaluation"]
  },
  {
    id: "3.4-027",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "easy",
    stem: "A team measures how often users accept the assistant's first suggested reply and how long sessions last after a new model release. What category of evaluation is the team performing?",
    options: [
      "Intrinsic model evaluation with perplexity",
      "Robustness testing with perturbed inputs",
      "Retrieval relevance evaluation",
      "User engagement measurement against business objectives"
    ],
    answer: [3],
    explanation: "Acceptance rate and session duration are user engagement signals used to judge whether the deployed solution meets business objectives. These operational outcome measures complement offline model metrics and often reveal issues that offline scores miss. Perplexity, robustness, and retrieval relevance are model or pipeline level measurements.",
    rationales: [
      "Perplexity is an intrinsic language modeling score, not a measure of user behavior.",
      "Robustness testing perturbs inputs to check output stability rather than tracking user behavior.",
      "Retrieval relevance evaluates retrieved passages in a RAG pipeline, not engagement.",
      ""
    ],
    services: [],
    tags: ["user engagement", "business metrics"]
  },
  {
    id: "3.4-028",
    domain: 3,
    task: "3.4",
    type: "multi",
    difficulty: "hard",
    stem: "A pharmaceutical company evaluates a RAG assistant that answers regulatory questions from an approved document set. Which two evaluation questions map to answer quality rather than retrieval quality? (Select TWO.)",
    options: [
      "Is every statement in the answer supported by the retrieved passages?",
      "Does the final answer match the verified correct answer for the question?",
      "Were the top ranked passages relevant to the question asked?",
      "How many documents were indexed in the vector store?",
      "What is the average embedding dimension of the index?"
    ],
    answer: [0, 1],
    explanation: "Faithfulness asks whether the answer's claims are grounded in the retrieved context, and answer correctness asks whether the final response matches the verified truth; both evaluate the generated answer. Passage relevance evaluates retrieval, while index size and embedding dimension are configuration facts. Separating these dimensions tells the team whether to fix retrieval or generation.",
    rationales: [
      "",
      "",
      "Relevance of top ranked passages is a retrieval stage measurement, not an answer quality measurement.",
      "The number of indexed documents describes corpus size and does not evaluate any output.",
      "Embedding dimension is an index configuration detail with no evaluation meaning by itself."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["rag evaluation", "answer correctness", "faithfulness"]
  },
  {
    id: "3.4-029",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "Two language models are evaluated on the same held-out text corpus. Model A has a perplexity of 12 and Model B has a perplexity of 45 on that corpus. What does this comparison indicate?",
    options: [
      "Model B predicts the corpus better because higher perplexity means more knowledge",
      "The models are equivalent because perplexity is not comparable across models",
      "Model A predicts the corpus tokens better because lower perplexity means less surprise",
      "Model A is guaranteed to produce safer output than Model B"
    ],
    answer: [2],
    explanation: "Perplexity quantifies how surprised a model is by a text sample; lower values mean the model assigns higher probability to the actual tokens, so Model A fits this corpus better. On the same corpus and tokenization basis, perplexity comparisons are meaningful. Perplexity says nothing about safety, and higher values indicate worse, not better, prediction.",
    rationales: [
      "Higher perplexity indicates the model was more surprised by the tokens, which is worse prediction, not more knowledge.",
      "When measured on the same corpus under comparable conditions, perplexity differences are informative.",
      "",
      "Perplexity does not measure toxicity or safety in any way."
    ],
    services: [],
    tags: ["perplexity", "metrics"]
  },
  {
    id: "3.4-030",
    domain: 3,
    task: "3.4",
    type: "ordering",
    difficulty: "hard",
    stem: "A retail bank plans to roll out a new foundation model version for its virtual assistant while minimizing customer risk. Arrange the evaluation and release activities in a sensible order.",
    options: [
      "Run an A/B test on a small share of live traffic and compare business metrics",
      "Score the candidate offline on a curated evaluation dataset with automatic metrics",
      "Roll the new version out to all users after results confirm improvement",
      "Mirror production traffic to the candidate in a shadow deployment and review its logged responses"
    ],
    answer: [1, 3, 0, 2],
    explanation: "Risk increases with each stage of exposure, so teams evaluate offline first, then shadow the candidate against real traffic without user exposure, then run a limited A/B test to measure real user outcomes, and only then roll out fully. Skipping earlier stages exposes customers to an unproven model, while skipping the A/B test means business impact is never confirmed with real users.",
    rationales: [],
    services: [],
    tags: ["a/b testing", "shadow deployment", "evaluation workflow"]
  },
  {
    id: "3.4-031",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A company uses an LLM-as-a-judge approach in Amazon Bedrock Model Evaluation to grade another model's answers. Which limitation should the team keep in mind when interpreting the results?",
    options: [
      "Judge models can carry their own biases and may prefer certain styles, so scores should be spot-checked against human judgments",
      "LLM-as-a-judge can evaluate only translation tasks",
      "Judge models can only output pass or fail with no scoring dimensions",
      "The judge must always be the same model that generated the answers"
    ],
    answer: [0],
    explanation: "An evaluator model is itself a foundation model, so it can exhibit biases such as favoring longer or more confident-sounding answers, and its judgments should be periodically validated against human review. Bedrock's LLM-as-a-judge grades responses across multiple quality and responsible AI dimensions on various task types and uses a separate evaluator model. Understanding this limitation prevents over-trusting automated judgments.",
    rationales: [
      "",
      "LLM-as-a-judge applies to many generation tasks, including question answering and summarization, not just translation.",
      "Judge evaluations produce scores across dimensions like correctness, helpfulness, and harmfulness, not only pass or fail.",
      "The evaluator is typically a different model from the one being evaluated, which reduces self-preference."
    ],
    services: ["Amazon Bedrock Model Evaluation"],
    tags: ["llm-as-a-judge", "misleading metrics"]
  },
  {
    id: "3.4-032",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "hard",
    stem: "A legal tech company compares two summarization models. Model X scores slightly higher on ROUGE, but lawyers reviewing samples find Model Y's summaries omit fewer critical clauses. The models cost the same to run. What is the MOST defensible selection decision?",
    options: [
      "Choose Model X because automatic metrics are objective and human review is anecdotal",
      "Choose Model Y because expert human judgment on the decisive quality dimension outweighs a small automatic metric difference",
      "Choose neither model until a benchmark leaderboard ranks them",
      "Choose Model X but lower its temperature so ROUGE improves further"
    ],
    answer: [1],
    explanation: "The purpose of evaluation is to predict success on the real task, and for legal summaries omitting critical clauses is the decisive failure mode. Expert human evaluation targeting that dimension is stronger evidence than a marginal ROUGE difference, since n-gram overlap does not weight clause criticality. Structured human review by qualified experts is a valid evaluation method, not an anecdote.",
    rationales: [
      "A systematic review by domain experts is a recognized evaluation method and directly measures the quality that matters here.",
      "",
      "Public leaderboards rank models on generic tasks and would not resolve a domain-specific completeness question.",
      "Tuning temperature to raise a metric optimizes the number rather than the actual business need."
    ],
    services: [],
    tags: ["human evaluation", "misleading metrics", "model selection"]
  },
  {
    id: "3.4-033",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "easy",
    stem: "In a question answering evaluation, a model's answer shares many tokens with the ground truth but is not identical to it. Which metric gives partial credit based on the overlap between predicted and reference answer tokens?",
    options: [
      "Exact match",
      "Perplexity",
      "F1 score over answer tokens",
      "Toxicity score"
    ],
    answer: [2],
    explanation: "Token-level F1 treats the predicted and reference answers as bags of tokens and combines precision and recall of the overlap, granting partial credit when the answer is close but not identical. It is commonly reported together with exact match on extractive QA benchmarks. Exact match is all-or-nothing, and the other options measure unrelated properties.",
    rationales: [
      "Exact match awards credit only for an identical string, with no partial credit.",
      "Perplexity measures how well a model predicts a text sample, not answer overlap.",
      "",
      "Toxicity scores harmful content and has nothing to do with answer accuracy."
    ],
    services: [],
    tags: ["f1", "exact match", "question answering"]
  },
  {
    id: "3.4-034",
    domain: 3,
    task: "3.4",
    type: "multi",
    difficulty: "easy",
    stem: "A startup is choosing metrics for two generative tasks: translating support articles and summarizing meeting transcripts. Which two metric-to-task pairings are conventionally correct? (Select TWO.)",
    options: [
      "BLEU for the translation task",
      "ROUGE for the summarization task",
      "BLEU for measuring summary recall",
      "ROUGE for measuring clustering quality",
      "Perplexity for measuring translation adequacy against references"
    ],
    answer: [0, 1],
    explanation: "By convention BLEU evaluates machine translation using n-gram precision against reference translations, while ROUGE evaluates summarization with an emphasis on n-gram recall against reference summaries. Remembering that pairing, and the precision versus recall orientation, is a frequently tested distinction. Perplexity uses no references, and clustering quality is unrelated to ROUGE.",
    rationales: [
      "",
      "",
      "BLEU is precision oriented and designed for translation, not for measuring recall of summary content.",
      "ROUGE compares generated text with references and has no role in clustering evaluation.",
      "Perplexity does not compare output to references, so it cannot measure translation adequacy."
    ],
    services: [],
    tags: ["bleu", "rouge", "metrics"]
  },
  {
    id: "3.4-035",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "An e-learning company calculated that its generative AI tutor costs 0.04 dollars per inference and each tutoring session averages 30 inferences. Leadership asks whether the feature should continue. Which additional information is MOST important for that decision?",
    options: [
      "The measurable benefit per session, such as improved course completion or subscription retention attributable to the tutor",
      "The tutor model's score on a public commonsense reasoning benchmark",
      "The number of parameters in the underlying foundation model",
      "The tokenizer vocabulary size used by the model"
    ],
    answer: [0],
    explanation: "Judging whether a model meets business objectives requires weighing cost per inference against the value produced, such as retention, completion, conversion, or productivity gains attributable to the feature. Cost alone cannot answer a continue-or-stop question without the benefit side. Benchmark scores and architecture details do not translate into business value directly.",
    rationales: [
      "",
      "A public benchmark score does not show the feature's effect on this company's learners or revenue.",
      "Parameter count is an architecture characteristic, not a business outcome.",
      "Vocabulary size affects tokenization behavior and is irrelevant to the investment decision."
    ],
    services: [],
    tags: ["cost per inference", "business metrics"]
  },
  {
    id: "3.4-036",
    domain: 3,
    task: "3.4",
    type: "single",
    difficulty: "medium",
    stem: "A manufacturing analytics team must report evaluation results for a text classification model built on a foundation model. The team cares equally about not missing defective-part reports and not raising false alarms. Which single metric combines both concerns?",
    options: [
      "Recall only",
      "Precision only",
      "BERTScore",
      "F1 score"
    ],
    answer: [3],
    explanation: "F1 is the harmonic mean of precision and recall, so it penalizes a model that sacrifices either missing true defect reports or flooding the team with false alarms. When both error types matter about equally, F1 is the standard single summary metric. Precision or recall alone captures only one side, and BERTScore measures semantic similarity of generated text rather than classification quality.",
    rationales: [
      "Recall alone ignores false alarms, which the team also wants to limit.",
      "Precision alone ignores missed defect reports.",
      "BERTScore compares embeddings of generated and reference text and is not a classification metric.",
      ""
    ],
    services: [],
    tags: ["f1", "classification", "metrics"]
  }
);
