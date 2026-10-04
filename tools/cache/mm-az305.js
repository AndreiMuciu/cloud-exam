// AZ-305 question bank — scenario-based, grouped by the four official skill domains
// (weighting matches the April 17, 2026 exam update)

export const domains = {
  infrastructure: { label: 'Infrastructure', emoji: '🏗️', color: '#3b82f6', weight: '30–35%', target: 0.325 },
  identity: { label: 'Identity, Governance & Monitoring', emoji: '🛡️', color: '#a855f7', weight: '25–30%', target: 0.275 },
  storage: { label: 'Data Storage', emoji: '🗄️', color: '#22c55e', weight: '20–25%', target: 0.225 },
  continuity: { label: 'Business Continuity', emoji: '♻️', color: '#f59e0b', weight: '15–20%', target: 0.175 },
};

const coreQuestions = [
  // ================= INFRASTRUCTURE =================
  {
    domain: 'infrastructure',
    scenario: 'A company is building a stateless order-processing API. Traffic is near-zero overnight but spikes 10× during business hours with occasional unpredictable bursts. They want zero operational overhead, automatic scale-to-zero, and pay-per-execution billing.',
    options: [
      'Azure Virtual Machine Scale Sets',
      'Azure Kubernetes Service (AKS)',
      'Azure Functions (Consumption plan)',
      'Azure App Service (always-on)',
    ],
    answer: 2,
    rationale: 'Azure Functions on the Consumption plan automatically adds and removes compute and bills for executions and resources consumed. VM Scale Sets can autoscale VM capacity but remain an IaaS design with guest management and VM provisioning latency; they do not provide pay-per-execution billing. AKS requires cluster and node-pool decisions and charges for underlying resources. An always-on App Service plan keeps provisioned capacity running.',
  },
  {
    domain: 'infrastructure',
    scenario: 'A customer has a legacy, stateful .NET Framework application with OS-level dependencies and a vendor requirement that it cannot be containerized. They want to move it to Azure with the least re-architecting.',
    options: [
      'Azure App Service',
      'Azure Virtual Machines',
      'Azure Functions',
      'Azure Container Apps',
    ],
    answer: 1,
    rationale: 'Only Azure Virtual Machines (IaaS) provides full control over the guest OS, which is required when an app can\u2019t be containerized and needs OS-level customization. App Service, Functions, and Container Apps are PaaS/serverless and assume the app can run in a managed, sandboxed runtime — a legacy stateful app with hard OS dependencies usually can\u2019t.',
  },
  {
    domain: 'infrastructure',
    scenario: 'A team runs a large microservices fleet. They have deep Kubernetes expertise, need custom scheduling rules, a service mesh (Istio), and fine-grained cluster control.',
    options: [
      'Azure Container Apps',
      'Azure Kubernetes Service (AKS)',
      'Azure App Service',
      'Azure Functions',
    ],
    answer: 1,
    rationale: 'AKS gives full control over the Kubernetes control plane and worker nodes — required for custom scheduling, service mesh, and cluster-level tuning, and it\u2019s the right fit when the team already has Kubernetes skills. Container Apps is the managed/serverless option for containers, where you give up cluster-level control. App Service and Functions aren\u2019t the right model for a K8s-native microservices fleet.',
  },
  {
    domain: 'infrastructure',
    scenario: 'A company wants to run containerized workloads with KEDA-style autoscaling and scale-to-zero, but they have no Kubernetes expertise and don\u2019t want to manage a cluster.',
    options: [
      'Azure Kubernetes Service',
      'Azure Container Apps',
      'Azure Virtual Machine Scale Sets',
      'Azure Batch',
    ],
    answer: 1,
    rationale: 'Azure Container Apps is the serverless container platform: managed by Microsoft, autoscales (including scale to zero) via KEDA, and needs no cluster management — perfect for a team without Kubernetes skills. AKS requires operating a cluster. VM Scale Sets are VM-level IaaS. Azure Batch is for large-scale parallel batch jobs, not long-running web workloads.',
  },
  {
    domain: 'infrastructure',
    scenario: 'An organization needs a private, encrypted link from on-premises to Azure and needs it live this week. They cannot wait for carrier provisioning.',
    options: [
      'Azure ExpressRoute',
      'Site-to-Site VPN Gateway',
      'Azure Front Door',
      'Azure Private Link',
    ],
    answer: 1,
    rationale: 'A Site-to-Site VPN Gateway provides an encrypted tunnel over the public internet and can be deployed in hours or days — no carrier lead time. ExpressRoute is a dedicated private connection provisioned through a connectivity provider, which typically takes weeks, and is wrong when time-to-market is the constraint. Front Door is global HTTP routing, not hybrid connectivity. Private Link exposes specific PaaS services privately, not site-to-site connectivity.',
  },
  {
    domain: 'infrastructure',
    scenario: 'A regulated company requires a dedicated, private connection to Azure that does not traverse the public internet, with guaranteed bandwidth and low latency for 500 GB of daily data transfer. Provisioning time is not a concern.',
    options: [
      'Site-to-Site VPN Gateway',
      'Azure ExpressRoute',
      'Azure Front Door',
      'Azure Traffic Manager',
    ],
    answer: 1,
    rationale: 'ExpressRoute is correct: a private, dedicated connection through a carrier that never uses the public internet, with guaranteed bandwidth and lower latency. A VPN runs over the public internet with best-effort performance and is generally unacceptable for strict "no public internet" compliance. Front Door and Traffic Manager are global routing services, not dedicated hybrid connectivity.',
  },
  {
    domain: 'infrastructure',
    scenario: 'A public web app in a single region needs SSL termination, a Web Application Firewall (WAF), and path-based routing between two App Services.',
    options: [
      'Azure Load Balancer (Layer 4)',
      'Azure Application Gateway',
      'Azure Front Door',
      'Azure Traffic Manager',
    ],
    answer: 1,
    rationale: 'Application Gateway is the regional Layer 7 load balancer with SSL termination, WAF, and path/host-based routing — a perfect fit for a single-region web app. Azure Load Balancer is Layer 4 with no HTTP features. Front Door is the global (multi-region) Layer 7 service — overkill for single-region and not the primary choice here. Traffic Manager is DNS-based routing with no HTTP processing.',
  },
  {
    domain: 'infrastructure',
    scenario: 'A company runs a web app in multiple Azure regions and needs to route users to the nearest healthy region globally, with edge caching and automatic failover.',
    options: [
      'Azure Application Gateway',
      'Azure Front Door',
      'Azure Load Balancer (Layer 4)',
      'Azure Virtual Network peering',
    ],
    answer: 1,
    rationale: 'Azure Front Door is a global (anycast) Layer 7 service that routes users to the nearest healthy region, provides edge caching, SSL offload, and automatic failover — designed exactly for multi-region global apps. Application Gateway is regional, not global. Azure Load Balancer is regional Layer 4. VNet peering connects networks; it doesn\u2019t route internet users globally.',
  },

  // ================= IDENTITY & GOVERNANCE =================
  {
    domain: 'identity',
    scenario: 'An organization wants to grant administrators temporary, just-in-time access to a privileged role, with time limits and approval, instead of standing permanent admin rights.',
    options: [
      'Azure RBAC (permanent role assignment)',
      'Microsoft Entra ID Privileged Identity Management (PIM)',
      'Azure Policy',
      'Azure Key Vault',
    ],
    answer: 1,
    rationale: 'Privileged Identity Management (PIM) provides just-in-time (JIT) activation of privileged roles with time bounds, approval workflows, and audit logging. Permanent RBAC assignments grant standing access — the opposite of least privilege. Azure Policy enforces resource rules, not access. Key Vault stores secrets, not roles.',
  },
  {
    domain: 'identity',
    scenario: 'A company needs to enforce that every resource carries required tags, and that only approved Azure regions can be used, across the entire organization automatically.',
    options: [
      'Azure RBAC',
      'Azure Policy',
      'Microsoft Entra ID conditional access',
      'Azure Blueprints',
    ],
    answer: 1,
    rationale: 'Azure Policy evaluates resources against rules and can deny or audit non-compliant resources — exactly how you enforce naming conventions, required tags, and allowed regions automatically. RBAC controls who can do what, not resource properties. Conditional access governs sign-in conditions. Blueprints bundle policies with RBAC and templates for repeatable deployments, but the enforcement mechanism itself is Policy.',
  },
  {
    domain: 'identity',
    scenario: 'An enterprise has 40 subscriptions across business units and needs to apply governance (policy + RBAC) and organize them under a single hierarchy with inheritance.',
    options: [
      'Azure Resource Groups',
      'Azure Management Groups',
      'Azure Blueprints',
      'Microsoft Entra ID groups',
    ],
    answer: 1,
    rationale: 'Management Groups provide a hierarchical container above subscriptions (up to six levels) where policies and RBAC assignments inherit downward — the standard way to govern many subscriptions. Resource groups are below subscriptions and can\u2019t span them. Blueprints deploy a governance bundle but aren\u2019t the hierarchy container. Entra ID groups manage identities, not subscription hierarchy.',
  },
  {
    domain: 'identity',
    scenario: 'A team must manage a group of Azure resources as one lifecycle unit, prevent unmanaged resources from accumulating, and protect managed resources from unauthorized changes. The design must use the recommended replacement for Azure Blueprints.',
    options: [
      'Azure Deployment Stacks',
      'A new Azure Blueprint definition',
      'Azure Policy alone',
      'Azure Lighthouse',
    ],
    answer: 0,
    rationale: 'Azure Deployment Stacks manage a collection of resources as a lifecycle unit and can detach or delete resources removed from the template. Deny settings can protect managed resources. Azure Blueprints is being retired, and Microsoft recommends Deployment Stacks and Template Specs as replacements. Policy enforces resource rules; Lighthouse supports cross-tenant management.',
  },
  {
    domain: 'identity',
    scenario: 'A company has predictable, always-on production VMs in a fixed region and VM family for three years. They can commit to that specific configuration and want the largest applicable discount.',
    options: [
      'Azure Spot Virtual Machines',
      'Azure Reserved Instances',
      'Azure Savings Plan for compute',
      'Pay-as-you-go with autoscale to zero',
    ],
    answer: 1,
    rationale: 'Reserved VM Instances fit a stable, specific VM requirement and a one- or three-year commitment. A savings plan is more flexible across eligible compute services, but a reservation is the targeted choice when the region and VM family are fixed. Spot VMs can be evicted, and pay-as-you-go gives up the commitment discount.',
  },
  {
    domain: 'identity',
    scenario: 'A security team needs to detect threats, correlate signals across resources, support hunting, and automate incident response across the cloud estate.',
    options: [
      'Azure Monitor',
      'Microsoft Sentinel',
      'Azure Log Analytics workspace',
      'Azure Application Insights',
    ],
    answer: 1,
    rationale: 'Microsoft Sentinel is the SIEM/SOAR service built for security: threat detection, signal correlation, hunting, and automated response playbooks. Azure Monitor (with Log Analytics and Application Insights) is operational telemetry and diagnostics, not a security SIEM. Sentinel runs on top of a Log Analytics workspace, but the workspace alone has no threat-detection or SOAR capability.',
  },

  // ================= DATA STORAGE =================
  {
    domain: 'storage',
    scenario: 'An application requires a relational database with ACID transactions, complex joins, and it already runs on SQL Server. The team wants a fully managed service with minimal changes.',
    options: [
      'Azure Cosmos DB',
      'Azure SQL Database',
      'Azure Blob Storage',
      'Azure Data Lake Storage',
    ],
    answer: 1,
    rationale: 'Azure SQL Database is the managed PaaS SQL Server offering — relational, ACID, with full support for joins and existing SQL Server workloads, so it\u2019s the natural lift for a relational app. Cosmos DB is a globally distributed NoSQL database (wrong for a relational/join-heavy workload). Blob and Data Lake are object/analytics stores, not transactional databases.',
  },
  {
    domain: 'storage',
    scenario: 'A mobile app needs a globally distributed database with single-digit-millisecond latency in every region, a flexible schema, and multi-region writes.',
    options: [
      'Azure SQL Database',
      'Azure Cosmos DB',
      'Azure Database for PostgreSQL',
      'Azure Table Storage',
    ],
    answer: 1,
    rationale: 'Azure Cosmos DB provides turnkey global distribution, multi-region writes, tunable consistency, and low single-digit-millisecond latency with a schema-flexible (NoSQL) model — exactly this scenario. Azure SQL Database and PostgreSQL are relational and single-region-primary by default. Table Storage is a legacy simple key-value store without global multi-master writes or the low-latency SLA.',
  },
  {
    domain: 'storage',
    scenario: 'A company archives 40 TB of data that must be retained 10 years for compliance and is almost never read. They want the absolute cheapest storage and can tolerate slow retrieval.',
    options: [
      'Hot tier',
      'Cool tier',
      'Cold tier',
      'Archive tier',
    ],
    answer: 3,
    rationale: 'The Archive tier is the cheapest and is offline — data must be rehydrated before access (up to ~15 hours for standard retrieval). That\u2019s the correct trade for compliance data that\u2019s almost never read. Hot, Cool, and Cold tiers are all online and progressively cheaper but still far more expensive than Archive; Cold is for rarely accessed data that must remain instantly readable, which isn\u2019t the case here.',
  },
  {
    domain: 'storage',
    scenario: 'A company has data that is accessed only once per quarter, but when it is accessed it must be available in milliseconds with no rehydration delay.',
    options: [
      'Archive tier',
      'Cold tier',
      'Hot tier',
      'Azure Files share',
    ],
    answer: 1,
    rationale: 'The Cold tier is online storage for rarely accessed data that must still be instantly retrievable (millisecond access, no rehydration). Archive would require rehydration (hours) and is wrong when instant access is a requirement. Hot is for frequent access and costs more. Azure Files is a file-share service, not an object storage tier.',
  },
  {
    domain: 'storage',
    scenario: 'An application stores large, unstructured objects — images, videos, and static website assets — and needs massively scalable, cheap object storage accessible via HTTP(S).',
    options: [
      'Azure Files',
      'Azure Blob Storage',
      'Azure SQL Database',
      'Azure Cosmos DB',
    ],
    answer: 1,
    rationale: 'Azure Blob Storage is the object storage service for unstructured data (images, video, static assets) with massive scale, low cost, and HTTP(S) access — the right fit. Azure Files provides SMB/NFS file shares (for lift-and-shift, not raw object storage). SQL and Cosmos are transactional databases, not object stores.',
  },
  {
    domain: 'storage',
    scenario: 'A company must ensure its storage data survives a complete regional outage of the primary region, with automatic replication to a secondary region.',
    options: [
      'Locally redundant storage (LRS)',
      'Zone-redundant storage (ZRS)',
      'Geo-redundant storage (GRS)',
      'Premium SSD managed disks',
    ],
    answer: 2,
    rationale: 'Geo-redundant storage (GRS) replicates data asynchronously to a secondary region, protecting against a full regional outage. LRS keeps three copies within a single datacenter (fails if the region fails). ZRS spans availability zones within one region (still fails on a region-wide outage). Premium SSDs are a disk performance tier, not a replication strategy.',
  },

  // ================= BUSINESS CONTINUITY =================
  {
    domain: 'continuity',
    scenario: 'An application must survive the loss of an entire datacenter (e.g., power or cooling failure) within its Azure region without any application change.',
    options: [
      'Availability Set',
      'Availability Zone',
      'Geo-redundant storage (GRS)',
      'Azure Site Recovery to a second region',
    ],
    answer: 1,
    rationale: 'Availability Zones are physically separate datacenter groups within a region. Deploying two or more VMs across zones protects compute from a zone failure and qualifies for the applicable multi-VM availability SLA. An Availability Set protects against fault and update domains within a datacenter, GRS protects storage data, and Site Recovery is a cross-region disaster-recovery design.',
  },
  {
    domain: 'continuity',
    scenario: 'A legacy application cannot use Availability Zones (region doesn\u2019t support them). It needs high availability within the region against hardware faults and planned maintenance.',
    options: [
      'Azure Site Recovery',
      'Availability Set',
      'Geo-redundant storage',
      'Azure Traffic Manager',
    ],
    answer: 1,
    rationale: 'An Availability Set places VMs across fault domains (separate racks) and update domains (separate maintenance groups), protecting against hardware failures and planned maintenance within a single datacenter — the right tool when Availability Zones aren\u2019t available. Site Recovery is for disaster recovery, not intra-region HA. GRS is data replication. Traffic Manager is global DNS routing.',
  },
  {
    domain: 'continuity',
    scenario: 'A business-critical app must recover from a complete region failure with an RTO of a few hours and RPO of minutes, automatically failing over compute and data to another region.',
    options: [
      'Availability Set',
      'Azure Site Recovery to a second region',
      'Availability Zone',
      'Locally redundant storage',
    ],
    answer: 1,
    rationale: 'Azure Site Recovery orchestrates replication and failover of workloads to a secondary region — the standard DR solution for recovering from a full regional outage with defined RTO/RPO. Availability Sets and Zones are intra-region high availability and do nothing when the whole region is down. LRS keeps data in one datacenter only.',
  },
  {
    domain: 'continuity',
    scenario: 'A company needs an Azure SQL Database with automatic failover to a secondary region, an RTO of minutes, and a read-only replica for reporting.',
    options: [
      'SQL Database active geo-replication (no auto-failover)',
      'SQL Database auto-failover group',
      'Database backup with manual restore',
      'A single database in an Availability Set',
    ],
    answer: 1,
    rationale: 'An auto-failover group provides automatic failover, a read-write listener endpoint, read-only replicas, and an RTO of minutes — the right choice. Active geo-replication alone gives readable secondaries but no automatic failover or listener. Manual restore from backup has a far longer RTO/RPO. Databases can\u2019t be placed in an Availability Set (that\u2019s for VMs).',
  },
  {
    domain: 'continuity',
    scenario: 'A company needs point-in-time restore to recover from accidental deletion or corruption, plus synchronous copies to tolerate a disk failure with zero data loss.',
    options: [
      'Replication alone',
      'Backup alone',
      'Both backup and replication',
      'Neither — rely on region pairs',
    ],
    answer: 2,
    rationale: 'Backup and replication solve different problems and are complementary. Backup gives point-in-time restore for logical errors (accidental delete/corruption). Replication maintains live synchronous copies to survive a hardware failure with near-zero data loss. You need both: replication doesn\u2019t protect against a bad delete (it replicates it instantly), and backup alone can\u2019t meet zero-data-loss availability targets.',
  },
  {
    domain: 'continuity',
    scenario: 'A company wants to replicate its on-premises VMware and Hyper-V VMs to Azure for disaster recovery, enabling failover to Azure if the on-premises site goes down.',
    options: [
      'Azure Backup',
      'Azure Site Recovery',
      'Azure Migrate',
      'Azure ExpressRoute',
    ],
    answer: 1,
    rationale: 'Azure Site Recovery continuously replicates on-premises (and Azure) VMs to Azure and orchestrates failover and failback for disaster recovery. Azure Backup is for point-in-time backups, not continuous DR replication/failover. Azure Migrate is for assessment and one-time migration, not ongoing DR. ExpressRoute is networking, not replication.',
  },
];

