window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "1.2-001",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "easy",
    stem: "A streaming media company wants to show each subscriber a personalized list of titles based on that subscriber's viewing history and on what similar subscribers watch. The company has no in-house data science staff. Which AWS service meets this requirement with the LEAST development effort?",
    options: [
      "Amazon Comprehend",
      "Amazon Personalize",
      "Amazon Kendra",
      "Amazon Rekognition"
    ],
    answer: [1],
    explanation: "Amazon Personalize is a managed recommendation service that learns from user interaction data, item metadata, and user metadata to return real-time recommendations and personalized rankings. It is the standard match for recommendation use cases when a team has no ML specialists. The other services in the list analyze text, search documents, or analyze images, none of which model individual user preferences.",
    rationales: [
      "Comprehend analyzes text for sentiment, entities, and topics; it does not generate recommendations.",
      "",
      "Kendra ranks documents in response to search queries rather than recommending catalog items to a specific user.",
      "Rekognition analyzes images and video and cannot model viewing preferences."
    ],
    services: ["Amazon Personalize"],
    tags: ["recommendation engines", "use case matching"]
  },
  {
    id: "1.2-002",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "easy",
    stem: "A healthcare billing team receives thousands of scanned insurance claim forms as PDF files each day. Staff currently retype the printed field values and table rows into a claims system. Which AWS service should the team use to automate the data capture?",
    options: [
      "Amazon Textract",
      "Amazon Translate",
      "Amazon Transcribe",
      "Amazon Kendra"
    ],
    answer: [0],
    explanation: "Amazon Textract goes beyond simple optical character recognition by returning text, key-value pairs from forms, and table structures from scanned documents. That output maps directly to the fields a claims system needs. Document data capture is Textract's core use case, while the other services handle language translation, speech, and search.",
    rationales: [
      "",
      "Translate converts text between languages and does not read scanned documents.",
      "Transcribe converts speech in audio or video to text, not printed text in images.",
      "Kendra searches content that has already been indexed as text; it does not extract fields and tables from scans."
    ],
    services: ["Amazon Textract"],
    tags: ["document processing", "use case matching"]
  },
  {
    id: "1.2-003",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A logistics company calculates shipping surcharges from a published table of fixed fees per weight band and destination zone. The rates are set by contract and change only when a contract is renegotiated. A developer proposes training an ML model to predict each surcharge. Which approach is MOST appropriate?",
    options: [
      "Train a regression model in Amazon SageMaker AI because the inputs are numeric",
      "Use Amazon Bedrock with a prompt that asks a foundation model for the surcharge amount",
      "Implement the surcharge table as deterministic business rules in application code",
      "Use Amazon Personalize to select the correct surcharge for each shipment"
    ],
    answer: [2],
    explanation: "When the logic is completely known, stable, and must produce exact repeatable values, a deterministic rules implementation is cheaper, faster, and fully auditable. ML is valuable when patterns are complex or unknown and cannot be written as rules. Introducing a model here would only approximate a rule that is already documented exactly.",
    rationales: [
      "A model would approximate an exact published rule and could return a value that does not match the contract.",
      "Foundation model output is non-deterministic and unsuitable for a contractual fee that must be exact.",
      "",
      "Personalize recommends items to users; it does not compute contractual fees."
    ],
    services: [],
    tags: ["ai suitability", "rules vs ml"]
  },
  {
    id: "1.2-004",
    domain: 1,
    task: "1.2",
    type: "multi",
    difficulty: "medium",
    stem: "A public sector agency is evaluating Amazon Comprehend for its document workflows. Which two tasks is Amazon Comprehend well suited for? (Select TWO.)",
    options: [
      "Detecting and redacting personally identifiable information in free-text case notes",
      "Converting recorded public hearings into written transcripts",
      "Classifying incoming citizen emails into predefined complaint categories",
      "Extracting handwritten values from scanned paper forms",
      "Generating a synthetic voice announcement for a public alert system"
    ],
    answer: [0, 2],
    explanation: "Amazon Comprehend is a natural language processing service for text that is already digital. It detects entities, key phrases, language, sentiment, and PII, and it supports custom classification models trained on labeled examples. Speech, scanned documents, and speech synthesis belong to Transcribe, Textract, and Polly respectively.",
    rationales: [
      "",
      "Amazon Transcribe converts speech to text.",
      "",
      "Amazon Textract extracts printed and handwritten values from scanned documents.",
      "Amazon Polly generates speech from text."
    ],
    services: ["Amazon Comprehend"],
    tags: ["language ai", "use case matching"]
  },
  {
    id: "1.2-005",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "An online gaming company wants to score new account registrations and in-game purchases in near real time to flag likely fraudulent activity. The team has several years of labeled historical transactions but limited ML expertise. Which AWS service is purpose-built for this requirement?",
    options: [
      "Amazon Rekognition",
      "Amazon Comprehend",
      "Amazon Personalize",
      "Amazon Fraud Detector"
    ],
    answer: [3],
    explanation: "Amazon Fraud Detector is a managed service for online fraud use cases such as new account fraud and payment fraud. It combines a customer's historical labeled event data with models AWS has trained on fraud patterns, and it exposes rules plus real-time prediction endpoints without requiring the team to build a model from scratch.",
    rationales: [
      "Rekognition analyzes images and video, not transaction events.",
      "Comprehend analyzes text and cannot score transaction risk.",
      "Personalize recommends items to users rather than detecting fraud.",
      ""
    ],
    services: ["Amazon Fraud Detector"],
    tags: ["fraud detection", "use case matching"]
  },
  {
    id: "1.2-006",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "easy",
    stem: "A national retailer wants an audio version of its product safety notices so that customers can listen to them in the mobile app. The notices are stored as text. Which AWS service should the retailer use?",
    options: [
      "Amazon Transcribe",
      "Amazon Polly",
      "Amazon Translate",
      "Amazon Lex"
    ],
    answer: [1],
    explanation: "Amazon Polly is a text-to-speech service that converts written text into lifelike speech audio. Transcribe performs the opposite conversion, turning speech into text. Keeping the direction of the conversion straight is the distinction this item tests.",
    rationales: [
      "Transcribe converts speech to text, the opposite of what is needed.",
      "",
      "Translate converts text between languages without producing audio.",
      "Lex builds conversational interfaces; speech synthesis is not its purpose."
    ],
    services: ["Amazon Polly"],
    tags: ["speech ai", "use case matching"]
  },
  {
    id: "1.2-007",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A manufacturing company stores thousands of maintenance manuals, standard operating procedures, and internal wiki pages across Amazon S3 and SharePoint. Technicians want to ask natural language questions such as \"what torque setting applies to the line 4 conveyor bolts\" and get the answer with a link to the source document. Which AWS service best meets this requirement?",
    options: [
      "Amazon Comprehend custom classification",
      "Amazon Textract",
      "Amazon Kendra",
      "Amazon Polly"
    ],
    answer: [2],
    explanation: "Amazon Kendra is an intelligent enterprise search service that indexes content from connectors such as S3 and SharePoint and returns ranked answers and passages for natural language questions, with source attribution. Comprehend labels or analyzes text, Textract reads scans, and Polly produces audio, so none of them provide search over a document corpus.",
    rationales: [
      "Custom classification assigns labels to documents; it does not answer natural language questions.",
      "Textract extracts content from scanned documents but does not index or search a corpus.",
      "",
      "Polly converts text to speech and has no search capability."
    ],
    services: ["Amazon Kendra"],
    tags: ["enterprise search", "use case matching"]
  },
  {
    id: "1.2-008",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A regional bank must give applicants a specific, legally reviewable reason for every declined loan application, and regulators require that the decision logic be inspectable line by line. The bank's eligibility policy is fully documented. Which factor MOST strongly argues against replacing the policy engine with a deep learning model?",
    options: [
      "Deep learning models cannot process numeric application data",
      "Deep learning models cannot be hosted on AWS in a regulated account",
      "Deep learning models require the data to be stored outside of the bank's AWS account",
      "Deep learning models are harder to interpret, which conflicts with the explainability requirement"
    ],
    answer: [3],
    explanation: "Interpretability is a key part of assessing AI suitability. Complex models can outperform rules on unknown patterns, but their internal reasoning is difficult to explain, which is a problem where each decision must be defended to a regulator or applicant. When the policy is already documented and must be auditable, a deterministic rules engine is the better fit.",
    rationales: [
      "Deep learning models routinely process numeric tabular data.",
      "Regulated workloads can run on AWS; hosting is not the blocker.",
      "Training and inference data can remain in the customer's own account and Region.",
      ""
    ],
    services: [],
    tags: ["ai suitability", "interpretability"]
  },
  {
    id: "1.2-009",
    domain: 1,
    task: "1.2",
    type: "multi",
    difficulty: "medium",
    stem: "A media company wants to automate parts of its video publishing pipeline with Amazon Rekognition. Which two tasks can Rekognition perform? (Select TWO.)",
    options: [
      "Detect unsafe or inappropriate content in uploaded video",
      "Translate on-screen subtitles into Spanish",
      "Identify objects, scenes, and activities in video frames",
      "Generate a written summary of a news article",
      "Produce a synthetic narrator voice for a documentary"
    ],
    answer: [0, 2],
    explanation: "Amazon Rekognition analyzes images and video for labels such as objects, scenes, and activities, and it provides content moderation to flag unsafe content. Translation, text summarization, and speech synthesis are handled by Amazon Translate, a foundation model on Amazon Bedrock, and Amazon Polly respectively.",
    rationales: [
      "",
      "Amazon Translate performs language translation.",
      "",
      "Text summarization is a generative task suited to a foundation model on Amazon Bedrock.",
      "Amazon Polly generates speech from text."
    ],
    services: ["Amazon Rekognition"],
    tags: ["computer vision", "use case matching"]
  },
  {
    id: "1.2-010",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A grocery chain wants to predict weekly demand for each product at each store for the next 12 weeks, using three years of historical sales along with promotion calendars and local holidays. Which type of ML problem does this represent?",
    options: [
      "Binary classification",
      "Time series forecasting",
      "Clustering",
      "Image classification"
    ],
    answer: [1],
    explanation: "Predicting future numeric values from historical values ordered in time, with related series such as promotions and holidays, is a time series forecasting problem. Classification predicts a category, clustering groups unlabeled records, and image classification applies to visual data.",
    rationales: [
      "Binary classification predicts one of two categories, not a future quantity.",
      "",
      "Clustering finds groups in unlabeled data and does not predict future values.",
      "Image classification applies to visual inputs, not sales history."
    ],
    services: [],
    tags: ["forecasting", "ml types"]
  },
  {
    id: "1.2-011",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A business analyst at an insurance company has a labeled CSV export of past policy renewals in Amazon S3 and wants to build and evaluate a churn prediction model. The analyst writes SQL but no Python. Which AWS capability meets this need with the LEAST operational overhead?",
    options: [
      "Amazon SageMaker Canvas",
      "A custom training script on Amazon SageMaker AI training jobs",
      "Amazon Bedrock Knowledge Bases",
      "Amazon Q Developer"
    ],
    answer: [0],
    explanation: "Amazon SageMaker Canvas is a no-code visual interface that lets business users import tabular data, build models, view accuracy metrics, and generate predictions without writing code. Custom training jobs require ML engineering skills, Knowledge Bases support retrieval for generative applications, and Q Developer assists with software development tasks.",
    rationales: [
      "",
      "Writing a custom training script requires Python and ML expertise the analyst does not have.",
      "Knowledge Bases provide retrieval augmented generation over documents, not tabular churn prediction.",
      "Q Developer is a coding assistant, not a tabular model builder."
    ],
    services: ["Amazon SageMaker Canvas"],
    tags: ["no-code ml", "use case matching"]
  },
  {
    id: "1.2-012",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "easy",
    stem: "An airline wants a self-service assistant in its mobile app that can understand requests such as \"change my seat\" or \"what is my baggage allowance,\" collect the required details, and call backend APIs to complete the task. Which AWS service is designed for this?",
    options: [
      "Amazon Polly",
      "Amazon Lex",
      "Amazon Comprehend",
      "Amazon Textract"
    ],
    answer: [1],
    explanation: "Amazon Lex builds conversational interfaces for voice and text using intents, sample utterances, and slots, and it can invoke AWS Lambda to fulfill requests against backend systems. Comprehend analyzes text but does not manage a dialog, while Polly and Textract handle speech synthesis and document extraction.",
    rationales: [
      "Polly only converts text to speech and cannot manage a conversation.",
      "",
      "Comprehend analyzes text attributes but does not maintain dialog state or collect slots.",
      "Textract extracts data from documents and has no conversational capability."
    ],
    services: ["Amazon Lex"],
    tags: ["chatbots", "use case matching"]
  },
  {
    id: "1.2-013",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A global consultancy wants an internal generative AI assistant that answers employee questions using content in Amazon S3, Microsoft SharePoint, and Salesforce, respects each employee's existing permissions, and cites its sources. The company wants a managed application rather than building one. Which AWS service should it choose?",
    options: [
      "Amazon Q Business",
      "Amazon Q Developer",
      "Amazon Lex",
      "Amazon SageMaker JumpStart"
    ],
    answer: [0],
    explanation: "Amazon Q Business is a managed generative AI assistant for enterprise content. It provides built-in connectors to sources such as S3, SharePoint, and Salesforce, honors user-level access controls, and returns answers with citations. Q Developer targets software development, Lex requires you to design a bot, and JumpStart is for deploying and fine-tuning models.",
    rationales: [
      "",
      "Q Developer assists with coding, debugging, and AWS development tasks rather than company-wide document Q and A.",
      "Lex handles structured intent-based dialogs and does not index enterprise repositories.",
      "JumpStart provides model hosting and fine-tuning, not a ready-made enterprise assistant."
    ],
    services: ["Amazon Q Business"],
    tags: ["amazon q", "generative ai use cases"]
  },
  {
    id: "1.2-014",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "easy",
    stem: "A software team wants in-IDE help writing unit tests, explaining unfamiliar legacy functions, and suggesting code as developers type. Which AWS service is intended for this use case?",
    options: [
      "Amazon Q Business",
      "Amazon Comprehend",
      "Amazon Q Developer",
      "Amazon Bedrock Flows"
    ],
    answer: [2],
    explanation: "Amazon Q Developer is a generative AI assistant for software development that provides inline code suggestions, code explanations, test generation, and help with AWS resources inside the IDE and CLI. Q Business is the enterprise content assistant, and the other options serve text analysis and workflow orchestration.",
    rationales: [
      "Q Business answers questions over enterprise documents rather than assisting inside an IDE.",
      "Comprehend analyzes natural language text and does not generate code.",
      "",
      "Bedrock Flows orchestrates generative AI workflows; it is not a developer coding assistant."
    ],
    services: ["Amazon Q Developer"],
    tags: ["amazon q", "developer productivity"]
  },
  {
    id: "1.2-015",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A hospital network records patient consultations in English and needs the written summaries made available to Spanish-speaking and Portuguese-speaking families. The recordings must first become text, then be converted to the other languages. Which combination of AWS services meets this requirement?",
    options: [
      "Amazon Polly, then Amazon Comprehend",
      "Amazon Textract, then Amazon Kendra",
      "Amazon Rekognition, then Amazon Translate",
      "Amazon Transcribe, then Amazon Translate"
    ],
    answer: [3],
    explanation: "Amazon Transcribe converts the recorded speech into text, and Amazon Translate then converts that text into Spanish and Portuguese. The item tests the ability to chain the right speech and language services in the correct order rather than confusing them with document, vision, or speech synthesis services.",
    rationales: [
      "Polly generates speech from text and Comprehend analyzes text; neither transcribes audio or translates.",
      "Textract reads scanned documents and Kendra searches indexed content; neither handles audio or translation.",
      "Rekognition analyzes images and video frames, not spoken audio.",
      ""
    ],
    services: ["Amazon Transcribe", "Amazon Translate"],
    tags: ["speech ai", "language ai"]
  },
  {
    id: "1.2-016",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "hard",
    stem: "A payment processor must block transactions that exceed a hard regulatory limit of 10,000 USD per transfer, and separately wants to flag unusual spending patterns that may indicate account takeover. Which design correctly assigns each requirement?",
    options: [
      "Use a deterministic rule for the 10,000 USD limit and an ML model for unusual spending patterns",
      "Use an ML model for both requirements so that thresholds can adapt over time",
      "Use deterministic rules for both requirements to keep the system auditable",
      "Use a foundation model on Amazon Bedrock to evaluate both requirements in a single prompt"
    ],
    answer: [0],
    explanation: "A fixed regulatory threshold is a known, exact rule and must be enforced deterministically so it never varies. Detecting unusual spending patterns involves relationships that are not fully known in advance and change over time, which is where ML adds value. Good designs combine both rather than forcing one technique onto every requirement.",
    rationales: [
      "",
      "A hard regulatory limit must not adapt or be approximated by a model.",
      "Rules alone cannot discover the evolving patterns that indicate account takeover.",
      "Foundation models produce non-deterministic output and are a poor fit for enforcing an exact limit."
    ],
    services: [],
    tags: ["ai suitability", "rules vs ml"]
  },
  {
    id: "1.2-017",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A photo-sharing platform wants to automatically reject uploaded images containing nudity or graphic violence before they appear in public feeds, and it wants the flagged uploads reviewed by a moderator. Which pair of AWS capabilities supports this workflow?",
    options: [
      "Amazon Comprehend and SageMaker Feature Store",
      "Amazon Textract and Amazon Bedrock Guardrails",
      "Amazon Personalize and SageMaker Model Monitor",
      "Amazon Rekognition content moderation and Amazon Augmented AI (A2I)"
    ],
    answer: [3],
    explanation: "Amazon Rekognition content moderation returns moderation labels with confidence scores for images and video, and Amazon Augmented AI (A2I) routes low-confidence or flagged predictions to human reviewers. Together they cover automated screening plus human-in-the-loop review, which is a common pattern where mistakes carry reputational risk.",
    rationales: [
      "Comprehend analyzes text and Feature Store stores ML features; neither screens images.",
      "Textract reads documents and Guardrails filters generative AI content, not uploaded photos.",
      "Personalize recommends items and Model Monitor watches deployed model data quality.",
      ""
    ],
    services: ["Amazon Rekognition", "Amazon Augmented AI (A2I)"],
    tags: ["computer vision", "human review"]
  },
  {
    id: "1.2-018",
    domain: 1,
    task: "1.2",
    type: "multi",
    difficulty: "hard",
    stem: "A utility company is deciding whether a proposed project is a good candidate for machine learning. Which two conditions indicate that ML is a SUITABLE choice? (Select TWO.)",
    options: [
      "The relationship between the inputs and the outcome is complex and not fully documented",
      "Every decision must produce an identical result for the same input, verified against a published table",
      "A large volume of relevant historical data with known outcomes is available",
      "The business requires that no incorrect prediction is ever possible",
      "The task is a single arithmetic calculation defined by regulation"
    ],
    answer: [0, 2],
    explanation: "ML fits problems where the mapping from inputs to outcomes is complex or unknown and where enough representative historical data exists to learn from. It is a poor fit when outputs must be exact and reproducible against a published rule, when the logic is a simple documented calculation, or when zero errors are demanded, since models are probabilistic.",
    rationales: [
      "",
      "Requiring identical, table-verified output points to a deterministic rules implementation.",
      "",
      "ML models are probabilistic and always carry some error rate.",
      "A defined arithmetic rule should be coded directly rather than learned."
    ],
    services: [],
    tags: ["ai suitability", "ml readiness"]
  },
  {
    id: "1.2-019",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "easy",
    stem: "An e-commerce company wants to group its customers into segments based on browsing and purchase behavior. The company has no predefined segment labels and wants the segments discovered from the data. Which type of machine learning does this describe?",
    options: [
      "Supervised learning",
      "Reinforcement learning",
      "Unsupervised learning",
      "Transfer learning"
    ],
    answer: [2],
    explanation: "Discovering groups in data that has no labels is unsupervised learning, typically implemented with clustering. Supervised learning requires labeled examples of the target, reinforcement learning learns from rewards during interaction with an environment, and transfer learning reuses a pretrained model for a related task.",
    rationales: [
      "Supervised learning needs labeled target values, which the company does not have.",
      "Reinforcement learning learns through trial and reward signals, not by segmenting existing records.",
      "",
      "Transfer learning adapts an existing trained model; it is not a way to discover unlabeled groups."
    ],
    services: [],
    tags: ["ml types", "use case matching"]
  },
  {
    id: "1.2-020",
    domain: 1,
    task: "1.2",
    type: "ordering",
    difficulty: "medium",
    stem: "A transportation agency is starting a machine learning project to predict maintenance needs for its bus fleet. Place the standard ML lifecycle phases in the correct order.",
    options: [
      "Train and tune a model on the prepared data",
      "Define the business problem and success metrics",
      "Monitor the deployed model and retrain as data changes",
      "Collect and prepare the maintenance and sensor data",
      "Evaluate the model and deploy it to production"
    ],
    answer: [1, 3, 0, 4, 2],
    explanation: "The ML lifecycle starts with framing the business problem and how success will be measured, then data collection and preparation, then model training and tuning, then evaluation and deployment, and finally ongoing monitoring with retraining as data drifts. Skipping problem framing is a common cause of models that perform well technically but deliver no business value.",
    rationales: [],
    services: [],
    tags: ["ml lifecycle", "ai suitability"]
  },
  {
    id: "1.2-021",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A telecom provider wants to analyze millions of customer support chat transcripts to understand which product issues drive negative sentiment. The provider does not want to build or train a model. Which AWS service meets this requirement?",
    options: [
      "Amazon Comprehend",
      "Amazon Lex",
      "Amazon Fraud Detector",
      "Amazon Transcribe"
    ],
    answer: [0],
    explanation: "Amazon Comprehend provides pretrained APIs for sentiment analysis, key phrase extraction, entity recognition, and topic modeling over text, so the provider can analyze existing transcripts without training anything. Lex builds bots, Fraud Detector scores fraud risk, and Transcribe would be needed only if the source were audio.",
    rationales: [
      "",
      "Lex creates conversational bots rather than analyzing archives of past conversations.",
      "Fraud Detector scores event risk and does not perform sentiment analysis.",
      "Transcribe converts audio to text; the transcripts are already text."
    ],
    services: ["Amazon Comprehend"],
    tags: ["language ai", "sentiment analysis"]
  },
  {
    id: "1.2-022",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "hard",
    stem: "A finance team must produce month-end account balances for regulatory filings. An executive suggests using a foundation model on Amazon Bedrock to compute the balances from raw ledger entries. What is the MOST significant technical concern with this proposal?",
    options: [
      "Foundation models cannot accept numeric input in a prompt",
      "Bedrock does not support batch processing of large inputs",
      "Foundation models produce non-deterministic output, so identical inputs can yield different balances",
      "Bedrock cannot be used inside a private VPC"
    ],
    answer: [2],
    explanation: "Generative models sample from a probability distribution, so the same prompt can produce different responses and arithmetic is not guaranteed correct. Regulatory balances require exact, reproducible computation, which belongs in deterministic code or a database query. Recognizing where non-deterministic output is unacceptable is a core suitability judgment.",
    rationales: [
      "Numbers can be included in a prompt; the problem is the reliability of the output.",
      "Bedrock supports batch inference, so throughput is not the core issue.",
      "",
      "Bedrock can be accessed privately using VPC endpoints, so network isolation is not the concern."
    ],
    services: ["Amazon Bedrock"],
    tags: ["ai suitability", "non-deterministic output"]
  },
  {
    id: "1.2-023",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A mortgage lender processes scanned loan packages that contain both printed application forms and handwritten borrower notes. The lender needs the printed field values, the table of monthly obligations, and the handwritten notes captured as text. Which AWS service should the lender use?",
    options: [
      "Amazon Rekognition",
      "Amazon Textract",
      "Amazon Comprehend",
      "Amazon Kendra"
    ],
    answer: [1],
    explanation: "Amazon Textract extracts printed and handwritten text along with form key-value pairs and table structures from scanned documents. Rekognition detects text in images but is designed for scene text such as signs and license plates rather than structured document extraction, which is the distinction being tested here.",
    rationales: [
      "Rekognition detects short text in images and scenes; it does not return form fields or table structure from documents.",
      "",
      "Comprehend analyzes text that has already been extracted rather than reading scanned pages.",
      "Kendra searches indexed content and does not perform document extraction."
    ],
    services: ["Amazon Textract"],
    tags: ["document processing", "use case matching"]
  },
  {
    id: "1.2-024",
    domain: 1,
    task: "1.2",
    type: "multi",
    difficulty: "medium",
    stem: "A national retailer is planning several AI initiatives. Which two use cases are appropriate for Amazon Personalize? (Select TWO.)",
    options: [
      "Ranking a promotional email's product list for each individual subscriber",
      "Forecasting total warehouse staffing needs for the next quarter",
      "Showing \"customers who viewed this also viewed\" items on a product page",
      "Detecting counterfeit product photos submitted by third-party sellers",
      "Redacting credit card numbers from customer service notes"
    ],
    answer: [0, 2],
    explanation: "Amazon Personalize supports recommendation recipes including personalized ranking of a candidate list for a specific user and related-item recommendations. Staffing forecasts are a time series problem, counterfeit photo detection is computer vision, and redaction of sensitive data in text is a job for Amazon Comprehend PII detection.",
    rationales: [
      "",
      "Staffing volume over time is a forecasting problem, not user personalization.",
      "",
      "Detecting counterfeit images requires computer vision such as Amazon Rekognition.",
      "Amazon Comprehend detects and helps redact PII in text."
    ],
    services: ["Amazon Personalize"],
    tags: ["recommendation engines", "use case matching"]
  },
  {
    id: "1.2-025",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "hard",
    stem: "A startup wants to launch an image-based plant disease identifier in six weeks. It has only 40 labeled photos per disease and a two-person engineering team with no ML background. Which approach is MOST realistic for the first release?",
    options: [
      "Train a convolutional neural network from scratch on the 40 photos per class",
      "Replace the ML approach with a deterministic rules engine based on pixel color thresholds",
      "Skip the project because computer vision always requires millions of labeled images",
      "Start with a managed vision service or a pretrained model and expand the labeled dataset before considering custom training"
    ],
    answer: [3],
    explanation: "Assessing suitability includes assessing readiness. With very little labeled data and no ML expertise, starting from a managed service or pretrained model and investing in labeling is the practical path, because pretrained models already encode general visual features. Training from scratch on tiny datasets overfits, and rigid color rules cannot capture disease appearance across lighting and species.",
    rationales: [
      "Forty images per class is far too little to train a network from scratch without severe overfitting.",
      "Fixed pixel thresholds cannot generalize across lighting, species, and disease stages.",
      "Pretrained models and transfer learning make smaller datasets viable, so abandoning the project is unnecessary.",
      ""
    ],
    services: [],
    tags: ["ai suitability", "data readiness"]
  },
  {
    id: "1.2-026",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "A hotel group publishes its website in nine languages and updates promotional copy several times a week. Human translation cannot keep pace and quality is inconsistent across vendors. Which AWS service should the group adopt for the bulk of this content?",
    options: [
      "Amazon Translate",
      "Amazon Comprehend",
      "Amazon Polly",
      "Amazon Q Business"
    ],
    answer: [0],
    explanation: "Amazon Translate provides on-demand and batch neural machine translation between supported languages and supports custom terminology so brand terms stay consistent. Comprehend analyzes text without translating it, Polly produces audio, and Q Business answers questions over enterprise content.",
    rationales: [
      "",
      "Comprehend analyzes language attributes such as sentiment and entities; it does not translate.",
      "Polly converts text to speech rather than to another language.",
      "Q Business is an enterprise assistant, not a bulk translation pipeline."
    ],
    services: ["Amazon Translate"],
    tags: ["language ai", "use case matching"]
  },
  {
    id: "1.2-027",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "medium",
    stem: "An industrial equipment maker collects vibration and temperature readings from thousands of pumps every minute. Engineers want to be alerted when a pump's readings deviate from its normal operating pattern, without defining thresholds for each pump. Which ML task does this describe?",
    options: [
      "Anomaly detection",
      "Multi-class classification",
      "Text summarization",
      "Object detection"
    ],
    answer: [0],
    explanation: "Identifying readings that deviate from a learned normal pattern, without predefined labels or thresholds, is anomaly detection. Multi-class classification requires labeled categories, while summarization and object detection apply to text and images respectively.",
    rationales: [
      "",
      "Multi-class classification needs labeled failure categories, which the engineers do not have.",
      "Summarization applies to text, not sensor streams.",
      "Object detection locates items in images and does not apply to numeric telemetry."
    ],
    services: [],
    tags: ["anomaly detection", "ml types"]
  },
  {
    id: "1.2-028",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "easy",
    stem: "A contact center already routes calls with a fixed menu and now wants callers to speak naturally, have their intent recognized, and be connected to the right queue or self-serve where possible. Which AWS service provides the natural language understanding and dialog management for this?",
    options: [
      "Amazon Transcribe",
      "Amazon Kendra",
      "Amazon Lex",
      "Amazon Fraud Detector"
    ],
    answer: [2],
    explanation: "Amazon Lex supplies automatic speech recognition and natural language understanding together with dialog management, so it can identify a caller's intent, gather required slots, and hand off or fulfill the request. Transcribe would only produce a transcript, and the other services address search and fraud scoring.",
    rationales: [
      "Transcribe produces a transcript but cannot determine intent or manage a conversation.",
      "Kendra searches indexed documents rather than routing calls.",
      "",
      "Fraud Detector scores risk for events such as transactions, not call routing."
    ],
    services: ["Amazon Lex"],
    tags: ["chatbots", "speech ai"]
  },
  {
    id: "1.2-029",
    domain: 1,
    task: "1.2",
    type: "single",
    difficulty: "hard",
    stem: "A ride-hailing company must decide between Amazon Bedrock and Amazon SageMaker AI for a new project that requires a proprietary gradient boosting model trained on its own trip data, with full control of the training algorithm and hyperparameters. Which choice is appropriate and why?",
    options: [
      "Amazon Bedrock, because it exposes training algorithms and hyperparameters for custom models",
      "Amazon SageMaker AI, because it supports building, training, and deploying custom models with full algorithm control",
      "Amazon Bedrock, because custom tabular models must be accessed through foundation model APIs",
      "Amazon SageMaker AI, because it is the only service that can host an inference endpoint"
    ],
    answer: [1],
    explanation: "Amazon SageMaker AI is the platform for building, training, tuning, and deploying custom models, including tabular algorithms such as gradient boosting, with control over code and hyperparameters. Amazon Bedrock provides API access to managed foundation models with customization limited to techniques such as fine-tuning and continued pre-training on those models, not arbitrary algorithms.",
    rationales: [
      "Bedrock does not let customers choose arbitrary training algorithms for their own model architectures.",
      "",
      "Tabular models are not served through foundation model APIs.",
      "Bedrock also serves inference, so exclusivity of hosting is not the reason."
    ],
    services: ["Amazon SageMaker AI", "Amazon Bedrock"],
    tags: ["service selection", "ai suitability"]
  },
  {
    id: "1.2-030",
    domain: 1,
    task: "1.2",
    type: "multi",
    difficulty: "hard",
    stem: "A city transit authority is reviewing two candidate projects: (A) issuing fare refunds according to a published refund policy table, and (B) predicting which stations will exceed platform capacity next month. Which two statements correctly assess these projects? (Select TWO.)",
    options: [
      "Project A should be implemented with deterministic rules because the policy is known and results must be exact",
      "Project A is a strong ML candidate because refund amounts vary by rider",
      "Project B is a good ML candidate because ridership depends on many interacting factors learned from history",
      "Project B should use a fixed threshold per station because capacity limits are published",
      "Both projects require a foundation model to be viable"
    ],
    answer: [0, 2],
    explanation: "Refunds follow a published policy that must produce exact, repeatable amounts, which is a rules problem. Predicting future crowding depends on seasonality, events, weather, and service changes that are difficult to express as rules, so ML adds value. The capacity limit itself is a fixed number, but forecasting whether it will be exceeded is a prediction task.",
    rationales: [
      "",
      "Variation by rider is still defined by the policy table, so it remains deterministic.",
      "",
      "Knowing the capacity limit does not tell you future ridership, which still must be predicted.",
      "Neither project requires generative AI; one is rules based and the other is a forecasting problem."
    ],
    services: [],
    tags: ["ai suitability", "rules vs ml"]
  },
  {
    id: "1.2-031",
    domain: 1,
    task: "1.2",
    type: "multi",
    difficulty: "medium",
    stem: "A pharmaceutical company wants to reduce manual effort in its regulatory affairs group. Which two use cases are appropriate for a generative AI application built on Amazon Bedrock rather than a purpose-built AI service? (Select TWO.)",
    options: [
      "Drafting a plain-language summary of a long clinical study report",
      "Converting recorded investigator interviews into text transcripts",
      "Answering staff questions in natural language using an indexed corpus of internal submission guidelines",
      "Extracting table values from scanned batch records",
      "Detecting the dominant language of an incoming email"
    ],
    answer: [0, 2],
    explanation: "Summarizing long documents and answering natural language questions grounded in company content, for example with Amazon Bedrock Knowledge Bases for retrieval augmented generation, are generative AI use cases. Transcription, scanned document extraction, and language detection are solved more cheaply and reliably by Amazon Transcribe, Amazon Textract, and Amazon Comprehend.",
    rationales: [
      "",
      "Amazon Transcribe is the purpose-built service for speech to text.",
      "",
      "Amazon Textract is purpose-built for extracting tables from scanned documents.",
      "Amazon Comprehend provides language detection as a simple API call."
    ],
    services: ["Amazon Bedrock", "Amazon Bedrock Knowledge Bases"],
    tags: ["generative ai use cases", "service selection"]
  },
  {
    id: "1.2-032",
    domain: 1,
    task: "1.2",
    type: "ordering",
    difficulty: "medium",
    stem: "An insurance company is building a retrieval augmented generation assistant over its policy documents using Amazon Bedrock Knowledge Bases. Place the steps in the correct order.",
    options: [
      "Store the resulting embeddings in a vector store for retrieval",
      "Retrieve the most relevant chunks for a user question and pass them to the foundation model as context",
      "Load the policy documents into an Amazon S3 data source",
      "Split the documents into chunks and generate embeddings with an embedding model"
    ],
    answer: [2, 3, 0, 1],
    explanation: "RAG ingestion starts by placing source documents in a data source such as Amazon S3, then chunking them and creating embeddings, then storing those embeddings in a vector store. At query time the system retrieves the most relevant chunks and supplies them to the foundation model as grounding context so the answer reflects company content.",
    rationales: [],
    services: ["Amazon Bedrock Knowledge Bases", "Amazon S3"],
    tags: ["generative ai use cases", "rag"]
  }
);
