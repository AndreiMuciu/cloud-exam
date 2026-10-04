window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "3.1-001",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "easy",
    stem: "A media company maintains an internal HR policy library that is updated every week. The company wants an assistant built on Amazon Bedrock to answer employee questions using the latest policy text, with the least ongoing operational overhead. Which approach meets these requirements?",
    options: [
      "Fine-tune a foundation model on the policy documents and rerun the fine-tuning job every week",
      "Use Amazon Bedrock Knowledge Bases to retrieve relevant policy passages at query time",
      "Run continued pre-training on the policy corpus each month",
      "Train a new foundation model from scratch on the company corpus"
    ],
    answer: [1],
    explanation: "Retrieval Augmented Generation leaves the model weights unchanged and injects freshly retrieved passages into the prompt, so keeping answers current is just a matter of re-syncing the knowledge base data source. Fine-tuning and continued pre-training bake knowledge into weights, so the information goes stale between training runs and each run costs time and money.",
    rationales: [
      "Weekly fine-tuning jobs add recurring cost and effort, and the model still goes stale between runs.",
      "",
      "Continued pre-training needs large volumes of data and compute and is not a mechanism for keeping facts current.",
      "Training from scratch requires enormous data, compute, and expertise that this use case does not justify."
    ],
    services: ["Amazon Bedrock", "Amazon Bedrock Knowledge Bases"],
    tags: ["rag", "customization cost"]
  },
  {
    id: "3.1-002",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "easy",
    stem: "A finance company uses a foundation model to generate regulatory report summaries and needs the output for a given prompt to be as repeatable and predictable as possible. Which inference parameter change best supports this requirement?",
    options: [
      "Increase the temperature value",
      "Increase the maximum output token limit",
      "Set the temperature to a value near 0",
      "Add several stop sequences to the request"
    ],
    answer: [2],
    explanation: "Temperature controls how much randomness is applied when sampling the next token. A value near 0 makes the model strongly favor the highest-probability tokens, producing more deterministic and consistent output, which suits compliance and reporting text. Higher temperature increases variety and creativity at the cost of repeatability.",
    rationales: [
      "Raising temperature increases randomness, which is the opposite of the requirement.",
      "The maximum output token limit caps response length; it does not affect randomness.",
      "",
      "Stop sequences control where generation ends, not how deterministic the wording is."
    ],
    services: [],
    tags: ["inference parameters", "temperature"]
  },
  {
    id: "3.1-003",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "easy",
    stem: "A logistics startup wants a foundation model to write shipment status messages in the company's preferred tone and format. The team has a small budget and no ML engineers. Which customization approach should the team try FIRST?",
    options: [
      "Fine-tuning the model on 50,000 labeled message pairs",
      "Continued pre-training on the company's full document archive",
      "Training a foundation model from scratch on shipping data",
      "Prompt engineering that includes instructions and a few example messages"
    ],
    answer: [3],
    explanation: "Customization approaches rise steeply in cost and complexity: prompt engineering, then RAG, then fine-tuning, then continued pre-training, then training from scratch. Prompt engineering needs no training infrastructure or labeled dataset and often solves tone and formatting requirements on its own, so it is the correct starting point.",
    rationales: [
      "Fine-tuning requires a large curated dataset, training cost, and ML skills the team does not have.",
      "Continued pre-training is one of the most expensive options and targets domain knowledge, not message tone.",
      "Training from scratch is the most expensive and complex option available and is not warranted here.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["prompt engineering", "customization cost"]
  },
  {
    id: "3.1-004",
    domain: 3,
    task: "3.1",
    type: "multi",
    difficulty: "medium",
    stem: "A healthcare analytics company is building a Retrieval Augmented Generation application and needs an AWS option that can store embeddings and run similarity search over them. Which options meet this requirement? (Select TWO.)",
    options: [
      "Amazon CloudWatch Logs Insights",
      "Amazon OpenSearch Serverless vector engine",
      "AWS Glue Data Catalog",
      "Amazon Aurora PostgreSQL with the pgvector extension",
      "Amazon S3 Glacier Deep Archive"
    ],
    answer: [1, 3],
    explanation: "A RAG application needs a vector store that indexes embeddings and supports nearest-neighbor search. Amazon OpenSearch Serverless offers a vector engine for this purpose, and Amazon Aurora PostgreSQL supports vector columns and similarity operators through the pgvector extension. Both are supported vector stores for Amazon Bedrock Knowledge Bases.",
    rationales: [
      "CloudWatch Logs Insights queries log data; it has no vector index or similarity search.",
      "",
      "The Glue Data Catalog stores table and schema metadata, not embeddings.",
      "",
      "Glacier Deep Archive is low-cost archival object storage with retrieval delays and no search capability."
    ],
    services: ["Amazon OpenSearch Serverless", "Amazon Aurora PostgreSQL"],
    tags: ["vector database", "embeddings"]
  }
  ,
  {
    id: "3.1-005",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A gaming company wants a customer support assistant that can look up a player's account balance through an internal REST API, issue a refund through a second API, and then summarize what it did. Which Amazon Bedrock capability is designed for this multistep, tool-invoking workflow?",
    options: [
      "Amazon Bedrock Guardrails",
      "Amazon Bedrock Model Evaluation",
      "Amazon Bedrock Agents",
      "Amazon Bedrock Knowledge Bases"
    ],
    answer: [2],
    explanation: "Amazon Bedrock Agents break a user request into steps, decide which configured action group or API to call, pass the results back into the model, and continue until the task is complete. Knowledge Bases only retrieve text for grounding, while Guardrails and Model Evaluation address safety filtering and model comparison respectively.",
    rationales: [
      "Guardrails filter harmful content and block denied topics; they do not orchestrate API calls.",
      "Model Evaluation compares model quality on datasets; it does not run application workflows.",
      "",
      "Knowledge Bases retrieve document passages for grounding but cannot invoke business APIs or take actions."
    ],
    services: ["Amazon Bedrock Agents"],
    tags: ["agents", "tool invocation"]
  },
  {
    id: "3.1-006",
    domain: 3,
    task: "3.1",
    type: "multi",
    difficulty: "medium",
    stem: "A public sector agency must summarize 200-page environmental impact reports in a single model request without splitting the document, and the summary itself must run several pages long. Which two model selection criteria are MOST relevant to this requirement? (Select TWO.)",
    options: [
      "The size of the model's input context window",
      "The number of languages the model supports",
      "The model's maximum output token limit",
      "The model's supported output modalities",
      "Whether the model supports fine-tuning"
    ],
    answer: [0, 2],
    explanation: "The context window determines how much source text a model can accept in one request, so it must be large enough to hold the full 200-page report. The maximum output token limit separately caps how long the generated summary can be, so both figures need to support this workload. Language coverage, output modality, and fine-tuning support do not address fitting or producing long text.",
    rationales: [
      "",
      "Multilingual support matters when handling multiple languages, which is not the stated constraint.",
      "",
      "Output modality matters when generating images or audio; this task produces text.",
      "Fine-tuning support is unrelated to how much text fits in a request or how long a response can be."
    ],
    services: ["Amazon Bedrock"],
    tags: ["model selection", "context window"]
  },
  {
    id: "3.1-007",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A retail company has a chatbot that answers product questions correctly but occasionally invents product specifications that do not exist. The company has an accurate product catalog in Amazon S3. Which approach BEST reduces these fabricated details?",
    options: [
      "Increase the temperature so the model explores more phrasings",
      "Ground responses by retrieving catalog data with Amazon Bedrock Knowledge Bases and instructing the model to answer only from that data",
      "Increase the maximum output token limit so answers can be longer",
      "Switch to a model with a larger number of supported languages"
    ],
    answer: [1],
    explanation: "Hallucination risk drops when the model is given authoritative source text and told to answer only from it. Retrieval from the product catalog grounds each response in enterprise data and lets the application cite sources. Changing sampling settings or output length does not supply the missing facts.",
    rationales: [
      "Higher temperature increases randomness and typically makes fabrication more likely.",
      "",
      "A larger output limit allows longer answers but does nothing to make them factual.",
      "Multilingual capability is unrelated to factual grounding in company data."
    ],
    services: ["Amazon Bedrock Knowledge Bases", "Amazon S3"],
    tags: ["grounding", "hallucination"]
  },
  {
    id: "3.1-008",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "hard",
    stem: "A manufacturing company needs a foundation model to consistently produce output in a specialized inspection report format, and thousands of labeled example reports are available. Prompt engineering with examples has produced inconsistent structure. Which approach is MOST appropriate?",
    options: [
      "Retrieval Augmented Generation over the example reports",
      "Continued pre-training on unlabeled manufacturing manuals",
      "Fine-tuning the model on the labeled example reports",
      "Increasing top-k so the model considers more candidate tokens"
    ],
    answer: [2],
    explanation: "Fine-tuning adjusts model weights using labeled prompt and completion pairs, which is the right tool for teaching a consistent style, structure, or task behavior that prompting cannot reliably enforce. RAG adds facts at query time but does not reshape output format, and continued pre-training targets broad domain knowledge from unlabeled text.",
    rationales: [
      "RAG supplies relevant context for factual grounding; it does not enforce a consistent output structure.",
      "Continued pre-training builds domain vocabulary from unlabeled text rather than teaching a specific output format.",
      "",
      "Raising top-k widens token sampling and increases variability, worsening consistency."
    ],
    services: ["Amazon Bedrock"],
    tags: ["fine-tuning", "customization cost"]
  }
  ,
  {
    id: "3.1-009",
    domain: 3,
    task: "3.1",
    type: "ordering",
    difficulty: "medium",
    stem: "A bank is setting up a Retrieval Augmented Generation workflow on Amazon Bedrock. Place the data ingestion and query steps in the correct order.",
    options: [
      "Convert each chunk into a vector by calling an embedding model",
      "Store the resulting vectors and metadata in a vector index",
      "Split the source documents into chunks",
      "Retrieve the most similar chunks for a user question and pass them to the foundation model in the prompt"
    ],
    answer: [2, 0, 1, 3],
    explanation: "RAG ingestion starts by chunking source documents so each piece fits the embedding model and represents a coherent idea. Each chunk is then embedded into a vector, and the vectors are written to a vector index with metadata. At query time the user question is embedded, the nearest chunks are retrieved, and they are added to the prompt so the model answers from grounded context.",
    rationales: [],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["rag", "embeddings"]
  },
  {
    id: "3.1-010",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "easy",
    stem: "A marketing team wants a foundation model on Amazon Bedrock to generate campaign images from text descriptions. Which model selection criterion determines whether a candidate model can meet this requirement?",
    options: [
      "The model's fine-tuning support",
      "The model's supported input and output modalities",
      "The model's maximum temperature setting",
      "The model's token pricing tier"
    ],
    answer: [1],
    explanation: "Modality describes the types of data a model accepts and produces, such as text, image, audio, or video. Only a model whose output modality includes images can generate images from text prompts, so modality is a hard filter applied before considering cost or customization support.",
    rationales: [
      "Fine-tuning support affects customization options, not whether the model can output images.",
      "",
      "Temperature is a sampling control available on text generation requests, not a capability filter.",
      "Pricing influences the final choice but cannot make a text-only model produce images."
    ],
    services: ["Amazon Bedrock"],
    tags: ["model selection", "modality"]
  },
  {
    id: "3.1-011",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A travel company runs a voice ordering assistant where users expect a spoken reply within about one second. Two Amazon Bedrock models produce acceptable quality, but one is much larger and slower. Which selection decision BEST fits the requirement?",
    options: [
      "Choose the larger model and raise the maximum output token limit",
      "Choose the larger model and increase top-p to speed up sampling",
      "Choose the larger model and add more few-shot examples to the prompt",
      "Choose the smaller, faster model to reduce inference latency"
    ],
    answer: [3],
    explanation: "When quality is comparable, a smaller model generally delivers lower latency and lower cost per request, which matters for interactive real-time experiences. Larger prompts and longer outputs increase response time, and top-p is a sampling control that does not affect generation speed.",
    rationales: [
      "A larger model plus longer outputs increases latency, moving away from the one-second target.",
      "Top-p changes how tokens are sampled and has no effect on inference speed.",
      "Additional few-shot examples enlarge the prompt and add processing time.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["latency", "model selection"]
  },
  {
    id: "3.1-012",
    domain: 3,
    task: "3.1",
    type: "multi",
    difficulty: "medium",
    stem: "An insurance company is deciding between Retrieval Augmented Generation and fine-tuning for a claims assistant. Which situations favor RAG over fine-tuning? (Select TWO.)",
    options: [
      "The underlying policy documents change several times per week",
      "The company needs the model to permanently adopt a new writing style",
      "Responses must cite the specific source document used for each answer",
      "The company wants to shorten prompts to reduce per-request token cost",
      "The company wants the model to learn a new low-resource language"
    ],
    answer: [0, 2],
    explanation: "RAG excels when the knowledge changes frequently and when traceability matters, because content lives in a data store that can be updated independently and retrieved passages can be surfaced as citations. Fine-tuning is the better fit for durable behavior changes such as style or task format, and it can shrink prompts by moving instructions into the weights.",
    rationales: [
      "",
      "Permanent style adoption is a behavior change, which fine-tuning handles better than retrieval.",
      "",
      "Fine-tuning is what reduces prompt length; RAG adds retrieved context and increases token usage.",
      "Teaching a new language requires extensive training such as continued pre-training, not retrieval."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["rag", "fine-tuning"]
  }
  ,
  {
    id: "3.1-013",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A media company converts its article archive into numerical representations so that semantically similar articles cluster together for retrieval. What are these numerical representations called?",
    options: [
      "Tokens",
      "Hyperparameters",
      "Model weights",
      "Embeddings"
    ],
    answer: [3],
    explanation: "An embedding is a dense vector that encodes the meaning of a piece of text, image, or other input, so that items with similar meaning sit close together in vector space. Retrieval systems store embeddings in a vector index and compare them by distance or cosine similarity.",
    rationales: [
      "Tokens are the sub-word units a model reads and generates, not semantic vectors used for similarity search.",
      "Hyperparameters are training configuration values such as learning rate or epochs.",
      "Model weights are the learned parameters inside the model itself, not per-document representations.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["embeddings", "vector database"]
  },
  {
    id: "3.1-014",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "hard",
    stem: "A logistics company sees that its foundation model responses are sometimes cut off in the middle of a sentence. Which change is MOST likely to resolve the issue?",
    options: [
      "Lower the temperature value",
      "Reduce top-k to a smaller number",
      "Increase the maximum number of output tokens allowed in the response",
      "Switch to a model with more supported languages"
    ],
    answer: [2],
    explanation: "Truncation mid-sentence usually means generation hit the configured output token limit. Raising that limit, within the model's supported range, lets the response finish. Temperature and top-k change which tokens are selected, not how many tokens the model is allowed to produce.",
    rationales: [
      "Lower temperature makes wording more predictable but does not extend the allowed response length.",
      "A smaller top-k narrows candidate tokens and does not change the length limit.",
      "",
      "Language coverage is unrelated to response truncation."
    ],
    services: ["Amazon Bedrock"],
    tags: ["inference parameters", "output length"]
  },
  {
    id: "3.1-015",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A global retailer needs one foundation model to handle customer chat in English, Japanese, Portuguese, and Arabic with consistent quality. Which model selection criterion should drive the choice?",
    options: [
      "Vector store compatibility",
      "Multilingual support across the required languages",
      "Support for image input",
      "Availability of a batch inference option"
    ],
    answer: [1],
    explanation: "Foundation models differ substantially in how well they handle languages other than English, so multilingual capability is the criterion that determines whether a single model can serve all four markets. If no single model performs well enough, the alternative is routing per language, but the evaluation criterion is still language coverage.",
    rationales: [
      "Vector store compatibility matters for retrieval architecture, not language quality.",
      "",
      "Image input is irrelevant to a text chat requirement.",
      "Batch inference suits offline bulk jobs, not interactive multilingual chat quality."
    ],
    services: ["Amazon Bedrock"],
    tags: ["model selection", "multilingual"]
  },
  {
    id: "3.1-016",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "easy",
    stem: "A company must rank four customization approaches from lowest to highest cost and complexity before choosing one. Which ordering is correct?",
    options: [
      "Fine-tuning, prompt engineering, RAG, continued pre-training",
      "RAG, prompt engineering, continued pre-training, fine-tuning",
      "Prompt engineering, RAG, fine-tuning, continued pre-training",
      "Continued pre-training, fine-tuning, RAG, prompt engineering"
    ],
    answer: [2],
    explanation: "Cost and complexity increase in this order: prompt engineering, which requires only request changes; RAG, which adds a retrieval pipeline and vector store; fine-tuning, which requires labeled data and a training job; and continued pre-training, which requires very large unlabeled corpora and substantial compute. Training a model from scratch sits beyond all four.",
    rationales: [
      "This places fine-tuning below prompt engineering, which reverses the actual cost relationship.",
      "This places RAG below prompt engineering and misorders the two training approaches.",
      "",
      "This lists the approaches from most expensive to least expensive rather than the reverse."
    ],
    services: ["Amazon Bedrock"],
    tags: ["customization cost", "prompt engineering"]
  }
  ,
  {
    id: "3.1-017",
    domain: 3,
    task: "3.1",
    type: "multi",
    difficulty: "medium",
    stem: "A hospital network wants to generate 90,000 discharge summary drafts overnight from records already stored in Amazon S3, with no interactive latency requirement and minimal cost. Which two statements about Amazon Bedrock batch inference are accurate? (Select TWO.)",
    options: [
      "Batch inference processes large sets of prompts asynchronously and is priced lower than on-demand per-request inference",
      "Batch inference reads input records from Amazon S3 and writes results back to Amazon S3",
      "Batch inference reserves dedicated model capacity that continues after the job completes",
      "An application must run a batch job before it is allowed to call a model on demand",
      "Batch inference supports sub-second response times suitable for live chat"
    ],
    answer: [0, 1],
    explanation: "Batch inference submits large sets of prompts, reading inputs from and writing outputs to Amazon S3, and is billed at a lower rate than on-demand per-request calls because it runs asynchronously with no latency guarantee. This fits an overnight, non-interactive workload where minimizing cost matters more than response time.",
    rationales: [
      "",
      "",
      "Reserved capacity that persists is a feature of Provisioned Throughput, not batch inference.",
      "Batch inference and on-demand inference are independent options; neither is a prerequisite for the other.",
      "Batch jobs complete over minutes to hours and cannot serve live, interactive chat traffic."
    ],
    services: ["Amazon Bedrock", "Amazon S3"],
    tags: ["cost optimization", "throughput"]
  },
  {
    id: "3.1-018",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "hard",
    stem: "A gaming company wants a foundation model to write varied item descriptions but must avoid rare, off-topic word choices. The team wants the model to sample only from the smallest set of most probable tokens whose cumulative probability reaches a threshold. Which inference parameter provides this behavior?",
    options: [
      "Top-p",
      "Top-k",
      "Maximum output tokens",
      "Stop sequences"
    ],
    answer: [0],
    explanation: "Top-p, also called nucleus sampling, keeps the smallest set of candidate tokens whose probabilities sum to the configured threshold, so the candidate pool shrinks when the model is confident and widens when it is not. Top-k instead keeps a fixed count of candidates regardless of how the probabilities are distributed.",
    rationales: [
      "",
      "Top-k caps the candidate list at a fixed number of tokens rather than a cumulative probability mass.",
      "Maximum output tokens limits response length, not token selection.",
      "Stop sequences end generation at specified strings and do not influence candidate selection."
    ],
    services: ["Amazon Bedrock"],
    tags: ["inference parameters", "top-p"]
  },
  {
    id: "3.1-019",
    domain: 3,
    task: "3.1",
    type: "multi",
    difficulty: "medium",
    stem: "A public utility is designing a RAG assistant over 4 million maintenance records and expects thousands of concurrent employee queries at peak. Which two considerations are MOST important when selecting the vector store? (Select TWO.)",
    options: [
      "Support for image generation",
      "Query latency and scalability of the vector index at the required scale",
      "The number of stop sequences the store can hold",
      "The ability to index and search millions of embeddings without a redesign",
      "Whether the store can fine-tune the embedding model automatically"
    ],
    answer: [1, 3],
    explanation: "In a RAG application, every user query triggers a similarity search before the model is called, so the vector store contributes directly to end-to-end latency and must scale to the document volume and query concurrency the utility expects, both now and as records grow. Image generation, stop sequences, and automatic embedding fine-tuning are unrelated to how a vector store performs retrieval.",
    rationales: [
      "Image generation is unrelated to a vector store's role in retrieval.",
      "",
      "Stop sequences are inference request settings, not a vector store feature.",
      "",
      "Vector stores index embeddings; they do not train or fine-tune embedding models."
    ],
    services: ["Amazon OpenSearch Serverless", "Amazon Bedrock Knowledge Bases"],
    tags: ["vector database", "latency"]
  },
  {
    id: "3.1-020",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "easy",
    stem: "A university wants an internal assistant that answers student questions using its own course catalog rather than general internet knowledge. Which capability best describes what the university needs?",
    options: [
      "Grounding model responses in enterprise data",
      "Reducing the model's parameter count",
      "Increasing the model's temperature",
      "Converting the model to a smaller quantized format"
    ],
    answer: [0],
    explanation: "Grounding means supplying the model with authoritative organizational content at inference time so answers reflect that data instead of the model's general pre-training knowledge. This is exactly what a retrieval-based design over the course catalog provides.",
    rationales: [
      "",
      "Reducing parameters affects speed and cost, not which data the answers come from.",
      "Higher temperature adds randomness and does not introduce institutional data.",
      "Quantization optimizes inference efficiency and has no effect on data grounding."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["grounding", "rag"]
  }
  ,
  {
    id: "3.1-021",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "An airline wants an assistant that can check seat availability, rebook a passenger, and email a confirmation in response to one natural language request. The team wants to minimize custom orchestration code. Which design should the team choose?",
    options: [
      "A single large prompt that describes all three tasks and asks the model to output the final email text",
      "A fine-tuned model trained on past rebooking transcripts",
      "An Amazon Bedrock knowledge base built from the airline's fare rules",
      "An Amazon Bedrock agent with action groups mapped to the booking and notification APIs"
    ],
    answer: [3],
    explanation: "Agents provide the reasoning loop and action invocation that multistep tasks require: the agent plans the steps, calls each configured API, and uses the returned data to continue. A prompt alone cannot change system state, fine-tuning only alters generated text, and a knowledge base only supplies reference passages.",
    rationales: [
      "A prompt can draft text but cannot query availability or perform a booking action.",
      "Fine-tuning improves how the model writes about rebooking; it cannot execute the rebooking.",
      "A knowledge base retrieves fare rule text and cannot invoke booking or email APIs.",
      ""
    ],
    services: ["Amazon Bedrock Agents"],
    tags: ["agents", "tool invocation"]
  },
  {
    id: "3.1-022",
    domain: 3,
    task: "3.1",
    type: "multi",
    difficulty: "medium",
    stem: "A financial services firm is reviewing its Amazon Bedrock spend for a text summarization feature. Which actions will reduce inference cost? (Select TWO.)",
    options: [
      "Trim redundant boilerplate from prompts to lower input token counts",
      "Raise the maximum output token limit for every request",
      "Select a smaller model that still meets the quality bar for summarization",
      "Increase temperature to shorten responses",
      "Add five more few-shot examples to every prompt"
    ],
    answer: [0, 2],
    explanation: "Amazon Bedrock on-demand pricing is driven by input and output tokens and by the model chosen, so cutting unnecessary prompt content and using the smallest model that meets quality requirements both lower cost directly. Larger output limits and extra examples increase token counts, and temperature has no bearing on price.",
    rationales: [
      "",
      "Allowing longer outputs tends to increase output tokens and therefore cost.",
      "",
      "Temperature affects randomness, not response length or price.",
      "More few-shot examples add input tokens to every request, raising cost."
    ],
    services: ["Amazon Bedrock"],
    tags: ["cost optimization", "model selection"]
  },
  {
    id: "3.1-023",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "hard",
    stem: "A pharmaceutical research group needs a foundation model that understands highly specialized biochemistry vocabulary that appears rarely in general web text. The group has millions of unlabeled internal research documents but no labeled prompt and completion pairs. Which customization approach fits BEST?",
    options: [
      "Few-shot prompting with three example answers",
      "Continued pre-training on the unlabeled research corpus",
      "Supervised fine-tuning on the unlabeled documents",
      "Training a foundation model from scratch"
    ],
    answer: [1],
    explanation: "Continued pre-training extends a base model's knowledge using large volumes of unlabeled domain text, which is what this group has. Supervised fine-tuning requires labeled input and output pairs, and training from scratch would cost far more than adapting an existing model.",
    rationales: [
      "A few examples cannot teach deep domain vocabulary the base model has barely seen.",
      "",
      "Supervised fine-tuning requires labeled prompt and completion pairs, which the group does not have.",
      "Training from scratch demands vastly more data, compute, and expertise than adapting an existing model."
    ],
    services: ["Amazon Bedrock"],
    tags: ["continued pre-training", "customization cost"]
  },
  {
    id: "3.1-024",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A news organization built a RAG assistant, but reviewers report that answers frequently miss details that clearly exist in the source articles. The retrieval step returns passages that end mid-topic. Which change should the team evaluate FIRST?",
    options: [
      "Lower the temperature to zero",
      "Switch the response to a different output language",
      "Adjust the document chunking strategy, including chunk size and overlap",
      "Reduce the maximum output token limit"
    ],
    answer: [2],
    explanation: "In RAG, chunking determines what a single retrievable unit contains. Chunks that are too small or that split across a topic boundary cause incomplete context to reach the model. Tuning chunk size and adding overlap keeps related sentences together and usually improves answer completeness before any model change is needed.",
    rationales: [
      "Temperature affects wording variability, not what content retrieval returns.",
      "Output language has no effect on retrieval quality.",
      "",
      "A smaller output limit would truncate answers further rather than restore missing detail."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["rag", "chunking"]
  }
  ,
  {
    id: "3.1-025",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "easy",
    stem: "A retail analytics team needs guaranteed inference capacity and consistent throughput for a customer-facing assistant that receives steady high traffic all day. Which Amazon Bedrock option addresses this requirement?",
    options: [
      "Batch inference jobs scheduled hourly",
      "Amazon Bedrock Model Evaluation",
      "Amazon Bedrock Guardrails",
      "Provisioned Throughput for the selected model"
    ],
    answer: [3],
    explanation: "Provisioned Throughput reserves model capacity measured in model units, giving predictable throughput and consistent performance for sustained production traffic. Batch inference is asynchronous and unsuitable for live chat, while Model Evaluation and Guardrails address quality comparison and content safety.",
    rationales: [
      "Batch jobs run asynchronously and cannot serve interactive requests.",
      "Model Evaluation measures response quality; it does not reserve capacity.",
      "Guardrails filter content; they have no role in capacity planning.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["throughput", "cost optimization"]
  },
  {
    id: "3.1-026",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A telecommunications company wants to compare three Amazon Bedrock foundation models on its own summarization prompts before selecting one for production. Which capability supports this comparison with the least custom tooling?",
    options: [
      "Amazon Bedrock Model Evaluation",
      "SageMaker Feature Store",
      "Amazon Bedrock Flows",
      "SageMaker Ground Truth"
    ],
    answer: [0],
    explanation: "Amazon Bedrock Model Evaluation runs automatic or human evaluation jobs against selected models using built-in or custom prompt datasets and reports comparable metrics, which is exactly what model selection requires. The other services address feature management, workflow orchestration, and data labeling.",
    rationales: [
      "",
      "Feature Store stores and serves ML features for training and inference, not model comparisons.",
      "Flows chains prompts and components into a workflow; it does not score model quality.",
      "Ground Truth manages data labeling workforces, not model evaluation."
    ],
    services: ["Amazon Bedrock Model Evaluation"],
    tags: ["model selection", "evaluation"]
  },
  {
    id: "3.1-027",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A construction firm must keep its assistant's answers current with contract amendments that arrive daily, and auditors require the exact source paragraph for each answer. Which design meets both requirements?",
    options: [
      "Fine-tune a model nightly on the amended contracts",
      "Use a knowledge base with citations returned alongside each generated answer",
      "Increase the context window and paste all contracts into every prompt",
      "Use continued pre-training weekly on the contract archive"
    ],
    answer: [1],
    explanation: "A retrieval design keeps content in a data source that syncs on a schedule and returns the retrieved passages, which can be surfaced as citations for audit. Training approaches cannot attribute an answer to a specific source paragraph, and pasting the entire archive into every prompt is costly and hits context limits.",
    rationales: [
      "Nightly fine-tuning is expensive and provides no source attribution for auditors.",
      "",
      "Sending the full archive on every request wastes tokens and will exceed practical context limits.",
      "Weekly continued pre-training leaves answers stale and cannot cite specific paragraphs."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["rag", "grounding"]
  },
  {
    id: "3.1-028",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "hard",
    stem: "A logistics platform reports that end-to-end response time for its RAG assistant has grown to eight seconds. Investigation shows the retrieval step is fast, but the prompt now includes 20 retrieved passages and requests very long answers. Which change is MOST likely to reduce latency?",
    options: [
      "Return fewer, higher-relevance passages and cap the output length",
      "Move the vector index to a larger instance family",
      "Raise the temperature to speed up token selection",
      "Increase the number of retrieved passages to improve recall"
    ],
    answer: [0],
    explanation: "Inference latency scales with the number of tokens processed in the prompt and generated in the response. Since retrieval is already fast, trimming the retrieved context to the most relevant passages and limiting output length directly cuts token processing time. Sampling settings do not change generation speed.",
    rationales: [
      "",
      "Scaling the vector store will not help because retrieval is not the bottleneck.",
      "Temperature affects randomness only and has no impact on speed.",
      "More passages add input tokens and increase latency further."
    ],
    services: ["Amazon Bedrock"],
    tags: ["latency", "rag"]
  }
  ,
  {
    id: "3.1-029",
    domain: 3,
    task: "3.1",
    type: "ordering",
    difficulty: "medium",
    stem: "A retailer is customizing a foundation model with supervised fine-tuning on Amazon Bedrock. Place the workflow steps in the correct order.",
    options: [
      "Evaluate the customized model against the base model on held-out prompts",
      "Prepare and validate a labeled training dataset of prompt and completion pairs in Amazon S3",
      "Purchase Provisioned Throughput and deploy the customized model for inference",
      "Run the fine-tuning job and select hyperparameters such as epochs and learning rate"
    ],
    answer: [1, 3, 0, 2],
    explanation: "Fine-tuning begins with dataset preparation, because output quality depends on clean labeled examples in the required format. The training job is then configured and run, the resulting custom model is evaluated against the base model to confirm improvement, and only then is throughput provisioned so the custom model can serve traffic.",
    rationales: [],
    services: ["Amazon Bedrock", "Amazon S3"],
    tags: ["fine-tuning", "customization cost"]
  },
  {
    id: "3.1-030",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "easy",
    stem: "A bank plans to build an internal assistant that answers employee questions from documents stored in Amazon S3 and SharePoint, with built-in connectors and access controls, and minimal development work. Which service should the bank use?",
    options: [
      "Amazon Q Business",
      "Amazon SageMaker AI training jobs",
      "Amazon Polly",
      "Amazon Textract"
    ],
    answer: [0],
    explanation: "Amazon Q Business is a managed generative AI assistant that connects to enterprise data sources, respects existing user permissions, and answers questions with citations, so it requires far less engineering than assembling a custom retrieval application. SageMaker AI would mean building and operating the solution yourself.",
    rationales: [
      "",
      "SageMaker AI training jobs are for building and training models, not delivering a ready assistant.",
      "Polly converts text to lifelike speech and does not answer questions over documents.",
      "Textract extracts text and structure from documents but does not provide conversational answers."
    ],
    services: ["Amazon Q Business"],
    tags: ["grounding", "managed services"]
  },
  {
    id: "3.1-031",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A company must choose between a 7-billion-parameter model and a much larger model for classifying support tickets into 12 categories. Accuracy tests show both meet the target. Which consideration MOST supports choosing the smaller model?",
    options: [
      "The smaller model supports more input modalities",
      "The smaller model generally offers lower cost per token and faster responses",
      "The smaller model always produces more factual answers",
      "The smaller model removes the need for prompt engineering"
    ],
    answer: [1],
    explanation: "Model size correlates with inference cost and latency, so when a smaller model already meets the accuracy bar, it is the better economic and performance choice. Size does not by itself determine modality support, factual accuracy, or the need for good prompts.",
    rationales: [
      "Modality support depends on the specific model, not on having fewer parameters.",
      "",
      "Smaller models are not inherently more factual; larger models often perform better on complex reasoning.",
      "Prompt engineering remains necessary regardless of model size."
    ],
    services: ["Amazon Bedrock"],
    tags: ["model selection", "cost optimization"]
  },
  {
    id: "3.1-032",
    domain: 3,
    task: "3.1",
    type: "multi",
    difficulty: "hard",
    stem: "A manufacturer is designing an Amazon Bedrock agent that troubleshoots equipment faults across several backend systems. Which statements about agents are accurate? (Select TWO.)",
    options: [
      "An agent can break a request into multiple steps and decide which action to invoke at each step",
      "An agent replaces the need for a foundation model in the application",
      "An agent can combine API actions with retrieval from a knowledge base in the same session",
      "An agent guarantees that generated responses contain no factual errors",
      "An agent must be fine-tuned before it can call any API"
    ],
    answer: [0, 2],
    explanation: "Amazon Bedrock Agents use a foundation model to plan a sequence of steps, invoke action groups backed by APIs or AWS Lambda functions, and can also query an associated knowledge base for grounding within the same conversation. Agents rely on a model rather than replacing it, provide no factual guarantee, and require no fine-tuning to call actions.",
    rationales: [
      "",
      "Agents orchestrate a foundation model; the model is still what generates the reasoning and text.",
      "",
      "No agent configuration eliminates the possibility of factual errors in generated text.",
      "Action invocation is configured through action groups and schemas, not through fine-tuning."
    ],
    services: ["Amazon Bedrock Agents", "Amazon Bedrock Knowledge Bases"],
    tags: ["agents", "rag"]
  }
  ,
  {
    id: "3.1-033",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A streaming service wants to store embeddings for a RAG feature inside a relational database it already operates, avoiding a new data platform. Which AWS option meets this requirement?",
    options: [
      "Amazon DynamoDB with a global secondary index",
      "Amazon Aurora PostgreSQL with pgvector",
      "Amazon Redshift Spectrum external tables",
      "Amazon Neptune property graphs"
    ],
    answer: [1],
    explanation: "Amazon Aurora PostgreSQL supports the pgvector extension, which adds a vector data type and similarity search operators to a relational database the team already runs. DynamoDB indexes are key based, Redshift Spectrum queries external analytics data, and Neptune stores graph relationships.",
    rationales: [
      "DynamoDB secondary indexes support key-based lookups, not vector similarity search.",
      "",
      "Redshift Spectrum queries data lake tables for analytics and is not a vector index for RAG retrieval.",
      "Neptune models graph relationships rather than dense vector similarity."
    ],
    services: ["Amazon Aurora PostgreSQL"],
    tags: ["vector database", "embeddings"]
  },
  {
    id: "3.1-034",
    domain: 3,
    task: "3.1",
    type: "multi",
    difficulty: "medium",
    stem: "A retailer's legal team requires that any third-party foundation model's license permit the intended commercial use of generated outputs, and its infrastructure team wants the flexibility to run the model through a fully managed API today with the option to self-host later if costs change. Which two model selection criteria are MOST relevant to these requirements? (Select TWO.)",
    options: [
      "Whether the model's license terms permit the intended commercial use of its outputs",
      "The model's default maximum tokens per minute quota",
      "Whether the model is available through both a managed API and self-managed deployment options",
      "The number of stop sequences the model supports per request",
      "Whether the model was first released before or after a specific calendar year"
    ],
    answer: [0, 2],
    explanation: "License terms determine whether the retailer is legally permitted to use the model's outputs commercially, and deployment flexibility determines whether the model can move from a managed API to self-managed infrastructure without switching model families. Default throughput quotas can usually be raised through support requests, stop sequence limits are a minor inference detail, and a model's release date does not by itself reveal licensing or deployment options.",
    rationales: [
      "",
      "Default quota limits can typically be raised through support requests and do not address licensing or deployment flexibility.",
      "",
      "Stop sequence support is a minor inference feature unrelated to licensing or where the model can run.",
      "Release date alone does not indicate licensing terms or which deployment options exist."
    ],
    services: ["Amazon Bedrock", "Amazon SageMaker AI"],
    tags: ["model selection", "licensing"]
  }
  ,
  {
    id: "3.1-035",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "hard",
    stem: "A mortgage lender fine-tuned a model on 6,000 historical underwriting notes. The custom model performs well on wording style but still cites outdated interest rate tables. Which additional design change addresses the outdated figures?",
    options: [
      "Increase the number of fine-tuning epochs",
      "Add a retrieval step that supplies the current rate tables in the prompt",
      "Lower the temperature to zero for all requests",
      "Raise top-k so more candidate tokens are considered"
    ],
    answer: [1],
    explanation: "Fine-tuning teaches style and task behavior but freezes whatever facts were in the training data. Volatile reference data belongs in a retrieval layer so each request receives the current values. Fine-tuning and RAG are complementary, and sampling parameters cannot correct stale facts.",
    rationales: [
      "More epochs reinforce the same outdated training data and risk overfitting.",
      "",
      "A temperature of zero makes the model repeat the stale figures more consistently.",
      "Top-k changes token sampling and has no effect on factual currency."
    ],
    services: ["Amazon Bedrock", "Amazon Bedrock Knowledge Bases"],
    tags: ["rag", "fine-tuning"]
  },
  {
    id: "3.1-036",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A gaming company wants to chain several prompts and conditional steps into a repeatable generative AI workflow on Amazon Bedrock using a visual builder. Which capability should the company use?",
    options: [
      "Amazon Bedrock Flows",
      "SageMaker Model Monitor",
      "Amazon Bedrock Guardrails",
      "SageMaker Canvas"
    ],
    answer: [0],
    explanation: "Amazon Bedrock Flows lets teams visually link prompts, knowledge bases, agents, and logic into an end-to-end generative AI workflow that can be versioned and deployed. Model Monitor watches deployed model data quality, Guardrails apply safety policies, and Canvas is a no-code ML modeling workspace.",
    rationales: [
      "",
      "Model Monitor detects drift and data quality issues on SageMaker endpoints.",
      "Guardrails enforce content policies rather than orchestrate workflow steps.",
      "Canvas builds ML models without code; it does not chain generative AI prompt steps."
    ],
    services: ["Amazon Bedrock Flows"],
    tags: ["workflow orchestration", "agents"]
  },
  {
    id: "3.1-037",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "A nonprofit needs to keep total tokens per request within a model's limit. The prompt template, retrieved context, conversation history, and generated answer all compete for space. Which statement correctly describes this constraint?",
    options: [
      "Only the generated answer counts toward the model's token limit",
      "The context window covers input tokens and output tokens together, so all parts share the same budget",
      "Retrieved context is excluded from token counting when using a knowledge base",
      "Conversation history is stored outside the model and never consumes tokens"
    ],
    answer: [1],
    explanation: "A model's context window is a shared budget spanning the prompt, any retrieved passages, prior turns that are resent, and the tokens the model generates. Designing an application means allocating that budget deliberately, for example by trimming history or limiting retrieved passages to leave room for the answer.",
    rationales: [
      "Input tokens count as well; prompts consume much of the window in RAG applications.",
      "",
      "Retrieved passages are inserted into the prompt and are counted like any other input tokens.",
      "History that is resent with each request consumes input tokens every time."
    ],
    services: ["Amazon Bedrock"],
    tags: ["context window", "input length"]
  },
  {
    id: "3.1-038",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "easy",
    stem: "A retail company plans to explore, evaluate, and deploy open and proprietary foundation models, including fine-tuning them on its own infrastructure with full control over training scripts. Which service best fits this requirement?",
    options: [
      "Amazon SageMaker AI with SageMaker JumpStart",
      "Amazon Q Developer",
      "Amazon Transcribe",
      "Amazon Bedrock Guardrails"
    ],
    answer: [0],
    explanation: "Amazon SageMaker AI, including the JumpStart model hub, is the option that gives full control over model training, tuning scripts, and infrastructure choices. Amazon Bedrock is the serverless API-first path when that level of control is not needed; Q Developer and Transcribe serve different purposes entirely.",
    rationales: [
      "",
      "Amazon Q Developer assists with coding tasks; it is not a model training platform.",
      "Transcribe converts speech to text and cannot host or fine-tune foundation models.",
      "Guardrails apply content safety policies and are not a model development environment."
    ],
    services: ["Amazon SageMaker AI", "SageMaker JumpStart"],
    tags: ["model selection", "managed services"]
  }
  ,
  {
    id: "3.1-039",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "medium",
    stem: "An energy company built a knowledge base over safety bulletins, but employees searching for the phrase \"lockout tagout\" get poor results while semantically similar questions work well. Which design change is MOST likely to improve results for exact terminology?",
    options: [
      "Use a hybrid search that combines vector similarity with keyword matching",
      "Increase the model's maximum output tokens",
      "Switch the foundation model to a larger variant",
      "Reduce the temperature to zero"
    ],
    answer: [0],
    explanation: "Pure vector search matches meaning and can miss exact terms, codes, or acronyms. Hybrid search runs keyword and semantic retrieval together and merges the results, which restores precision on specific terminology while keeping semantic recall. Changing the generation model or its parameters does not affect what retrieval finds.",
    rationales: [
      "",
      "Output length does not influence which documents retrieval returns.",
      "A larger generation model cannot compensate for retrieval that returns the wrong passages.",
      "Temperature affects wording only, not retrieval precision."
    ],
    services: ["Amazon Bedrock Knowledge Bases", "Amazon OpenSearch Serverless"],
    tags: ["rag", "vector database"]
  },
  {
    id: "3.1-040",
    domain: 3,
    task: "3.1",
    type: "single",
    difficulty: "hard",
    stem: "A payments company wants to cut inference cost for a high-volume classification workload while keeping quality close to that of a large model. The team wants a smaller model that learns to imitate the larger model's outputs. Which approach describes this?",
    options: [
      "Continued pre-training",
      "Retrieval Augmented Generation",
      "Model distillation",
      "Zero-shot prompting"
    ],
    answer: [2],
    explanation: "Model distillation trains a smaller student model on responses produced by a larger teacher model, producing a model that is cheaper and faster to run while retaining much of the teacher's task quality. Amazon Bedrock supports distillation for eligible models as a cost and latency optimization path.",
    rationales: [
      "Continued pre-training expands domain knowledge using large unlabeled corpora and does not shrink the model.",
      "RAG adds retrieved context at inference time and increases token usage rather than reducing model size.",
      "",
      "Zero-shot prompting is a prompting technique, not a way to create a smaller model."
    ],
    services: ["Amazon Bedrock"],
    tags: ["cost optimization", "customization cost"]
  }
);
