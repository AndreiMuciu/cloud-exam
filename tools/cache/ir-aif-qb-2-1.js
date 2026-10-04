window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "2.1-001",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "easy",
    stem: "A logistics company wants to use one large pre-trained model as the starting point for several different applications, including shipment summaries, a customer chatbot, and translated notifications. Which term describes a model that is pre-trained on broad data and can be adapted to many downstream tasks?",
    options: [
      "A classification model",
      "A forecasting model",
      "A clustering model",
      "A foundation model"
    ],
    answer: [3],
    explanation: "A foundation model (FM) is a large model pre-trained on a very large, broad dataset that can then be adapted to many different tasks through prompting, retrieval augmentation, or fine-tuning. That general-purpose reuse is what separates an FM from a traditional model built for one narrow prediction task.",
    rationales: [
      "A classification model predicts a label for one specific task and is not broadly adaptable.",
      "A forecasting model predicts future numeric values from time series data only.",
      "A clustering model groups unlabeled records and does not generate text.",
      ""
    ],
    services: [],
    tags: ["foundation models", "generative ai concepts"]
  },
  {
    id: "2.1-002",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "easy",
    stem: "A media company is reviewing how a large language model processes the text it receives. Before the model can process a sentence, the text is split into smaller units such as words or word fragments. What are these units called?",
    options: [
      "Features",
      "Labels",
      "Tokens",
      "Epochs"
    ],
    answer: [2],
    explanation: "Tokenization breaks input text into tokens, which are the units a large language model actually reads and generates. A token is often a whole short word or a fragment of a longer word, which is why token counts do not match word counts exactly.",
    rationales: [
      "Features are input variables in traditional machine learning, not text units for an LLM.",
      "Labels are the target values used in supervised training, not pieces of input text.",
      "",
      "An epoch is one full pass over a training dataset during training."
    ],
    services: [],
    tags: ["tokens", "tokenization"]
  },
  {
    id: "2.1-003",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A healthcare provider sends a 400-page policy manual to a foundation model in a single prompt and receives an error stating that the input is too long. Which model characteristic explains this limit?",
    options: [
      "The context window, which caps the number of tokens the model can process at once",
      "The embedding dimension, which caps the length of each input document",
      "The temperature setting, which caps how much text the model reads",
      "The number of model parameters, which caps the size of an input file"
    ],
    answer: [0],
    explanation: "The context window is the maximum number of tokens a model can handle in a single request, counting both the prompt and the generated completion. Long documents must be chunked, summarized in stages, or retrieved selectively so that only relevant portions enter the context window.",
    rationales: [
      "",
      "Embedding dimension describes the size of a vector representation, not the input limit for a prompt.",
      "Temperature affects randomness in the output and has no effect on input length.",
      "Parameter count relates to model capacity, not to the per-request token limit."
    ],
    services: [],
    tags: ["context window", "tokens"]
  },
  {
    id: "2.1-004",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A public sector agency wants to find documents that discuss the same idea as a user question even when the documents use different wording. Which representation of text supports this capability?",
    options: [
      "A keyword inverted index built from exact terms",
      "A one-hot encoding of every unique word in the corpus",
      "A compressed archive of the raw document files",
      "An embedding, which is a numeric vector that captures semantic meaning"
    ],
    answer: [3],
    explanation: "An embedding maps text to a vector of numbers so that passages with similar meaning sit close together in vector space. Similarity search over embeddings therefore matches on meaning rather than on exact shared words, which is the basis of semantic search and retrieval augmented generation.",
    rationales: [
      "A keyword index matches literal terms and misses paraphrases that use different words.",
      "One-hot encoding treats every word as unrelated, so it captures no semantic similarity.",
      "Compressing files changes storage size and provides no way to compare meaning.",
      ""
    ],
    services: [],
    tags: ["embeddings", "vectors"]
  },
  {
    id: "2.1-005",
    domain: 2,
    task: "2.1",
    type: "multi",
    difficulty: "medium",
    stem: "A gaming company is building a semantic search feature and needs to store embeddings and run similarity queries against them. Which AWS options can serve as a vector store for this workload? (Select TWO.)",
    options: [
      "Amazon OpenSearch Service",
      "Amazon Athena",
      "AWS Glue Data Catalog",
      "Amazon Aurora PostgreSQL with the pgvector extension",
      "Amazon QuickSight"
    ],
    answer: [0, 3],
    explanation: "Amazon OpenSearch Service supports vector fields and k-nearest-neighbor search, and Amazon Aurora PostgreSQL supports vector columns and similarity operators through the pgvector extension. Both can hold embeddings alongside metadata and answer nearest-neighbor queries for semantic search or retrieval augmented generation.",
    rationales: [
      "",
      "Athena runs SQL queries over data in Amazon S3 and is not a vector index.",
      "The Glue Data Catalog stores table metadata and does not store or search vectors.",
      "",
      "QuickSight is a business intelligence and dashboarding service, not a vector store."
    ],
    services: ["Amazon OpenSearch Service", "Amazon Aurora PostgreSQL"],
    tags: ["vector databases", "embeddings"]
  },
  {
    id: "2.1-006",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "easy",
    stem: "A finance team asks a foundation model to draft a quarterly earnings summary. The instruction and supporting text the team sends to the model is called the prompt. What is the model-generated text that comes back called?",
    options: [
      "The completion",
      "The checkpoint",
      "The gradient",
      "The hyperparameter"
    ],
    answer: [0],
    explanation: "In generative AI, the input to the model is the prompt and the generated output is the completion, also called the response or inference result. Both prompt and completion consume tokens, which is why they are billed and limited together.",
    rationales: [
      "",
      "A checkpoint is a saved snapshot of model weights during training.",
      "A gradient is a value used to update weights while training, not model output.",
      "A hyperparameter is a training or inference setting chosen by a person."
    ],
    services: [],
    tags: ["prompt and completion", "inference"]
  },
  {
    id: "2.1-007",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A manufacturing company uses a foundation model to write internal safety bulletins and needs the wording to be consistent and predictable for the same prompt. Which inference parameter change BEST supports this requirement?",
    options: [
      "Increase the temperature value",
      "Lower the temperature value toward 0",
      "Increase the maximum token count",
      "Add more stop sequences"
    ],
    answer: [1],
    explanation: "Temperature controls randomness during token selection. A low temperature makes the model strongly favor the highest-probability tokens, producing focused and repeatable output, while a high temperature flattens the distribution and yields more varied and creative text.",
    rationales: [
      "Raising temperature increases randomness, producing more variation between runs.",
      "",
      "Maximum token count limits response length and does not affect word choice randomness.",
      "Stop sequences end generation at a marker; they do not make wording more consistent."
    ],
    services: [],
    tags: ["inference parameters", "temperature"]
  },
  {
    id: "2.1-008",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "hard",
    stem: "A retail company wants the model to consider only the smallest set of candidate tokens whose cumulative probability reaches a chosen threshold at each generation step. Which inference parameter provides this behavior?",
    options: [
      "Top-k",
      "Max tokens",
      "Top-p",
      "Stop sequences"
    ],
    answer: [2],
    explanation: "Top-p, also called nucleus sampling, keeps the smallest group of highest-probability tokens whose probabilities add up to the value of p, so the candidate pool grows or shrinks with the model's confidence. Top-k instead keeps a fixed count of candidates regardless of how the probability mass is distributed.",
    rationales: [
      "Top-k limits sampling to a fixed number of candidate tokens, not a cumulative probability.",
      "Max tokens caps the length of the response and does not filter candidates.",
      "",
      "Stop sequences terminate generation when specific text appears."
    ],
    services: [],
    tags: ["inference parameters", "top-p"]
  },
  {
    id: "2.1-009",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A telecom support tool must stop generating text as soon as the model produces the string \"###END###\" so the response can be parsed reliably. Which inference parameter should the team configure?",
    options: [
      "Top-k",
      "Temperature",
      "Stop sequences",
      "Top-p"
    ],
    answer: [2],
    explanation: "A stop sequence is a string that tells the model to end generation immediately when it is produced, which keeps responses within a predictable structure. Length caps such as max tokens cut output at an arbitrary point instead of at a meaningful boundary.",
    rationales: [
      "Top-k controls how many candidate tokens are considered at each step.",
      "Temperature controls randomness, not where generation ends.",
      "",
      "Top-p controls the cumulative probability threshold for candidate tokens."
    ],
    services: [],
    tags: ["inference parameters", "stop sequences"]
  },
  {
    id: "2.1-010",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "easy",
    stem: "An insurance company notices that a foundation model produced a confident answer citing a regulation that does not exist. What is this behavior called?",
    options: [
      "Overfitting",
      "Data drift",
      "Class imbalance",
      "Hallucination"
    ],
    answer: [3],
    explanation: "A hallucination is output that is fluent and confident but factually wrong or fabricated, because the model predicts likely text rather than looking up verified facts. Grounding the model with retrieved source documents and adding human review reduces the impact of hallucinations.",
    rationales: [
      "Overfitting describes a trained model that memorizes training data and generalizes poorly.",
      "Data drift is a change in production data distribution over time.",
      "Class imbalance is an uneven distribution of labels in a training dataset.",
      ""
    ],
    services: [],
    tags: ["hallucination", "generative ai risks"]
  },
  {
    id: "2.1-011",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A legal services firm includes three labeled example question-and-answer pairs inside the prompt so the model matches the firm's expected answer style. Which prompting technique is this?",
    options: [
      "Zero-shot prompting",
      "Continued pre-training",
      "Few-shot prompting",
      "Reinforcement learning from human feedback"
    ],
    answer: [2],
    explanation: "Few-shot prompting places a small number of input and output examples in the prompt so the model can infer the desired pattern at inference time. Zero-shot prompting gives only the instruction with no examples, and neither approach changes the model weights.",
    rationales: [
      "Zero-shot prompting includes an instruction with no worked examples.",
      "Continued pre-training updates model weights with large amounts of unlabeled domain data.",
      "",
      "RLHF is a training process that aligns a model using human preference data."
    ],
    services: [],
    tags: ["few-shot", "prompt engineering"]
  },
  {
    id: "2.1-012",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A research group needs a model that accepts both a photograph and a text question in the same request and returns a written answer about the image. Which type of model meets this requirement?",
    options: [
      "A unimodal text-only model",
      "A multimodal model",
      "A tabular regression model",
      "A text embedding model"
    ],
    answer: [1],
    explanation: "A multimodal model accepts or produces more than one data modality, such as text plus images, audio, or video. A unimodal model handles a single modality only, so it cannot interpret an image alongside a text question.",
    rationales: [
      "A unimodal text model can process only text input and cannot interpret an image.",
      "",
      "A tabular regression model predicts numeric values from structured columns.",
      "An embedding model returns vectors for similarity search, not written answers."
    ],
    services: [],
    tags: ["multimodal models", "unimodal vs multimodal"]
  },
  {
    id: "2.1-013",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "An advertising agency wants to generate original product images from written descriptions. Which class of generative model is designed for this image generation task?",
    options: [
      "Diffusion models",
      "Decision tree ensembles",
      "Linear regression models",
      "K-means clustering models"
    ],
    answer: [0],
    explanation: "Diffusion models learn to reverse a gradual noising process, so they can start from random noise and progressively denoise it into an image that matches a text prompt. They are the dominant architecture behind current text-to-image generation.",
    rationales: [
      "",
      "Tree ensembles handle structured prediction tasks and cannot synthesize images.",
      "Linear regression predicts a numeric value from input features.",
      "K-means groups similar records and generates no new content."
    ],
    services: [],
    tags: ["diffusion models", "image generation"]
  },
  {
    id: "2.1-014",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "hard",
    stem: "An engineering team is explaining why modern large language models handle long passages better than earlier recurrent networks. Which component of the transformer architecture is the key reason?",
    options: [
      "Convolution layers that scan local pixel neighborhoods",
      "Recurrent cells that pass a hidden state one step at a time",
      "The self-attention mechanism that weighs relationships among all tokens in the sequence",
      "Pooling layers that reduce the size of feature maps"
    ],
    answer: [2],
    explanation: "Transformers use self-attention so that every token can be compared against every other token in the input at once, which captures long-range dependencies and allows highly parallel training. Recurrent architectures process tokens sequentially, which makes long dependencies harder to learn.",
    rationales: [
      "Convolutions capture local spatial patterns and are typical of vision networks.",
      "Recurrent cells are the earlier approach that transformers replaced.",
      "",
      "Pooling downsamples feature maps in convolutional networks."
    ],
    services: [],
    tags: ["transformer architecture", "llm"]
  },
  {
    id: "2.1-015",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A hospital is preparing a large collection of clinical guideline PDFs for retrieval augmented generation. Why does the team split each document into smaller passages before creating embeddings?",
    options: [
      "Chunking keeps each passage within embedding input limits and improves retrieval precision",
      "Chunking removes the need to store any vectors",
      "Chunking increases the number of parameters in the foundation model",
      "Chunking converts the PDFs into structured relational tables"
    ],
    answer: [0],
    explanation: "Chunking divides long documents into passages that fit the embedding model's input limit and that each cover a focused topic. Smaller, coherent chunks return more relevant matches and waste less of the generation model's context window than whole documents would.",
    rationales: [
      "",
      "Chunks still must be embedded and stored in a vector store to be searchable.",
      "Chunking is a data preparation step and does not change model size.",
      "Chunking splits text into passages; it does not produce relational schemas."
    ],
    services: [],
    tags: ["chunking", "rag"]
  },
  {
    id: "2.1-016",
    domain: 2,
    task: "2.1",
    type: "ordering",
    difficulty: "medium",
    stem: "Place the stages of the foundation model lifecycle in the correct order, from the earliest stage to the latest.",
    options: [
      "Fine-tune the model on task-specific labeled data",
      "Select and prepare the training data",
      "Deploy the model and collect feedback for continuous improvement",
      "Pre-train the model on the broad dataset",
      "Evaluate the model against benchmarks and business metrics"
    ],
    answer: [1, 3, 0, 4, 2],
    explanation: "The foundation model lifecycle begins with data selection and preparation, followed by pre-training on the broad corpus. Adaptation such as fine-tuning comes next, then evaluation against benchmarks and business metrics, and finally deployment with ongoing feedback that drives later iterations.",
    rationales: [],
    services: [],
    tags: ["fm lifecycle"]
  },
  {
    id: "2.1-017",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "easy",
    stem: "A university help desk receives thousands of repetitive questions about enrollment deadlines and wants an application that holds a natural back-and-forth conversation with students. Which generative AI use case does this describe?",
    options: [
      "Anomaly detection",
      "Time series forecasting",
      "A conversational chatbot",
      "Image segmentation"
    ],
    answer: [2],
    explanation: "A conversational chatbot uses a foundation model to interpret free-form questions and respond in natural language while keeping earlier turns of the conversation in context. The other options are traditional machine learning tasks that do not involve generating dialogue.",
    rationales: [
      "Anomaly detection flags unusual records and does not converse with users.",
      "Forecasting predicts future numeric values from historical series.",
      "",
      "Image segmentation labels regions of an image at the pixel level."
    ],
    services: [],
    tags: ["chatbots", "use cases"]
  },
  {
    id: "2.1-018",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "easy",
    stem: "A software company wants its developers to receive inline suggestions for functions and unit tests directly in the IDE, based on natural language comments. Which AWS service is purpose-built for this use case?",
    options: [
      "Amazon Q Developer",
      "Amazon Q Business",
      "Amazon Comprehend",
      "Amazon Kendra"
    ],
    answer: [0],
    explanation: "Amazon Q Developer is the generative AI assistant for software development, offering in-IDE code suggestions, code explanation, test generation, and troubleshooting help. Amazon Q Business targets enterprise knowledge questions over company content rather than writing code in an IDE.",
    rationales: [
      "",
      "Amazon Q Business answers questions over enterprise data; it is not an IDE coding assistant.",
      "Comprehend performs natural language processing tasks such as entity and sentiment extraction.",
      "Kendra provides intelligent enterprise search over documents."
    ],
    services: ["Amazon Q Developer"],
    tags: ["code generation", "use cases"]
  },
  {
    id: "2.1-019",
    domain: 2,
    task: "2.1",
    type: "multi",
    difficulty: "medium",
    stem: "A news publisher is cataloging generative AI use cases it can pursue with foundation models. Which two tasks are well suited to a text-generating foundation model? (Select TWO.)",
    options: [
      "Condensing long investigative articles into short abstracts",
      "Detecting fraudulent credit card transactions in real time",
      "Drafting alternative headlines for an article in several tones",
      "Forecasting next quarter's subscription revenue",
      "Compressing video files to reduce storage cost"
    ],
    answer: [0, 2],
    explanation: "Summarization and creative text generation are core foundation model use cases because both require producing fluent new language from a given input. Fraud detection, revenue forecasting, and video compression are handled by traditional machine learning or by non-AI engineering techniques.",
    rationales: [
      "",
      "Fraud detection is a supervised classification or anomaly detection problem.",
      "",
      "Revenue forecasting uses time series models on historical numeric data.",
      "Video compression is a codec engineering task, not generative AI."
    ],
    services: [],
    tags: ["summarization", "text generation", "use cases"]
  },
  {
    id: "2.1-020",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A travel company wants a generative AI application that can decide which internal APIs to call, chain the calls together, and complete a multi-step booking change on behalf of a customer. Which Amazon Bedrock capability is designed for this?",
    options: [
      "Amazon Bedrock Guardrails",
      "Amazon Bedrock Agents",
      "Amazon Bedrock Model Evaluation",
      "Amazon Bedrock Knowledge Bases"
    ],
    answer: [1],
    explanation: "Amazon Bedrock Agents use a foundation model to break a request into steps, invoke configured APIs or functions, and iterate until the task is complete. Knowledge Bases supply retrieved context, Guardrails filter content, and Model Evaluation compares model quality, so none of those orchestrate actions.",
    rationales: [
      "Guardrails apply content filters and topic restrictions; they do not orchestrate API calls.",
      "",
      "Model Evaluation compares model performance and does not execute business actions.",
      "Knowledge Bases retrieve relevant documents to ground responses, not to call APIs."
    ],
    services: ["Amazon Bedrock Agents"],
    tags: ["agents", "use cases"]
  },
  {
    id: "2.1-021",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A gaming studio already runs its player profile data in Amazon Aurora PostgreSQL and wants to add semantic search over player support tickets without introducing a new database engine. Which approach involves the LEAST operational overhead?",
    options: [
      "Migrate all data to Amazon Neptune Analytics and store vectors as graph properties",
      "Enable the pgvector extension in the existing Aurora PostgreSQL cluster and store embeddings there",
      "Build a custom nearest-neighbor service on Amazon EC2 instances",
      "Store embeddings as CSV files in Amazon S3 and scan them with AWS Lambda for each query"
    ],
    answer: [1],
    explanation: "The pgvector extension adds a vector data type and similarity operators to Aurora PostgreSQL, so embeddings can live beside existing relational data with no new engine to run. Introducing a separate database or a hand-built search service adds infrastructure and operational work for the same result.",
    rationales: [
      "A migration to a graph service is a large change when the existing database already supports vectors.",
      "",
      "Self-managing a nearest-neighbor service on EC2 maximizes operational overhead.",
      "Scanning CSV files per query does not scale and provides no vector index."
    ],
    services: ["Amazon Aurora PostgreSQL"],
    tags: ["vector databases", "rag"]
  },
  {
    id: "2.1-022",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "hard",
    stem: "A logistics company stores hundreds of millions of embeddings that are queried a few times per hour for batch enrichment jobs, and cost is the primary concern rather than millisecond latency. Which AWS option is MOST cost-effective for this vector workload?",
    options: [
      "Amazon MemoryDB with vector search",
      "Amazon S3 Vectors",
      "Amazon DocumentDB with vector search",
      "Amazon OpenSearch Service provisioned clusters sized for peak load"
    ],
    answer: [1],
    explanation: "Amazon S3 Vectors provides durable vector storage with built-in similarity query support at S3-scale economics, which suits very large vector sets queried infrequently. In-memory and provisioned cluster options deliver much lower latency but cost far more when queries are rare.",
    rationales: [
      "MemoryDB keeps vectors in memory for single-digit millisecond search, which is costly at this scale.",
      "",
      "DocumentDB vector search runs on provisioned instances that stay billed between infrequent queries.",
      "Provisioning OpenSearch clusters for peak load wastes capacity for a few queries per hour."
    ],
    services: ["Amazon S3 Vectors"],
    tags: ["vector databases", "cost optimization"]
  },
  {
    id: "2.1-023",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A financial services firm needs sub-millisecond vector similarity lookups to personalize offers while a customer is still in the mobile app session. Which AWS service is designed for in-memory vector search at this latency?",
    options: [
      "Amazon MemoryDB",
      "Amazon RDS for PostgreSQL",
      "Amazon Redshift",
      "Amazon Neptune Analytics"
    ],
    answer: [0],
    explanation: "Amazon MemoryDB is an in-memory database with durability that supports vector search, making it a fit when the application requires the lowest possible retrieval latency. Disk-based relational, analytics, or graph options are appropriate for vectors but are not tuned for in-memory response times.",
    rationales: [
      "",
      "RDS for PostgreSQL with pgvector is disk-based and cannot match in-memory latency.",
      "Redshift is a data warehouse for analytics queries, not a low-latency vector lookup store.",
      "Neptune Analytics analyzes graph data with vector support but is not an in-memory cache."
    ],
    services: ["Amazon MemoryDB"],
    tags: ["vector databases", "embeddings"]
  },
  {
    id: "2.1-024",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A pharmaceutical research team wants to combine graph relationships between compounds with vector similarity over research abstracts in a single analytics engine. Which AWS service supports graph analytics with built-in vector search?",
    options: [
      "Amazon DynamoDB",
      "Amazon Neptune Analytics",
      "Amazon DocumentDB",
      "Amazon Timestream"
    ],
    answer: [1],
    explanation: "Amazon Neptune Analytics is a graph analytics engine that supports vector similarity search alongside graph traversals, so relationship analysis and semantic similarity can run together. DocumentDB also supports vectors but stores JSON documents rather than graph relationships.",
    rationales: [
      "DynamoDB is a key-value and document store without native vector similarity search.",
      "",
      "DocumentDB supports vector search over JSON documents but is not a graph analytics engine.",
      "Timestream is purpose-built for time series data."
    ],
    services: ["Amazon Neptune Analytics"],
    tags: ["vector databases", "graph"]
  },
  {
    id: "2.1-025",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "easy",
    stem: "A global retailer needs product reviews written in Japanese converted into English for its analytics team, with high accuracy and minimal setup. Which AWS service should the company use?",
    options: [
      "Amazon Transcribe",
      "Amazon Textract",
      "Amazon Comprehend",
      "Amazon Translate"
    ],
    answer: [3],
    explanation: "Amazon Translate is the managed neural machine translation service for converting text between languages. Transcribe converts speech to text, Textract extracts text from documents, and Comprehend analyzes text for entities and sentiment rather than translating it.",
    rationales: [
      "Transcribe converts recorded speech into text; it does not translate written reviews.",
      "Textract pulls text and structure out of scanned documents and forms.",
      "Comprehend analyzes text for sentiment, entities, and topics without translating it.",
      ""
    ],
    services: ["Amazon Translate"],
    tags: ["translation", "ai services"]
  },
  {
    id: "2.1-026",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A customer support platform sets the max tokens inference parameter too low for a summarization request. What is the MOST likely result?",
    options: [
      "The response is cut off before the summary is complete",
      "The model refuses to answer the prompt",
      "The response becomes more factually accurate",
      "The model switches to a smaller foundation model automatically"
    ],
    answer: [0],
    explanation: "Max tokens caps how many tokens the model may generate in the response, so a value that is too low truncates the output mid-thought. It is a hard length limit, not a quality control, and it does not change which model runs.",
    rationales: [
      "",
      "A low output cap truncates text; it does not cause a refusal.",
      "Response length limits have no direct effect on factual accuracy.",
      "Inference parameters never swap the underlying model."
    ],
    services: [],
    tags: ["inference parameters", "max tokens"]
  },
  {
    id: "2.1-027",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A marketing team wants a brainstorming assistant that produces highly varied and surprising campaign slogans across repeated runs of the same prompt. Which combination of inference settings BEST fits this goal?",
    options: [
      "Low temperature with a very small top-k value",
      "Temperature of 0 with greedy decoding",
      "Higher temperature with a larger top-p value",
      "A short max tokens limit with extra stop sequences"
    ],
    answer: [2],
    explanation: "Raising temperature flattens the token probability distribution and raising top-p widens the candidate pool, so together they increase diversity and creativity in the output. Deterministic settings such as temperature 0 produce nearly identical responses on every run.",
    rationales: [
      "Low temperature and small top-k restrict choices, producing repetitive output.",
      "Temperature 0 selects the most likely token every time, minimizing variety.",
      "",
      "Length caps and stop sequences shape response length, not creativity."
    ],
    services: [],
    tags: ["inference parameters", "temperature"]
  },
  {
    id: "2.1-028",
    domain: 2,
    task: "2.1",
    type: "multi",
    difficulty: "medium",
    stem: "A bank is documenting the risks of using a public foundation model chatbot for customer-facing answers about loan products. Which two limitations of foundation models should the documentation highlight? (Select TWO.)",
    options: [
      "The model can generate plausible but incorrect statements",
      "The model always refuses questions about topics outside its training data",
      "The model's knowledge is frozen at a training cutoff unless it is grounded with current data",
      "The model automatically cites verified sources for every claim it makes",
      "The model retrains itself on each customer conversation by default"
    ],
    answer: [0, 2],
    explanation: "Foundation models can hallucinate confident but wrong content, and their parametric knowledge stops at the training cutoff, so answers about newer rates or policies require grounding through retrieval or fine-tuning. Models do not inherently cite verified sources, refuse out-of-scope topics, or retrain themselves during use.",
    rationales: [
      "",
      "Models typically attempt an answer even outside their training data, which drives hallucination risk.",
      "",
      "Base models generate text without verified citations unless a retrieval system supplies sources.",
      "Inference does not update model weights; conversations do not retrain the model by default."
    ],
    services: [],
    tags: ["hallucination", "fm limitations"]
  },
  {
    id: "2.1-029",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "easy",
    stem: "A streaming media service wants to suggest movies to each viewer based on that viewer's watch history and the behavior of similar users. Which AWS service is purpose-built for this recommendation use case?",
    options: [
      "Amazon Rekognition",
      "Amazon Polly",
      "Amazon Lex",
      "Amazon Personalize"
    ],
    answer: [3],
    explanation: "Amazon Personalize is the managed recommendation service that trains on user interaction data to produce personalized item rankings. Recommendations are listed as an AI use case alongside generative tasks, but they use specialized recommender models rather than a chatbot or vision service.",
    rationales: [
      "Rekognition analyzes images and video for objects, faces, and moderation.",
      "Polly converts text into lifelike speech.",
      "Lex builds conversational voice and text bots.",
      ""
    ],
    services: ["Amazon Personalize"],
    tags: ["recommendations", "use cases"]
  },
  {
    id: "2.1-030",
    domain: 2,
    task: "2.1",
    type: "ordering",
    difficulty: "medium",
    stem: "A nonprofit is building a retrieval augmented generation pipeline to make its grant archive searchable by meaning. Place the ingestion steps in the correct order.",
    options: [
      "Store the embeddings in a vector database",
      "Split the documents into appropriately sized chunks",
      "Collect and clean the source documents",
      "Generate an embedding for each chunk with an embedding model"
    ],
    answer: [2, 1, 3, 0],
    explanation: "RAG ingestion starts by collecting and cleaning the source content, then chunking it into passages sized for the embedding model. Each chunk is converted into an embedding vector, and the vectors are stored in a vector database where similarity search can retrieve them at query time.",
    rationales: [],
    services: [],
    tags: ["rag", "chunking", "embeddings"]
  },
  {
    id: "2.1-031",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "A city government asks a foundation model to classify citizen emails into five categories using only a written instruction that describes each category, with no examples included. Which prompting technique is being used?",
    options: [
      "Zero-shot prompting",
      "Few-shot prompting",
      "Fine-tuning",
      "Retrieval augmented generation"
    ],
    answer: [0],
    explanation: "Zero-shot prompting relies entirely on the model's pre-trained knowledge and the instruction itself, with no demonstrations in the prompt. Adding one example makes it one-shot, and several examples make it few-shot; none of these change the model's weights.",
    rationales: [
      "",
      "Few-shot prompting would include labeled example emails in the prompt.",
      "Fine-tuning trains the model on labeled data and updates its weights.",
      "RAG retrieves external documents to ground responses, which this scenario does not do."
    ],
    services: [],
    tags: ["zero-shot", "prompt engineering"]
  },
  {
    id: "2.1-032",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "hard",
    stem: "A company compares two ways to make a foundation model answer with its private product terminology: adding retrieved product documents to each prompt, or fine-tuning the model on labeled product Q&A pairs. Which statement correctly contrasts the two approaches?",
    options: [
      "Fine-tuning keeps documents current automatically, while retrieval requires retraining for every update",
      "Retrieval grounds answers in up-to-date documents without changing model weights, while fine-tuning bakes knowledge and style into the weights",
      "Both approaches modify the model weights but retrieval does so at lower cost",
      "Retrieval can only be used with image models, while fine-tuning works for text"
    ],
    answer: [1],
    explanation: "Retrieval augmented generation injects current documents into the prompt at inference time, so content updates require only re-indexing, not retraining. Fine-tuning changes the model weights, which is better for teaching style or task behavior but must be repeated when knowledge changes.",
    rationales: [
      "This reverses the two approaches; retrieval is the one that stays current without retraining.",
      "",
      "Retrieval does not modify weights at all; only fine-tuning does.",
      "Retrieval augmented generation is used widely with text models."
    ],
    services: [],
    tags: ["rag", "fine-tuning"]
  },
  {
    id: "2.1-033",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "easy",
    stem: "Which statement BEST describes a large language model (LLM)?",
    options: [
      "A rules engine that matches keywords to canned responses",
      "A database that stores sentences for exact retrieval",
      "A speech synthesis system that converts text to audio",
      "A neural network trained on massive text corpora to predict the next token in a sequence"
    ],
    answer: [3],
    explanation: "An LLM is a very large neural network, typically transformer-based, trained on huge volumes of text to predict the next token given the preceding tokens. This simple objective, applied at scale, produces general abilities such as answering questions, summarizing, and writing code.",
    rationales: [
      "Rules engines follow hand-written patterns and cannot generalize like an LLM.",
      "LLMs generate new text token by token rather than retrieving stored sentences.",
      "Text-to-speech systems produce audio and are distinct from language models.",
      ""
    ],
    services: [],
    tags: ["llm", "foundation models"]
  },
  {
    id: "2.1-034",
    domain: 2,
    task: "2.1",
    type: "multi",
    difficulty: "hard",
    stem: "A solutions architect is choosing inference parameters for an Amazon Bedrock text model. Which two statements about sampling parameters are accurate? (Select TWO.)",
    options: [
      "Top-k restricts sampling to a fixed number of the most probable candidate tokens",
      "Temperature changes the maximum length of the generated response",
      "Top-p restricts sampling to tokens within a cumulative probability threshold",
      "Top-k sets the number of responses the model returns per request",
      "Temperature determines which foundation model processes the request"
    ],
    answer: [0, 2],
    explanation: "Top-k keeps only the k most probable tokens as candidates at each step, while top-p keeps the smallest set of tokens whose combined probability reaches p. Temperature separately reshapes the probability distribution over those candidates; none of these parameters control response count, length, or model choice.",
    rationales: [
      "",
      "Response length is controlled by the max tokens parameter, not temperature.",
      "",
      "Top-k filters candidate tokens per step; it does not create multiple responses.",
      "Model selection is part of the API request, not an inference sampling parameter."
    ],
    services: ["Amazon Bedrock"],
    tags: ["inference parameters", "top-k", "top-p"]
  },
  {
    id: "2.1-035",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "medium",
    stem: "An e-commerce company computes embeddings for its product catalog and for each search query, then returns the products whose vectors are closest to the query vector. What is this retrieval technique called?",
    options: [
      "Lexical keyword matching",
      "Semantic search using vector similarity",
      "Regular expression filtering",
      "Batch ETL aggregation"
    ],
    answer: [1],
    explanation: "Semantic search embeds queries and items into the same vector space and ranks results by vector similarity measures such as cosine similarity, so items that mean the same thing match even without shared keywords. Lexical search, by contrast, ranks on exact or stemmed term overlap.",
    rationales: [
      "Keyword matching compares literal terms and misses synonyms and paraphrases.",
      "",
      "Regular expressions match character patterns, not meaning.",
      "ETL aggregation transforms data for analytics and is not a retrieval technique."
    ],
    services: [],
    tags: ["embeddings", "search"]
  },
  {
    id: "2.1-036",
    domain: 2,
    task: "2.1",
    type: "multi",
    difficulty: "easy",
    stem: "A film studio is planning generative AI pilots. Which two tasks require a multimodal or image and video generation model rather than a text-only model? (Select TWO.)",
    options: [
      "Creating storyboard illustrations from written scene descriptions",
      "Summarizing a screenplay into a one-page synopsis",
      "Producing a short animated video clip from a text prompt",
      "Translating subtitles from Spanish into Portuguese",
      "Rewriting dialogue lines in a more formal tone"
    ],
    answer: [0, 2],
    explanation: "Generating illustrations and video from a written prompt requires a model that outputs visual modalities, such as a diffusion-based image or video model. Summarizing, translating, and rewriting are all text-in and text-out tasks that a text-only foundation model handles.",
    rationales: [
      "",
      "Summarization takes text in and returns text out.",
      "",
      "Subtitle translation is a text-to-text task.",
      "Rewriting tone is a text generation task with no visual output."
    ],
    services: [],
    tags: ["image generation", "multimodal models"]
  },
  {
    id: "2.1-037",
    domain: 2,
    task: "2.1",
    type: "single",
    difficulty: "hard",
    stem: "An analytics team is estimating cost and feasibility for a document question-answering feature. Which statement about tokens is accurate?",
    options: [
      "One token always equals exactly one word in every language",
      "Only the prompt consumes tokens; generated output is free of token limits",
      "Tokens apply to image models only, not to language models",
      "Both the prompt and the completion consume tokens, and they share the model's context window"
    ],
    answer: [3],
    explanation: "Token usage covers input and output together, and the sum of prompt tokens and completion tokens must fit within the model's context window. Tokens are subword units, so counts vary by language and by wording rather than mapping one to one with words.",
    rationales: [
      "Tokens are subword units, so token counts and word counts differ, especially across languages.",
      "Generated output tokens are counted and limited as well.",
      "Token accounting is central to language models.",
      ""
    ],
    services: [],
    tags: ["tokens", "context window"]
  },
  {
    id: "2.1-038",
    domain: 2,
    task: "2.1",
    type: "multi",
    difficulty: "medium",
    stem: "A supply chain company is documenting the stages of the foundation model lifecycle for its governance board. Which two statements about the lifecycle are accurate? (Select TWO.)",
    options: [
      "Pre-training uses very large volumes of mostly unlabeled data to build general capability",
      "Fine-tuning adapts a pre-trained model to a narrower task using a smaller curated dataset",
      "Evaluation happens only after several years of production use",
      "Deployment ends the lifecycle, and user feedback has no role afterward",
      "Data selection is unnecessary because foundation models filter all training data automatically"
    ],
    answer: [0, 1],
    explanation: "Pre-training builds broad capability from huge, largely unlabeled corpora, and fine-tuning then adapts that model to a specific task with a much smaller curated dataset. Evaluation happens before and after deployment, and feedback gathered in production feeds the next iteration of the lifecycle.",
    rationales: [
      "",
      "",
      "Evaluation occurs before release and continues on an ongoing basis after deployment.",
      "Post-deployment monitoring and user feedback drive continuous improvement.",
      "Careful data selection and curation is a deliberate early lifecycle stage."
    ],
    services: [],
    tags: ["fm lifecycle", "fine-tuning"]
  },
  {
    id: "2.1-039",
    domain: 2,
    task: "2.1",
    type: "multi",
    difficulty: "medium",
    stem: "An insurance company is designing a knowledge assistant over its claims handbooks and must choose a vector store. Which two capabilities should the team expect from a vector database in this architecture? (Select TWO.)",
    options: [
      "Storing high-dimensional embeddings together with metadata for filtering",
      "Automatically fine-tuning the foundation model on retrieved passages",
      "Running approximate nearest-neighbor search to find semantically similar chunks",
      "Guaranteeing that generated answers contain no factual errors",
      "Replacing the need for an embedding model"
    ],
    answer: [0, 2],
    explanation: "A vector database stores embeddings with associated metadata and performs nearest-neighbor search so the application can retrieve the most semantically similar chunks for a query. It does not train models, generate embeddings, or validate the factual accuracy of the model's final answer.",
    rationales: [
      "",
      "Vector stores retrieve data; they do not train or fine-tune models.",
      "",
      "Retrieval improves grounding but cannot guarantee error-free generation.",
      "An embedding model is still required to convert text into vectors before storage."
    ],
    services: [],
    tags: ["vector databases", "rag"]
  },
  {
    id: "2.1-040",
    domain: 2,
    task: "2.1",
    type: "multi",
    difficulty: "hard",
    stem: "A hospital network wants to reduce hallucinated answers in a clinical documentation assistant while keeping operational effort low. Which two approaches directly address this goal? (Select TWO.)",
    options: [
      "Ground responses in retrieved passages from approved internal sources",
      "Raise the temperature parameter to broaden the model's word choices",
      "Increase the max tokens limit so answers can be longer",
      "Instruct the model to answer only from the provided context and to say when information is missing",
      "Switch from a multimodal model to an image generation model"
    ],
    answer: [0, 3],
    explanation: "Grounding with retrieval supplies verified source text the model can rely on instead of inventing details, and prompt instructions that restrict the model to the provided context and allow it to decline reduce fabricated claims. Higher temperature increases randomness, and longer responses or a different modality do nothing for factual grounding.",
    rationales: [
      "",
      "Higher temperature increases randomness, which tends to increase hallucination.",
      "A longer response limit gives more room for unsupported content, not less.",
      "",
      "Changing to an image generation model does not fit a text documentation task."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["hallucination", "rag", "prompt engineering"]
  }
);