const STUDY_GUIDE = 'https://learn.microsoft.com/en-us/credentials/certifications/resources/study-guides/az-305';

// Explicit IDs and objectives keep saved progress intact when the bank is reordered.
const coreMetadata = [
  ['infra-compute-functions', 'Compute solutions', 'Serverless compute'],
  ['infra-compute-vm', 'Compute solutions', 'Virtual machine solutions'],
  ['infra-compute-aks', 'Compute solutions', 'Container solutions'],
  ['infra-compute-container-apps', 'Compute solutions', 'Container solutions'],
  ['infra-network-vpn', 'Network solutions', 'Hybrid connectivity'],
  ['infra-network-expressroute', 'Network solutions', 'Hybrid connectivity'],
  ['infra-network-app-gateway', 'Network solutions', 'Load balancing and routing'],
  ['infra-network-front-door', 'Network solutions', 'Load balancing and routing'],
  ['identity-pim', 'Governance', 'Identity governance'],
  ['identity-policy', 'Governance', 'Compliance management'],
  ['identity-management-groups', 'Governance', 'Resource hierarchy'],
  ['identity-deployment-stacks', 'Governance', 'Compliant environments'],
  ['infra-compute-reservations', 'Compute solutions', 'Workload cost requirements'],
  ['identity-sentinel', 'Logging and monitoring', 'Security monitoring'],
  ['storage-sql-database', 'Relational data', 'Relational data services'],
  ['storage-cosmos-global', 'Semi-structured and unstructured data', 'Semi-structured data'],
  ['storage-blob-archive', 'Semi-structured and unstructured data', 'Performance and cost'],
  ['storage-blob-cold', 'Semi-structured and unstructured data', 'Performance and cost'],
  ['storage-blob-objects', 'Semi-structured and unstructured data', 'Unstructured data'],
  ['storage-grs', 'Semi-structured and unstructured data', 'Protection and durability'],
  ['continuity-availability-zones', 'High availability', 'Compute availability'],
  ['continuity-availability-set', 'High availability', 'Compute availability'],
  ['continuity-site-recovery-region', 'Backup and disaster recovery', 'Recovery objectives'],
  ['continuity-sql-failover-group', 'High availability', 'Relational data availability'],
  ['continuity-backup-replication', 'Backup and disaster recovery', 'Recovery objectives'],
  ['continuity-site-recovery-hybrid', 'Backup and disaster recovery', 'Compute recovery'],
];

