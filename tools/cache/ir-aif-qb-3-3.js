window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "3.3-001",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "easy",
    stem: "A media company is evaluating foundation models for a content summarization product, and an engineer asks how these models acquired their broad language ability in the first place. Which statement best describes the pre-training phase of a foundation model?",
    options: [
      "The model is trained on a small curated set of labeled prompt-completion pairs for one target task.",
      "The model learns general language patterns from a very large corpus of mostly unlabeled data using self-supervised objectives.",
      "The model weights stay frozen while only the wording of each request is optimized.",
      "Human reviewers rank candidate outputs so a reward model can steer the model toward preferred answers."
    ],
    answer: [1],
    explanation: "Pre-training is the first and by far the most compute-intensive stage: the model predicts masked or next tokens across enormous volumes of largely unlabeled text, which is what gives it general language and reasoning ability. Task-specific behavior is added later through fine-tuning or alignment. Understanding this split explains why customers customize existing foundation models instead of pre-training their own.",
    rationales: [
      "Training on a small labeled task-specific dataset describes fine-tuning, which happens after pre-training.",
      "",
      "Optimizing request wording with frozen weights is prompt engineering, not training.",
      "Ranking outputs to build a reward model describes RLHF alignment, a later stage."
    ],
    services: [],
    tags: ["pre-training", "foundation models"]
  },
  {
    id: "3.3-002",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "easy",
    stem: "A financial services firm has 6,000 curated prompt-completion pairs that show exactly how its analysts should phrase client-facing summaries. Prompt engineering alone has not produced a consistent tone. Which customization approach should the firm use?",
    options: [
      "Increase the temperature value at inference time.",
      "Add a retrieval step over the firm's document library.",
      "Fine-tune a base model on the labeled prompt-completion pairs.",
      "Purchase Provisioned Throughput for the unmodified base model."
    ],
    answer: [2],
    explanation: "Fine-tuning updates model weights using labeled prompt-completion examples, which is the right tool when the goal is to teach a consistent style, format, or task behavior that prompting cannot reliably enforce. Retrieval adds facts but does not change how the model writes, and inference parameters only shift randomness.",
    rationales: [
      "Higher temperature increases output randomness, which makes tone less consistent, not more.",
      "Retrieval injects supporting content at inference time but does not teach a writing style.",
      "",
      "Provisioned Throughput reserves inference capacity; it does not change model behavior."
    ],
    services: ["Amazon Bedrock"],
    tags: ["fine-tuning", "customization"]
  },
  {
    id: "3.3-003",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A hospital network holds roughly 40 GB of unlabeled clinical research text full of specialized terminology and abbreviations. It has no labeled examples and wants a foundation model to understand this vocabulary better. Which customization approach fits the data the network actually has?",
    options: [
      "Continued pre-training on the unlabeled clinical corpus",
      "Instruction fine-tuning on prompt-completion pairs",
      "Reinforcement learning from human feedback",
      "Distillation of the model into a smaller student model"
    ],
    answer: [0],
    explanation: "Continued pre-training (also called domain-adaptation pre-training) extends the original self-supervised objective using raw, unlabeled domain text, so it is the only listed option that works without labels. It teaches vocabulary and domain patterns; a separate instruction fine-tuning pass would still be needed to shape task-specific responses.",
    rationales: [
      "",
      "Instruction fine-tuning requires labeled prompt-completion pairs, which this network does not have.",
      "RLHF requires human preference rankings of model outputs, which are not available here.",
      "Distillation shrinks a model for cheaper inference; it does not add domain vocabulary."
    ],
    services: ["Amazon Bedrock"],
    tags: ["continued pre-training", "domain adaptation"]
  },
  {
    id: "3.3-004",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A logistics company plans an instruction fine-tuning job in Amazon Bedrock so that a model follows the company's internal ticket-triage instructions. Which training data must the company supply?",
    options: [
      "A continuous stream of unlabeled shipment logs",
      "Human rankings of two candidate outputs for each prompt",
      "A vector index built from embedded support documents",
      "Labeled prompt-completion pairs that demonstrate the desired responses"
    ],
    answer: [3],
    explanation: "Instruction fine-tuning is supervised: each record pairs an input prompt with the completion the model should produce. Bedrock reads those pairs from Amazon S3 in JSONL form and adjusts a private copy of the base model. Unlabeled text belongs to continued pre-training, and preference rankings belong to RLHF.",
    rationales: [
      "Unlabeled logs suit continued pre-training, not supervised instruction fine-tuning.",
      "Preference rankings feed reward-model training in RLHF, not a standard fine-tuning job.",
      "A vector index supports retrieval augmented generation, which does not modify weights.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["instruction tuning", "data preparation"]
  },
  {
    id: "3.3-005",
    domain: 3,
    task: "3.3",
    type: "multi",
    difficulty: "medium",
    stem: "A gaming studio is preparing 8,000 support conversation examples for a fine-tuning job in Amazon Bedrock. Which TWO steps are required to make the data usable by the job? (Select TWO.)",
    options: [
      "Format the records as JSONL with one JSON object per line containing the prompt and completion fields.",
      "Load the records into an Amazon Redshift table and grant the job read access.",
      "Store the training file, and an optional validation file, in Amazon S3 and reference the locations in the job configuration.",
      "Encode every record as a base64 image before upload.",
      "Concatenate all records into a single comma-separated line for faster parsing."
    ],
    answer: [0, 2],
    explanation: "Bedrock customization jobs read line-delimited JSON (JSONL) records from Amazon S3, where each line carries the input prompt and the target completion for text fine-tuning. You point the job at the training data location and, optionally, a separate validation dataset so you can watch validation loss. Formatting and S3 placement are the two mandatory preparation steps.",
    rationales: [
      "",
      "Bedrock fine-tuning reads from Amazon S3, not from a data warehouse table.",
      "",
      "Base64 image encoding is unrelated to text fine-tuning record format.",
      "Records must be one JSON object per line; a single concatenated line is invalid."
    ],
    services: ["Amazon Bedrock", "Amazon S3"],
    tags: ["data preparation", "jsonl"]
  },
  {
    id: "3.3-006",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A manufacturing company successfully created a custom model in Amazon Bedrock by fine-tuning a base model. The team now wants to run production inference against that custom model. What must the company do first?",
    options: [
      "Purchase Provisioned Throughput for the custom model.",
      "Register the custom model in the Amazon Bedrock model catalog for on-demand use.",
      "Deploy the custom model to a SageMaker AI real-time endpoint.",
      "Enable cross-Region inference profiles for the custom model."
    ],
    answer: [0],
    explanation: "Custom models produced by Bedrock customization jobs are not served through standard on-demand invocation the way shared base models are. You buy Provisioned Throughput, which reserves dedicated model units for the custom model, and then invoke it using the resulting identifier. Budget for this reserved capacity when you estimate the total cost of fine-tuning.",
    rationales: [
      "",
      "Custom models are private to your account and are not published for shared on-demand access.",
      "Bedrock custom models are served by Bedrock throughput, not by exporting to a SageMaker AI endpoint.",
      "Cross-Region inference profiles apply to supported base models, not as a prerequisite for custom models."
    ],
    services: ["Amazon Bedrock"],
    tags: ["custom models", "provisioned throughput"]
  },
  {
    id: "3.3-007",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "easy",
    stem: "A public sector agency wants to fine-tune an open-weight text generation model and would prefer a catalog of pre-built models with example fine-tuning notebooks it can launch with minimal setup. Which capability should the agency use?",
    options: [
      "Amazon SageMaker Feature Store",
      "Amazon SageMaker Model Monitor",
      "Amazon Q Developer",
      "Amazon SageMaker JumpStart"
    ],
    answer: [3],
    explanation: "SageMaker JumpStart provides a catalog of pre-trained foundation and vision models along with ready-made fine-tuning and deployment scripts, so teams can customize a model without writing training code from scratch. Feature Store manages features, Model Monitor watches deployed models, and Q Developer is a coding assistant.",
    rationales: [
      "Feature Store stores and serves curated ML features; it does not fine-tune models.",
      "Model Monitor detects drift and quality issues on deployed endpoints after training.",
      "Q Developer assists with writing code, not with running fine-tuning jobs on a model catalog.",
      ""
    ],
    services: ["Amazon SageMaker AI", "SageMaker JumpStart"],
    tags: ["jumpstart", "fine-tuning"]
  },
  {
    id: "3.3-008",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A retail company wants a chatbot to stop producing curt, unhelpful replies. Reviewers will compare pairs of candidate answers and mark which one they prefer, and those preferences will be used to train a reward signal that guides further model updates. Which technique is the company describing?",
    options: [
      "Continued pre-training",
      "Retrieval augmented generation",
      "Reinforcement learning from human feedback",
      "Parameter-efficient fine-tuning"
    ],
    answer: [2],
    explanation: "RLHF collects human preference judgments over model outputs, trains a reward model on those judgments, and then optimizes the model against that reward. It is the standard method for aligning tone, helpfulness, and harmlessness with human expectations, going beyond what supervised examples alone achieve.",
    rationales: [
      "Continued pre-training consumes unlabeled domain text and uses no human preference signal.",
      "RAG retrieves supporting documents at inference time and does not train on preferences.",
      "",
      "Parameter-efficient fine-tuning is a way to limit trainable weights, not a preference-alignment method."
    ],
    services: [],
    tags: ["rlhf", "alignment"]
  },
  {
    id: "3.3-009",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "hard",
    stem: "A healthcare analytics team must fine-tune a large model but has a limited GPU budget. It wants to keep most of the original weights frozen and train only a small set of added parameters to cut memory and time. Which approach meets this requirement?",
    options: [
      "Full-parameter pre-training from random initialization",
      "Continued pre-training on the full base corpus",
      "Increasing the top-k value during inference",
      "Parameter-efficient fine-tuning such as low-rank adaptation"
    ],
    answer: [3],
    explanation: "Parameter-efficient fine-tuning methods, including low-rank adaptation, insert or update a small number of parameters while the base weights stay frozen. This dramatically lowers GPU memory, training time, and storage per customized variant, at some cost in maximum achievable adaptation compared with full fine-tuning.",
    rationales: [
      "Pre-training from scratch is the most expensive option and discards the value of the base model.",
      "Continued pre-training still updates the broad weight set and remains compute heavy.",
      "top-k is an inference sampling control and does not affect training cost.",
      ""
    ],
    services: [],
    tags: ["parameter-efficient fine-tuning", "cost"]
  },
  {
    id: "3.3-010",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A news organization needs a model that answers questions about articles published within the last hour. Editors update the archive continuously. Which customization approach is MOST appropriate?",
    options: [
      "Fine-tune the model nightly on the day's articles.",
      "Use retrieval augmented generation over an index of the article archive.",
      "Run continued pre-training each time an article is published.",
      "Apply RLHF using editor preference rankings."
    ],
    answer: [1],
    explanation: "Rapidly changing facts belong in a retrieval layer, not in model weights. RAG queries an index at request time so new content is available immediately, with no training job and no retraining cost. Training-based methods teach behavior and vocabulary but cannot keep pace with hourly content changes.",
    rationales: [
      "Nightly fine-tuning is costly and still leaves content stale for up to a day.",
      "",
      "Continued pre-training per article is prohibitively expensive and slow.",
      "RLHF aligns response style and preference, not factual freshness."
    ],
    services: ["Amazon Bedrock", "Amazon Bedrock Knowledge Bases"],
    tags: ["rag", "customization"]
  },
  {
    id: "3.3-011",
    domain: 3,
    task: "3.3",
    type: "ordering",
    difficulty: "medium",
    stem: "A finance company is fine-tuning a foundation model in Amazon Bedrock. Place the workflow steps in the correct order.",
    options: [
      "Submit the customization job and monitor training and validation loss metrics.",
      "Curate and label prompt-completion examples and split them into training and validation sets.",
      "Purchase Provisioned Throughput for the resulting custom model and run production inference.",
      "Evaluate the custom model against the base model on held-out prompts.",
      "Upload the JSONL datasets to Amazon S3 and select a base model that supports fine-tuning."
    ],
    answer: [1, 4, 0, 3, 2],
    explanation: "Customization starts with data work: curate, label, and split the examples. Next you stage the JSONL files in Amazon S3 and pick a fine-tunable base model, then run the job while watching training and validation loss. Only after evaluating the custom model against the base model do you commit to Provisioned Throughput for production inference.",
    rationales: [],
    services: ["Amazon Bedrock", "Amazon S3"],
    tags: ["fine-tuning workflow", "custom models"]
  },
  {
    id: "3.3-012",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "easy",
    stem: "A startup wants to reuse the general knowledge already captured in a large pre-trained model and adapt it to a narrower classification task instead of training a new model from scratch. Which ML concept describes this practice?",
    options: [
      "Transfer learning",
      "Feature engineering",
      "Hyperparameter tuning",
      "Data augmentation"
    ],
    answer: [0],
    explanation: "Transfer learning reuses representations learned on a large general task and adapts them to a related, usually smaller, target task. Fine-tuning a foundation model is a form of transfer learning, which is why good results are possible with far less data and compute than pre-training would need.",
    rationales: [
      "",
      "Feature engineering creates input variables for a model; it does not transfer learned knowledge.",
      "Hyperparameter tuning searches training settings such as learning rate.",
      "Data augmentation synthesizes additional training examples from existing ones."
    ],
    services: [],
    tags: ["transfer learning", "concepts"]
  },
  {
    id: "3.3-013",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "hard",
    stem: "A telecom company fine-tuned a model on 900 support tickets. Training loss kept falling while validation loss began climbing after several epochs, and the model now performs poorly on new tickets. What is the MOST likely cause?",
    options: [
      "The validation dataset was stored in the wrong Amazon S3 bucket.",
      "The temperature parameter was set too low during training.",
      "The model is overfitting the small training dataset.",
      "The base model does not support the JSONL format."
    ],
    answer: [2],
    explanation: "Diverging curves, where training loss improves while validation loss worsens, is the classic overfitting signature: the model is memorizing the limited training set instead of learning generalizable patterns. Remedies include more and more varied data, fewer epochs, or early stopping. Watching validation loss is exactly why you hold out a validation split.",
    rationales: [
      "A wrong bucket would fail the job or produce no validation metrics, not a clean divergence pattern.",
      "Temperature is an inference-time sampling parameter and is not used during training.",
      "",
      "An unsupported data format would cause the job to fail rather than produce rising validation loss."
    ],
    services: ["Amazon Bedrock"],
    tags: ["overfitting", "validation"]
  },
  {
    id: "3.3-014",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "An insurance company wants to deploy a smaller, cheaper, faster model that mimics the responses of a large high-quality model on the company's claim-summary prompts. Which technique should the company use?",
    options: [
      "Model distillation using the large model as teacher",
      "Continued pre-training of the large model",
      "Increasing the context window of the small model",
      "Quantizing the training dataset before upload"
    ],
    answer: [0],
    explanation: "Distillation trains a smaller student model on outputs generated by a larger teacher model, transferring much of the teacher's task-specific quality into a model that costs less and responds faster. Amazon Bedrock offers a managed distillation flow for supported model families. The tradeoff is that gains are narrow, holding mainly for the prompt types used during distillation.",
    rationales: [
      "",
      "Continued pre-training makes the large model more domain aware but does not shrink it.",
      "A larger context window changes how much text fits in a prompt, not model size or cost per token.",
      "Quantization applies to model weights, not to training datasets."
    ],
    services: ["Amazon Bedrock"],
    tags: ["distillation", "cost"]
  },
  {
    id: "3.3-015",
    domain: 3,
    task: "3.3",
    type: "multi",
    difficulty: "medium",
    stem: "A bank is assembling a fine-tuning dataset from historical loan correspondence. Which TWO data preparation practices reduce the risk of the custom model producing biased or unfair outputs? (Select TWO.)",
    options: [
      "Review the dataset for representativeness across customer groups and correct imbalances.",
      "Maximize dataset size by including every historical record without review.",
      "Remove or mask attributes and phrasing that encode protected characteristics where they are not relevant to the task.",
      "Set a higher learning rate so the model converges before absorbing bias.",
      "Sort the dataset alphabetically before uploading to Amazon S3."
    ],
    answer: [0, 2],
    explanation: "A fine-tuned model inherits the patterns of its training data, so bias mitigation happens mostly during curation. Checking that groups are represented in proportion to the intended use, and stripping irrelevant sensitive signals, both reduce the chance of learning discriminatory associations. Volume alone does not fix skew, and training hyperparameters do not remove bias.",
    rationales: [
      "",
      "Unreviewed bulk ingestion propagates historical bias and data quality problems into the model.",
      "",
      "Learning rate controls optimization speed and has no effect on dataset bias.",
      "Record ordering is irrelevant to fairness of the trained model."
    ],
    services: ["Amazon S3"],
    tags: ["data quality", "bias"]
  },
  {
    id: "3.3-016",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "easy",
    stem: "A logistics startup with a small engineering team needs a model that answers questions in the company's preferred format. The team wants to avoid any training job and iterate within hours. Which approach has the LOWEST cost and effort?",
    options: [
      "Continued pre-training on internal shipping documents",
      "Prompt engineering with clear instructions and a few in-context examples",
      "Full fine-tuning of a large base model",
      "Building a reward model from employee preference labels"
    ],
    answer: [1],
    explanation: "Customization effort rises from prompt engineering, to RAG, to fine-tuning, to continued pre-training and pre-training. Prompting requires no training data, no job, and no reserved capacity, so teams should exhaust it before paying for weight updates. Escalate only when prompting cannot hold the required behavior.",
    rationales: [
      "Continued pre-training needs a large corpus, GPU hours, and the most operational effort.",
      "",
      "Full fine-tuning requires labeled data, a training job, and reserved inference capacity.",
      "Building a reward model demands a human labeling pipeline and specialized expertise."
    ],
    services: ["Amazon Bedrock"],
    tags: ["prompt engineering", "cost"]
  },
  {
    id: "3.3-017",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A pharmaceutical company needs thousands of high-quality labels created for a fine-tuning dataset and wants a managed way to run human labeling workflows with its own workforce or a vendor workforce. Which AWS capability should the company use?",
    options: [
      "Amazon SageMaker Model Cards",
      "Amazon Bedrock Model Evaluation",
      "Amazon SageMaker Clarify",
      "Amazon SageMaker Ground Truth"
    ],
    answer: [3],
    explanation: "SageMaker Ground Truth provides managed data labeling workflows, including labeling job templates and workforce options, which is the standard way to produce labeled training data at scale. Model Cards document models, Model Evaluation scores model outputs, and Clarify analyzes bias and explainability.",
    rationales: [
      "Model Cards record intended use and risk documentation for a model, not labels.",
      "Model Evaluation compares model output quality; it does not create training labels.",
      "Clarify measures bias metrics and feature attribution rather than labeling data.",
      ""
    ],
    services: ["Amazon SageMaker AI", "SageMaker Ground Truth"],
    tags: ["labeling", "data preparation"]
  },
  {
    id: "3.3-018",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A regional bank is deciding between customizing an existing foundation model and pre-training its own model from scratch. Which factor MOST strongly argues against pre-training from scratch?",
    options: [
      "Pre-training cannot produce a model that understands financial terminology.",
      "Pre-training requires massive datasets, extensive compute, and specialized expertise, at very high cost.",
      "Pre-trained weights cannot be stored in Amazon S3.",
      "Models pre-trained by a customer cannot be evaluated for accuracy."
    ],
    answer: [1],
    explanation: "Pre-training a competitive foundation model requires trillions of tokens, large accelerator clusters running for weeks, and deep research expertise, which puts it out of reach for most organizations. Fine-tuning or continued pre-training on an existing base model reaches domain goals for a small fraction of the cost and time.",
    rationales: [
      "Pre-training can absolutely capture domain terminology; cost and scale are the real barriers.",
      "",
      "Model artifacts are routinely stored in Amazon S3, so storage is not the constraint.",
      "Any model, including a self-trained one, can be evaluated with benchmark or human review."
    ],
    services: [],
    tags: ["pre-training", "cost"]
  },
  {
    id: "3.3-019",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "hard",
    stem: "A media company ran continued pre-training on 25 GB of unlabeled archive text. The resulting model uses industry vocabulary correctly but often ignores instructions such as \"reply in three bullet points.\" What should the company do next?",
    options: [
      "Run a second continued pre-training pass on the same corpus.",
      "Perform instruction fine-tuning with labeled prompt-completion pairs that demonstrate the required response formats.",
      "Reduce the top-p value to force instruction following.",
      "Purchase additional Provisioned Throughput model units."
    ],
    answer: [1],
    explanation: "Continued pre-training teaches domain language but not how to follow instructions, because its objective is next-token prediction over raw text with no demonstrations of desired responses. Instruction fine-tuning supplies those demonstrations as prompt-completion pairs, which is why the two techniques are often used in sequence.",
    rationales: [
      "Repeating continued pre-training adds no instruction-following demonstrations.",
      "",
      "top-p narrows token sampling; it cannot teach a response format the model never learned.",
      "More throughput units add capacity, not instruction-following ability."
    ],
    services: ["Amazon Bedrock"],
    tags: ["continued pre-training", "instruction tuning"]
  },
  {
    id: "3.3-020",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "easy",
    stem: "A retail analytics team is preparing a fine-tuning dataset and wants to detect overfitting during training. Which practice supports this goal?",
    options: [
      "Hold out a validation split that the training process does not learn from.",
      "Train on the entire dataset and inspect training loss only.",
      "Duplicate every training record twice to strengthen the signal.",
      "Store the dataset in a single large text file without record boundaries."
    ],
    answer: [0],
    explanation: "A validation split gives an honest estimate of performance on data the model never trained on, so rising validation loss reveals overfitting while training loss is still improving. Training loss alone always looks better with more epochs, and duplicating records only intensifies memorization.",
    rationales: [
      "",
      "Training loss alone hides overfitting because it keeps decreasing as the model memorizes.",
      "Duplicating records increases memorization risk and does not measure generalization.",
      "Losing record boundaries breaks the required per-record format entirely."
    ],
    services: ["Amazon Bedrock"],
    tags: ["validation", "data preparation"]
  },
  {
    id: "3.3-021",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A government agency must document, for each dataset used to fine-tune a model, where the data came from, who approved its use, and which retention rules apply. Which practice does this requirement represent?",
    options: [
      "Hyperparameter optimization",
      "Data governance for training data, including lineage and access controls",
      "Model distillation",
      "Inference parameter tuning"
    ],
    answer: [1],
    explanation: "Data governance covers provenance and lineage, approval and consent, classification, access control, and retention for the datasets that feed training. For regulated customization work it is as important as model accuracy, because it establishes whether the training data was permitted to be used at all.",
    rationales: [
      "Hyperparameter optimization tunes training settings, not data provenance.",
      "",
      "Distillation transfers behavior to a smaller model and has no governance function.",
      "Inference parameters affect generation at request time, not dataset controls."
    ],
    services: [],
    tags: ["data governance", "compliance"]
  },
  {
    id: "3.3-022",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A manufacturer fine-tuned a base model in Amazon Bedrock. A compliance reviewer asks whether the training data was shared with the model provider or used to improve the shared base model. Which statement is correct?",
    options: [
      "Training data is added to the provider's public training corpus by default.",
      "Fine-tuning data must be made available to other Amazon Bedrock customers in the same Region.",
      "The customization job produces a private copy of the model in the customer's account, and the customer's data is not used to train the base model.",
      "Custom models are stored in the provider's account and shared with the provider's support team."
    ],
    answer: [2],
    explanation: "Bedrock customization creates a private custom model within the customer's account; customer training data is not used to improve the underlying base model and is not shared with other customers or with the model provider. That isolation is a key reason regulated customers are comfortable fine-tuning with proprietary data.",
    rationales: [
      "Customer fine-tuning data is not added to any provider public training corpus.",
      "Custom models and their data remain private to the customer's account.",
      "",
      "The custom model belongs to the customer's account, not the provider's."
    ],
    services: ["Amazon Bedrock"],
    tags: ["custom models", "data governance"]
  },
  {
    id: "3.3-023",
    domain: 3,
    task: "3.3",
    type: "ordering",
    difficulty: "hard",
    stem: "A software company is aligning a model to human preferences with RLHF. Place the steps in the correct order.",
    options: [
      "Optimize the model with reinforcement learning so its outputs score higher against the reward model.",
      "Train a reward model that predicts which response humans would prefer.",
      "Generate multiple candidate responses for a set of representative prompts.",
      "Collect human rankings that indicate the preferred response in each pair or set."
    ],
    answer: [2, 3, 1, 0],
    explanation: "RLHF begins by sampling several candidate responses per prompt from the current model. Human labelers then rank those candidates, and the rankings train a reward model that scores response quality. Finally, reinforcement learning updates the policy model to maximize that reward, which is how helpfulness and tone get aligned with human judgment.",
    rationales: [],
    services: [],
    tags: ["rlhf", "alignment"]
  },
  {
    id: "3.3-024",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A travel company has only about 120 labeled examples of its desired itinerary format and wants better results quickly without a training job. Which approach is MOST appropriate as a first step?",
    options: [
      "Fine-tune the base model on the 120 examples.",
      "Use few-shot prompting with several representative examples in the prompt.",
      "Run continued pre-training on the 120 examples.",
      "Distill the base model into a smaller model using the 120 examples."
    ],
    answer: [1],
    explanation: "With a very small dataset, fine-tuning tends to overfit and rarely justifies its cost, while few-shot prompting can convey the same format immediately by placing examples in the context window. Collect substantially more examples before considering a training job.",
    rationales: [
      "120 records is usually too few for stable fine-tuning and invites overfitting.",
      "",
      "Continued pre-training needs a large unlabeled corpus, not a hundred labeled records.",
      "Distillation needs a strong teacher and a broad prompt set to transfer behavior."
    ],
    services: ["Amazon Bedrock"],
    tags: ["few-shot prompting", "dataset size"]
  },
  {
    id: "3.3-025",
    domain: 3,
    task: "3.3",
    type: "multi",
    difficulty: "medium",
    stem: "An energy company is estimating the total cost of creating and running a fine-tuned model in Amazon Bedrock. Which TWO cost components should the company include? (Select TWO.)",
    options: [
      "Charges for the customization job based on tokens processed during training",
      "A per-question license fee for each end user of the custom model",
      "Provisioned Throughput charges for hosting the custom model for inference",
      "A mandatory annual fee for enabling model customization in the account",
      "Charges for enabling Amazon CloudWatch metric names on the training job"
    ],
    answer: [0, 2],
    explanation: "Fine-tuning cost has two main parts: the training job itself, billed on the volume of tokens processed, and the reserved Provisioned Throughput needed to serve the resulting custom model. Storage of the training data in Amazon S3 adds a minor amount. There is no per-user license or account-level customization fee.",
    rationales: [
      "",
      "Bedrock does not charge a per-end-user license for custom models.",
      "",
      "There is no mandatory annual fee to enable customization.",
      "Standard CloudWatch metrics are not billed as a customization prerequisite."
    ],
    services: ["Amazon Bedrock"],
    tags: ["cost", "provisioned throughput"]
  },
  {
    id: "3.3-026",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A legal-tech company wants a general-purpose model to become fluent in contract language and legal citation patterns using millions of unlabeled filings, and it accepts a significant training cost. The goal is broad domain fluency rather than one specific task. Which term describes this customization?",
    options: [
      "Prompt chaining",
      "Instruction tuning",
      "Domain adaptation through continued pre-training",
      "Reward modeling"
    ],
    answer: [2],
    explanation: "When the goal is broad fluency in a specialized domain and the available data is a large unlabeled corpus, continued pre-training (domain adaptation) is the right technique: it resumes the self-supervised objective on domain text. It costs more than fine-tuning but changes the model's underlying language competence rather than one task behavior.",
    rationales: [
      "Prompt chaining sequences multiple prompts at inference time and trains nothing.",
      "Instruction tuning teaches specific task behavior from labeled pairs, not broad fluency.",
      "",
      "Reward modeling is a component of RLHF preference alignment."
    ],
    services: ["Amazon Bedrock"],
    tags: ["domain adaptation", "continued pre-training"]
  },
  {
    id: "3.3-027",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "easy",
    stem: "During a fine-tuning project review, a new engineer asks what the term \"epoch\" means in the training configuration. Which definition is correct?",
    options: [
      "The number of tokens the model can accept in a single prompt",
      "One complete pass of the training process over the entire training dataset",
      "The fraction of candidate tokens considered during sampling",
      "The number of model units reserved for inference"
    ],
    answer: [1],
    explanation: "An epoch is one full pass over the training data. More epochs give the model more exposure to the examples, which can improve fit but also raises overfitting risk on small datasets, so epoch count is a key hyperparameter to tune alongside learning rate and batch size.",
    rationales: [
      "Prompt token capacity is the context window, not an epoch.",
      "",
      "The sampled token fraction relates to top-p, an inference parameter.",
      "Reserved model units belong to Provisioned Throughput, not training."
    ],
    services: [],
    tags: ["hyperparameters", "training"]
  },
  {
    id: "3.3-028",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A gaming company wants its support model to refuse to discuss unreleased titles. The team debates whether to fine-tune this behavior or to configure a policy layer that filters topics at inference time with no training. Which option provides the no-training policy layer?",
    options: [
      "Continued pre-training with the unreleased titles removed from the corpus",
      "SageMaker Model Monitor with a topic drift baseline",
      "Amazon Bedrock Guardrails with a denied-topic policy",
      "A higher top-k sampling value at inference"
    ],
    answer: [2],
    explanation: "Bedrock Guardrails applies configurable content policies, including denied topics, to prompts and responses at inference time without changing model weights. Fine-tuning could shape behavior but requires data and a training job, and it gives weaker guarantees for hard restrictions than an explicit policy filter.",
    rationales: [
      "Removing data from a corpus does not create an enforceable refusal policy.",
      "Model Monitor detects drift in deployed model quality; it does not block topics.",
      "",
      "top-k changes sampling breadth and cannot enforce topic restrictions."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["guardrails", "customization"]
  },
  {
    id: "3.3-029",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "hard",
    stem: "A retailer wants one base model to serve twelve different departments, each with its own tone and format requirements. Storage and serving cost must stay low. Why is parameter-efficient fine-tuning particularly attractive here?",
    options: [
      "It removes the need for any training data from the departments.",
      "Each department needs only a small adapter of trained weights, avoiding twelve full copies of the model.",
      "It guarantees higher accuracy than full fine-tuning in every case.",
      "It allows the model to be trained without any GPU resources."
    ],
    answer: [1],
    explanation: "PEFT methods freeze the shared base weights and train small adapter parameters per task, so many variants can be maintained as lightweight add-ons rather than as full model copies. This slashes storage and simplifies serving many customizations. It still requires labeled data and accelerators, and full fine-tuning can sometimes edge it out on quality.",
    rationales: [
      "PEFT still requires labeled examples for each department's behavior.",
      "",
      "PEFT usually approaches but does not always exceed full fine-tuning accuracy.",
      "Training adapters is lighter but still uses GPU compute."
    ],
    services: [],
    tags: ["parameter-efficient fine-tuning", "cost"]
  },
  {
    id: "3.3-030",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "easy",
    stem: "Which sequence lists foundation model development stages in the order they typically occur?",
    options: [
      "Alignment with human feedback, pre-training, fine-tuning",
      "Fine-tuning, pre-training, alignment with human feedback",
      "Pre-training, fine-tuning, alignment with human feedback",
      "Pre-training, alignment with human feedback, continued pre-training"
    ],
    answer: [2],
    explanation: "Models are first pre-trained on massive unlabeled corpora, then fine-tuned on labeled examples for instruction following or specific tasks, and finally aligned with human preferences using techniques like RLHF. Each later stage builds on and is far cheaper than the one before it.",
    rationales: [
      "Alignment operates on a model that already exists, so it cannot come first.",
      "Fine-tuning adapts a pre-trained model; there is nothing to fine-tune before pre-training.",
      "",
      "Continued pre-training is an optional domain step, not the final stage after alignment in the standard pipeline."
    ],
    services: [],
    tags: ["training lifecycle", "foundation models"]
  },
  {
    id: "3.3-031",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A healthcare provider fine-tuned a model and must now prove the custom model is better than the base model on the provider's own summarization prompts before rollout. Which AWS capability supports this comparison with the LEAST custom development?",
    options: [
      "Amazon SageMaker Feature Store",
      "Amazon Bedrock Flows",
      "AWS AI Service Cards",
      "Amazon Bedrock Model Evaluation"
    ],
    answer: [3],
    explanation: "Bedrock Model Evaluation runs automatic metric-based jobs or human review workflows against your own prompt datasets, which is exactly what is needed to compare a custom model with its base model. Flows orchestrate application logic, Feature Store manages features, and AI Service Cards are AWS-published documentation.",
    rationales: [
      "Feature Store manages ML feature data and performs no model comparison.",
      "Flows build multi-step generative AI workflows, not evaluation jobs.",
      "AI Service Cards document AWS AI services; they do not evaluate your custom model.",
      ""
    ],
    services: ["Amazon Bedrock", "Amazon Bedrock Model Evaluation"],
    tags: ["evaluation", "custom models"]
  },
  {
    id: "3.3-032",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "medium",
    stem: "A team fine-tuning a model in SageMaker JumpStart wants full control over training scripts, instance types, and hyperparameters, and it accepts more configuration work in exchange. Which statement correctly contrasts this with Amazon Bedrock customization?",
    options: [
      "Bedrock exposes lower-level training infrastructure than SageMaker AI.",
      "SageMaker AI gives more control over infrastructure and training code, while Bedrock offers a managed customization job with less configuration.",
      "SageMaker JumpStart cannot fine-tune foundation models.",
      "Both services require the customer to manage the training cluster manually."
    ],
    answer: [1],
    explanation: "Bedrock customization is a managed API-driven job where AWS handles the training infrastructure, so the tradeoff is convenience over control. SageMaker AI, including JumpStart recipes, exposes instance selection, training scripts, and hyperparameters for teams that need that flexibility. Choose based on how much control the project genuinely requires.",
    rationales: [
      "Bedrock abstracts infrastructure away; SageMaker AI is the lower-level option.",
      "",
      "JumpStart explicitly supports fine-tuning many foundation models.",
      "Bedrock does not require the customer to manage any training cluster."
    ],
    services: ["Amazon Bedrock", "Amazon SageMaker AI", "SageMaker JumpStart"],
    tags: ["jumpstart", "service selection"]
  },
  {
    id: "3.3-033",
    domain: 3,
    task: "3.3",
    type: "ordering",
    difficulty: "medium",
    stem: "A retailer is preparing training data for an instruction fine-tuning job. Place the data preparation steps in the correct order.",
    options: [
      "Convert the approved records into JSONL prompt-completion format.",
      "Collect candidate examples from internal systems and confirm approval to use the data.",
      "Split the records into training and validation datasets and upload both to Amazon S3.",
      "Clean the records by removing duplicates, sensitive personal data, and low-quality responses."
    ],
    answer: [1, 3, 0, 2],
    explanation: "Data preparation runs from sourcing to staging: gather candidate examples and confirm you are permitted to use them, clean and de-identify the content, convert the survivors into the required JSONL prompt-completion structure, then split into training and validation sets and upload to Amazon S3. Cleaning before formatting avoids reformatting records you will discard.",
    rationales: [],
    services: ["Amazon S3", "Amazon Bedrock"],
    tags: ["data preparation", "fine-tuning workflow"]
  },
  {
    id: "3.3-034",
    domain: 3,
    task: "3.3",
    type: "multi",
    difficulty: "hard",
    stem: "A public transit agency must decide between continued pre-training and instruction fine-tuning for a new project. Which TWO statements about these techniques are correct? (Select TWO.)",
    options: [
      "Continued pre-training uses unlabeled domain text and improves the model's domain vocabulary and language patterns.",
      "Instruction fine-tuning uses labeled prompt-completion pairs to teach specific task behavior and response formats.",
      "Continued pre-training requires human preference rankings for every document.",
      "Instruction fine-tuning replaces the need to evaluate the resulting model.",
      "Both techniques leave the base model weights completely unchanged."
    ],
    answer: [0, 1],
    explanation: "The distinction turns on the data: continued pre-training consumes raw unlabeled domain text to deepen language competence, while instruction fine-tuning consumes labeled prompt-completion pairs to shape task behavior. Both produce a modified set of weights, and both still require evaluation before production use.",
    rationales: [
      "",
      "",
      "Continued pre-training is self-supervised and needs no human rankings.",
      "Every customization approach still requires evaluation against held-out prompts.",
      "Both techniques update weights; only prompting and RAG leave weights unchanged."
    ],
    services: ["Amazon Bedrock"],
    tags: ["continued pre-training", "instruction tuning"]
  },
  {
    id: "3.3-035",
    domain: 3,
    task: "3.3",
    type: "multi",
    difficulty: "medium",
    stem: "A media streaming company is choosing between fine-tuning and retrieval augmented generation for a new assistant. Which TWO situations favor fine-tuning over RAG? (Select TWO.)",
    options: [
      "The assistant must consistently produce output in a proprietary structured format that prompting cannot reliably enforce.",
      "The knowledge the assistant needs changes several times per day.",
      "The assistant must adopt specialized terminology and a response style used only inside the company.",
      "The company must cite the exact source document for every answer.",
      "The company wants to avoid any training job or reserved inference capacity."
    ],
    answer: [0, 2],
    explanation: "Fine-tuning is the better fit when the requirement is about how the model behaves: enforcing a format, adopting a house style, or internalizing domain terminology. RAG is the better fit when the requirement is about which facts the model can see, especially when content changes often or answers must cite sources.",
    rationales: [
      "",
      "Frequently changing knowledge favors retrieval, since weights would be stale immediately.",
      "",
      "Source citation is a strength of retrieval, which returns identifiable documents.",
      "Avoiding training and reserved capacity argues for prompting or RAG, not fine-tuning."
    ],
    services: ["Amazon Bedrock", "Amazon Bedrock Knowledge Bases"],
    tags: ["fine-tuning", "rag"]
  },
  {
    id: "3.3-036",
    domain: 3,
    task: "3.3",
    type: "single",
    difficulty: "hard",
    stem: "An airline fine-tuned a model on 2023 booking policy examples. Twelve months later, agents report the model confidently states retired policies. The training corpus was never refreshed. What is the MOST appropriate long-term response?",
    options: [
      "Lower the temperature so the model expresses less confidence.",
      "Increase Provisioned Throughput to serve the model faster.",
      "Add more epochs to the original training job configuration.",
      "Establish a lifecycle that periodically refreshes the training data and retrains or re-tunes the model, and evaluate before each release."
    ],
    answer: [3],
    explanation: "A fine-tuned model reflects the state of its training data at the time of the job, so its knowledge decays as the business changes. Treat customization as a recurring lifecycle: refresh and re-curate the dataset, retrain, evaluate against held-out prompts, then promote. Where facts change constantly, pair this with retrieval so current content is read at inference time.",
    rationales: [
      "Lower temperature reduces randomness but does not correct outdated learned content.",
      "More throughput improves capacity, not factual currency.",
      "Additional epochs train harder on the same stale 2023 data.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["model maintenance", "fine-tuning"]
  }
);
