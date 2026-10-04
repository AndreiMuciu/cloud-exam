window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "2.3-001",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "easy",
    stem: "A logistics startup wants to call several foundation models from different providers through a single API to build a shipment-summarization feature. The team has no ML engineers and does not want to provision or patch any servers. Which AWS service meets these requirements?",
    options: [
      "Amazon SageMaker AI real-time endpoints",
      "Amazon EC2 instances with the AWS Deep Learning AMI",
      "Amazon Bedrock",
      "Amazon Elastic Kubernetes Service (Amazon EKS) with self-hosted models"
    ],
    answer: [2],
    explanation: "Amazon Bedrock is a fully managed, serverless service that exposes foundation models from Amazon and several third-party providers through a common set of APIs. There is no infrastructure to provision, scale, or patch, and billing is based on tokens processed. That makes it the lowest-overhead choice for a team without ML specialists.",
    rationales: [
      "SageMaker AI endpoints require you to choose instance types, manage scaling, and operate the endpoint.",
      "Self-managed EC2 hosting means you own model weights, drivers, scaling, and patching.",
      "",
      "Running models on EKS adds cluster and container operations that this team cannot support."
    ],
    services: ["Amazon Bedrock"],
    tags: ["bedrock", "serverless", "foundation models"]
  },
  {
    id: "2.3-002",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "easy",
    stem: "A media company wants a product manager to type a few sample prompts into a console and visually compare the responses of three different foundation models before any code is written. Which Amazon Bedrock capability should the company use?",
    options: [
      "Amazon Bedrock playgrounds",
      "Amazon Bedrock Provisioned Throughput",
      "Amazon Bedrock Custom Model Import",
      "Amazon Bedrock Agents"
    ],
    answer: [0],
    explanation: "Bedrock playgrounds are console environments for chat, text, and image models where a user can enter prompts, adjust inference parameters, and inspect responses without writing code. They are designed for quick, hands-on model exploration. Formal side-by-side scoring with metrics is handled later by Amazon Bedrock Model Evaluation.",
    rationales: [
      "",
      "Provisioned Throughput buys committed model capacity; it does not provide an interactive console for prompt testing.",
      "Custom Model Import brings externally trained model weights into Bedrock, which is unrelated to console experimentation.",
      "Agents orchestrate multi-step tasks against APIs and data sources rather than offering a prompt sandbox."
    ],
    services: ["Amazon Bedrock"],
    tags: ["bedrock", "playgrounds", "model selection"]
  },
  {
    id: "2.3-003",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A gaming company is building a multi-turn in-game assistant on Amazon Bedrock. Developers want one consistent request format for conversation history, system instructions, and tool use so they can swap between Anthropic Claude and Amazon Nova models without rewriting the request payload. Which approach meets this requirement?",
    options: [
      "Call InvokeModel and build each provider's native JSON body in the application",
      "Use the Amazon Bedrock Converse API",
      "Use Amazon Bedrock Batch inference for every conversation turn",
      "Deploy each model behind its own Amazon API Gateway resource and translate payloads in AWS Lambda"
    ],
    answer: [1],
    explanation: "The Converse API provides a unified, model-agnostic interface for conversational inference on Bedrock, with standard fields for messages, system prompts, inference configuration, and tool use. Because the shape is the same across supported models, switching models is usually a change to the model ID. ConverseStream provides the same interface for streaming responses.",
    rationales: [
      "InvokeModel requires provider-specific request and response bodies, which is exactly the coupling the team wants to avoid.",
      "",
      "Batch inference is asynchronous and intended for large offline jobs, not interactive dialogue.",
      "Custom translation layers add code and operational burden that the Converse API already removes."
    ],
    services: ["Amazon Bedrock"],
    tags: ["converse api", "bedrock", "multi-turn"]
  },
  {
    id: "2.3-004",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "hard",
    stem: "A developer uses the Amazon Bedrock InvokeModel operation and switches the model ID from one provider's text model to another provider's text model. The application now fails to parse the response. What is the MOST likely cause?",
    options: [
      "InvokeModel supports only a single foundation model per AWS account",
      "The application must purchase Provisioned Throughput before any model can be invoked",
      "InvokeModel cannot return text output and requires Amazon Bedrock Flows",
      "InvokeModel passes a provider-specific request and response body, so the JSON structure differs between models"
    ],
    answer: [3],
    explanation: "With InvokeModel the body is the model provider's native payload, so field names for prompts, token limits, and returned completions vary by model family. Changing the model ID therefore usually requires changing the parsing logic. The Converse API exists precisely to normalize these differences across models.",
    rationales: [
      "Bedrock does not restrict an account to one model; access is granted per model.",
      "On-demand invocation works without Provisioned Throughput, which is a capacity commitment option.",
      "InvokeModel returns text for text models; Flows is a visual workflow builder, not a requirement for inference.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["invokemodel", "bedrock", "apis"]
  },
  {
    id: "2.3-005",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A healthcare analytics company runs a customer-facing summarization API on Amazon Bedrock. Traffic occasionally spikes and the team receives throttling errors. The company wants to improve resiliency and capacity headroom without changing its application code or managing capacity reservations. Which Amazon Bedrock feature should the company use?",
    options: [
      "Provisioned Throughput with a one-year commitment",
      "Batch inference with S3 input manifests",
      "Custom Model Import of an equivalent open-weights model",
      "Cross-Region inference (inference profiles)"
    ],
    answer: [3],
    explanation: "Cross-Region inference uses an inference profile that lets Bedrock route a request to one of several Regions in a geography, drawing on capacity beyond a single Region. The application keeps the same API call and simply targets the inference profile ID, which reduces throttling during bursts. It requires no capacity purchase.",
    rationales: [
      "Provisioned Throughput adds committed capacity but requires a purchase commitment and capacity planning.",
      "Batch inference is asynchronous and unsuitable for a synchronous customer-facing API.",
      "Importing a custom model adds work and does not by itself increase on-demand capacity headroom.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["cross-region inference", "throttling", "bedrock"]
  },
  {
    id: "2.3-006",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A bank must guarantee a fixed level of model throughput for a trading-desk assistant during market hours and is willing to commit to a term for a lower effective rate. Which Amazon Bedrock purchasing option meets this requirement?",
    options: [
      "On-demand token pricing",
      "Batch inference pricing",
      "Provisioned Throughput",
      "Amazon Bedrock Marketplace subscription"
    ],
    answer: [2],
    explanation: "Provisioned Throughput reserves a set number of model units that deliver a consistent maximum rate of tokens processed, and it can be purchased with a time commitment for a lower effective price. It is the option to choose when predictable, guaranteed throughput matters. On-demand billing, by contrast, is per token with shared capacity.",
    rationales: [
      "On-demand charges per token and provides no throughput guarantee.",
      "Batch inference offers a discount for offline jobs but no committed real-time throughput.",
      "",
      "Bedrock Marketplace expands the catalog of available models; it is not a throughput guarantee."
    ],
    services: ["Amazon Bedrock"],
    tags: ["provisioned throughput", "pricing", "bedrock"]
  },
  {
    id: "2.3-007",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A manufacturing company must classify 4 million archived maintenance reports overnight. Results are consumed by an analytics job the next morning, so no response is needed in real time. Which Amazon Bedrock option is MOST cost-effective?",
    options: [
      "Batch inference",
      "Provisioned Throughput sized for peak concurrency",
      "On-demand invocation from a large Lambda fan-out",
      "Prompt caching on a real-time endpoint"
    ],
    answer: [0],
    explanation: "Bedrock batch inference processes large sets of prompts asynchronously from Amazon S3 and is offered at a discount compared with on-demand real-time pricing. Because the workload tolerates delayed results, batch is the cheapest fit. Provisioned Throughput would pay for reserved capacity that idles outside the nightly window.",
    rationales: [
      "",
      "Reserved capacity for a once-nightly job wastes money during idle hours.",
      "Massive on-demand fan-out pays full per-token rates and risks throttling.",
      "Prompt caching reduces cost only for repeated prompt prefixes and does not provide the batch discount."
    ],
    services: ["Amazon Bedrock"],
    tags: ["batch inference", "cost optimization", "bedrock"]
  },
  {
    id: "2.3-008",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A legal technology company sends the same 20-page contract policy as a static preamble on every request, followed by a short user question. The team wants to lower per-request cost and latency without shortening the preamble. Which Amazon Bedrock feature addresses this?",
    options: [
      "Amazon Bedrock Model Distillation",
      "Amazon Bedrock prompt caching",
      "Amazon Bedrock Guardrails",
      "Amazon Bedrock Flows"
    ],
    answer: [1],
    explanation: "Prompt caching lets Bedrock reuse the processed representation of a repeated prompt prefix across requests, so the cached portion is billed at a reduced rate and adds less latency. It is designed exactly for long, stable context followed by short variable input. The preamble text itself does not need to change.",
    rationales: [
      "Model Distillation trains a smaller model from a larger teacher; it does not reuse repeated prompt prefixes.",
      "",
      "Guardrails filter harmful content and topics; they do not reduce token processing cost for repeated context.",
      "Flows orchestrates steps visually and does not address repeated prompt tokens."
    ],
    services: ["Amazon Bedrock"],
    tags: ["prompt caching", "cost optimization", "latency"]
  },
  {
    id: "2.3-009",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "hard",
    stem: "A retail company gets good accuracy from a large foundation model but the per-token price and latency are too high for a high-volume product-tagging workload. The company wants a smaller, cheaper model that retains accuracy on this specific task by learning from the larger model's outputs. Which Amazon Bedrock capability should the company use?",
    options: [
      "Amazon Bedrock Provisioned Throughput",
      "Amazon Bedrock Knowledge Bases",
      "Amazon Bedrock Model Evaluation",
      "Amazon Bedrock Model Distillation"
    ],
    answer: [3],
    explanation: "Model Distillation uses a large teacher model to generate responses that fine-tune a smaller student model, producing a model that is faster and cheaper to run while preserving accuracy on the targeted use case. This is the standard cost-and-latency lever when a big model is more capable than the workload strictly needs. The tradeoff is that gains are narrow to the distilled task.",
    rationales: [
      "Provisioned Throughput changes how capacity is purchased, not the size or speed of the model.",
      "Knowledge Bases add retrieval of company data; they do not shrink the model.",
      "Model Evaluation measures quality; it does not create a smaller model.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["model distillation", "cost optimization", "bedrock"]
  },
  {
    id: "2.3-010",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "hard",
    stem: "A public sector research lab has already fine-tuned an open-weights model in its own environment and wants to serve it through the same Amazon Bedrock APIs it uses for other models, without operating inference servers. Which Amazon Bedrock capability supports this?",
    options: [
      "Amazon Bedrock playgrounds",
      "Amazon Bedrock Agents",
      "Amazon Bedrock Custom Model Import",
      "Amazon Bedrock Data Automation"
    ],
    answer: [2],
    explanation: "Custom Model Import brings externally trained or customized weights of supported model architectures into Bedrock so they can be invoked through Bedrock's serverless APIs. The lab keeps its own training pipeline while offloading hosting to Bedrock. SageMaker AI would be the alternative if the lab wanted full control of the serving stack.",
    rationales: [
      "Playgrounds are a console for prompt experimentation, not a path to host your own weights.",
      "Agents orchestrate tasks with existing models; they do not import model weights.",
      "",
      "Bedrock Data Automation extracts insights from unstructured content such as documents, images, audio, and video."
    ],
    services: ["Amazon Bedrock"],
    tags: ["custom model import", "bedrock", "model hosting"]
  },
  {
    id: "2.3-011",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "An insurance company wants a generative AI assistant that can answer policy questions grounded in the company's PDF policy library stored in Amazon S3, with citations. The team wants a managed retrieval pipeline rather than building embedding and vector search code. Which Amazon Bedrock capability should the company use?",
    options: [
      "Amazon Bedrock Guardrails",
      "Amazon Bedrock Model Evaluation",
      "Amazon Bedrock Knowledge Bases",
      "Amazon Bedrock Prompt Management"
    ],
    answer: [2],
    explanation: "Bedrock Knowledge Bases implements Retrieval Augmented Generation as a managed capability: it ingests documents from sources such as S3, chunks and embeds them, stores vectors, and retrieves relevant passages at query time with source attribution. The company avoids writing its own ingestion and retrieval stack. Grounding responses in current documents also reduces hallucination.",
    rationales: [
      "Guardrails apply content and topic policies; they do not retrieve company documents.",
      "Model Evaluation scores model quality rather than serving grounded answers.",
      "",
      "Prompt Management stores and versions prompts; it does not index documents."
    ],
    services: ["Amazon Bedrock", "Amazon S3"],
    tags: ["knowledge bases", "rag", "bedrock"]
  },
  {
    id: "2.3-012",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A travel company wants a generative AI assistant that can decide which internal APIs to call to look up a booking, change a seat, and issue a refund, chaining several steps to complete a user request. Which Amazon Bedrock capability is designed for this?",
    options: [
      "Amazon Bedrock Knowledge Bases",
      "Amazon Bedrock Agents",
      "Amazon Bedrock batch inference",
      "Amazon Bedrock Marketplace"
    ],
    answer: [1],
    explanation: "Bedrock Agents use a foundation model to plan and execute multi-step tasks, invoking action groups that map to your APIs or Lambda functions and optionally consulting a knowledge base. That combination of reasoning plus tool invocation is what distinguishes agents from plain retrieval. Knowledge Bases alone would return text, not perform actions.",
    rationales: [
      "Knowledge Bases retrieve documents for grounding but cannot execute booking changes.",
      "",
      "Batch inference processes offline prompt sets and has no tool-calling orchestration.",
      "Marketplace broadens the model catalog and does not orchestrate API calls."
    ],
    services: ["Amazon Bedrock", "AWS Lambda"],
    tags: ["bedrock agents", "orchestration", "tool use"]
  },
  {
    id: "2.3-013",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A marketing team of non-developers needs to build a multi-step generative AI workflow that classifies an inbound request, retrieves related content, and then drafts a reply, all wired together visually and versioned for release. Which Amazon Bedrock capability best fits?",
    options: [
      "Amazon Bedrock Flows",
      "Amazon Bedrock Custom Model Import",
      "Amazon Bedrock Provisioned Throughput",
      "Amazon Bedrock playgrounds"
    ],
    answer: [0],
    explanation: "Bedrock Flows provides a visual builder for linking prompts, knowledge bases, agents, Lambda functions, and conditional logic into an executable workflow, with versions and aliases for release control. It targets teams that want orchestration without writing orchestration code. Playgrounds, by contrast, only test single prompts.",
    rationales: [
      "",
      "Custom Model Import handles bringing your own model weights into Bedrock.",
      "Provisioned Throughput is a capacity purchase option, not a workflow builder.",
      "Playgrounds support single-prompt experimentation, not multi-step workflows."
    ],
    services: ["Amazon Bedrock"],
    tags: ["bedrock flows", "workflow", "low-code"]
  },
  {
    id: "2.3-014",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "easy",
    stem: "A children's education platform must block violent and sexual content in both user prompts and model responses, and must prevent the assistant from discussing competitor products. Which Amazon Bedrock capability should the platform configure?",
    options: [
      "SageMaker Model Monitor",
      "Amazon Bedrock Guardrails",
      "SageMaker Clarify",
      "Amazon Bedrock Model Evaluation"
    ],
    answer: [1],
    explanation: "Bedrock Guardrails apply configurable content filters, denied topics, word filters, sensitive information redaction, and contextual grounding checks to both inputs and outputs. A denied topic handles the competitor restriction while content filters handle harmful categories. Guardrails can be attached to models, agents, and knowledge bases.",
    rationales: [
      "Model Monitor detects data and model quality drift on SageMaker endpoints.",
      "",
      "Clarify measures bias and explains feature importance; it does not filter generated content at runtime.",
      "Model Evaluation scores model quality offline rather than enforcing runtime policy."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["guardrails", "responsible ai", "content filtering"]
  },
  {
    id: "2.3-015",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A financial services company must choose between two foundation models for a summarization feature. The team wants automatic metric scoring on its own prompt dataset plus an option to collect human reviewer ratings, all within a managed AWS workflow. Which capability should the team use?",
    options: [
      "Amazon Bedrock Prompt Management",
      "SageMaker Feature Store",
      "Amazon Bedrock Guardrails",
      "Amazon Bedrock Model Evaluation"
    ],
    answer: [3],
    explanation: "Bedrock Model Evaluation supports automatic evaluation with built-in metrics and datasets, LLM-as-a-judge scoring, and human evaluation workflows using your own workforce. It is the managed way to compare candidate models on your data before committing. Results guide model selection rather than enforcing runtime policy.",
    rationales: [
      "Prompt Management stores, versions, and tests prompts but does not run scored model comparisons.",
      "Feature Store manages ML features for traditional model training and serving.",
      "Guardrails enforce safety policies at inference time and produce no comparative quality scores.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["model evaluation", "model selection", "bedrock"]
  },
  {
    id: "2.3-016",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A media archive holds thousands of scanned contracts, product images, recorded interviews, and video clips. The company wants a managed way to extract structured insights from all of these formats to feed a generative AI application. Which capability is purpose-built for this?",
    options: [
      "Amazon Bedrock Data Automation",
      "Amazon Bedrock Prompt Management",
      "SageMaker Ground Truth",
      "Amazon Bedrock Provisioned Throughput"
    ],
    answer: [0],
    explanation: "Bedrock Data Automation transforms unstructured multimodal content such as documents, images, audio, and video into structured output that applications and knowledge bases can consume. It removes the need to stitch together separate extraction pipelines per media type. That structured output is often used to populate a knowledge base for RAG.",
    rationales: [
      "",
      "Prompt Management organizes prompts, not multimodal content extraction.",
      "Ground Truth coordinates human data labeling for training datasets.",
      "Provisioned Throughput is a capacity commitment option unrelated to content extraction."
    ],
    services: ["Amazon Bedrock"],
    tags: ["bedrock data automation", "unstructured data", "multimodal"]
  },
  {
    id: "2.3-017",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A platform team maintains dozens of prompt templates for a customer-support assistant on Amazon Bedrock. They need to version the templates, test variations, and let applications reference a prompt by identifier instead of hardcoding text. Which Amazon Bedrock capability meets these requirements?",
    options: [
      "Amazon Bedrock Prompt Management",
      "Amazon Bedrock Knowledge Bases",
      "Amazon Bedrock playgrounds",
      "Amazon Bedrock Model Distillation"
    ],
    answer: [0],
    explanation: "Prompt Management is a Bedrock capability for creating, versioning, comparing, and sharing prompts, which applications and Flows can then reference by identifier. Centralizing prompts avoids scattering template text through application code and makes iteration auditable. It manages the prompts themselves, not documents or model weights.",
    rationales: [
      "",
      "Knowledge Bases index documents for retrieval, not prompt templates.",
      "Playgrounds allow ad hoc experimentation but provide no versioned prompt library referenced by applications.",
      "Model Distillation produces smaller student models and has nothing to do with prompt storage."
    ],
    services: ["Amazon Bedrock"],
    tags: ["prompt management", "bedrock", "prompt engineering"]
  },
  {
    id: "2.3-018",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A data science team wants to use a specialized third-party foundation model that is not among Amazon Bedrock's directly integrated serverless models. They want to discover, subscribe to, and deploy it while still calling it through Bedrock APIs. Which option enables this?",
    options: [
      "Amazon Bedrock Marketplace",
      "SageMaker Model Cards",
      "Amazon Bedrock Guardrails",
      "AWS AI Service Cards"
    ],
    answer: [0],
    explanation: "Amazon Bedrock Marketplace gives access to a broad catalog of specialized and emerging foundation models beyond the directly integrated serverless set; you deploy a chosen model to managed endpoints and invoke it through Bedrock APIs. It extends model choice while keeping a consistent development experience. Note that Marketplace models typically run on dedicated endpoints rather than fully serverless capacity.",
    rationales: [
      "",
      "SageMaker Model Cards document a model's details for governance; they are not a model catalog for deployment.",
      "Guardrails enforce content policies, not model discovery.",
      "AWS AI Service Cards are transparency documents about AWS AI services, not a marketplace."
    ],
    services: ["Amazon Bedrock"],
    tags: ["bedrock marketplace", "model catalog", "model choice"]
  },
  {
    id: "2.3-019",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "easy",
    stem: "An enterprise wants an out-of-the-box generative AI assistant that employees can ask questions about internal HR policies, wikis, and SharePoint content, with answers restricted to documents each employee is authorized to see. The company wants to avoid building a RAG application. Which AWS service should it choose?",
    options: [
      "Amazon Q Developer",
      "Amazon Bedrock playgrounds",
      "PartyRock",
      "Amazon Q Business"
    ],
    answer: [3],
    explanation: "Amazon Q Business is a ready-made generative AI assistant that connects to enterprise data sources through built-in connectors and respects existing document permissions when answering employee questions. It delivers the RAG experience as a product, so no application development is required. Building the equivalent yourself on Bedrock would be the higher-effort alternative.",
    rationales: [
      "Amazon Q Developer assists with software development tasks such as coding and AWS guidance.",
      "Playgrounds test prompts against models and have no enterprise data connectors or permission awareness.",
      "PartyRock is a public playground for learning to build small AI apps, not a permission-aware enterprise assistant.",
      ""
    ],
    services: ["Amazon Q Business"],
    tags: ["amazon q business", "enterprise assistant", "rag"]
  },
  {
    id: "2.3-020",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "easy",
    stem: "A software team wants inline code suggestions in the IDE, help scanning code for security issues, and a chat assistant that can explain AWS resources and errors. Which AWS service meets these requirements?",
    options: [
      "Amazon Q Business",
      "Amazon SageMaker JumpStart",
      "Amazon Q Developer",
      "Amazon Bedrock Agents"
    ],
    answer: [2],
    explanation: "Amazon Q Developer is the generative AI assistant for software development: it provides code completion in IDEs, code transformation, security scanning, and conversational help with AWS services in the console and CLI. Amazon Q Business targets general enterprise knowledge work rather than coding. Choosing between the two Q products by audience is a commonly tested distinction.",
    rationales: [
      "Amazon Q Business answers questions over company data for general employees, not IDE code assistance.",
      "JumpStart provides pretrained models and solution templates inside SageMaker AI, not IDE completions.",
      "",
      "Bedrock Agents are building blocks for custom applications, not an off-the-shelf developer assistant."
    ],
    services: ["Amazon Q Developer"],
    tags: ["amazon q developer", "coding assistant"]
  },
  {
    id: "2.3-021",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "Business analysts at a retail chain want to type natural language questions such as 'Why did sales dip in March?' and receive charts and narrative summaries inside their existing AWS business intelligence dashboards. Which capability should they use?",
    options: [
      "Amazon Q in QuickSight",
      "Amazon Q in Connect",
      "Amazon Bedrock Knowledge Bases",
      "SageMaker Canvas"
    ],
    answer: [0],
    explanation: "Amazon Q in QuickSight adds generative BI to Amazon QuickSight, letting users ask data questions in natural language, generate visuals, build data stories, and get executive summaries of dashboards. It embeds generative AI where the analytics already live. Amazon Q in Connect serves contact-center agents, a different persona entirely.",
    rationales: [
      "",
      "Amazon Q in Connect gives real-time suggested responses and actions to contact center agents.",
      "Knowledge Bases ground custom applications in documents; they do not generate BI dashboards.",
      "SageMaker Canvas is a no-code interface for building ML models, not conversational dashboard analytics."
    ],
    services: ["Amazon QuickSight"],
    tags: ["amazon q in quicksight", "generative bi"]
  },
  {
    id: "2.3-022",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A telecom's contact center agents struggle to find answers during live calls. The company wants generative AI to detect caller intent in real time and surface recommended responses and knowledge articles to agents inside their contact center workspace. Which AWS capability meets this requirement?",
    options: [
      "Amazon Q Developer",
      "Amazon Q in Connect",
      "PartyRock",
      "Amazon Bedrock Model Evaluation"
    ],
    answer: [1],
    explanation: "Amazon Q in Connect is the generative AI capability of Amazon Connect that analyzes live conversations, infers intent, and delivers recommended responses and relevant knowledge content to agents in real time. It is embedded in the contact center rather than being a general assistant. This persona fit is the key discriminator among the Amazon Q offerings.",
    rationales: [
      "Amazon Q Developer supports software development workflows, not live call assistance.",
      "",
      "PartyRock is a learning playground for building simple AI apps, unsuitable for production contact centers.",
      "Model Evaluation compares foundation model quality offline."
    ],
    services: ["Amazon Connect"],
    tags: ["amazon q in connect", "contact center"]
  },
  {
    id: "2.3-023",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "easy",
    stem: "A university instructor wants students with no AWS account experience to build small generative AI demo apps in a browser to learn prompt engineering. Which AWS offering is intended for this kind of hands-on learning?",
    options: [
      "SageMaker Studio",
      "Amazon Bedrock Provisioned Throughput",
      "PartyRock",
      "Amazon Q Business"
    ],
    answer: [2],
    explanation: "PartyRock is a shareable, browser-based playground where anyone can build small generative AI apps and experiment with prompts without writing code or configuring AWS infrastructure. It is a learning and exploration tool rather than a production platform. Production applications belong on Amazon Bedrock.",
    rationales: [
      "SageMaker Studio is a full ML IDE that requires AWS account setup and ML knowledge.",
      "Provisioned Throughput is a production capacity purchase, not a learning environment.",
      "",
      "Amazon Q Business is an enterprise assistant that requires connecting company data sources."
    ],
    services: ["PartyRock"],
    tags: ["partyrock", "learning", "prompt engineering"]
  },
  {
    id: "2.3-024",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "An ML team wants to browse pretrained open-source and proprietary models, review example notebooks, and deploy or fine-tune a chosen model inside a SageMaker AI environment where they control instance types. Which capability should they use?",
    options: [
      "Amazon Bedrock playgrounds",
      "SageMaker Model Monitor",
      "Amazon Q Developer",
      "SageMaker JumpStart"
    ],
    answer: [3],
    explanation: "SageMaker JumpStart is a model and solution hub inside SageMaker AI that offers pretrained models, example notebooks, and one-click deployment or fine-tuning onto instances you select. It suits teams that want more control over the training and hosting stack than Bedrock's serverless model access provides. Bedrock is the choice when you want no infrastructure decisions at all.",
    rationales: [
      "Bedrock playgrounds test prompts against managed models and expose no instance choices or notebooks.",
      "Model Monitor watches deployed endpoints for drift; it is not a model hub.",
      "Amazon Q Developer assists with coding tasks rather than hosting model catalogs.",
      ""
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["sagemaker jumpstart", "model hub", "fine-tuning"]
  },
  {
    id: "2.3-025",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "hard",
    stem: "A research group must train a large language model from scratch on trillions of tokens and wants purpose-built AWS silicon that optimizes training price-performance. Which option should they choose?",
    options: [
      "Amazon EC2 instances powered by AWS Inferentia",
      "Amazon EC2 instances powered by AWS Trainium",
      "AWS Graviton-based Amazon EC2 instances",
      "Amazon EC2 instances with local NVMe storage only"
    ],
    answer: [1],
    explanation: "AWS Trainium is the AWS-designed accelerator for high-performance deep learning training, delivering strong price-performance for large model training on instances such as Trn1 and Trn2. AWS Inferentia is the sibling chip optimized for inference. Knowing which chip serves training and which serves inference is the point of this item.",
    rationales: [
      "Inferentia is optimized for low-cost, high-throughput inference rather than training.",
      "",
      "Graviton processors are general-purpose CPUs for cost-efficient compute, not deep learning training accelerators.",
      "Local storage affects data throughput but is not an accelerator for model training."
    ],
    services: ["AWS Trainium", "Amazon EC2"],
    tags: ["trainium", "accelerators", "training"]
  },
  {
    id: "2.3-026",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A company self-hosts an open-weights text generation model on Amazon EC2 and wants to reduce the cost per inference while keeping throughput high. Which AWS purpose-built option targets this goal?",
    options: [
      "Amazon EC2 instances powered by AWS Trainium",
      "Amazon EC2 burstable T-family instances",
      "Amazon EC2 instances powered by AWS Inferentia",
      "AWS Outposts racks in the company data center"
    ],
    answer: [2],
    explanation: "AWS Inferentia is the AWS-designed inference accelerator, available in Inf1 and Inf2 instances, built to lower cost per inference while sustaining high throughput and low latency. Trainium is its counterpart for training workloads. Both are accessed through the AWS Neuron SDK.",
    rationales: [
      "Trainium is optimized for training, so it is a poor fit for reducing steady-state inference cost.",
      "Burstable general-purpose instances lack the accelerators needed for efficient model inference.",
      "",
      "Outposts extends AWS on premises for data residency needs and does not by itself reduce inference cost."
    ],
    services: ["AWS Inferentia", "Amazon EC2"],
    tags: ["inferentia", "inference cost", "accelerators"]
  },
  {
    id: "2.3-027",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "An engineering team needs to compile and run a PyTorch model on AWS Trainium and AWS Inferentia based instances. Which software component should they use?",
    options: [
      "AWS Neuron SDK",
      "AWS CloudFormation",
      "Amazon Bedrock Converse API",
      "AWS Systems Manager Agent"
    ],
    answer: [0],
    explanation: "The AWS Neuron SDK provides the compiler, runtime, and framework integrations that let PyTorch and other frameworks target Trainium and Inferentia accelerators. It is the bridge between standard ML code and AWS purpose-built silicon. Bedrock, by contrast, hides all of this behind managed APIs.",
    rationales: [
      "",
      "CloudFormation provisions infrastructure as code but does not compile models for accelerators.",
      "The Converse API is a Bedrock inference interface for managed models, not a compiler for custom silicon.",
      "The Systems Manager Agent supports instance management and patching, not model compilation."
    ],
    services: ["AWS Trainium", "AWS Inferentia"],
    tags: ["neuron sdk", "accelerators", "infrastructure"]
  },
  {
    id: "2.3-028",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "hard",
    stem: "A team must run a custom generative model that requires specific CUDA libraries, kernel-level tuning, and full control of the operating system. Which AWS option is MOST appropriate?",
    options: [
      "Amazon Bedrock on-demand inference",
      "Amazon EC2 GPU accelerated instances such as the P and G families",
      "Amazon Q Business",
      "Amazon Bedrock Provisioned Throughput"
    ],
    answer: [1],
    explanation: "EC2 accelerated computing instances in the P and G families give full control of the operating system, drivers, and libraries, which is required when a workload depends on specific CUDA versions or low-level tuning. The tradeoff is that you own patching, scaling, and capacity management. Bedrock intentionally abstracts all of that away and therefore cannot expose kernel-level control.",
    rationales: [
      "Bedrock is fully managed and exposes no operating system or driver access.",
      "",
      "Amazon Q Business is a finished assistant product with no custom model hosting.",
      "Provisioned Throughput reserves managed Bedrock capacity and still provides no OS control."
    ],
    services: ["Amazon EC2"],
    tags: ["ec2 accelerated instances", "gpu", "control"]
  },
  {
    id: "2.3-029",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "easy",
    stem: "A startup uses Amazon Bedrock on-demand pricing for a text generation feature. Which factor MOST directly determines the monthly Bedrock bill?",
    options: [
      "The number of IAM users who can call the Bedrock API",
      "The amount of Amazon S3 storage in the same account",
      "The number of AWS Regions enabled in the account",
      "The number of input and output tokens processed by the chosen model"
    ],
    answer: [3],
    explanation: "Bedrock on-demand pricing charges per input token and per output token at rates specific to each model, so token volume and model choice drive the bill. Reducing prompt length, capping output length, and selecting a smaller model are the primary cost levers. Storage and identity configuration are billed separately by other services.",
    rationales: [
      "IAM users are free and do not affect inference charges.",
      "S3 storage is billed by S3 and is independent of Bedrock token pricing.",
      "Enabling Regions incurs no charge by itself.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["pricing", "tokens", "cost drivers"]
  },
  {
    id: "2.3-030",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A customer-support automation currently uses one of the largest models on Amazon Bedrock for simple intent classification and template filling. Quality is far above what the task needs, and cost is a concern. Which change is the MOST cost-effective first step?",
    options: [
      "Purchase Provisioned Throughput for the large model",
      "Move the workload to self-managed GPU instances on Amazon EC2",
      "Switch the workload to a smaller, cheaper foundation model that still meets the accuracy bar",
      "Increase the temperature parameter to reduce token usage"
    ],
    answer: [2],
    explanation: "Model choice is one of the biggest generative AI cost levers: per-token rates differ dramatically between large frontier models and smaller models, and simple tasks rarely need the largest option. Validating a cheaper model against the accuracy requirement is a low-effort, high-impact optimization. Provisioned Throughput changes the purchasing model but not the underlying unit cost mismatch.",
    rationales: [
      "Committing capacity for an oversized model locks in the inflated cost.",
      "Self-managing GPUs adds operational burden and often costs more at this scale.",
      "",
      "Temperature controls randomness of sampling and does not meaningfully reduce token counts."
    ],
    services: ["Amazon Bedrock"],
    tags: ["cost optimization", "model choice"]
  },
  {
    id: "2.3-031",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "hard",
    stem: "A generative AI feature has steady, predictable traffic around the clock at high volume. Finance modeling shows on-demand token charges now exceed the price of committed capacity for the same model. Which pricing decision is MOST appropriate?",
    options: [
      "Continue on-demand and enable prompt caching only",
      "Move all traffic to Amazon Bedrock batch inference",
      "Replicate the workload into a second Region to split the bill",
      "Purchase Amazon Bedrock Provisioned Throughput with a term commitment for the baseline load"
    ],
    answer: [3],
    explanation: "When utilization is high and predictable, Provisioned Throughput with a commitment term typically becomes cheaper than paying per token, and it also guarantees capacity. The classic pattern is committed capacity for the baseline with on-demand absorbing spikes. Batch is not viable because the workload is interactive, and splitting Regions does not reduce total tokens.",
    rationales: [
      "Prompt caching helps only for repeated prefixes and does not capture the committed-capacity discount for steady load.",
      "Batch inference is for asynchronous jobs and cannot serve real-time traffic.",
      "Duplicating traffic across Regions changes nothing about total token cost.",
      ""
    ],
    services: ["Amazon Bedrock"],
    tags: ["provisioned throughput", "pricing", "cost optimization"]
  },
  {
    id: "2.3-032",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "easy",
    stem: "A hospital group is evaluating Amazon Bedrock and asks what happens to the prompts and completions it sends to third-party foundation models on the service. Which statement is accurate?",
    options: [
      "Prompts are shared with model providers to improve their base models",
      "Customer inputs and outputs are not shared with model providers and are not used to train the base models",
      "AWS stores all prompts publicly for transparency",
      "Data privacy applies only if the company purchases Provisioned Throughput"
    ],
    answer: [1],
    explanation: "Amazon Bedrock does not share customer prompts or generated outputs with third-party model providers and does not use them to train the underlying foundation models. Data is encrypted in transit and at rest, and fine-tuning creates a private copy of the model for that customer. This data-privacy posture is a core advantage of using AWS managed generative AI.",
    rationales: [
      "Providers never receive customer content from Bedrock invocations.",
      "",
      "Prompts are private to the customer account; nothing is published.",
      "Privacy protections apply to all Bedrock usage regardless of purchasing model."
    ],
    services: ["Amazon Bedrock"],
    tags: ["data privacy", "security", "managed ai advantages"]
  },
  {
    id: "2.3-033",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A startup founder must ship a generative AI chat feature in four weeks with two developers. The team is debating between building on Amazon Bedrock or pretraining its own model on rented GPU clusters. Which advantage of the managed approach is MOST relevant to this decision?",
    options: [
      "Managed services eliminate the need for prompt engineering",
      "Managed services guarantee the model will never produce incorrect output",
      "Managed services provide immediate access to state-of-the-art models, dramatically reducing time to market",
      "Managed services are always cheaper per token than any self-hosted option"
    ],
    answer: [2],
    explanation: "The decisive managed-service advantage here is speed to market: Bedrock exposes ready, state-of-the-art foundation models behind an API, so a small team can build the application layer immediately instead of spending months and large sums on pretraining. AWS also assumes the undifferentiated infrastructure, security, and scaling work. No service can promise correctness, and cost comparisons depend on scale.",
    rationales: [
      "Prompt engineering is still needed regardless of who hosts the model.",
      "No provider can guarantee generative output accuracy; hallucination remains a risk to manage.",
      "",
      "At very high sustained scale, self-hosting can sometimes be cheaper; the claim of always is false."
    ],
    services: ["Amazon Bedrock"],
    tags: ["managed ai advantages", "time to market"]
  },
  {
    id: "2.3-034",
    domain: 2,
    task: "2.3",
    type: "single",
    difficulty: "medium",
    stem: "A federal contractor must document that its generative AI workload runs on services covered by certifications such as SOC, ISO, and FedRAMP authorizations before it can proceed. How does using a managed service such as Amazon Bedrock help?",
    options: [
      "AWS maintains compliance certifications for the underlying service, which customers can reference through AWS Artifact",
      "Compliance obligations transfer entirely to AWS, including the contractor's application-level responsibilities",
      "Managed services are exempt from compliance audits",
      "Bedrock automatically certifies the customer's application code"
    ],
    answer: [0],
    explanation: "AWS operates Bedrock within its compliance programs, and customers can download attestations and certifications from AWS Artifact as evidence for their own audits. Under the shared responsibility model, AWS covers security of the cloud while the customer remains responsible for its data, configuration, and application behavior. Inheriting the platform certifications is a major advantage over certifying self-hosted infrastructure."
,
    rationales: [
      "",
      "Shared responsibility means the customer still owns application-level and data compliance.",
      "No AWS service is exempt from audits; AWS undergoes them and shares reports.",
      "AWS certifies its services, not code the customer writes on top of them."
    ],
    services: ["Amazon Bedrock", "AWS Artifact"],
    tags: ["compliance", "shared responsibility", "managed ai advantages"]
  },
  {
    id: "2.3-035",
    domain: 2,
    task: "2.3",
    type: "multi",
    difficulty: "easy",
    stem: "A logistics company is comparing Amazon Bedrock with self-hosting foundation models on Amazon EC2. Which advantages does the managed Bedrock approach provide? (Select TWO.)",
    options: [
      "No servers, drivers, or model hosting infrastructure to manage",
      "Guaranteed elimination of hallucinated model output",
      "Access to multiple model providers through a consistent set of APIs",
      "Full control over the operating system and GPU driver versions",
      "Automatic removal of the need to evaluate model quality"
    ],
    answer: [0, 2],
    explanation: "Bedrock's core advantages are serverless operation, which removes infrastructure management, and a single consistent API surface across multiple model providers so teams can switch or combine models easily. Neither hallucination nor the need for evaluation disappears. OS-level control is precisely what you give up in exchange for the managed experience.",
    rationales: [
      "",
      "No service can guarantee that generative output is always factually correct.",
      "",
      "Low-level OS and driver control is an EC2 self-hosting benefit, not a Bedrock one.",
      "Evaluating quality against your own data remains a customer responsibility."
    ],
    services: ["Amazon Bedrock", "Amazon EC2"],
    tags: ["managed ai advantages", "bedrock"]
  },
  {
    id: "2.3-036",
    domain: 2,
    task: "2.3",
    type: "multi",
    difficulty: "medium",
    stem: "A media company wants to lower the cost of a high-volume Amazon Bedrock summarization workload without degrading output quality below its accuracy threshold. Which actions are likely to reduce cost? (Select TWO.)",
    options: [
      "Raise the top-k value on every request",
      "Trim redundant boilerplate from prompts and set a sensible maximum output token limit",
      "Add a second Guardrail policy to the workload",
      "Route the highest-volume simple requests to a smaller model in the catalog",
      "Enable streaming responses with ConverseStream"
    ],
    answer: [1, 3],
    explanation: "Bedrock on-demand cost scales with input plus output tokens and with the model's per-token rate, so shortening prompts, capping response length, and routing simple traffic to a smaller model are direct savings. Sampling parameters and streaming affect output character and perceived latency, not billed token volume. Guardrails add a safety layer and their own charges rather than savings.",
    rationales: [
      "Top-k changes sampling behavior and does not reduce billed tokens.",
      "",
      "Adding a guardrail policy increases safety coverage and cost, not savings.",
      "",
      "Streaming improves perceived latency but bills the same tokens."
    ],
    services: ["Amazon Bedrock"],
    tags: ["cost optimization", "tokens", "model choice"]
  },
  {
    id: "2.3-037",
    domain: 2,
    task: "2.3",
    type: "multi",
    difficulty: "medium",
    stem: "An architect is deciding between Amazon Bedrock and Amazon SageMaker AI for a new project. Which requirements point toward SageMaker AI rather than Bedrock? (Select TWO.)",
    options: [
      "The team needs serverless access to third-party foundation models with no capacity planning",
      "The team must train a custom model architecture from scratch on its own labeled dataset",
      "The team needs control over training instance types, distributed training configuration, and container images",
      "The team wants a visual, low-code workflow builder for chaining prompts",
      "The team wants to avoid managing any inference endpoints"
    ],
    answer: [1, 2],
    explanation: "SageMaker AI is the right choice when you need to build and train models yourself, with control over algorithms, containers, instance types, and distributed training. Bedrock is the right choice when you want managed access to existing foundation models with no infrastructure decisions. The dividing line on the exam is build-and-control versus consume-and-manage-nothing.",
    rationales: [
      "Serverless access to third-party foundation models is a Bedrock strength.",
      "",
      "",
      "Visual low-code prompt chaining is Amazon Bedrock Flows.",
      "Avoiding endpoint management points to Bedrock's serverless model."
    ],
    services: ["Amazon Bedrock", "Amazon SageMaker AI"],
    tags: ["bedrock vs sagemaker", "service selection"]
  },
  {
    id: "2.3-038",
    domain: 2,
    task: "2.3",
    type: "multi",
    difficulty: "hard",
    stem: "A financial firm is designing a secure Amazon Bedrock deployment and must satisfy its security team. Which statements about Bedrock security controls are correct? (Select TWO.)",
    options: [
      "Bedrock requires all traffic to traverse the public internet",
      "IAM identity-based policies can restrict which principals may invoke which foundation models",
      "Bedrock API activity cannot be audited because the models are managed by third parties",
      "Traffic from a VPC can reach Bedrock privately using AWS PrivateLink interface VPC endpoints",
      "Customer-managed AWS KMS keys are unsupported for any Bedrock resource"
    ],
    answer: [1, 3],
    explanation: "Bedrock integrates with IAM so you can scope permissions down to specific model invocations, and it supports AWS PrivateLink interface VPC endpoints so requests never leave the AWS network. API calls are also logged to AWS CloudTrail for auditing, and customer managed KMS keys can protect resources such as customized models. These controls are why regulated customers can adopt the service.",
    rationales: [
      "PrivateLink keeps traffic on the AWS network, so public internet transit is not required.",
      "",
      "Bedrock API calls are recorded in AWS CloudTrail, and model invocation logging is available.",
      "",
      "Customer managed KMS keys are supported for encrypting Bedrock resources such as custom models."
    ],
    services: ["Amazon Bedrock", "AWS IAM", "AWS PrivateLink"],
    tags: ["security", "bedrock", "governance"]
  },
  {
    id: "2.3-039",
    domain: 2,
    task: "2.3",
    type: "multi",
    difficulty: "medium",
    stem: "A pharmaceutical company is building an internal assistant and wants to know which AWS options require the LEAST application development. Which statements correctly describe the offerings? (Select TWO.)",
    options: [
      "Amazon Q Business is a ready-to-use assistant that connects to enterprise data sources with built-in connectors",
      "Amazon Bedrock provides finished end-user applications that need no development",
      "Building on Amazon Bedrock requires the company to develop the application layer around the model APIs",
      "SageMaker JumpStart is an end-user chat product for business teams",
      "PartyRock is the recommended platform for production enterprise assistants"
    ],
    answer: [0, 2],
    explanation: "Amazon Q Business is a packaged assistant with connectors and permission-aware retrieval, so it minimizes development work. Amazon Bedrock supplies building blocks, meaning the customer still writes the application around its APIs. JumpStart serves ML practitioners, and PartyRock is for learning and experimentation rather than production.",
    rationales: [
      "",
      "Bedrock delivers APIs and capabilities, not finished end-user applications.",
      "",
      "JumpStart is a model and solution hub for ML practitioners inside SageMaker AI.",
      "PartyRock is a playground for learning, not a production enterprise platform."
    ],
    services: ["Amazon Q Business", "Amazon Bedrock"],
    tags: ["service selection", "amazon q business", "development effort"]
  },
  {
    id: "2.3-040",
    domain: 2,
    task: "2.3",
    type: "multi",
    difficulty: "medium",
    stem: "A public transit agency plans a generative AI trip-planning assistant. Which combinations correctly match an AWS capability to its role in the architecture? (Select TWO.)",
    options: [
      "AWS Trainium accelerators serve real-time inference at the lowest cost per request",
      "Amazon Bedrock Model Evaluation blocks unsafe responses at inference time",
      "Amazon Bedrock Knowledge Bases provides retrieval of the agency's service documents for grounded answers",
      "SageMaker Model Monitor filters personally identifiable information from model output",
      "Amazon Bedrock Guardrails enforces content and topic restrictions on prompts and responses"
    ],
    answer: [2, 4],
    explanation: "Knowledge Bases supply managed retrieval so answers are grounded in the agency's own documents, and Guardrails enforce runtime safety policies on both input and output. Trainium targets training rather than cheapest inference, which is Inferentia's role. Model Evaluation is an offline quality process, and Model Monitor watches SageMaker endpoints for drift rather than redacting text.",
    rationales: [
      "Trainium is optimized for training; AWS Inferentia targets low-cost inference.",
      "Model Evaluation compares model quality offline and does not block responses at runtime.",
      "",
      "Model Monitor detects drift and data quality issues on endpoints; Guardrails handle sensitive information filtering.",
      ""
    ],
    services: ["Amazon Bedrock", "Amazon Bedrock Guardrails"],
    tags: ["architecture", "bedrock", "service selection"]
  },
  {
    id: "2.3-041",
    domain: 2,
    task: "2.3",
    type: "multi",
    difficulty: "hard",
    stem: "A gaming studio needs sub-second responses for an in-game hint system and also runs a nightly job that rewrites thousands of quest descriptions. Which Amazon Bedrock choices best match these two workloads? (Select TWO.)",
    options: [
      "Use batch inference for the nightly quest description rewrites to obtain a lower price per token",
      "Use batch inference for the in-game hint system to reduce latency",
      "Use Provisioned Throughput or on-demand real-time invocation for the in-game hint system",
      "Use Custom Model Import for both workloads to avoid token charges",
      "Use Amazon Q Developer to serve the in-game hints to players"
    ],
    answer: [0, 2],
    explanation: "Batch inference fits the offline nightly rewrite job and is priced below real-time on-demand, while the latency-sensitive hint system needs synchronous invocation, optionally backed by Provisioned Throughput for guaranteed capacity. Matching the inference mode to latency tolerance is the core cost-and-performance decision. Custom Model Import does not remove usage charges, and Amazon Q Developer is a developer tool, not a player-facing runtime.",
    rationales: [
      "",
      "Batch inference is asynchronous and increases latency, so it cannot serve in-game hints.",
      "",
      "Imported custom models still incur inference charges and add customization work.",
      "Amazon Q Developer assists engineers with coding, not end users in a game."
    ],
    services: ["Amazon Bedrock"],
    tags: ["batch inference", "latency", "cost optimization"]
  },
  {
    id: "2.3-042",
    domain: 2,
    task: "2.3",
    type: "multi",
    difficulty: "easy",
    stem: "A manufacturing firm wants to understand what Amazon Bedrock offers out of the box before designing its application. Which statements about Amazon Bedrock are correct? (Select TWO.)",
    options: [
      "Bedrock requires customers to select and manage GPU instances for each model",
      "Bedrock offers a catalog of foundation models from Amazon and third-party providers",
      "Bedrock trains a new foundation model from scratch for each customer",
      "Bedrock supports customization approaches including fine-tuning and continued pre-training on private copies of models",
      "Bedrock can be used only through the AWS Management Console"
    ],
    answer: [1, 3],
    explanation: "Bedrock provides a catalog of foundation models from Amazon and partners such as Anthropic, Meta, Mistral, Cohere, AI21 Labs, and Stability AI, and it supports customization through fine-tuning and continued pre-training, which produce a private copy of the model for your account. Capacity is managed by AWS, and access is available through the API, SDKs, and CLI in addition to the console.",
    rationales: [
      "Bedrock is serverless; AWS manages the underlying compute.",
      "",
      "Bedrock reuses existing foundation models; it does not pretrain a new model per customer.",
      "",
      "Bedrock is accessible through APIs, SDKs, and the AWS CLI as well as the console."
    ],
    services: ["Amazon Bedrock"],
    tags: ["bedrock", "model catalog", "customization"]
  },
  {
    id: "2.3-043",
    domain: 2,
    task: "2.3",
    type: "ordering",
    difficulty: "medium",
    stem: "A retail company is setting up an Amazon Bedrock Knowledge Base so its assistant can answer questions from product manuals. Place the steps in the correct order.",
    options: [
      "Run the ingestion job so documents are chunked, embedded, and written to the vector store",
      "Store the product manuals in an Amazon S3 bucket as the data source",
      "Query the knowledge base from the application and return grounded answers with citations",
      "Create the knowledge base and select an embeddings model and a vector store"
    ],
    answer: [1, 3, 0, 2],
    explanation: "RAG setup with Bedrock Knowledge Bases starts by landing source documents in a supported data source such as Amazon S3. You then create the knowledge base, choosing the embeddings model and vector store, and run an ingestion job that chunks the documents, generates embeddings, and populates the index. Only after ingestion completes can the application retrieve relevant passages and generate grounded answers with citations.",
    rationales: [],
    services: ["Amazon Bedrock", "Amazon S3"],
    tags: ["knowledge bases", "rag", "ingestion"]
  },
  {
    id: "2.3-044",
    domain: 2,
    task: "2.3",
    type: "ordering",
    difficulty: "hard",
    stem: "A healthcare company is taking a generative AI summarization feature from idea to production on Amazon Bedrock. Place the activities in the correct order.",
    options: [
      "Attach Amazon Bedrock Guardrails and deploy the feature to production with monitoring",
      "Compare candidate models with Amazon Bedrock Model Evaluation on a representative prompt dataset",
      "Define the business use case and the accuracy, latency, and cost requirements",
      "Iterate on prompts in the playground and store the approved templates in Prompt Management"
    ],
    answer: [2, 1, 3, 0],
    explanation: "Work starts by defining the use case and its measurable requirements, since those constraints drive every later choice. Candidate models are then compared against a representative dataset using Model Evaluation, after which prompts are refined and centralized for reuse. Safety controls such as Guardrails are attached before the feature goes live with ongoing monitoring.",
    rationales: [],
    services: ["Amazon Bedrock", "Amazon Bedrock Guardrails"],
    tags: ["lifecycle", "bedrock", "model selection"]
  }
);
