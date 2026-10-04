window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "1.3-001",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "easy",
    stem: "A hospital network wants to reduce patient appointment no-shows and has asked a data science team to build a model. Which activity should the team complete FIRST in the ML development lifecycle?",
    options: [
      "Split the historical appointment data into training, validation, and test sets.",
      "Select a classification algorithm and run a training job in Amazon SageMaker AI.",
      "Define the business goal and the success metrics that the model must improve.",
      "Deploy a real-time inference endpoint so clinicians can begin testing predictions."
    ],
    answer: [2],
    explanation: "The ML lifecycle starts with identifying the business goal and framing the ML problem, including the measurable business metrics that define success. Without an agreed goal and metric, the team cannot judge whether any model is worth deploying. Data collection, training, and deployment all follow from that framing.",
    rationales: [
      "Data splitting happens after the business goal is set and data has been collected and explored.",
      "Algorithm selection and training come later; choosing a model before framing the problem risks solving the wrong task.",
      "",
      "Deployment is one of the last stages and only makes sense after a model has been trained and evaluated."
    ],
    services: [],
    tags: ["ml lifecycle", "problem framing"]
  },
  {
    id: "1.3-002",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "easy",
    stem: "A logistics company has raw delivery data in Amazon S3 that needs cleaning, joining, and transformation before training. The team wants a visual, low-code way to explore and prepare the data inside Amazon SageMaker AI with minimal custom code. Which capability should the team use?",
    options: [
      "Amazon SageMaker Data Wrangler",
      "Amazon SageMaker Model Monitor",
      "Amazon SageMaker Model Registry",
      "Amazon SageMaker Automatic Model Tuning"
    ],
    answer: [0],
    explanation: "SageMaker Data Wrangler provides a visual interface for data exploration, cleaning, transformation, and feature preparation, and it can export the resulting flow as a repeatable processing job. It targets the data preparation stage of the lifecycle without requiring the team to hand-write transformation pipelines.",
    rationales: [
      "",
      "Model Monitor watches deployed models for drift and quality issues; it does not prepare training data.",
      "Model Registry catalogs and versions trained models; it has no data transformation features.",
      "Automatic Model Tuning searches hyperparameter values during training, not data preparation."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["data preparation", "sagemaker"]
  },
  {
    id: "1.3-003",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "hard",
    stem: "A financial services company finds that features computed for model training differ slightly from the features computed at inference time, causing inconsistent predictions. The company wants a central, versioned store so the same feature definitions serve both training and real-time inference. Which SageMaker AI capability meets this requirement?",
    options: [
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker Experiments",
      "Amazon SageMaker Canvas",
      "Amazon SageMaker Feature Store"
    ],
    answer: [3],
    explanation: "SageMaker Feature Store is a purpose-built repository for storing, sharing, and versioning features, with an offline store for training and an online store for low-latency inference. Serving both paths from the same definitions is what eliminates training-serving skew.",
    rationales: [
      "Ground Truth builds labeled datasets; it does not serve features at inference time.",
      "Experiments tracks training runs and their metrics, not reusable feature data.",
      "Canvas is a no-code environment for building models, not a feature repository.",
      ""
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["feature engineering", "sagemaker"]
  },
  {
    id: "1.3-004",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "easy",
    stem: "A manufacturing company has 80,000 unlabeled images of parts and needs high-quality defect labels before it can train a supervised computer vision model. Which AWS service should the company use to create the labeled training dataset?",
    options: [
      "Amazon SageMaker Autopilot",
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker Pipelines",
      "Amazon SageMaker Clarify"
    ],
    answer: [1],
    explanation: "SageMaker Ground Truth manages data labeling workflows, letting a company use human workforces and automated labeling to produce annotated training datasets. Labeling belongs to the data collection and preparation stage that precedes training.",
    rationales: [
      "Autopilot trains and tunes candidate models automatically but requires labeled data as input.",
      "",
      "Pipelines orchestrates lifecycle steps; it does not annotate raw data.",
      "Clarify analyzes bias and explains predictions; it does not create labels."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["data labeling", "sagemaker"]
  },
  {
    id: "1.3-005",
    domain: 1,
    task: "1.3",
    type: "multi",
    difficulty: "medium",
    stem: "A gaming company is preparing a tabular dataset of player sessions for churn modeling. Which two activities are part of data preprocessing and feature engineering? (Select TWO.)",
    options: [
      "Imputing missing values in the session duration column.",
      "Choosing the number of inference instances for the production endpoint.",
      "Publishing the approved model version to a model registry.",
      "Encoding the categorical device type column into numeric values.",
      "Configuring an alarm on endpoint invocation errors."
    ],
    answer: [0, 3],
    explanation: "Preprocessing and feature engineering transform raw records into model-ready inputs: handling missing data, scaling numeric columns, encoding categorical variables, and deriving new features. Endpoint sizing, registry approvals, and operational alarms all belong to later deployment and monitoring stages.",
    rationales: [
      "",
      "Instance sizing is a deployment decision made after a model is trained.",
      "Registering an approved model happens after evaluation, not during data preparation.",
      "",
      "Endpoint error alarms are part of production monitoring."
    ],
    services: [],
    tags: ["data preparation", "feature engineering"]
  },
  {
    id: "1.3-006",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "medium",
    stem: "A media streaming company trains a binary classifier that predicts whether a viewer will cancel a subscription. Only 3 percent of viewers cancel, and the model reports 97 percent accuracy while catching almost no cancellations. Which metric should the team use to measure how many actual cancellations the model detects?",
    options: [
      "Recall",
      "Precision",
      "Mean squared error",
      "R-squared"
    ],
    answer: [0],
    explanation: "Recall (sensitivity) is the fraction of actual positives that the model correctly identifies, so it directly exposes missed cancellations. With a heavily imbalanced dataset, overall accuracy is misleading because predicting the majority class always looks good.",
    rationales: [
      "",
      "Precision measures how many predicted cancellations were real, not how many real cancellations were found.",
      "Mean squared error evaluates regression models with continuous targets, not classification.",
      "R-squared describes variance explained in regression problems, not classification coverage."
    ],
    services: [],
    tags: ["evaluation metrics", "classification"]
  },
  {
    id: "1.3-007",
    domain: 1,
    task: "1.3",
    type: "multi",
    difficulty: "medium",
    stem: "A public sector agency built a model that forecasts monthly water consumption in liters. Which two metrics are appropriate for evaluating this regression model? (Select TWO.)",
    options: [
      "F1 score",
      "Root mean squared error",
      "Area under the ROC curve",
      "Mean absolute error",
      "Accuracy"
    ],
    answer: [1, 3],
    explanation: "Regression models predict continuous values, so error-based metrics apply: RMSE squares errors before averaging and therefore penalizes large misses more heavily, while MAE averages absolute errors and treats all deviations proportionally. F1, AUC-ROC, and accuracy are classification metrics that require discrete class labels.",
    rationales: [
      "F1 score is the harmonic mean of precision and recall for classification tasks.",
      "",
      "AUC-ROC summarizes ranking quality of a classifier, not regression error.",
      "",
      "Accuracy is a classification metric and is undefined for continuous targets."
    ],
    services: [],
    tags: ["evaluation metrics", "regression"]
  },
  {
    id: "1.3-008",
    domain: 1,
    task: "1.3",
    type: "ordering",
    difficulty: "medium",
    stem: "A retail company is starting its first ML project. Place the ML development lifecycle stages in the correct order.",
    options: [
      "Train and tune a candidate model.",
      "Identify the business goal and frame the ML problem.",
      "Monitor the deployed model and retrain when performance degrades.",
      "Collect, explore, and prepare the data.",
      "Evaluate the model and deploy it to an inference endpoint."
    ],
    answer: [1, 3, 0, 4, 2],
    explanation: "The lifecycle runs from business framing to data work, then model training and tuning, then evaluation and deployment, and finally ongoing monitoring and retraining. The loop is iterative: monitoring findings feed new data collection and training cycles rather than ending the project.",
    rationales: [],
    services: [],
    tags: ["ml lifecycle", "ordering"]
  },
  {
    id: "1.3-009",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "medium",
    stem: "A logistics company must run inference on a 400 GB file of shipment records once each night and does not need real-time responses. The company wants to avoid paying for idle infrastructure between runs. Which Amazon SageMaker AI inference option is MOST cost-effective?",
    options: [
      "A real-time endpoint with automatic scaling",
      "A batch transform job",
      "An asynchronous inference endpoint kept warm at one instance",
      "A multi-model real-time endpoint"
    ],
    answer: [1],
    explanation: "Batch transform starts compute resources, processes a whole dataset from Amazon S3, writes results back, then shuts the resources down, so nothing runs between nightly jobs. Real-time and always-warm endpoints bill for provisioned capacity even when no requests arrive.",
    rationales: [
      "A real-time endpoint bills for running instances continuously and is designed for low-latency single requests.",
      "",
      "Asynchronous inference suits large individual payloads with long processing times, and holding one warm instance still costs money.",
      "A multi-model endpoint reduces cost when hosting many models, but it is still a persistent real-time endpoint."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["deployment", "cost optimization"]
  },
  {
    id: "1.3-010",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "medium",
    stem: "A healthcare startup has an internal application with unpredictable, intermittent traffic and long idle periods. The team wants a low-latency inference option that scales to zero automatically and requires no instance management. Which Amazon SageMaker AI deployment option should the team choose?",
    options: [
      "Batch transform",
      "Real-time inference on a provisioned instance",
      "Asynchronous inference",
      "Serverless inference"
    ],
    answer: [3],
    explanation: "SageMaker serverless inference provisions and scales compute automatically based on request volume and scales to zero when idle, so the team pays only for what it uses without choosing instance types. It fits spiky, intermittent workloads that still need synchronous responses.",
    rationales: [
      "Batch transform processes datasets offline and cannot answer application requests synchronously.",
      "Provisioned real-time instances stay billed during long idle periods and require sizing decisions.",
      "Asynchronous inference queues requests for long-running, large payloads rather than returning immediate responses.",
      ""
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["deployment", "serverless"]
  },
  {
    id: "1.3-011",
    domain: 1,
    task: "1.3",
    type: "multi",
    difficulty: "medium",
    stem: "A finance company deployed a credit risk model six months ago and notices that predictions have become less reliable as economic conditions change. Which two statements correctly describe drift? (Select TWO.)",
    options: [
      "Data drift is a training-time problem in which the model memorizes noise in the training set.",
      "Data drift occurs when the statistical distribution of production input data differs from the training data.",
      "Drift affects only deep learning models, not tree-based models.",
      "Drift is detected during hyperparameter tuning before the model is deployed.",
      "Concept drift occurs when the relationship between the input features and the target variable changes."
    ],
    answer: [1, 4],
    explanation: "Data drift is a shift in the distribution of production inputs relative to training data, while concept drift is a change in the underlying relationship between inputs and the target. Both degrade deployed model quality over time, are detected through production monitoring, and typically trigger retraining.",
    rationales: [
      "Memorizing training noise describes overfitting, which is a training-time issue, not drift.",
      "",
      "Drift is a property of data and real-world relationships, so it affects any model type.",
      "Drift emerges in production after deployment; tuning happens before deployment.",
      ""
    ],
    services: [],
    tags: ["monitoring", "model drift"]
  },
  {
    id: "1.3-012",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "easy",
    stem: "A retail company wants automatic detection of data quality issues and statistical deviations in the inputs and predictions of a production Amazon SageMaker AI endpoint, with alerts when metrics breach a baseline. Which capability should the company use?",
    options: [
      "Amazon SageMaker Experiments",
      "Amazon SageMaker Feature Store",
      "Amazon SageMaker Model Monitor",
      "Amazon SageMaker Data Wrangler"
    ],
    answer: [2],
    explanation: "SageMaker Model Monitor captures endpoint data, compares it against a baseline computed from training data, and reports violations for data quality, model quality, bias drift, and feature attribution drift. It is the monitoring building block of the lifecycle.",
    rationales: [
      "Experiments organizes and compares training runs; it does not observe live endpoints.",
      "Feature Store stores and serves features; it does not raise drift alerts.",
      "",
      "Data Wrangler prepares data before training and has no production monitoring role."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["monitoring", "sagemaker"]
  },
  {
    id: "1.3-013",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "hard",
    stem: "An insurance company must prove to auditors which dataset version, preprocessing code, training container, and hyperparameters produced each production model version. Which MLOps practice does this requirement describe?",
    options: [
      "Hyperparameter optimization",
      "Prompt engineering",
      "Data augmentation",
      "Lineage tracking"
    ],
    answer: [3],
    explanation: "Lineage tracking records the chain of artifacts and steps, including data versions, code, containers, parameters, and resulting models, so any deployed model can be traced back to exactly what produced it. This supports auditability, repeatability, and troubleshooting across the lifecycle.",
    rationales: [
      "Hyperparameter optimization searches for the best training parameters; it does not record provenance.",
      "Prompt engineering shapes inputs to generative models and is unrelated to audit trails.",
      "Data augmentation expands training data with transformed copies; it does not document artifact history.",
      ""
    ],
    services: [],
    tags: ["mlops", "lineage"]
  },
  {
    id: "1.3-014",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "easy",
    stem: "A business analyst at a retail company with no coding experience wants to build a demand forecasting model using a visual, no-code interface. Which Amazon SageMaker AI capability should the analyst use?",
    options: [
      "Amazon SageMaker Canvas",
      "Amazon SageMaker Training Jobs",
      "Amazon SageMaker Model Registry",
      "Amazon SageMaker Pipelines"
    ],
    answer: [0],
    explanation: "SageMaker Canvas provides a no-code visual interface where business analysts can import data, build models, and generate predictions without writing code. Training Jobs, Pipelines, and the Model Registry are developer-oriented capabilities that assume ML engineering skills.",
    rationales: [
      "",
      "Training Jobs run containerized training code and require ML engineering work.",
      "Model Registry versions and approves trained models; it does not build them.",
      "Pipelines defines CI/CD-style workflows in code, which is not a no-code experience."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["no-code ml", "sagemaker"]
  },
  {
    id: "1.3-015",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "medium",
    stem: "A media company's data scientists run dozens of training runs per week with different algorithms and parameters. They struggle to remember which run produced which metrics. Which Amazon SageMaker AI capability lets them automatically track, organize, and compare training runs?",
    options: [
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker Experiments",
      "Amazon SageMaker Clarify",
      "Amazon SageMaker Serverless Inference"
    ],
    answer: [1],
    explanation: "SageMaker Experiments (available as MLflow-based experiment tracking in SageMaker AI) captures parameters, metrics, and artifacts for each training run so teams can compare runs side by side and reproduce results. Experiment tracking is the MLOps practice that makes model development repeatable.",
    rationales: [
      "Ground Truth is for labeling data, not tracking training runs.",
      "",
      "Clarify detects bias and explains predictions; it does not organize experiments.",
      "Serverless inference is a deployment option, not an experimentation tool."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["experimentation", "mlops"]
  },
  {
    id: "1.3-016",
    domain: 1,
    task: "1.3",
    type: "multi",
    difficulty: "medium",
    stem: "A manufacturing company wants to adopt MLOps practices for its quality inspection models. Which two practices are core MLOps principles? (Select TWO.)",
    options: [
      "Versioning datasets, code, and models so results can be reproduced.",
      "Increasing the model's temperature parameter to improve creativity.",
      "Automating the build, test, and deployment of models through CI/CD pipelines.",
      "Storing all training data exclusively on local laptops for speed.",
      "Disabling monitoring after deployment to reduce operational cost."
    ],
    answer: [0, 2],
    explanation: "MLOps applies DevOps discipline to ML: version everything (data, code, models) for repeatability, and automate build, test, and deployment through CI/CD so releases are reliable and frequent. Monitoring in production is also essential, and centralized governed storage beats local copies.",
    rationales: [
      "",
      "Temperature is a generative AI inference setting, not an MLOps practice.",
      "",
      "Local, unmanaged data copies undermine reproducibility and governance.",
      "Removing monitoring hides drift and quality regressions, the opposite of MLOps."
    ],
    services: [],
    tags: ["mlops", "ci/cd"]
  },
  {
    id: "1.3-017",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "easy",
    stem: "A gaming company trains a fraud detection model and wants to find the best combination of learning rate and tree depth by launching many training jobs automatically and comparing their validation scores. Which Amazon SageMaker AI capability performs this search?",
    options: [
      "Amazon SageMaker JumpStart",
      "Amazon SageMaker Model Monitor",
      "Amazon SageMaker Data Wrangler",
      "Amazon SageMaker Automatic Model Tuning"
    ],
    answer: [3],
    explanation: "Automatic Model Tuning (hyperparameter tuning) launches multiple training jobs with different hyperparameter values, using strategies such as Bayesian optimization to converge on the combination that maximizes the chosen objective metric. It automates the tuning stage of the lifecycle.",
    rationales: [
      "JumpStart provides pretrained models and solution templates, not hyperparameter search.",
      "Model Monitor tracks deployed model quality, not training-time parameters.",
      "Data Wrangler prepares data and does not run training jobs.",
      ""
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["hyperparameter tuning", "sagemaker"]
  },
  {
    id: "1.3-018",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "hard",
    stem: "A bank's fraud team says that flagging a legitimate transaction as fraud costs far more in customer goodwill than missing an occasional fraudulent one. When evaluating candidate models, which metric should the team prioritize?",
    options: [
      "Precision",
      "Recall",
      "Mean absolute error",
      "Training loss"
    ],
    answer: [0],
    explanation: "Precision is the fraction of positive predictions that are actually positive, so maximizing it minimizes false positives, which here are legitimate transactions wrongly flagged. Recall would instead prioritize catching every fraud at the cost of more false alarms, the opposite of this business preference.",
    rationales: [
      "",
      "Recall reduces missed frauds (false negatives), which the team said is the cheaper error.",
      "Mean absolute error applies to regression outputs, not a fraud classification decision.",
      "Training loss measures fit on training data and does not reflect business error costs."
    ],
    services: [],
    tags: ["evaluation metrics", "classification"]
  },
  {
    id: "1.3-019",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "medium",
    stem: "A public health team wants a single table showing how many of its disease-screening predictions were true positives, false positives, true negatives, and false negatives. Which evaluation artifact provides this view?",
    options: [
      "An ROC curve",
      "A confusion matrix",
      "A learning curve",
      "A feature importance chart"
    ],
    answer: [1],
    explanation: "A confusion matrix tabulates predicted versus actual classes, exposing the four outcome counts from which accuracy, precision, recall, and F1 are derived. It is the standard starting point for diagnosing which kind of error a classifier makes.",
    rationales: [
      "An ROC curve plots true positive rate against false positive rate across thresholds; it does not list raw counts.",
      "",
      "A learning curve shows performance as training data or epochs increase.",
      "Feature importance ranks input influence and says nothing about error types."
    ],
    services: [],
    tags: ["evaluation metrics", "confusion matrix"]
  },
  {
    id: "1.3-020",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "medium",
    stem: "A retail company wants to compare two classifiers across all possible decision thresholds to see which one separates buyers from non-buyers better overall. Which metric summarizes this threshold-independent ranking quality?",
    options: [
      "Accuracy at a 0.5 threshold",
      "Root mean squared error",
      "Area under the ROC curve",
      "Number of training epochs"
    ],
    answer: [2],
    explanation: "AUC-ROC aggregates classifier performance over all thresholds into one value between 0 and 1, where 0.5 is random guessing and 1.0 is perfect separation. Because it does not fix a threshold, it is useful for comparing models before the operating point is chosen.",
    rationales: [
      "Accuracy at a single fixed threshold ignores behavior at other operating points and is misleading with imbalance.",
      "RMSE evaluates continuous predictions, not class separation.",
      "",
      "Epoch count is a training setting, not a performance measure."
    ],
    services: [],
    tags: ["evaluation metrics", "auc"]
  },
  {
    id: "1.3-021",
    domain: 1,
    task: "1.3",
    type: "multi",
    difficulty: "medium",
    stem: "An ML team's model reaches 99 percent accuracy on training data but only 68 percent on the held-out test set. Which two actions are appropriate responses to this pattern? (Select TWO.)",
    options: [
      "Train for many more epochs on the same training data.",
      "Apply regularization or reduce model complexity.",
      "Remove the test set and evaluate only on training data.",
      "Increase the amount and diversity of training data.",
      "Raise the inference endpoint instance size."
    ],
    answer: [1, 3],
    explanation: "A large gap between strong training performance and weak test performance indicates overfitting: the model memorized noise instead of learning generalizable patterns. Standard remedies are regularization, simpler models, early stopping, and collecting more diverse training data. Training longer on the same data usually deepens the overfit.",
    rationales: [
      "More epochs on the same data typically worsens overfitting rather than improving generalization.",
      "",
      "Discarding held-out evaluation hides the problem instead of fixing it.",
      "",
      "Instance size affects latency and throughput, not generalization."
    ],
    services: [],
    tags: ["model evaluation", "overfitting"]
  },
  {
    id: "1.3-022",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "easy",
    stem: "A logistics company wants to automate its end-to-end ML workflow so that data processing, training, evaluation, conditional model approval, and deployment run as one repeatable, versioned workflow triggered by new data. Which Amazon SageMaker AI capability should the company use?",
    options: [
      "Amazon SageMaker Canvas",
      "Amazon SageMaker Feature Store",
      "Amazon SageMaker Model Cards",
      "Amazon SageMaker Pipelines"
    ],
    answer: [3],
    explanation: "SageMaker Pipelines is a purpose-built CI/CD orchestration service for ML that defines steps such as processing, training, evaluation, conditional logic, model registration, and deployment as a repeatable directed workflow. Each execution is tracked, which supports repeatability and lineage.",
    rationales: [
      "Canvas is a no-code model building tool, not a workflow orchestrator.",
      "Feature Store stores features; it does not run multi-step workflows.",
      "Model Cards document model details for governance; they do not execute steps.",
      ""
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["mlops", "pipelines"]
  },
  {
    id: "1.3-023",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "easy",
    stem: "A healthcare company needs a governed place to store trained model versions, attach approval status, and let a deployment pipeline pick up only approved versions. Which Amazon SageMaker AI capability meets this requirement?",
    options: [
      "Amazon SageMaker Studio",
      "Amazon SageMaker Model Registry",
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker Automatic Model Tuning"
    ],
    answer: [1],
    explanation: "SageMaker Model Registry catalogs models in versioned model package groups, records metadata, and tracks approval status so automated deployment steps can promote only approved versions. It is the governance handoff between training and deployment.",
    rationales: [
      "Studio is the integrated development environment for ML work, not a versioned model catalog.",
      "",
      "Ground Truth handles data labeling.",
      "Automatic Model Tuning searches hyperparameters during training."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["model registry", "mlops"]
  },
  {
    id: "1.3-024",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "easy",
    stem: "A data science team at an energy company wants a single integrated development environment where members can write notebooks, run training jobs, deploy models, and view experiment results. Which Amazon SageMaker AI capability provides this?",
    options: [
      "Amazon SageMaker Batch Transform",
      "Amazon SageMaker Clarify",
      "Amazon SageMaker Studio",
      "Amazon SageMaker Model Monitor"
    ],
    answer: [2],
    explanation: "SageMaker Studio is the unified web-based IDE for ML, bringing notebooks, data preparation, training, tuning, deployment, and monitoring views into one interface. The other options are individual capabilities used within or alongside Studio.",
    rationales: [
      "Batch transform is an offline inference option, not a development environment.",
      "Clarify computes bias and explainability reports.",
      "",
      "Model Monitor watches production endpoints for drift."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["sagemaker", "development environment"]
  },
  {
    id: "1.3-025",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "medium",
    stem: "A retail company wants to accelerate a product image classification project by starting from an existing pretrained model and an example solution template instead of training from scratch. Which Amazon SageMaker AI capability should the team use?",
    options: [
      "Amazon SageMaker Data Wrangler",
      "Amazon SageMaker Experiments",
      "Amazon SageMaker JumpStart",
      "Amazon SageMaker Feature Store"
    ],
    answer: [2],
    explanation: "SageMaker JumpStart offers a catalog of pretrained models, including foundation models, plus deployable solution templates and example notebooks that can be fine-tuned on a company's own data. It shortens time to market compared with building and training a model from zero.",
    rationales: [
      "Data Wrangler prepares data; it does not supply pretrained models.",
      "Experiments tracks runs rather than providing model artifacts.",
      "",
      "Feature Store manages feature data, not models."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["jumpstart", "time to market"]
  },
  {
    id: "1.3-026",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "medium",
    stem: "A lending company must explain which input features most influenced individual loan decisions and check whether the training data underrepresents certain groups. Which Amazon SageMaker AI capability addresses both needs?",
    options: [
      "Amazon SageMaker Clarify",
      "Amazon SageMaker Model Registry",
      "Amazon SageMaker Pipelines",
      "Amazon SageMaker Canvas"
    ],
    answer: [0],
    explanation: "SageMaker Clarify computes pre-training and post-training bias metrics and produces feature attribution explanations for individual and overall predictions. Model Monitor can then track bias and attribution drift in production using Clarify-generated baselines.",
    rationales: [
      "",
      "Model Registry versions models and records approval status; it computes no bias metrics.",
      "Pipelines orchestrates steps but does not itself analyze bias or explainability.",
      "Canvas builds models without code and is not a bias analysis service."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["explainability", "bias detection"]
  },
  {
    id: "1.3-027",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "medium",
    stem: "A telecom company wants to document each production model's intended use, training data description, evaluation results, and known limitations in a single governance artifact for internal review. Which Amazon SageMaker AI feature should the company use?",
    options: [
      "Amazon SageMaker Model Monitor",
      "Amazon SageMaker Ground Truth",
      "Amazon SageMaker Automatic Model Tuning",
      "Amazon SageMaker Model Cards"
    ],
    answer: [3],
    explanation: "SageMaker Model Cards create a single record of a model's purpose, training details, evaluation metrics, risk rating, and limitations to support governance and audits. AWS AI Service Cards serve a similar documentation purpose but for AWS managed AI services, not customer models.",
    rationales: [
      "Model Monitor detects drift in production data and predictions.",
      "Ground Truth builds labeled datasets.",
      "Automatic Model Tuning optimizes hyperparameters.",
      ""
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["governance", "documentation"]
  },
  {
    id: "1.3-028",
    domain: 1,
    task: "1.3",
    type: "multi",
    difficulty: "medium",
    stem: "An e-commerce company is deciding how to measure the success of a new recommendation model beyond technical accuracy. Which two are business metrics rather than model performance metrics? (Select TWO.)",
    options: [
      "F1 score on the validation set",
      "Return on investment from increased order value",
      "Area under the ROC curve",
      "Average customer satisfaction score after launch",
      "Root mean squared error on held-out data"
    ],
    answer: [1, 3],
    explanation: "Business metrics measure organizational outcomes such as ROI, cost per user, conversion rate, customer feedback, and time to market. Model metrics such as F1, AUC, and RMSE measure statistical quality and can improve without moving any business outcome, which is why both categories are tracked.",
    rationales: [
      "F1 is a statistical classification metric computed on labeled data.",
      "",
      "AUC-ROC is a model ranking quality metric.",
      "",
      "RMSE quantifies prediction error, not business value."
    ],
    services: [],
    tags: ["business metrics", "model evaluation"]
  },
  {
    id: "1.3-029",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "hard",
    stem: "A ride-hailing company observes that its arrival-time model's accuracy has declined even though incoming data distributions look unchanged; rider behavior itself has changed since a new city transit line opened. Which condition best describes this situation?",
    options: [
      "Concept drift",
      "Overfitting to the validation set",
      "Insufficient endpoint capacity",
      "Feature store latency"
    ],
    answer: [0],
    explanation: "Concept drift is a change in the underlying relationship between the input features and the target, so the learned mapping becomes stale even when input distributions look similar. Retraining on recent data that reflects the new behavior is the standard remedy.",
    rationales: [
      "",
      "Validation overfitting would appear before deployment, not as a gradual post-launch decline tied to real-world change.",
      "Capacity limits cause latency or throttling, not systematically wrong predictions.",
      "Feature retrieval latency affects response time, not predictive relationships."
    ],
    services: [],
    tags: ["model drift", "retraining"]
  },
  {
    id: "1.3-030",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "medium",
    stem: "A logistics company wants to retrain its route-optimization model automatically whenever monitoring detects that prediction quality has fallen below an agreed threshold. Which approach implements this with the LEAST operational overhead?",
    options: [
      "Have an engineer manually rerun the notebook each quarter.",
      "Use Amazon SageMaker Model Monitor alerts to trigger an Amazon SageMaker Pipelines execution that retrains and registers the model.",
      "Increase the size of the inference instance so predictions improve.",
      "Turn off monitoring and rebuild the model annually from scratch."
    ],
    answer: [1],
    explanation: "A retraining trigger connects monitoring signals to an automated pipeline: Model Monitor detects a quality or drift violation, emits an alert, and that event starts a SageMaker Pipelines run that reprocesses data, retrains, evaluates, and registers a new version. Manual reruns and fixed calendars react late and cost more effort.",
    rationales: [
      "Manual quarterly reruns add ongoing human effort and miss degradation between runs.",
      "",
      "Larger instances change throughput and latency, not predictive quality.",
      "Removing monitoring eliminates the very signal needed to know when retraining is required."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["retraining", "mlops"]
  },
  {
    id: "1.3-031",
    domain: 1,
    task: "1.3",
    type: "ordering",
    difficulty: "medium",
    stem: "A data science team is preparing data for a supervised churn model. Place these data-focused activities in the order they occur in the ML lifecycle.",
    options: [
      "Engineer new features such as tenure buckets and usage ratios.",
      "Collect raw records from source systems into Amazon S3.",
      "Split the prepared dataset into training, validation, and test sets.",
      "Perform exploratory data analysis to understand distributions and missing values.",
      "Clean the data by removing duplicates and imputing missing values."
    ],
    answer: [1, 3, 4, 0, 2],
    explanation: "Data work flows from collection, to exploratory analysis that reveals quality issues and patterns, to cleaning and preprocessing, to feature engineering that creates model-ready inputs, and finally to splitting the dataset so training, validation, and testing use separate data. Splitting last (or before any statistics that could leak) preserves honest evaluation.",
    rationales: [],
    services: ["Amazon S3"],
    tags: ["data preparation", "ordering"]
  },
  {
    id: "1.3-032",
    domain: 1,
    task: "1.3",
    type: "multi",
    difficulty: "easy",
    stem: "A data science team at an agriculture company has collected a new crop yield dataset and is beginning exploratory data analysis. Which two activities belong to this stage? (Select TWO.)",
    options: [
      "Deploying the model to a serverless endpoint for testing.",
      "Setting the learning rate for the training job.",
      "Calculating summary statistics to understand feature distributions and outliers.",
      "Configuring data capture on a production endpoint.",
      "Creating visualizations to examine correlations between variables."
    ],
    answer: [2, 4],
    explanation: "Exploratory data analysis happens after data collection and before preprocessing; the team profiles the data with summary statistics and visualizations to find quality problems, outliers, imbalances, and relationships that shape feature engineering and modeling choices.",
    rationales: [
      "Deployment publishes a trained model for inference and does not profile raw data.",
      "Learning rate selection belongs to training and hyperparameter tuning.",
      "",
      "Data capture supports production monitoring, which occurs after deployment.",
      ""
    ],
    services: [],
    tags: ["eda", "ml lifecycle"]
  },
  {
    id: "1.3-033",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "hard",
    stem: "A genomics startup runs inference on individual payloads up to 800 MB, and each request takes about 20 minutes of processing. Requests arrive sporadically throughout the day and callers can poll for results. Which Amazon SageMaker AI inference option fits these requirements?",
    options: [
      "Serverless inference",
      "Asynchronous inference",
      "Real-time inference",
      "Batch transform on an hourly schedule"
    ],
    answer: [1],
    explanation: "SageMaker asynchronous inference queues incoming requests, handles payloads up to about 1 GB with long processing times, delivers results to Amazon S3, and can scale the instance count to zero when the queue is empty. Real-time and serverless options enforce much smaller payload and timeout limits.",
    rationales: [
      "Serverless inference has small payload and short timeout limits unsuited to 800 MB, 20-minute jobs.",
      "",
      "Real-time endpoints are built for low-latency responses and cap payload size and request duration well below these needs.",
      "Hourly batch runs add up to an hour of avoidable waiting for sporadic single requests."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["deployment", "inference options"]
  },
  {
    id: "1.3-034",
    domain: 1,
    task: "1.3",
    type: "multi",
    difficulty: "hard",
    stem: "A retail company completed offline evaluation of a new demand forecast model and wants confidence before fully replacing the current production model. Which two deployment practices reduce release risk? (Select TWO.)",
    options: [
      "Shift a small percentage of live traffic to the new model and compare results before full cutover.",
      "Delete the previous model version immediately after deploying the new one.",
      "Use shadow testing to send production traffic copies to the new model without affecting responses.",
      "Skip evaluation on the test set because validation metrics were strong.",
      "Deploy directly to all users at once to shorten time to market."
    ],
    answer: [0, 2],
    explanation: "Canary or blue/green style traffic shifting exposes the new model to a small real workload with a quick rollback path, and shadow testing compares the challenger against the production model on live traffic without customer impact. Deleting the old version or releasing to everyone at once removes the safety net.",
    rationales: [
      "",
      "Keeping the prior version enables fast rollback if the new model misbehaves.",
      "",
      "The held-out test set guards against overfitting to validation choices.",
      "A big-bang release maximizes blast radius if the model has issues."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["deployment", "mlops"]
  },
  {
    id: "1.3-035",
    domain: 1,
    task: "1.3",
    type: "single",
    difficulty: "easy",
    stem: "A startup wants to shorten time to market for a text classification feature. The team uploads a labeled CSV and wants Amazon SageMaker AI to automatically explore algorithms, preprocess data, train candidate models, and rank them by quality with little manual work. Which capability does this?",
    options: [
      "Amazon SageMaker Model Monitor",
      "Amazon SageMaker Feature Store",
      "Amazon SageMaker Autopilot",
      "Amazon SageMaker Model Cards"
    ],
    answer: [2],
    explanation: "SageMaker Autopilot (AutoML) automatically preprocesses data, selects algorithms, trains and tunes multiple candidates, and presents a ranked leaderboard with full visibility into generated notebooks. It compresses several lifecycle stages into an automated flow, reducing time to market.",
    rationales: [
      "Model Monitor operates after deployment to detect drift.",
      "Feature Store serves and versions features; it does not run AutoML.",
      "",
      "Model Cards document models for governance rather than training them."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["automl", "time to market"]
  },
  {
    id: "1.3-036",
    domain: 1,
    task: "1.3",
    type: "ordering",
    difficulty: "hard",
    stem: "An MLOps engineer is designing an automated workflow in Amazon SageMaker Pipelines that runs whenever new labeled data lands. Place the pipeline steps in the correct execution order.",
    options: [
      "Register the model version in the Model Registry pending approval.",
      "Run a processing step that validates and transforms the new data.",
      "Deploy the approved model version to the production endpoint.",
      "Evaluate the trained model against the held-out test data and check the quality threshold.",
      "Launch the training job with the tuned hyperparameters."
    ],
    answer: [1, 4, 3, 0, 2],
    explanation: "An automated ML pipeline processes and validates incoming data first, then trains, then evaluates against a quality gate, then registers the passing model version for approval, and finally deploys the approved version. Placing evaluation before registration and registration before deployment enforces governance in CI/CD for ML.",
    rationales: [],
    services: ["Amazon SageMaker AI"],
    tags: ["mlops", "ordering"]
  }
);
