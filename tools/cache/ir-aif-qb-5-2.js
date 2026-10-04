window.QBANK = window.QBANK || [];
window.QBANK.push(
  {
    id: "5.2-001",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "easy",
    stem: "A healthcare provider in the United States plans to process patient records with a machine learning model. Which compliance standard is most directly relevant?",
    options: [
      "PCI DSS",
      "HIPAA",
      "GDPR",
      "ISO 27001"
    ],
    answer: [1],
    explanation: "HIPAA governs the handling of protected health information in the United States, so a workload processing patient records must be designed for HIPAA requirements. PCI DSS covers payment card data, GDPR covers personal data of individuals in the EU, and ISO 27001 is a general information security management standard.",
    rationales: [
      "PCI DSS applies to cardholder payment data, not medical records.",
      "",
      "GDPR governs personal data of individuals in the European Union.",
      "ISO 27001 is a broad security management certification, not health-data specific."
    ],
    services: [],
    tags: ["hipaa", "regulated workloads"]
  },
  {
    id: "5.2-002",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "A European retailer must honor customer requests to delete personal data used in model training. Which regulation drives this requirement?",
    options: [
      "GDPR",
      "PCI DSS",
      "SOC 2",
      "HIPAA"
    ],
    answer: [0],
    explanation: "The General Data Protection Regulation grants individuals rights over their personal data including access, correction, and erasure, which is why data lifecycle and deletion capability must be designed into ML pipelines handling EU personal data. The other frameworks address payment data, service organization controls, and health information.",
    rationales: [
      "",
      "PCI DSS governs payment card data security, not individual data subject rights.",
      "SOC 2 reports on service organization controls; it does not grant deletion rights.",
      "HIPAA governs protected health information in the United States."
    ],
    services: [],
    tags: ["gdpr", "data subject rights"]
  },
  {
    id: "5.2-003",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "Which AWS service provides a centralized data catalog with fine-grained access permissions for a data lake used by multiple analytics and ML teams?",
    options: [
      "AWS Lake Formation",
      "Amazon Macie",
      "AWS Artifact",
      "Amazon Inspector"
    ],
    answer: [0],
    explanation: "AWS Lake Formation centralizes data lake permissions, allowing database, table, column, row, and cell level access control layered over the AWS Glue Data Catalog. Macie classifies sensitive data, Artifact supplies compliance documents, and Inspector scans for vulnerabilities.",
    rationales: [
      "",
      "Macie discovers and classifies sensitive data in Amazon S3 without managing lake permissions.",
      "Artifact provides AWS compliance reports for download.",
      "Inspector performs automated vulnerability assessments."
    ],
    services: ["AWS Lake Formation"],
    tags: ["data governance", "lake formation"]
  },
  {
    id: "5.2-004",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "An organization wants business users to discover, understand, and request access to datasets across accounts with governed workflows. Which AWS service is designed for this?",
    options: [
      "Amazon DataZone",
      "Amazon Athena",
      "AWS Glue crawlers",
      "Amazon QuickSight"
    ],
    answer: [0],
    explanation: "Amazon DataZone is a data management service for cataloging, discovering, sharing, and governing data across AWS accounts and on-premises sources, including subscription-based access request workflows. Athena queries data, Glue crawlers populate technical metadata, and QuickSight visualizes results.",
    rationales: [
      "",
      "Athena runs SQL queries over data in Amazon S3; it does not provide governed discovery workflows.",
      "Glue crawlers infer schema and populate the Data Catalog but offer no business governance layer.",
      "QuickSight is a business intelligence and dashboarding service."
    ],
    services: ["Amazon DataZone"],
    tags: ["data governance", "datazone"]
  },
  {
    id: "5.2-005",
    domain: 5,
    task: "5.2",
    type: "multi",
    difficulty: "medium",
    stem: "A company is establishing an AI governance program. Which two elements are core to such a program? (Select TWO.)",
    options: [
      "Defined policies with named owners and a regular review cadence for deployed models",
      "Documented transparency standards describing when and how AI use is disclosed",
      "A requirement that all models use the largest available instance type",
      "A rule that models must be retrained daily regardless of drift",
      "A policy that all training data be stored in a single S3 bucket"
    ],
    answer: [0, 1],
    explanation: "Governance programs are built on written policies with accountable owners and a review cadence, plus standards for what must be disclosed to users and regulators. Prescriptive infrastructure rules about instance types, retraining frequency, or bucket layout are operational choices rather than governance principles.",
    rationales: [
      "",
      "",
      "Instance sizing is a cost and performance decision, not governance.",
      "Retraining should be triggered by drift and business need, not an arbitrary daily schedule.",
      "Consolidating storage into one bucket is not a governance requirement and may hinder access control."
    ],
    services: [],
    tags: ["governance program", "policy"]
  },
  {
    id: "5.2-006",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "easy",
    stem: "Which AWS service should a compliance officer use to download AWS's SOC 2 report?",
    options: [
      "AWS Artifact",
      "AWS Audit Manager",
      "AWS Config",
      "AWS CloudTrail"
    ],
    answer: [0],
    explanation: "AWS Artifact is the on-demand portal for AWS compliance reports and agreements, including SOC reports, ISO certifications, and PCI documents. Audit Manager produces evidence about the customer's own workloads rather than AWS's certifications.",
    rationales: [
      "",
      "Audit Manager collects evidence about your workloads for your own audits.",
      "AWS Config records and evaluates resource configurations.",
      "CloudTrail records API activity in your account."
    ],
    services: ["AWS Artifact"],
    tags: ["compliance reports", "artifact"]
  },
  {
    id: "5.2-007",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "A financial services company must demonstrate that its generative AI application's controls map to a recognized framework and produce evidence continuously. Which service best supports this?",
    options: [
      "AWS Audit Manager",
      "Amazon CloudWatch",
      "Amazon Bedrock Guardrails",
      "AWS Secrets Manager"
    ],
    answer: [0],
    explanation: "AWS Audit Manager maps AWS activity to control frameworks, continuously collects evidence, and generates audit-ready reports, which is what demonstrating control coverage to an auditor requires. CloudWatch supplies operational telemetry, Guardrails enforce content policy, and Secrets Manager stores credentials.",
    rationales: [
      "",
      "CloudWatch provides metrics and logs but does not map them to compliance controls.",
      "Guardrails enforce runtime content policy and produce no framework evidence.",
      "Secrets Manager handles credential storage and rotation."
    ],
    services: ["AWS Audit Manager"],
    tags: ["compliance", "audit manager"]
  },
  {
    id: "5.2-008",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "hard",
    stem: "A company operating in the European Union is assessing obligations under the EU AI Act. Which statement best reflects its general approach?",
    options: [
      "All AI systems are prohibited unless individually approved by regulators",
      "Obligations scale with the risk category of the AI system, with stricter requirements for high-risk uses",
      "It applies only to systems trained inside the European Union",
      "It regulates only generative AI systems"
    ],
    answer: [1],
    explanation: "The EU AI Act uses a risk-based structure in which obligations increase with the assessed risk of the use case, imposing the strictest requirements on high-risk applications and prohibiting a narrow set of unacceptable practices. It is not a blanket prohibition and is not limited to generative systems or EU-trained models.",
    rationales: [
      "Most AI systems are permitted; only a narrow category of practices is prohibited outright.",
      "",
      "Applicability follows where the system is placed on the market or used, not solely where it was trained.",
      "The framework covers AI systems broadly, not only generative AI."
    ],
    services: [],
    tags: ["eu ai act", "regulation"]
  },
  {
    id: "5.2-009",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "Which concept describes an organizational approach where individual business domains own and publish their data as products, with federated governance?",
    options: [
      "Data mesh",
      "Data warehouse",
      "Data lineage",
      "Data residency"
    ],
    answer: [0],
    explanation: "A data mesh decentralizes ownership so domain teams publish and maintain their data as products, governed by federated standards rather than a single central team. A warehouse is a storage and analytics architecture, lineage traces data movement, and residency concerns geographic location.",
    rationales: [
      "",
      "A data warehouse is a centralized analytical store, not an ownership model.",
      "Lineage describes where data came from and how it was transformed.",
      "Residency concerns which jurisdiction stores the data."
    ],
    services: [],
    tags: ["data mesh", "data governance"]
  },
  {
    id: "5.2-010",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "A multinational company must keep customer data physically within a specific country. Which governance concept is this, and which AWS control most directly supports it?",
    options: [
      "Data residency, supported by selecting the AWS Region where data is stored and processed",
      "Data lineage, supported by AWS Glue crawlers",
      "Data retention, supported by S3 lifecycle policies",
      "Data cataloging, supported by Amazon DataZone"
    ],
    answer: [0],
    explanation: "Data residency is the requirement that data remain within a defined geography, and the primary AWS control is choosing the Region in which data is stored and processed, reinforced by policies restricting Region use. Lineage, retention, and cataloging address different governance questions.",
    rationales: [
      "",
      "Lineage traces transformations rather than constraining geography.",
      "Retention governs how long data is kept, not where it lives.",
      "Cataloging makes data discoverable and does not enforce location."
    ],
    services: [],
    tags: ["data residency", "regions"]
  },
  {
    id: "5.2-011",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "easy",
    stem: "Which compliance standard applies to an ML system that processes credit card transaction data?",
    options: [
      "HIPAA",
      "PCI DSS",
      "FERPA",
      "ISO 9001"
    ],
    answer: [1],
    explanation: "The Payment Card Industry Data Security Standard governs the storage, processing, and transmission of cardholder data, so a fraud model handling transaction data falls in scope. HIPAA covers health information, FERPA covers education records, and ISO 9001 addresses quality management.",
    rationales: [
      "HIPAA governs protected health information.",
      "",
      "FERPA governs student education records in the United States.",
      "ISO 9001 is a quality management standard, not a data security standard."
    ],
    services: [],
    tags: ["pci dss", "regulated workloads"]
  },
  {
    id: "5.2-012",
    domain: 5,
    task: "5.2",
    type: "multi",
    difficulty: "medium",
    stem: "An AI governance board is being formed. Which two responsibilities are appropriate for it? (Select TWO.)",
    options: [
      "Reviewing and approving high-risk AI use cases before deployment",
      "Setting organization-wide standards for documentation, evaluation, and monitoring of models",
      "Writing the training code for each model",
      "Provisioning EC2 capacity for training jobs",
      "Selecting the instance type for each inference endpoint"
    ],
    answer: [0, 1],
    explanation: "A governance board sets standards and reviews consequential use cases, providing cross-functional oversight and accountability. Writing code and provisioning infrastructure are engineering activities that the board governs rather than performs.",
    rationales: [
      "",
      "",
      "Implementation work belongs to engineering teams, not the oversight body.",
      "Capacity provisioning is an operational engineering task.",
      "Instance selection is a technical decision made by the delivery team."
    ],
    services: [],
    tags: ["governance board", "oversight"]
  },
  {
    id: "5.2-013",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "Which AWS service maintains centralized technical metadata such as table definitions and schemas that other analytics and ML services can query?",
    options: [
      "AWS Glue Data Catalog",
      "Amazon S3 Inventory",
      "AWS CloudTrail",
      "Amazon EventBridge"
    ],
    answer: [0],
    explanation: "The AWS Glue Data Catalog is the central metadata repository storing table definitions, schemas, and partition information, and it is consumed by services such as Athena, EMR, and Redshift Spectrum. S3 Inventory lists objects, CloudTrail records API calls, and EventBridge routes events.",
    rationales: [
      "",
      "S3 Inventory produces object listings without schema-level metadata.",
      "CloudTrail records API activity for auditing.",
      "EventBridge is an event bus for routing and reacting to events."
    ],
    services: ["AWS Glue"],
    tags: ["data catalog", "metadata"]
  },
  {
    id: "5.2-014",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "hard",
    stem: "A company is classifying its generative AI use cases to decide how much governance each needs. Which factor most appropriately determines the level of oversight?",
    options: [
      "The number of tokens the model consumes per request",
      "The potential impact on individuals and the organization if the system behaves incorrectly",
      "The AWS Region where the model is hosted",
      "Whether the model is from Amazon or a third-party provider"
    ],
    answer: [1],
    explanation: "Risk-based governance scales oversight to consequence, so systems that can materially affect people's rights, safety, finances, or opportunities receive the most scrutiny regardless of technical details. Token usage, Region, and provider identity do not determine potential harm.",
    rationales: [
      "Token consumption is a cost metric with no relationship to risk of harm.",
      "",
      "Region affects residency and latency, not the consequence of an error.",
      "Provider choice does not by itself determine how consequential the use case is."
    ],
    services: [],
    tags: ["risk management", "governance"]
  },
  {
    id: "5.2-015",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "Which artifact best supports an auditor's question about what a specific production model was designed to do and what its known limitations are?",
    options: [
      "Amazon SageMaker Model Cards",
      "Amazon CloudWatch dashboards",
      "AWS Cost and Usage Report",
      "Amazon S3 access logs"
    ],
    answer: [0],
    explanation: "SageMaker Model Cards record intended use, training data characteristics, evaluation results, and limitations in a governed artifact attached to the model, which is exactly the documentation an auditor requests. Dashboards, cost reports, and access logs describe operations, spend, and data access instead.",
    rationales: [
      "",
      "Dashboards show operational metrics, not documented intent or limitations.",
      "Cost reports describe spending patterns.",
      "S3 access logs record who read objects, not model design intent."
    ],
    services: ["Amazon SageMaker Model Cards"],
    tags: ["documentation", "auditability"]
  },
  {
    id: "5.2-016",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "A company adopts a policy requiring periodic review of all deployed models. What is the primary governance purpose of a defined review cadence?",
    options: [
      "To reduce inference costs over time",
      "To confirm models still perform as intended and remain appropriate as data, business needs, and regulations change",
      "To force migration to newer instance families",
      "To increase the frequency of model retraining regardless of need"
    ],
    answer: [1],
    explanation: "A review cadence exists because a model approved once does not stay appropriate forever: data shifts, the business changes, and regulations evolve. Periodic review re-verifies performance, fairness, and continued fit for purpose, and may conclude that retirement is the right outcome.",
    rationales: [
      "Cost reduction may occur incidentally but is not the governance purpose.",
      "",
      "Instance family migration is an infrastructure optimization decision.",
      "Retraining should follow evidence of need rather than a fixed schedule."
    ],
    services: [],
    tags: ["review cadence", "governance"]
  },
  {
    id: "5.2-017",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "easy",
    stem: "Which statement about ISO certifications and AWS is accurate?",
    options: [
      "AWS holds ISO certifications for its infrastructure and services, and customers can obtain the reports through AWS Artifact",
      "AWS ISO certifications automatically make any customer workload compliant",
      "Customers must obtain ISO certification on behalf of AWS",
      "ISO certifications apply only to on-premises data centers"
    ],
    answer: [0],
    explanation: "AWS maintains ISO certifications covering its infrastructure and in-scope services, and customers can download the certificates from AWS Artifact to support their own audits. Inheriting AWS's certification does not make a customer workload compliant, because the customer's own configuration and processes are in scope under shared responsibility.",
    rationales: [
      "",
      "Customer workloads must independently meet requirements; certification is not inherited wholesale.",
      "AWS obtains its own certifications; customers do not certify on its behalf.",
      "ISO standards apply to cloud environments as well as on-premises facilities."
    ],
    services: ["AWS Artifact"],
    tags: ["iso", "shared responsibility"]
  },
  {
    id: "5.2-018",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "Which practice best supports accountability when a generative AI system produces a harmful output in production?",
    options: [
      "Retaining invocation logs and an API audit trail so the request, response, and calling identity can be reconstructed",
      "Deleting logs after 24 hours to minimize data retention",
      "Disabling monitoring to avoid capturing sensitive content",
      "Allowing anonymous access to the assistant"
    ],
    answer: [0],
    explanation: "Accountability requires being able to reconstruct what happened, which depends on invocation logging of prompts and responses together with CloudTrail records of who invoked the service. Aggressive log deletion, disabled monitoring, and anonymous access all destroy the evidence an investigation needs.",
    rationales: [
      "",
      "Very short retention can leave an incident uninvestigable.",
      "Disabling monitoring removes the ability to detect or explain harmful outputs.",
      "Anonymous access removes attribution entirely."
    ],
    services: ["AWS CloudTrail", "Amazon CloudWatch"],
    tags: ["accountability", "logging"]
  },
  {
    id: "5.2-019",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "hard",
    stem: "A company uses a scoping approach to decide governance requirements for generative AI, ranging from consumer applications through to self-trained models. What is the main benefit of such a scoping model?",
    options: [
      "It guarantees regulatory approval in every jurisdiction",
      "It clarifies which security and governance responsibilities the organization holds based on how much of the AI stack it controls",
      "It reduces the cost of foundation model inference",
      "It removes the need for model documentation"
    ],
    answer: [1],
    explanation: "A scoping framework maps deployment patterns, from using a third-party consumer app through to pre-training your own model, to the responsibilities the organization actually carries at each level. The more of the stack you control, the more governance and security obligations you own.",
    rationales: [
      "No framework guarantees regulatory approval.",
      "",
      "Scoping clarifies responsibility; it does not change inference pricing.",
      "Documentation remains necessary at every scope level."
    ],
    services: [],
    tags: ["scoping matrix", "governance"]
  },
  {
    id: "5.2-020",
    domain: 5,
    task: "5.2",
    type: "multi",
    difficulty: "medium",
    stem: "Which two practices support data governance for machine learning training datasets? (Select TWO.)",
    options: [
      "Recording data lineage from source system through every transformation",
      "Cataloging datasets with searchable metadata and documented ownership",
      "Storing all datasets in the same S3 prefix for simplicity",
      "Granting all data scientists administrator access to accelerate work",
      "Disabling versioning to reduce storage cost"
    ],
    answer: [0, 1],
    explanation: "Lineage and cataloging are the foundations of data governance: lineage answers where data came from and how it changed, and cataloging makes datasets discoverable with clear ownership. Flattening storage layout, granting broad admin access, and disabling versioning weaken governance.",
    rationales: [
      "",
      "",
      "A single shared prefix makes fine-grained access control and organization harder.",
      "Blanket administrator access violates least privilege.",
      "Disabling versioning removes protection against accidental or malicious overwrite."
    ],
    services: ["AWS Glue"],
    tags: ["data governance", "lineage", "cataloging"]
  },
  {
    id: "5.2-021",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "Which statement best explains why team training is part of an AI governance program?",
    options: [
      "Training reduces the cost of AWS services",
      "Controls only work if the people building and operating AI systems understand the policies, risks, and escalation paths",
      "Training is required by AWS before enabling Amazon Bedrock",
      "Training replaces the need for technical guardrails"
    ],
    answer: [1],
    explanation: "Written policies do not enforce themselves; people implement them. Training ensures builders and operators recognize risks such as prompt injection and data leakage, know the documentation standards, and understand when and how to escalate. It complements rather than replaces technical controls.",
    rationales: [
      "Training does not affect AWS service pricing.",
      "",
      "AWS does not mandate training before enabling Bedrock.",
      "Human awareness supplements technical guardrails; it does not substitute for them."
    ],
    services: [],
    tags: ["training", "governance program"]
  },
  {
    id: "5.2-022",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "easy",
    stem: "Which service records configuration changes to AWS resources so a compliance team can see how a resource was configured at a past point in time?",
    options: [
      "AWS Config",
      "Amazon Macie",
      "AWS Artifact",
      "Amazon DataZone"
    ],
    answer: [0],
    explanation: "AWS Config maintains a configuration history and timeline for supported resources and can evaluate them against rules, which lets a compliance team answer what a resource looked like on a given date. Macie classifies data, Artifact supplies AWS reports, and DataZone governs data discovery and sharing.",
    rationales: [
      "",
      "Macie discovers sensitive data rather than tracking resource configuration.",
      "Artifact provides AWS compliance documents.",
      "DataZone provides business data cataloging and access workflows."
    ],
    services: ["AWS Config"],
    tags: ["configuration history", "config"]
  },
  {
    id: "5.2-023",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "An organization must show which datasets contributed to a model that produced a disputed decision. Which capability is most essential?",
    options: [
      "Data lineage tracking across the pipeline",
      "Increased CloudWatch metric resolution",
      "Larger training instance types",
      "Higher S3 request throughput"
    ],
    answer: [0],
    explanation: "Lineage records the chain from source data through transformations into the training set and ultimately the model version, which is what lets an organization trace a disputed output back to its inputs. Metrics resolution, instance sizing, and throughput are performance concerns.",
    rationales: [
      "",
      "Metric resolution affects operational monitoring granularity, not data provenance.",
      "Instance type affects training speed and cost.",
      "Request throughput is a performance characteristic of storage access."
    ],
    services: [],
    tags: ["data lineage", "auditability"]
  },
  {
    id: "5.2-024",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "hard",
    stem: "A company must comply with a regulation requiring that automated decisions affecting consumers be explainable and contestable. Which combination of measures best satisfies this?",
    options: [
      "Documented model cards, per-decision feature attribution, a disclosed appeals process, and retained decision records",
      "Encryption at rest and in transit for all decision data",
      "Multi-Region deployment of the inference endpoint",
      "Provisioned Throughput to guarantee consistent latency"
    ],
    answer: [0],
    explanation: "Explainable and contestable decisions require documentation of the model's intent and limits, an explanation of the individual decision, a human process through which a person can challenge it, and retained records so the decision can be reviewed. Encryption, multi-Region deployment, and throughput reservations address confidentiality and availability instead.",
    rationales: [
      "",
      "Encryption protects data confidentiality but explains no decision.",
      "Multi-Region deployment improves availability, not explainability.",
      "Provisioned Throughput guarantees capacity, not contestability."
    ],
    services: ["Amazon SageMaker Model Cards", "Amazon SageMaker Clarify"],
    tags: ["algorithm accountability", "explainability"]
  },
  {
    id: "5.2-025",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "Which description best fits SOC 2 in the context of a company evaluating a cloud provider?",
    options: [
      "A report on a service organization's controls relevant to security, availability, processing integrity, confidentiality, and privacy",
      "A European regulation granting individuals data deletion rights",
      "A payment card industry security standard",
      "A United States health information privacy law"
    ],
    answer: [0],
    explanation: "SOC 2 reports describe a service organization's controls against the Trust Services Criteria, and customers review them when assessing a provider. GDPR, PCI DSS, and HIPAA are the European privacy regulation, the card data standard, and the US health privacy law respectively.",
    rationales: [
      "",
      "That describes GDPR.",
      "That describes PCI DSS.",
      "That describes HIPAA."
    ],
    services: ["AWS Artifact"],
    tags: ["soc 2", "compliance"]
  },
  {
    id: "5.2-026",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "Which practice best reduces the risk that an organization loses track of which models are running in production?",
    options: [
      "Maintaining a central model inventory with owners, status, and monitoring results",
      "Increasing the retention period of application logs",
      "Deploying all models to the same endpoint",
      "Standardizing on a single foundation model provider"
    ],
    answer: [0],
    explanation: "A central inventory recording every model, its owner, its status, and its monitoring results is the control that prevents undocumented or orphaned models persisting in production. SageMaker Model Dashboard and Model Registry support this. Log retention, endpoint consolidation, and provider standardization address other concerns.",
    rationales: [
      "",
      "Longer log retention does not tell you which models exist or who owns them.",
      "Sharing one endpoint does not create an inventory and can complicate isolation.",
      "Using one provider does not by itself track deployed models."
    ],
    services: ["Amazon SageMaker Model Dashboard"],
    tags: ["model inventory", "governance"]
  },
  {
    id: "5.2-027",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "easy",
    stem: "What is the primary governance purpose of documenting a dataset's intended use and known limitations?",
    options: [
      "To reduce the storage footprint of the dataset",
      "To prevent the dataset from being reused in contexts where it would produce misleading or unfair results",
      "To improve query performance",
      "To satisfy AWS service quotas"
    ],
    answer: [1],
    explanation: "Datasets carry assumptions from how and why they were collected, so documenting intended use and limitations stops a later team from applying them to a population or purpose they do not represent. That reuse mismatch is a common source of biased and misleading models.",
    rationales: [
      "Documentation does not change storage size.",
      "",
      "Documentation has no effect on query performance.",
      "Service quotas are unrelated to dataset documentation."
    ],
    services: [],
    tags: ["documentation", "data governance"]
  },
  {
    id: "5.2-028",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "A company wants to enforce that no ML workload can be deployed to an unapproved AWS Region. Which mechanism most directly enforces this at scale?",
    options: [
      "A service control policy in AWS Organizations restricting Regions",
      "An Amazon CloudWatch alarm on Region usage",
      "A note in the team's runbook",
      "An Amazon S3 lifecycle policy"
    ],
    answer: [0],
    explanation: "Service control policies in AWS Organizations set the maximum permissions available to accounts and can deny actions outside approved Regions, which is preventive enforcement rather than detection. Alarms detect after the fact, runbooks rely on human compliance, and lifecycle policies manage object transitions.",
    rationales: [
      "",
      "An alarm notifies after the deployment has already occurred.",
      "A runbook is guidance and cannot technically prevent an action.",
      "Lifecycle policies transition or expire S3 objects."
    ],
    services: ["AWS Organizations"],
    tags: ["preventive control", "data residency"]
  },
  {
    id: "5.2-029",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "hard",
    stem: "Which statement best distinguishes AWS Config from AWS Audit Manager?",
    options: [
      "Config evaluates resource configurations against rules; Audit Manager maps evidence to control frameworks and produces audit reports",
      "Config downloads AWS certifications; Audit Manager records API calls",
      "Config scans for software vulnerabilities; Audit Manager classifies sensitive data",
      "They are the same service under different names"
    ],
    answer: [0],
    explanation: "AWS Config continuously records and evaluates resource configuration state against rules, answering whether resources are configured compliantly. Audit Manager consumes evidence from across AWS, maps it to controls in a framework such as HIPAA or PCI DSS, and assembles an audit-ready report.",
    rationales: [
      "",
      "Downloading certifications is AWS Artifact and API recording is CloudTrail.",
      "Vulnerability scanning is Amazon Inspector and sensitive data classification is Amazon Macie.",
      "They are distinct services with different purposes."
    ],
    services: ["AWS Config", "AWS Audit Manager"],
    tags: ["service comparison", "compliance"]
  },
  {
    id: "5.2-030",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "An organization's policy requires that any AI system making decisions about people be registered and reviewed before launch. Which governance element does this represent?",
    options: [
      "A defined approval gate tied to risk classification",
      "A data retention schedule",
      "A cost allocation tag policy",
      "An encryption key rotation schedule"
    ],
    answer: [0],
    explanation: "Requiring registration and review before launch for systems that affect people is an approval gate driven by risk classification, ensuring consequential systems receive oversight proportionate to their impact. Retention schedules, tagging, and key rotation are separate operational controls.",
    rationales: [
      "",
      "Retention schedules govern how long data is kept.",
      "Cost allocation tags support financial reporting.",
      "Key rotation is an encryption hygiene practice."
    ],
    services: [],
    tags: ["approval gate", "risk management"]
  },
  {
    id: "5.2-031",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "Which of the following is the clearest example of a transparency standard within an AI governance program?",
    options: [
      "A rule that users must be told when they are interacting with an AI system and how to reach a human",
      "A rule that all models must achieve at least 95 percent accuracy",
      "A rule that training jobs must complete within four hours",
      "A rule that all data must be stored in Amazon S3"
    ],
    answer: [0],
    explanation: "Transparency standards define what must be disclosed to the people affected by a system, such as informing users they are interacting with AI and providing a path to human assistance. Accuracy thresholds, runtime limits, and storage choices are performance and infrastructure standards.",
    rationales: [
      "",
      "An accuracy threshold is a performance standard, not a disclosure standard.",
      "Training duration is an operational constraint.",
      "Storage location is an infrastructure decision."
    ],
    services: [],
    tags: ["transparency", "governance program"]
  },
  {
    id: "5.2-032",
    domain: 5,
    task: "5.2",
    type: "single",
    difficulty: "medium",
    stem: "A company must decide how long to keep prompt and response logs from its generative AI assistant. Which consideration should drive the decision?",
    options: [
      "Balancing investigative and regulatory needs against privacy obligations and data minimization",
      "Keeping logs indefinitely because storage is inexpensive",
      "Deleting logs immediately to eliminate all risk",
      "Matching the retention period to the model's context window"
    ],
    answer: [0],
    explanation: "Retention decisions weigh the need to investigate incidents and satisfy regulators against privacy principles such as data minimization and any legal limits on holding personal data. Indefinite retention increases exposure, immediate deletion removes accountability, and context window size is unrelated.",
    rationales: [
      "",
      "Indefinite retention of potentially sensitive content increases privacy and breach exposure.",
      "Immediate deletion leaves incidents uninvestigable and may itself violate obligations.",
      "Context window is a model capability with no bearing on retention policy."
    ],
    services: [],
    tags: ["retention", "privacy", "logging"]
  }
);
