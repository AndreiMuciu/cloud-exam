window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "4.2-001",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "easy",
    stem: "A public sector agency is reviewing a machine learning model that screens benefits applications. The review board describes the model as a black box. What does this description mean?",
    options: [
      "The model was trained on data that the agency is not allowed to store.",
      "The internal logic that maps an input to a prediction cannot be readily inspected or described by a human reviewer.",
      "The model is deployed in a private subnet with no internet connectivity.",
      "The model returns a different prediction each time it receives the same input."
    ],
    answer: [1],
    explanation: "A black box (opaque) model is one whose internal decision process is not directly interpretable, which is typical of deep neural networks and large ensembles. Transparency is about being able to understand and describe how inputs lead to outputs, not about network isolation or data residency. Opaque models can still be explained after the fact with techniques such as feature attribution.",
    rationales: [
      "Data retention restrictions are a privacy and governance concern, not a definition of opacity.",
      "",
      "Network placement is an infrastructure control and has nothing to do with model interpretability.",
      "Nondeterminism is a separate property; most black-box classifiers are deterministic at inference time."
    ],
    services: [],
    tags: ["transparency", "black box models"]
  },
  {
    id: "4.2-002",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "easy",
    stem: "A finance company must tell each declined applicant which input factors most influenced the credit decision made by its Amazon SageMaker AI model. Which capability meets this requirement with the LEAST development effort?",
    options: [
      "Amazon SageMaker Model Monitor data quality monitoring",
      "Amazon SageMaker Feature Store",
      "Amazon SageMaker Clarify feature attribution explanations based on SHAP values",
      "Amazon Bedrock Guardrails content filters"
    ],
    answer: [2],
    explanation: "SageMaker Clarify computes SHAP feature attributions that quantify how much each input feature contributed to a prediction, both globally and for individual records. That is exactly what an adverse action notice or a customer explanation requires. The other services address data drift, feature reuse, and generative AI content filtering rather than explaining a prediction.",
    rationales: [
      "Model Monitor detects drift and data quality problems in production; it does not attribute a prediction to input features.",
      "Feature Store stores and serves features for training and inference; it produces no explanations.",
      "",
      "Guardrails filters harmful content in generative AI applications and does not explain a tabular model prediction."
    ],
    services: ["Amazon SageMaker Clarify"],
    tags: ["explainability", "feature attribution"]
  },
  {
    id: "4.2-003",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "easy",
    stem: "A media company plans to adopt an AWS managed AI service and needs published information about the service's intended use cases, design choices, and known limitations before approving it. Which resource should the company consult?",
    options: [
      "AWS AI Service Cards",
      "Amazon SageMaker Model Cards",
      "AWS Trusted Advisor checks",
      "Amazon SageMaker Model Dashboard"
    ],
    answer: [0],
    explanation: "AWS AI Service Cards are responsible AI documentation published by AWS for its AI services and Amazon models. They describe intended use cases, limitations, responsible AI design considerations, and performance optimization guidance. Model Cards, by contrast, are artifacts the customer creates to document their own models.",
    rationales: [
      "",
      "Model Cards document a customer's own trained models, not an AWS managed service.",
      "Trusted Advisor gives cost, performance, and security recommendations for AWS accounts.",
      "Model Dashboard monitors a customer's deployed models and endpoints."
    ],
    services: ["AWS AI Service Cards"],
    tags: ["ai service cards", "documentation"]
  },
  {
    id: "4.2-004",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "A healthcare organization needs a single governance artifact per model that records the model's intended use, training data description, evaluation results, risk rating, and approved caveats so internal auditors can review it. Which AWS capability should the organization use?",
    options: [
      "Amazon SageMaker Feature Store",
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker Canvas",
      "Amazon SageMaker Model Cards"
    ],
    answer: [3],
    explanation: "SageMaker Model Cards create a versioned, centralized record of a model's purpose, training details, evaluation metrics, risk rating, and intended and unintended uses. Auditors can use that documentation to review how a model was built and where it should not be applied. The other options support feature management, data labeling, and no-code model building.",
    rationales: [
      "Feature Store centralizes features for training and inference, not model documentation.",
      "Ground Truth creates labeled training datasets.",
      "Canvas is a no-code environment for building models, not a documentation registry.",
      ""
    ],
    services: ["Amazon SageMaker Model Cards"],
    tags: ["model cards", "governance"]
  },
  {
    id: "4.2-005",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "An ML platform team at a logistics company manages dozens of models across several accounts. Leadership wants one place to see all deployed models, their monitoring alert status, and any missing monitors. Which SageMaker capability provides this view?",
    options: [
      "Amazon SageMaker Model Dashboard",
      "Amazon SageMaker JumpStart",
      "Amazon SageMaker Clarify",
      "Amazon SageMaker Autopilot"
    ],
    answer: [0],
    explanation: "SageMaker Model Dashboard is a unified view of all models in an account, showing endpoint status, Model Monitor alert history, links to model cards and lineage, and which models lack monitoring. It supports transparency at the fleet level rather than for a single prediction. JumpStart, Clarify, and Autopilot serve model discovery, explainability analysis, and automated model building.",
    rationales: [
      "",
      "JumpStart is a hub of pretrained models and solution templates, not an oversight dashboard.",
      "Clarify explains individual models and detects bias; it does not aggregate fleet status.",
      "Autopilot builds models automatically from tabular data; it is not a monitoring view."
    ],
    services: ["Amazon SageMaker Model Dashboard"],
    tags: ["model dashboard", "monitoring"]
  },
  {
    id: "4.2-006",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "A bank must deploy a loan approval model in a jurisdiction where regulators require that every automated decision be fully traceable to explicit, human-readable rules on input variables. Model accuracy differences among candidates are small. Which model choice BEST satisfies the regulator?",
    options: [
      "A gradient-boosted tree ensemble with 2,000 trees plus post hoc SHAP explanations",
      "A deep neural network with an attention visualization layer",
      "A logistic regression model with a small set of well-understood features",
      "A fine-tuned foundation model accessed through Amazon Bedrock"
    ],
    answer: [2],
    explanation: "When regulators demand full traceability, an intrinsically interpretable model such as logistic regression is the right choice because its coefficients directly show how each feature moves the decision. Post hoc explanations of complex models are approximations and may not satisfy a requirement for exact, human-readable logic. Since the accuracy gap is small, the interpretability benefit dominates.",
    rationales: [
      "SHAP on a large ensemble is a post hoc approximation, not exact human-readable decision logic.",
      "Attention maps offer partial insight but the network remains opaque.",
      "",
      "A foundation model is the least transparent option for a regulated tabular decision."
    ],
    services: [],
    tags: ["interpretable models", "regulatory compliance"]
  },
  {
    id: "4.2-007",
    domain: 4,
    task: "4.2",
    type: "multi",
    difficulty: "medium",
    stem: "A retail analytics team is choosing between a deep neural network and a decision tree for a customer churn model. In which circumstances should the team prefer the simpler decision tree? (Select TWO.)",
    options: [
      "Business stakeholders must be able to follow the exact decision path for any customer.",
      "The input data consists of millions of unstructured product images.",
      "The team must maximize predictive accuracy regardless of any other consideration.",
      "Compliance reviewers require the model logic to be verifiable without specialized tooling.",
      "The team wants the model to learn feature representations automatically from raw text."
    ],
    answer: [0, 3],
    explanation: "Simple models such as decision trees are preferred when stakeholders and reviewers must directly follow and verify the decision logic. A tree's splits can be read as if-then rules without extra tooling. Deep networks are the better fit for unstructured data such as images or raw text, or when squeezing out maximum accuracy outweighs interpretability.",
    rationales: [
      "",
      "Image data at scale favors deep learning, which learns visual features automatically.",
      "Prioritizing accuracy above all typically favors more complex models, not simpler ones.",
      "",
      "Automatic representation learning from raw text is a strength of neural networks, not trees."
    ],
    services: [],
    tags: ["interpretable models", "model selection"]
  },
  {
    id: "4.2-008",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "An insurance company's data science lead states that the fraud model is explainable but not interpretable. Which statement is consistent with that claim?",
    options: [
      "Anyone can read the model parameters and directly understand the decision rules.",
      "The model cannot be understood by inspection, but post hoc techniques can describe why it produced a given output.",
      "The model publishes its full training dataset for external review.",
      "The model is small enough to be retrained on a laptop."
    ],
    answer: [1],
    explanation: "Interpretability refers to understanding a model's internal mechanics directly, which is a property of simple models like linear regression or small trees. Explainability refers to describing model behavior, often with post hoc methods such as SHAP or LIME, even when the internals remain opaque. A complex model can therefore be explainable without being interpretable.",
    rationales: [
      "Directly readable decision rules describe an interpretable model, which contradicts the claim.",
      "",
      "Publishing training data relates to data transparency, not to interpretability of model internals.",
      "Model size and retraining cost do not define interpretability."
    ],
    services: [],
    tags: ["interpretability", "explainability"]
  },
  {
    id: "4.2-009",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "easy",
    stem: "Which statement BEST describes the tradeoff a team commonly faces between model interpretability and model performance?",
    options: [
      "Interpretable models always outperform complex models on structured data.",
      "Highly complex models often achieve higher accuracy on difficult tasks but are harder for humans to understand.",
      "Complex models are always required whenever the training dataset is large.",
      "Interpretability and accuracy are independent, so the choice of model family never affects either."
    ],
    answer: [1],
    explanation: "There is a well-known tension: models with many parameters, such as deep neural networks and large ensembles, can capture complex patterns and often achieve higher accuracy, but their reasoning is opaque. Simple models such as linear regression trade some predictive power for direct human understanding. The tradeoff is a tendency, not an absolute law, which is why teams should evaluate both.",
    rationales: [
      "Simple models sometimes match complex ones, but they do not always outperform them.",
      "",
      "Large datasets do not mandate complex models; the task and requirements drive the choice.",
      "Model family strongly influences both interpretability and achievable accuracy."
    ],
    services: [],
    tags: ["interpretability", "performance tradeoff"]
  },
  {
    id: "4.2-010",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "A hospital deploys an AI triage assistant. Designers ensure the interface shows the top contributing symptoms for each recommendation, lets clinicians override the suggestion, and records the override. Which design philosophy do these choices reflect?",
    options: [
      "Retrieval Augmented Generation",
      "Human-centered design for explainable AI",
      "Continued pre-training",
      "Federated learning"
    ],
    answer: [1],
    explanation: "Human-centered design for explainable AI builds systems around the needs of the people using them: explanations are presented in context, humans keep decision authority, and actions are reversible and auditable. Showing contributing factors, enabling overrides, and logging them are hallmark practices. The other options are model training or architecture techniques, not design philosophies.",
    rationales: [
      "RAG grounds generative model answers in retrieved documents; it is not a user-experience philosophy.",
      "",
      "Continued pre-training extends a foundation model on domain data.",
      "Federated learning trains across decentralized data without moving it."
    ],
    services: [],
    tags: ["human-centered design", "explainability"]
  },
  {
    id: "4.2-011",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "hard",
    stem: "A gaming company's ops dashboard uses an ML model to flag suspicious accounts. Analysts complain that each alert shows 40 raw feature values, forcing them to dig through data before acting. Designers redesign the alert to show only the three most influential factors with plain-language labels. Which human-centered design principle does the redesign apply?",
    options: [
      "Reducing cognitive load on the human decision maker",
      "Designing for reversibility of automated actions",
      "Amplified decision making through full data disclosure",
      "Increasing model temperature to diversify outputs"
    ],
    answer: [0],
    explanation: "Minimizing cognitive load means presenting explanations at the level of detail a human can absorb quickly, surfacing the most decision-relevant information instead of overwhelming users with raw data. Showing the top contributing factors in plain language is a classic application. Reversibility concerns undoing actions, and amplified decision making is about augmenting human judgment, not dumping all data.",
    rationales: [
      "",
      "Reversibility is about making it easy to undo decisions, which this change does not address.",
      "Amplified decision making augments human judgment; disclosing every raw value works against usability.",
      "Temperature is a generative inference parameter unrelated to interface design."
    ],
    services: [],
    tags: ["human-centered design", "cognitive load"]
  },
  {
    id: "4.2-012",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "A manufacturing company rolls out an AI system that automatically reroutes factory work orders. The design team insists that any automated rerouting can be undone with a single action and that the system keeps the prior state available. Which principle of human-centered design for explainable AI is being applied?",
    options: [
      "Cognitive load minimization",
      "Decision theory optimization",
      "Design for reversibility",
      "Data augmentation"
    ],
    answer: [2],
    explanation: "Design for reversibility means users can undo or roll back consequences of AI-driven actions, which builds trust and limits the damage from wrong predictions. Preserving prior state and offering a one-step undo are direct implementations. Cognitive load is about information presentation, and decision theory informs how choices are structured, not how they are undone.",
    rationales: [
      "Cognitive load concerns how much mental effort the interface demands, not undo capability.",
      "Decision theory guides structuring choices under uncertainty rather than rollback design.",
      "",
      "Data augmentation is a training technique for expanding datasets."
    ],
    services: [],
    tags: ["human-centered design", "reversibility"]
  },
  {
    id: "4.2-013",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "A regulator requires a lender to state the specific reasons an applicant was declined. The data science team currently uses a deep neural network with the highest accuracy. What is the most appropriate response?",
    options: [
      "Keep the neural network and explain that deep models cannot be interpreted",
      "Evaluate whether a more interpretable model such as logistic regression or a decision tree meets the accuracy requirement, or add feature attribution to explain individual decisions",
      "Increase the number of layers so the model captures the reasons more precisely",
      "Publish the model weights so the regulator can inspect them directly"
    ],
    answer: [1],
    explanation: "When regulation demands per-decision reasons, either adopt an inherently interpretable model or add post-hoc explanation such as SHAP feature attribution through SageMaker Clarify. Interpretable models often perform comparably on tabular data, so the accuracy tradeoff should be measured rather than assumed.",
    rationales: [
      "Declaring the model uninterpretable does not satisfy a legal obligation to give reasons.",
      "",
      "Adding layers increases opacity and does nothing to produce human-readable reasons.",
      "Raw weights are not a human-understandable explanation of an individual decision."
    ],
    services: ["Amazon SageMaker Clarify"],
    tags: ["interpretability", "regulation"]
  },
  {
    id: "4.2-014",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "easy",
    stem: "Which pair of models is generally considered the most transparent and easiest to interpret?",
    options: [
      "Deep convolutional neural networks and transformers",
      "Linear regression and decision trees",
      "Generative adversarial networks and diffusion models",
      "Large language models and mixture-of-experts models"
    ],
    answer: [1],
    explanation: "Linear and logistic regression expose coefficients that map directly to feature influence, and shallow decision trees expose an explicit rule path. These are inherently interpretable, unlike deep networks, generative models, and large language models, which require post-hoc explanation techniques.",
    rationales: [
      "Deep networks and transformers have millions of parameters with no directly readable decision logic.",
      "",
      "Generative adversarial and diffusion models are highly opaque generative architectures.",
      "Large language models are the canonical example of black box behavior."
    ],
    services: [],
    tags: ["interpretability", "model types"]
  },
  {
    id: "4.2-015",
    domain: 4,
    task: "4.2",
    type: "multi",
    difficulty: "medium",
    stem: "A governance team wants documented transparency artifacts for both an AWS managed AI service and a custom model the company trained. Which two artifacts should they use? (Select TWO.)",
    options: [
      "An AWS AI Service Card for the managed AWS AI service",
      "An Amazon SageMaker Model Card for the custom trained model",
      "An Amazon CloudWatch dashboard for the managed service",
      "An AWS Cost and Usage Report for the custom model",
      "An Amazon S3 bucket policy for the training data"
    ],
    answer: [0, 1],
    explanation: "AWS AI Service Cards document AWS managed AI services, covering intended use, design, and limitations. SageMaker Model Cards document your own models with intended use, training details, evaluation, and limitations. Dashboards, cost reports, and bucket policies serve operations, finance, and access control instead.",
    rationales: [
      "",
      "",
      "A CloudWatch dashboard shows operational metrics, not model documentation.",
      "Cost reports describe spend, not model behavior or limitations.",
      "A bucket policy controls access to data and documents nothing about the model."
    ],
    services: ["AWS AI Service Cards", "Amazon SageMaker Model Cards"],
    tags: ["documentation", "transparency"]
  },
  {
    id: "4.2-016",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "A company needs a single place to view all its models, their current status, and monitoring results across the organization. Which SageMaker AI capability provides this?",
    options: [
      "Amazon SageMaker Model Dashboard",
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker Autopilot",
      "Amazon SageMaker Canvas"
    ],
    answer: [0],
    explanation: "SageMaker Model Dashboard gives a centralized view of models, endpoints, and their monitoring and compliance status across an account, which supports governance oversight. Ground Truth labels data, Autopilot builds models automatically, and Canvas offers a no-code modeling interface.",
    rationales: [
      "",
      "Ground Truth creates labeled training datasets.",
      "Autopilot automatically trains and tunes candidate models.",
      "Canvas provides a visual, no-code interface for building models."
    ],
    services: ["Amazon SageMaker Model Dashboard"],
    tags: ["governance", "model inventory"]
  },
  {
    id: "4.2-017",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "hard",
    stem: "Which statement best captures the difference between interpretability and explainability?",
    options: [
      "They are synonyms used interchangeably in AWS documentation",
      "Interpretability is the degree to which a human can inherently understand the model's internal mechanics; explainability is the ability to describe why a particular output occurred, often using post-hoc techniques",
      "Interpretability applies only to generative models; explainability applies only to classification models",
      "Explainability requires open source weights while interpretability does not"
    ],
    answer: [1],
    explanation: "Interpretability is an intrinsic property of the model: a shallow decision tree is interpretable because a person can follow its logic directly. Explainability is the ability to produce an understandable account of a specific decision, which for opaque models comes from post-hoc methods such as SHAP.",
    rationales: [
      "They are related but distinct concepts, and the exam tests the distinction.",
      "",
      "Both concepts apply across model families regardless of task.",
      "Post-hoc explanation methods work on closed models without exposing weights."
    ],
    services: [],
    tags: ["interpretability", "explainability"]
  },
  {
    id: "4.2-018",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "A product team designs a UI for an AI assistant used by nurses during triage. Which human-centered design choice best reduces the risk of over-reliance on the model?",
    options: [
      "Hide the model's confidence so nurses are not distracted",
      "Display the model's confidence and the sources behind each suggestion, and make it easy to override",
      "Automatically apply the model's suggestion after a five second delay",
      "Increase the font size of the model's recommendation"
    ],
    answer: [1],
    explanation: "Human-centered design for explainable AI surfaces uncertainty and provenance so the human can calibrate trust, and preserves easy reversal and override so the person remains the decision-maker. Hiding confidence or auto-applying suggestions encourages automation bias.",
    rationales: [
      "Hiding uncertainty removes the signal a clinician needs to judge when to doubt the system.",
      "",
      "Auto-applying a suggestion removes human agency and is the opposite of design for reversibility.",
      "Typography does not affect whether the recommendation is appropriately trusted."
    ],
    services: [],
    tags: ["human-centered design", "trust calibration"]
  },
  {
    id: "4.2-019",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "A team is told that adopting a more explainable model may reduce raw predictive accuracy. How should they frame this tradeoff?",
    options: [
      "Accuracy must always be maximized regardless of context",
      "The acceptable balance depends on the stakes of the decision and any regulatory obligation to explain it",
      "Explainable models are always less accurate than opaque models",
      "Explainability is only relevant for generative AI systems"
    ],
    answer: [1],
    explanation: "The tradeoff is contextual: for low-stakes recommendations, a small accuracy gain may justify opacity, while for consequential decisions subject to regulation, the ability to explain can outweigh a marginal accuracy improvement. On many tabular problems the accuracy gap is small or nonexistent.",
    rationales: [
      "Maximizing accuracy while ignoring legal and ethical obligations is not defensible.",
      "",
      "Interpretable models frequently match complex models on structured tabular data.",
      "Explainability applies to traditional predictive models at least as much as to generative AI."
    ],
    services: [],
    tags: ["tradeoffs", "explainability"]
  },
  {
    id: "4.2-020",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "easy",
    stem: "Which capability of Amazon SageMaker Clarify supports explainability rather than bias detection?",
    options: [
      "Class imbalance metric",
      "Feature attribution using SHAP values",
      "Difference in proportions of labels",
      "Disparate impact ratio"
    ],
    answer: [1],
    explanation: "SHAP-based feature attribution quantifies how much each feature contributed to a prediction, which is the explainability function of SageMaker Clarify. Class imbalance, difference in proportions of labels, and disparate impact are all bias metrics describing group disparities.",
    rationales: [
      "Class imbalance is a pre-training bias metric about dataset composition.",
      "",
      "Difference in proportions of labels compares positive outcome rates between groups.",
      "Disparate impact is a ratio-based fairness metric, not an explanation of a prediction."
    ],
    services: ["Amazon SageMaker Clarify"],
    tags: ["explainability", "clarify"]
  },
  {
    id: "4.2-021",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "hard",
    stem: "A bank must retain evidence that each production model was reviewed and approved, including who approved it and what evaluation results were considered. Which combination best supports an audit years later?",
    options: [
      "Amazon CloudWatch metrics retained for 15 months",
      "SageMaker Model Cards for documentation combined with AWS CloudTrail logs of API activity",
      "Amazon S3 versioning on the training data bucket alone",
      "Amazon Bedrock Guardrails configured with denied topics"
    ],
    answer: [1],
    explanation: "Model Cards preserve the documented intent, evaluation results, and limitations reviewed at approval time, while CloudTrail provides an immutable record of who performed which API actions. Together they answer both what was decided and who did it. Metrics, data versioning, and content filters do not capture approval context.",
    rationales: [
      "CloudWatch metrics show operational behavior, not review decisions or approvals.",
      "",
      "Data versioning preserves inputs but records nothing about model review or approval.",
      "Guardrails enforce runtime content policy and produce no governance documentation."
    ],
    services: ["Amazon SageMaker Model Cards", "AWS CloudTrail"],
    tags: ["auditability", "governance"]
  },
  {
    id: "4.2-022",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "Which principle of human-centered design for explainable AI is illustrated by allowing a user to undo an action the AI system took?",
    options: [
      "Design for reversibility",
      "Cognitive load reduction",
      "Amplified decision making",
      "Decision theory"
    ],
    answer: [0],
    explanation: "Design for reversibility means building in the ability to undo or correct automated actions, which limits the harm of an incorrect output and keeps a human meaningfully in control. Cognitive load, amplified decision making, and decision theory address information volume, augmentation of human judgment, and structured choice under uncertainty.",
    rationales: [
      "",
      "Cognitive load reduction concerns presenting only the information the user needs to decide.",
      "Amplified decision making concerns using AI to strengthen rather than replace human judgment.",
      "Decision theory concerns modeling choices and their expected outcomes under uncertainty."
    ],
    services: [],
    tags: ["human-centered design", "reversibility"]
  },
  {
    id: "4.2-023",
    domain: 4,
    task: "4.2",
    type: "multi",
    difficulty: "medium",
    stem: "An organization wants to increase transparency about a third-party foundation model it plans to adopt. Which two sources of information are most relevant? (Select TWO.)",
    options: [
      "The model provider's published documentation of intended use, training approach, and limitations",
      "Licensing terms governing how the model and its outputs may be used",
      "The AWS Region in which the model endpoint is deployed",
      "The instance family used for inference",
      "The number of tokens in the model's context window"
    ],
    answer: [0, 1],
    explanation: "Transparency about an adopted model comes from what the provider discloses about how it was built and what it should not be used for, together with licensing terms that govern permitted use of the model and its outputs. Region, instance family, and context window are operational and capability facts, not transparency artifacts.",
    rationales: [
      "",
      "",
      "Region choice affects residency and latency, not disclosure about the model.",
      "Instance family is an infrastructure detail unrelated to model transparency.",
      "Context window describes capacity, not intended use or limitations."
    ],
    services: [],
    tags: ["transparency", "model selection"]
  },
  {
    id: "4.2-024",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "A team presents a dashboard showing 40 feature attribution charts for every prediction a loan officer reviews. Officers report they cannot use it. Which human-centered design principle was violated?",
    options: [
      "Design for reversibility",
      "Managing cognitive load by presenting only the information needed for the decision",
      "Amplified decision making",
      "Transparency about AI involvement"
    ],
    answer: [1],
    explanation: "Explanations must be usable, not merely available. Presenting an overwhelming volume of detail increases cognitive load and makes the explanation effectively useless, so good design surfaces the few most influential factors with detail available on demand.",
    rationales: [
      "Reversibility concerns the ability to undo actions, which is not what failed here.",
      "",
      "Amplified decision making is the goal; excessive detail is what prevented it.",
      "The officers know AI is involved; the problem is the volume of explanation."
    ],
    services: [],
    tags: ["human-centered design", "cognitive load"]
  },
  {
    id: "4.2-025",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "easy",
    stem: "What is the primary purpose of a model card in AI governance?",
    options: [
      "To store the model's trained weights for deployment",
      "To document a model's intended use, performance, training data characteristics, and limitations in one place",
      "To configure autoscaling for the model endpoint",
      "To encrypt the model artifact at rest"
    ],
    answer: [1],
    explanation: "A model card is a structured documentation artifact recording what a model is for, how it was built and evaluated, and where it should not be used. It exists so reviewers, auditors, and downstream users can judge appropriate use. It is documentation, not storage, scaling, or encryption.",
    rationales: [
      "Weights are stored as model artifacts in Amazon S3, not in a documentation card.",
      "",
      "Autoscaling is configured on the endpoint, unrelated to documentation.",
      "Encryption at rest is handled by AWS KMS and storage configuration."
    ],
    services: ["Amazon SageMaker Model Cards"],
    tags: ["documentation", "governance"]
  },
  {
    id: "4.2-026",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "hard",
    stem: "A company must justify to an internal ethics board why it selected a foundation model. Which evidence best demonstrates a transparent selection process?",
    options: [
      "A statement that the model had the lowest cost per token",
      "Documented evaluation results across accuracy, safety, and bias criteria, with the provider's stated limitations and the reasons alternatives were rejected",
      "A screenshot of the model appearing in the Amazon Bedrock console",
      "Confirmation that the model supports streaming responses"
    ],
    answer: [1],
    explanation: "Transparency in selection means recording what criteria were applied, what the measured results were, what the provider disclosed about limitations, and why other candidates were rejected. A single cost figure or capability detail does not show that responsible criteria were weighed.",
    rationales: [
      "Cost alone ignores safety, bias, and suitability considerations the board must review.",
      "",
      "Console availability says nothing about why the model was appropriate.",
      "Streaming support is a delivery feature unrelated to responsible selection."
    ],
    services: ["Amazon Bedrock Model Evaluation"],
    tags: ["transparency", "model selection"]
  },
  {
    id: "4.2-027",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "Which AWS capability lets a team compare foundation models on custom criteria, including using human reviewers, to inform a documented selection decision?",
    options: [
      "Amazon Bedrock Model Evaluation",
      "Amazon SageMaker Feature Store",
      "AWS Config",
      "Amazon Bedrock Prompt Management"
    ],
    answer: [0],
    explanation: "Amazon Bedrock Model Evaluation supports automatic evaluation with built-in and custom prompt datasets, human-based evaluation using your own work teams and criteria, and LLM-as-a-judge evaluation, producing comparable results that support a documented model choice.",
    rationales: [
      "",
      "Feature Store manages engineered features for traditional ML workflows.",
      "AWS Config tracks resource configuration compliance, not model quality.",
      "Prompt Management versions and stores prompts; it does not score models."
    ],
    services: ["Amazon Bedrock Model Evaluation"],
    tags: ["evaluation", "model selection"]
  },
  {
    id: "4.2-028",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "An engineer says a model is a black box and therefore nothing can be said about why it produced an output. Which response is most accurate?",
    options: [
      "The engineer is correct; opaque models cannot be explained at all",
      "Post-hoc techniques such as SHAP feature attribution can estimate each input's contribution even when internal mechanics are opaque",
      "Only the model provider can explain any output",
      "Explanation requires retraining the model as a decision tree"
    ],
    answer: [1],
    explanation: "Even when a model's internals are not human-readable, post-hoc explanation methods can attribute an output to input features, and tools such as SageMaker Clarify implement this. Opacity limits interpretability but does not eliminate explainability.",
    rationales: [
      "Post-hoc explanation methods exist precisely for opaque models.",
      "",
      "Customers can apply attribution techniques themselves without provider involvement.",
      "Retraining as a simpler model is one option, but it is not a prerequisite for explanation."
    ],
    services: ["Amazon SageMaker Clarify"],
    tags: ["explainability", "black box"]
  },
  {
    id: "4.2-029",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "A generative AI assistant answers employee policy questions. Which design choice most improves users' ability to verify an answer themselves?",
    options: [
      "Returning citations linking each claim to the source document passage",
      "Reducing the temperature parameter to zero",
      "Increasing the maximum token limit",
      "Using a larger foundation model"
    ],
    answer: [0],
    explanation: "Citations that link a claim back to the retrieved source let a user check the answer against authoritative text, which is the practical form transparency takes in a RAG assistant. Amazon Bedrock Knowledge Bases can return source attribution with responses. Sampling settings, length limits, and model size do not provide verifiability.",
    rationales: [
      "",
      "A temperature of zero makes output more deterministic but no more verifiable.",
      "A higher token limit allows longer answers, not checkable ones.",
      "A larger model may still state unverifiable claims confidently."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["transparency", "citations", "rag"]
  },
  {
    id: "4.2-030",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "easy",
    stem: "Which principle of human-centered design for explainable AI is best described as using AI to strengthen human judgment rather than replace it?",
    options: [
      "Amplified decision making",
      "Design for reversibility",
      "Cognitive load management",
      "User feedback mechanisms"
    ],
    answer: [0],
    explanation: "Amplified decision making positions the AI as a tool that improves the quality and speed of a human decision while the human retains responsibility for the outcome. Reversibility, cognitive load, and feedback mechanisms are distinct supporting principles.",
    rationales: [
      "",
      "Reversibility concerns the ability to undo automated actions.",
      "Cognitive load management concerns limiting information to what is decision-relevant.",
      "Feedback mechanisms let users report problems so the system can improve."
    ],
    services: [],
    tags: ["human-centered design", "amplified decision making"]
  },
  {
    id: "4.2-031",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "hard",
    stem: "A team must choose between a gradient boosted tree ensemble with 91 percent accuracy and a logistic regression with 89 percent accuracy for an automated benefits eligibility decision that must be explained to applicants by law. Which choice is best justified?",
    options: [
      "The gradient boosted ensemble, because accuracy is the only defensible criterion",
      "The logistic regression, because its coefficients provide directly stateable reasons and the accuracy difference is small relative to the legal requirement",
      "Neither model, because automated eligibility decisions are prohibited",
      "The gradient boosted ensemble, because tree models are inherently interpretable at any depth"
    ],
    answer: [1],
    explanation: "With a binding legal duty to explain decisions and only a two point accuracy difference, the inherently interpretable model is the defensible choice because its coefficients translate directly into stateable reasons. Post-hoc attribution on the ensemble is an alternative but adds an approximation layer where the law expects a direct account.",
    rationales: [
      "Accuracy is not the only criterion when a legal explanation duty applies.",
      "",
      "Automated eligibility decisions are not universally prohibited; they are subject to explanation requirements.",
      "A large boosted ensemble of many deep trees is not human-interpretable, unlike a single shallow tree."
    ],
    services: [],
    tags: ["tradeoffs", "interpretability", "regulation"]
  },
  {
    id: "4.2-032",
    domain: 4,
    task: "4.2",
    type: "single",
    difficulty: "medium",
    stem: "Which practice best supports the user feedback principle of human-centered design in a deployed AI assistant?",
    options: [
      "Providing an in-product way for users to flag an incorrect or harmful response, routed to a review process",
      "Publishing the model architecture diagram on the company website",
      "Increasing the assistant's response speed",
      "Restricting the assistant to a single AWS Region"
    ],
    answer: [0],
    explanation: "User feedback mechanisms give the people affected by the system a direct channel to report problems, and routing that feedback into review closes the loop so issues drive improvement. Architecture diagrams, latency, and Region scope do not capture user-observed failures.",
    rationales: [
      "",
      "An architecture diagram informs engineers but gives users no way to report a bad output.",
      "Faster responses do not surface incorrect ones.",
      "Region restriction is a data residency and availability decision."
    ],
    services: [],
    tags: ["human-centered design", "user feedback"]
  }
);