const expandedQuestions = [
  {
    id: 'infra-compute-batch', domain: 'infrastructure', objective: 'Compute solutions', skill: 'Batch processing', difficulty: 2,
    scenario: 'A research team must run 20,000 independent rendering tasks overnight. Nodes can be created only for the job and removed afterward, and the team does not want to operate a scheduler.',
    options: ['Azure Batch', 'Azure Functions Premium', 'Azure Kubernetes Service', 'Virtual Machine Scale Sets managed manually'], answer: 0,
    rationale: 'Azure Batch supplies managed job scheduling, pools, task distribution, and automatic node scaling for large parallel workloads. Functions is optimized for event-driven executions rather than long compute pools. AKS and manually managed scale sets require the team to operate more of the scheduling platform.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/batch/batch-service-workflow-features',
  },
  {
    id: 'infra-app-service-bus', domain: 'infrastructure', objective: 'Application architecture', skill: 'Messaging architecture', difficulty: 2,
    scenario: 'An order service must reliably send commands to a fulfillment service. Messages must survive receiver downtime, be processed once by one competing consumer, and support dead-lettering.',
    options: ['Azure Event Grid', 'Azure Service Bus queue', 'Azure Event Hubs', 'Azure Front Door'], answer: 1,
    rationale: 'A Service Bus queue provides durable brokered commands, competing consumers, locks, and dead-lettering. Event Grid distributes discrete events to subscribers, Event Hubs ingests high-volume telemetry streams, and Front Door routes HTTP traffic.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/service-bus-messaging/service-bus-messaging-overview',
  },
  {
    id: 'infra-app-event-grid', domain: 'infrastructure', objective: 'Application architecture', skill: 'Event-driven architecture', difficulty: 2,
    scenario: 'When a blob is created, several independent subscribers must react within seconds. Publishers must not know subscriber endpoints, and the system should use push-based event delivery.',
    options: ['Azure Event Grid', 'Azure Service Bus queue', 'Azure ExpressRoute', 'Azure Files'], answer: 0,
    rationale: 'Event Grid is a push-based event-distribution service with publisher/subscriber decoupling and fan-out. A queue normally delivers each message to one competing consumer; ExpressRoute and Azure Files do not provide event routing.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/event-grid/overview',
  },
  {
    id: 'infra-app-api-management', domain: 'infrastructure', objective: 'Application architecture', skill: 'API integration', difficulty: 2,
    scenario: 'A company must publish internal and partner APIs through one gateway with subscription keys, quotas, request transformation, versioning, and a developer portal.',
    options: ['Azure API Management', 'Azure Application Gateway', 'Azure Load Balancer', 'Azure App Configuration'], answer: 0,
    rationale: 'API Management provides API policies, products, subscriptions, quotas, versions, analytics, and a developer portal. Application Gateway secures and routes regional web traffic but is not an API lifecycle platform.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/api-management/api-management-key-concepts',
  },
  {
    id: 'infra-app-managed-redis', domain: 'infrastructure', objective: 'Application architecture', skill: 'Caching', difficulty: 2,
    scenario: 'A read-heavy application repeatedly queries the same product catalog. The team needs a managed, in-memory cache to reduce database latency and load.',
    options: ['Azure Managed Redis', 'Azure Service Bus', 'Azure Data Factory', 'Azure Blob Archive'], answer: 0,
    rationale: 'Azure Managed Redis is the managed in-memory cache designed to reduce data-store latency and load. The other services provide messaging, integration, or archival storage rather than application caching.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/redis/overview',
  },
  {
    id: 'infra-migrate-assess', domain: 'infrastructure', objective: 'Migrations', skill: 'Assess on-premises workloads', difficulty: 2,
    scenario: 'Before moving 300 on-premises servers, a company needs dependency discovery, Azure readiness checks, right-sizing, and estimated monthly cost without installing an agent on every server.',
    options: ['Azure Migrate discovery and assessment', 'Azure Site Recovery', 'Azure Advisor', 'Microsoft Sentinel'], answer: 0,
    rationale: 'Azure Migrate discovery and assessment inventories servers, analyzes dependencies and readiness, recommends sizes, and estimates costs. Site Recovery is primarily disaster recovery and migration replication; Advisor evaluates resources already in Azure.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/migrate/migrate-services-overview',
  },
  {
    id: 'identity-monitor-diagnostic-routing', domain: 'identity', objective: 'Logging and monitoring', skill: 'Route logs', difficulty: 2,
    scenario: 'Platform logs from subscriptions must be retained for seven years at low cost while the most recent 90 days remain queryable with KQL for operations.',
    options: ['Diagnostic settings to Log Analytics and Storage', 'Application Insights only', 'Microsoft Defender for Cloud only', 'Azure Policy remediation logs'], answer: 0,
    rationale: 'Azure Monitor diagnostic settings can route platform logs to multiple destinations. Log Analytics supports KQL analysis for active operations, while Storage supports economical long-term retention.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/diagnostic-settings',
  },
  {
    id: 'identity-auth-managed-identity', domain: 'identity', objective: 'Authentication and authorization', skill: 'Identity management', difficulty: 2,
    scenario: 'An App Service must access Key Vault without storing a client secret in code, configuration, or a deployment pipeline.',
    options: ['System-assigned managed identity', 'Shared access signature', 'Local administrator account', 'Storage account access key'], answer: 0,
    rationale: 'A managed identity gives the App Service an automatically managed Microsoft Entra identity. Azure RBAC or a Key Vault access policy can authorize it without application-managed credentials.',
    sourceUrl: 'https://learn.microsoft.com/en-us/entra/identity/managed-identities-azure-resources/overview',
  },
  {
    id: 'identity-auth-key-vault', domain: 'identity', objective: 'Authentication and authorization', skill: 'Secrets, certificates, and keys', difficulty: 2,
    scenario: 'Applications need centralized storage for secrets and certificates with rotation, access auditing, and hardware-protected keys for the most sensitive workloads.',
    options: ['Azure Key Vault', 'Azure App Configuration', 'Azure Policy', 'Log Analytics workspace'], answer: 0,
    rationale: 'Key Vault manages secrets, keys, and certificates, records access through diagnostic logs, and offers HSM-backed key options. App Configuration is for application settings and feature flags, not secret custody.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/key-vault/general/overview',
  },
  {
    id: 'identity-auth-rbac', domain: 'identity', objective: 'Authentication and authorization', skill: 'Authorize Azure resources', difficulty: 2,
    scenario: 'A support team must restart virtual machines in one resource group but must not create, delete, resize, or access VMs elsewhere.',
    options: ['A least-privilege custom Azure RBAC role scoped to the resource group', 'Global Administrator', 'Contributor at subscription scope', 'An Azure Policy deny assignment'], answer: 0,
    rationale: 'Azure RBAC combines a role definition with a scope. A custom role containing only the required VM actions at the resource-group scope meets least privilege; the broader built-in roles grant unnecessary access.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/role-based-access-control/overview',
  },
  {
    id: 'identity-auth-conditional-access', domain: 'identity', objective: 'Authentication and authorization', skill: 'Authentication', difficulty: 2,
    scenario: 'Administrators must use phishing-resistant multifactor authentication when accessing Azure management, and sign-ins from noncompliant devices must be blocked.',
    options: ['Microsoft Entra Conditional Access', 'Azure RBAC', 'Azure Policy', 'Network Security Groups'], answer: 0,
    rationale: 'Conditional Access evaluates identity, device, location, risk, and target-resource signals to enforce authentication controls. RBAC authorizes actions after sign-in; Azure Policy and NSGs do not govern user authentication.',
    sourceUrl: 'https://learn.microsoft.com/en-us/entra/identity/conditional-access/overview',
  },
  {
    id: 'storage-sql-managed-instance', domain: 'storage', objective: 'Relational data', skill: 'Relational data services', difficulty: 2,
    scenario: 'A SQL Server application uses cross-database queries, SQL Agent jobs, and instance-scoped features. The company wants PaaS management with the fewest database changes.',
    options: ['Azure SQL Managed Instance', 'Azure SQL Database single database', 'Azure Cosmos DB', 'SQL Server on an Azure VM as the first choice'], answer: 0,
    rationale: 'SQL Managed Instance provides broad SQL Server instance compatibility, including cross-database capabilities and SQL Agent, while retaining PaaS operations. SQL Database has a more isolated database model; a VM adds management overhead.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-sql/managed-instance/sql-managed-instance-paas-overview',
  },
  {
    id: 'storage-sql-serverless', domain: 'storage', objective: 'Relational data', skill: 'Service and compute tiers', difficulty: 2,
    scenario: 'A development database is used unpredictably for a few hours each week. It can tolerate a warm-up delay and should stop compute billing during long idle periods.',
    options: ['Azure SQL Database serverless compute tier with auto-pause', 'Provisioned Business Critical tier', 'SQL Managed Instance reserved capacity', 'Azure Cosmos DB provisioned throughput'], answer: 0,
    rationale: 'The SQL Database serverless tier automatically scales compute and can auto-pause, making it appropriate for intermittent use. Provisioned and reserved-capacity choices suit steadier workloads.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/azure-sql/database/serverless-tier-overview',
  },
  {
    id: 'storage-integration-data-factory', domain: 'storage', objective: 'Data integration', skill: 'Data integration', difficulty: 2,
    scenario: 'A company needs a managed service to schedule and orchestrate movement and transformation of data from on-premises SQL Server, SaaS systems, and Azure storage into a data lake.',
    options: ['Azure Data Factory', 'Azure Front Door', 'Azure Policy', 'Azure Backup'], answer: 0,
    rationale: 'Data Factory provides managed pipelines, connectors, scheduling, data movement, and transformation orchestration across on-premises and cloud sources.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/data-factory/introduction',
  },
  {
    id: 'storage-analysis-synapse', domain: 'storage', objective: 'Data integration', skill: 'Data analysis', difficulty: 2,
    scenario: 'Analysts need to query a petabyte-scale data lake with SQL and combine it with a dedicated enterprise data warehouse in one analytics workspace.',
    options: ['Azure Synapse Analytics', 'Azure Files', 'Azure Service Bus', 'Azure DNS'], answer: 0,
    rationale: 'Synapse combines SQL-based data warehousing, serverless querying over a data lake, Spark integration, and pipelines in a unified analytics workspace.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/synapse-analytics/overview-what-is',
  },
  {
    id: 'continuity-vm-backup', domain: 'continuity', objective: 'Backup and disaster recovery', skill: 'Compute backup and recovery', difficulty: 2,
    scenario: 'Azure virtual machines need policy-based daily backups, application-consistent recovery points, centralized monitoring, and protection against accidental deletion of backups.',
    options: ['Azure Backup using a Recovery Services vault', 'Availability Sets', 'Azure Load Balancer', 'Azure Migrate assessment'], answer: 0,
    rationale: 'Azure Backup and a Recovery Services vault provide managed VM backup policies, recovery points, monitoring, and protections such as soft delete. Availability constructs improve uptime but do not provide historical recovery points.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/backup/backup-azure-vms-introduction',
  },
  {
    id: 'continuity-blob-operational-backup', domain: 'continuity', objective: 'Backup and disaster recovery', skill: 'Unstructured data recovery', difficulty: 3,
    scenario: 'A storage account needs rapid point-in-time recovery of block blobs after an application accidentally deletes or corrupts many objects. Recovery should remain within the source storage account.',
    options: ['Operational backup for Azure Blobs', 'GRS replication alone', 'An Availability Set', 'Azure Site Recovery'], answer: 0,
    rationale: 'Operational backup for blobs uses point-in-time restore capabilities for fast in-account recovery. Geo-replication copies destructive changes and therefore does not replace backup; compute availability services do not recover blob versions.',
    sourceUrl: 'https://learn.microsoft.com/en-us/azure/backup/blob-backup-overview',
  },
];

export const questions = [
  ...coreQuestions.map((question, index) => {
    const [id, objective, skill] = coreMetadata[index];
    return { ...question, id, objective, skill, difficulty: 2, sourceUrl: STUDY_GUIDE };
  }),
  ...expandedQuestions,
];
