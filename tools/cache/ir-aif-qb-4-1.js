window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "4.1-001",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "easy",
    stem: "A hospital deploys a model that scores patient readmission risk. Clinicians will not trust the scores unless they can see which patient attributes drove each individual score. Which dimension of responsible AI does this requirement primarily address?",
    options: [
      "Explainability",
      "Controllability",
      "Sustainability",
      "Privacy and security"
    ],
    answer: [0],
    explanation: "Explainability is the ability to understand and describe how a model arrives at its outputs, including which inputs influenced a specific prediction. Feature attribution techniques such as SHAP values support this dimension. The other dimensions address different concerns, so they do not answer the clinicians' question.",
    rationales: [
      "",
      "Controllability is about monitoring and steering AI behavior after deployment, not describing why a prediction was made.",
      "Sustainability concerns the environmental impact of compute and energy used by AI workloads.",
      "Privacy and security concerns protecting data and models from exposure or misuse."
    ],
    services: [],
    tags: ["responsible ai dimensions", "explainability"]
  },
  {
    id: "4.1-002",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "easy",
    stem: "A finance company creates an AI review board, documented approval gates before any model reaches production, and a central inventory of models with named owners. Which responsible AI dimension are these practices establishing?",
    options: [
      "Fairness",
      "Governance",
      "Veracity and robustness",
      "Explainability"
    ],
    answer: [1],
    explanation: "Governance covers the policies, roles, accountability, and oversight processes that guide how AI is built and operated. Review boards, approval gates, and model inventories are governance controls. Fairness, robustness, and explainability are outcomes that a governance program helps enforce, but they are not the same as the oversight structure itself.",
    rationales: [
      "Fairness concerns whether outcomes differ unjustifiably across groups, which is measured rather than created by a review board.",
      "",
      "Veracity and robustness concern truthful outputs and stable behavior under unexpected inputs.",
      "Explainability concerns describing how the model reaches its outputs."
    ],
    services: [],
    tags: ["responsible ai dimensions", "governance"]
  },
  {
    id: "4.1-003",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A media company launches a generative AI assistant and wants mechanisms to observe its behavior in production and to constrain or disable specific capabilities quickly if the assistant drifts from its intended use. Which responsible AI dimension is the company addressing?",
    options: [
      "Veracity and robustness",
      "Transparency",
      "Controllability",
      "Fairness"
    ],
    answer: [2],
    explanation: "Controllability is the ability to monitor an AI system and steer or restrict its behavior after it is deployed. Logging, guardrails that can be tightened, and kill switches are controllability mechanisms. The other dimensions describe accuracy, disclosure, and equitable outcomes rather than operational control.",
    rationales: [
      "Veracity and robustness describe whether outputs are truthful and stable under noisy or adversarial inputs.",
      "Transparency is about disclosing how and where AI is used so stakeholders can make informed choices.",
      "",
      "Fairness concerns unjustified differences in outcomes across groups of users."
    ],
    services: [],
    tags: ["responsible ai dimensions", "controllability"]
  },
  {
    id: "4.1-004",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A bank trains a loan approval model on ten years of historical decisions. Auditors find the model approves applicants from one postal code region at a much lower rate, mirroring past lending practices. What is the most likely source of this behavior?",
    options: [
      "The model is underfitting because it has too few parameters",
      "Bias present in the historical training data has been learned and reproduced by the model",
      "The inference endpoint is configured with too high a temperature value",
      "The model lacks sufficient provisioned throughput to score all applicants"
    ],
    answer: [1],
    explanation: "Models learn the patterns in their training data, including discriminatory patterns embedded in historical human decisions. This is historical or societal bias, and retraining on the same data will reproduce it. Mitigation requires examining and rebalancing the data and measuring outcome disparities, not tuning infrastructure.",
    rationales: [
      "Underfitting produces uniformly poor accuracy, not a systematic disparity between groups.",
      "",
      "Temperature affects generative sampling randomness and does not apply to a tabular classification model.",
      "Throughput is a capacity concern and has no effect on which applicants are approved."
    ],
    services: [],
    tags: ["bias", "fairness"]
  },
  {
    id: "4.1-005",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A data science team wants to measure whether a training dataset over-represents one demographic group before any model is trained. Which AWS capability is designed for this?",
    options: [
      "Amazon SageMaker Model Monitor",
      "Amazon SageMaker Clarify pre-training bias metrics",
      "Amazon SageMaker Feature Store",
      "Amazon Bedrock Guardrails"
    ],
    answer: [1],
    explanation: "SageMaker Clarify computes pre-training bias metrics such as class imbalance and difference in proportions of labels directly on the dataset, before a model exists. Post-training metrics then measure disparities in model predictions. Model Monitor watches deployed endpoints, and Guardrails filters generative model content.",
    rationales: [
      "Model Monitor detects drift and quality issues on a deployed endpoint, which requires a trained model.",
      "",
      "Feature Store stores and serves engineered features; it does not compute fairness metrics.",
      "Guardrails applies content and topic policies to generative AI, not dataset bias analysis."
    ],
    services: ["Amazon SageMaker Clarify"],
    tags: ["bias detection", "clarify"]
  },
  {
    id: "4.1-006",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "easy",
    stem: "A company launches a customer-facing chatbot built on a foundation model. Leadership wants to prevent the assistant from discussing competitor products or giving financial advice. Which Amazon Bedrock capability addresses this most directly?",
    options: [
      "Amazon Bedrock Knowledge Bases",
      "Amazon Bedrock Guardrails denied topics",
      "Amazon Bedrock Agents",
      "Provisioned Throughput"
    ],
    answer: [1],
    explanation: "Denied topics in Amazon Bedrock Guardrails let you define subjects the model must refuse, described in natural language, and the guardrail blocks matching prompts and responses. Knowledge Bases add retrieval, Agents orchestrate multistep tasks, and Provisioned Throughput reserves capacity.",
    rationales: [
      "Knowledge Bases ground answers in your data; they do not restrict subject matter.",
      "",
      "Agents call tools and APIs to complete tasks; they are not a content policy mechanism.",
      "Provisioned Throughput is a capacity and pricing model with no content controls."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["guardrails", "denied topics"]
  },
  {
    id: "4.1-007",
    domain: 4,
    task: "4.1",
    type: "multi",
    difficulty: "medium",
    stem: "A healthcare startup must stop protected health information from appearing in generative AI responses and must also block violent content. Which two Amazon Bedrock Guardrails features address these requirements? (Select TWO.)",
    options: [
      "Sensitive information filters that detect and redact or block PII",
      "Content filters configured for the violence category",
      "Provisioned Throughput reservations",
      "Custom Model Import",
      "Prompt caching"
    ],
    answer: [0, 1],
    explanation: "Sensitive information filters in Guardrails detect PII entities and either block the request or mask the values. Content filters assign strength levels to harmful categories including violence, hate, insults, sexual content, and misconduct. The remaining options concern capacity, model deployment, and latency optimization.",
    rationales: [
      "",
      "",
      "Provisioned Throughput reserves inference capacity and enforces no content policy.",
      "Custom Model Import brings your own model weights into Bedrock; it is not a safety control.",
      "Prompt caching reduces latency and cost for repeated prompt prefixes, not content risk."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["guardrails", "pii"]
  },
  {
    id: "4.1-008",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "hard",
    stem: "An insurance company runs a generative assistant that answers policy questions from an internal document store. Compliance requires that the assistant refuse to answer when its response is not supported by the retrieved documents. Which Amazon Bedrock Guardrails capability meets this requirement?",
    options: [
      "Word filters",
      "Contextual grounding checks",
      "Denied topics",
      "Sensitive information filters"
    ],
    answer: [1],
    explanation: "Contextual grounding checks evaluate whether a model response is factually grounded in the supplied source passages and whether it is relevant to the user query, filtering responses that fall below configured thresholds. This is the guardrail feature aimed specifically at hallucination in RAG applications. The other filters target profanity, subject matter, and sensitive data.",
    rationales: [
      "Word filters block specific words and phrases such as profanity or competitor names.",
      "",
      "Denied topics refuse whole subject areas regardless of whether sources support the answer.",
      "Sensitive information filters detect and mask PII, which is a different concern."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["guardrails", "hallucination", "grounding"]
  },
  {
    id: "4.1-009",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A logistics company deploys a document classification model and wants low-confidence predictions routed to human reviewers before any action is taken. Which AWS service provides this workflow?",
    options: [
      "Amazon Augmented AI (A2I)",
      "Amazon SageMaker Model Monitor",
      "Amazon SageMaker Ground Truth",
      "AWS Audit Manager"
    ],
    answer: [0],
    explanation: "Amazon Augmented AI (A2I) inserts human review into machine learning workflows, triggering review tasks when confidence falls below a threshold or on a sampled basis. Ground Truth labels datasets for training, Model Monitor watches for drift, and Audit Manager collects compliance evidence.",
    rationales: [
      "",
      "Model Monitor reports data and quality drift on endpoints; it does not route items to reviewers.",
      "Ground Truth builds labeled training datasets, which happens before deployment.",
      "Audit Manager automates evidence collection for audits, unrelated to per-prediction review."
    ],
    services: ["Amazon Augmented AI (A2I)"],
    tags: ["human in the loop", "a2i"]
  },
  {
    id: "4.1-010",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A model trained to detect defects performs well on the manufacturer's own factory images but fails badly on images from a newly acquired plant with different lighting. Which responsible AI dimension is most clearly lacking?",
    options: [
      "Governance",
      "Robustness",
      "Transparency",
      "Privacy and security"
    ],
    answer: [1],
    explanation: "Robustness is the ability of a system to maintain reliable performance when inputs differ from training conditions, including noisy, shifted, or adversarial data. Failing on a new plant's lighting is a robustness and generalization gap, typically addressed with more diverse training data and augmentation.",
    rationales: [
      "Governance concerns oversight policies and accountability structures, not generalization.",
      "",
      "Transparency concerns disclosing where and how AI is used to stakeholders.",
      "Privacy and security concern protecting data and models from exposure."
    ],
    services: [],
    tags: ["robustness", "responsible ai dimensions"]
  },
  {
    id: "4.1-011",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A retailer's training set for a facial analysis feature contains images that heavily over-represent one skin tone. Which mitigation most directly addresses the root cause?",
    options: [
      "Increase the model's learning rate during training",
      "Collect additional representative data and balance the dataset across groups",
      "Raise the inference confidence threshold for all predictions",
      "Deploy the model to a larger instance type"
    ],
    answer: [1],
    explanation: "Unbalanced representation is a data problem, so the durable fix is curating a more inclusive and diverse dataset, supplemented where appropriate by data augmentation or re-weighting. Adjusting hyperparameters, thresholds, or instance sizes does not add the missing information about under-represented groups.",
    rationales: [
      "Learning rate affects optimization speed and stability, not dataset representativeness.",
      "",
      "A higher threshold suppresses low-confidence outputs but leaves the underlying disparity intact.",
      "Instance size affects throughput and cost, never fairness."
    ],
    services: [],
    tags: ["bias mitigation", "dataset"]
  },
  {
    id: "4.1-012",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "hard",
    stem: "A team needs to explain which input features contributed most to an individual credit-scoring prediction so an adverse action notice can be issued. Which SageMaker Clarify capability provides this?",
    options: [
      "Class imbalance metric",
      "SHAP-based feature attribution",
      "Difference in proportions of labels",
      "Data quality baseline"
    ],
    answer: [1],
    explanation: "SageMaker Clarify uses SHAP values to attribute a prediction to individual input features, supporting both global explanations across a dataset and local explanations for a single record. Class imbalance and difference in proportions of labels are bias metrics that describe dataset composition, not per-prediction attribution.",
    rationales: [
      "Class imbalance measures how unevenly a facet is represented in the dataset.",
      "",
      "Difference in proportions of labels compares positive outcome rates across groups, not feature influence.",
      "A data quality baseline captures statistics used to detect drift later."
    ],
    services: ["Amazon SageMaker Clarify"],
    tags: ["explainability", "shap"]
  },
  {
    id: "4.1-013",
    domain: 4,
    task: "4.1",
    type: "multi",
    difficulty: "medium",
    stem: "A media company plans to use a generative model to produce marketing images. Legal raises intellectual property concerns. Which two practices reduce this risk? (Select TWO.)",
    options: [
      "Review the model provider's terms regarding training data and output ownership",
      "Add human review of generated assets before publication",
      "Increase the temperature parameter to produce more original outputs",
      "Store all generated images in a separate AWS Region",
      "Enable Provisioned Throughput for the image model"
    ],
    answer: [0, 1],
    explanation: "Intellectual property risk in generative AI is managed through contractual and procedural controls: understanding the provider's licensing and indemnification terms, and inserting human review to catch outputs that resemble protected works. Sampling parameters, Region choice, and throughput settings have no bearing on IP exposure.",
    rationales: [
      "",
      "",
      "Temperature changes randomness of sampling; it does not establish that output is legally clear.",
      "Region selection affects data residency and latency, not copyright status.",
      "Provisioned Throughput reserves capacity and carries no legal effect."
    ],
    services: [],
    tags: ["intellectual property", "legal risk"]
  },
  {
    id: "4.1-014",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "easy",
    stem: "Which statement best describes the relationship between bias and variance in a machine learning model?",
    options: [
      "High bias means the model memorizes training data; high variance means it oversimplifies",
      "High bias means the model oversimplifies and underfits; high variance means it is overly sensitive to training data and overfits",
      "Bias and variance both increase together as model complexity increases",
      "Bias applies only to generative models and variance only to classification models"
    ],
    answer: [1],
    explanation: "In the statistical sense, high bias means the model makes strong simplifying assumptions and underfits, missing real patterns. High variance means the model fits noise in the training set and fails to generalize, which is overfitting. Increasing complexity typically lowers bias while raising variance, which is the classic tradeoff.",
    rationales: [
      "This reverses the definitions; memorizing training data is high variance.",
      "",
      "They generally move in opposite directions as complexity changes, which is why it is a tradeoff.",
      "Both concepts apply across model families and tasks."
    ],
    services: [],
    tags: ["bias variance", "fundamentals"]
  },
  {
    id: "4.1-015",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A public sector agency must apply the same content safety policy to a model it hosts outside Amazon Bedrock as well as to its Bedrock models. Which approach allows a single guardrail configuration to be reused?",
    options: [
      "Attach the guardrail to a Bedrock Knowledge Base",
      "Call the independent ApplyGuardrail API to evaluate text from any source",
      "Enable Bedrock Model Evaluation on the external model",
      "Configure the guardrail as a SageMaker Model Monitor schedule"
    ],
    answer: [1],
    explanation: "The ApplyGuardrail API evaluates arbitrary text against a configured guardrail independently of a model invocation, so the same policy can protect self-hosted models, third-party models, or application text. Attaching a guardrail to a Bedrock invocation only covers that path.",
    rationales: [
      "Attaching to a Knowledge Base covers Bedrock retrieval flows, not an externally hosted model.",
      "",
      "Model Evaluation scores model quality; it does not enforce runtime content policy.",
      "Model Monitor tracks drift and quality metrics on SageMaker endpoints, not content safety policy."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["guardrails", "applyguardrail"]
  },
  {
    id: "4.1-016",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A company discovers that its deployed fraud model has quietly degraded because spending patterns shifted after a holiday season. Which governance practice would have surfaced this earliest?",
    options: [
      "Continuous monitoring of model quality and data drift in production",
      "A one-time fairness audit performed before launch",
      "Increasing the size of the training dataset",
      "Publishing an AI Service Card for the model"
    ],
    answer: [0],
    explanation: "Model behavior changes as the world changes, so responsible operation requires ongoing monitoring of input distributions and prediction quality with alerting and retraining triggers. A pre-launch audit is a point-in-time snapshot and cannot detect post-deployment drift.",
    rationales: [
      "",
      "A launch-time audit says nothing about behavior months later once data has shifted.",
      "More training data may help accuracy but does not detect a later distribution shift.",
      "Service cards document intended use and limitations; they are not a monitoring control."
    ],
    services: ["Amazon SageMaker Model Monitor"],
    tags: ["monitoring", "drift", "governance"]
  },
  {
    id: "4.1-017",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "easy",
    stem: "Which dataset characteristic most directly supports fairness in a model used across many countries?",
    options: [
      "A dataset stored in a single AWS Region for consistency",
      "A dataset that is inclusive and diverse, representing the populations the model will serve",
      "A dataset compressed to reduce storage cost",
      "A dataset consisting entirely of synthetic records"
    ],
    answer: [1],
    explanation: "Fairness depends on whether the training data represents the people the system will affect. Inclusive, diverse, and balanced datasets reduce the chance that a group is systematically mispredicted. Storage location, compression, and synthetic-only sourcing do not by themselves ensure representativeness.",
    rationales: [
      "Region choice concerns residency and latency, not who is represented in the data.",
      "",
      "Compression is a storage optimization with no effect on data composition.",
      "Purely synthetic data can still encode the biases of the process that generated it."
    ],
    services: [],
    tags: ["fairness", "dataset"]
  },
  {
    id: "4.1-018",
    domain: 4,
    task: "4.1",
    type: "multi",
    difficulty: "hard",
    stem: "An organization is defining consequences it must guard against from a poorly governed generative AI deployment. Which two are realistic business impacts? (Select TWO.)",
    options: [
      "Regulatory penalties and legal exposure from discriminatory or non-compliant outputs",
      "Reputational damage from toxic or fabricated content reaching customers",
      "Automatic reduction of Amazon S3 storage costs",
      "Guaranteed elimination of all model hallucinations",
      "Permanent loss of access to foundation models in the AWS Region"
    ],
    answer: [0, 1],
    explanation: "Weak governance exposes an organization to legal and regulatory consequences when outputs are discriminatory, non-compliant, or unsafe, and to reputational harm when customers encounter toxic or fabricated content. The remaining options describe unrelated cost effects, an impossible guarantee, and a consequence AWS does not impose.",
    rationales: [
      "",
      "",
      "Governance practices do not change storage pricing.",
      "No governance program eliminates hallucination entirely; it reduces and detects it.",
      "AWS does not revoke Regional model access as a penalty for governance gaps."
    ],
    services: [],
    tags: ["governance", "business risk"]
  },
  {
    id: "4.1-019",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A sustainability team asks how the company can reduce the environmental footprint of its machine learning workloads. Which action is most aligned with that goal?",
    options: [
      "Train every model from scratch to maximize control",
      "Start from a pre-trained foundation model and fine-tune only when required",
      "Run all training jobs on general purpose CPU instances",
      "Increase the number of training epochs to improve accuracy"
    ],
    answer: [1],
    explanation: "Reusing a pre-trained model and customizing it, or using prompt engineering and retrieval before considering training, avoids the very large compute cost of pre-training. Purpose-built accelerators such as AWS Trainium and right-sized jobs further reduce energy use, whereas training from scratch and extra epochs increase it.",
    rationales: [
      "Training from scratch is the most compute and energy intensive option available.",
      "",
      "CPUs are typically far less efficient than accelerators for deep learning training workloads.",
      "More epochs consume more compute and often yield diminishing or negative returns."
    ],
    services: [],
    tags: ["sustainability", "responsible ai dimensions"]
  },
  {
    id: "4.1-020",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A support assistant confidently tells a customer about a refund policy that does not exist. What is this failure called, and which mitigation is most directly targeted at it?",
    options: [
      "Overfitting, mitigated by adding regularization",
      "Hallucination, mitigated by grounding responses in retrieved source documents",
      "Data drift, mitigated by retraining on newer data",
      "Prompt injection, mitigated by input validation"
    ],
    answer: [1],
    explanation: "A hallucination is fluent output that is not supported by any real source. Grounding the model in authoritative content through retrieval augmented generation, and verifying groundedness with contextual grounding checks, is the standard mitigation. The other terms describe different failure modes.",
    rationales: [
      "Overfitting is a training generalization problem, not fabricated generative content.",
      "",
      "Data drift describes changing input distributions over time, not invented facts.",
      "Prompt injection is an adversarial input attack, not spontaneous fabrication."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["hallucination", "veracity"]
  },
  {
    id: "4.1-021",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "hard",
    stem: "A lender must show a regulator that its model does not produce a materially different approval rate for a protected group after training. Which SageMaker Clarify measurement addresses this?",
    options: [
      "A pre-training class imbalance metric",
      "A post-training bias metric such as difference in positive proportions in predicted labels",
      "A partial dependence plot of a single feature",
      "An endpoint latency percentile report"
    ],
    answer: [1],
    explanation: "Post-training bias metrics compare model outcomes across groups, for example the difference in positive prediction rates or disparate impact ratio, which is what a regulator asking about approval rates wants. Pre-training metrics describe only the dataset, before the model's behavior exists.",
    rationales: [
      "Class imbalance describes dataset composition, not the model's predicted outcomes.",
      "",
      "Partial dependence shows how a feature influences predictions on average, not group disparity.",
      "Latency is an operational metric with no fairness meaning."
    ],
    services: ["Amazon SageMaker Clarify"],
    tags: ["bias metrics", "fairness"]
  },
  {
    id: "4.1-022",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "easy",
    stem: "Which responsible AI dimension is concerned with clearly disclosing to users that they are interacting with an AI system and what its limitations are?",
    options: [
      "Transparency",
      "Controllability",
      "Robustness",
      "Fairness"
    ],
    answer: [0],
    explanation: "Transparency is about openly communicating how and where AI is used, what data informs it, and what its known limitations are, so people can make informed decisions. Explainability is the related but distinct question of describing how a specific output was produced.",
    rationales: [
      "",
      "Controllability is the ability to monitor and steer a deployed system's behavior.",
      "Robustness concerns reliable performance under unexpected or adversarial inputs.",
      "Fairness concerns unjustified differences in outcomes across groups."
    ],
    services: [],
    tags: ["transparency", "responsible ai dimensions"]
  },
  {
    id: "4.1-023",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A hiring platform wants to reduce the chance that its resume screening model penalizes candidates who took career breaks. Which combination of steps best reflects responsible practice?",
    options: [
      "Remove the model from production and rely only on keyword search",
      "Audit the dataset for representation, measure outcome disparities, and keep a human decision-maker in the loop",
      "Retrain the model weekly with the same historical data",
      "Increase model size so it can learn more nuanced patterns"
    ],
    answer: [1],
    explanation: "Responsible deployment combines data auditing, quantitative fairness measurement on outcomes, and human oversight for consequential decisions. Retraining on the same biased history repeats the problem, and a larger model learns existing patterns more strongly rather than correcting them.",
    rationales: [
      "Abandoning the system entirely is rarely required and keyword search has its own bias problems.",
      "",
      "Repeating training on unchanged historical data reproduces the same disparities.",
      "Model capacity does not correct bias in the underlying data."
    ],
    services: [],
    tags: ["fairness", "human oversight"]
  },
  {
    id: "4.1-024",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "Which of the following best describes the purpose of an AWS AI Service Card?",
    options: [
      "A billing statement showing per-service AI usage costs",
      "Documentation describing an AWS AI service's intended use cases, limitations, and responsible design choices",
      "A configuration file that enables content filtering",
      "A certificate proving a model passed a fairness audit"
    ],
    answer: [1],
    explanation: "AWS AI Service Cards are transparency documents that describe an AWS AI service's intended use cases, how it was designed and tested, and its known limitations and responsible AI considerations. They inform appropriate use; they are not billing artifacts, runtime configuration, or certifications.",
    rationales: [
      "Cost and usage information appears in AWS Billing and Cost Management, not service cards.",
      "",
      "Content filtering is configured in Amazon Bedrock Guardrails, not in a service card.",
      "A service card documents design and limitations; it does not certify audit results."
    ],
    services: ["AWS AI Service Cards"],
    tags: ["transparency", "documentation"]
  },
  {
    id: "4.1-025",
    domain: 4,
    task: "4.1",
    type: "multi",
    difficulty: "medium",
    stem: "A company is designing human oversight for a generative AI system that drafts customer emails. Which two design choices strengthen controllability? (Select TWO.)",
    options: [
      "Logging every prompt and response for later review",
      "Requiring human approval before any drafted email is sent",
      "Removing all logging to reduce storage costs",
      "Allowing the model unrestricted access to internal APIs",
      "Disabling all guardrails to avoid blocking legitimate drafts"
    ],
    answer: [0, 1],
    explanation: "Controllability means the operator can observe and steer the system. Comprehensive invocation logging provides the observability, and a human approval gate before an irreversible action provides the control. The other options remove visibility, widen blast radius, and remove safety enforcement.",
    rationales: [
      "",
      "",
      "Removing logging eliminates the ability to audit or investigate model behavior.",
      "Unrestricted tool access increases the impact of a mistake or an injection attack.",
      "Disabling guardrails removes the enforcement layer that keeps outputs within policy."
    ],
    services: [],
    tags: ["controllability", "human oversight"]
  },
  {
    id: "4.1-026",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "hard",
    stem: "An engineering team wants automated verification that a model's answers about company policy are logically consistent with a formal specification of that policy. Which Amazon Bedrock Guardrails capability targets this?",
    options: [
      "Content filters",
      "Automated Reasoning checks",
      "Word filters",
      "Denied topics"
    ],
    answer: [1],
    explanation: "Automated Reasoning checks in Amazon Bedrock Guardrails use formal, logic-based verification against an encoded policy model to determine whether a response is consistent with defined rules, which addresses factual and policy correctness rather than harmful content. Content filters, word filters, and denied topics screen for harm, specific terms, and subject matter.",
    rationales: [
      "Content filters score harmful categories such as hate and violence, not logical consistency.",
      "",
      "Word filters match specific words and phrases; they perform no reasoning.",
      "Denied topics block subject areas entirely rather than verifying correctness."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["guardrails", "automated reasoning"]
  },
  {
    id: "4.1-027",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A team must decide when human review is most warranted in an AI workflow. Which situation makes human-in-the-loop review most important?",
    options: [
      "A model that suggests background colors for a marketing slide",
      "A model that recommends whether to deny a medical claim",
      "A model that autocompletes internal search queries",
      "A model that tags photos with generic scene labels"
    ],
    answer: [1],
    explanation: "Human review is prioritized where errors carry high consequence for individuals, such as medical, financial, legal, or employment decisions. Low-stakes, easily reversible outputs like styling suggestions or search autocomplete do not justify the same cost and latency of review.",
    rationales: [
      "A color suggestion is trivially reversible and carries no material consequence.",
      "",
      "An incorrect query suggestion is immediately visible and costless to ignore.",
      "Generic scene tags are low impact and easily corrected."
    ],
    services: ["Amazon Augmented AI (A2I)"],
    tags: ["human in the loop", "risk"]
  },
  {
    id: "4.1-028",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "easy",
    stem: "Which responsible AI dimension focuses on protecting training data and model artifacts from unauthorized access or exposure?",
    options: [
      "Veracity",
      "Privacy and security",
      "Explainability",
      "Fairness"
    ],
    answer: [1],
    explanation: "Privacy and security covers protecting data used to build and operate AI systems, preventing leakage of sensitive information through model outputs, and controlling access to models and endpoints. Veracity concerns truthfulness, explainability concerns describing decisions, and fairness concerns outcome equity.",
    rationales: [
      "Veracity is about outputs being truthful and accurate.",
      "",
      "Explainability is about describing how the model reached an output.",
      "Fairness is about equitable outcomes across groups."
    ],
    services: [],
    tags: ["privacy", "responsible ai dimensions"]
  },
  {
    id: "4.1-029",
    domain: 4,
    task: "4.1",
    type: "ordering",
    difficulty: "medium",
    stem: "A team is establishing a responsible AI review for a new generative feature. Place the following activities in the order they should occur.",
    options: [
      "Continuously monitor production outputs and feed issues back into the review",
      "Define the intended use, affected users, and unacceptable outcomes",
      "Configure guardrails and human review gates before launch",
      "Audit the data sources for representation, licensing, and sensitive content"
    ],
    answer: [1, 3, 2, 0],
    explanation: "Responsible AI work starts by defining intended use and the harms to avoid, since that determines what to measure. Data auditing follows, then technical and procedural safeguards are configured before launch, and finally production monitoring closes the loop by feeding real behavior back into the review.",
    rationales: [],
    services: [],
    tags: ["governance", "lifecycle"]
  },
  {
    id: "4.1-030",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A generative assistant occasionally produces insulting language when users are hostile. Which control most directly reduces this without retraining the model?",
    options: [
      "Configuring content filters for the insults category in Amazon Bedrock Guardrails",
      "Reducing the max tokens setting",
      "Switching the endpoint to Provisioned Throughput",
      "Enabling prompt caching"
    ],
    answer: [0],
    explanation: "Guardrails content filters score both prompts and responses across harmful categories including insults, and can block or mask content at configurable strength levels, all without changing the model. Token limits, capacity mode, and caching affect length, cost, and latency instead.",
    rationales: [
      "",
      "Fewer tokens produce shorter output but do not make it less toxic.",
      "Provisioned Throughput reserves capacity and applies no content policy.",
      "Prompt caching reuses computed prompt prefixes to cut latency and cost."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["toxicity", "guardrails"]
  },
  {
    id: "4.1-031",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "hard",
    stem: "Two candidate models perform similarly on overall accuracy, but one shows a much larger accuracy gap between demographic groups. Which decision best reflects responsible AI practice?",
    options: [
      "Choose the model with the smaller group gap, accepting equal overall accuracy",
      "Choose either model since overall accuracy is the same",
      "Choose the model with the larger gap if it trains faster",
      "Combine both models and average their predictions to hide the gap"
    ],
    answer: [0],
    explanation: "Aggregate accuracy can conceal that a model performs much worse for some groups. When overall performance is comparable, the model with more consistent performance across groups is the responsible choice. Averaging predictions to obscure a measured disparity conceals rather than fixes the problem.",
    rationales: [
      "",
      "Equal aggregate accuracy does not mean equal treatment; the disparity is a real harm.",
      "Training speed is an engineering convenience and does not outweigh a fairness gap.",
      "Ensembling to mask a disparity is a transparency failure and may not remove the gap."
    ],
    services: [],
    tags: ["fairness", "model selection"]
  },
  {
    id: "4.1-032",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A company wants to reduce the chance that its fine-tuning dataset causes the model to reveal customer names in later responses. Which practice addresses this best?",
    options: [
      "Increasing the number of fine-tuning epochs",
      "Removing or redacting personally identifiable information from the training data before fine-tuning",
      "Enabling streaming responses on the endpoint",
      "Choosing a larger base model"
    ],
    answer: [1],
    explanation: "Models can memorize and later emit distinctive strings from their training data, so sensitive values should be removed or redacted before fine-tuning. Amazon Macie can help discover sensitive data at scale. More epochs actually increase memorization risk, and streaming or model size do not affect what was learned.",
    rationales: [
      "More epochs increase the chance the model memorizes specific training examples.",
      "",
      "Streaming changes how tokens are delivered, not what the model learned.",
      "A larger base model does not remove sensitive data that was in the fine-tuning set."
    ],
    services: ["Amazon Macie"],
    tags: ["privacy", "fine-tuning", "data leakage"]
  },
  {
    id: "4.1-033",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "easy",
    stem: "Which responsible AI dimension is most concerned with whether a system's outputs are truthful and accurate?",
    options: [
      "Governance",
      "Veracity",
      "Controllability",
      "Transparency"
    ],
    answer: [1],
    explanation: "Veracity, often paired with robustness, is the dimension concerned with outputs being truthful, accurate, and reliable, which makes hallucination a veracity failure. Governance is oversight structure, controllability is operational steering, and transparency is disclosure.",
    rationales: [
      "Governance concerns policies, roles, and accountability.",
      "",
      "Controllability is the ability to monitor and constrain deployed behavior.",
      "Transparency concerns disclosing how and where AI is used."
    ],
    services: [],
    tags: ["veracity", "responsible ai dimensions"]
  },
  {
    id: "4.1-034",
    domain: 4,
    task: "4.1",
    type: "multi",
    difficulty: "hard",
    stem: "A retail company is preparing training data for a recommendation model and wants to reduce the risk of biased outcomes. Which two data practices are most relevant? (Select TWO.)",
    options: [
      "Verify that the dataset covers the full range of customer segments the model will serve",
      "Document the provenance and collection method of each data source",
      "Store the dataset in Amazon S3 Glacier to reduce cost",
      "Convert all numeric features to strings before training",
      "Duplicate the majority-class records to increase dataset size"
    ],
    answer: [0, 1],
    explanation: "Fair outcomes depend on representative coverage of the populations served and on knowing where data came from, since provenance reveals collection biases and licensing constraints. Archival storage class, type conversion, and duplicating the majority class are irrelevant or actively worsen imbalance.",
    rationales: [
      "",
      "",
      "Storage class affects retrieval time and cost, not data fairness.",
      "Changing feature types is a preprocessing detail unrelated to bias.",
      "Duplicating majority records worsens class imbalance rather than reducing it."
    ],
    services: [],
    tags: ["dataset", "bias mitigation", "data governance"]
  },
  {
    id: "4.1-035",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "During red-team testing, a user convinces a customer service assistant to ignore its instructions and reveal its system prompt. Which responsible AI concern does this illustrate?",
    options: [
      "Model drift",
      "Safety and security weakness from prompt injection",
      "Underfitting",
      "Class imbalance"
    ],
    answer: [1],
    explanation: "Persuading a model to disregard its instructions is prompt injection or jailbreaking, a safety and security weakness. Mitigations include input validation, clear delimiting of untrusted content, guardrails, and never placing secrets in the system prompt. The other options describe unrelated statistical or data issues.",
    rationales: [
      "Drift is a gradual change in data distribution over time, not an adversarial prompt.",
      "",
      "Underfitting is a training capacity problem, unrelated to instruction bypass.",
      "Class imbalance describes uneven label distribution in a dataset."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["prompt injection", "safety"]
  },
  {
    id: "4.1-036",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "A team argues that because their model is highly accurate, no fairness evaluation is needed. What is the strongest counterargument?",
    options: [
      "Accuracy always decreases when fairness is measured",
      "High aggregate accuracy can coexist with poor performance for a minority subgroup",
      "Fairness evaluation is required by AWS before deploying any model",
      "Accuracy is not a valid metric for classification problems"
    ],
    answer: [1],
    explanation: "An aggregate metric is dominated by the largest groups, so a model can be highly accurate overall while performing badly for a small but important subgroup. Disaggregated evaluation across groups is what reveals this, which is why fairness assessment is separate from headline accuracy.",
    rationales: [
      "Measuring fairness does not by itself change accuracy; it reveals how accuracy is distributed.",
      "",
      "AWS does not impose a mandatory fairness evaluation gate on customer deployments.",
      "Accuracy is a valid classification metric, though incomplete on imbalanced data."
    ],
    services: [],
    tags: ["fairness", "metrics"]
  },
  {
    id: "4.1-037",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "hard",
    stem: "A company wants a record of a model's intended use, training approach, evaluation results, and known limitations, maintained alongside the model itself for internal governance. Which SageMaker AI feature is purpose-built for this?",
    options: [
      "Amazon SageMaker Model Cards",
      "Amazon SageMaker Feature Store",
      "Amazon SageMaker Experiments",
      "Amazon SageMaker Data Wrangler"
    ],
    answer: [0],
    explanation: "SageMaker Model Cards capture model documentation including intended use, training details, evaluation results, and limitations in a single governed artifact tied to the model. Feature Store manages features, Experiments tracks training runs, and Data Wrangler prepares data.",
    rationales: [
      "",
      "Feature Store stores and serves engineered features for training and inference.",
      "Experiments organizes and compares training runs and their metrics.",
      "Data Wrangler is a data preparation and transformation tool."
    ],
    services: ["Amazon SageMaker Model Cards"],
    tags: ["documentation", "governance"]
  },
  {
    id: "4.1-038",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "Which statement about data augmentation as a bias mitigation technique is most accurate?",
    options: [
      "It eliminates the need to examine the original dataset",
      "It can increase the representation of under-represented groups but does not substitute for collecting genuinely diverse data",
      "It works only for tabular datasets",
      "It guarantees equal model accuracy across all groups"
    ],
    answer: [1],
    explanation: "Augmentation generates additional variations of existing examples, which can help balance a dataset and improve robustness, but it amplifies the information already present rather than adding genuinely new coverage. It is a useful supplement to, not a replacement for, representative data collection.",
    rationales: [
      "Examining the original data is what tells you which groups are under-represented in the first place.",
      "",
      "Augmentation is widely used for images, audio, and text as well as tabular data.",
      "No technique guarantees equal accuracy across groups; outcomes must still be measured."
    ],
    services: [],
    tags: ["bias mitigation", "data augmentation"]
  },
  {
    id: "4.1-039",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "easy",
    stem: "A generative AI feature is being launched in a regulated industry. Which practice best supports the safety dimension of responsible AI?",
    options: [
      "Testing the system against adversarial and edge-case prompts before release",
      "Selecting the largest available foundation model",
      "Increasing the context window size",
      "Deploying to multiple AWS Regions"
    ],
    answer: [0],
    explanation: "Safety is supported by deliberately probing the system with adversarial, harmful, and edge-case inputs before release so failure modes are found internally rather than by customers. Model size, context window, and multi-Region deployment address capability and availability, not safety behavior.",
    rationales: [
      "",
      "A larger model is not inherently safer and may produce more convincing unsafe output.",
      "Context window affects how much input the model can consider, not output safety.",
      "Multi-Region deployment improves availability and latency, not content safety."
    ],
    services: [],
    tags: ["safety", "testing"]
  },
  {
    id: "4.1-040",
    domain: 4,
    task: "4.1",
    type: "single",
    difficulty: "medium",
    stem: "Which scenario best illustrates a need for the fairness dimension rather than the explainability dimension?",
    options: [
      "A clinician asks which symptoms drove a specific diagnosis suggestion",
      "An auditor finds the model approves one gender at a significantly lower rate",
      "A developer wants to know which layer of a neural network activated most",
      "A user asks the assistant to cite the document its answer came from"
    ],
    answer: [1],
    explanation: "Fairness concerns whether outcomes differ unjustifiably across groups, which is exactly what a disparity in approval rates by gender represents. The other scenarios ask how a particular output was produced or where it came from, which are explainability and transparency questions.",
    rationales: [
      "Asking which inputs drove one prediction is an explainability question.",
      "",
      "Inspecting internal activations is a model interpretability and debugging concern.",
      "Requesting a source citation is about grounding and transparency of an individual answer."
    ],
    services: [],
    tags: ["fairness", "explainability"]
  }
);
