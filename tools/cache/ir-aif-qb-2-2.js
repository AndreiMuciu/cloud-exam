window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "2.2-001",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "easy",
    stem: "A media company wants to launch a feature that drafts marketing copy within six weeks, and it has no machine learning engineers on staff. Which characteristic of using a pre-trained foundation model on Amazon Bedrock provides the greatest advantage for this goal?",
    options: [
      "Speed to market, because the model is already trained and is reached through a managed API",
      "Guaranteed identical output for every request that uses the same prompt",
      "Elimination of the need to evaluate output quality before publishing",
      "Automatic removal of all bias from the generated text"
    ],
    answer: [0],
    explanation: "Pre-trained foundation models remove the data collection, training, and infrastructure work that a custom model requires, so a team can reach a working prototype in days instead of months. Speed to market, simplicity, and adaptability are the core business advantages of generative AI. Using a foundation model does not make output deterministic, unbiased, or exempt from review.",
    rationales: [
      "",
      "Foundation models sample tokens probabilistically, so repeated calls can return different wording.",
      "Generated content still needs accuracy and brand review, especially for public marketing material.",
      "Foundation models inherit bias from training data and require testing and guardrails."
    ],
    services: ["Amazon Bedrock"],
    tags: ["speed to market", "foundation models"]
  },
  {
    id: "2.2-002",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A logistics company needs one solution that can summarize driver notes, draft customer status emails, and answer employee questions about internal shipping policies. Which approach uses the adaptability of generative AI with the LEAST operational overhead?",
    options: [
      "Train a separate custom model for each of the three tasks with Amazon SageMaker AI",
      "Use one foundation model on Amazon Bedrock and adapt it to each task through prompt engineering",
      "Run continued pre-training on a foundation model separately for each task",
      "Build three rule-based text processing pipelines"
    ],
    answer: [1],
    explanation: "A single foundation model can perform many language tasks when it is instructed differently, which makes prompt engineering the lowest-effort starting point. Separate custom models, continued pre-training, and hand-written rules each add data, training, and maintenance work for results that prompting may already deliver.",
    rationales: [
      "Three custom models triple the labeling, training, and maintenance effort.",
      "",
      "Continued pre-training needs large volumes of domain data plus significant cost and expertise.",
      "Rule-based pipelines cannot generalize to open-ended summarization or drafting."
    ],
    services: ["Amazon Bedrock", "Amazon SageMaker AI"],
    tags: ["adaptability", "prompt engineering"]
  },
  {
    id: "2.2-003",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A retailer expects generative AI chat traffic to increase tenfold during a holiday sale and then return to normal. The team does not want to plan or manage capacity. Which option meets this requirement with the LEAST operational overhead?",
    options: [
      "Deploy an open-source model on Amazon EC2 GPU instances and scale the fleet manually",
      "Buy Amazon Bedrock Provisioned Throughput sized for the peak and keep it all year",
      "Use on-demand inference on Amazon Bedrock, which scales with request volume and bills per token",
      "Queue all chat requests and process them once per day with batch inference"
    ],
    answer: [2],
    explanation: "On-demand inference on Amazon Bedrock is a managed, pay-per-token option that absorbs variable traffic with no capacity planning, which reflects the responsiveness advantage of managed generative AI. Provisioned Throughput sized for a seasonal peak wastes money off-season, self-managed GPUs add operational work, and batch processing breaks an interactive experience.",
    rationales: [
      "Self-managed GPU fleets require sizing, patching, and scaling work.",
      "Provisioned Throughput held year-round for one peak is costly and still needs sizing.",
      "",
      "Daily batch processing cannot support a live chat conversation."
    ],
    services: ["Amazon Bedrock"],
    tags: ["scalability", "cost"]
  },
  {
    id: "2.2-004",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "easy",
    stem: "A public sector agency wants its staff to produce plain-language summaries of long regulations more quickly. Which statement best describes a realistic benefit of using generative AI for this work?",
    options: [
      "It produces legally binding text that needs no review",
      "It removes the need for subject matter experts in the process",
      "It returns the same summary word for word on every run",
      "It can draft readable summaries at scale that staff then review and finalize"
    ],
    answer: [3],
    explanation: "Generative AI delivers the most value as a drafting accelerator: it creates a usable first version quickly while a human stays accountable for accuracy and tone. Claims that it eliminates review, replaces experts, or behaves deterministically overstate what the technology does.",
    rationales: [
      "Generated text can contain errors or omissions and must be reviewed, especially in regulated communication.",
      "Experts are still needed to validate meaning and approve final wording.",
      "Sampling causes wording to vary between runs unless generation settings are tightly constrained.",
      ""
    ],
    services: [],
    tags: ["human review", "business value"]
  },
  {
    id: "2.2-005",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "easy",
    stem: "A financial services firm pilots a chatbot that answers questions about its products. Testers report that the bot occasionally cites a product feature that the firm does not offer, stated in a confident tone. Which limitation of generative AI does this describe?",
    options: [
      "Overfitting",
      "Data drift",
      "Prompt injection",
      "Hallucination"
    ],
    answer: [3],
    explanation: "A hallucination is fluent, confident output that is factually wrong or unsupported, which happens because the model predicts likely text rather than looking up verified facts. Grounding the model with Amazon Bedrock Knowledge Bases and adding human review reduces the risk. Overfitting, drift, and prompt injection describe different problems.",
    rationales: [
      "Overfitting is a training problem where a model memorizes training data and generalizes poorly.",
      "Data drift is a change in production data distribution over time relative to training data.",
      "Prompt injection is a malicious input that redirects the model away from its instructions.",
      ""
    ],
    services: [],
    tags: ["hallucination", "limitations"]
  },
  {
    id: "2.2-006",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A healthcare provider needs a generative AI assistant that answers clinician questions using only the provider's approved clinical protocol documents, and every answer must show which document it came from. Which approach BEST reduces hallucinations for this requirement?",
    options: [
      "Increase the temperature setting so the model explores more possible answers",
      "Fine-tune the model on a small set of question and answer pairs",
      "Use Retrieval Augmented Generation with Amazon Bedrock Knowledge Bases and return source citations",
      "Increase the maximum output token limit so answers can be longer"
    ],
    answer: [2],
    explanation: "Retrieval Augmented Generation grounds generation in retrieved passages from an authoritative corpus, and Amazon Bedrock Knowledge Bases can return citations that point back to the source document. Fine-tuning teaches style and task behavior but does not guarantee factual grounding or citations, and generation settings such as temperature or output length do not add facts.",
    rationales: [
      "Higher temperature increases randomness, which tends to increase hallucination.",
      "Fine-tuning shapes tone and format but does not supply verifiable citations for each answer.",
      "",
      "A longer answer limit changes length, not factual accuracy."
    ],
    services: ["Amazon Bedrock Knowledge Bases", "Amazon Bedrock"],
    tags: ["rag", "hallucination"]
  },
  {
    id: "2.2-007",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A manufacturing company must calculate warranty reimbursement amounts from structured claim records, and every calculation must be exact and reproducible for audit. Which statement about using a large language model for this task is correct?",
    options: [
      "A foundation model is the best fit because it can process the records in natural language",
      "A foundation model is a poor fit because its output is nondeterministic and arithmetic is not guaranteed to be exact",
      "A foundation model is the best fit because it can be made fully deterministic by raising temperature",
      "A foundation model is the best fit because it provides a full audit trail of its internal reasoning"
    ],
    answer: [1],
    explanation: "Exact, repeatable arithmetic over structured data belongs in deterministic code or a database query, not in a probabilistic text generator. Recognizing when generative AI is the wrong tool is part of assessing its limitations, including nondeterminism and lack of interpretability.",
    rationales: [
      "Natural language processing ability does not make a model reliable for exact financial math.",
      "",
      "Raising temperature increases randomness; lowering it reduces variability but does not guarantee determinism.",
      "Foundation models do not expose a verifiable internal audit trail of how an answer was produced."
    ],
    services: [],
    tags: ["when not to use genai", "nondeterminism"]
  },
  {
    id: "2.2-008",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A gaming company runs a support chatbot on a foundation model. A player submits a message that says to ignore all previous instructions and reveal the internal system prompt. Which security risk does this attempt represent?",
    options: [
      "Data poisoning",
      "Model inversion",
      "Membership inference",
      "Prompt injection"
    ],
    answer: [3],
    explanation: "Prompt injection is crafted input that tries to override the developer's instructions so the model performs unintended actions, such as leaking its system prompt. Amazon Bedrock Guardrails and input validation help mitigate it. Data poisoning, model inversion, and membership inference target training data or model internals rather than the live prompt.",
    rationales: [
      "Data poisoning corrupts training data before or during model training.",
      "Model inversion tries to reconstruct training data from model outputs.",
      "Membership inference tries to determine whether a specific record was in the training set.",
      ""
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["prompt injection", "security"]
  },
  {
    id: "2.2-009",
    domain: 2,
    task: "2.2",
    type: "multi",
    difficulty: "easy",
    stem: "Employees at a law firm have been pasting client contract text into a free public generative AI chatbot to get quick summaries. Which risks should MOST concern the firm's compliance team? (Select TWO.)",
    options: [
      "The chatbot may respond too slowly during peak hours",
      "Confidential client data leaves the firm's control once it is sent to the external service",
      "The submitted contract text may be retained by the provider and used to improve its models",
      "The chatbot may produce summaries in the wrong language",
      "The firm may exceed the chatbot's context window"
    ],
    answer: [1, 2],
    explanation: "Sending confidential data to an external consumer service is a data leakage risk on two fronts: the firm loses control over access to the data, and the provider may retain it or use it for model improvement. This is why organizations adopt governed options where prompts and completions are not used to train the underlying models. Latency, language, and context window are operational concerns, not compliance risks.",
    rationales: [
      "Slow responses are an inconvenience, not a confidentiality breach.",
      "",
      "",
      "Output language is controllable through prompting and is not a compliance risk.",
      "Context window limits truncate input; they do not expose client data."
    ],
    services: [],
    tags: ["data leakage", "governance"]
  },
  {
    id: "2.2-010",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "hard",
    stem: "A bank wants to use a large language model to decide whether to approve consumer loan applications. Regulators require the bank to explain the specific reasons for each denial. Which limitation of foundation models MOST directly conflicts with this requirement?",
    options: [
      "Foundation models have low interpretability, so their internal decision process is difficult to explain",
      "Foundation models cannot process numeric input of any kind",
      "Foundation models are only available in a small number of AWS Regions",
      "Foundation models cannot output a simple approve or deny label"
    ],
    answer: [0],
    explanation: "Foundation models are very large neural networks whose internal reasoning cannot be traced to specific, verifiable factors, which conflicts with regulatory demands for adverse action explanations. High-stakes, regulated decisions favor simpler, more interpretable models with tools such as SageMaker Clarify for explainability analysis.",
    rationales: [
      "",
      "Models can read numbers in text, even though exact computation is unreliable; input format is not the core issue.",
      "Regional availability varies but is not the fundamental conflict with explainability rules.",
      "A model can easily be prompted to output a label; justifying the label is the problem."
    ],
    services: ["SageMaker Clarify"],
    tags: ["interpretability", "when not to use genai"]
  },
  {
    id: "2.2-011",
    domain: 2,
    task: "2.2",
    type: "multi",
    difficulty: "medium",
    stem: "A media startup is evaluating whether to add generative AI to its publishing workflow. Which risks are specific concerns the startup should assess before launch? (Select TWO.)",
    options: [
      "Generated articles may include fabricated facts stated confidently",
      "Generated content may raise intellectual property concerns if it closely resembles copyrighted training material",
      "The foundation model will refuse to run outside business hours",
      "Foundation models cannot generate text longer than one paragraph",
      "Using a managed AI service always violates data residency laws"
    ],
    answer: [0, 1],
    explanation: "Hallucination and intellectual property exposure are two of the most cited risks for publishing use cases: models can invent facts, and generated text or images can resemble copyrighted works from training data. The other statements are factually wrong; models run continuously, can generate long documents, and managed services can be configured to satisfy residency requirements.",
    rationales: [
      "",
      "",
      "Managed model endpoints serve requests at any time.",
      "Output length is bounded by token limits that allow many pages of text.",
      "Data residency depends on Region and configuration choices, not on managed services as a category."
    ],
    services: [],
    tags: ["ip and copyright", "hallucination"]
  },
  {
    id: "2.2-012",
    domain: 2,
    task: "2.2",
    type: "multi",
    difficulty: "easy",
    stem: "A company's finance team is surprised that the monthly bill for its generative AI application varies widely even though the number of users is stable. Which TWO factors MOST likely contribute to this variation? (Select TWO.)",
    options: [
      "Longer prompts, including large retrieved context passages, increase the number of billed input tokens",
      "Longer model responses increase the number of billed output tokens",
      "On-demand token prices are renegotiated every hour on a GPU spot market",
      "Foundation models bill a fixed per-user license fee that changes each month",
      "Requests that return an error are billed at ten times the normal rate"
    ],
    answer: [0, 1],
    explanation: "On-demand generative AI pricing is metered per input and output token, so prompt length, retrieved context size, and response length all move the bill even when user counts are flat. This cost unpredictability is managed through prompt design, output token limits, model choice, and usage monitoring.",
    rationales: [
      "",
      "",
      "On-demand token prices are published rates, not hourly spot market prices.",
      "On-demand Amazon Bedrock pricing is usage based, not a per-user license fee.",
      "Billing is based on tokens processed, not on penalty rates for errors."
    ],
    services: ["Amazon Bedrock"],
    tags: ["cost per token", "cost unpredictability"]
  },
  {
    id: "2.2-013",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A social platform is testing a foundation model for auto-replies. During red-team testing the model sometimes produces insulting or hateful text when provoked. Which AWS capability is designed to filter this harmful content in both prompts and responses?",
    options: [
      "SageMaker Model Monitor",
      "Amazon Macie",
      "Amazon Bedrock Guardrails",
      "AWS CloudTrail"
    ],
    answer: [2],
    explanation: "Amazon Bedrock Guardrails applies configurable safeguards such as content filters for hate, insults, violence, and sexual content, along with denied topics and sensitive information filters, to both user inputs and model outputs. Model Monitor watches deployed ML model quality, Macie discovers sensitive data in Amazon S3, and CloudTrail logs API activity.",
    rationales: [
      "Model Monitor detects data and quality drift for models in production; it does not filter toxic text.",
      "Macie finds sensitive data in S3 buckets; it does not moderate model conversations.",
      "",
      "CloudTrail records API calls for auditing; it does not inspect generated content."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["toxicity", "guardrails"]
  },
  {
    id: "2.2-014",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A customer service team runs the same prompt through a foundation model twice and receives two differently worded but similar answers. The team asks why. Which explanation is correct?",
    options: [
      "The model samples from a probability distribution over tokens, so outputs can vary between runs",
      "The model was retrained between the two requests",
      "The context window expired between requests, forcing a new answer",
      "One request was routed to a completely different AWS service"
    ],
    answer: [0],
    explanation: "Generative models are nondeterministic by design: each token is sampled from a probability distribution shaped by settings such as temperature, top-p, and top-k. Lowering temperature makes output more consistent but variability can remain. Retraining, context expiry, and service routing are not what causes run-to-run variation.",
    rationales: [
      "",
      "Foundation models are not retrained between individual inference requests.",
      "A context window is a per-request input size limit; it does not expire between calls.",
      "Both requests go to the same model endpoint; routing does not explain wording changes."
    ],
    services: [],
    tags: ["nondeterminism", "inference parameters"]
  },
  {
    id: "2.2-015",
    domain: 2,
    task: "2.2",
    type: "multi",
    difficulty: "medium",
    stem: "A healthcare company is choosing a foundation model on Amazon Bedrock for an assistant that must analyze medical intake forms containing both text and photographs, and it must serve users in an AWS Region approved for its compliance program. Which selection criteria are MOST important for this use case? (Select TWO.)",
    options: [
      "Multimodal capability so the model can process images and text together",
      "Availability of the model in the required AWS Region",
      "Whether the model was released before 2020",
      "The number of other companies using the same model",
      "Whether the model name includes the word medical"
    ],
    answer: [0, 1],
    explanation: "The requirements state two hard constraints: the model must accept image and text input, which requires a multimodal model, and it must be offered in the approved Region. Model age, popularity, and naming are not meaningful selection criteria; capability, modality, Region availability, cost, latency, and customization support are.",
    rationales: [
      "",
      "",
      "Release date does not determine fitness; capability and evaluation results do.",
      "Adoption by others does not satisfy this company's modality or compliance constraints.",
      "A model's name says nothing about its measured performance on a task."
    ],
    services: ["Amazon Bedrock"],
    tags: ["model selection", "modality"]
  },
  {
    id: "2.2-016",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A legal technology company needs a foundation model that can accept an entire 300-page contract in a single request so the model can answer questions that reference clauses from any part of the document. Which model characteristic should the company evaluate FIRST?",
    options: [
      "Top-k sampling range",
      "Context window size",
      "Number of supported output languages",
      "Training dataset license"
    ],
    answer: [1],
    explanation: "The context window is the maximum number of tokens a model can consider in one request, covering the prompt, any inserted documents, and the response. A 300-page contract requires a model with a very large context window; otherwise the document must be chunked and retrieved. Sampling settings, languages, and dataset licensing do not determine how much input fits.",
    rationales: [
      "Top-k controls sampling diversity during generation, not input capacity.",
      "",
      "Multilingual support matters for language coverage, not for document length.",
      "Training data licensing relates to IP risk, not to input size."
    ],
    services: [],
    tags: ["context window", "model selection"]
  },
  {
    id: "2.2-017",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A gaming studio needs sub-second responses for short in-game dialogue suggestions and wants to minimize inference cost at very high request volume. Quality requirements are modest. Which model choice BEST fits these requirements?",
    options: [
      "The largest available frontier model, because larger models are always the right default",
      "A smaller, faster foundation model that meets the quality bar at lower latency and lower cost per token",
      "An ensemble of three large models voting on each response",
      "A model chosen only for its support of 30 or more languages"
    ],
    answer: [1],
    explanation: "Model selection is a tradeoff among cost, latency, and accuracy. Smaller models respond faster and cost less per token, so when they meet the quality bar they are the better choice for high-volume, latency-sensitive workloads. Oversized models or multi-model ensembles raise both latency and cost without a required quality gain.",
    rationales: [
      "The largest model costs more and responds more slowly; the requirements do not demand top-tier quality.",
      "",
      "Running three large models multiplies cost and latency, the opposite of the goal.",
      "Language coverage is not one of the stated requirements."
    ],
    services: [],
    tags: ["model selection", "latency"]
  },
  {
    id: "2.2-018",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "easy",
    stem: "A travel company wants its assistant to answer customer questions in Spanish, Japanese, and German as well as English. When comparing foundation models on Amazon Bedrock, which model attribute MOST directly addresses this requirement?",
    options: [
      "Model size in parameters",
      "Provisioned Throughput pricing",
      "Multilingual capability of the model",
      "Maximum output token limit"
    ],
    answer: [2],
    explanation: "Multilingual support describes which languages a model understands and generates well, and it varies significantly between models, so it must be verified against the target languages. Parameter count, pricing model, and output limits do not indicate language coverage.",
    rationales: [
      "A large model is not automatically strong in every language.",
      "Pricing structure affects cost, not language ability.",
      "",
      "Output token limits bound response length, not language support."
    ],
    services: ["Amazon Bedrock"],
    tags: ["multilingual", "model selection"]
  },
  {
    id: "2.2-019",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "hard",
    stem: "A company shortlists two foundation models. Model A scores slightly higher on public benchmarks. Model B costs 70 percent less per 1,000 tokens and responds twice as fast. The use case is internal meeting summarization where minor quality differences are acceptable. What is the MOST appropriate next step before choosing?",
    options: [
      "Choose Model A because higher benchmark scores always transfer to every task",
      "Choose Model B immediately because cost is the only criterion that matters",
      "Evaluate both models on a sample of the company's own meeting transcripts and compare quality against cost and latency",
      "Choose the model with the larger parameter count"
    ],
    answer: [2],
    explanation: "Public benchmarks measure general ability but do not guarantee performance on a specific workload, so the right practice is to evaluate candidate models on representative company data, using tools such as Amazon Bedrock Model Evaluation, then weigh quality against cost and latency. If Model B meets the quality bar on real transcripts, its cost and speed advantages make it the better business choice.",
    rationales: [
      "Benchmark leadership does not guarantee better results on a specific internal task.",
      "Cost matters, but quality must be validated as acceptable first.",
      "",
      "Parameter count is a poor proxy for task performance and ignores cost and latency."
    ],
    services: ["Amazon Bedrock Model Evaluation"],
    tags: ["model selection", "evaluation"]
  },
  {
    id: "2.2-020",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A pharmaceutical company plans to eventually fine-tune a foundation model on proprietary research abstracts. When shortlisting models on Amazon Bedrock today, which selection criterion does this future plan add?",
    options: [
      "Whether the model supports customization such as fine-tuning",
      "Whether the model has the lowest on-demand token price",
      "Whether the model supports streaming responses",
      "Whether the model can generate images"
    ],
    answer: [0],
    explanation: "Not every foundation model on Amazon Bedrock supports customization; fine-tuning is available only for specific models. If customization is on the roadmap, model choice must include customization support alongside cost, latency, and quality. Price, streaming, and image generation do not address the fine-tuning plan.",
    rationales: [
      "",
      "The cheapest model may not be customizable at all.",
      "Streaming improves perceived latency but is unrelated to fine-tuning support.",
      "Image generation is a different modality and irrelevant to this text use case."
    ],
    services: ["Amazon Bedrock"],
    tags: ["customization", "model selection"]
  },
  {
    id: "2.2-021",
    domain: 2,
    task: "2.2",
    type: "multi",
    difficulty: "hard",
    stem: "A startup must decide between calling a proprietary foundation model through Amazon Bedrock and self-hosting an open-weights model on GPU instances it manages. Which statements accurately describe this build versus buy tradeoff? (Select TWO.)",
    options: [
      "The managed API option shifts infrastructure management to AWS and reaches production faster",
      "Self-hosting gives more control over the model and environment but requires ML and infrastructure expertise",
      "Self-hosting is always cheaper regardless of traffic volume",
      "A managed API legally prevents the startup from ever customizing a model",
      "Open-weights models cannot be used for commercial purposes"
    ],
    answer: [0, 1],
    explanation: "The core tradeoff is speed and simplicity versus control and responsibility: a managed API removes infrastructure work and accelerates launch, while self-hosting offers deeper control over model, versioning, and environment at the price of GPU management and specialized skills. Cost advantage depends on utilization, managed platforms do offer customization paths, and many open-weights models carry commercial-friendly licenses.",
    rationales: [
      "",
      "",
      "At low or spiky utilization, per-token managed pricing is often cheaper than idle GPUs.",
      "Amazon Bedrock supports fine-tuning for certain models, so customization remains possible.",
      "Many open-weights models, such as Meta Llama variants, permit commercial use under their licenses."
    ],
    services: ["Amazon Bedrock"],
    tags: ["build vs buy", "cost"]
  },
  {
    id: "2.2-022",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "An online retailer adds a generative AI shopping assistant to product pages. The business sponsor wants to know whether the assistant increases the percentage of visitors who complete a purchase. Which metric directly measures this outcome?",
    options: [
      "Cost per inference",
      "Conversion rate",
      "Tokens per second",
      "Model parameter count"
    ],
    answer: [1],
    explanation: "Conversion rate measures the share of visitors who complete a desired action such as a purchase, so comparing conversion between users who engage with the assistant and those who do not shows business impact. Cost per inference measures expense, tokens per second measures throughput, and parameter count describes model size, none of which capture purchasing behavior.",
    rationales: [
      "Cost per inference tracks spending, not customer purchasing behavior.",
      "",
      "Tokens per second is a performance throughput metric.",
      "Parameter count is a model property, not a business outcome."
    ],
    services: [],
    tags: ["conversion rate", "business metrics"]
  },
  {
    id: "2.2-023",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A subscription streaming service launches a generative AI recommendation and search experience. Executives want to know whether the feature makes each subscriber more valuable over the entire time they remain a customer. Which metric BEST captures this?",
    options: [
      "Customer lifetime value",
      "Cost per token",
      "Time to first token",
      "Training loss"
    ],
    answer: [0],
    explanation: "Customer lifetime value estimates total revenue a customer generates across the whole relationship, so an increase after launch indicates the feature deepens engagement and retention. Cost per token and time to first token are operational metrics, and training loss is a model training statistic.",
    rationales: [
      "",
      "Cost per token measures inference expense, not customer value.",
      "Time to first token measures response latency.",
      "Training loss reflects model fit during training, not business value."
    ],
    services: [],
    tags: ["customer lifetime value", "business metrics"]
  },
  {
    id: "2.2-024",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "easy",
    stem: "A telecom company deploys a generative AI assistant that drafts responses for support agents. Leadership wants a single number showing whether agents resolve tickets with less effort than before. Which metric is MOST appropriate?",
    options: [
      "Average handling time per ticket compared with the pre-launch baseline",
      "Number of foundation models evaluated during the pilot",
      "Total parameters in the selected model",
      "Number of prompt templates in the repository"
    ],
    answer: [0],
    explanation: "Efficiency gains are measured by comparing an operational baseline before and after deployment, and average handling time per ticket captures agent effort directly. Counting evaluated models, parameters, or prompt templates describes project activity rather than realized business benefit.",
    rationales: [
      "",
      "The number of models tested is a project activity measure, not an efficiency outcome.",
      "Parameter count says nothing about agent productivity.",
      "Template count measures artifacts created, not effort saved."
    ],
    services: [],
    tags: ["efficiency", "business metrics"]
  },
  {
    id: "2.2-025",
    domain: 2,
    task: "2.2",
    type: "multi",
    difficulty: "medium",
    stem: "A finance company must justify continued investment in its generative AI document assistant. Which measurements are appropriate business value metrics for this decision? (Select TWO.)",
    options: [
      "Average revenue per user for accounts that use the assistant",
      "Cost per inference relative to the manual process cost it replaces",
      "The number of GPUs in the AWS Region hosting the model",
      "The size of the vector index in gigabytes",
      "The number of tokens in the longest system prompt"
    ],
    answer: [0, 1],
    explanation: "Business value is assessed by linking the feature to revenue and to cost displaced. Average revenue per user shows monetization impact, and comparing cost per inference with the cost of the manual process shows whether automation pays off. Infrastructure counts, index size, and prompt length are implementation details.",
    rationales: [
      "",
      "",
      "Regional GPU capacity is not a business outcome the company controls or reports.",
      "Index size is a storage detail, not a value measure.",
      "System prompt length affects token cost slightly but is not a business metric."
    ],
    services: [],
    tags: ["business metrics", "cost per inference"]
  },
  {
    id: "2.2-026",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "hard",
    stem: "A conglomerate wants one generative AI platform that serves legal, HR, engineering, and marketing teams instead of four narrow tools. Which advantage of foundation models makes this feasible?",
    options: [
      "Cross-domain performance, since a single foundation model generalizes across many subject areas and tasks",
      "Deterministic output, which guarantees consistent results for every department",
      "Full interpretability, which lets each department audit internal reasoning",
      "Zero inference cost after the first request is cached"
    ],
    answer: [0],
    explanation: "Foundation models are trained on broad, diverse data, so one model can be pointed at legal drafting, HR question answering, code assistance, and marketing copy through prompting and grounding. That cross-domain performance is what allows a shared platform. Determinism, interpretability, and free inference are not properties of these models.",
    rationales: [
      "",
      "Generative models sample probabilistically and do not guarantee identical output.",
      "Foundation models have limited interpretability and cannot expose auditable reasoning.",
      "Caching can reduce cost for repeated content but inference is never free."
    ],
    services: [],
    tags: ["cross-domain performance", "business value"]
  },
  {
    id: "2.2-027",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "An insurance company needs to predict, from 10 years of structured policy and claim records, the probability that a policyholder will file a claim next year. Which approach is MOST appropriate?",
    options: [
      "Prompt a large language model to guess a probability for each policyholder",
      "Build a supervised classification model with Amazon SageMaker AI using the historical tabular data",
      "Use a text-to-image foundation model on Amazon Bedrock",
      "Use Amazon Bedrock Knowledge Bases to retrieve policy documents and let the model answer"
    ],
    answer: [1],
    explanation: "Predicting a numeric probability from labeled historical tabular data is a classic supervised learning problem, best solved with a trained classification model that can be evaluated with standard metrics and monitored over time. This item tests recognizing when generative AI is the wrong tool.",
    rationales: [
      "An LLM has no calibrated probability estimate for this company's policyholders and cannot be validated the same way.",
      "",
      "Image generation is unrelated to numeric risk prediction.",
      "Retrieval over documents answers questions about text; it does not produce statistical predictions."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["when not to use genai", "supervised learning"]
  },
  {
    id: "2.2-028",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "easy",
    stem: "A logistics company needs to extract printed addresses and table data from millions of scanned paper shipping manifests. Which AWS service is the MOST appropriate choice?",
    options: [
      "Amazon Textract",
      "Amazon Comprehend",
      "Amazon Transcribe",
      "Amazon Translate"
    ],
    answer: [0],
    explanation: "Amazon Textract extracts text, forms, and tables from scanned documents and images, which is exactly this requirement and needs no generative model. Comprehend analyzes text that has already been extracted, Transcribe converts speech to text, and Translate converts text between languages.",
    rationales: [
      "",
      "Comprehend performs NLP such as entity and sentiment analysis on existing text.",
      "Transcribe handles audio, not scanned paper documents.",
      "Translate converts languages and does not read scanned images."
    ],
    services: ["Amazon Textract"],
    tags: ["ai services", "when not to use genai"]
  },
  {
    id: "2.2-029",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A support organization wants to classify incoming emails by sentiment and detect customer names and account numbers, with no custom model training. Which service meets this requirement with the LEAST operational overhead?",
    options: [
      "Amazon Kendra",
      "Amazon Comprehend",
      "Amazon Polly",
      "Amazon Rekognition"
    ],
    answer: [1],
    explanation: "Amazon Comprehend provides pre-trained natural language processing for sentiment analysis, entity recognition, and detection of personally identifiable information, so no training work is required. Kendra performs enterprise search, Polly synthesizes speech, and Rekognition analyzes images and video.",
    rationales: [
      "Kendra searches and ranks documents rather than classifying sentiment.",
      "",
      "Polly converts text into spoken audio.",
      "Rekognition analyzes visual content, not email text."
    ],
    services: ["Amazon Comprehend"],
    tags: ["ai services", "nlp"]
  },
  {
    id: "2.2-030",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A software company wants an assistant that answers employee questions using content in its internal wiki, Amazon S3, and ticketing system, with enterprise permissions respected and minimal development work. Which AWS service is the BEST fit?",
    options: [
      "Amazon Q Business",
      "Amazon Q Developer",
      "Amazon SageMaker Canvas",
      "Amazon Bedrock Flows"
    ],
    answer: [0],
    explanation: "Amazon Q Business is a managed generative AI assistant that connects to enterprise data sources, respects existing access permissions, and requires no custom application build. Amazon Q Developer assists with coding and AWS tasks, SageMaker Canvas is a no-code ML modeling tool, and Bedrock Flows orchestrates generative AI workflows that you design yourself.",
    rationales: [
      "",
      "Amazon Q Developer targets software development and AWS operations, not enterprise knowledge search.",
      "SageMaker Canvas builds predictive ML models without code; it is not an enterprise assistant.",
      "Bedrock Flows requires you to build and connect the workflow components."
    ],
    services: ["Amazon Q Business"],
    tags: ["amazon q", "build vs buy"]
  },
  {
    id: "2.2-031",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A hospital deploys a generative AI assistant that drafts patient discharge instructions. Because incorrect instructions could harm patients, the hospital must add a clinician review step before any document is released. Which AWS capability supports this human review workflow?",
    options: [
      "SageMaker Feature Store",
      "SageMaker Autopilot",
      "AWS AI Service Cards",
      "Amazon Augmented AI (A2I)"
    ],
    answer: [3],
    explanation: "Amazon Augmented AI (A2I) builds human review workflows into machine learning and AI predictions so people can verify or correct output before it is used. Keeping a human in the loop is the standard mitigation for high-stakes generative AI output. Feature Store manages ML features, Autopilot automates model building, and AI Service Cards document service characteristics.",
    rationales: [
      "Feature Store stores and serves ML features for training and inference.",
      "Autopilot automatically trains and tunes candidate models on tabular data.",
      "AI Service Cards provide transparency documentation, not a review workflow.",
      ""
    ],
    services: ["Amazon Augmented AI (A2I)"],
    tags: ["human in the loop", "risk mitigation"]
  },
  {
    id: "2.2-032",
    domain: 2,
    task: "2.2",
    type: "ordering",
    difficulty: "medium",
    stem: "A retail company is running a structured evaluation to choose a foundation model for product description generation. Place the steps in the correct order.",
    options: [
      "Compare candidate models on quality, latency, and cost using the same test set",
      "Define the business requirement and the quality criteria for an acceptable description",
      "Select the model that meets the quality bar at the lowest cost and deploy a limited pilot",
      "Build a representative test set of products and reference descriptions"
    ],
    answer: [1, 3, 0, 2],
    explanation: "Sound model selection starts with the business requirement and explicit quality criteria, then builds a representative test set so comparisons are meaningful. Only after candidates are scored on the same data can quality be weighed against latency and cost, leading to a pilot deployment. Choosing a model before defining success leads to rework.",
    rationales: [],
    services: ["Amazon Bedrock Model Evaluation"],
    tags: ["model selection", "evaluation"]
  },
  {
    id: "2.2-033",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "hard",
    stem: "A company plans to fine-tune a foundation model using customer support transcripts that contain names, email addresses, and payment card numbers. Which risk is MOST directly created by this plan?",
    options: [
      "The model may reproduce sensitive customer information in responses to other users",
      "The model will no longer be able to answer general questions in any domain",
      "Fine-tuning will make the model deterministic and unable to vary phrasing",
      "The fine-tuned model can no longer be evaluated for accuracy"
    ],
    answer: [0],
    explanation: "Training on unredacted records creates data leakage risk, because a customized model can surface memorized sensitive details in later outputs. The mitigation is to redact or tokenize personal data before customization and to add sensitive information filters in Amazon Bedrock Guardrails. Fine-tuning can narrow general ability somewhat, but it does not remove it, make output deterministic, or block evaluation.",
    rationales: [
      "",
      "Fine-tuning can shift behavior toward the task but does not eliminate general capability.",
      "Determinism depends on inference settings, not on whether the model was fine-tuned.",
      "Customized models can and should be evaluated with held-out test data."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["data leakage", "fine-tuning"]
  },
  {
    id: "2.2-034",
    domain: 2,
    task: "2.2",
    type: "multi",
    difficulty: "medium",
    stem: "A design agency wants to generate marketing images with a foundation model but is concerned that generated art could resemble protected works and create legal exposure. Which actions MOST directly address this concern? (Select TWO.)",
    options: [
      "Increase the image resolution setting",
      "Review the model provider's usage terms and any indemnification coverage before adopting the model",
      "Lower the temperature parameter for image generation",
      "Add a legal review of generated assets before they are published",
      "Generate more images per prompt so there are more options"
    ],
    answer: [1, 3],
    explanation: "Intellectual property exposure is a legal and governance risk, so it is managed through provider terms, available indemnification, usage policies, and human legal review before assets are published. Technical settings such as resolution, sampling parameters, or output count do not change copyright risk.",
    rationales: [
      "Higher resolution changes image quality, not IP risk.",
      "",
      "Sampling settings alter variability, not the legal status of an output.",
      "",
      "More candidate images does not reduce the chance that one resembles a protected work."
    ],
    services: [],
    tags: ["ip and copyright", "governance"]
  },
  {
    id: "2.2-035",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "easy",
    stem: "A startup with two developers and no ML infrastructure wants a customer-facing generative AI feature live this quarter. Which build versus buy decision BEST matches its constraints?",
    options: [
      "Pre-train a foundation model from scratch on public web data",
      "Consume a managed foundation model through the Amazon Bedrock API",
      "Purchase and colocate GPU servers to host a model in a data center",
      "Hire a research team to design a new model architecture"
    ],
    answer: [1],
    explanation: "Buying access to a managed foundation model gives a small team production capability without training data, GPU capacity, or ML research skills. Pre-training from scratch or standing up hardware costs millions of dollars and months of effort, which no two-person team can absorb in a quarter.",
    rationales: [
      "Pre-training a foundation model requires enormous data, compute, and expertise.",
      "",
      "Buying and colocating GPUs adds capital cost and operational burden.",
      "Building a research team cannot deliver a feature within the quarter."
    ],
    services: ["Amazon Bedrock"],
    tags: ["build vs buy", "speed to market"]
  },
  {
    id: "2.2-036",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "hard",
    stem: "A payments company runs a generative AI assistant with steady, predictable traffic of about 400 requests per second all day and needs consistent throughput guarantees. Which Amazon Bedrock option BEST controls cost and performance for this profile?",
    options: [
      "On-demand inference only, because it is always the cheapest option",
      "Provisioned Throughput, which reserves capacity for predictable high-volume workloads",
      "Batch inference submitted once per hour",
      "Deploying the model to a public web server without capacity planning"
    ],
    answer: [1],
    explanation: "Provisioned Throughput reserves model capacity for a committed term, which suits sustained, predictable high volume and provides consistent throughput at a known price. On-demand pricing is better for variable or low traffic; at constant heavy load a reservation is typically more economical. Batch inference does not fit interactive assistants.",
    rationales: [
      "On-demand is best for spiky or low traffic; at constant heavy volume it can cost more and offers no reserved throughput.",
      "",
      "Hourly batch jobs cannot serve real-time assistant requests.",
      "Skipping capacity planning is not an Amazon Bedrock option and would not guarantee throughput."
    ],
    services: ["Amazon Bedrock"],
    tags: ["cost", "throughput"]
  },
  {
    id: "2.2-037",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A retail chain wants a system that recommends products to individual shoppers based on their browsing and purchase history. The team has no ML specialists. Which service is purpose-built for this requirement?",
    options: [
      "Amazon Bedrock Agents",
      "Amazon Lex",
      "Amazon Personalize",
      "Amazon Comprehend"
    ],
    answer: [2],
    explanation: "Amazon Personalize is a managed service built for real-time personalization and recommendations from user interaction data, so it fits better than a general generative model. Bedrock Agents orchestrate multi-step generative tasks, Lex builds conversational interfaces, and Comprehend analyzes text.",
    rationales: [
      "Agents orchestrate API calls and reasoning steps; they are not a recommendation engine.",
      "Lex handles dialog management for chat and voice bots.",
      "",
      "Comprehend extracts insight from text, not personalized product rankings."
    ],
    services: ["Amazon Personalize"],
    tags: ["ai services", "when not to use genai"]
  },
  {
    id: "2.2-038",
    domain: 2,
    task: "2.2",
    type: "multi",
    difficulty: "medium",
    stem: "A company must decide whether a generative AI approach or a traditional deterministic approach fits each requirement. For which requirements is generative AI the WRONG tool? (Select TWO.)",
    options: [
      "Producing an exact monthly account balance from transaction records",
      "Enforcing a validation rule that a submitted postal code matches a fixed pattern",
      "Drafting a personalized onboarding email for each new customer",
      "Summarizing the main themes across thousands of open-ended survey comments",
      "Rewriting technical release notes in plain language for non-technical readers"
    ],
    answer: [0, 1],
    explanation: "Tasks requiring exact computation or strict rule enforcement should use deterministic code or database logic, since generative output varies and cannot guarantee arithmetic or pattern correctness. Drafting, summarizing, and rewriting open-ended language are natural strengths of generative models.",
    rationales: [
      "",
      "",
      "Personalized drafting from customer attributes is a strong generative AI use case.",
      "Thematic summarization of unstructured comments suits generative models well.",
      "Rewriting for a different audience is a language transformation task generative AI handles well."
    ],
    services: [],
    tags: ["when not to use genai", "use case fit"]
  },
  {
    id: "2.2-039",
    domain: 2,
    task: "2.2",
    type: "single",
    difficulty: "medium",
    stem: "A media company measures its generative AI captioning feature and finds the model produces good captions but each request costs more than expected because the prompt includes 20 long few-shot examples. Which change reduces cost with the least quality risk?",
    options: [
      "Switch to a much larger model with a bigger context window",
      "Trim the prompt to the few examples that measurably improve output and re-evaluate quality",
      "Remove all instructions from the prompt",
      "Increase the maximum output tokens to reduce the number of calls"
    ],
    answer: [1],
    explanation: "Input tokens are billed, so long prompts raise cost on every request. Pruning few-shot examples down to the ones that demonstrably help, then re-measuring quality, reduces token spend while protecting output. A larger model raises cost, stripping instructions degrades quality, and a higher output limit increases output tokens rather than reducing calls.",
    rationales: [
      "Larger models generally cost more per token, which worsens the problem.",
      "",
      "Removing instructions damages output quality and consistency.",
      "Allowing longer responses increases billed output tokens."
    ],
    services: ["Amazon Bedrock"],
    tags: ["cost per token", "prompt engineering"]
  },
  {
    id: "2.2-040",
    domain: 2,
    task: "2.2",
    type: "ordering",
    difficulty: "hard",
    stem: "A public sector agency is moving a generative AI assistant from idea to production. Place the phases in the correct order.",
    options: [
      "Deploy to production with guardrails, human review, and monitoring of quality and cost",
      "Identify the business problem and confirm that generative AI is the right tool for it",
      "Run a limited pilot with real users and measure business metrics against the baseline",
      "Select and evaluate candidate foundation models against the defined success criteria"
    ],
    answer: [1, 3, 2, 0],
    explanation: "Value comes from confirming the problem fits generative AI before any model work, then evaluating candidate models against defined criteria, piloting with real users to measure business impact, and only then deploying broadly with guardrails, human review, and ongoing monitoring. Skipping the fit assessment is the most common source of failed generative AI projects.",
    rationales: [],
    services: ["Amazon Bedrock"],
    tags: ["genai lifecycle", "business value"]
  }

);
