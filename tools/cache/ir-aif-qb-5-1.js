window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "5.1-001",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "easy",
    stem: "Under the AWS shared responsibility model, which task remains the customer's responsibility when using Amazon Bedrock?",
    options: [
      "Patching the physical servers that host foundation models",
      "Configuring IAM policies that control which users can invoke which models",
      "Maintaining the physical security of AWS data centers",
      "Applying security patches to the Bedrock service infrastructure"
    ],
    answer: [1],
    explanation: "AWS is responsible for security of the cloud, including physical facilities and the managed service infrastructure. The customer is responsible for security in the cloud, which for Bedrock includes identity and access management, data protection choices, and how the application uses the service.",
    rationales: [
      "Physical server patching is part of AWS responsibility for the underlying infrastructure.",
      "",
      "Data center physical security is entirely an AWS responsibility.",
      "Patching the managed service infrastructure is handled by AWS."
    ],
    services: ["Amazon Bedrock"],
    tags: ["shared responsibility", "iam"]
  },
  {
    id: "5.1-002",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "A company must ensure traffic between its VPC and Amazon Bedrock never traverses the public internet. Which approach meets this requirement?",
    options: [
      "Attach an internet gateway to the VPC",
      "Create a VPC endpoint powered by AWS PrivateLink for Amazon Bedrock",
      "Use a NAT gateway for all Bedrock requests",
      "Enable server-side encryption on the S3 bucket holding prompts"
    ],
    answer: [1],
    explanation: "An interface VPC endpoint backed by AWS PrivateLink provides private connectivity from a VPC to a supported AWS service, keeping traffic on the AWS network. Internet and NAT gateways both route traffic to the public internet, and S3 encryption protects stored objects rather than network paths.",
    rationales: [
      "An internet gateway is exactly what sends traffic to the public internet.",
      "",
      "A NAT gateway still routes outbound traffic over the internet.",
      "Encryption at rest protects stored data; it does not change the network path."
    ],
    services: ["Amazon Bedrock", "AWS PrivateLink"],
    tags: ["vpc endpoint", "network security"]
  },
  {
    id: "5.1-003",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "easy",
    stem: "Which AWS service should be used to record who called which Amazon Bedrock API and when, for security auditing?",
    options: [
      "Amazon CloudWatch Logs",
      "AWS CloudTrail",
      "AWS Config",
      "Amazon Inspector"
    ],
    answer: [1],
    explanation: "AWS CloudTrail records API activity across AWS services, capturing the identity, action, time, and source IP, which is the standard answer for auditing who did what. CloudWatch collects operational metrics and application logs, Config tracks resource configuration state, and Inspector scans for software vulnerabilities.",
    rationales: [
      "CloudWatch Logs stores application and service log output, not an authoritative API audit trail.",
      "",
      "AWS Config records configuration changes and compliance state, not per-call API identity.",
      "Inspector performs vulnerability assessments on workloads."
    ],
    services: ["AWS CloudTrail"],
    tags: ["auditing", "cloudtrail"]
  },
  {
    id: "5.1-004",
    domain: 5,
    task: "5.1",
    type: "multi",
    difficulty: "medium",
    stem: "A team stores training data containing customer records in Amazon S3. Which two controls best protect this data at rest and limit exposure? (Select TWO.)",
    options: [
      "Enable server-side encryption with an AWS KMS customer managed key",
      "Enable S3 Block Public Access on the bucket",
      "Increase the S3 bucket's storage class to S3 Standard-IA",
      "Enable S3 Transfer Acceleration",
      "Turn on S3 Requester Pays"
    ],
    answer: [0, 1],
    explanation: "Encryption with a KMS key protects the objects at rest and lets you control and audit key usage, while Block Public Access prevents any policy or ACL from unintentionally exposing the bucket publicly. Storage class, acceleration, and Requester Pays affect cost and transfer behavior, not security posture.",
    rationales: [
      "",
      "",
      "Storage class changes cost and retrieval characteristics, not protection.",
      "Transfer Acceleration speeds uploads over long distances; it is not a security control.",
      "Requester Pays shifts data transfer billing and does not restrict access."
    ],
    services: ["Amazon S3", "AWS KMS"],
    tags: ["encryption", "s3", "data protection"]
  },
  {
    id: "5.1-005",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "A company wants to discover whether any of its S3 buckets used for machine learning contain personally identifiable information. Which service is purpose-built for this?",
    options: [
      "Amazon Macie",
      "Amazon Comprehend",
      "AWS Config",
      "Amazon GuardDuty"
    ],
    answer: [0],
    explanation: "Amazon Macie uses machine learning and pattern matching to discover and classify sensitive data such as PII in Amazon S3 at scale, and reports findings. Comprehend can detect PII entities within text you pass to it, but Macie is the service designed to scan S3 estates for sensitive data discovery.",
    rationales: [
      "",
      "Comprehend analyzes text you submit; it does not inventory and scan S3 buckets on its own.",
      "AWS Config evaluates resource configuration compliance, not object contents.",
      "GuardDuty detects malicious activity and unauthorized behavior, not sensitive data classification."
    ],
    services: ["Amazon Macie"],
    tags: ["sensitive data discovery", "macie"]
  },
  {
    id: "5.1-006",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "hard",
    stem: "An attacker submits input designed to make a customer support assistant ignore its system instructions and reveal internal pricing rules. Which combination of mitigations is most appropriate?",
    options: [
      "Increase the model's temperature and reduce max tokens",
      "Validate and delimit untrusted input, apply Amazon Bedrock Guardrails, and never place secrets in the system prompt",
      "Move the endpoint to a different AWS Region",
      "Switch from on-demand to Provisioned Throughput"
    ],
    answer: [1],
    explanation: "Prompt injection is mitigated in layers: treat user content as untrusted and clearly delimit it, enforce content and topic policy with Guardrails, apply least privilege to any tools the model can call, and keep genuine secrets out of prompts entirely since a sufficiently determined prompt may surface them.",
    rationales: [
      "Sampling parameters do not prevent an instruction-override attack.",
      "",
      "Region choice affects residency and latency, not adversarial input handling.",
      "Capacity mode is a pricing and throughput decision with no security effect."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["prompt injection", "threats"]
  },
  {
    id: "5.1-007",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "Which IAM practice best reflects least privilege for a data scientist who only needs to invoke one specific foundation model in Amazon Bedrock?",
    options: [
      "Attach the AdministratorAccess managed policy",
      "Grant an IAM role a policy allowing bedrock:InvokeModel scoped to that model's ARN",
      "Share long-lived IAM user access keys across the team",
      "Grant bedrock:* on all resources"
    ],
    answer: [1],
    explanation: "Least privilege means granting only the actions required on only the resources required, so an identity-based policy allowing the specific invoke action against the specific model ARN is correct. Administrator access, wildcard service permissions, and shared long-lived credentials all violate the principle.",
    rationales: [
      "Administrator access grants far more than the task requires.",
      "",
      "Shared long-lived keys break individual accountability and are hard to rotate.",
      "A service-wide wildcard permits every Bedrock action on every resource."
    ],
    services: ["AWS Identity and Access Management (IAM)", "Amazon Bedrock"],
    tags: ["least privilege", "iam"]
  },
  {
    id: "5.1-008",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "A regulated customer asks whether their prompts and completions sent to Amazon Bedrock are used to train the underlying base foundation models. What is accurate?",
    options: [
      "All customer inputs are automatically added to base model training data",
      "Customer content submitted to Amazon Bedrock is not used to train the underlying base foundation models and is not shared with model providers",
      "Customer data is used for training unless Provisioned Throughput is purchased",
      "Customer data is used for training only in non-production accounts"
    ],
    answer: [1],
    explanation: "Amazon Bedrock does not use customer prompts and completions to train the underlying base foundation models, and does not share that content with third-party model providers. This data privacy posture is a common reason regulated customers select Bedrock, and it does not depend on the pricing mode.",
    rationales: [
      "Inputs are not automatically added to base model training data.",
      "",
      "The posture does not depend on purchasing Provisioned Throughput.",
      "The posture does not vary by whether the account is production or not."
    ],
    services: ["Amazon Bedrock"],
    tags: ["data privacy", "bedrock"]
  },
  {
    id: "5.1-009",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "A company must retain a record of every prompt and response processed by Amazon Bedrock for internal investigation. Which capability provides this?",
    options: [
      "Bedrock model invocation logging to Amazon CloudWatch Logs or Amazon S3",
      "AWS CloudTrail data events only",
      "Amazon Bedrock Guardrails denied topics",
      "SageMaker Model Monitor data capture"
    ],
    answer: [0],
    explanation: "Amazon Bedrock model invocation logging captures request and response content and delivers it to Amazon CloudWatch Logs, Amazon S3, or both, which is what an investigation into actual model content requires. CloudTrail records that an API call happened and by whom, but is not the mechanism for full prompt and completion content.",
    rationales: [
      "",
      "CloudTrail records API activity metadata rather than serving as the content logging feature.",
      "Denied topics block subject matter; they do not record traffic.",
      "SageMaker data capture applies to SageMaker endpoints, not Bedrock invocations."
    ],
    services: ["Amazon Bedrock", "Amazon CloudWatch"],
    tags: ["logging", "bedrock"]
  },
  {
    id: "5.1-010",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "easy",
    stem: "Which AWS service securely stores and rotates database credentials that an ML application needs at runtime?",
    options: [
      "AWS Secrets Manager",
      "Amazon S3",
      "AWS CloudTrail",
      "Amazon EBS"
    ],
    answer: [0],
    explanation: "AWS Secrets Manager stores secrets such as database credentials and API keys, encrypts them with AWS KMS, controls access through IAM, and supports automatic rotation. Storing credentials in S3 objects, log files, or code is the anti-pattern this service exists to eliminate.",
    rationales: [
      "",
      "S3 is object storage and offers no secret rotation or purpose-built credential handling.",
      "CloudTrail records API activity; it does not store application secrets.",
      "EBS provides block storage volumes for EC2 instances."
    ],
    services: ["AWS Secrets Manager"],
    tags: ["secrets", "credentials"]
  },
  {
    id: "5.1-011",
    domain: 5,
    task: "5.1",
    type: "multi",
    difficulty: "hard",
    stem: "A security team is enumerating threats specific to machine learning systems. Which two are genuine ML-specific attack types? (Select TWO.)",
    options: [
      "Data poisoning, where an attacker corrupts training data to alter model behavior",
      "Model inversion, where an attacker reconstructs sensitive training data from model outputs",
      "Cross-site scripting in the training job console",
      "Disk fragmentation on the training instance",
      "TLS certificate expiry on the endpoint"
    ],
    answer: [0, 1],
    explanation: "Data poisoning targets the training pipeline by injecting crafted examples that change what the model learns, and model inversion attempts to recover sensitive training data by probing the model. The remaining options are generic web, storage, and certificate operational issues rather than ML-specific attacks.",
    rationales: [
      "",
      "",
      "Cross-site scripting is a general web application vulnerability, not ML specific.",
      "Disk fragmentation is a performance concern, not a security attack.",
      "Certificate expiry causes an availability or trust failure but is not an ML attack."
    ],
    services: [],
    tags: ["threats", "data poisoning", "model inversion"]
  },
  {
    id: "5.1-012",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "A SageMaker training job processes highly sensitive data and must not have any internet connectivity. Which configuration achieves this?",
    options: [
      "Run the training job with network isolation enabled and within a VPC with no internet route",
      "Run the training job on a larger instance type",
      "Enable Amazon S3 versioning on the input bucket",
      "Use a spot instance for the training job"
    ],
    answer: [0],
    explanation: "SageMaker supports network isolation for training jobs, which prevents the training container from making outbound network calls, and jobs can be launched into a customer VPC with private subnets and VPC endpoints so no internet path exists. Instance size, versioning, and purchase option have no bearing on network exposure.",
    rationales: [
      "",
      "Instance type affects compute capacity and cost, not network reachability.",
      "Versioning protects against accidental overwrite; it is not network control.",
      "Spot is a pricing model for interruptible capacity."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["network isolation", "training security"]
  },
  {
    id: "5.1-013",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "Which practice best prevents sensitive customer data from leaking into a foundation model's responses through the application's own prompts?",
    options: [
      "Increase the model's context window",
      "Redact or tokenize sensitive fields before including any data in the prompt",
      "Use a smaller foundation model",
      "Enable response streaming"
    ],
    answer: [1],
    explanation: "Whatever is placed in a prompt can appear in a response or in logs, so sensitive values should be removed, masked, or replaced with tokens before the prompt is constructed. Bedrock Guardrails sensitive information filters can add a second layer by redacting PII in prompts and responses.",
    rationales: [
      "A larger context window lets you send more data, which increases rather than reduces exposure.",
      "",
      "Model size does not determine whether sensitive input is echoed back.",
      "Streaming changes delivery of tokens, not what data was sent."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["data leakage", "pii"]
  },
  {
    id: "5.1-014",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "easy",
    stem: "Which AWS service provides on-demand access to AWS compliance reports such as SOC and ISO certifications?",
    options: [
      "AWS Artifact",
      "AWS Config",
      "AWS Audit Manager",
      "Amazon Inspector"
    ],
    answer: [0],
    explanation: "AWS Artifact is the self-service portal for downloading AWS compliance reports and agreements, including SOC reports and ISO certifications. Audit Manager helps you collect evidence about your own workloads, Config tracks configuration compliance, and Inspector scans for vulnerabilities.",
    rationales: [
      "",
      "AWS Config evaluates whether your resources comply with configuration rules.",
      "Audit Manager automates evidence collection for your own audits, not AWS's certifications.",
      "Inspector performs automated vulnerability assessments on workloads."
    ],
    services: ["AWS Artifact"],
    tags: ["compliance reports", "artifact"]
  },
  {
    id: "5.1-015",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "Which statement about encryption for machine learning workloads on AWS is accurate?",
    options: [
      "Encryption in transit is handled by TLS, and encryption at rest is commonly handled with AWS KMS keys",
      "Encryption at rest is unnecessary when data is stored in a private VPC",
      "AWS KMS encrypts network traffic between services",
      "TLS protects stored objects in Amazon S3"
    ],
    answer: [0],
    explanation: "TLS protects data moving between clients and services, while AWS KMS manages keys used to encrypt data at rest in services such as Amazon S3, Amazon EBS, and SageMaker volumes. The two protect different states of data and both are typically required.",
    rationales: [
      "",
      "A private network does not encrypt stored data; at-rest encryption is still required.",
      "KMS manages keys for data at rest; network encryption is provided by TLS.",
      "TLS protects data in transit, not objects sitting in storage."
    ],
    services: ["AWS KMS"],
    tags: ["encryption", "fundamentals"]
  },
  {
    id: "5.1-016",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "hard",
    stem: "An organization wants to give a Bedrock agent the ability to call an internal order API, while limiting the damage if the model is manipulated. Which control is most important?",
    options: [
      "Grant the agent's execution role permission only to the specific read actions it needs, and require human approval for state-changing calls",
      "Give the agent full administrative permissions so it never fails a request",
      "Increase the agent's maximum token limit",
      "Disable CloudTrail logging to reduce noise"
    ],
    answer: [0],
    explanation: "An agent acts with the permissions of its execution role, so scoping that role narrowly limits the blast radius of a successful prompt injection, and requiring human approval before irreversible actions provides a second gate. Broad permissions, larger token limits, and disabled logging all increase risk.",
    rationales: [
      "",
      "Administrative permissions turn any successful manipulation into a full compromise.",
      "Token limits affect response length, not authorization scope.",
      "Disabling CloudTrail removes the audit trail needed to investigate an incident."
    ],
    services: ["Amazon Bedrock Agents", "AWS Identity and Access Management (IAM)"],
    tags: ["agents", "least privilege", "blast radius"]
  },
  {
    id: "5.1-017",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "Which AWS capability simplifies creating scoped IAM roles for machine learning personas such as data scientists and MLOps engineers?",
    options: [
      "Amazon SageMaker Role Manager",
      "AWS Secrets Manager",
      "Amazon SageMaker Feature Store",
      "AWS Artifact"
    ],
    answer: [0],
    explanation: "Amazon SageMaker Role Manager provides guided creation of IAM roles based on common ML personas and activities, producing least-privilege permissions without hand-writing policies. The other services manage secrets, features, and compliance documents.",
    rationales: [
      "",
      "Secrets Manager stores and rotates credentials, not role definitions for ML personas.",
      "Feature Store manages engineered features for training and inference.",
      "Artifact provides AWS compliance reports."
    ],
    services: ["Amazon SageMaker AI"],
    tags: ["iam", "role manager"]
  },
  {
    id: "5.1-018",
    domain: 5,
    task: "5.1",
    type: "multi",
    difficulty: "medium",
    stem: "A company is documenting data lineage for its training datasets to satisfy an internal review. Which two AWS capabilities support cataloging and tracking data sources? (Select TWO.)",
    options: [
      "AWS Glue Data Catalog for centralized metadata about datasets and their schemas",
      "Amazon SageMaker Model Cards to record which datasets a model was trained on",
      "Amazon CloudFront for content delivery of datasets",
      "AWS Shield for DDoS protection of the data lake",
      "Amazon Route 53 for DNS resolution of data sources"
    ],
    answer: [0, 1],
    explanation: "The Glue Data Catalog holds centralized metadata describing datasets, their schemas, and locations, which underpins lineage and discovery. Model Cards record the datasets and preparation behind a specific model. CloudFront, Shield, and Route 53 address delivery, DDoS protection, and DNS.",
    rationales: [
      "",
      "",
      "CloudFront is a content delivery network, unrelated to data lineage.",
      "Shield protects against DDoS attacks and records no lineage.",
      "Route 53 provides DNS services."
    ],
    services: ["AWS Glue", "Amazon SageMaker Model Cards"],
    tags: ["data lineage", "cataloging"]
  },
  {
    id: "5.1-019",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "A model endpoint must only be reachable by an internal application and never from the public internet. Which control most directly enforces this?",
    options: [
      "Deploy the endpoint in a VPC and restrict access with security groups and a VPC endpoint",
      "Enable encryption at rest on the model artifact",
      "Apply a Bedrock guardrail to the endpoint",
      "Use a longer model name to obscure the endpoint"
    ],
    answer: [0],
    explanation: "Network reachability is controlled with VPC placement, security groups acting as stateful firewalls, and private endpoints, which together ensure only permitted internal sources can reach the endpoint. Encryption, content guardrails, and naming do not restrict who can connect.",
    rationales: [
      "",
      "At-rest encryption protects stored artifacts, not network access.",
      "Guardrails filter content on generative requests; they do not control connectivity.",
      "Obscuring a name provides no access control and is security through obscurity."
    ],
    services: ["Amazon VPC", "Amazon SageMaker AI"],
    tags: ["network security", "vpc"]
  },
  {
    id: "5.1-020",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "easy",
    stem: "Which service continuously monitors AWS resource configurations and evaluates them against desired rules?",
    options: [
      "AWS Config",
      "AWS CloudTrail",
      "Amazon Macie",
      "AWS Secrets Manager"
    ],
    answer: [0],
    explanation: "AWS Config records configuration state and history for AWS resources and continuously evaluates them against rules, flagging non-compliant resources. CloudTrail records API calls, Macie discovers sensitive data, and Secrets Manager stores credentials.",
    rationales: [
      "",
      "CloudTrail answers who called what, not whether a resource is configured compliantly.",
      "Macie classifies sensitive data in Amazon S3.",
      "Secrets Manager stores and rotates secrets."
    ],
    services: ["AWS Config"],
    tags: ["configuration compliance", "config"]
  },
  {
    id: "5.1-021",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "hard",
    stem: "A competitor repeatedly queries a company's public prediction API to reconstruct an equivalent model. Which threat is this, and which mitigation is most relevant?",
    options: [
      "Data poisoning, mitigated by validating training data sources",
      "Model extraction or theft, mitigated by rate limiting, authentication, and monitoring for abnormal query patterns",
      "Prompt injection, mitigated by delimiting untrusted input",
      "Overfitting, mitigated by regularization"
    ],
    answer: [1],
    explanation: "Systematically probing an inference API to replicate a model is model extraction or model theft. Mitigations are access controls, authentication, throttling, and detecting anomalous query volume or patterns, since each individual request looks legitimate.",
    rationales: [
      "Poisoning corrupts training data; here the training pipeline is untouched.",
      "",
      "Prompt injection manipulates instructions rather than replicating the model.",
      "Overfitting is a generalization problem, not an attack."
    ],
    services: [],
    tags: ["model theft", "threats"]
  },
  {
    id: "5.1-022",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "Which statement about IAM roles versus IAM users is most accurate for machine learning workloads on AWS?",
    options: [
      "IAM users are preferred because their access keys never expire",
      "IAM roles provide temporary credentials and are preferred for applications and services such as SageMaker training jobs",
      "IAM roles cannot be assumed by AWS services",
      "IAM users and roles are functionally identical"
    ],
    answer: [1],
    explanation: "IAM roles deliver short-lived, automatically rotated credentials and can be assumed by AWS services, which is why SageMaker training jobs, Bedrock agents, and Lambda functions use execution roles. Long-lived IAM user access keys are harder to rotate and are a common source of credential leakage.",
    rationales: [
      "Non-expiring access keys are a liability, not an advantage.",
      "",
      "AWS services routinely assume roles; that is the standard execution model.",
      "They differ meaningfully in credential lifetime and how they are assumed."
    ],
    services: ["AWS Identity and Access Management (IAM)"],
    tags: ["iam", "roles"]
  },
  {
    id: "5.1-023",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "A company must document where each training dataset came from and confirm it had the right to use it. Which practice addresses this?",
    options: [
      "Recording data provenance, source citation, and licensing terms for each dataset",
      "Compressing datasets before storage",
      "Increasing the retention period on CloudWatch Logs",
      "Enabling multi-AZ deployment for the training cluster"
    ],
    answer: [0],
    explanation: "Documenting where data originated, how it was collected, and under what license or consent it may be used is the practice that answers a rights and provenance question, and it also supports lineage and audit. Compression, log retention, and availability configuration address unrelated concerns.",
    rationales: [
      "",
      "Compression reduces storage size and says nothing about rights or origin.",
      "Log retention affects how long operational logs persist.",
      "Multi-AZ improves availability, not data rights documentation."
    ],
    services: [],
    tags: ["data governance", "provenance"]
  },
  {
    id: "5.1-024",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "Which AWS service helps automate the collection of evidence needed to demonstrate compliance with a framework such as HIPAA or PCI DSS for your own workloads?",
    options: [
      "AWS Audit Manager",
      "AWS Artifact",
      "Amazon Inspector",
      "AWS Trusted Advisor"
    ],
    answer: [0],
    explanation: "AWS Audit Manager continuously collects evidence from your AWS environment and maps it to controls in prebuilt or custom frameworks, producing audit-ready reports about your workloads. AWS Artifact instead supplies AWS's own compliance certifications for download.",
    rationales: [
      "",
      "Artifact provides AWS's certifications and agreements, not evidence about your workloads.",
      "Inspector performs vulnerability scanning of compute workloads.",
      "Trusted Advisor gives best-practice recommendations across cost, performance, and security."
    ],
    services: ["AWS Audit Manager"],
    tags: ["compliance", "audit manager"]
  },
  {
    id: "5.1-025",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "easy",
    stem: "Which of the following is the best description of defense in depth for an AI application?",
    options: [
      "Relying entirely on the foundation model provider's built-in safety training",
      "Applying multiple independent layers such as identity controls, network isolation, input validation, guardrails, logging, and human review",
      "Encrypting data at rest and considering the system secure",
      "Restricting the application to a single AWS Region"
    ],
    answer: [1],
    explanation: "Defense in depth assumes any single control can fail, so protections are layered across identity, network, application, content, and process so that a bypass at one layer is caught at another. Relying on one control, whether provider safety training or encryption alone, leaves single points of failure.",
    rationales: [
      "Provider safety training is one layer and can be circumvented by determined inputs.",
      "",
      "Encryption addresses confidentiality of stored data only.",
      "Region restriction is a residency decision, not a layered security strategy."
    ],
    services: [],
    tags: ["defense in depth", "security design"]
  },
  {
    id: "5.1-026",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "hard",
    stem: "A company fine-tunes a model on internal documents. A reviewer worries the model could reproduce confidential paragraphs verbatim when prompted. Which control most directly reduces this risk?",
    options: [
      "Curating the fine-tuning dataset to exclude confidential content and applying output filters for sensitive information",
      "Deploying the model behind a load balancer",
      "Increasing the number of fine-tuning epochs",
      "Storing the model artifact in a different S3 bucket"
    ],
    answer: [0],
    explanation: "Memorization risk comes from what enters the training set, so excluding confidential material is the primary control, with Guardrails sensitive information filters providing a runtime backstop on outputs. Additional epochs increase memorization, and infrastructure changes do not affect what the model learned.",
    rationales: [
      "",
      "A load balancer distributes traffic and has no effect on model memorization.",
      "More epochs increase the likelihood of verbatim memorization.",
      "Where the artifact is stored does not change the model's learned content."
    ],
    services: ["Amazon Bedrock Guardrails"],
    tags: ["data leakage", "fine-tuning"]
  },
  {
    id: "5.1-027",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "Which service provides automated vulnerability scanning for Amazon EC2 instances and container images used in an ML pipeline?",
    options: [
      "Amazon Inspector",
      "Amazon Macie",
      "AWS Config",
      "AWS CloudTrail"
    ],
    answer: [0],
    explanation: "Amazon Inspector continuously scans EC2 instances, container images in Amazon ECR, and Lambda functions for known software vulnerabilities and unintended network exposure. Macie classifies sensitive data, Config checks configuration compliance, and CloudTrail records API activity.",
    rationales: [
      "",
      "Macie discovers sensitive data in Amazon S3.",
      "AWS Config evaluates resource configuration against rules, not software CVEs.",
      "CloudTrail provides an API audit trail."
    ],
    services: ["Amazon Inspector"],
    tags: ["vulnerability scanning", "inspector"]
  },
  {
    id: "5.1-028",
    domain: 5,
    task: "5.1",
    type: "ordering",
    difficulty: "medium",
    stem: "A security team responds to a report that a generative AI assistant disclosed sensitive internal data. Place the response steps in the correct order.",
    options: [
      "Apply a durable fix such as removing the data source, tightening guardrails, and updating prompts",
      "Contain the issue by disabling or restricting the affected assistant capability",
      "Review invocation logs and CloudTrail to determine scope and what was exposed",
      "Verify the fix through targeted testing and resume normal service"
    ],
    answer: [1, 2, 0, 3],
    explanation: "Incident response begins with containment to stop ongoing exposure, then investigation using logs to establish scope, then remediation of the underlying cause, and finally verification before returning the capability to service. Investigating before containing leaves the exposure active.",
    rationales: [],
    services: ["AWS CloudTrail", "Amazon CloudWatch"],
    tags: ["incident response", "logging"]
  },
  {
    id: "5.1-029",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "A team wants centralized, best-practice recommendations across security, cost, performance, and fault tolerance for its AWS account. Which service provides this?",
    options: [
      "AWS Trusted Advisor",
      "AWS Artifact",
      "Amazon Macie",
      "AWS Secrets Manager"
    ],
    answer: [0],
    explanation: "AWS Trusted Advisor inspects an AWS environment and provides recommendations across cost optimization, performance, security, fault tolerance, and service limits. It is a broad advisory tool rather than a data classification, compliance document, or secrets service.",
    rationales: [
      "",
      "Artifact provides AWS compliance reports for download.",
      "Macie classifies sensitive data in Amazon S3.",
      "Secrets Manager stores and rotates credentials."
    ],
    services: ["AWS Trusted Advisor"],
    tags: ["best practices", "trusted advisor"]
  },
  {
    id: "5.1-030",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "Which practice is most important when granting a Bedrock Knowledge Base access to a company's document repository?",
    options: [
      "Scope the knowledge base's data source permissions so it can only read the documents intended for that audience",
      "Grant read access to every bucket so retrieval never fails",
      "Disable encryption to speed up ingestion",
      "Increase the chunk size to reduce the number of embeddings"
    ],
    answer: [0],
    explanation: "A knowledge base surfaces whatever it can read, so over-broad data source permissions become an access control failure where users receive answers derived from documents they should not see. Permissions must match the intended audience of the assistant.",
    rationales: [
      "",
      "Broad read access risks exposing confidential documents through generated answers.",
      "Disabling encryption weakens data protection and is not an ingestion optimization.",
      "Chunk size affects retrieval quality and cost, not authorization."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["access control", "rag"]
  },
  {
    id: "5.1-031",
    domain: 5,
    task: "5.1",
    type: "multi",
    difficulty: "medium",
    stem: "Which two statements correctly describe monitoring options for AI workloads on AWS? (Select TWO.)",
    options: [
      "Amazon CloudWatch collects metrics and logs and can trigger alarms on thresholds",
      "AWS CloudTrail provides an audit trail of API calls including the calling identity",
      "Amazon Macie streams real-time inference latency metrics",
      "AWS KMS records which users viewed model outputs",
      "Amazon S3 automatically alerts on model accuracy degradation"
    ],
    answer: [0, 1],
    explanation: "CloudWatch is the metrics, logs, and alarming service, while CloudTrail is the API audit trail identifying who performed which action. Macie classifies sensitive data, KMS manages encryption keys, and S3 stores objects without evaluating model quality.",
    rationales: [
      "",
      "",
      "Macie performs sensitive data discovery, not latency monitoring.",
      "KMS manages keys and logs key usage, not who read model outputs.",
      "S3 has no awareness of model accuracy."
    ],
    services: ["Amazon CloudWatch", "AWS CloudTrail"],
    tags: ["monitoring", "logging"]
  },
  {
    id: "5.1-032",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "hard",
    stem: "An application passes user-supplied text directly into a prompt that also contains instructions. Which single change most reduces prompt injection risk?",
    options: [
      "Clearly delimit the untrusted user content and instruct the model to treat it as data rather than instructions",
      "Increase the temperature so responses vary",
      "Reduce the number of few-shot examples",
      "Switch the model to a different provider"
    ],
    answer: [0],
    explanation: "Marking untrusted content with explicit delimiters and telling the model that the enclosed text is data to be processed rather than instructions to follow is the foundational structural mitigation. It is combined with guardrails, input validation, and least-privilege tool access rather than replacing them.",
    rationales: [
      "",
      "Higher temperature increases variability and does not resist injection.",
      "Few-shot example count affects response quality, not injection resistance.",
      "Changing provider does not remove the structural weakness of mixing data and instructions."
    ],
    services: [],
    tags: ["prompt injection", "prompt design"]
  },
  {
    id: "5.1-033",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "easy",
    stem: "Which statement about the AWS shared responsibility model is accurate for a fully managed AI service such as Amazon Rekognition?",
    options: [
      "The customer must patch the operating system running the service",
      "AWS manages the underlying infrastructure and model operations, while the customer controls access, input data, and how results are used",
      "The customer is responsible for physical data center access controls",
      "AWS assumes responsibility for how the customer uses the service's outputs"
    ],
    answer: [1],
    explanation: "With a fully managed AI service, AWS operates the infrastructure and the service itself, which shifts more responsibility to AWS than with self-managed compute. The customer still controls identity and access, what data is submitted, and how outputs are applied in their business process.",
    rationales: [
      "There is no customer-managed operating system in a fully managed AI service.",
      "",
      "Physical security is always an AWS responsibility.",
      "How outputs are used in a business decision remains the customer's responsibility."
    ],
    services: ["Amazon Rekognition"],
    tags: ["shared responsibility", "managed services"]
  },
  {
    id: "5.1-034",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "A company must ensure that only encrypted connections are used when an application calls an ML inference endpoint. Which mechanism provides this?",
    options: [
      "TLS for data in transit",
      "AWS KMS envelope encryption",
      "S3 Block Public Access",
      "IAM permission boundaries"
    ],
    answer: [0],
    explanation: "TLS encrypts data as it moves between the client and the endpoint, which is the in-transit protection AWS service endpoints use by default. KMS handles keys for data at rest, Block Public Access governs S3 exposure, and permission boundaries limit maximum IAM permissions.",
    rationales: [
      "",
      "KMS envelope encryption protects stored data, not the network connection.",
      "Block Public Access prevents public S3 exposure and is unrelated to endpoint connections.",
      "Permission boundaries constrain IAM privileges rather than encrypt traffic."
    ],
    services: [],
    tags: ["encryption in transit", "tls"]
  },
  {
    id: "5.1-035",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "Which approach best addresses the risk that employees paste confidential information into a third-party generative AI tool?",
    options: [
      "Provide an approved internal assistant built on Amazon Bedrock with appropriate controls, and set clear usage policy and training",
      "Block all internet access company-wide",
      "Rely on the third-party provider's terms of service",
      "Increase the company's AWS spending limit"
    ],
    answer: [0],
    explanation: "Shadow AI use is best addressed by providing a sanctioned alternative with proper data controls, combined with explicit policy and employee training so people know what may be shared and where. Blanket internet blocking is impractical, and relying on an external provider's terms transfers no real control.",
    rationales: [
      "",
      "Blocking all internet access is disproportionate and rarely feasible.",
      "Provider terms do not prevent employees from disclosing confidential data.",
      "Spending limits have no relationship to data handling behavior."
    ],
    services: ["Amazon Bedrock"],
    tags: ["data governance", "policy"]
  },
  {
    id: "5.1-036",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "hard",
    stem: "A team wants to verify that an S3 bucket holding fine-tuning data has not been made publicly accessible at any point. Which combination provides both current state and historical evidence?",
    options: [
      "AWS Config for configuration state and history, together with AWS CloudTrail for the API calls that changed it",
      "Amazon CloudWatch metrics alone",
      "Amazon Macie findings alone",
      "S3 lifecycle policies"
    ],
    answer: [0],
    explanation: "AWS Config records the configuration state of a resource over time and can flag non-compliant public access settings, while CloudTrail identifies the specific API calls and identities that changed the configuration. Together they answer both what the state was and who changed it.",
    rationales: [
      "",
      "CloudWatch metrics describe operational performance, not bucket access configuration history.",
      "Macie identifies sensitive data content but does not track configuration history.",
      "Lifecycle policies transition or expire objects and record nothing about access settings."
    ],
    services: ["AWS Config", "AWS CloudTrail"],
    tags: ["auditing", "configuration history"]
  },
  {
    id: "5.1-037",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "Which statement best describes why data quality matters as a security and governance concern, not only an accuracy concern?",
    options: [
      "Poor quality data always increases storage cost",
      "Corrupted or maliciously altered training data can change model behavior in ways that create safety, fairness, and compliance failures",
      "Data quality affects only the training time of a model",
      "Data quality is checked automatically by AWS before training begins"
    ],
    answer: [1],
    explanation: "Training data integrity is a security property because an attacker who alters it, or an unnoticed corruption, changes what the model learns and can produce unsafe, biased, or non-compliant behavior. This is why data validation, lineage, and access controls on training data are governance controls.",
    rationales: [
      "Cost effects are incidental and not the governance concern.",
      "",
      "Quality affects behavior and outcomes, not merely how long training takes.",
      "AWS does not automatically validate the semantic quality of customer training data."
    ],
    services: [],
    tags: ["data quality", "data poisoning", "governance"]
  },
  {
    id: "5.1-038",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "easy",
    stem: "Which AWS service centralizes workforce identity and single sign-on across multiple AWS accounts for an ML platform team?",
    options: [
      "AWS IAM Identity Center",
      "Amazon Cognito user pools for end customers",
      "AWS Secrets Manager",
      "AWS Certificate Manager"
    ],
    answer: [0],
    explanation: "AWS IAM Identity Center provides centralized workforce single sign-on and permission set assignment across accounts in an organization, which is the standard answer for employee access at scale. Cognito is aimed at application end users, and the other services manage secrets and certificates.",
    rationales: [
      "",
      "Cognito handles authentication for customer-facing applications rather than workforce SSO.",
      "Secrets Manager stores credentials, not identity federation.",
      "Certificate Manager provisions and manages TLS certificates."
    ],
    services: ["AWS IAM Identity Center"],
    tags: ["identity", "sso"]
  },
  {
    id: "5.1-039",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "medium",
    stem: "A company sets a policy that model training data must be deleted 90 days after a project ends. Which concept does this represent?",
    options: [
      "Data retention as part of the data lifecycle",
      "Data lineage",
      "Data cataloging",
      "Data residency"
    ],
    answer: [0],
    explanation: "Retention defines how long data is kept before deletion and is a core part of data lifecycle governance, often enforced with S3 lifecycle policies. Lineage traces origin and transformations, cataloging records metadata, and residency concerns the geographic location of data.",
    rationales: [
      "",
      "Lineage describes where data came from and how it was transformed.",
      "Cataloging maintains searchable metadata about datasets.",
      "Residency concerns which country or Region stores the data."
    ],
    services: ["Amazon S3"],
    tags: ["data lifecycle", "retention"]
  },
  {
    id: "5.1-040",
    domain: 5,
    task: "5.1",
    type: "single",
    difficulty: "hard",
    stem: "An application allows users to upload documents that are then embedded into a shared vector store used by all employees. What is the most significant security concern with this design?",
    options: [
      "Embedding generation will be too slow",
      "A user could upload confidential content that then surfaces in answers given to employees who should not see it",
      "The vector store will exceed its maximum dimension count",
      "Prompt caching will be disabled"
    ],
    answer: [1],
    explanation: "A shared retrieval index without per-document access controls collapses distinct permission boundaries, so anything ingested becomes reachable by every user of the assistant. The fix is to enforce document-level access filtering at retrieval time or maintain separate indexes per audience.",
    rationales: [
      "Embedding latency is an operational concern, not the primary security risk.",
      "",
      "Dimension count is a fixed property of the embedding model, not a security issue.",
      "Prompt caching is a latency and cost optimization unrelated to this risk."
    ],
    services: ["Amazon Bedrock Knowledge Bases"],
    tags: ["access control", "rag", "data leakage"]
  }
);
