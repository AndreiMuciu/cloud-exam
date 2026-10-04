window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "1.1-001",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "easy",
    stem: "A logistics company is briefing its leadership team on terminology before starting an AI project. An executive asks how deep learning relates to the other terms in the briefing. Which statement is correct?",
    options: [
      "Deep learning and machine learning are separate fields, and neither is part of artificial intelligence.",
      "Deep learning is a subset of machine learning that uses neural networks with many layers, and machine learning is a subset of artificial intelligence.",
      "Machine learning is a subset of deep learning, and generative AI is unrelated to both.",
      "Artificial intelligence is a subset of deep learning because deep learning came first historically."
    ],
    answer: [1],
    explanation: "The terms nest inside each other: artificial intelligence is the broadest field, machine learning is the subset where systems learn patterns from data instead of being explicitly programmed, and deep learning is the subset of machine learning built on multi-layer neural networks. Generative AI is an application of deep learning that produces new content. Keeping this hierarchy straight prevents mismatched expectations when scoping projects.",
    rationales: [
      "Both machine learning and deep learning sit inside the broader field of artificial intelligence.",
      "",
      "The relationship is reversed: deep learning is the narrower subset of machine learning.",
      "Artificial intelligence is the broadest of these terms, not a subset of deep learning."
    ],
    services: [],
    tags: ["ai concepts", "deep learning"]
  },
  {
    id: "1.1-002",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "easy",
    stem: "A telecom provider has five years of customer records in which each account is already marked as either churned or retained. The company wants a model that predicts which current customers will churn. Which type of machine learning does this describe?",
    options: [
      "Supervised learning",
      "Unsupervised learning",
      "Reinforcement learning",
      "Self-supervised pre-training of a foundation model"
    ],
    answer: [0],
    explanation: "Supervised learning trains on examples where the correct answer, or label, is already known, so the model learns the mapping from input features to that known outcome. Because every historical account carries a churned or retained label, this is a textbook supervised classification problem. The presence of trustworthy labels is the deciding clue.",
    rationales: [
      "",
      "Unsupervised learning works on data with no labels and finds structure such as clusters.",
      "Reinforcement learning learns from rewards earned by taking actions, not from labeled records.",
      "Self-supervised pre-training builds general foundation models from massive unlabeled corpora, not a single churn prediction."
    ],
    services: [],
    tags: ["supervised learning", "labeled data"]
  },
  {
    id: "1.1-003",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A gaming studio has behavioral data for millions of players but no predefined player categories and no labels. The studio wants to discover natural groupings of similar players to guide content design. Which machine learning approach fits this goal?",
    options: [
      "Binary classification",
      "Linear regression",
      "Reinforcement learning",
      "Clustering with unsupervised learning"
    ],
    answer: [3],
    explanation: "Clustering is an unsupervised technique that groups records by similarity when no target label exists, which is exactly what discovering unknown player segments requires. Classification and regression both need labeled target values to learn from. The absence of any label is the signal that points to unsupervised learning.",
    rationales: [
      "Binary classification requires labeled examples of two known classes.",
      "Regression predicts a continuous numeric target and needs labeled values.",
      "Reinforcement learning needs an environment and reward signal, not a one-time segmentation of existing data.",
      ""
    ],
    services: [],
    tags: ["unsupervised learning", "clustering"]
  },
  {
    id: "1.1-004",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A food delivery company wants a model that outputs the expected delivery time in minutes for each new order. Which type of machine learning problem is this?",
    options: [
      "Multi-class classification, because there are many possible delivery routes",
      "Clustering, because similar orders should be grouped",
      "Regression, because the model predicts a continuous numeric value",
      "Dimensionality reduction, because order data has many columns"
    ],
    answer: [2],
    explanation: "Regression models predict a continuous numeric output such as minutes, dollars, or temperature, while classification predicts a discrete category. Asking for an estimated number of minutes rather than a bucket like fast or slow makes this a regression task. If the business instead wanted an on-time or late flag, the same data would support a classification model.",
    rationales: [
      "Classification would apply only if the output were a discrete category such as on time or late.",
      "Clustering groups unlabeled records and does not produce a per-order time estimate.",
      "",
      "Dimensionality reduction compresses features and is a preprocessing technique, not a prediction target."
    ],
    services: [],
    tags: ["regression", "classification"]
  },
  {
    id: "1.1-005",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "easy",
    stem: "A manufacturer wants to inspect photographs of parts on an assembly line and flag units with visible surface cracks. Which field of AI does this use case belong to?",
    options: [
      "Natural language processing",
      "Speech synthesis",
      "Time-series forecasting",
      "Computer vision"
    ],
    answer: [3],
    explanation: "Computer vision is the field concerned with extracting meaning from images and video, including tasks such as image classification, object detection, and defect detection. Natural language processing deals with text and speech content. Matching the data type in the scenario, images in this case, to the right AI field is a core foundational skill.",
    rationales: [
      "Natural language processing operates on text or transcribed language, not raw images.",
      "Speech synthesis generates spoken audio from text and is unrelated to visual inspection.",
      "Time-series forecasting predicts future values from ordered historical measurements.",
      ""
    ],
    services: [],
    tags: ["computer vision", "ai concepts"]
  },
  {
    id: "1.1-006",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "easy",
    stem: "A healthcare provider wants software to read free-text clinician notes and determine which conditions each note mentions. Which AI capability is the provider applying?",
    options: [
      "Natural language processing",
      "Computer vision",
      "Anomaly detection on numeric sensor streams",
      "Reinforcement learning"
    ],
    answer: [0],
    explanation: "Natural language processing covers the techniques that let computers interpret and generate human language, including entity extraction from unstructured clinical text. The data here is written language, which is the defining characteristic. Computer vision would apply only if the notes were scanned images that first required text extraction.",
    rationales: [
      "",
      "Computer vision interprets images and video rather than written language.",
      "Anomaly detection on sensor streams targets numeric measurements, not narrative text.",
      "Reinforcement learning optimizes sequential decisions through rewards, not text understanding."
    ],
    services: [],
    tags: ["nlp", "unstructured data"]
  },
  {
    id: "1.1-007",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A robotics team is training a warehouse robot to move pallets efficiently. The robot tries actions, receives a numeric reward when it improves throughput, and adjusts its behavior over many attempts. Which learning paradigm is being used?",
    options: [
      "Supervised learning with labeled trajectories",
      "Unsupervised learning",
      "Reinforcement learning",
      "Transfer learning"
    ],
    answer: [2],
    explanation: "Reinforcement learning trains an agent that interacts with an environment, takes actions, and learns a policy from reward or penalty feedback rather than from a fixed labeled dataset. The trial-and-feedback loop over repeated attempts is the identifying pattern. Supervised learning would instead require a correct action recorded for every situation in advance.",
    rationales: [
      "Supervised learning needs a labeled correct output for each input, not reward feedback.",
      "Unsupervised learning finds structure in unlabeled data and has no notion of reward.",
      "",
      "Transfer learning reuses knowledge from a pretrained model and is not defined by reward feedback."
    ],
    services: [],
    tags: ["reinforcement learning", "ai concepts"]
  },
  {
    id: "1.1-008",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A data team is describing its inputs to a new analyst. Which example best represents structured data?",
    options: [
      "A folder of customer support call recordings",
      "A collection of scanned contract PDFs",
      "A relational database table of orders with columns for order ID, amount, and date",
      "A set of product photographs"
    ],
    answer: [2],
    explanation: "Structured data is organized into a predefined schema of rows and columns, such as a database table or a CSV file, so each value has a known type and meaning. Audio, images, and free-form documents are unstructured because they carry no inherent tabular schema. Recognizing the data type guides which services and model families are appropriate.",
    rationales: [
      "Audio recordings are unstructured data with no predefined schema.",
      "Scanned PDFs are unstructured documents until text and fields are extracted.",
      "",
      "Images are unstructured data represented as pixel arrays."
    ],
    services: [],
    tags: ["structured data", "data types"]
  },
  {
    id: "1.1-009",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "An energy utility collects meter readings every 15 minutes for each building and wants to predict next week's consumption. Which description of this dataset is most accurate?",
    options: [
      "Time-series data, because observations are ordered by timestamp and sequence matters",
      "Image data, because readings are visualized on dashboards",
      "Unlabeled text data, because readings arrive as log lines",
      "Categorical data, because each building has an identifier"
    ],
    answer: [0],
    explanation: "Time-series data consists of measurements recorded in timestamp order, where the sequence and intervals carry information that models must respect. Consumption forecasting depends on trends, seasonality, and recent history, all of which are time-series properties. Treating such data as unordered rows discards the signal that makes forecasting possible.",
    rationales: [
      "",
      "How data is displayed does not change its underlying type; the readings are numeric measurements.",
      "The readings are numeric values, and the sequence rather than language content is what matters.",
      "Building identifiers are one categorical column, but they do not define the dataset as a whole."
    ],
    services: [],
    tags: ["time-series data", "data types"]
  },
  {
    id: "1.1-010",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "easy",
    stem: "A retail company must generate demand predictions for 500,000 products once per night, and no user is waiting for an individual result. Which inferencing approach best matches this requirement?",
    options: [
      "Real-time inference behind a persistent low-latency endpoint",
      "Batch inference over the full dataset on a schedule",
      "Continued pre-training of the model each night",
      "Interactive human review of every prediction"
    ],
    answer: [1],
    explanation: "Batch inference processes a large collection of records in one scheduled job and writes results to storage, which fits high-volume workloads where latency per record does not matter. Real-time inference keeps an endpoint always available to answer single requests in milliseconds and generally costs more for the same volume. Matching the inference mode to the latency requirement is a common exam distinction.",
    rationales: [
      "A persistent low-latency endpoint is unnecessary when no one waits for individual predictions.",
      "",
      "Continued pre-training changes model weights and is a training activity, not inference.",
      "Human review of 500,000 predictions per night is not an inference strategy and would not scale."
    ],
    services: [],
    tags: ["batch inference", "inference"]
  },
  {
    id: "1.1-011",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A payments company must approve or decline each card transaction in under 100 milliseconds using a fraud model. Which inferencing approach is required?",
    options: [
      "Batch inference run every hour",
      "Real-time inference through an always-available endpoint",
      "Offline evaluation on a held-out test set",
      "Asynchronous inference with results delivered the next day"
    ],
    answer: [1],
    explanation: "Real-time inference serves individual requests through a persistently available endpoint so a prediction returns within milliseconds, which is mandatory when a live transaction is blocked on the answer. Batch and asynchronous modes trade latency for throughput and cost efficiency. The presence of a hard per-request latency budget always points to real-time inference.",
    rationales: [
      "Hourly batch scoring cannot decide a transaction that must be answered immediately.",
      "",
      "Offline evaluation measures model quality before deployment and does not serve live traffic.",
      "Next-day asynchronous results arrive far too late to authorize a payment."
    ],
    services: [],
    tags: ["real-time inference", "inference"]
  },
  {
    id: "1.1-012",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A credit union's loan default model scores 99 percent accuracy on the training data but only 68 percent on new applications it has never seen. Which problem does this pattern indicate?",
    options: [
      "Underfitting",
      "Overfitting",
      "Class imbalance in the target variable",
      "Insufficient inference capacity"
    ],
    answer: [1],
    explanation: "Overfitting occurs when a model memorizes noise and specific quirks of the training data instead of learning generalizable patterns, which produces excellent training scores and poor performance on unseen data. The gap between training and validation or test performance is the diagnostic signal. Remedies include more training data, simpler models, regularization, and early stopping.",
    rationales: [
      "Underfitting shows poor performance on both training and unseen data, not a large gap.",
      "",
      "Class imbalance typically depresses minority-class metrics on all splits rather than creating this specific gap.",
      "Inference capacity affects latency and throughput, not predictive accuracy."
    ],
    services: [],
    tags: ["overfitting", "model evaluation"]
  },
  {
    id: "1.1-013",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A public sector team trains a very simple model on complex citizen service data. Accuracy is low on the training set and equally low on the validation set. Which conclusion is most accurate?",
    options: [
      "The model is overfitting and needs more regularization",
      "The model is underfitting and is too simple to capture the underlying patterns",
      "The training data is leaking into the validation set",
      "The endpoint requires a larger instance type"
    ],
    answer: [1],
    explanation: "Underfitting means the model has too little capacity, too few features, or too little training to represent the real relationships in the data, so it performs poorly everywhere including on data it has already seen. Consistently weak scores across both splits distinguish underfitting from overfitting. Fixes include a more expressive model, better features, or longer training.",
    rationales: [
      "Overfitting would produce strong training accuracy alongside weak validation accuracy.",
      "",
      "Data leakage usually inflates validation scores rather than depressing them.",
      "A larger instance changes speed and cost, not the model's ability to fit patterns."
    ],
    services: [],
    tags: ["underfitting", "model evaluation"]
  },
  {
    id: "1.1-014",
    domain: 1,
    task: "1.1",
    type: "multi",
    difficulty: "medium",
    stem: "A media analytics team is documenting basic modeling vocabulary for new hires. Which two statements correctly define the terms? (Select TWO.)",
    options: [
      "A feature is an individual input variable that the model uses to make a prediction.",
      "A hyperparameter is a value learned automatically during training from the data.",
      "An algorithm is the procedure used to learn patterns, while the model is the trained artifact it produces.",
      "A label is the raw file format in which training data is stored.",
      "Weights are the configuration settings a practitioner chooses before training begins."
    ],
    answer: [0, 2],
    explanation: "Features are the input variables fed to a model, and the algorithm is the learning procedure whose output is the trained model containing learned parameters. Weights are those learned parameters, while hyperparameters are the settings chosen before training, such as learning rate or number of epochs. Mixing up weights and hyperparameters is one of the most common foundational errors.",
    rationales: [
      "",
      "Hyperparameters are set before training; learned values are parameters such as weights.",
      "",
      "A label is the known correct output for a training example, not a file format.",
      "Weights are learned during training; the settings chosen beforehand are hyperparameters."
    ],
    services: [],
    tags: ["features", "hyperparameters"]
  },
  {
    id: "1.1-015",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A ride-hailing company derives a new column, trip distance divided by trip duration, from raw pickup and dropoff records to improve model accuracy. What is this activity called?",
    options: [
      "Feature engineering",
      "Hyperparameter tuning",
      "Model deployment",
      "Data labeling"
    ],
    answer: [0],
    explanation: "Feature engineering is the process of transforming raw data into input variables that better expose the underlying signal to a model, including deriving ratios, aggregations, and encodings. It typically delivers larger accuracy gains than algorithm changes on tabular problems. Hyperparameter tuning, by contrast, adjusts training settings rather than the inputs themselves.",
    rationales: [
      "",
      "Hyperparameter tuning searches training configuration values and does not create new input columns.",
      "Deployment makes a trained model available for inference and does not alter inputs.",
      "Labeling assigns known target values to examples rather than deriving new features."
    ],
    services: [],
    tags: ["feature engineering", "training data"]
  },
  {
    id: "1.1-016",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "easy",
    stem: "A hospital research group must train a supervised image model but has 40,000 unannotated X-ray images. What must the group do before supervised training can begin?",
    options: [
      "Increase the number of epochs to compensate for missing labels",
      "Label the images so each one carries the correct known outcome",
      "Switch the optimizer to reduce training cost",
      "Deploy the images to a real-time inference endpoint"
    ],
    answer: [1],
    explanation: "Supervised learning requires labeled data, meaning each training example is paired with the correct answer the model should learn to produce. Without labels there is no target for the algorithm to optimize against, so annotation is a prerequisite rather than an optional step. Unlabeled data can still support unsupervised or self-supervised methods.",
    rationales: [
      "Epochs control how many passes training makes over data and cannot substitute for labels.",
      "",
      "The optimizer affects how weights update, not whether ground truth exists.",
      "Deployment serves predictions from a trained model and does not create training labels."
    ],
    services: [],
    tags: ["labeled data", "supervised learning"]
  },
  {
    id: "1.1-017",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "An insurance company is explaining neural networks to non-technical stakeholders. Which description is accurate at a conceptual level?",
    options: [
      "A neural network stores training records and returns the closest match by exact lookup.",
      "A neural network is made of layers of interconnected nodes whose weighted connections are adjusted during training.",
      "A neural network requires that all input data be structured tabular data with fewer than 20 columns.",
      "A neural network eliminates the need for any training data because it reasons from first principles."
    ],
    answer: [1],
    explanation: "A neural network is composed of layers of nodes, or neurons, connected by weights, and training adjusts those weights so the network's outputs move closer to the desired results. Depth, meaning many hidden layers, is what makes a network a deep learning model and enables it to learn complex representations from images, audio, and text. Neural networks learn parameters rather than storing and looking up examples.",
    rationales: [
      "Exact-match lookup describes a database or a nearest-neighbor style memory, not how a neural network computes.",
      "",
      "Neural networks handle images, audio, and text as well as tabular data with any number of features.",
      "Neural networks learn entirely from training data and cannot function without it."
    ],
    services: [],
    tags: ["neural networks", "deep learning"]
  },
  {
    id: "1.1-018",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "easy",
    stem: "A marketing agency wants a system that writes original product descriptions and generates matching promotional images from text prompts. Which category of AI does this describe?",
    options: [
      "Generative AI",
      "Classical supervised classification",
      "Anomaly detection",
      "Rule-based expert systems"
    ],
    answer: [0],
    explanation: "Generative AI produces new content such as text, images, audio, or code rather than assigning a label or a number to an existing input. It is built on deep learning, typically using large models trained on very large datasets. Discriminative approaches such as classification only choose among predefined outputs.",
    rationales: [
      "",
      "Classification assigns inputs to predefined categories and does not create new content.",
      "Anomaly detection flags unusual records and produces no generated output.",
      "Rule-based systems apply hand-coded logic and cannot compose novel text or images."
    ],
    services: [],
    tags: ["generative ai", "ai concepts"]
  },
  {
    id: "1.1-019",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A publishing company is describing what makes a large language model large. Which statement is the most accurate foundational description?",
    options: [
      "It is a deep learning model with a very large number of parameters trained on vast amounts of text to predict tokens in sequence.",
      "It is a keyword search index that has been compressed for fast retrieval.",
      "It is a spreadsheet of question and answer pairs that grows as users interact with it.",
      "It is a translation dictionary that maps each word in one language to one word in another."
    ],
    answer: [0],
    explanation: "A large language model is a deep neural network, usually a transformer, with billions of parameters trained on huge text corpora using a next-token or masked-token objective. That scale of parameters and data is what produces broad language capability that generalizes to many tasks. The model generates output token by token rather than retrieving stored answers.",
    rationales: [
      "",
      "A search index retrieves existing documents; it does not generate new language.",
      "Large language models store learned parameters, not a lookup table of question and answer pairs.",
      "Word-for-word dictionaries lack the contextual modeling that language models perform."
    ],
    services: [],
    tags: ["large language models", "generative ai"]
  },
  {
    id: "1.1-020",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A legal technology team needs to find documents that are semantically similar to a query even when the wording differs. They plan to convert text into numeric vectors that place related meanings close together. What are these vectors called?",
    options: [
      "Hyperparameters",
      "Embeddings",
      "Epochs",
      "Confusion matrices"
    ],
    answer: [1],
    explanation: "Embeddings are dense numeric vector representations of text, images, or other content in which semantic similarity corresponds to closeness in vector space. Similarity search over embeddings is what lets a system match meaning rather than exact keywords, and it underpins retrieval workflows and recommendation features. The vectors are produced by an embedding model.",
    rationales: [
      "Hyperparameters are training configuration settings, not representations of content.",
      "",
      "An epoch is one complete pass over the training dataset.",
      "A confusion matrix is an evaluation table of predicted versus actual classes."
    ],
    services: [],
    tags: ["embeddings", "nlp"]
  },
  {
    id: "1.1-021",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "hard",
    stem: "A wildlife nonprofit has only 900 labeled camera-trap images. Rather than training a vision model from scratch, the team starts from a model already trained on millions of general images and adapts it to their species. Which concept are they applying?",
    options: [
      "Transfer learning",
      "Data augmentation",
      "Hyperparameter tuning",
      "Ensemble learning"
    ],
    answer: [0],
    explanation: "Transfer learning reuses representations learned by a model trained on a large general dataset and adapts them to a related task with a much smaller dataset, which reduces both data requirements and compute cost. It is the standard approach when labeled examples are scarce. Fine-tuning a foundation model is a widely used form of transfer learning.",
    rationales: [
      "",
      "Data augmentation creates modified copies of existing examples but does not reuse a pretrained model.",
      "Hyperparameter tuning optimizes training settings and does not import prior knowledge.",
      "Ensemble learning combines multiple models trained on the same task rather than transferring knowledge."
    ],
    services: [],
    tags: ["transfer learning", "computer vision"]
  },
  {
    id: "1.1-022",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A machine learning engineer at a bank sets the number of epochs to 50 before starting a training job. What does the epoch setting control?",
    options: [
      "How many complete passes the training process makes over the entire training dataset",
      "How many features the model is allowed to use",
      "How many concurrent inference requests the endpoint accepts",
      "How many decimal places are kept in the model weights"
    ],
    answer: [0],
    explanation: "An epoch is one full pass of the training algorithm over the whole training dataset, and the epoch count is a hyperparameter set before training. Too few epochs can leave a model underfitted, while too many can drive it toward overfitting, which is why practitioners monitor validation metrics across epochs. Epochs are unrelated to serving capacity.",
    rationales: [
      "",
      "The set of usable features comes from the dataset and feature selection, not the epoch count.",
      "Concurrency is an inference and infrastructure setting, unrelated to training passes.",
      "Numeric precision is controlled by data types such as FP16 or FP32, not by epochs."
    ],
    services: [],
    tags: ["epochs", "hyperparameters"]
  },
  {
    id: "1.1-023",
    domain: 1,
    task: "1.1",
    type: "multi",
    difficulty: "hard",
    stem: "A research team is analyzing the bias-variance tradeoff for a demand model. Which two statements are correct? (Select TWO.)",
    options: [
      "High variance means the model is very sensitive to the specific training sample and tends to overfit.",
      "High bias means the model makes overly simple assumptions and tends to underfit.",
      "High variance always improves generalization to new data.",
      "Increasing model complexity reliably reduces both bias and variance at the same time.",
      "Bias and variance are measures of inference latency."
    ],
    answer: [0, 1],
    explanation: "In this statistical sense, bias is error from overly simplistic assumptions, which causes underfitting, and variance is error from excessive sensitivity to the particular training sample, which causes overfitting. Increasing complexity typically lowers bias while raising variance, so practitioners seek a balance that minimizes total error on unseen data. Note that this modeling sense of bias is different from fairness bias against groups of people.",
    rationales: [
      "",
      "",
      "High variance hurts generalization because the model fits noise in the training sample.",
      "Adding complexity generally trades reduced bias for increased variance rather than reducing both.",
      "Bias and variance describe sources of prediction error, not latency."
    ],
    services: [],
    tags: ["bias variance", "model evaluation"]
  },
  {
    id: "1.1-024",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A startup is choosing compute for training a deep neural network on millions of images. Which statement about hardware is accurate at a conceptual level?",
    options: [
      "CPUs are always faster than GPUs for deep learning because they have higher clock speeds.",
      "GPUs and purpose-built accelerators speed up deep learning because they perform massively parallel matrix operations.",
      "Deep learning training cannot use accelerators and must run on general purpose CPUs.",
      "Accelerators reduce the amount of training data a model needs to converge."
    ],
    answer: [1],
    explanation: "Deep learning training and inference are dominated by large matrix multiplications, and GPUs and purpose-built accelerators execute thousands of these operations in parallel, which is why they finish jobs far faster than general purpose CPUs. CPUs remain fine for lightweight models, small-scale inference, and data preparation. Hardware affects speed and cost, not how much data a model needs.",
    rationales: [
      "Higher clock speed does not offset the parallelism advantage GPUs have on matrix math.",
      "",
      "Accelerators are widely used for deep learning and are often the practical choice.",
      "Hardware changes training speed and cost but not the data volume required to learn."
    ],
    services: [],
    tags: ["gpu", "accelerators"]
  },
  {
    id: "1.1-025",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "easy",
    stem: "A university lab wants a precise definition to share with students. Which statement best defines machine learning?",
    options: [
      "Systems that learn patterns from data to make predictions without being explicitly programmed with rules for each case",
      "Software that follows a fixed set of hand-written if-then rules maintained by developers",
      "Any program that stores large volumes of data in a data warehouse",
      "Hardware designed specifically to run parallel numeric workloads"
    ],
    answer: [0],
    explanation: "Machine learning is the discipline in which algorithms infer patterns from data and use them to make predictions or decisions, rather than relying on rules coded by hand for every situation. This data-driven approach is what allows models to handle cases developers never enumerated. Rule engines, storage systems, and accelerator hardware are different things entirely.",
    rationales: [
      "",
      "Hand-written if-then logic describes a rule-based system, which is not machine learning.",
      "Storing data is a prerequisite for analytics but is not learning from it.",
      "That describes accelerator hardware such as GPUs, not the discipline of machine learning."
    ],
    services: [],
    tags: ["ai concepts", "machine learning"]
  },
  {
    id: "1.1-026",
    domain: 1,
    task: "1.1",
    type: "ordering",
    difficulty: "medium",
    stem: "A logistics company is running its first supervised machine learning project. Place the machine learning lifecycle stages in the correct order.",
    options: [
      "Train the model on the prepared training data",
      "Deploy the model and monitor its performance in production",
      "Collect and prepare the labeled data, including feature engineering",
      "Evaluate the trained model against a held-out dataset"
    ],
    answer: [2, 0, 3, 1],
    explanation: "A supervised project starts with collecting and preparing labeled data, since data quality sets the ceiling on results. Training then fits model parameters to that data, and evaluation on held-out data measures whether the model generalizes. Only after acceptable evaluation results does the model move to deployment, where ongoing monitoring detects drift and degradation.",
    rationales: [],
    services: [],
    tags: ["ml lifecycle", "training data"]
  },
  {
    id: "1.1-027",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "hard",
    stem: "A retailer splits its historical sales data into training, validation, and test sets. What is the primary purpose of the held-out test set?",
    options: [
      "To provide a final unbiased estimate of performance on data the model never saw during training or tuning",
      "To supply extra examples that increase the model's training accuracy",
      "To store the model weights after training completes",
      "To generate the labels that the training set is missing"
    ],
    answer: [0],
    explanation: "The test set is reserved until the very end so it can give an honest estimate of how the model will perform on new data, because it influenced neither the learned weights nor the tuning decisions. The validation set is what guides hyperparameter choices during development. Reusing the test set for tuning quietly inflates the reported numbers.",
    rationales: [
      "",
      "Test data is deliberately excluded from training, so it cannot raise training accuracy.",
      "Model weights are saved as artifacts in storage, not in a data split.",
      "Splits do not create labels; labeling is a separate data preparation activity."
    ],
    services: [],
    tags: ["model evaluation", "training data"]
  },
  {
    id: "1.1-028",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A streaming service wants to sort incoming support tickets into one of five predefined categories such as billing, playback, or account access. Which machine learning task does this represent?",
    options: [
      "Multi-class classification",
      "Regression",
      "Clustering",
      "Forecasting"
    ],
    answer: [0],
    explanation: "Multi-class classification assigns each input to exactly one of three or more predefined labels, which is what routing tickets into five known categories requires. Binary classification would apply if there were only two possible labels. Because the categories already exist and labeled examples can be gathered, this is supervised rather than unsupervised work.",
    rationales: [
      "",
      "Regression predicts continuous numeric values, not category membership.",
      "Clustering would discover new groupings rather than use the five predefined categories.",
      "Forecasting predicts future values in a time-ordered series."
    ],
    services: [],
    tags: ["classification", "nlp"]
  },
  {
    id: "1.1-029",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A car rental company is documenting the difference between a model and an algorithm. Which pairing is correct?",
    options: [
      "The algorithm is the deployed endpoint, and the model is the network configuration around it",
      "The algorithm is the learning procedure applied to data, and the model is the trained artifact containing learned parameters",
      "The algorithm and the model are interchangeable words for the same object",
      "The algorithm is the labeled dataset, and the model is the set of hyperparameters"
    ],
    answer: [1],
    explanation: "An algorithm is the mathematical procedure that learns from data, such as gradient boosting or a transformer training routine, and the model is the resulting artifact that holds the learned weights and can produce predictions. One algorithm can produce many different models depending on the data and settings used. Keeping the distinction clear helps when comparing training options.",
    rationales: [
      "An endpoint is deployment infrastructure, not the learning procedure.",
      "",
      "The terms describe different things: a procedure versus its trained output.",
      "Datasets and hyperparameters are inputs to training, not definitions of these two terms."
    ],
    services: [],
    tags: ["algorithm", "ai concepts"]
  },
  {
    id: "1.1-030",
    domain: 1,
    task: "1.1",
    type: "multi",
    difficulty: "medium",
    stem: "A public health agency is inventorying its data before an AI project. Which two items are unstructured data? (Select TWO.)",
    options: [
      "Recorded audio from a telehealth call center",
      "A CSV export of appointment counts by clinic and month",
      "Free-text patient feedback comments",
      "A database table of vaccine inventory quantities",
      "A numeric time series of daily emergency room visits"
    ],
    answer: [0, 2],
    explanation: "Unstructured data has no predefined schema, so audio recordings and free-form written comments both qualify and require AI techniques such as speech recognition or natural language processing to become useful. CSV exports, database tables, and numeric series are structured or semi-structured with defined columns and types. The distinction drives which services and model families fit a use case.",
    rationales: [
      "",
      "A CSV with defined columns is structured tabular data.",
      "",
      "A database table has a fixed schema, making it structured data.",
      "A numeric daily series is structured time-series data."
    ],
    services: [],
    tags: ["unstructured data", "data types"]
  },
  {
    id: "1.1-031",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "hard",
    stem: "An analytics team notices that their sales model performs well overall but poorly on data from a newly opened region that was barely present in the training set. Which training data concept best explains this outcome?",
    options: [
      "The model has too many hyperparameters",
      "The training data was not representative of the population the model must serve",
      "The inference endpoint is undersized for the new region's traffic",
      "The model needs a lower temperature setting"
    ],
    answer: [1],
    explanation: "A model can only learn patterns present in its training data, so groups or conditions that are underrepresented tend to receive weaker predictions. Representativeness, coverage, and volume of training data are therefore central to both accuracy and fairness. The fix is collecting more data from the underrepresented region and retraining.",
    rationales: [
      "Hyperparameter count does not explain a gap concentrated in one underrepresented segment.",
      "",
      "Endpoint sizing affects latency and throughput, not accuracy for a specific region.",
      "Temperature applies to generative model sampling, not to a tabular sales prediction model."
    ],
    services: [],
    tags: ["training data", "data quality"]
  },
  {
    id: "1.1-032",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "easy",
    stem: "A shipping firm has a trained model in production and sends new shipment records to it to obtain predicted transit times. What is this act of generating predictions from a trained model called?",
    options: [
      "Inferencing",
      "Feature engineering",
      "Hyperparameter tuning",
      "Data labeling"
    ],
    answer: [0],
    explanation: "Inferencing, sometimes called scoring or prediction, is the phase in which a trained model receives new inputs and produces outputs. Training builds the model once, while inference runs repeatedly for the life of the application and typically drives most ongoing cost. Recognizing the training versus inference split is fundamental to reasoning about architecture and spend.",
    rationales: [
      "",
      "Feature engineering prepares input variables and happens before training.",
      "Hyperparameter tuning searches training settings and is not prediction.",
      "Labeling assigns known outcomes to training examples."
    ],
    services: [],
    tags: ["inference", "ai concepts"]
  },
  {
    id: "1.1-033",
    domain: 1,
    task: "1.1",
    type: "single",
    difficulty: "medium",
    stem: "A newspaper wants a foundation model to answer questions grounded in its own archive. An engineer notes that the archive text must first be converted into vectors for similarity search. Which type of model performs that conversion?",
    options: [
      "An image generation model",
      "An embedding model",
      "A speech recognition model",
      "A classification model"
    ],
    answer: [1],
    explanation: "An embedding model converts text into fixed-length numeric vectors that capture semantic meaning, enabling similarity search over a vector index. That step is the foundation of retrieval-based workflows, where relevant passages are found by vector proximity and then supplied to a generative model. Generation and classification models serve different purposes in the pipeline.",
    rationales: [
      "Image generation models create pictures and cannot produce text embeddings for search.",
      "",
      "Speech recognition converts audio to text, which is a separate preprocessing step.",
      "A classification model outputs category labels rather than reusable semantic vectors."
    ],
    services: [],
    tags: ["embeddings", "generative ai"]
  },
  {
    id: "1.1-034",
    domain: 1,
    task: "1.1",
    type: "multi",
    difficulty: "hard",
    stem: "A manufacturing analytics group is deciding which of its planned projects can proceed without any labeled data. Which two tasks are unsupervised learning tasks? (Select TWO.)",
    options: [
      "Predicting the exact number of units a plant will produce next quarter",
      "Grouping machines into segments based on similar vibration profiles",
      "Deciding whether a finished part passes or fails inspection using historical pass and fail records",
      "Reducing 200 sensor columns into a smaller set of components that retain most of the variation",
      "Estimating the remaining useful life in days for each pump using recorded failure dates"
    ],
    answer: [1, 3],
    explanation: "Unsupervised learning finds structure in data without target labels, and both clustering into segments and dimensionality reduction fit that definition. Predicting units, days of remaining life, or a pass and fail outcome all require labeled historical targets, making them supervised regression or classification. The presence or absence of a known target value is the deciding test.",
    rationales: [
      "Predicting a specific numeric quantity is supervised regression and needs labeled history.",
      "",
      "Pass and fail records are labels, so this is supervised classification.",
      "",
      "Recorded failure dates provide labels, making this supervised regression."
    ],
    services: [],
    tags: ["unsupervised learning", "clustering"]
  },
  {
    id: "1.1-035",
    domain: 1,
    task: "1.1",
    type: "multi",
    difficulty: "easy",
    stem: "A stadium operator is listing which planned features rely on computer vision. Which two use cases are computer vision tasks? (Select TWO.)",
    options: [
      "Counting how many people appear in security camera frames at each gate",
      "Summarizing written fan survey responses into themes",
      "Detecting whether a photographed turnstile shows visible damage",
      "Translating printed program text from English into Spanish once the text is already digital",
      "Forecasting next month's ticket revenue from historical sales"
    ],
    answer: [0, 2],
    explanation: "Computer vision interprets visual input, so counting people in video frames and detecting damage in photographs both qualify. Summarizing and translating already-digital text are natural language processing tasks, and revenue forecasting is a time-series problem on numeric data. Identifying the input data type reliably points to the right AI field.",
    rationales: [
      "",
      "Summarizing written responses is a natural language processing task.",
      "",
      "Translating digital text is natural language processing, not image analysis.",
      "Revenue forecasting works on numeric time-series data."
    ],
    services: [],
    tags: ["computer vision", "nlp"]
  },
  {
    id: "1.1-036",
    domain: 1,
    task: "1.1",
    type: "multi",
    difficulty: "hard",
    stem: "A media company is planning compute for a deep learning workload. Which two statements about processors and accelerators are accurate? (Select TWO.)",
    options: [
      "Using GPUs guarantees a more accurate model than using CPUs for the same algorithm and data",
      "Accelerators remove the need to evaluate the model before deployment",
      "GPUs and purpose-built accelerators shorten deep learning training time by parallelizing large matrix computations",
      "CPU-based inference can be a reasonable and lower-cost choice for small models with modest traffic",
      "Deep learning inference must always run on the same hardware type used for training"
    ],
    answer: [2, 3],
    explanation: "Accelerators shorten deep learning training because they run the many parallel matrix operations these models require, while CPUs remain a sensible lower-cost option for small models and light inference traffic. Hardware choice affects speed and cost, not model accuracy, and training and inference hardware can differ. Teams commonly train on accelerators and then serve smaller or optimized models on cheaper compute.",
    rationales: [
      "Hardware changes training and inference speed, not the accuracy the algorithm can achieve.",
      "Evaluation is always required regardless of the hardware used.",
      "",
      "",
      "Training and inference hardware are chosen independently based on workload needs."
    ],
    services: [],
    tags: ["gpu", "accelerators"]
  },
  {
    id: "1.1-037",
    domain: 1,
    task: "1.1",
    type: "multi",
    difficulty: "easy",
    stem: "A retail data team is training new analysts on data terminology. Which two statements about labeled and unlabeled data are correct? (Select TWO.)",
    options: [
      "Unlabeled data is always higher quality than labeled data because no human has touched it.",
      "Labeled data pairs each example with the known correct output that a supervised model learns to predict.",
      "Supervised learning can proceed on entirely unlabeled data if the number of epochs is increased.",
      "Labeling is always automatic and free because labels already exist inside every dataset.",
      "Unlabeled data can still be used, for example in unsupervised learning and in self-supervised pre-training of foundation models."
    ],
    answer: [1, 4],
    explanation: "Labeled data includes the ground-truth answer for each example, which is what supervised algorithms optimize against, while unlabeled data lacks that target but still powers unsupervised learning and the self-supervised pre-training behind foundation models. Labeling usually requires human or programmatic effort and is often the most expensive part of a supervised project. No amount of extra epochs substitutes for missing labels.",
    rationales: [
      "Quality depends on collection and curation, not on whether data is labeled.",
      "",
      "Supervised learning has no target to optimize without labels, regardless of epochs.",
      "Labels typically must be created through human annotation or programmatic rules, at real cost.",
      ""
    ],
    services: [],
    tags: ["labeled data", "training data"]
  },
  {
    id: "1.1-038",
    domain: 1,
    task: "1.1",
    type: "ordering",
    difficulty: "medium",
    stem: "An instructor is explaining how a neural network learns during one training iteration. Place the steps of the iteration in the correct order.",
    options: [
      "Update the weights slightly in the direction that reduces the error",
      "Pass a batch of training examples forward through the network to produce predictions",
      "Compare the predictions with the correct labels to compute the loss",
      "Propagate the error backward through the layers to measure each weight's contribution to it"
    ],
    answer: [1, 2, 3, 0],
    explanation: "Each training iteration begins with a forward pass that turns inputs into predictions using the current weights. The loss function then quantifies how far those predictions are from the labels, and backpropagation distributes that error backward to compute how much each weight contributed. Finally the optimizer nudges the weights to reduce the loss, and the cycle repeats across many batches and epochs.",
    rationales: [],
    services: [],
    tags: ["neural networks", "deep learning"]
  },
  {
    id: "1.1-039",
    domain: 1,
    task: "1.1",
    type: "multi",
    difficulty: "easy",
    stem: "A gaming company is comparing inference options for two workloads. Which two statements about batch and real-time inferencing are correct? (Select TWO.)",
    options: [
      "Batch inference processes a large set of records as a scheduled job and writes the results to storage.",
      "Batch inference returns each individual prediction within milliseconds to a waiting user.",
      "Real-time inference is always cheaper than batch inference for large nightly scoring jobs.",
      "Real-time inference serves individual requests with low latency from an available endpoint.",
      "Batch inference requires GPUs while real-time inference can only run on CPUs."
    ],
    answer: [0, 3],
    explanation: "Batch inference is optimized for throughput: it scores many records in one scheduled run and persists the output, with no user waiting on any single record. Real-time inference is optimized for latency, keeping an endpoint ready to answer individual requests immediately, which usually costs more for equivalent volume. Hardware choice is independent of the inference mode.",
    rationales: [
      "",
      "Millisecond per-request responses describe real-time inference, not batch.",
      "Keeping an endpoint always available typically costs more than a scheduled batch job for bulk scoring.",
      "",
      "Either mode can run on CPUs, GPUs, or accelerators depending on the model."
    ],
    services: [],
    tags: ["batch inference", "real-time inference"]
  },
  {
    id: "1.1-040",
    domain: 1,
    task: "1.1",
    type: "multi",
    difficulty: "hard",
    stem: "An engineering manager is correcting misconceptions about how large language models work. Which two statements are accurate? (Select TWO.)",
    options: [
      "A large language model retrieves its answers verbatim from a database of stored documents.",
      "A large language model retrains its weights automatically every time a user submits a prompt.",
      "A large language model generates text by repeatedly predicting the next token given the tokens produced so far.",
      "A large language model can only accept structured tabular data as input.",
      "Tokens are the small text units, such as words or subword pieces, that a language model reads and produces."
    ],
    answer: [2, 4],
    explanation: "Language models operate on tokens, which are words or subword fragments, and they generate output one token at a time by predicting the most likely continuation of the sequence. Their weights are fixed at inference time; ordinary prompts do not retrain the model, and answers are generated rather than looked up from a document store. These points explain both the power and the hallucination risk of generative models.",
    rationales: [
      "Answers are generated from learned parameters, not retrieved verbatim from a database.",
      "Weights stay frozen during inference; changing them requires a separate training process.",
      "",
      "Language models consume text and, for multimodal variants, images, not only tabular data.",
      ""
    ],
    services: [],
    tags: ["large language models", "tokens"]
  }
);
