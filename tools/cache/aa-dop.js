// DOP-C02 practice bank — original questions written in exam style, validated against AWS docs.
// Not real/leaked exam content. Schema: see README.md.
window.QUESTIONS = [
  // ============================ Domain 1: SDLC Automation ============================
  {
    id: 'dop-0001', domain: 1, type: 'single', numToSelect: 1,
    stem: 'On every merge to the main branch, a microservice must run unit tests, build a container image, push it to Amazon ECR, deploy to a staging Amazon ECS service, and then deploy to production only after a release manager approves. The team wants the least custom orchestration code and a durable, auditable record of every release. Which approach best meets these requirements?',
    options: [
      { key: 'A', text: 'Use AWS CodePipeline with a CodeBuild stage for tests and image build/push, an ECS deploy action to staging, a manual approval action, then an ECS deploy action to production' },
      { key: 'B', text: 'Trigger an AWS Lambda function on each commit that runs tests and shells out to the AWS CLI to build, push, and deploy at every stage' },
      { key: 'C', text: 'Schedule an AWS CodeBuild project every five minutes to detect new commits, then build and deploy straight to production' },
      { key: 'D', text: 'Run a self-managed Jenkins server on Amazon EC2 that performs all stages and writes its own approval and audit log' }
    ],
    correct: ['A'],
    explanation: 'CodePipeline natively orchestrates source -> build/test -> staging deploy -> manual approval -> production deploy and records each execution (including the approver) for auditing, with no orchestration code. A Lambda+CLI driver is custom orchestration to maintain; the scheduled build polls and skips staging/approval; self-managed Jenkins adds undifferentiated server management.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome.html'
  },
  {
    id: 'dop-0002', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A production AWS Lambda function fronted by Amazon API Gateway serves live traffic. The team must release a new version so that 10% of invocations go to it for 5 minutes before full promotion, with automatic rollback if the function error rate rises, no change required of API clients, and the least custom code. Which approach is MOST operationally efficient?',
    options: [
      { key: 'A', text: 'Publish a new function version behind a Lambda alias and use AWS CodeDeploy canary traffic shifting (Canary10Percent5Minutes) with a CloudWatch alarm configured for automatic rollback' },
      { key: 'B', text: 'Keep two function versions and add a wrapper Lambda that forwards roughly 10% of invocations to the new version, reverting by editing the wrapper when errors appear' },
      { key: 'C', text: 'Create a second API Gateway stage that integrates the new version and use a Route 53 weighted record to send 10% of traffic to it' },
      { key: 'D', text: 'Deploy the new code with CodeDeployDefault.LambdaAllAtOnce and watch the error metrics afterward' }
    ],
    correct: ['A'],
    explanation: 'A Lambda alias with CodeDeploy canary shifting moves a defined percentage for a set interval and rolls back automatically when an associated CloudWatch alarm fires, with no client change and minimal configuration. A wrapper function is custom routing code; a second stage plus Route 53 adds stage and DNS overhead; AllAtOnce provides no gradual shift or automatic rollback window.',
    reference: 'https://docs.aws.amazon.com/lambda/latest/dg/configuration-aliases.html'
  },
  {
    id: 'dop-0003', domain: 1, type: 'single', numToSelect: 1,
    stem: 'An Amazon ECS on AWS Fargate service behind an Application Load Balancer must be updated so that the new task set is validated through a separate test listener before any production traffic reaches it, production cutover is near-instant, and rollback to the previous task set takes seconds if validation fails. Which deployment configuration meets all of these requirements?',
    options: [
      { key: 'A', text: 'A CodeDeploy blue/green deployment for ECS with two target groups and a test listener, using lifecycle hooks to validate the green task set before the production listener is shifted' },
      { key: 'B', text: 'An ECS rolling update with minimumHealthyPercent 100 and maximumPercent 200, validating the tasks after they are replaced' },
      { key: 'C', text: 'An in-place task definition update that relies on the ECS deployment circuit breaker to roll back on failed health checks' },
      { key: 'D', text: 'Deploy the new task definition to a second ECS cluster and repoint the ALB target group manually after testing' }
    ],
    correct: ['A'],
    explanation: 'ECS blue/green via CodeDeploy supports a test listener and BeforeAllowTraffic/AfterAllowTraffic hooks to validate the green task set before the production listener is shifted, giving near-instant cutover and seconds-fast rollback by routing back to the original task set. Rolling updates and the circuit breaker replace tasks without a separately validated green environment; a second cluster with manual repointing is slower and error-prone.',
    reference: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-bluegreen.html'
  },
  {
    id: 'dop-0004', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A CodeBuild project for a large service spends most of each 14-minute build re-downloading dependencies and rebuilding Docker layers that rarely change. The team wants to cut build time with no build infrastructure to operate and without committing dependencies or prebuilt images to the source repository. What should they do?',
    options: [
      { key: 'A', text: 'Enable CodeBuild caching: a local cache for the dependency directory and Docker layer cache, or an Amazon S3 cache shared across builds' },
      { key: 'B', text: 'Move builds to a fleet of self-managed Amazon EC2 build agents with pre-warmed dependency caches' },
      { key: 'C', text: 'Commit the resolved dependencies and a prebuilt base image into the repository so they are not downloaded' },
      { key: 'D', text: 'Batch merges and run the build once nightly to reduce how often dependencies are downloaded' }
    ],
    correct: ['A'],
    explanation: 'CodeBuild local caching (custom paths plus Docker layer cache) or S3 caching reuses dependencies and unchanged image layers across builds with no servers to manage and without bloating the repo. Self-managed agents add operational overhead, committing dependencies and images is explicitly excluded, and nightly batching does not reduce per-build time and delays feedback.',
    reference: 'https://docs.aws.amazon.com/codebuild/latest/userguide/build-caching.html'
  },
  {
    id: 'dop-0005', domain: 1, type: 'multi', numToSelect: 2,
    stem: 'A CodePipeline in a shared tooling account builds encrypted artifacts and must deploy them by creating CloudFormation stacks in a separate production account. The deployment currently fails when the production-account actions try to read the artifacts. Which TWO configurations are required for the cross-account deployment to succeed?',
    options: [
      { key: 'A', text: 'Encrypt the artifact bucket with a customer-managed KMS key whose key policy grants usage to the production account, and reference that key in the pipeline' },
      { key: 'B', text: 'Create an IAM role in the production account that trusts the tooling account, grant it artifact bucket and KMS decrypt access, and have the pipeline assume it to deploy' },
      { key: 'C', text: 'Grant the pipeline service role only s3:GetObject on the artifact bucket, without any KMS permissions' },
      { key: 'D', text: 'Replace the customer-managed key with the AWS managed aws/s3 key and share it by editing its key policy' },
      { key: 'E', text: 'Establish a VPC peering connection between the accounts so the pipeline can reach CloudFormation' }
    ],
    correct: ['A', 'B'],
    explanation: 'Cross-account artifacts must be encrypted with a customer-managed KMS key shared through its key policy (the default aws/s3 key policy cannot be edited to share it), and the pipeline must assume a role in the production account that can read the bucket and decrypt with that key. GetObject without kms:Decrypt fails on encrypted artifacts, and CloudFormation is reached over its public endpoint rather than VPC peering.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-create-cross-account.html'
  },
  {
    id: 'dop-0006', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A pipeline deploys to production automatically. A new compliance control requires that a designated release manager explicitly approve each production deployment, that the approver be notified when a release is waiting, and that who approved and when be auditable, all with no custom code. What should be added before the production stage?',
    options: [
      { key: 'A', text: 'A CodePipeline manual approval action that publishes to an SNS topic for notification; the approver and timestamp are recorded in the pipeline execution history and CloudTrail' },
      { key: 'B', text: 'An SNS topic that emails the release manager, who then manually starts a separate production pipeline from the console' },
      { key: 'C', text: 'A Lambda invoke action that waits for and parses an approval reply email before continuing' },
      { key: 'D', text: 'A CloudWatch alarm that holds the pipeline until an on-call engineer acknowledges it' }
    ],
    correct: ['A'],
    explanation: 'A manual approval action gates the pipeline, can notify through SNS, and records the approver and timestamp in the execution history and CloudTrail with no code. Email-then-manual-start is not a recorded in-pipeline approval, an email-parsing Lambda is custom code, and CloudWatch alarms do not gate pipeline stages.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html'
  },
  {
    id: 'dop-0007', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A CodeDeploy blue/green deployment to Amazon EC2 must run an automated integration test suite against the replacement (green) instances and abort the deployment so that no production traffic is ever shifted if the tests fail. In which AppSpec lifecycle event hook should the tests run, and what is the effect of a failure?',
    options: [
      { key: 'A', text: 'BeforeAllowTraffic; a non-zero hook exit fails the deployment before the load balancer routes production traffic, triggering rollback' },
      { key: 'B', text: 'AfterAllowTraffic; the tests run once the green instances are already serving production traffic' },
      { key: 'C', text: 'ApplicationStop; the hook runs on the original (blue) instances as they are deregistered' },
      { key: 'D', text: 'ValidateService on the blue instances before the green instances are provisioned' }
    ],
    correct: ['A'],
    explanation: 'BeforeAllowTraffic runs after the green instances are provisioned but before the load balancer routes production traffic; a non-zero exit fails the deployment and triggers rollback, so users never reach a bad build. AfterAllowTraffic is post-cutover, ApplicationStop runs on the outgoing instances, and ValidateService on blue is the wrong target and timing.',
    reference: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html'
  },
  {
    id: 'dop-0008', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A CodeDeploy EC2/on-premises deployment must automatically redeploy the last known good revision whenever a deployment fails OR a CloudWatch alarm for elevated 5xx errors enters ALARM during or shortly after the deployment, with the least configuration and no operator action. How should this be configured?',
    options: [
      { key: 'A', text: 'Enable automatic rollback on deployment failure and on alarm in the deployment group, and associate the 5xx CloudWatch alarm' },
      { key: 'B', text: 'Create an EventBridge rule on the alarm that invokes a Lambda function which calls CreateDeployment with the previous revision' },
      { key: 'C', text: 'Run a scheduled canary-analysis Lambda that decides each interval whether to revert to the prior revision' },
      { key: 'D', text: 'Rely on the Amazon ECS deployment circuit breaker to revert the application' }
    ],
    correct: ['A'],
    explanation: 'CodeDeploy deployment groups natively support automatic rollback on deployment failure and on associated CloudWatch alarms, redeploying the last successful revision with no custom code or operator action. An EventBridge+Lambda rollback is custom orchestration, a scheduled analysis adds latency, and the ECS circuit breaker does not apply to EC2/on-premises deployments.',
    reference: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html'
  },
  {
    id: 'dop-0009', domain: 1, type: 'multi', numToSelect: 2,
    stem: 'A security team requires that every pipeline execution perform static application security testing (SAST) and software composition analysis (dependency scanning), stop before deploying if either finds a Critical issue, and centralize the findings in AWS Security Hub. Which TWO actions implement these requirements?',
    options: [
      { key: 'A', text: 'Add CodeBuild stages that run the SAST and dependency-scanning tools and exit non-zero on Critical findings so the pipeline halts before deployment' },
      { key: 'B', text: 'Have the build convert results to the AWS Security Finding Format and import them to Security Hub (for example, via BatchImportFindings)' },
      { key: 'C', text: 'Use Amazon Inspector to perform SAST by scanning the source code repository' },
      { key: 'D', text: 'Add a manual approval action and have a reviewer read the scan logs before each deployment' },
      { key: 'E', text: 'Enable Amazon GuardDuty to block the pipeline when it detects code vulnerabilities' }
    ],
    correct: ['A', 'B'],
    explanation: 'SAST and dependency scanning run as CodeBuild stages whose non-zero exit halts the pipeline before deployment, and findings sent to Security Hub in ASFF centralize them. Inspector scans EC2/ECR/Lambda rather than performing source SAST, a manual approval is not automated gating, and GuardDuty detects account threats, not code vulnerabilities.',
    reference: 'https://docs.aws.amazon.com/securityhub/latest/userguide/securityhub-findings-format.html'
  },
  {
    id: 'dop-0010', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A CodePipeline sourced from AWS CodeCommit must start within seconds of a push to the release branch, must avoid the cost and latency of periodic polling, and must not start for pushes to any other branch. How should the team configure the trigger?',
    options: [
      { key: 'A', text: 'Disable periodic checks and create an EventBridge rule that matches CodeCommit referenceUpdated events for the release branch and starts the pipeline' },
      { key: 'B', text: 'Keep periodic polling on the source action but reduce the polling interval to its minimum' },
      { key: 'C', text: 'Create an EventBridge scheduled rule that calls StartPipelineExecution every minute' },
      { key: 'D', text: 'Add a CodeBuild webhook on the repository to start the pipeline on each push' }
    ],
    correct: ['A'],
    explanation: 'An EventBridge rule on CodeCommit repository state-change events starts the pipeline within seconds and can filter on the branch reference, eliminating polling cost/latency and ignoring other branches. Minimum-interval polling and a per-minute scheduled rule still poll and add latency, and CodeBuild webhooks apply to third-party Git sources, not CodeCommit-triggered pipeline starts.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/triggering.html'
  },

  // ===================== Domain 2: Configuration Management & IaC =====================
  {
    id: 'dop-0011', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A production CloudFormation stack may have been changed outside of CloudFormation. An engineer runs drift detection, but a security group ingress rule that was edited manually is reported as IN_SYNC instead of drifted. What is the most likely cause, and how can the engineer get accurate drift results?',
    options: [
      { key: 'A', text: 'Drift detection only compares properties explicitly declared in the template; the edited property was left at its default and not declared, so declare it (even at its default value) and re-run drift detection' },
      { key: 'B', text: 'Drift detection is eventually consistent, so waiting about 24 hours will eventually report the manual change' },
      { key: 'C', text: 'Drift detection cannot evaluate security groups, so AWS Config must be used exclusively for this resource type' },
      { key: 'D', text: 'The stack must be deleted and recreated before drift detection can compare any properties' }
    ],
    correct: ['A'],
    explanation: 'Drift detection compares actual values only against properties explicitly set in the template or via parameters; a property left at its service default is not tracked, so a manual change to it is reported as in sync. Declaring the property makes drift detection evaluate it. Drift is not delayed by a consistency window, it supports security groups, and it does not require recreating the stack.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html'
  },
  {
    id: 'dop-0012', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A platform team must deploy a common baseline (IAM roles, a VPC, and centralized logging) to all 60 accounts in an AWS Organization and to every account that joins later, in two Regions, and update them centrally with minimal ongoing effort. Which approach meets this with the least operational overhead?',
    options: [
      { key: 'A', text: 'A service-managed CloudFormation StackSet targeting the organization or specific OUs, with automatic deployment enabled, deploying to both Regions' },
      { key: 'B', text: 'A self-managed StackSet for which the team creates execution roles in each account and adds the account IDs to the StackSet manually' },
      { key: 'C', text: 'A single CloudFormation stack in the management account that exports values for member accounts to import' },
      { key: 'D', text: 'A CodePipeline that runs the AWS CLI to deploy the template against each account ID listed in a configuration file' }
    ],
    correct: ['A'],
    explanation: 'A service-managed StackSet integrates with Organizations, deploys across many accounts and Regions in one operation, and with automatic deployment enabled adds new accounts in target OUs automatically, which is the least ongoing effort. Self-managed StackSets and a per-account pipeline require maintaining account lists and roles, and a single stack with cross-stack exports does not span accounts.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/what-is-cfnstacksets.html'
  },
  {
    id: 'dop-0013', domain: 2, type: 'multi', numToSelect: 2,
    stem: 'A team operates service-managed CloudFormation StackSets across an AWS Organization. Which TWO statements accurately describe how they behave?',
    options: [
      { key: 'A', text: 'With automatic deployment enabled, stack instances are created in accounts as they are added to a target OU and removed when accounts leave the OU' },
      { key: 'B', text: 'A single StackSet operation can create or update stack instances across multiple accounts and Regions, with configurable maximum concurrency and failure tolerance' },
      { key: 'C', text: 'Service-managed StackSets require you to manually create the StackSet execution role in every target account before deployment' },
      { key: 'D', text: 'Stack instances in different Regions of the same account share one underlying physical stack' },
      { key: 'E', text: 'StackSets can target only the organization management account, not member accounts' }
    ],
    correct: ['A', 'B'],
    explanation: 'Service-managed StackSets auto-deploy to accounts joining target OUs and remove instances when accounts leave, and one operation spans many accounts and Regions with concurrency and failure-tolerance controls. Service-managed mode uses service-linked roles rather than manually created execution roles, each account/Region pair is a separate stack instance, and member accounts can be targeted.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-concepts.html'
  },
  {
    id: 'dop-0014', domain: 2, type: 'single', numToSelect: 1,
    stem: 'An Auto Scaling group is created by CloudFormation. The stack must not report CREATE_COMPLETE for the group until a required number of instances finish bootstrapping their application, and the stack must fail if bootstrapping does not succeed within a time limit. Which configuration accomplishes this?',
    options: [
      { key: 'A', text: 'Add a CreationPolicy with ResourceSignal (Count and Timeout) to the Auto Scaling group, and have instance user data call cfn-signal with the bootstrap exit code' },
      { key: 'B', text: 'Add an UpdatePolicy with AutoScalingRollingUpdate, which blocks creation until the instances signal success' },
      { key: 'C', text: 'Add a DependsOn from the Auto Scaling group to its launch template so creation waits for bootstrapping' },
      { key: 'D', text: 'Add a DeletionPolicy of Snapshot so the group reports completion only after instances are healthy' }
    ],
    correct: ['A'],
    explanation: 'A CreationPolicy with ResourceSignal makes CloudFormation wait for the specified number of success signals within the timeout; instance user data calls cfn-signal with the bootstrap result, so the stack fails if the signals are not received in time. UpdatePolicy governs updates rather than the creation gate, DependsOn only orders resource creation, and DeletionPolicy controls deletion behavior.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/aws-attribute-creationpolicy.html'
  },
  {
    id: 'dop-0015', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A fleet of EC2 instances must continuously enforce a desired configuration (required agents installed, specific services running, approved settings), automatically reapply that configuration on a schedule to correct drift, and report which instances are non-compliant, without building custom tooling. Which Systems Manager capability fits best?',
    options: [
      { key: 'A', text: 'State Manager associations that apply a configuration document on a schedule and report association compliance' },
      { key: 'B', text: 'Run Command, executed once by an operator whenever configuration drift is suspected' },
      { key: 'C', text: 'Session Manager sessions used to connect to each instance and correct settings manually' },
      { key: 'D', text: 'Inventory, which collects installed-software and configuration metadata for reporting' }
    ],
    correct: ['A'],
    explanation: 'State Manager associations apply and re-apply a configuration document on a schedule, enforcing the desired state and reporting compliance. Run Command is a one-time action, Session Manager is interactive access, and Inventory only collects metadata without enforcing configuration.',
    reference: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-state.html'
  },
  {
    id: 'dop-0016', domain: 2, type: 'single', numToSelect: 1,
    stem: 'Hundreds of EC2 instances across dev, test, and prod must be patched on a monthly schedule within approved maintenance windows, using a different approved-patch baseline per environment, and the company must produce a report of which instances are patched versus missing patches. Which approach is the most operationally efficient?',
    options: [
      { key: 'A', text: 'Use Systems Manager Patch Manager with per-environment patch baselines, patch groups defined by tags, maintenance windows, and patch compliance reporting' },
      { key: 'B', text: 'Use State Manager to install all available updates immediately on every instance, with no baselines or maintenance windows' },
      { key: 'C', text: 'Bake a fully patched AMI each month, replace all instances with an Auto Scaling instance refresh, and track patch status in a spreadsheet' },
      { key: 'D', text: 'Run an on-demand Run Command package update across all instances and email the command output to the operations team' }
    ],
    correct: ['A'],
    explanation: 'Patch Manager applies per-group patch baselines during maintenance windows and reports patch compliance centrally, satisfying scheduling, per-environment baselines, and reporting with the least effort. State Manager with no baselines ignores environment-specific control, an AMI rebuild with spreadsheet tracking lacks native patch-compliance reporting, and on-demand Run Command lacks scheduling, baselines, and a compliance store.',
    reference: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-patch.html'
  },
  {
    id: 'dop-0017', domain: 2, type: 'single', numToSelect: 1,
    stem: 'Before applying an update to a production CloudFormation stack that includes an RDS database, a team must know in advance which resources will be modified, which will require replacement (risking data loss), and which will be deleted, and must let a reviewer approve that plan before anything changes. What should they use?',
    options: [
      { key: 'A', text: 'Create a CloudFormation change set, review the proposed actions including any Replacement: True resources, and execute it only after approval' },
      { key: 'B', text: 'Apply a stack policy that denies all updates, then run the update to see what is blocked' },
      { key: 'C', text: 'Enable termination protection on the stack and then run the update' },
      { key: 'D', text: 'Run drift detection on the stack before performing the update' }
    ],
    correct: ['A'],
    explanation: 'A change set shows the proposed add/modify/replace/delete actions and flags resource replacements before execution, so a reviewer can approve the plan and avoid surprise data-loss replacements. Stack policies restrict updates rather than preview them, termination protection only blocks stack deletion, and drift detection compares the current state to the template rather than previewing a pending update.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html'
  },
  {
    id: 'dop-0018', domain: 2, type: 'single', numToSelect: 1,
    stem: 'An application on Amazon ECS needs database credentials that are rotated automatically every 30 days using the database engine native rotation, encrypted at rest, retrievable by the task at runtime, and also readable by a second AWS account that runs a reporting job. Which solution meets all requirements with the least custom code?',
    options: [
      { key: 'A', text: 'Store the credentials in AWS Secrets Manager, enable managed rotation for the database, encrypt with a customer-managed KMS key, and grant the second account access through the secret resource policy and the KMS key policy' },
      { key: 'B', text: 'Store the credentials in Systems Manager Parameter Store as a SecureString and write a scheduled Lambda function to rotate them and to share them across accounts' },
      { key: 'C', text: 'Store the credentials in a DynamoDB table encrypted with KMS and rotate them with a custom application job' },
      { key: 'D', text: 'Place the credentials in the ECS task definition as environment variables and rotate them by redeploying the task each month' }
    ],
    correct: ['A'],
    explanation: 'Secrets Manager provides managed database rotation, KMS encryption, runtime retrieval, and cross-account access through the secret resource policy plus the KMS key policy, with no custom code. Parameter Store SecureString has no native rotation, a DynamoDB table with a custom job is custom code, and environment-variable credentials are insecure and manually rotated.',
    reference: 'https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets.html'
  },

  // ===================== Domain 3: Resilient Cloud Solutions =====================
  {
    id: 'dop-0019', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A stateless web tier on EC2 must stay available during the loss of an entire Availability Zone, automatically replace instances that fail health checks, and retain enough capacity to serve normal load even while one AZ is unavailable. Which configuration meets all of these requirements?',
    options: [
      { key: 'A', text: 'An Auto Scaling group spread across at least three Availability Zones behind an Application Load Balancer with ELB health checks, sized so the remaining AZs absorb the load' },
      { key: 'B', text: 'An Auto Scaling group across two Availability Zones running at exactly the minimum capacity needed for normal load' },
      { key: 'C', text: 'One EC2 instance in each of three Availability Zones, each with an Elastic IP and a Route 53 failover record' },
      { key: 'D', text: 'An Auto Scaling group in a single Availability Zone using a larger instance type and detailed monitoring' }
    ],
    correct: ['A'],
    explanation: 'An ASG across three or more AZs with an ALB and ELB health checks replaces unhealthy instances automatically and, when sized so the surviving AZs absorb the load, keeps serving during a full AZ outage. Two AZs at minimum capacity loses half the fleet on AZ failure, single-instance-per-AZ designs lack automatic replacement and scaling, and a single AZ is not AZ-fault-tolerant.',
    reference: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/auto-scaling-benefits.html'
  },
  {
    id: 'dop-0020', domain: 3, type: 'single', numToSelect: 1,
    stem: 'An Amazon Aurora MySQL workload must support disaster recovery in a second Region with an RPO of about one second, managed cross-Region failover in roughly a minute, and low-latency reads served from the second Region during normal operation. Which feature meets all of these requirements?',
    options: [
      { key: 'A', text: 'Aurora Global Database, which replicates to a secondary Region with typically sub-second lag, supports managed cross-Region failover, and serves reads from the secondary Region' },
      { key: 'B', text: 'An Aurora cross-Region read replica rebuilt each day from a snapshot copied to the second Region' },
      { key: 'C', text: 'A single-Region Aurora Multi-AZ cluster with automated backups enabled' },
      { key: 'D', text: 'AWS Backup copying Aurora cluster snapshots to the second Region every 6 hours' },
    ],
    correct: ['A'],
    explanation: 'Aurora Global Database replicates storage to a secondary Region with typically sub-second lag, supports fast managed cross-Region failover, and lets the secondary Region serve reads during normal operation. Daily snapshot rebuilds and 6-hourly copies give an RPO of hours, and a single-Region Multi-AZ cluster is not cross-Region disaster recovery.',
    reference: 'https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html'
  },
  {
    id: 'dop-0021', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A company runs the same application in two Regions, each behind its own Application Load Balancer. During normal operation all users must be served by the primary Region, but if the primary endpoint becomes unhealthy, DNS must automatically direct users to the secondary Region. Which Route 53 configuration meets this active-passive requirement?',
    options: [
      { key: 'A', text: 'Failover routing with a health check on the primary ALB: the primary record is returned while healthy and the secondary record is returned when the primary health check fails' },
      { key: 'B', text: 'Weighted routing with 100 percent weight on the primary and 0 percent on the secondary, changed manually during an outage' },
      { key: 'C', text: 'Latency-based routing between the two Regions with no health checks configured' },
      { key: 'D', text: 'Simple routing with both ALB endpoints listed in a single record set' }
    ],
    correct: ['A'],
    explanation: 'Failover routing with a health check on the primary serves the primary while it is healthy and automatically returns the secondary when the primary health check fails, achieving active-passive DNS failover. Weighted routing requires manual changes, latency routing does not enforce primary-only behavior or fail over on health, and simple routing has no health awareness.',
    reference: 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/dns-failover.html'
  },
  {
    id: 'dop-0022', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A business application must recover in a second Region with an RTO of about 10 minutes and an RPO of seconds, while avoiding the cost of a full-scale duplicate environment during normal operation. A scaled-down but fully functional copy of the workload is acceptable. Which disaster recovery strategy best fits these constraints?',
    options: [
      { key: 'A', text: 'Warm standby: a continuously running, reduced-capacity copy of the full stack with data replicated, scaled up on failover' },
      { key: 'B', text: 'Backup and restore: rebuild infrastructure and restore data from backups after a disaster is declared' },
      { key: 'C', text: 'Multi-site active/active: full-scale capacity running in both Regions at all times' },
      { key: 'D', text: 'Pilot light: replicate only the database while core application servers stay switched off until needed' }
    ],
    correct: ['A'],
    explanation: 'Warm standby keeps a smaller but fully functional copy of the workload always running with data replicated, scaling it up on failover to meet a low RTO without paying for full duplicate capacity. Backup and restore has a much higher RTO, active/active costs more than required, and pilot light keeps most compute off and typically yields a longer RTO than warm standby.',
    reference: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  },
  {
    id: 'dop-0023', domain: 3, type: 'single', numToSelect: 1,
    stem: 'EC2 instances in an Auto Scaling group process long-running jobs. When the group scales in, an instance chosen for termination must finish its in-flight job and upload its logs before it is terminated, but scale-in must not be blocked indefinitely if that cleanup hangs. Which mechanism provides this behavior?',
    options: [
      { key: 'A', text: 'An EC2_INSTANCE_TERMINATING lifecycle hook that holds the instance in Terminating:Wait with a heartbeat timeout, completing the lifecycle action when cleanup finishes' },
      { key: 'B', text: 'Instance scale-in protection enabled permanently on every instance in the group' },
      { key: 'C', text: 'A target tracking scaling policy configured with a long cooldown period' },
      { key: 'D', text: 'A load balancer deregistration delay (connection draining) on the target group only' }
    ],
    correct: ['A'],
    explanation: 'A terminating lifecycle hook places the instance in Terminating:Wait so cleanup can run, and the heartbeat timeout bounds the wait so a hung cleanup does not block scale-in forever. Permanent scale-in protection prevents scale-in entirely, scaling policies and cooldowns do not gate termination cleanup, and deregistration delay only drains load balancer connections, not the job completion and log upload.',
    reference: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html'
  },
  {
    id: 'dop-0024', domain: 3, type: 'single', numToSelect: 1,
    stem: 'An Amazon ECS service has variable load. The number of tasks must scale out when average CPU utilization across the service exceeds a target and scale back in when it falls, automatically, while a capacity provider supplies the underlying EC2 capacity. Which configuration scales the task count correctly?',
    options: [
      { key: 'A', text: 'Configure Application Auto Scaling with a target tracking policy on the ECS service average CPU utilization metric' },
      { key: 'B', text: 'Configure an EC2 Auto Scaling group target tracking policy and keep the ECS service desired count fixed' },
      { key: 'C', text: 'Use a scheduled scaling action to change the service desired count at fixed times of day' },
      { key: 'D', text: 'Invoke a Lambda function on a timer that reads the latest CPU sample and sets the desired count' }
    ],
    correct: ['A'],
    explanation: 'Application Auto Scaling target tracking on the ECS service CPU metric adjusts the service desired task count to hold the target. Scaling the EC2 Auto Scaling group changes cluster capacity but not the task count, scheduled scaling is not load-responsive, and a timer-driven Lambda is custom and coarse.',
    reference: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/service-auto-scaling.html'
  },
  {
    id: 'dop-0025', domain: 3, type: 'multi', numToSelect: 2,
    stem: 'A compliance team must centrally back up Amazon EBS volumes and Amazon RDS databases across many accounts in an Organization, copy each backup to a second Region for DR, enforce retention, and prevent any backup from being deleted before retention expires even by an administrator. Which TWO actions meet these requirements?',
    options: [
      { key: 'A', text: 'Use AWS Backup with a backup plan that includes a cross-Region copy action and retention rules, managed centrally with AWS Backup policies in the Organization' },
      { key: 'B', text: 'Apply AWS Backup Vault Lock in compliance mode on the destination vault so recovery points cannot be deleted before retention expires' },
      { key: 'C', text: 'Rely on Amazon EBS and Amazon RDS replicating to a second Region automatically by default' },
      { key: 'D', text: 'Grant administrators a vault lock bypass so they can remove backups during incident cleanup' },
      { key: 'E', text: 'Store the backups only in the source Region to minimize cost' }
    ],
    correct: ['A', 'B'],
    explanation: 'AWS Backup centralizes backups across accounts, supports cross-Region copy actions and retention in the backup plan, and Vault Lock in compliance mode makes recovery points immutable until retention expires, even for administrators and the root user. EBS and RDS are not cross-Region replicated by default, a bypass defeats immutability, and source-only storage provides no DR copy.',
    reference: 'https://docs.aws.amazon.com/aws-backup/latest/devguide/vault-lock.html'
  },

  // ===================== Domain 4: Monitoring & Logging =====================
  {
    id: 'dop-0026', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A central monitoring team must view CloudWatch metrics, logs, and X-Ray traces from dozens of member accounts in one account, onboard new accounts automatically, and avoid copying telemetry on a schedule. Which approach meets this with the least ongoing administration?',
    options: [
      { key: 'A', text: 'Enable CloudWatch cross-account observability: create a sink in the monitoring account and Observability Access Manager links in source accounts, deployed across the Organization so new accounts link automatically' },
      { key: 'B', text: 'Deploy a Lambda function in each account that periodically copies metrics and log events into the monitoring account' },
      { key: 'C', text: 'Create a cross-account IAM role in every account and have engineers switch roles to view each account console separately' },
      { key: 'D', text: 'Stream all logs to one central S3 bucket and rebuild metric and trace views from Amazon Athena queries' }
    ],
    correct: ['A'],
    explanation: 'CloudWatch cross-account observability (OAM) shares metrics, logs, and traces from source accounts to a monitoring account through a sink and links, and can be deployed organization-wide so new accounts onboard automatically. Per-account copy Lambdas, role-switching, and S3-plus-Athena are custom, manual, or lose the unified metric and trace view.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html'
  },
  {
    id: 'dop-0027', domain: 4, type: 'single', numToSelect: 1,
    stem: 'An application writes structured JSON logs to CloudWatch Logs. The team must page on-call in near real time when more than 10 records with level ERROR appear within any 5-minute window, without provisioning servers or writing custom counting code. What is the most efficient approach?',
    options: [
      { key: 'A', text: 'Create a metric filter on the log group that increments a metric when the ERROR pattern matches, then a CloudWatch alarm with a threshold greater than 10 over 5 minutes and an SNS action to the pager' },
      { key: 'B', text: 'Create a subscription filter to a Lambda function that counts ERROR records and decides whether to page' },
      { key: 'C', text: 'Run a CloudWatch Logs Insights query every 5 minutes from EventBridge and a Lambda function that pages when the count exceeds 10' },
      { key: 'D', text: 'Enable AWS Config to evaluate the log group and alarm on the error count' }
    ],
    correct: ['A'],
    explanation: 'A metric filter converts matching log events into a CloudWatch metric, and an alarm on that metric with an SNS action pages in near real time with no servers or counting code. A subscription-filter Lambda and a scheduled Logs Insights query add code and latency, and AWS Config does not evaluate log contents.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html'
  },
  {
    id: 'dop-0028', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A request that traverses Amazon API Gateway, several AWS Lambda functions, and a downstream Amazon DynamoDB table shows intermittent high latency, and the team cannot tell which hop is slow. They need a per-segment latency view and to locate error and throttle hotspots across the whole path with minimal code changes. Which solution provides this?',
    options: [
      { key: 'A', text: 'Instrument the path with AWS X-Ray (enable tracing on API Gateway and Lambda and use the X-Ray SDK or ADOT) and use the service map and trace analytics to find the slow segment' },
      { key: 'B', text: 'Enable VPC Flow Logs and analyze them for latency between the components' },
      { key: 'C', text: 'Build CloudWatch dashboards of each service average duration and visually correlate the spikes' },
      { key: 'D', text: 'Turn on AWS Config to record configuration changes that occur during the slow periods' }
    ],
    correct: ['A'],
    explanation: 'X-Ray provides distributed tracing with a service map and per-segment latency, error, and throttle breakdowns across API Gateway, Lambda, and DynamoDB, pinpointing the slow hop with minimal instrumentation. Flow Logs show network metadata rather than application latency, dashboards lack per-request correlation, and Config records configuration changes, not latency.',
    reference: 'https://docs.aws.amazon.com/xray/latest/devguide/aws-xray.html'
  },
  {
    id: 'dop-0029', domain: 4, type: 'single', numToSelect: 1,
    stem: 'An Amazon EKS platform team needs per-pod and per-node CPU, memory, disk, and network metrics plus the ability to query container logs, all presented in CloudWatch, with the least operational effort and no self-managed monitoring stack. Which should they enable?',
    options: [
      { key: 'A', text: 'Amazon CloudWatch Container Insights with the CloudWatch agent and Fluent Bit for EKS' },
      { key: 'B', text: 'A self-managed Prometheus and Grafana stack running on the cluster' },
      { key: 'C', text: 'The default EKS control plane metrics, which already include per-pod memory and disk usage' },
      { key: 'D', text: 'AWS Config aggregators to collect the container metrics centrally' }
    ],
    correct: ['A'],
    explanation: 'Container Insights collects per-pod and per-node metrics and integrates with CloudWatch Logs for EKS with minimal setup and no self-managed stack. A self-managed Prometheus and Grafana deployment adds operational effort, default EKS metrics do not include per-pod memory and disk, and AWS Config does not collect metrics.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/ContainerInsights.html'
  },
  {
    id: 'dop-0030', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A security team must be alerted in near real time whenever any principal calls a specific sensitive API (for example, disabling a security control) in any account in the Organization, and must trigger an automated containment action. Which design meets this with the least custom infrastructure?',
    options: [
      { key: 'A', text: 'Create an organization CloudTrail and, in a delegated security account, an EventBridge rule that matches the sensitive API event pattern and targets SNS for notification and an SSM Automation or Lambda action for containment' },
      { key: 'B', text: 'Deliver CloudTrail logs to S3 in each account and run a nightly Amazon Athena query to find the API calls' },
      { key: 'C', text: 'Enable Amazon GuardDuty and wait for it to raise a finding for the specific API call' },
      { key: 'D', text: 'Create a CloudWatch dashboard widget that charts the count of the API call over time' }
    ],
    correct: ['A'],
    explanation: 'CloudTrail management events reach EventBridge, so an organization trail plus a rule matching the specific event pattern can notify through SNS and invoke automated containment immediately. Nightly Athena queries are not near real time, GuardDuty does not alert on arbitrary specific API calls, and a dashboard provides no alerting or automation.',
    reference: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-and-eventbridge.html'
  },
  {
    id: 'dop-0031', domain: 4, type: 'single', numToSelect: 1,
    stem: 'During an incident, a single root cause sets off many individual CloudWatch alarms and pages on-call repeatedly. The team wants to page only once when a meaningful combination is true (for example, high error rate AND elevated latency), while keeping the individual alarms available for dashboards. Which feature achieves this?',
    options: [
      { key: 'A', text: 'A CloudWatch composite alarm whose rule combines the child alarm states with AND/OR logic and sends the notification, leaving the child alarms in place but not paging' },
      { key: 'B', text: 'Delete all but the single most important alarm so only one can page' },
      { key: 'C', text: 'Increase every alarm evaluation period to one day to reduce how often they page' },
      { key: 'D', text: 'Combine all the alarms into one metric math expression alarm' }
    ],
    correct: ['A'],
    explanation: 'Composite alarms combine multiple child alarm states with logical rules and send a single notification when the combination is met, while the child alarms remain for visibility without paging. Deleting alarms loses coverage, lengthening periods hides real issues, and metric math cannot express arbitrary combinations of existing alarm states.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Create_Composite_Alarm.html'
  },
  {
    id: 'dop-0032', domain: 4, type: 'single', numToSelect: 1,
    stem: 'Application logs in CloudWatch Logs must be kept for 7 years for audit, but only the last 30 days are queried frequently and storage cost must be minimized. The archived logs must remain retrievable for audits. What is the most cost-effective design?',
    options: [
      { key: 'A', text: 'Set 30-day retention on the log group and continuously deliver logs to Amazon S3 (for example, a subscription filter to Kinesis Data Firehose) with S3 Lifecycle transitions to Glacier storage classes for the 7-year archive' },
      { key: 'B', text: 'Set the CloudWatch Logs log group retention to 7 years and query it directly' },
      { key: 'C', text: 'Disable the log group after 30 days and recreate it only when an audit needs the data' },
      { key: 'D', text: 'Export the logs once to S3 Standard and keep them there for 7 years with no lifecycle tiering' }
    ],
    correct: ['A'],
    explanation: 'Short CloudWatch retention for hot queries plus continuous delivery to S3 with lifecycle tiering to Glacier classes meets the 7-year retrievable archive at the lowest cost. Seven-year CloudWatch retention is expensive, disabling the log group loses the data and fails the audit, and keeping everything in S3 Standard costs more than tiering to Glacier.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/Working-with-log-groups-and-streams.html'
  },

  // ===================== Domain 5: Incident & Event Response =====================
  {
    id: 'dop-0033', domain: 5, type: 'multi', numToSelect: 2,
    stem: 'An application publishes a custom CloudWatch metric. When the metric breaches its threshold, on-call must be paged within one minute AND an automated runbook must attempt remediation, with no servers to operate. Which TWO actions together accomplish this?',
    options: [
      { key: 'A', text: 'Create a CloudWatch alarm on the metric with a 1-minute period and an SNS action that notifies the on-call paging integration' },
      { key: 'B', text: 'Add an EventBridge rule on the alarm state change (or an alarm action) that starts an SSM Automation runbook to perform the remediation' },
      { key: 'C', text: 'Enable AWS Config with a rule that evaluates the custom metric and remediates on breach' },
      { key: 'D', text: 'Enable Amazon GuardDuty so it detects the metric threshold breach and pages the team' },
      { key: 'E', text: 'Schedule a Lambda function once per day to read the metric and page if it is breached' }
    ],
    correct: ['A', 'B'],
    explanation: 'A 1-minute alarm with an SNS action pages on-call quickly, and an EventBridge rule or alarm action that starts an SSM Automation runbook performs serverless auto-remediation. AWS Config and GuardDuty do not watch custom metrics, and a daily Lambda is far too slow to meet a one-minute requirement.',
    reference: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html'
  },
  {
    id: 'dop-0034', domain: 5, type: 'single', numToSelect: 1,
    stem: 'Whenever a security group in any account in the Organization is modified to allow unrestricted inbound SSH (0.0.0.0/0 to port 22), the change must be reverted automatically within minutes, with no human action and managed centrally. Which approach is best?',
    options: [
      { key: 'A', text: 'Deploy the restricted-ssh AWS Config managed rule organization-wide via a conformance pack, with an automatic remediation action that runs an SSM Automation document to remove the offending rule' },
      { key: 'B', text: 'Create an EventBridge rule on the security group change that emails the security team so an engineer can revert it manually' },
      { key: 'C', text: 'Attach an SCP that denies ec2:AuthorizeSecurityGroupIngress entirely in every account' },
      { key: 'D', text: 'Produce a weekly AWS Config compliance report that an engineer reviews and acts on' }
    ],
    correct: ['A'],
    explanation: 'The restricted-ssh Config rule detects the noncompliant group and an associated SSM Automation remediation reverts it automatically; a conformance pack applies it organization-wide. Emailing is manual, a blanket SCP deny is over-broad (it blocks all ingress changes and does not remediate existing rules), and a weekly review is not within minutes.',
    reference: 'https://docs.aws.amazon.com/config/latest/developerguide/remediation.html'
  },
  {
    id: 'dop-0035', domain: 5, type: 'single', numToSelect: 1,
    stem: 'A single legacy EC2 instance that cannot be horizontally scaled must, on an underlying hardware (system status check) failure, be automatically moved to healthy hardware while keeping the same instance ID, private and Elastic IP addresses, and instance metadata, with no change required of clients. Which configuration meets this?',
    options: [
      { key: 'A', text: 'A CloudWatch alarm on StatusCheckFailed_System with the EC2 recover action, or rely on simplified automatic recovery, which migrates the instance to new hardware preserving its ID, IPs, and metadata' },
      { key: 'B', text: 'Place the instance in an Auto Scaling group with minimum and maximum size of 1 so a failed instance is replaced' },
      { key: 'C', text: 'A CloudWatch alarm with a reboot action on the StatusCheckFailed_Instance metric' },
      { key: 'D', text: 'An EventBridge rule on the AWS Health event that stops and then starts the instance' }
    ],
    correct: ['A'],
    explanation: 'The recover action (or simplified automatic recovery) responds to system status check failures by migrating the instance to new hardware while preserving instance ID, IPs, and metadata. An Auto Scaling group replaces the instance with a new identity, reboot addresses instance-level (OS) checks on the same hardware, and a stop/start workflow is custom and can change addressing.',
    reference: 'https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-recover.html'
  },
  {
    id: 'dop-0036', domain: 5, type: 'single', numToSelect: 1,
    stem: 'Objects uploaded to a specific prefix of an S3 bucket must immediately trigger a processing Lambda function, and the same events must also be delivered to a second consumer for an independent audit pipeline, with the least custom code and without coupling the two consumers. Which approach is best?',
    options: [
      { key: 'A', text: 'Enable Amazon EventBridge notifications on the bucket and create rules matching the prefix that target the processing Lambda function and the audit consumer independently' },
      { key: 'B', text: 'Configure a single S3 event notification to the processing Lambda function and have that function also invoke the audit pipeline' },
      { key: 'C', text: 'Have the processing Lambda function poll the bucket every minute and forward each new object to both consumers' },
      { key: 'D', text: 'Enable S3 server access logging and parse the logs hourly to drive both the processing and audit consumers' }
    ],
    correct: ['A'],
    explanation: 'Routing S3 events to EventBridge lets multiple rules fan the same object-created events out to several targets immediately and independently, with minimal code. A direct notification to one function couples the consumers, polling adds latency and cost, and access logs are not an immediate event source.',
    reference: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/EventBridge.html'
  },
  {
    id: 'dop-0037', domain: 5, type: 'single', numToSelect: 1,
    stem: 'An operations team wants operational issues raised by CloudWatch alarms and selected EventBridge events to become tracked, deduplicated work items that include the related resources and suggested runbooks, in order to reduce mean time to resolution. Which service provides this?',
    options: [
      { key: 'A', text: 'AWS Systems Manager OpsCenter, which aggregates OpsItems from alarms and EventBridge with related resources and runbooks' },
      { key: 'B', text: 'Amazon SNS topics that email the team for each alarm and event' },
      { key: 'C', text: 'An AWS Config aggregator that centralizes configuration and compliance data' },
      { key: 'D', text: 'A CloudWatch dashboard that visualizes the alarms and events' }
    ],
    correct: ['A'],
    explanation: 'OpsCenter centralizes operational issues as OpsItems created from alarms and EventBridge, deduplicates them, and attaches related resources and runbooks to reduce MTTR. SNS only sends notifications, a Config aggregator centralizes compliance data, and a dashboard visualizes data rather than tracking work items.',
    reference: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/OpsCenter.html'
  },
  {
    id: 'dop-0038', domain: 5, type: 'single', numToSelect: 1,
    stem: 'An EventBridge rule targets a Lambda function. Occasionally EventBridge cannot deliver an event to the Lambda service even after exhausting its retry policy, and those events are currently lost. The team must retain undeliverable events for later inspection and reprocessing with the least custom code. What should they configure?',
    options: [
      { key: 'A', text: 'Configure an Amazon SQS dead-letter queue on the EventBridge target to capture events that fail delivery after the retry policy is exhausted' },
      { key: 'B', text: 'Configure a Lambda asynchronous on-failure destination, expecting it to capture the EventBridge delivery failures' },
      { key: 'C', text: 'Increase the rule retry attempts to the maximum and assume events can no longer be lost' },
      { key: 'D', text: 'Add a try/catch in the function that writes failed events to Amazon S3' }
    ],
    correct: ['A'],
    explanation: 'An SQS dead-letter queue on the EventBridge target captures events EventBridge cannot deliver after its retry policy, with no custom code. A Lambda on-failure destination only applies to events Lambda has already accepted but failed to process, raising retries still exhausts eventually, and in-function error handling cannot capture events that never reached the function.',
    reference: 'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-rule-dlq.html'
  },

  // ===================== Domain 6: Security & Compliance =====================
  {
    id: 'dop-0039', domain: 6, type: 'single', numToSelect: 1,
    stem: 'An application connects continuously to Amazon RDS and must have its database credentials rotated automatically on a schedule with no disruption to active connections during rotation, encrypted at rest, and managed without writing custom rotation code. Which approach best meets these requirements?',
    options: [
      { key: 'A', text: 'Store the credentials in AWS Secrets Manager and enable rotation using the alternating-users strategy with the AWS-provided rotation function' },
      { key: 'B', text: 'Store the credentials in AWS Secrets Manager and enable single-user rotation, accepting brief authentication failures while the password changes' },
      { key: 'C', text: 'Store the credentials in Systems Manager Parameter Store as a SecureString and write a scheduled Lambda function to rotate them' },
      { key: 'D', text: 'Store the credentials in AWS Secrets Manager but rotate them manually from the console each month' }
    ],
    correct: ['A'],
    explanation: 'Secrets Manager rotation with the alternating-users strategy provisions and alternates between two database users so active connections are not disrupted, using the AWS-provided rotation function with no custom code. Single-user rotation can briefly disrupt connections, Parameter Store has no native rotation, and manual rotation is not automatic.',
    reference: 'https://docs.aws.amazon.com/secretsmanager/latest/userguide/rotating-secrets_strategies.html'
  },
  {
    id: 'dop-0040', domain: 6, type: 'multi', numToSelect: 2,
    stem: 'A security team must guarantee that no member account in an AWS Organization can create unencrypted Amazon EBS volumes, regardless of that account’s own IAM policies, with the simplest enforcement that account administrators cannot bypass. Which TWO statements correctly describe how to achieve this?',
    options: [
      { key: 'A', text: 'Attach a Service Control Policy that denies ec2:CreateVolume when ec2:Encrypted is false to the relevant OUs or accounts' },
      { key: 'B', text: 'An explicit Deny in the SCP overrides any Allow in the account IAM policies, so account administrators cannot bypass it' },
      { key: 'C', text: 'Enabling EBS encryption by default in each account setting, by itself, prevents any administrator from ever creating an unencrypted volume' },
      { key: 'D', text: 'An AWS Config rule alone blocks the CreateVolume API call at request time' },
      { key: 'E', text: 'A permissions boundary on each IAM role guarantees that no unencrypted volume can be created anywhere in the account' }
    ],
    correct: ['A', 'B'],
    explanation: 'An SCP that denies ec2:CreateVolume when ec2:Encrypted is false enforces the guardrail across the Organization, and an explicit Deny overrides every account-level Allow so administrators cannot bypass it. EBS encryption by default is a changeable per-account setting, AWS Config detects rather than blocks, and a permissions boundary caps an individual principal rather than enforcing an organization-wide encryption condition.',
    reference: 'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html'
  },
  {
    id: 'dop-0041', domain: 6, type: 'single', numToSelect: 1,
    stem: 'An auditor requires that dozens of compliance controls (encryption at rest, access logging, no public access) be evaluated continuously across every account in the Organization, deployed and updated as a single versioned unit, with non-compliant resources remediated automatically. Which approach best meets this?',
    options: [
      { key: 'A', text: 'Deploy an AWS Config organization conformance pack containing the managed rules and Systems Manager Automation remediations to all accounts and Regions' },
      { key: 'B', text: 'Create the required AWS Config rules one at a time in each account through the console' },
      { key: 'C', text: 'Use AWS Security Hub standards alone to evaluate and automatically remediate all of the controls' },
      { key: 'D', text: 'Run a scheduled Lambda function that calls each account API to check the controls and fix violations' }
    ],
    correct: ['A'],
    explanation: 'An organization conformance pack bundles many Config rules and remediation actions into one versioned unit deployed across the Organization accounts and Regions, evaluating continuously and remediating through SSM Automation. Per-account manual rules are not a single unit, Security Hub focuses on aggregating findings rather than packaged remediation, and a custom Lambda is undifferentiated code to maintain.',
    reference: 'https://docs.aws.amazon.com/config/latest/developerguide/conformance-packs.html'
  },
  {
    id: 'dop-0042', domain: 6, type: 'single', numToSelect: 1,
    stem: 'When Amazon GuardDuty raises a high-severity finding for an EC2 instance (for example, communication with a known command-and-control host), the team needs an automated response that isolates the instance and notifies responders, applied consistently across all accounts with the least custom infrastructure. Which design accomplishes this?',
    options: [
      { key: 'A', text: 'Aggregate GuardDuty findings to a delegated administrator account and create an EventBridge rule filtered on high severity that invokes an SSM Automation or Lambda action to apply an isolation security group and notifies responders through SNS' },
      { key: 'B', text: 'Have a security analyst review the GuardDuty console each shift and isolate affected instances manually' },
      { key: 'C', text: 'Enable GuardDuty and rely on it to automatically quarantine the affected instance' },
      { key: 'D', text: 'Create a CloudWatch alarm on a GuardDuty findings metric that emails the security team' }
    ],
    correct: ['A'],
    explanation: 'GuardDuty findings flow to EventBridge and can be centralized through the delegated administrator account; a rule filtered on severity can invoke automated isolation (SSM Automation or Lambda applying an isolation security group) and notify via SNS, consistently across the Organization. Manual review is not automated, GuardDuty itself does not remediate, and an email alarm performs no isolation.',
    reference: 'https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_cloudwatch.html'
  },
  {
    id: 'dop-0043', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A security team needs a single, normalized view that aggregates and prioritizes findings from Amazon GuardDuty, Amazon Inspector, and AWS Config across all accounts in the Organization, scored against industry security standards, with new accounts included automatically. Which service should they use?',
    options: [
      { key: 'A', text: 'AWS Security Hub with the organization integration and a delegated administrator, aggregating and normalizing findings against standards such as the AWS Foundational Security Best Practices' },
      { key: 'B', text: 'Amazon Detective, to aggregate the findings and score them against the security standards' },
      { key: 'C', text: 'Amazon CloudWatch Logs Insights queries run across each account findings' },
      { key: 'D', text: 'AWS Trusted Advisor, which aggregates GuardDuty and Inspector findings across the Organization' }
    ],
    correct: ['A'],
    explanation: 'Security Hub aggregates and normalizes findings from GuardDuty, Inspector, Config, and more across accounts, with a delegated administrator and automatic enrollment of new accounts, scoring them against standards like the AWS FSBP. Detective is for investigation and root-cause analysis, Logs Insights is manual querying, and Trusted Advisor does not aggregate these security findings.',
    reference: 'https://docs.aws.amazon.com/securityhub/latest/userguide/what-is-securityhub.html'
  },
  {
    id: 'dop-0044', domain: 6, type: 'single', numToSelect: 1,
    stem: 'Application teams must be able to create IAM roles for their own workloads, but those roles must never be granted permissions beyond an approved maximum, and the teams must not be able to escalate privileges by removing the control. Which combination enforces this?',
    options: [
      { key: 'A', text: 'Grant the teams iam:CreateRole and iam:PutRolePolicy only under a condition that requires attaching a specific permissions boundary, and deny actions that remove or change that boundary' },
      { key: 'B', text: 'Attach the approved policies directly to each team’s IAM users and trust them not to create broader roles' },
      { key: 'C', text: 'Use an SCP that denies iam:CreateRole entirely so that no roles can be created' },
      { key: 'D', text: 'Give the teams full IAM access and audit role creation with CloudTrail after the fact' }
    ],
    correct: ['A'],
    explanation: 'Granting role-creation permissions only when a required permissions boundary is attached (via an iam:PermissionsBoundary condition) caps what created roles can do, and denying changes to that boundary prevents privilege escalation. Direct policy attachment does not cap roles the team creates, a blanket SCP deny blocks the legitimate need to create roles, and after-the-fact auditing does not prevent escalation.',
    reference: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html'
  },
  {
    id: 'dop-0045', domain: 6, type: 'multi', numToSelect: 2,
    stem: 'A platform team must ensure container images are scanned for known vulnerabilities both when pushed and continuously as new CVEs are published, with findings centralized for the security team and images carrying Critical or High vulnerabilities prevented from being deployed. Which TWO actions accomplish this?',
    options: [
      { key: 'A', text: 'Enable Amazon ECR enhanced scanning, powered by Amazon Inspector, which scans on push and continuously rescans as new CVEs are published, sending findings to AWS Security Hub' },
      { key: 'B', text: 'Add a pipeline gate that queries the image scan findings and fails the deployment when Critical or High vulnerabilities are present' },
      { key: 'C', text: 'Rely on ECR basic scanning, which continuously rescans images as new CVEs emerge' },
      { key: 'D', text: 'Make the repositories public so the security team can review the images externally' },
      { key: 'E', text: 'Disable image tag immutability so images can be overwritten with patched versions in place' }
    ],
    correct: ['A', 'B'],
    explanation: 'ECR enhanced scanning with Inspector scans on push and continuously as new CVEs appear, routing findings to Security Hub, and a pipeline gate that checks those findings can block deployment of vulnerable images. ECR basic scanning runs on push only rather than continuously, public repositories are insecure, and disabling tag immutability harms traceability.',
    reference: 'https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-scanning.html'
  },

  // ============================ Batch 2 & 3 ============================
  // ---- Domain 1: SDLC Automation ----
  {
    id: 'dop-0046', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A CodeBuild project must run dependency installation, then compilation, then a post-build image push as distinct ordered steps defined as code, versioned alongside the application source. Where and how should these steps be defined?',
    options: [
      { key: 'A', text: 'In the phases section of a buildspec.yml stored in the source (install, pre_build, build, post_build), which CodeBuild runs in order' },
      { key: 'B', text: 'As inline commands in the CodePipeline action configuration, which runs the build phases in order' },
      { key: 'C', text: 'In EC2 user data on the CodeBuild compute fleet so each phase runs at launch' },
      { key: 'D', text: 'In the CodeBuild project environment variables, one variable per phase' }
    ],
    correct: ['A'],
    explanation: 'The buildspec.yml phases (install, pre_build, build, post_build) define ordered build commands as code, versioned with the source. The pipeline action configuration wires stages rather than build phases, CodeBuild is managed and has no user-data fleet to script, and environment variables are not ordered commands.',
    reference: 'https://docs.aws.amazon.com/codebuild/latest/userguide/build-spec-ref.html'
  },
  {
    id: 'dop-0047', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A CodePipeline must source from a GitHub repository, start automatically on a push, and authenticate through a managed, revocable integration without storing long-lived personal access tokens or SSH keys in the pipeline. Which source configuration meets this?',
    options: [
      { key: 'A', text: 'An AWS CodeConnections connection to GitHub used as the CodePipeline source action, which triggers the pipeline via webhooks' },
      { key: 'B', text: 'A CodePipeline source action that stores a GitHub personal access token in the action configuration' },
      { key: 'C', text: 'A CodeBuild project that clones the repository with an embedded SSH deploy key on a fixed schedule' },
      { key: 'D', text: 'An EventBridge scheduled rule that copies the repository into Amazon S3 every few minutes for the source stage' }
    ],
    correct: ['A'],
    explanation: 'A CodeConnections connection provides a managed, revocable GitHub integration with webhook triggering and no stored long-lived credentials. Storing a personal access token is long-lived credential management, and the scheduled clone or copy approaches add key management and latency.',
    reference: 'https://docs.aws.amazon.com/dtconsole/latest/userguide/welcome-connections.html'
  },
  {
    id: 'dop-0048', domain: 1, type: 'single', numToSelect: 1,
    stem: 'Several teams need a private, managed package repository for internal npm and Maven packages, with an upstream connection that proxies and caches public dependencies, and with access controlled through IAM. Which service meets these requirements with the least operational effort?',
    options: [
      { key: 'A', text: 'AWS CodeArtifact with an upstream repository connected to the public npm and Maven registries' },
      { key: 'B', text: 'A self-managed Nexus or Artifactory server on Amazon EC2 behind an internal load balancer' },
      { key: 'C', text: 'Amazon ECR repositories used to store the npm and Maven packages' },
      { key: 'D', text: 'An Amazon S3 bucket of package files exposed as a static website' }
    ],
    correct: ['A'],
    explanation: 'CodeArtifact is a managed package repository for npm, Maven, and more, with upstream connections that proxy and cache public packages and IAM-based access control, with minimal operations. A self-managed server adds operational effort, ECR stores container images rather than language packages, and an S3 static site is not a package manager.',
    reference: 'https://docs.aws.amazon.com/codeartifact/latest/ug/welcome.html'
  },
  {
    id: 'dop-0049', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A team must release a new application version on an EC2 Auto Scaling group so that a complete replacement fleet is provisioned and validated before any production traffic is shifted, traffic moves over in one step, and rollback is immediate. Which CodeDeploy deployment type and setting fit best?',
    options: [
      { key: 'A', text: 'A blue/green deployment that provisions a replacement Auto Scaling group, validates it, reroutes the load balancer in one step, and keeps the original group for immediate rollback' },
      { key: 'B', text: 'An in-place deployment with a high minimum-healthy-hosts percentage' },
      { key: 'C', text: 'An in-place deployment using the CodeDeployDefault.OneAtATime configuration' },
      { key: 'D', text: 'A blue/green deployment that terminates the original instances immediately after rerouting traffic' }
    ],
    correct: ['A'],
    explanation: 'A blue/green deployment provisions and validates a replacement fleet behind the load balancer before rerouting traffic in one step, and keeping the original instances enables immediate rollback. In-place options modify existing instances with no separate validated fleet, and terminating the originals immediately removes the fast rollback path.',
    reference: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/welcome.html'
  },
  {
    id: 'dop-0050', domain: 1, type: 'multi', numToSelect: 2,
    stem: 'A pipeline stage runs four independent test suites one after another, making it the slowest part of the pipeline. The team wants to cut wall-clock time by running the suites concurrently while keeping a single pipeline. Which TWO approaches achieve concurrency?',
    options: [
      { key: 'A', text: 'Define the four test actions in the same stage with the same runOrder so CodePipeline runs them in parallel' },
      { key: 'B', text: 'Use a CodeBuild batch build to run the suites as concurrent build configurations within one action' },
      { key: 'C', text: 'Increase the CodeBuild compute type to the largest size and keep the suites sequential' },
      { key: 'D', text: 'Add manual approval actions between the suites to control the flow' },
      { key: 'E', text: 'Raise the pipeline artifact store size limit' }
    ],
    correct: ['A', 'B'],
    explanation: 'Actions that share the same runOrder in a stage run in parallel, and CodeBuild batch builds run multiple configurations concurrently within one action; both reduce wall-clock time. A larger compute type does not make the suites concurrent, approvals serialize them further, and the artifact store size is unrelated.',
    reference: 'https://docs.aws.amazon.com/codebuild/latest/userguide/batch-build.html'
  },
  {
    id: 'dop-0051', domain: 1, type: 'single', numToSelect: 1,
    stem: 'After each CodeBuild run, the team needs structured pass/fail results and historical trends of their JUnit test output visible in the console, with failed builds clearly tied to the failing tests, without building a separate reporting system. What should they configure?',
    options: [
      { key: 'A', text: 'Add a reports section to the buildspec that points to the JUnit result files so CodeBuild creates a test report group with pass/fail trends' },
      { key: 'B', text: 'Print the test summary to the build logs and read the logs after each run' },
      { key: 'C', text: 'Upload the raw result files to Amazon S3 and build a custom dashboard from them' },
      { key: 'D', text: 'Publish a custom CloudWatch metric of the number of passed tests from a post_build command' }
    ],
    correct: ['A'],
    explanation: 'A buildspec reports section parses JUnit and other result formats into a CodeBuild test report group that shows pass/fail trends and ties failures to builds, with no separate system. Build logs give no structured trend, an S3-plus-custom-dashboard is a separate system, and a custom metric does not show per-test results.',
    reference: 'https://docs.aws.amazon.com/codebuild/latest/userguide/test-reporting.html'
  },
  {
    id: 'dop-0052', domain: 1, type: 'single', numToSelect: 1,
    stem: 'To make Amazon ECS deployments fully traceable and to avoid the stale-image problems caused by mutable tags, each build must publish an image that maps unambiguously to the exact source revision, and deployments must reference an image that cannot change underneath a running service. Which approach is best?',
    options: [
      { key: 'A', text: 'Tag the image with the Git commit SHA, enable tag immutability on the ECR repository, and reference the image by digest in the ECS task definition' },
      { key: 'B', text: 'Always push and deploy the latest tag and rely on ECS to pull the newest image' },
      { key: 'C', text: 'Tag images with an incrementing build number but allow the tag to be overwritten when a build is re-run' },
      { key: 'D', text: 'Reference images by repository name only and let ECS choose a tag at deployment time' }
    ],
    correct: ['A'],
    explanation: 'Tagging by commit SHA with tag immutability and referencing the image by digest gives traceable, immutable deployments that cannot change underneath a running service. Reusing latest or overwritable tags is mutable and causes stale-image problems, and referencing without a specific tag or digest is ambiguous.',
    reference: 'https://docs.aws.amazon.com/AmazonECR/latest/userguide/image-tag-mutability.html'
  },
  {
    id: 'dop-0053', domain: 1, type: 'single', numToSelect: 1,
    stem: 'An application on AWS Elastic Beanstalk must be released so that the new version is deployed to a separate, fully running environment, validated, and then cut into production with near-zero downtime and the ability to revert immediately if problems appear. Which approach should the team use?',
    options: [
      { key: 'A', text: 'Deploy the new version to a clone environment and perform a blue/green deployment by swapping the environment URLs (CNAME swap) after validation' },
      { key: 'B', text: 'Use the all-at-once deployment policy on the existing environment' },
      { key: 'C', text: 'Use the rolling deployment policy on the existing environment' },
      { key: 'D', text: 'Terminate the existing environment and recreate it with the new version' }
    ],
    correct: ['A'],
    explanation: 'Beanstalk blue/green deploys the new version to a separate environment, validates it, and swaps CNAMEs for near-zero-downtime cutover with immediate rollback by swapping back. All-at-once causes downtime, rolling modifies the running environment in place, and recreate causes downtime and loses the fast revert.',
    reference: 'https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.CNAMESwap.html'
  },
  {
    id: 'dop-0054', domain: 1, type: 'single', numToSelect: 1,
    stem: 'On AWS Elastic Beanstalk, a team wants each deployment to launch an entirely new set of instances running the new version and switch to them only if they pass health checks, never modifying existing instances in place, so a failed deployment leaves the environment fully intact. Which deployment policy meets this?',
    options: [
      { key: 'A', text: 'Immutable' },
      { key: 'B', text: 'Rolling' },
      { key: 'C', text: 'Rolling with an additional batch' },
      { key: 'D', text: 'All at once' }
    ],
    correct: ['A'],
    explanation: 'The immutable policy launches a full new set of instances in a temporary group and shifts to them only after they pass health checks, never modifying existing instances, so a failed deployment leaves the original instances untouched. Rolling, rolling with an additional batch, and all at once modify existing capacity in place.',
    reference: 'https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/using-features.deploy-existing-version.html'
  },
  {
    id: 'dop-0055', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A release must deploy the same CloudFormation stack to three Regions from one pipeline, with the deployments running as pipeline actions and surfacing failure status per Region, using the least custom scripting. Which approach fits best?',
    options: [
      { key: 'A', text: 'Add CloudFormation deploy actions (or a CloudFormation StackSets action) to the pipeline, one targeting each Region, using cross-Region action artifacts' },
      { key: 'B', text: 'Run a single CodeBuild action that loops over the Regions and calls the AWS CLI to deploy each stack' },
      { key: 'C', text: 'Create three separate pipelines triggered independently and reconcile their results manually' },
      { key: 'D', text: 'Deploy the stack in one Region and rely on CloudFormation to replicate it to the other Regions' }
    ],
    correct: ['A'],
    explanation: 'CodePipeline supports cross-Region deploy actions and a StackSets action, so one pipeline can deploy to multiple Regions and surface per-action status with minimal scripting. A CLI loop is custom scripting, separate pipelines are not one pipeline, and CloudFormation does not replicate stacks across Regions.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/actions-create-cross-region.html'
  },
  {
    id: 'dop-0056', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A company runs self-managed Jenkins controllers and agents on EC2 for builds and wants to remove the burden of patching, scaling, and securing the build fleet while reusing its existing build scripts and integrating with CodePipeline. Which change achieves this with the least operational overhead?',
    options: [
      { key: 'A', text: 'Move build execution to AWS CodeBuild, defining the existing build steps in a buildspec and using CodeBuild as a CodePipeline build action' },
      { key: 'B', text: 'Keep Jenkins but move the agents into a larger Auto Scaling group that the team continues to patch' },
      { key: 'C', text: 'Containerize Jenkins and run it on an Amazon EKS cluster that the team operates' },
      { key: 'D', text: 'Replace the builds with AWS Lambda functions that compile the application code' }
    ],
    correct: ['A'],
    explanation: 'CodeBuild is fully managed and scales per build, eliminating fleet patching, scaling, and securing while running the existing steps via buildspec and integrating as a CodePipeline action. Larger Jenkins agents and Jenkins on EKS keep the operational burden, and Lambda is not a general-purpose build environment.',
    reference: 'https://docs.aws.amazon.com/codebuild/latest/userguide/welcome.html'
  },
  {
    id: 'dop-0057', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A Lambda function is deployed with AWS CodeDeploy using canary traffic shifting. Before any production traffic is shifted to the new version, the team must run an automated check that invokes the new version and aborts the deployment if the check fails. How should this be implemented?',
    options: [
      { key: 'A', text: 'Add a BeforeAllowTraffic hook in the AppSpec that invokes a validation Lambda function, returning a failure result to abort the deployment before traffic shifts' },
      { key: 'B', text: 'Add an AfterAllowTraffic hook that invokes a validation Lambda function to check the new version' },
      { key: 'C', text: 'Rely solely on the CloudWatch alarm rollback with no pre-traffic validation hook' },
      { key: 'D', text: 'Validate the new version manually in the console between deployments' }
    ],
    correct: ['A'],
    explanation: 'For Lambda CodeDeploy deployments, a BeforeAllowTraffic lifecycle hook invokes a validation Lambda before any traffic is shifted, and a failure result aborts the deployment. AfterAllowTraffic runs after traffic begins shifting, alarm-based rollback only reacts after traffic moves, and manual validation is not automated.',
    reference: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/reference-appspec-file-structure-hooks.html'
  },
  {
    id: 'dop-0058', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A pipeline S3 artifact store is encrypted with the default AWS managed key. A deploy action running in another account fails with an access-denied error while decrypting the artifacts. What is the correct fix?',
    options: [
      { key: 'A', text: 'Re-encrypt the artifact bucket with a customer-managed KMS key, grant the other account role usage of that key in the key policy, and grant the role bucket read and kms:Decrypt permissions' },
      { key: 'B', text: 'Make the artifact bucket public so the other account can read the objects' },
      { key: 'C', text: 'Edit the aws/s3 AWS managed key policy to allow the other account to decrypt' },
      { key: 'D', text: 'Copy the artifacts to the other account by manual download between deployments' }
    ],
    correct: ['A'],
    explanation: 'The default AWS managed key cannot be shared across accounts because its key policy is not editable, so the artifacts must be encrypted with a customer-managed KMS key whose policy grants the other account, with the role also granted bucket read and kms:Decrypt. Public buckets and manual copying are insecure or unworkable, and the AWS managed key policy cannot be modified.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/S3-artifact-encryption.html'
  },
  {
    id: 'dop-0059', domain: 1, type: 'multi', numToSelect: 2,
    stem: 'A release pipeline must automatically run end-to-end tests against a deployed staging environment, block promotion if the tests fail, and require an authorized approver to sign off before the production deployment. Which TWO CodePipeline elements implement these controls?',
    options: [
      { key: 'A', text: 'A CodeBuild test action that runs the end-to-end tests against staging and fails the stage when tests fail' },
      { key: 'B', text: 'A manual approval action before the production deploy stage, restricted to the approver group through IAM' },
      { key: 'C', text: 'A scheduled pipeline execution each night that promotes regardless of test results' },
      { key: 'D', text: 'Disabling CloudWatch alarms during the deployment to reduce noise' },
      { key: 'E', text: 'Granting all developers approval permission so releases are never blocked' }
    ],
    correct: ['A', 'B'],
    explanation: 'A CodeBuild test action gates promotion on the end-to-end results, and a manual approval action restricted by IAM enforces authorized sign-off before production. A scheduled promotion does not gate on tests, disabling alarms is harmful, and granting everyone approval defeats the control.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/approvals.html'
  },
  {
    id: 'dop-0060', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A team already has a repository association in Amazon CodeGuru Reviewer that was created before November 7, 2025. Which service can continue providing automated code quality and security recommendations for pull requests?',
    options: [
      { key: 'A', text: 'Amazon CodeGuru Reviewer' },
      { key: 'B', text: 'Amazon GuardDuty' },
      { key: 'C', text: 'AWS Config' },
      { key: 'D', text: 'Amazon Inspector' }
    ],
    correct: ['A'],
    explanation: 'CodeGuru Reviewer can continue reviewing repositories that were associated before the availability change. As of November 7, 2025, customers cannot create new repository associations, so it is not a valid greenfield recommendation. GuardDuty and Inspector detect threats or vulnerabilities; Config evaluates configuration compliance.',
    reference: 'https://docs.aws.amazon.com/codeguru/latest/reviewer-api/API_AssociateRepository.html'
  },
  {
    id: 'dop-0061', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A CodeBuild project builds container images in the standard CodeBuild environment and is slow because it rebuilds every Docker layer on each run. Which configuration speeds up the image builds while still allowing the Docker daemon to run?',
    options: [
      { key: 'A', text: 'Run the build in privileged mode and enable local caching with the Docker layer cache mode so unchanged layers are reused' },
      { key: 'B', text: 'Disable privileged mode and enable local Docker layer caching' },
      { key: 'C', text: 'Configure an Amazon S3 source cache for the Git repository' },
      { key: 'D', text: 'Switch to a larger compute type with no caching configured' }
    ],
    correct: ['A'],
    explanation: 'Building Docker images in CodeBuild requires privileged mode, and enabling local caching with the Docker layer cache reuses unchanged layers to speed builds. Disabling privileged mode prevents the Docker daemon from running, a source cache does not cache image layers, and a larger compute type still rebuilds every layer.',
    reference: 'https://docs.aws.amazon.com/codebuild/latest/userguide/build-caching.html'
  },
  {
    id: 'dop-0062', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A pipeline must start only for pushes to branches matching release/* and for tags matching v*, and must ignore all other pushes, using native CodePipeline triggering. How should this be configured?',
    options: [
      { key: 'A', text: 'Configure CodePipeline triggers on the source connection with git push filters that include the release/* branch pattern and the v* tag pattern' },
      { key: 'B', text: 'Start the pipeline on every push and add a first stage that exits early when the ref does not match' },
      { key: 'C', text: 'Use periodic source polling plus a Lambda function that decides whether to continue based on the branch' },
      { key: 'D', text: 'Create a separate pipeline per branch and disable the unwanted ones manually' }
    ],
    correct: ['A'],
    explanation: 'CodePipeline triggers support git push filters on branches and tags, so only matching refs start the pipeline natively. Starting on every push wastes executions, polling plus a Lambda is custom and slower, and per-branch pipelines toggled manually are unmaintainable.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/pipelines-filter.html'
  },
  {
    id: 'dop-0063', domain: 1, type: 'single', numToSelect: 1,
    stem: 'An Amazon ECS blue/green deployment through CodeDeploy must automatically roll back to the previous task set if the application error-rate metric breaches a threshold during the traffic shift, with no manual intervention. What should be configured?',
    options: [
      { key: 'A', text: 'Associate a CloudWatch alarm on the error-rate metric with the CodeDeploy deployment group and enable automatic rollback on alarm' },
      { key: 'B', text: 'Set a long ECS health check grace period so failures are tolerated during the shift' },
      { key: 'C', text: 'Schedule a Lambda function to redeploy the previous task definition every hour during releases' },
      { key: 'D', text: 'Increase the ECS service desired count so healthy tasks outnumber failing ones' }
    ],
    correct: ['A'],
    explanation: 'CodeDeploy can monitor an associated CloudWatch alarm during the deployment and automatically roll back to the original task set when it breaches, with no manual action. A long grace period tolerates failures rather than rolling back, a scheduled Lambda is coarse and custom, and raising the desired count does not roll back.',
    reference: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/deployments-rollback-and-redeploy.html'
  },

  // ---- Domain 2: Configuration Management & IaC ----
  {
    id: 'dop-0064', domain: 2, type: 'single', numToSelect: 1,
    stem: 'During stack creation, a CloudFormation template must obtain a value from a third-party system that has no native CloudFormation resource type, fail the stack if the lookup fails, and clean up the external registration when the stack is deleted. Which mechanism should be used?',
    options: [
      { key: 'A', text: 'A Lambda-backed custom resource that handles Create, Update, and Delete and signals success or failure back to CloudFormation' },
      { key: 'B', text: 'A nested stack that imports the value from another stack' },
      { key: 'C', text: 'A CloudFormation macro that transforms the template to include the value' },
      { key: 'D', text: 'An SSM parameter holding a hard-coded value that is updated manually' }
    ],
    correct: ['A'],
    explanation: 'A Lambda-backed custom resource runs logic on Create, Update, and Delete, so it can call the third-party system, fail the stack on error, and clean up the registration on delete. Nested stacks compose templates, macros transform templates before provisioning rather than calling external systems during it, and a manual parameter has no lifecycle handling.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-custom-resources.html'
  },
  {
    id: 'dop-0065', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A platform team must automatically inject a standard set of tags and a logging configuration into the resources of submitted CloudFormation templates, applying their own logic before the resources are created, without requiring each team to edit its templates. Which capability should they build?',
    options: [
      { key: 'A', text: 'A CloudFormation macro (a Lambda-backed transform) that processes each template and adds the tags and logging configuration before deployment' },
      { key: 'B', text: 'A Lambda-backed custom resource that each team references in its template' },
      { key: 'C', text: 'A stack policy applied to each stack' },
      { key: 'D', text: 'An AWS Config rule that adds the tags to resources' }
    ],
    correct: ['A'],
    explanation: 'A macro is a Lambda-backed transform that processes the template and can inject tags and configuration into resources before deployment, centrally and without each team editing templates. A custom resource acts during provisioning and must be added to each template, a stack policy protects rather than adds resources, and Config remediates after creation.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/template-macros.html'
  },
  {
    id: 'dop-0066', domain: 2, type: 'single', numToSelect: 1,
    stem: 'EC2 instances are configured with AWS::CloudFormation::Init metadata. When the stack is updated with new metadata such as an updated configuration file, the running instances must apply the change in place, without being replaced and without manual intervention. What enables this?',
    options: [
      { key: 'A', text: 'Run the cfn-hup daemon on the instances, configured to detect metadata changes and re-run cfn-init through a hook' },
      { key: 'B', text: 'Add a DependsOn from the instance to its launch template' },
      { key: 'C', text: 'Set an UpdatePolicy on the instance resource' },
      { key: 'D', text: 'Set a DeletionPolicy of Retain on the instance' }
    ],
    correct: ['A'],
    explanation: 'cfn-hup watches for changes to the instance metadata and runs configured hooks, such as re-running cfn-init, to apply updates in place with no replacement or manual action. DependsOn only orders creation, UpdatePolicy does not reapply metadata to a standalone instance, and DeletionPolicy governs deletion behavior.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/cfn-hup.html'
  },
  {
    id: 'dop-0067', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A CloudFormation stack contains a production database that must never be replaced or deleted by a stack update, while the rest of the stack can still be updated normally. Which mechanism enforces this during updates?',
    options: [
      { key: 'A', text: 'A stack policy that denies Update:Replace and Update:Delete on the database resource while allowing updates to other resources' },
      { key: 'B', text: 'Termination protection enabled on the stack' },
      { key: 'C', text: 'A DeletionPolicy of Retain on the database resource' },
      { key: 'D', text: 'A change set reviewed before each update' }
    ],
    correct: ['A'],
    explanation: 'A stack policy restricts which update actions are allowed on specific resources, so denying Update:Replace and Update:Delete on the database protects it during updates while other resources update normally. Termination protection only blocks stack deletion, DeletionPolicy Retain affects removal rather than preventing a replacing update, and a change set previews changes but does not enforce a block.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/protect-stack-resources.html'
  },
  {
    id: 'dop-0068', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A team wants to define infrastructure using a general-purpose programming language with reusable, parameterized components and unit tests, while still deploying through AWS CloudFormation so it keeps drift detection and rollback. Which tool fits best?',
    options: [
      { key: 'A', text: 'AWS Cloud Development Kit (CDK), which synthesizes CloudFormation from constructs written in a programming language and deploys through CloudFormation' },
      { key: 'B', text: 'Hand-written raw CloudFormation JSON templates' },
      { key: 'C', text: 'Terraform with a custom remote state backend' },
      { key: 'D', text: 'AWS Service Catalog products only' }
    ],
    correct: ['A'],
    explanation: 'The CDK lets you author infrastructure in a programming language with reusable constructs and unit tests, synthesizing CloudFormation so you keep drift detection and rollback. Raw JSON lacks programmatic constructs, Terraform does not deploy through CloudFormation, and Service Catalog distributes approved products rather than authoring constructs.',
    reference: 'https://docs.aws.amazon.com/cdk/v2/guide/home.html'
  },
  {
    id: 'dop-0069', domain: 2, type: 'single', numToSelect: 1,
    stem: 'Central IT must let application teams self-service-provision infrastructure, but only from a set of approved, versioned products with constrained parameters (for example, only certain instance types and Regions), and must track who launched what. Which service provides this?',
    options: [
      { key: 'A', text: 'AWS Service Catalog, publishing approved products with launch and template constraints and recording provisioned products per user' },
      { key: 'B', text: 'Give teams direct CloudFormation access and maintain a wiki of approved templates' },
      { key: 'C', text: 'AWS Marketplace subscriptions for the required infrastructure' },
      { key: 'D', text: 'An Amazon S3 bucket of approved templates that teams copy from' }
    ],
    correct: ['A'],
    explanation: 'Service Catalog publishes approved, versioned products with launch and template constraints (such as allowed instance types and Regions) and tracks provisioned products per user. A wiki or S3 bucket of templates does not enforce constraints or track launches, and Marketplace is for third-party software.',
    reference: 'https://docs.aws.amazon.com/servicecatalog/latest/adminguide/introduction.html'
  },
  {
    id: 'dop-0070', domain: 2, type: 'single', numToSelect: 1,
    stem: 'An operations team repeatedly performs a multi-step maintenance procedure (quiesce the application, snapshot the volume, apply a patch, restart, verify) and wants it codified as a versioned, auditable workflow that can run on demand, on a schedule, or in response to an event, with branching and error handling. Which service should they use?',
    options: [
      { key: 'A', text: 'AWS Systems Manager Automation runbooks, which codify multi-step procedures with steps, branching, and error handling, runnable on demand, on a schedule, or from events' },
      { key: 'B', text: 'A single AWS Lambda function that contains the entire procedure as one script' },
      { key: 'C', text: 'A documented manual checklist kept in a team wiki' },
      { key: 'D', text: 'An AWS Config rule with an automatic remediation action' }
    ],
    correct: ['A'],
    explanation: 'SSM Automation runbooks codify multi-step operational procedures as versioned documents with branching and error handling, runnable on demand, on a schedule, or from events, with auditing. A single Lambda script is less auditable and harder to branch or gate, a wiki checklist is manual, and Config remediation targets compliance violations rather than arbitrary scheduled procedures.',
    reference: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html'
  },
  {
    id: 'dop-0071', domain: 2, type: 'single', numToSelect: 1,
    stem: 'On AWS Elastic Beanstalk, a team must customize the environment (install OS packages, set web server options) declaratively, versioned with the application source so the same customization is applied on every deployment and in every environment. Which mechanism is used?',
    options: [
      { key: 'A', text: '.ebextensions configuration files included in the application source bundle' },
      { key: 'B', text: 'Manual changes made over SSH after each deployment' },
      { key: 'C', text: 'A custom AMI that the team rebuilds for each configuration change' },
      { key: 'D', text: 'Environment properties set only in the Elastic Beanstalk console' }
    ],
    correct: ['A'],
    explanation: '.ebextensions files in the source bundle declaratively customize the environment (packages, options) and are versioned with the application, so the same customization applies on every deployment and environment. Manual SSH changes are not repeatable, a custom AMI is heavier and not source-versioned configuration, and console environment properties cover only settings such as environment variables.',
    reference: 'https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/ebextensions.html'
  },
  {
    id: 'dop-0072', domain: 2, type: 'multi', numToSelect: 2,
    stem: 'An application has many non-sensitive configuration values that change occasionally and a few database credentials that must be rotated automatically. The team wants the lowest cost for the bulk configuration and managed rotation for the credentials. Which TWO choices fit each need?',
    options: [
      { key: 'A', text: 'Store the non-sensitive configuration values in Systems Manager Parameter Store standard parameters, which have no per-secret charge' },
      { key: 'B', text: 'Store the database credentials in AWS Secrets Manager and enable managed rotation' },
      { key: 'C', text: 'Store the database credentials in Parameter Store standard parameters and rotate them with a custom Lambda function' },
      { key: 'D', text: 'Store all values, including the credentials, in Secrets Manager to keep everything in one place' },
      { key: 'E', text: 'Hard-code the configuration values in the application to avoid lookups' }
    ],
    correct: ['A', 'B'],
    explanation: 'Parameter Store standard parameters store bulk non-sensitive configuration at the lowest cost, and Secrets Manager provides managed rotation for the database credentials. Custom Lambda rotation is not managed rotation, putting all values in Secrets Manager costs more for bulk configuration, and hard-coding is not manageable.',
    reference: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html'
  },
  {
    id: 'dop-0073', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A team wants a CloudFormation stack creation or update to automatically roll back if specified CloudWatch alarms (for example, high application error rates as new resources come online) breach within a monitoring window after the resources are created. What should they configure?',
    options: [
      { key: 'A', text: 'A rollback configuration with rollback triggers referencing the CloudWatch alarms and a monitoring time period on the stack operation' },
      { key: 'B', text: 'A stack policy that denies updates to the affected resources' },
      { key: 'C', text: 'Termination protection on the stack' },
      { key: 'D', text: 'A CreationPolicy with ResourceSignal on every resource' }
    ],
    correct: ['A'],
    explanation: 'A rollback configuration with rollback triggers monitors the specified CloudWatch alarms for a defined period during the stack operation and rolls back if they breach. A stack policy restricts updates, termination protection prevents deletion, and CreationPolicy with ResourceSignal gates on success signals rather than CloudWatch alarms.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-rollback-triggers.html'
  },
  {
    id: 'dop-0074', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A single CloudFormation template has grown to thousands of lines mixing networking, security, and application tiers, and is hard to maintain and reuse. The team wants to split it into independently maintained, reusable templates that a parent template composes and deploys as one stack operation. Which approach fits?',
    options: [
      { key: 'A', text: 'Refactor the template into nested stacks, each owning one tier, referenced and orchestrated by a parent stack' },
      { key: 'B', text: 'Split the resources into multiple independent stacks wired together with Export and Fn::ImportValue' },
      { key: 'C', text: 'Keep one template but add comments to organize the sections' },
      { key: 'D', text: 'Convert the template into a sequence of AWS CLI commands in a shell script' }
    ],
    correct: ['A'],
    explanation: 'Nested stacks split a large template into reusable child templates orchestrated by a parent and deployed as one stack operation, improving maintainability and reuse. Cross-stack exports create independently managed stacks with tighter coupling, comments do not modularize, and a CLI script abandons CloudFormation management.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-nested-stacks.html'
  },
  {
    id: 'dop-0075', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A platform team wants to publish a standardized, versioned building block (for example, an encrypted S3 bucket with logging and a bucket policy) that many teams reference as a single resource type in their CloudFormation templates, with central updates to the building block. Which CloudFormation feature provides this?',
    options: [
      { key: 'A', text: 'CloudFormation modules registered in the CloudFormation registry and referenced as a resource type' },
      { key: 'B', text: 'Nested stacks that each team references from its own template' },
      { key: 'C', text: 'A shared Mappings section copied into each template' },
      { key: 'D', text: 'A Lambda-backed custom resource implemented separately by each team' }
    ],
    correct: ['A'],
    explanation: 'CloudFormation modules are versioned, reusable building blocks registered in the registry and referenced as a resource type, with central versioning. Nested stacks are reusable but referenced as stacks rather than a registered resource type, Mappings are static lookups, and a custom resource is per-team code rather than a registered module.',
    reference: 'https://docs.aws.amazon.com/cloudformation-cli/latest/userguide/modules.html'
  },
  {
    id: 'dop-0076', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A company still has EC2 instances that were managed by AWS OpsWorks Stacks. The service reached end of life, and the company needs a supported AWS-native operating model. Which approach follows AWS migration guidance?',
    options: [
      { key: 'A', text: 'Migrate the workload to CloudFormation, Systems Manager, and EC2 Auto Scaling; use Systems Manager Application Manager and Automation for operations' },
      { key: 'B', text: 'Create new OpsWorks Stacks and keep using the retired control plane' },
      { key: 'C', text: 'Replace configuration management with Amazon EventBridge only' },
      { key: 'D', text: 'Use AWS Config as the application deployment engine' }
    ],
    correct: ['A'],
    explanation: 'OpsWorks Stacks was disabled for new and existing customers after its May 26, 2024 end of life. AWS migration guidance uses CloudFormation, Systems Manager, and Auto Scaling, with Application Manager and Automation for ongoing operations. The other services do not recreate a supported configuration-management control plane.',
    reference: 'https://aws.amazon.com/blogs/mt/seamlessly-off-board-from-aws-opsworks-stacks-by-detaching-resources/'
  },
  {
    id: 'dop-0077', domain: 2, type: 'single', numToSelect: 1,
    stem: 'Dev, test, and prod environments use the same set of configuration keys with different values. The team wants to organize the values by environment, retrieve all of an environment’s values in one call by path, keep a history of changes, and reference them from CloudFormation and ECS task definitions. Which approach fits best?',
    options: [
      { key: 'A', text: 'Store the values as Systems Manager Parameter Store hierarchical parameters (for example /app/prod/...) and retrieve them with GetParametersByPath, using parameter versioning' },
      { key: 'B', text: 'Store one JSON file per environment in Amazon S3 and parse it in the application' },
      { key: 'C', text: 'Bake the values into a separate AMI per environment as environment variables' },
      { key: 'D', text: 'Store the values in a DynamoDB table keyed by environment and configuration key' }
    ],
    correct: ['A'],
    explanation: 'Parameter Store hierarchical parameters organize values by environment path, support GetParametersByPath to fetch a whole environment in one call, keep version history, and integrate natively with CloudFormation and ECS. An S3 JSON file lacks per-key versioning and path retrieval, baked-in AMI variables are not centrally managed, and DynamoDB lacks the native versioning, path retrieval, and integrations.',
    reference: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-su-organize.html'
  },

  // ---- Domain 3: Resilient Cloud Solutions ----
  {
    id: 'dop-0078', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A globally distributed application needs a fully managed key-value datastore that serves low-latency reads and writes from multiple Regions simultaneously, replicates changes automatically between Regions, and keeps serving in each Region if another Region fails. Which option meets this?',
    options: [
      { key: 'A', text: 'Amazon DynamoDB global tables, providing multi-Region active-active replication' },
      { key: 'B', text: 'A DynamoDB table in one Region that clients in other Regions access cross-Region' },
      { key: 'C', text: 'An Amazon RDS Multi-AZ instance with a cross-Region read replica' },
      { key: 'D', text: 'A self-managed key-value store replicated by a custom process across EC2 instances in two Regions' }
    ],
    correct: ['A'],
    explanation: 'DynamoDB global tables provide fully managed multi-Region active-active replication with low-latency local reads and writes and continued operation if a Region fails. A single-Region table adds latency and a single point of failure, an RDS read replica is read-only and not active-active for writes, and a self-managed store is operationally heavy.',
    reference: 'https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/GlobalTables.html'
  },
  {
    id: 'dop-0079', domain: 3, type: 'single', numToSelect: 1,
    stem: 'Objects written to an S3 bucket must be replicated automatically to a bucket in another Region for disaster recovery and lower-latency regional reads, including replicating delete markers, while objects that already exist before replication is enabled must also be brought into sync. Which approach meets this?',
    options: [
      { key: 'A', text: 'Enable S3 Cross-Region Replication with versioning on both buckets and a rule that replicates delete markers, and run S3 Batch Replication for the pre-existing objects' },
      { key: 'B', text: 'Enable S3 Transfer Acceleration on the source bucket' },
      { key: 'C', text: 'Turn on S3 server access logging and copy the access logs to the second Region' },
      { key: 'D', text: 'Apply S3 Intelligent-Tiering so objects move to the second Region automatically' }
    ],
    correct: ['A'],
    explanation: 'Cross-Region Replication with versioning on both buckets replicates new objects automatically and can replicate delete markers, and S3 Batch Replication handles objects that existed before replication was enabled. Transfer Acceleration only speeds uploads, access logging copies logs rather than data, and Intelligent-Tiering changes storage class within a Region.',
    reference: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html'
  },
  {
    id: 'dop-0080', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A production Amazon RDS for PostgreSQL database must automatically fail over to a standby with no committed-data loss if its Availability Zone fails, while staying in a single Region. Which configuration provides this, and what is its replication mode?',
    options: [
      { key: 'A', text: 'An RDS Multi-AZ deployment, which keeps a synchronous standby in another AZ and fails over automatically with no committed-data loss' },
      { key: 'B', text: 'A single-AZ instance with frequent automated snapshots used for a fast restore' },
      { key: 'C', text: 'A cross-Region read replica that is promoted on failure' },
      { key: 'D', text: 'Two single-AZ instances kept in sync by application-level dual writes' }
    ],
    correct: ['A'],
    explanation: 'RDS Multi-AZ maintains a synchronous standby in another AZ within the Region and fails over automatically with no committed-data loss. Snapshot restore is not automatic failover and risks data loss, a cross-Region read replica is asynchronous and cross-Region, and application dual writes are custom and error-prone.',
    reference: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.MultiAZ.html'
  },
  {
    id: 'dop-0081', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A reporting workload runs heavy read queries that overload the primary Amazon RDS instance and slow down writes. The reporting reads can tolerate slight staleness. How should the team scale reads while protecting write performance, with the least application change?',
    options: [
      { key: 'A', text: 'Add one or more RDS read replicas and direct the reporting read traffic to a read-replica endpoint' },
      { key: 'B', text: 'Enable Multi-AZ and send the reporting reads to the standby instance' },
      { key: 'C', text: 'Increase the primary backup retention period and take snapshots more frequently' },
      { key: 'D', text: 'Run the reporting queries against the most recent automated snapshot' }
    ],
    correct: ['A'],
    explanation: 'Read replicas offload read traffic from the primary and tolerate slight staleness, protecting write performance with minimal application change by pointing reads at the replica endpoint. The Multi-AZ standby is not readable, backups and snapshots do not offload reads, and snapshots are not live-queryable.',
    reference: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html'
  },
  {
    id: 'dop-0082', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A producer service occasionally generates bursts far above what the downstream consumer can process, causing dropped work and failures during spikes. The team wants to absorb the bursts, let the consumer process at its own rate, and retain messages that repeatedly fail processing for later inspection. Which design is best?',
    options: [
      { key: 'A', text: 'Place an Amazon SQS queue between the producer and the consumer, with a dead-letter queue for messages that exceed the maximum receive count' },
      { key: 'B', text: 'Have the producer call the consumer synchronously and retry until each call succeeds' },
      { key: 'C', text: 'Scale the consumer to a fixed large size that can handle peak load at all times' },
      { key: 'D', text: 'Drop messages that arrive faster than the consumer can process them' }
    ],
    correct: ['A'],
    explanation: 'An SQS queue buffers bursts so the consumer processes at its own rate, and a dead-letter queue retains messages that repeatedly fail for inspection. Synchronous retries propagate backpressure, fixed over-provisioning is costly and still lacks a failure buffer, and dropping messages loses work.',
    reference: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/welcome.html'
  },
  {
    id: 'dop-0083', domain: 3, type: 'single', numToSelect: 1,
    stem: 'An Auto Scaling group launches instances that take 6 to 8 minutes to boot and initialize before they can serve traffic, so the group cannot scale out fast enough during sudden, unpredictable demand spikes. Which feature reduces scale-out latency by keeping pre-initialized instances ready?',
    options: [
      { key: 'A', text: 'Auto Scaling group warm pools, which keep pre-initialized, typically stopped, instances ready to bring into service quickly' },
      { key: 'B', text: 'A longer health check grace period on the group' },
      { key: 'C', text: 'Predictive scaling, without otherwise addressing the boot time' },
      { key: 'D', text: 'A shorter scaling cooldown period' }
    ],
    correct: ['A'],
    explanation: 'Warm pools keep pre-initialized instances ready so scale-out brings them into service quickly, cutting the boot and initialization latency. A grace period and cooldown do not reduce boot time, and predictive scaling addresses known recurring patterns rather than sudden, unpredictable spikes.',
    reference: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-warm-pools.html'
  },
  {
    id: 'dop-0084', domain: 3, type: 'single', numToSelect: 1,
    stem: 'An application load follows a strong, repeating daily and weekly pattern with predictable morning ramps that currently cause brief under-provisioning because reactive scaling lags the ramp. The team wants capacity provisioned ahead of the forecasted demand with the least ongoing tuning. Which approach fits best?',
    options: [
      { key: 'A', text: 'Auto Scaling predictive scaling, which forecasts demand from historical patterns and provisions capacity ahead of the ramp' },
      { key: 'B', text: 'A target tracking policy on CPU only, which scales after utilization rises' },
      { key: 'C', text: 'Scheduled scaling actions that the team hand-tunes each week to the expected pattern' },
      { key: 'D', text: 'A fixed desired capacity sized for the daily peak at all times' }
    ],
    correct: ['A'],
    explanation: 'Predictive scaling forecasts demand from historical daily and weekly patterns and provisions capacity ahead of the ramp, addressing the lag of reactive scaling with little ongoing tuning. Target tracking is reactive, hand-tuned scheduled scaling is high-maintenance, and fixed peak capacity is wasteful off-peak.',
    reference: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/ec2-auto-scaling-predictive-scaling.html'
  },
  {
    id: 'dop-0085', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A web tier behind an Auto Scaling group loses user sessions whenever an instance is replaced during scaling or deployments, because sessions are stored in instance memory. The team wants instances to be fully replaceable without losing sessions, with low-latency session access. Where should session state be stored?',
    options: [
      { key: 'A', text: 'In an external low-latency store such as Amazon ElastiCache or a DynamoDB session store, keeping the instances stateless' },
      { key: 'B', text: 'On each instance local disk, backed up periodically to Amazon S3' },
      { key: 'C', text: 'Pinned to a specific instance using load balancer sticky sessions, with no external store' },
      { key: 'D', text: 'In a file on a single shared EBS volume attached to one instance' }
    ],
    correct: ['A'],
    explanation: 'Externalizing session state to ElastiCache or DynamoDB keeps the tier stateless so any instance can serve any request and replacements lose no sessions, with low-latency access. Local disk and single-EBS storage tie state to an instance, and sticky sessions still lose state when the pinned instance is replaced.',
    reference: 'https://docs.aws.amazon.com/whitepapers/latest/real-time-communication-on-aws/stateless-application.html'
  },
  {
    id: 'dop-0086', domain: 3, type: 'single', numToSelect: 1,
    stem: 'An Amazon ECS rolling deployment must automatically stop and roll back to the last stable task set if the new tasks repeatedly fail to start or fail health checks, without requiring a separate CodeDeploy blue/green setup. Which built-in feature provides this?',
    options: [
      { key: 'A', text: 'The ECS deployment circuit breaker with rollback enabled on the service' },
      { key: 'B', text: 'A longer health check grace period on the service' },
      { key: 'C', text: 'A CloudWatch alarm that emails the team to intervene' },
      { key: 'D', text: 'Setting maximumPercent to 200 so more tasks launch during the deployment' }
    ],
    correct: ['A'],
    explanation: 'The ECS deployment circuit breaker detects repeated task launch or health-check failures during a rolling deployment and can automatically roll back to the last stable task set, with no separate blue/green setup. A grace period tolerates failures, an email alarm is manual, and raising maximumPercent does not roll back.',
    reference: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/deployment-type-ecs.html'
  },
  {
    id: 'dop-0087', domain: 3, type: 'multi', numToSelect: 2,
    stem: 'A company is building an active/active multi-Region web application and must route users to a healthy Region automatically and keep the application data consistent across Regions with single-digit-millisecond local access. Which TWO services support these goals?',
    options: [
      { key: 'A', text: 'Amazon Route 53 with health checks and latency or failover routing to direct users to a healthy Region' },
      { key: 'B', text: 'Amazon DynamoDB global tables for multi-Region active-active data replication' },
      { key: 'C', text: 'A single Amazon RDS instance in one Region accessed from both Regions' },
      { key: 'D', text: 'Amazon CloudFront with a single origin in one Region only' },
      { key: 'E', text: 'Disabling health checks so the routing configuration is simpler' }
    ],
    correct: ['A', 'B'],
    explanation: 'Route 53 health checks and routing direct users to a healthy Region, and DynamoDB global tables provide multi-Region active-active replication with low-latency local access. A single-Region RDS instance and a single-origin CloudFront do not provide multi-Region data, and disabling health checks breaks failover.',
    reference: 'https://docs.aws.amazon.com/whitepapers/latest/disaster-recovery-workloads-on-aws/disaster-recovery-options-in-the-cloud.html'
  },
  {
    id: 'dop-0088', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A latency-sensitive TCP-based game backend runs in three Regions. The company wants a static set of entry-point IP addresses that route players over the AWS global network to the nearest healthy regional endpoint, with fast failover if a Region becomes unhealthy. Which service fits?',
    options: [
      { key: 'A', text: 'AWS Global Accelerator, providing static anycast IPs that route over the AWS backbone to the nearest healthy endpoint with fast failover' },
      { key: 'B', text: 'Amazon CloudFront, caching the game traffic at edge locations' },
      { key: 'C', text: 'A single Elastic IP attached to one Region load balancer' },
      { key: 'D', text: 'Latency-based Amazon Route 53 records with a 60-second TTL' }
    ],
    correct: ['A'],
    explanation: 'Global Accelerator provides static anycast IPs and routes TCP/UDP traffic over the AWS backbone to the nearest healthy regional endpoint with fast failover, ideal for a latency-sensitive game backend. CloudFront caches HTTP content, a single Elastic IP is single-Region, and latency-based DNS fails over more slowly and offers no static anycast entry point.',
    reference: 'https://docs.aws.amazon.com/global-accelerator/latest/dg/what-is-global-accelerator.html'
  },

  // ---- Domain 4: Monitoring & Logging ----
  {
    id: 'dop-0089', domain: 4, type: 'single', numToSelect: 1,
    stem: 'An operations team needs memory utilization, disk space, and swap metrics from a fleet of EC2 instances visible in CloudWatch, collected centrally and without writing a custom metric publisher. None of these appear by default. What should they do?',
    options: [
      { key: 'A', text: 'Install and configure the unified CloudWatch agent on the instances to collect and publish memory, disk, and swap metrics to CloudWatch' },
      { key: 'B', text: 'Rely on the default EC2 instance metrics, which already include memory and disk usage' },
      { key: 'C', text: 'Enable detailed monitoring on the instances to add the memory and disk metrics' },
      { key: 'D', text: 'Use VPC Flow Logs to derive memory and disk usage' }
    ],
    correct: ['A'],
    explanation: 'Memory, disk, and swap metrics require the unified CloudWatch agent, which collects and publishes them to CloudWatch with no custom publisher. Default EC2 metrics do not include guest memory or disk, detailed monitoring only increases the frequency of existing metrics, and Flow Logs capture network traffic.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html'
  },
  {
    id: 'dop-0090', domain: 4, type: 'single', numToSelect: 1,
    stem: 'Log events arriving in a CloudWatch Logs group must be delivered in near real time to a function that enriches them and to an Amazon OpenSearch Service domain for search, as they arrive. Which feature delivers the matching events to these targets continuously?',
    options: [
      { key: 'A', text: 'CloudWatch Logs subscription filters that stream matching log events to the Lambda function and to OpenSearch (directly or via Kinesis) in near real time' },
      { key: 'B', text: 'A daily export task from the log group to Amazon S3' },
      { key: 'C', text: 'A scheduled CloudWatch Logs Insights query that runs hourly' },
      { key: 'D', text: 'A CloudWatch dashboard that visualizes the log group' }
    ],
    correct: ['A'],
    explanation: 'Subscription filters stream matching log events in near real time to targets such as Lambda, Kinesis, and OpenSearch as they arrive. A daily export and an hourly query are batch or polling, and a dashboard does not deliver events to processors.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html'
  },
  {
    id: 'dop-0091', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A company must aggregate high-volume streaming application logs from many sources and reliably load them into Amazon S3, and optionally into Amazon OpenSearch Service, with buffering, optional transformation, and automatic retries, using the least management. Which service fits?',
    options: [
      { key: 'A', text: 'Amazon Data Firehose (Kinesis Data Firehose), a managed delivery stream that buffers, optionally transforms, retries, and loads into S3 and OpenSearch' },
      { key: 'B', text: 'Amazon SQS as the delivery mechanism into S3 and OpenSearch' },
      { key: 'C', text: 'A fleet of EC2 instances running a custom log shipper to S3 and OpenSearch' },
      { key: 'D', text: 'AWS CloudTrail to capture and deliver the application logs' }
    ],
    correct: ['A'],
    explanation: 'Data Firehose is a managed delivery stream that buffers, optionally transforms, retries, and loads streaming data into S3, OpenSearch, and other destinations with minimal management. SQS is a queue rather than a managed loader, a custom EC2 shipper is operationally heavy, and CloudTrail records API activity rather than arbitrary application logs.',
    reference: 'https://docs.aws.amazon.com/firehose/latest/dev/what-is-this-service.html'
  },
  {
    id: 'dop-0092', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A team must continuously verify, from outside the application, that a critical user workflow (load the login page, submit credentials, reach the dashboard) succeeds and returns the expected content, and alarm if it breaks, even when no real users are active. Which CloudWatch capability provides this?',
    options: [
      { key: 'A', text: 'CloudWatch Synthetics canaries that run the scripted multi-step workflow on a schedule and alarm on failures' },
      { key: 'B', text: 'CloudWatch Logs Insights queries over the application logs' },
      { key: 'C', text: 'CloudWatch metric math over existing request metrics' },
      { key: 'D', text: 'Real-user monitoring derived from the load balancer access logs' }
    ],
    correct: ['A'],
    explanation: 'Synthetics canaries run scripted, multi-step workflows on a schedule from outside the application, verifying behavior and content and alarming on failures even with no real traffic. Logs Insights and metric math analyze existing data generated by real traffic, and access logs require real users.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html'
  },
  {
    id: 'dop-0093', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A metric normal range varies widely by time of day and day of week, so a single static threshold produces frequent false alarms at night and misses anomalies during the day. The team wants alarms based on the expected behavior for the current time. Which CloudWatch capability fits?',
    options: [
      { key: 'A', text: 'CloudWatch anomaly detection, which models expected values per time band and alarms on deviations from the learned band' },
      { key: 'B', text: 'A static threshold set to the daytime peak value' },
      { key: 'C', text: 'A composite alarm combining several fixed-threshold alarms' },
      { key: 'D', text: 'A dashboard annotation that marks the expected ranges' }
    ],
    correct: ['A'],
    explanation: 'Anomaly detection builds a model of expected values that accounts for time-of-day and day-of-week patterns and alarms on deviations from the learned band, reducing false alarms and catching context-specific anomalies. Static and composite fixed thresholds cannot adapt, and a dashboard annotation does not alarm.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Anomaly_Detection.html'
  },
  {
    id: 'dop-0094', domain: 4, type: 'single', numToSelect: 1,
    stem: 'During an incident, an engineer must interactively search and aggregate millions of structured log events across several CloudWatch Logs groups, computing counts and percentiles by field, without exporting the data or standing up infrastructure. Which tool fits?',
    options: [
      { key: 'A', text: 'CloudWatch Logs Insights, using its query language to search and aggregate across the log groups interactively' },
      { key: 'B', text: 'Amazon Athena querying the CloudWatch Logs groups directly' },
      { key: 'C', text: 'A CloudWatch Logs metric filter created during the incident' },
      { key: 'D', text: 'Exporting the logs to Amazon S3 and loading them into Amazon Redshift' }
    ],
    correct: ['A'],
    explanation: 'Logs Insights provides an interactive query language to search and aggregate large volumes of CloudWatch Logs across groups, computing counts and percentiles by field with no export or infrastructure. Athena and Redshift require the data to be in S3 or loaded first, and a metric filter only affects events going forward.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/AnalyzingLogData.html'
  },
  {
    id: 'dop-0095', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A security team needs one CloudTrail configuration that records management events from every account in the AWS Organization, including accounts created in the future, delivered to a central, access-controlled S3 bucket, without configuring a trail in each account. What should they create?',
    options: [
      { key: 'A', text: 'An organization trail in the management or delegated administrator account, delivering to a central S3 bucket and automatically covering current and future accounts' },
      { key: 'B', text: 'A separate trail manually created in each member account, each delivering to its own bucket' },
      { key: 'C', text: 'A CloudWatch Logs subscription in each account that forwards events to a central account' },
      { key: 'D', text: 'AWS Config enabled in each account to record the management API calls' }
    ],
    correct: ['A'],
    explanation: 'An organization trail records management events for all current and future member accounts and delivers them to a central S3 bucket, with no per-account trail setup. Per-account trails miss future accounts and add effort, subscription forwarding is custom, and AWS Config records configuration rather than API events.',
    reference: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/creating-trail-organization.html'
  },
  {
    id: 'dop-0096', domain: 4, type: 'single', numToSelect: 1,
    stem: 'After a suspected intrusion, responders must determine which source IP addresses connected to a specific EC2 instance elastic network interface, on which ports, and whether the traffic was accepted or rejected, over the past several hours. Which capability provides this network-level data?',
    options: [
      { key: 'A', text: 'VPC Flow Logs for the instance elastic network interface, capturing source and destination IPs, ports, and accept/reject actions' },
      { key: 'B', text: 'The CloudWatch agent collecting system metrics from the instance' },
      { key: 'C', text: 'AWS CloudTrail management event history for the account' },
      { key: 'D', text: 'Amazon GuardDuty findings only, without any underlying flow records' }
    ],
    correct: ['A'],
    explanation: 'VPC Flow Logs capture IP traffic metadata (source and destination addresses, ports, protocol, and accept/reject) for an ENI, subnet, or VPC, which is exactly the network-level detail the investigation needs. The CloudWatch agent collects system metrics, CloudTrail records API calls rather than packet flows, and GuardDuty findings summarize threats without the raw flow records.',
    reference: 'https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html'
  },
  {
    id: 'dop-0097', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A team needs a single CloudWatch alarm that fires when the error rate (errors divided by total requests, as a percentage) exceeds 5% over 5 minutes, using two existing metrics and without publishing a new metric from the application. How should they build it?',
    options: [
      { key: 'A', text: 'Create a metric math expression such as (errors/requests)*100 and configure the alarm to evaluate that expression' },
      { key: 'B', text: 'Publish a new custom error-rate metric from the application with PutMetricData and alarm on it' },
      { key: 'C', text: 'Create two separate alarms, one on errors and one on requests, and combine them on a dashboard' },
      { key: 'D', text: 'Use anomaly detection on the errors metric' }
    ],
    correct: ['A'],
    explanation: 'Metric math computes an expression such as (errors/requests)*100, and an alarm can evaluate that expression directly with no new metric. Publishing a custom metric requires an application change the constraint excludes, two separate alarms do not compute the ratio, and anomaly detection does not enforce a fixed 5% ratio threshold.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/using-metric-math.html'
  },
  {
    id: 'dop-0098', domain: 4, type: 'single', numToSelect: 1,
    stem: 'An EventBridge event bus had an archive configured before a downstream consumer outage. After fixing the consumer, the team must resend only the events from the outage window so they are reprocessed. Which approach accomplishes this?',
    options: [
      { key: 'A', text: 'Start an EventBridge replay of the archive scoped to the outage time window, so the archived events are re-sent to the bus and routed to the targets again' },
      { key: 'B', text: 'Read the events from the target SQS dead-letter queue, which holds the full bus history for the window' },
      { key: 'C', text: 'Create the archive now and expect it to retroactively contain the outage events' },
      { key: 'D', text: 'Re-drive the events from CloudTrail, which stores every EventBridge event payload' }
    ],
    correct: ['A'],
    explanation: 'EventBridge replay re-sends events from an existing archive over a selected time window, and rules route them to targets again. A dead-letter queue holds only failed target deliveries rather than the full bus history, archives are not retroactive, and CloudTrail records API calls rather than event payloads.',
    reference: 'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html'
  },
  {
    id: 'dop-0099', domain: 4, type: 'multi', numToSelect: 2,
    stem: 'A team must get EC2 memory utilization metrics and a custom application throughput metric into CloudWatch reliably and at scale, without relying on default instance metrics. Which TWO methods are appropriate?',
    options: [
      { key: 'A', text: 'Install the unified CloudWatch agent to collect and publish memory and other system metrics' },
      { key: 'B', text: 'Publish the custom throughput metric using PutMetricData or the CloudWatch embedded metric format (EMF)' },
      { key: 'C', text: 'Rely on default EC2 instance metrics, which already include memory utilization' },
      { key: 'D', text: 'Write the values only to application log files and never publish them as metrics' },
      { key: 'E', text: 'Use AWS Config to record and graph the metrics' }
    ],
    correct: ['A', 'B'],
    explanation: 'The unified CloudWatch agent collects guest memory metrics, and custom application metrics are published via PutMetricData or EMF. Default EC2 metrics do not include memory, log-only values are not CloudWatch metrics, and AWS Config records configuration rather than metrics.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/publishingMetrics.html'
  },

  // ---- Domain 5: Incident & Event Response ----
  {
    id: 'dop-0100', domain: 5, type: 'single', numToSelect: 1,
    stem: 'An organization enabled AWS Systems Manager Incident Manager before November 7, 2025. It wants structured incident management with on-call engagement, escalation, runbooks, and a timeline. Which service provides these capabilities for this existing customer?',
    options: [
      { key: 'A', text: 'AWS Systems Manager Incident Manager' },
      { key: 'B', text: 'Amazon SNS alone' },
      { key: 'C', text: 'AWS Config' },
      { key: 'D', text: 'Amazon Athena' }
    ],
    correct: ['A'],
    explanation: 'Incident Manager provides response plans, on-call schedules, escalation, runbooks, and incident timelines. It stopped accepting new customers on November 7, 2025, but existing enabled customers can continue using it. SNS only sends notifications; Config and Athena do not provide incident coordination.',
    reference: 'https://docs.aws.amazon.com/incident-manager/latest/userguide/incident-manager-availability-change.html'
  },
  {
    id: 'dop-0101', domain: 5, type: 'single', numToSelect: 1,
    stem: 'A maintenance Lambda function must run at the start of every hour, with retries on failure and a dead-letter queue for runs that still fail, and the team wants a fully managed scheduler with no servers and no always-on resources. Which approach fits best?',
    options: [
      { key: 'A', text: 'Use Amazon EventBridge Scheduler with an hourly schedule targeting the Lambda, configured with a retry policy and a dead-letter queue' },
      { key: 'B', text: 'Run a crontab on an always-on EC2 instance that invokes the Lambda each hour' },
      { key: 'C', text: 'Use a Step Functions state machine in a Wait loop that invokes the Lambda every hour' },
      { key: 'D', text: 'Have the Lambda set an internal timer that re-invokes itself after sleeping an hour' }
    ],
    correct: ['A'],
    explanation: 'EventBridge Scheduler invokes a target on a cron or rate schedule with no servers, and supports a retry policy and a dead-letter queue for failed invocations. A crontab EC2 instance is an always-on server to manage, a Wait-loop state machine is more complex and costly, and a self-re-invoking Lambda is fragile and not a scheduler.',
    reference: 'https://docs.aws.amazon.com/scheduler/latest/UserGuide/what-is-scheduler.html'
  },
  {
    id: 'dop-0102', domain: 5, type: 'single', numToSelect: 1,
    stem: 'A new hardened AMI must be rolled out to every instance in an Auto Scaling group in controlled batches, keeping a minimum healthy capacity in service, pausing if new instances fail health checks, and with the ability to roll back to the previous launch template version. Which feature does this?',
    options: [
      { key: 'A', text: 'An Auto Scaling group instance refresh using the new launch template version, with a minimum healthy percentage and rollback on failure' },
      { key: 'B', text: 'Manually terminating instances in batches and letting the group relaunch them' },
      { key: 'C', text: 'Increasing the desired capacity so new-AMI instances are added alongside the old ones, then reducing it' },
      { key: 'D', text: 'Editing each instance in place over SSH to apply the hardening' }
    ],
    correct: ['A'],
    explanation: 'Instance refresh replaces instances in batches using the updated launch template, honors a minimum healthy percentage, pauses on health-check failures, and can roll back to the previous version. Manual termination lacks built-in gating and rollback, scaling up then down mixes versions without controlled replacement, and in-place SSH edits are not immutable or repeatable.',
    reference: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-refresh.html'
  },
  {
    id: 'dop-0103', domain: 5, type: 'single', numToSelect: 1,
    stem: 'An automated remediation workflow has many steps with conditional branches, a wait for an external approval, retries with backoff, and per-step error handling, and the team needs the execution history and current state to be visible and auditable. Which service best orchestrates it?',
    options: [
      { key: 'A', text: 'An AWS Step Functions state machine, which models branches, waits, retries with backoff, and error handling with a visual execution history' },
      { key: 'B', text: 'A single AWS Lambda function containing the whole workflow with nested try/catch blocks and sleeps' },
      { key: 'C', text: 'A chain of EventBridge rules invoking Lambda functions with no central state' },
      { key: 'D', text: 'An SSM Run Command document executed once per step manually' }
    ],
    correct: ['A'],
    explanation: 'Step Functions orchestrate multi-step workflows with branching, waits, retries with backoff, and per-step error handling, and provide a visual, auditable execution history. A monolithic Lambda is opaque and bounded by the function timeout, chained EventBridge rules lack central state, and manual Run Command steps are not orchestration.',
    reference: 'https://docs.aws.amazon.com/step-functions/latest/dg/welcome.html'
  },
  {
    id: 'dop-0104', domain: 5, type: 'single', numToSelect: 1,
    stem: 'A team must automatically react to AWS-reported operational events that affect their own resources, such as scheduled EC2 maintenance, an EBS volume needing attention, or a Regional service issue, by opening a ticket and notifying on-call. Which event source should their EventBridge rule match?',
    options: [
      { key: 'A', text: 'AWS Health events (AWS Health Dashboard / Health API) delivered to EventBridge, including account-specific and public service events' },
      { key: 'B', text: 'A scheduled job that scrapes the public AWS status page for issues' },
      { key: 'C', text: 'CloudTrail management events for the affected services' },
      { key: 'D', text: 'CloudWatch billing alarms tied to the affected services' }
    ],
    correct: ['A'],
    explanation: 'AWS Health publishes account-specific and public operational events to EventBridge, so a rule can open tickets and notify on-call automatically. Scraping the status page is unreliable and not account-specific, CloudTrail records API calls, and billing alarms are about cost.',
    reference: 'https://docs.aws.amazon.com/health/latest/ug/cloudwatch-events-health.html'
  },
  {
    id: 'dop-0105', domain: 5, type: 'single', numToSelect: 1,
    stem: 'During an incident, the team must run an emergency mitigation command on several hundred EC2 instances at once, capture each instance output centrally, target the instances by tag, and do so without opening SSH or managing bastion hosts and keys. Which capability fits?',
    options: [
      { key: 'A', text: 'AWS Systems Manager Run Command, targeting instances by tag, executing at scale and capturing output centrally without SSH' },
      { key: 'B', text: 'Open SSH from a bastion host and script a loop over the instance IP addresses' },
      { key: 'C', text: 'Trigger an Auto Scaling instance refresh to roll out the mitigation in a new AMI' },
      { key: 'D', text: 'Use the EC2 Serial Console on each instance to run the command' }
    ],
    correct: ['A'],
    explanation: 'Run Command executes commands across many managed instances selected by tag, captures output centrally, and needs no SSH, bastions, or keys, making it ideal for emergency mitigation at scale. A bastion SSH loop requires key and bastion management and is slow, an instance refresh is not an immediate command, and the serial console is per-instance.',
    reference: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/run-command.html'
  },
  {
    id: 'dop-0106', domain: 5, type: 'single', numToSelect: 1,
    stem: 'An asynchronously invoked Lambda function must route the records of successful invocations to one downstream target and the records of invocations that fail after retries to a different target for investigation, without adding error-handling code inside the function. Which feature provides this?',
    options: [
      { key: 'A', text: 'Lambda destinations, configuring an on-success destination and an on-failure destination for asynchronous invocations (for example SQS, SNS, or EventBridge)' },
      { key: 'B', text: 'A Lambda dead-letter queue, which captures both successful and failed invocation records' },
      { key: 'C', text: 'An EventBridge rule that inspects the function CloudWatch Logs for success and failure' },
      { key: 'D', text: 'Try/catch logic in the function that writes outcomes to two separate SQS queues' }
    ],
    correct: ['A'],
    explanation: 'Lambda destinations route asynchronous invocation results to separate on-success and on-failure targets (SQS, SNS, EventBridge, or another function) with no in-function error-handling code. A dead-letter queue captures only failures, log parsing is custom, and in-function try/catch is exactly the code the requirement excludes.',
    reference: 'https://docs.aws.amazon.com/lambda/latest/dg/invocation-async.html'
  },
  {
    id: 'dop-0107', domain: 5, type: 'multi', numToSelect: 2,
    stem: 'When an S3 bucket is created or modified without default encryption, it must be automatically brought into compliance across all accounts in the Organization, with no human action. Which TWO components together implement this?',
    options: [
      { key: 'A', text: 'An AWS Config rule such as s3-bucket-server-side-encryption-enabled that detects the noncompliant bucket, deployed organization-wide' },
      { key: 'B', text: 'An automatic remediation action on the rule that runs an SSM Automation document to enable default encryption' },
      { key: 'C', text: 'A nightly Amazon Athena query over CloudTrail that lists unencrypted buckets for an engineer to fix' },
      { key: 'D', text: 'An SCP that denies s3:CreateBucket entirely' },
      { key: 'E', text: 'A CloudWatch dashboard that displays each bucket encryption status' }
    ],
    correct: ['A', 'B'],
    explanation: 'A Config rule detects buckets that lack default encryption (deployable organization-wide via a conformance pack), and an associated SSM Automation remediation enables encryption automatically. A nightly query is manual, a blanket SCP deny blocks all buckets without remediating, and a dashboard only visualizes.',
    reference: 'https://docs.aws.amazon.com/config/latest/developerguide/remediation.html'
  },
  {
    id: 'dop-0108', domain: 5, type: 'single', numToSelect: 1,
    stem: 'A central security account must receive specific findings and resource-change events from dozens of member accounts and act on them with rules, while member accounts continue to own their own event buses. Which EventBridge configuration enables this with the least custom code?',
    options: [
      { key: 'A', text: 'In each member account, add an EventBridge rule that forwards the selected events to a custom event bus in the central account, and grant that central bus a resource policy allowing those accounts to put events' },
      { key: 'B', text: 'Have each member account write the events to an S3 bucket that the central account reads hourly' },
      { key: 'C', text: 'Give the central account cross-account IAM roles and have it poll each member account event bus' },
      { key: 'D', text: 'Disable the default bus in member accounts and share a single global event bus across all accounts' }
    ],
    correct: ['A'],
    explanation: 'EventBridge supports cross-account delivery: member-account rules forward selected events to a central custom bus whose resource policy permits those accounts to put events, where central rules act on them, with no custom code. S3 batching and polling are custom and not near real time, and event buses cannot be shared globally that way.',
    reference: 'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-cross-account.html'
  },
  {
    id: 'dop-0109', domain: 5, type: 'single', numToSelect: 1,
    stem: 'When p95 request latency on a service exceeds a threshold for several minutes, the EC2 fleet should automatically add capacity in proportion to how far latency exceeds the target, and scale back as it recovers, with no manual action. Which configuration achieves this?',
    options: [
      { key: 'A', text: 'A CloudWatch alarm on the p95 latency metric tied to an Auto Scaling step (or target tracking) scaling policy that adds capacity based on the breach magnitude' },
      { key: 'B', text: 'A CloudWatch alarm that emails on-call to add instances manually' },
      { key: 'C', text: 'A scheduled scaling action that adds capacity at fixed times of day' },
      { key: 'D', text: 'A fixed, over-provisioned group sized for worst-case latency at all times' }
    ],
    correct: ['A'],
    explanation: 'A CloudWatch alarm on p95 latency linked to a step or target tracking scaling policy adds capacity automatically in proportion to the breach and scales back on recovery. Emailing on-call is manual, scheduled scaling is not latency-responsive, and fixed over-provisioning is costly and static.',
    reference: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-scaling-simple-step.html'
  },

  // ---- Domain 6: Security & Compliance ----
  {
    id: 'dop-0110', domain: 6, type: 'single', numToSelect: 1,
    stem: 'Compliance requires that the key material backing a customer-managed KMS key be rotated on a yearly schedule with no application changes, no re-encryption of existing data, and no change to references to the key. Which approach meets this?',
    options: [
      { key: 'A', text: 'Enable automatic key rotation on the customer-managed KMS key, which rotates the backing key material on a schedule while the key ID and ARN remain the same' },
      { key: 'B', text: 'Create a new KMS key each year, re-encrypt all existing data with it, and update every reference to the new key ARN' },
      { key: 'C', text: 'Rotate the IAM access keys of the principals that use the KMS key each year' },
      { key: 'D', text: 'Schedule a Lambda function to call GenerateDataKey daily to rotate the key' }
    ],
    correct: ['A'],
    explanation: 'KMS automatic key rotation rotates the backing key material on a schedule (default annually) while the key ID and ARN stay the same, so no application changes or re-encryption are needed. Creating a new key forces re-encryption and reference changes, rotating IAM access keys is unrelated to KMS key material, and generating data keys does not rotate the customer master key.',
    reference: 'https://docs.aws.amazon.com/kms/latest/developerguide/rotate-keys.html'
  },
  {
    id: 'dop-0111', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A security team must continuously identify which IAM roles, S3 buckets, KMS keys, and SQS queues across the Organization grant access to external accounts or the public, and review newly created external access from one centralized view. Which service is designed for this?',
    options: [
      { key: 'A', text: 'AWS IAM Access Analyzer external access analysis, with a delegated administrator and the organization as the zone of trust' },
      { key: 'B', text: 'Amazon Inspector scanning the resources for misconfigurations' },
      { key: 'C', text: 'AWS Config rules that check each resource policy individually with no central analyzer' },
      { key: 'D', text: 'Amazon Macie classifying the data stored in the resources' }
    ],
    correct: ['A'],
    explanation: 'IAM Access Analyzer analyzes resource-based policies to identify access granted to external principals or the public, supports an organization zone of trust with a delegated administrator, and continuously surfaces new findings. Inspector scans vulnerabilities, Config rules are not the purpose-built external-access analyzer, and Macie classifies data.',
    reference: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html'
  },
  {
    id: 'dop-0112', domain: 6, type: 'single', numToSelect: 1,
    stem: 'An organization must guarantee that no S3 bucket in any member account can be made public through ACLs or bucket policies, that the control cannot be turned off by account administrators, and that it applies to new accounts automatically. Which combination meets this?',
    options: [
      { key: 'A', text: 'Enable account-level S3 Block Public Access in each account and add an SCP that denies disabling Block Public Access (for example s3:PutAccountPublicAccessBlock), applied organization-wide' },
      { key: 'B', text: 'Enable account-level S3 Block Public Access only, trusting administrators not to disable it' },
      { key: 'C', text: 'Create an AWS Config rule that detects public buckets and emails the team' },
      { key: 'D', text: 'Tag all buckets as private and rely on the tag to keep them private' }
    ],
    correct: ['A'],
    explanation: 'Account-level Block Public Access overrides ACLs and policies, and an SCP denying the action that disables it prevents administrators from turning it off, applied organization-wide including new accounts. Block Public Access alone can be disabled by an administrator, a Config rule only detects, and tags do not enforce access.',
    reference: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/access-control-block-public-access.html'
  },
  {
    id: 'dop-0113', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A private S3 bucket must be accessible only from a specific VPC, and the restriction must hold even for IAM principals that have broad S3 permissions granted elsewhere. Which configuration enforces VPC-only access?',
    options: [
      { key: 'A', text: 'Create an S3 gateway VPC endpoint and add a bucket policy with an explicit Deny when aws:SourceVpc does not equal the VPC ID' },
      { key: 'B', text: 'Add a bucket policy with a conditional Allow only for the VPC and rely on the default implicit deny' },
      { key: 'C', text: 'Attach a security group to the bucket that allows only the VPC CIDR range' },
      { key: 'D', text: 'Use a network ACL on the subnet to limit access to the bucket' }
    ],
    correct: ['A'],
    explanation: 'Only an explicit Deny when aws:SourceVpc does not match overrides any Allow from IAM or elsewhere, and an S3 gateway endpoint supplies the aws:SourceVpc context. A conditional Allow does not restrict other Allows, and security groups and network ACLs do not control access to S3.',
    reference: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/example-bucket-policies-vpc-endpoint.html'
  },
  {
    id: 'dop-0114', domain: 6, type: 'single', numToSelect: 1,
    stem: 'Auditors require cryptographic proof that delivered CloudTrail log files were not modified or deleted after delivery, and the ability to validate that independently later. Which approach provides this assurance?',
    options: [
      { key: 'A', text: 'Enable CloudTrail log file integrity validation, which produces signed digest files, and store the logs and digests in a versioned, Object Lock-protected S3 bucket' },
      { key: 'B', text: 'Enable S3 server access logging on the trail bucket' },
      { key: 'C', text: 'Encrypt the log files with SSE-KMS only' },
      { key: 'D', text: 'Send the logs to CloudWatch Logs and rely on the log group retention period' }
    ],
    correct: ['A'],
    explanation: 'CloudTrail log file integrity validation produces signed digest files you can validate independently to prove logs were not altered or deleted, and storing logs and digests with versioning and Object Lock further protects them. Access logging records requests, encryption provides confidentiality rather than tamper-evidence, and retention is not integrity validation.',
    reference: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-log-file-validation-intro.html'
  },
  {
    id: 'dop-0115', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A company must continuously discover and classify sensitive data (PII, credentials, financial data) stored across thousands of S3 buckets in many accounts, and report buckets that are unencrypted or publicly accessible, with the least custom development. Which service is purpose-built for this?',
    options: [
      { key: 'A', text: 'Amazon Macie with the organization integration, which discovers and classifies sensitive S3 data and reports bucket security posture' },
      { key: 'B', text: 'Amazon Inspector scanning the buckets for sensitive data' },
      { key: 'C', text: 'AWS Config rules that read object contents to find sensitive data' },
      { key: 'D', text: 'A custom Lambda fleet that downloads and scans every object with regular expressions' }
    ],
    correct: ['A'],
    explanation: 'Macie uses managed machine learning to discover and classify sensitive data in S3 across accounts and reports bucket encryption and public-access posture, with no custom development. Inspector scans vulnerabilities, Config evaluates configuration rather than object contents, and a custom Lambda fleet is heavy to build and operate.',
    reference: 'https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html'
  },
  {
    id: 'dop-0116', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A team needs continuous, automatic vulnerability assessment of EC2 instances, container images in Amazon ECR, and Lambda functions for known CVEs, prioritized by severity and sent to a central security view, without scheduling scans manually. Which service provides this?',
    options: [
      { key: 'A', text: 'Amazon Inspector, which continuously scans EC2, ECR images, and Lambda for CVEs and sends prioritized findings to Security Hub' },
      { key: 'B', text: 'Amazon Macie scanning the workloads for vulnerabilities' },
      { key: 'C', text: 'AWS Config rules evaluating installed package versions on each resource' },
      { key: 'D', text: 'A scheduled CodeBuild job that runs a scanner the team maintains for every resource type' }
    ],
    correct: ['A'],
    explanation: 'Amazon Inspector continuously and automatically scans EC2, ECR container images, and Lambda functions for known CVEs, prioritizes by severity, and integrates with Security Hub. Macie classifies sensitive data, AWS Config evaluates configuration rather than CVEs, and a custom CodeBuild scanner is not a managed continuous vulnerability service.',
    reference: 'https://docs.aws.amazon.com/inspector/latest/user/what-is-inspector.html'
  },
  {
    id: 'dop-0117', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A central compliance team needs one view of AWS Config rule compliance and resource configurations from every account and Region in the Organization, updated as new accounts join, without logging into each account. Which feature provides this?',
    options: [
      { key: 'A', text: 'An AWS Config aggregator authorized for the Organization, collecting configuration and compliance data from all accounts and Regions into one account' },
      { key: 'B', text: 'Enabling AWS Config in each account and reviewing each account console separately' },
      { key: 'C', text: 'A CloudWatch cross-account dashboard of AWS Config metrics' },
      { key: 'D', text: 'An S3 bucket where each account delivers its Config snapshots, queried manually' }
    ],
    correct: ['A'],
    explanation: 'An organization Config aggregator collects configuration and compliance data across all accounts and Regions into a single view and includes new accounts automatically. Per-account review is manual, a metrics dashboard is not the aggregated compliance data, and manually querying delivered snapshots is custom.',
    reference: 'https://docs.aws.amazon.com/config/latest/developerguide/aggregate-data.html'
  },
  {
    id: 'dop-0118', domain: 6, type: 'multi', numToSelect: 2,
    stem: 'A platform team must enforce least privilege at scale: cap the maximum permissions available to every account in the Organization, and ensure that roles application teams create can never exceed an approved permission set. Which TWO controls map to these two needs?',
    options: [
      { key: 'A', text: 'Service Control Policies attached to OUs to cap the maximum permissions for accounts in the Organization' },
      { key: 'B', text: 'Required IAM permissions boundaries on the roles application teams are allowed to create, capping those roles effective permissions' },
      { key: 'C', text: 'Resource-based policies on every S3 bucket as the primary least-privilege control' },
      { key: 'D', text: 'An IAM group with an administrator policy shared by all teams' },
      { key: 'E', text: 'Access keys rotated weekly for all principals' }
    ],
    correct: ['A', 'B'],
    explanation: 'SCPs cap what an entire account or OU can do, and permissions boundaries cap what a created identity can do, together enforcing least privilege at scale. Resource-based policies are per-resource, a shared administrator group grants broad access, and key rotation does not constrain permissions.',
    reference: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html'
  },
  {
    id: 'dop-0119', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A workload in account A must call services in account B continuously, following best practice by using only short-lived credentials and letting account B revoke or change the access centrally. Which mechanism should be used?',
    options: [
      { key: 'A', text: 'Create an IAM role in account B that trusts account A, and have the account A workload assume it with sts:AssumeRole to obtain temporary credentials' },
      { key: 'B', text: 'Create an IAM user in account B and store its long-term access keys in the account A workload' },
      { key: 'C', text: 'Share the account B root user credentials with the account A workload' },
      { key: 'D', text: 'Make the account B resources public so account A can use them without credentials' }
    ],
    correct: ['A'],
    explanation: 'A cross-account role that account B owns and account A assumes issues short-lived credentials and lets account B revoke or change the trust centrally, following best practice. Long-term user keys, root credentials, and public resources are insecure.',
    reference: 'https://docs.aws.amazon.com/IAM/latest/UserGuide/tutorial_cross-account-with-roles.html'
  },
  {
    id: 'dop-0120', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A public web application behind an Application Load Balancer needs TLS certificates that are issued, deployed, and automatically renewed before expiry, with no manual rotation, no risk of an expired-certificate outage, and no additional certificate cost. Which approach fits?',
    options: [
      { key: 'A', text: 'Use AWS Certificate Manager to provision public certificates and attach them to the ALB; ACM renews them automatically before expiry' },
      { key: 'B', text: 'Buy certificates from a third party, upload them to the ALB, and renew them manually each year' },
      { key: 'C', text: 'Generate self-signed certificates and install them on the ALB' },
      { key: 'D', text: 'Terminate TLS on the EC2 instances using certificates baked into the AMI' }
    ],
    correct: ['A'],
    explanation: 'ACM provisions public certificates at no additional certificate cost, attaches them to the ALB, and automatically renews them before expiry, removing manual rotation and expiry outages. Third-party uploads require manual renewal, self-signed certificates are untrusted by browsers, and AMI-baked certificates require manual rotation and rebuilds.',
    reference: 'https://docs.aws.amazon.com/acm/latest/userguide/acm-overview.html'
  },
  {
    id: 'dop-0121', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A public web application behind CloudFront and an ALB is receiving SQL injection and cross-site scripting attempts and credential-stuffing bursts from specific IP ranges. The team wants to filter these Layer 7 attacks using managed rules and rate limiting, with minimal custom code. Which service should they add?',
    options: [
      { key: 'A', text: 'AWS WAF with AWS Managed Rules (including SQL injection and XSS rule groups) and a rate-based rule, associated with the CloudFront distribution or the ALB' },
      { key: 'B', text: 'AWS Shield Standard, which already blocks application-layer SQL injection and XSS' },
      { key: 'C', text: 'Security group rules that block the malicious request patterns' },
      { key: 'D', text: 'Network ACLs that inspect the HTTP request bodies' }
    ],
    correct: ['A'],
    explanation: 'AWS WAF inspects and filters Layer 7 HTTP requests using managed rule groups (SQL injection, XSS) and rate-based rules and attaches to CloudFront or the ALB, with minimal custom code. Shield Standard addresses DDoS, and security groups and network ACLs operate at the network and transport layers and cannot inspect HTTP content.',
    reference: 'https://docs.aws.amazon.com/waf/latest/developerguide/waf-chapter.html'
  },
  {
    id: 'dop-0122', domain: 6, type: 'single', numToSelect: 1,
    stem: 'An organization must standardize required tag keys and allowed values across all accounts, report resources that do not comply with the standard, and prevent noncompliant tag values on supported resources. Which Organizations feature provides this governance?',
    options: [
      { key: 'A', text: 'Tag policies in AWS Organizations, which define standardized tag keys and values, report noncompliance, and can enforce compliant values on supported resources' },
      { key: 'B', text: 'An AWS Config rule that emails when tags are missing, with no central organization standard' },
      { key: 'C', text: 'A Lambda function triggered on resource creation that overwrites tags' },
      { key: 'D', text: 'A spreadsheet of required tags shared with account owners' }
    ],
    correct: ['A'],
    explanation: 'Tag policies define standardized tag keys and allowed values across the Organization, report noncompliant resources, and can enforce compliant tagging on supported resources. A Config rule is detective and not the organization tag standard, a custom Lambda is partial, and a spreadsheet is manual.',
    reference: 'https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_tag-policies.html'
  },
  {
    id: 'dop-0123', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A security team must be alerted in near real time, organization-wide, whenever the root user of any account signs in or performs an action, and route the alert to an incident channel. Which design accomplishes this with the least custom code?',
    options: [
      { key: 'A', text: 'Use an organization CloudTrail and, in a delegated security account, an EventBridge rule that matches root-user events and targets an SNS topic that notifies the incident channel' },
      { key: 'B', text: 'In each account, manually review CloudTrail Event history every week for root usage' },
      { key: 'C', text: 'Disable the root user in every account so the event cannot occur' },
      { key: 'D', text: 'Create a per-account CloudWatch dashboard that charts sign-in counts' }
    ],
    correct: ['A'],
    explanation: 'An organization CloudTrail plus an EventBridge rule matching root-user events in a delegated security account can notify an incident channel via SNS in near real time, organization-wide, with no custom code. Weekly manual review is not timely, the root user cannot be disabled, and a dashboard does not alert.',
    reference: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudwatch-alarms-for-cloudtrail.html'
  },
  {
    id: 'dop-0124', domain: 6, type: 'multi', numToSelect: 2,
    stem: 'Database credentials must be rotated automatically on a schedule and encrypted at rest with a specific compliance-approved customer-managed KMS key, and an application running on Amazon ECS must retrieve them at runtime. Which TWO configuration steps meet the requirements?',
    options: [
      { key: 'A', text: 'Store the credentials in AWS Secrets Manager and enable scheduled rotation with the database rotation function' },
      { key: 'B', text: 'Configure the secret to use the approved customer-managed KMS key and grant the ECS task role both secretsmanager:GetSecretValue and kms:Decrypt on that key' },
      { key: 'C', text: 'Store the credentials in Parameter Store as a String parameter and rotate them with a custom cron job' },
      { key: 'D', text: 'Use the default Secrets Manager AWS managed key to avoid managing a key' },
      { key: 'E', text: 'Embed the credentials in the ECS task definition environment variables for fast access' }
    ],
    correct: ['A', 'B'],
    explanation: 'Secrets Manager provides scheduled rotation via the database rotation function, and configuring the secret to use the approved customer-managed KMS key with the task role granted GetSecretValue and kms:Decrypt satisfies the encryption and runtime-retrieval requirements. A Parameter Store String has no native rotation or encryption, the default managed key does not meet the customer-managed-key requirement, and task-definition environment variables are insecure and unrotated.',
    reference: 'https://docs.aws.amazon.com/secretsmanager/latest/userguide/intro.html'
  },

  // ============================ Validated research batch (2026-06-20) ============================
  // Original scenarios derived from the current DOP-C02 blueprint and official sample-question themes.
  // ---- Domain 1: SDLC Automation ----
  {
    id: 'dop-0125', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A production pipeline receives several commits while a long deployment is running. Every commit must be deployed exactly once and in arrival order; newer executions must never overtake older ones. Which CodePipeline configuration meets the requirement?',
    options: [
      { key: 'A', text: 'Use a V2 pipeline with QUEUED execution mode' },
      { key: 'B', text: 'Use the default SUPERSEDED execution mode' },
      { key: 'C', text: 'Use PARALLEL execution mode and enable stage rollback' },
      { key: 'D', text: 'Create an EventBridge rule that cancels every older execution' }
    ],
    correct: ['A'],
    explanation: 'QUEUED mode processes executions one at a time in the order they reach each locked stage and requires a V2 pipeline. SUPERSEDED allows newer executions to overtake older ones. PARALLEL runs independently and does not support stage rollback.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/concepts-how-it-works.html'
  },
  {
    id: 'dop-0126', domain: 1, type: 'multi', numToSelect: 3,
    stem: 'A platform team must produce hardened AMIs every week, run automated component tests, and make approved images available in two Regions and several accounts. Which THREE EC2 Image Builder elements implement this?',
    options: [
      { key: 'A', text: 'An image recipe and components that install the hardening configuration' },
      { key: 'B', text: 'Build and test workflows in a scheduled image pipeline' },
      { key: 'C', text: 'Distribution settings for the destination Regions and accounts' },
      { key: 'D', text: 'A manual AMI copy performed by each application team' },
      { key: 'E', text: 'An EC2 user data script that mutates every instance after launch instead of baking an image' }
    ],
    correct: ['A', 'B', 'C'],
    explanation: 'Image Builder recipes/components define the image, pipeline workflows build and test it on a schedule, and distribution settings copy or share the resulting AMI to target Regions and accounts. Manual copies and post-launch mutation do not provide a centrally tested immutable artifact pipeline.',
    reference: 'https://docs.aws.amazon.com/imagebuilder/latest/userguide/ami-image-pipelines.html'
  },
  {
    id: 'dop-0127', domain: 1, type: 'multi', numToSelect: 3,
    stem: 'An EC2 application needs a manually controlled blue/green release that shifts traffic gradually while both environments use the same unchanged database schema. Which THREE actions meet the requirement?',
    options: [
      { key: 'A', text: 'Create a green Auto Scaling group behind a separate Application Load Balancer' },
      { key: 'B', text: 'Create weighted Route 53 alias records for the blue and green load balancers' },
      { key: 'C', text: 'Configure both application environments to use the same RDS primary endpoint' },
      { key: 'D', text: 'Send the green environment to the unreadable Multi-AZ standby instance' },
      { key: 'E', text: 'Use Route 53 failover routing to shift 10% increments' }
    ],
    correct: ['A', 'B', 'C'],
    explanation: 'Separate load balancers provide two routable environments, weighted aliases support gradual traffic shifts, and a shared primary database keeps writes consistent when no schema split is required. An RDS Multi-AZ standby is not a read/write endpoint, and failover routing is active/passive rather than percentage-based.',
    reference: 'https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy-weighted.html'
  },
  {
    id: 'dop-0128', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A legacy API and five replacement Lambda handlers must be canary-tested through the existing Application Load Balancer. Each handler owns a different URL path, only a small share of requests should reach Lambda, and the existing ALB access-log format must remain unchanged. What should the engineer do?',
    options: [
      { key: 'A', text: 'Create one Lambda target group per function and path-based listener rules that forward with weights between each Lambda target group and the existing instance target group' },
      { key: 'B', text: 'Register all five Lambda functions in one target group and weight individual functions' },
      { key: 'C', text: 'Create a second ALB and use weighted Route 53 records' },
      { key: 'D', text: 'Put the Lambda functions behind API Gateway and replace the public DNS record immediately' }
    ],
    correct: ['A'],
    explanation: 'An ALB Lambda target group can register one function. Path rules can use weighted forwarding between the existing instance target group and the Lambda target group for that endpoint. Reusing the ALB preserves its access-log stream; a second ALB would create a different load balancer ID and log stream.',
    reference: 'https://docs.aws.amazon.com/elasticloadbalancing/latest/application/lambda-functions.html'
  },
  {
    id: 'dop-0129', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A production deployment action succeeds, but the pipeline must observe a bake period and roll the stage back to its previous successful execution if a CloudWatch 5xx alarm enters ALARM. What should be configured?',
    options: [
      { key: 'A', text: 'Add an On Success stage condition with a CloudWatchAlarm rule and a Rollback result' },
      { key: 'B', text: 'Add an Entry condition with a Skip result after the deployment has completed' },
      { key: 'C', text: 'Run the pipeline in PARALLEL mode and rely on automatic stage rollback' },
      { key: 'D', text: 'Add a manual approval action that automatically evaluates the alarm' }
    ],
    correct: ['A'],
    explanation: 'An On Success condition is evaluated after the stage succeeds and can use a CloudWatch alarm rule with Rollback as the result, covering a post-deployment bake period. Entry conditions run before a stage, manual approvals do not evaluate alarms automatically, and PARALLEL mode does not support stage rollback.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/stage-conditions.html'
  },

  // ---- Domain 2: Configuration Management & IaC ----
  {
    id: 'dop-0130', domain: 2, type: 'multi', numToSelect: 2,
    stem: 'A company must vend governed AWS accounts to teams and automatically deploy a logging and security baseline whenever an account joins a targeted OU. Which TWO services or features provide the native control plane?',
    options: [
      { key: 'A', text: 'AWS Control Tower Account Factory for governed account provisioning' },
      { key: 'B', text: 'CloudFormation StackSets with service-managed permissions and automatic OU deployment' },
      { key: 'C', text: 'Manual root-user setup in every new account' },
      { key: 'D', text: 'VPC peering from the management account to every member account' },
      { key: 'E', text: 'Cross-account CloudFormation exports with Fn::ImportValue' }
    ],
    correct: ['A', 'B'],
    explanation: 'Control Tower Account Factory standardizes governed account creation. Service-managed StackSets can target OUs and automatically create stack instances as accounts join. Manual setup, peering, and cross-account exports do not provide account vending plus lifecycle deployment.',
    reference: 'https://docs.aws.amazon.com/controltower/latest/userguide/account-factory.html'
  },
  {
    id: 'dop-0131', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A CloudFormation template must pass a database password to an RDS resource without storing the plaintext value in the template or resolving it before deployment. Which mechanism should be used?',
    options: [
      { key: 'A', text: 'A Secrets Manager dynamic reference in the resource property' },
      { key: 'B', text: 'A plaintext parameter with the password committed to source control' },
      { key: 'C', text: 'A Mappings section containing environment passwords' },
      { key: 'D', text: 'A stack output that exports the plaintext password' }
    ],
    correct: ['A'],
    explanation: 'A Secrets Manager dynamic reference lets CloudFormation retrieve the secret only when provisioning the resource and avoids embedding the resolved value in the template. Plaintext parameters, mappings, and outputs expose the credential.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/dynamic-references.html'
  },
  {
    id: 'dop-0132', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A security team needs one patch configuration for selected OUs across multiple accounts and Regions, with separate scan and install schedules and centralized compliance. What is the recommended Systems Manager approach?',
    options: [
      { key: 'A', text: 'Create a Patch Manager patch policy in Systems Manager Quick Setup and target the OUs and Regions' },
      { key: 'B', text: 'Create an independent crontab on every EC2 instance' },
      { key: 'C', text: 'Use a Quick Setup Host Management configuration, which installs all missing patches' },
      { key: 'D', text: 'Run CodeBuild over SSH against every instance' }
    ],
    correct: ['A'],
    explanation: 'A Quick Setup patch policy is the recommended organization-scale method and supports target OUs, Regions, baselines, scan schedules, install schedules, and compliance. Host Management Quick Setup can scan but does not install patches; cron and SSH do not provide reliable centralized governance.',
    reference: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/quick-setup-patch-manager.html'
  },
  {
    id: 'dop-0133', domain: 2, type: 'multi', numToSelect: 3,
    stem: 'A production feature flag must be syntactically validated, deployed gradually, and rolled back automatically if application errors rise. Which THREE AWS AppConfig controls meet the requirements?',
    options: [
      { key: 'A', text: 'Attach a JSON Schema or Lambda validator to the configuration profile' },
      { key: 'B', text: 'Use a canary or linear deployment strategy with a bake time' },
      { key: 'C', text: 'Associate a CloudWatch alarm and the IAM role AppConfig uses to monitor it' },
      { key: 'D', text: 'Deploy the value directly as an unvalidated Lambda environment variable' },
      { key: 'E', text: 'Disable alarm actions during the deployment' }
    ],
    correct: ['A', 'B', 'C'],
    explanation: 'Validators reject malformed configuration before deployment. A canary or linear strategy limits initial exposure and includes monitoring time. AppConfig can monitor associated CloudWatch alarms and automatically roll back; disabled alarm actions prevent that rollback behavior.',
    reference: 'https://docs.aws.amazon.com/appconfig/latest/userguide/monitoring-deployments.html'
  },

  // ---- Domain 3: Resilient Cloud Solutions ----
  {
    id: 'dop-0134', domain: 3, type: 'multi', numToSelect: 2,
    stem: 'An S3 bucket already contains 40 million objects. The company now enables Cross-Region Replication and requires both the existing objects and all future writes to appear in the destination bucket. Which TWO actions are required?',
    options: [
      { key: 'A', text: 'Configure live Cross-Region Replication for new and updated objects' },
      { key: 'B', text: 'Run an S3 Batch Replication job for objects that predate the replication rule' },
      { key: 'C', text: 'Wait for live replication to copy the existing objects automatically' },
      { key: 'D', text: 'Use an S3 lifecycle transition to copy the objects to another Region' },
      { key: 'E', text: 'Enable Transfer Acceleration on the destination bucket' }
    ],
    correct: ['A', 'B'],
    explanation: 'Live replication applies to eligible new or updated objects after the rule is configured. It is not retroactive, so S3 Batch Replication is required for preexisting objects. Lifecycle transitions change storage class; Transfer Acceleration does not replicate data.',
    reference: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html'
  },
  {
    id: 'dop-0135', domain: 3, type: 'multi', numToSelect: 3,
    stem: 'A static application must use one public hostname, serve from regional S3 origins, and fail over without custom edge code. Which THREE components provide the most operationally efficient design?',
    options: [
      { key: 'A', text: 'CloudFormation StackSets to deploy the regional S3 infrastructure consistently' },
      { key: 'B', text: 'S3 replication to keep the regional origins populated' },
      { key: 'C', text: 'A CloudFront distribution with an origin group, plus a Route 53 alias to the distribution' },
      { key: 'D', text: 'A Lambda@Edge function that reimplements origin health checks and routing' },
      { key: 'E', text: 'Separate simple Route 53 records that expose each bucket hostname directly' }
    ],
    correct: ['A', 'B', 'C'],
    explanation: 'StackSets standardizes multi-Region infrastructure, S3 replication maintains regional copies, and CloudFront origin groups provide native origin failover behind one distribution. Route 53 aliases the friendly name to that distribution. Custom edge routing is unnecessary.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/high_availability_origin_failover.html'
  },
  {
    id: 'dop-0136', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A team will run an AWS Fault Injection Service experiment against production. The experiment must stop immediately if checkout error rate exceeds the approved steady-state threshold. What should be configured in the experiment template?',
    options: [
      { key: 'A', text: 'A stop condition that references a CloudWatch alarm on checkout error rate' },
      { key: 'B', text: 'An SNS subscription with no CloudWatch alarm' },
      { key: 'C', text: 'A CloudFormation deletion policy' },
      { key: 'D', text: 'An EventBridge archive replay' }
    ],
    correct: ['A'],
    explanation: 'FIS stop conditions reference CloudWatch alarms. If the alarm enters ALARM during the experiment, FIS stops the experiment and it cannot be resumed. Notifications alone and unrelated CloudFormation or EventBridge features do not enforce the safety threshold.',
    reference: 'https://docs.aws.amazon.com/fis/latest/userguide/stop-conditions.html'
  },
  {
    id: 'dop-0137', domain: 3, type: 'multi', numToSelect: 2,
    stem: 'An SQS consumer occasionally receives poison messages, and normal messages can be delivered more than once. Which TWO design choices make the workload resilient?',
    options: [
      { key: 'A', text: 'Configure a redrive policy to move repeatedly failing messages to a dead-letter queue' },
      { key: 'B', text: 'Make message processing idempotent so duplicate delivery does not corrupt state' },
      { key: 'C', text: 'Set the visibility timeout to zero for all messages' },
      { key: 'D', text: 'Delete each message before processing begins' },
      { key: 'E', text: 'Replace the queue with a periodic EC2 polling script and no retry controls' }
    ],
    correct: ['A', 'B'],
    explanation: 'A DLQ isolates messages that exceed the maximum receive count, while idempotency handles SQS at-least-once delivery safely. Zero visibility and preemptive deletion increase duplication or data loss.',
    reference: 'https://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSDeveloperGuide/sqs-dead-letter-queues.html'
  },

  // ---- Domain 4: Monitoring & Logging ----
  {
    id: 'dop-0138', domain: 4, type: 'multi', numToSelect: 2,
    stem: 'A monitoring account must query metrics, logs, and traces from dozens of source accounts in the same Region without copying all telemetry into custom buckets. Which TWO CloudWatch cross-account observability resources are required?',
    options: [
      { key: 'A', text: 'An observability access manager sink in the monitoring account' },
      { key: 'B', text: 'A link from each source account to the monitoring account sink' },
      { key: 'C', text: 'A VPC peering connection for every account pair' },
      { key: 'D', text: 'An organization trail that converts metrics into CloudTrail events' },
      { key: 'E', text: 'Public read access to every log group' }
    ],
    correct: ['A', 'B'],
    explanation: 'CloudWatch cross-account observability uses an OAM sink in the monitoring account and links from source accounts. It shares supported telemetry through the service control plane; VPC peering, CloudTrail conversion, and public logs are unnecessary or insecure.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html'
  },
  {
    id: 'dop-0139', domain: 4, type: 'multi', numToSelect: 2,
    stem: 'A closed-source service on one EC2 instance leaks memory and must be restarted before memory utilization reaches 90%. The CloudWatch agent already publishes memory utilization as a metric. Which TWO actions provide the most operationally efficient automatic recovery?',
    options: [
      { key: 'A', text: 'Create a CloudWatch alarm directly on the agent-published memory metric and notify an SNS topic' },
      { key: 'B', text: 'Subscribe a Lambda function that starts an SSM Run Command restart document to the SNS topic' },
      { key: 'C', text: 'Create a log metric filter for a metric that already exists' },
      { key: 'D', text: 'Subscribe the EC2 instance itself directly to the SNS topic' },
      { key: 'E', text: 'Use an EventBridge scheduled rule to check memory once per day' }
    ],
    correct: ['A', 'B'],
    explanation: 'The agent already publishes a CloudWatch metric, so the alarm can use it directly. SNS can invoke Lambda, and Lambda can call Systems Manager Run Command to restart the service without SSH. A duplicate metric filter is unnecessary, and EC2 instances are not SNS subscribers.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/Install-CloudWatch-Agent.html'
  },
  {
    id: 'dop-0140', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A company must continuously stream selected CloudWatch metrics to a third-party observability platform through Amazon Data Firehose with low latency and no polling. Which feature should it configure?',
    options: [
      { key: 'A', text: 'A CloudWatch metric stream with the Firehose delivery stream as the destination' },
      { key: 'B', text: 'A CloudWatch dashboard exported once per day' },
      { key: 'C', text: 'A CloudTrail trail for metric datapoints' },
      { key: 'D', text: 'A Logs Insights scheduled query against every metric namespace' }
    ],
    correct: ['A'],
    explanation: 'CloudWatch metric streams continuously deliver selected metrics to Amazon Data Firehose and supported partner destinations. Dashboards and CloudTrail do not export metric datapoints, and Logs Insights queries logs rather than metric namespaces.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Metric-Streams.html'
  },
  {
    id: 'dop-0141', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A distributed application emits X-Ray traces. The team needs to search traces for a tenant identifier and error category without creating a separate segment for each value. How should the application record these searchable values?',
    options: [
      { key: 'A', text: 'Add them as indexed X-Ray annotations and query them with filter expressions' },
      { key: 'B', text: 'Add them only as unindexed metadata and expect annotation queries to find them' },
      { key: 'C', text: 'Store them as CloudFormation stack outputs' },
      { key: 'D', text: 'Encode them in the X-Ray sampling percentage' }
    ],
    correct: ['A'],
    explanation: 'X-Ray annotations are indexed key-value fields that can be used in filter expressions. Metadata can hold additional context but is not indexed for trace filtering. Stack outputs and sampling rates do not classify traces.',
    reference: 'https://docs.aws.amazon.com/xray/latest/devguide/xray-concepts.html'
  },

  // ---- Domain 5: Incident & Event Response ----
  {
    id: 'dop-0142', domain: 5, type: 'single', numToSelect: 1,
    stem: 'An S3 bucket currently invokes a Lambda function for every object created under logs/. A new SQS-based consumer needs the same events, and the Lambda code must not change. What is the cleanest fanout design?',
    options: [
      { key: 'A', text: 'Send the S3 event notification to an SNS topic and subscribe both the Lambda function and SQS queue' },
      { key: 'B', text: 'Create a second overlapping S3 notification with the same prefix and event type' },
      { key: 'C', text: 'Send the S3 notification directly to a Kinesis data stream' },
      { key: 'D', text: 'Subscribe the SQS queue directly to a CloudWatch Logs log group' }
    ],
    correct: ['A'],
    explanation: 'SNS provides native fanout to Lambda and SQS. Overlapping S3 notification filters for the same event can be rejected as ambiguous, Kinesis Data Streams is not a direct S3 event notification destination, and SQS cannot subscribe directly to a CloudWatch Logs group.',
    reference: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/notification-how-to-event-types-and-destinations.html'
  },
  {
    id: 'dop-0143', domain: 5, type: 'multi', numToSelect: 2,
    stem: 'GuardDuty is delegated to a central security account for an AWS Organization. High-severity IAM anomaly findings from any member account must invoke custom identity lookup and notification code. Which TWO actions implement this centrally?',
    options: [
      { key: 'A', text: 'Create an EventBridge rule in the delegated GuardDuty administrator account that matches the required findings' },
      { key: 'B', text: 'Target a Lambda function that reads the finding account and principal details, performs the lookup, and sends the notifications' },
      { key: 'C', text: 'Use Amazon Detective alone to generate and route GuardDuty findings' },
      { key: 'D', text: 'Create only an SNS content filter on the nested GuardDuty finding JSON' },
      { key: 'E', text: 'Deploy a polling EC2 instance in every member account' }
    ],
    correct: ['A', 'B'],
    explanation: 'Applicable member findings are available to EventBridge in the delegated administrator account. A rule can select the finding type or severity and invoke Lambda for arbitrary lookup and notification logic. Detective investigates findings; it does not replace GuardDuty detection and event routing.',
    reference: 'https://docs.aws.amazon.com/guardduty/latest/ug/guardduty_findings_eventbridge.html'
  },
  {
    id: 'dop-0144', domain: 5, type: 'multi', numToSelect: 2,
    stem: 'An EventBridge-based service needs two different recovery controls: retain target delivery failures after retries, and later replay every event from a chosen outage time window through the event bus. Which TWO features meet these separate needs?',
    options: [
      { key: 'A', text: 'Configure an SQS dead-letter queue on the target for exhausted delivery retries' },
      { key: 'B', text: 'Create an EventBridge archive and start a replay for the selected time window' },
      { key: 'C', text: 'Use the DLQ as an automatic full event-bus history archive' },
      { key: 'D', text: 'Use an archive to retry a single target delivery without sending events back to the source bus' },
      { key: 'E', text: 'Disable the target retry policy so failed events disappear sooner' }
    ],
    correct: ['A', 'B'],
    explanation: 'A target DLQ stores events that EventBridge could not deliver after retries. An archive retains matching bus events and replay sends a selected time range back to the source event bus. The two features solve different failure and historical-reprocessing requirements.',
    reference: 'https://docs.aws.amazon.com/eventbridge/latest/userguide/eb-archive.html'
  },
  {
    id: 'dop-0145', domain: 5, type: 'single', numToSelect: 1,
    stem: 'A CloudFormation update failed, and rollback is stuck in UPDATE_ROLLBACK_FAILED because a resource was changed outside CloudFormation. After correcting the underlying issue, what should the operator do?',
    options: [
      { key: 'A', text: 'Run ContinueUpdateRollback; specify the minimum ResourcesToSkip only if a failed rollback resource still cannot be restored, then reconcile it before the next update' },
      { key: 'B', text: 'Run UpdateStack again while the stack remains in UPDATE_ROLLBACK_FAILED' },
      { key: 'C', text: 'Delete the stack immediately, including all production resources' },
      { key: 'D', text: 'Mark every resource as skipped without investigating status reasons' }
    ],
    correct: ['A'],
    explanation: 'ContinueUpdateRollback returns the stack toward UPDATE_ROLLBACK_COMPLETE after the cause is fixed. ResourcesToSkip is a last resort for resources that failed during rollback; skipped resources become inconsistent with the template and must be reconciled before another update.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_ContinueUpdateRollback.html'
  },
  {
    id: 'dop-0146', domain: 5, type: 'single', numToSelect: 1,
    stem: 'An SSM Automation remediation will target 2,000 instances. The team wants a concurrency value of 5% of the fleet and an error-threshold value of 10. Which Automation controls should be set?',
    options: [
      { key: 'A', text: 'Set MaxConcurrency to 5% and MaxErrors to 10' },
      { key: 'B', text: 'Set the document timeout to 5% and the retry count to 2,000' },
      { key: 'C', text: 'Use a CloudWatch dashboard with no Automation rate controls' },
      { key: 'D', text: 'Start 2,000 independent automations simultaneously' }
    ],
    correct: ['A'],
    explanation: 'Automation rate controls use MaxConcurrency to limit parallel target execution and MaxErrors as the failure threshold for stopping new targets. In-flight child automations can make the final failure count exceed the threshold; use MaxConcurrency 1 if a hard maximum is required. Timeouts and dashboards are not rate controls.',
    reference: 'https://docs.aws.amazon.com/systems-manager/latest/userguide/running-automations-scale.html'
  },

  // ---- Domain 6: Security & Compliance ----
  {
    id: 'dop-0147', domain: 6, type: 'multi', numToSelect: 2,
    stem: 'A deployment role in account B must decrypt artifacts encrypted by a customer-managed KMS key in account A. Which TWO policy changes are required for cross-account KMS access?',
    options: [
      { key: 'A', text: 'Allow the account B role, or account B for delegation, in the KMS key policy in account A' },
      { key: 'B', text: 'Attach an IAM policy in account B that allows the role to call the required KMS actions on the key ARN' },
      { key: 'C', text: 'Use the AWS managed aws/s3 key because it can be shared across accounts by editing its key policy' },
      { key: 'D', text: 'Make the encrypted S3 objects public' },
      { key: 'E', text: 'Grant kms:Decrypt only in an SCP, which directly grants permissions' }
    ],
    correct: ['A', 'B'],
    explanation: 'Cross-account KMS use requires permission on both sides: the key policy in the owning account must permit the external principal or delegate to its account, and the external role needs an IAM allow. AWS managed key policies cannot be edited for this purpose, and SCPs limit permissions rather than grant them.',
    reference: 'https://docs.aws.amazon.com/kms/latest/developerguide/key-policy-modifying-external-accounts.html'
  },
  {
    id: 'dop-0148', domain: 6, type: 'multi', numToSelect: 2,
    stem: 'A company uses an external identity provider and wants automated workforce provisioning plus one centrally managed least-privilege access template assigned across many AWS accounts. Which TWO IAM Identity Center features meet the requirements?',
    options: [
      { key: 'A', text: 'SCIM provisioning from the external identity provider for users and groups' },
      { key: 'B', text: 'Permission sets assigned to groups across the required organization accounts' },
      { key: 'C', text: 'A shared IAM user and permanent access key in every account' },
      { key: 'D', text: 'Root-user federation through S3 bucket policies' },
      { key: 'E', text: 'An SCP as the sole mechanism for granting workforce permissions' }
    ],
    correct: ['A', 'B'],
    explanation: 'SCIM automates identity and group provisioning into IAM Identity Center. Permission sets are reusable policy templates that Identity Center provisions as controlled roles in assigned accounts. Shared users and root credentials are unsafe; SCPs define permission guardrails but do not grant access.',
    reference: 'https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html'
  },
  {
    id: 'dop-0149', domain: 6, type: 'multi', numToSelect: 2,
    stem: 'CloudTrail logs must be retained for seven years, protected from deletion even by administrators during the retention period, and verifiable for modification or deletion after delivery. Which TWO controls meet the requirements?',
    options: [
      { key: 'A', text: 'Store the logs in a versioned S3 bucket with Object Lock compliance-mode retention' },
      { key: 'B', text: 'Enable CloudTrail log file integrity validation and retain the signed digest files' },
      { key: 'C', text: 'Use Object Lock governance mode and give all administrators bypass permission' },
      { key: 'D', text: 'Disable S3 versioning after the first log arrives' },
      { key: 'E', text: 'Rely on CloudWatch dashboards as immutable evidence' }
    ],
    correct: ['A', 'B'],
    explanation: 'Object Lock compliance mode prevents protected object versions from being overwritten or deleted, including by the account root user, until retention expires. CloudTrail digest files provide cryptographic integrity validation. Governance mode can be bypassed by authorized principals.',
    reference: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lock.html'
  },
  {
    id: 'dop-0150', domain: 6, type: 'single', numToSelect: 1,
    stem: 'A new AWS customer starting after May 31, 2026 needs organization-wide CloudTrail event retention and SQL analysis. CloudTrail Lake is not available to new customers. Which supported design should the customer use?',
    options: [
      { key: 'A', text: 'Create a multi-Region organization trail to a centralized S3 bucket and query partitioned logs with Amazon Athena' },
      { key: 'B', text: 'Create a new CloudTrail Lake event data store despite the new-customer availability restriction' },
      { key: 'C', text: 'Use EventBridge without retaining the CloudTrail events' },
      { key: 'D', text: 'Rely only on the 90-day per-account Event history for long-term organization analytics' }
    ],
    correct: ['A'],
    explanation: 'For a new customer after the availability cutoff, an organization trail centralizes events from current and future accounts in S3. S3 lifecycle controls retention, and Athena provides SQL analysis. Event history is per-account and limited to 90 days; EventBridge is not a long-term audit store.',
    reference: 'https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-lake-availability-change.html'
  },
  {
    id: 'dop-0151', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A company runs a web application on Amazon EC2 instances behind an Application Load Balancer (ALB). The instances run in an Auto Scaling group across multiple Availability Zones. Security policy requires every newly launched instance to register with the company auditing service before it can process transactions. Which solution meets the requirements?',
    options: [
      { key: 'A', text: 'Add a launch lifecycle hook that puts new instances in Pending:Wait. Run a custom registration script, then complete the lifecycle action with CONTINUE on success or ABANDON on failure' },
      { key: 'B', text: 'Use an EC2 user data bootstrap script to register the instance and return an error code if registration fails, without a lifecycle hook' },
      { key: 'C', text: 'Run a scheduled EventBridge rule every 5 minutes that invokes Lambda to scan the Auto Scaling group and register newly launched instances' },
      { key: 'D', text: 'Use an EventBridge rule for EC2 launch events that invokes a Lambda function to register the instance, without a lifecycle hook' }
    ],
    correct: ['A'],
    explanation: 'A launch lifecycle hook pauses the instance in Pending:Wait before it reaches InService and begins receiving ALB traffic. The script calls CompleteLifecycleAction with CONTINUE only after successful audit registration; ABANDON causes Auto Scaling to terminate and replace a failed launch. User data or EventBridge alone can perform registration but does not provide the required lifecycle gate, and scheduled polling also adds delay.',
    reference: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html'
  },
  {
    id: 'dop-0152', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A company uses AWS Organizations and operates workloads in three Regions. A baseline SNS notification topic already exists in every member account. The operations team must be alerted when supported service quota usage exceeds 80% in every current and future account, with the least ongoing administration. Which solution meets the requirements?',
    options: [
      { key: 'A', text: 'Use a service-managed CloudFormation StackSet with automatic deployment to create regional CloudWatch alarms in each account. Use the usage metric divided by SERVICE_QUOTA(metric), set the threshold to 80%, and target the local SNS topic' },
      { key: 'B', text: 'Enable trusted access for Service Quotas and assume it automatically creates organization-wide usage alarms and notifications' },
      { key: 'C', text: 'Run one Trusted Advisor check weekly in the management account and use its status as the exact utilization percentage for every member account' },
      { key: 'D', text: 'Create one CloudWatch alarm in the management account without linking source accounts or deploying alarms to member accounts' }
    ],
    correct: ['A'],
    explanation: 'Quota usage metrics and alarms are account- and Region-scoped. A service-managed StackSet can deploy the same alarm resources across organization accounts and Regions and automatically include new accounts. CloudWatch supports the m1/SERVICE_QUOTA(m1)*100 expression and SNS alarm notifications. Service Quotas trusted access supports quota request templates; it does not itself create centralized alarms.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Quotas-Visualize-Alarms.html'
  },
  {
    id: 'dop-0153', domain: 2, type: 'multi', numToSelect: 2,
    stem: 'Resources in a CloudFormation stack were manually changed after deployment. The company wants CloudFormation to detect changes to optional properties that currently use service defaults and to restore the approved template automatically. Which TWO changes are required?',
    options: [
      { key: 'A', text: 'Explicitly declare the approved values for the tracked properties in the template, including values equal to service defaults' },
      { key: 'B', text: 'Use the cloudformation-stack-drift-detection-check AWS Config rule and associate a Systems Manager Automation remediation that updates the stack from the approved template' },
      { key: 'C', text: 'Leave optional properties absent because CloudFormation always tracks service defaults that are not in the template' },
      { key: 'D', text: 'Use CloudTrail data events as the only source of CloudFormation drift status' },
      { key: 'E', text: 'Replace the stack with an AWS Config aggregator, which directly changes resource properties' }
    ],
    correct: ['A', 'B'],
    explanation: 'CloudFormation drift detection compares actual values only with properties explicitly represented in the template or parameters, so default-valued properties must be declared. The managed Config rule can initiate drift checks, and Config remediation can invoke Systems Manager Automation to update the stack from the approved template.',
    reference: 'https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-stack-drift.html'
  },
  {
    id: 'dop-0154', domain: 2, type: 'single', numToSelect: 1,
    stem: 'A serverless application contains API Gateway, Lambda, DynamoDB, and an ElastiCache replication group used for session data. The team wants one infrastructure-as-code deployment with the fewest custom components. What should it do?',
    options: [
      { key: 'A', text: 'Define the serverless resources with AWS SAM resource types and the ElastiCache replication group with its standard CloudFormation resource type in one SAM template' },
      { key: 'B', text: 'Use a SAM template only for Lambda and create every other resource through Lambda-backed custom resources' },
      { key: 'C', text: 'Deploy ElastiCache manually because SAM templates cannot contain standard CloudFormation resources' },
      { key: 'D', text: 'Maintain separate templates because a stack cannot reference both serverless and non-serverless resources' }
    ],
    correct: ['A'],
    explanation: 'A SAM template is an extension of CloudFormation and its Resources section can contain a combination of AWS::Serverless resources and standard CloudFormation resources. Therefore one template can use SAM shorthand for the API and functions while declaring DynamoDB and ElastiCache resources directly.',
    reference: 'https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/authoring-define-resources.html'
  },
  {
    id: 'dop-0155', domain: 5, type: 'single', numToSelect: 1,
    stem: 'An operations team needs an email alert whenever an Amazon ECS task stops because an essential container exits. An SNS topic and email subscription already exist. Which solution requires the least development effort?',
    options: [
      { key: 'A', text: 'Create an EventBridge rule for ECS Task State Change events with lastStatus STOPPED and stoppedReason "Essential container in task exited"; set the SNS topic as the target' },
      { key: 'B', text: 'Poll DescribeTasks from a scheduled Lambda function and publish matching results to SNS' },
      { key: 'C', text: 'Add an SNS destination property to each essential container in the ECS task definition' },
      { key: 'D', text: 'Configure the ECS cluster to send all container stdout directly to the email endpoint' }
    ],
    correct: ['A'],
    explanation: 'ECS emits task state change events to EventBridge. A rule can match STOPPED tasks with the exact essential-container stopped reason and publish directly to SNS, eliminating polling code. ECS task definitions do not provide a direct SNS notification property.',
    reference: 'https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs_cwet2.html'
  },
  {
    id: 'dop-0156', domain: 6, type: 'single', numToSelect: 1,
    stem: 'Developers can launch EC2 instances directly, but security policy permits only a Region-specific list of hardened AMIs. The company must discover and terminate running instances that use any other AMI. Which solution is the most operationally efficient?',
    options: [
      { key: 'A', text: 'Deploy the approved-amis-by-id AWS Config managed rule with the approved IDs and configure automatic remediation through the AWS-TerminateEC2Instance Systems Manager Automation runbook' },
      { key: 'B', text: 'Publish approved AMIs in Service Catalog but continue allowing unrestricted direct RunInstances calls' },
      { key: 'C', text: 'Attach an SCP to an IAM group and use it to terminate existing noncompliant instances' },
      { key: 'D', text: 'Send a weekly inventory email and ask each developer to terminate noncompliant instances manually' }
    ],
    correct: ['A'],
    explanation: 'The approved-amis-by-id managed rule marks running EC2 instances that use other AMIs as NON_COMPLIANT. AWS Config automatic remediation invokes Systems Manager Automation, and AWS-TerminateEC2Instance performs the required termination. Service Catalog alone does not detect bypasses, SCPs attach to organization entities rather than IAM groups, and SCPs do not remediate existing resources.',
    reference: 'https://docs.aws.amazon.com/config/latest/developerguide/approved-amis-by-id.html'
  },
  {
    id: 'dop-0157', domain: 6, type: 'multi', numToSelect: 2,
    stem: 'Applications and console users upload documents to an S3 bucket. A web application marks documents that must be retained by setting the object tag Retain=true. All other documents must expire after 90 days, including uploads that arrive without tags. Which TWO actions meet the requirements?',
    options: [
      { key: 'A', text: 'Invoke a Lambda function from S3 ObjectCreated events to add Retain=false when the Retain tag is absent' },
      { key: 'B', text: 'Create an S3 Lifecycle expiration rule for objects tagged Retain=false with an age of 90 days' },
      { key: 'C', text: 'Create an unfiltered 90-day expiration rule for the entire bucket' },
      { key: 'D', text: 'Deny DeleteObject when Retain=true and expect that policy condition alone to select lifecycle candidates' },
      { key: 'E', text: 'Use an S3 Inventory report once per year as the deletion mechanism' }
    ],
    correct: ['A', 'B'],
    explanation: 'The creation event handles upload clients that omit tags by assigning an explicit non-retained state. An S3 Lifecycle rule can filter on an object tag and expire only Retain=false objects after 90 days. An unfiltered rule would include retained documents, and a bucket-policy deny is not a lifecycle selector.',
    reference: 'https://docs.aws.amazon.com/AmazonS3/latest/userguide/intro-lifecycle-rules.html'
  },
  {
    id: 'dop-0158', domain: 6, type: 'single', numToSelect: 1,
    stem: 'An organization requires continuous detection and automatic correction of public-read or public-write access granted through S3 bucket policies, bucket ACLs, or Block Public Access settings in all accounts and Regions. New accounts must inherit the controls. Which solution best meets the requirement?',
    options: [
      { key: 'A', text: 'In every required Region, deploy an organization AWS Config conformance pack containing the S3 public-access managed rules and Systems Manager Automation remediations that configure Block Public Access or remove public grants' },
      { key: 'B', text: 'Create an organization CloudTrail trail and expect EventBridge in one security account to consume API events from the trail S3 bucket automatically' },
      { key: 'C', text: 'Enable S3 data events on each bucket and use them to detect every future bucket-policy change across accounts' },
      { key: 'D', text: 'Create EventBridge global endpoints because they replicate all events between accounts and Regions' }
    ],
    correct: ['A'],
    explanation: 'An organization conformance pack deploys Config rules and remediation actions across AWS Organizations and is deployed in each required Region. The S3 public-access rules evaluate bucket policies, bucket ACLs, and Block Public Access settings; Systems Manager Automation can correct noncompliant buckets. Trail files do not automatically become cross-account EventBridge events, S3 data events are object operations, and global endpoints provide Regional failover rather than organization event replication.',
    reference: 'https://docs.aws.amazon.com/config/latest/developerguide/conformance-packs.html'
  },
  {
    id: 'dop-0159', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A REST API currently sends {"text":"..."} to a Lambda function. A new Lambda release requires both text and locale, but existing clients cannot all migrate immediately. The company wants only one production Lambda implementation while offering a new API contract. Which deployment approach meets the requirements?',
    options: [
      { key: 'A', text: 'Deploy the new Lambda version, point both API versions to it, and add an integration request mapping template to the legacy API that supplies a default locale; let the new API pass the client locale' },
      { key: 'B', text: 'Keep the old Lambda function for the legacy API and deploy a separate production function for the new API indefinitely' },
      { key: 'C', text: 'Point the legacy API directly to the new function without transforming requests and require all clients to change immediately' },
      { key: 'D', text: 'Add the default locale mapping only to the new API while leaving the old API connected to the old function' }
    ],
    correct: ['A'],
    explanation: 'API Gateway integration request mapping templates can transform the legacy request into the new backend schema. Both API contracts can therefore invoke the same production Lambda implementation, while old clients receive a defined default and new clients choose a locale.',
    reference: 'https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-swagger-extensions-integration-requestTemplates.html'
  },
  {
    id: 'dop-0160', domain: 1, type: 'single', numToSelect: 1,
    stem: 'A company uses CodeDeploy for EC2 instances and a large fleet of on-premises Linux servers. The on-premises servers must avoid long-lived AWS access keys and be selected for deployments by environment. Which approach is the most secure?',
    options: [
      { key: 'A', text: 'Create a least-privilege IAM role, distribute periodically refreshed STS session credentials through the company identity system, register each server with an IAM session ARN, install the CodeDeploy agent, and target deployment groups with on-premises instance tags' },
      { key: 'B', text: 'Create one IAM user with a permanent access key, copy the key to every server, and list server IDs directly in the deployment group' },
      { key: 'C', text: 'Store the root user access key on the deployment server and rotate it once per year' },
      { key: 'D', text: 'Install only the CodeDeploy agent; unregistered on-premises servers are discovered automatically from their IP addresses' }
    ],
    correct: ['A'],
    explanation: 'CodeDeploy supports on-premises registration with an IAM session ARN and periodically refreshed temporary STS credentials; AWS recommends this over static IAM-user credentials for production fleets. Registered on-premises instances are tagged, and deployment groups use tag groups to select them.',
    reference: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/register-on-premises-instance-iam-session-arn.html'
  },
  {
    id: 'dop-0161', domain: 3, type: 'single', numToSelect: 1,
    stem: 'A stateless EC2 web tier uses an RDS for MySQL Multi-AZ DB instance. A disaster recovery Region must achieve an RTO below 2 hours and an RPO below 10 minutes. Full duplicate compute capacity is not required during normal operation. Which design is the most cost-effective?',
    options: [
      { key: 'A', text: 'Maintain current AMIs and a tested CloudFormation template in the DR Region, continuously replicate to a cross-Region RDS read replica, and on failover create the web stack, promote the replica, and change DNS' },
      { key: 'B', text: 'Copy EBS and RDS snapshots to the DR Region once every hour and rebuild all infrastructure manually' },
      { key: 'C', text: 'Run a fully scaled active-active web tier and Aurora global database in both Regions regardless of the cost requirement' },
      { key: 'D', text: 'Keep no resources or data in the DR Region and restore only from the most recent local backup after a regional outage' }
    ],
    correct: ['A'],
    explanation: 'A pilot-light design keeps the stateful data continuously replicated while deferring most compute cost. RDS cross-Region read replicas use asynchronous replication and can be promoted during recovery; tested CloudFormation and replicated AMIs allow the stateless tier to be created within the RTO. Hourly copies cannot meet the RPO, while active-active is more expensive than required.',
    reference: 'https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.XRgn.html'
  },
  {
    id: 'dop-0162', domain: 2, type: 'single', numToSelect: 1,
    stem: 'An Auto Scaling group contains EC2 instances that have diverged because of in-place patches and manual changes. The company wants every launch to use the same approved image and wants controlled replacement of the existing fleet whenever the application or operating system changes. Which solution is best?',
    options: [
      { key: 'A', text: 'Bake a new immutable AMI, create a new launch template version, update the Auto Scaling group, and start an Instance Refresh with health checks and suitable minimum healthy capacity; use Systems Manager for controlled fleet-wide operations' },
      { key: 'B', text: 'Patch packages from internet repositories in user data on every launch and keep existing instances indefinitely' },
      { key: 'C', text: 'Use the NewestInstance termination policy so older configurations remain in service' },
      { key: 'D', text: 'Use AWS Config to install emergency patches directly on each instance without Systems Manager or replacement' }
    ],
    correct: ['A'],
    explanation: 'A versioned launch template tied to a baked AMI makes new launches deterministic. Instance Refresh replaces existing instances from the desired launch template version while honoring health and availability settings. Systems Manager provides auditable fleet operations; Config evaluates configuration but is not a patch execution service.',
    reference: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-instance-refresh.html'
  },
  {
    id: 'dop-0163', domain: 3, type: 'single', numToSelect: 1,
    stem: 'EC2 workers in an Auto Scaling group process an SQS queue. CPU utilization remains low even when the queue grows, and a message must normally wait no more than 60 seconds. Each instance processes one message in an average of 0.5 seconds. Which scaling design is the most reliable and operationally efficient?',
    options: [
      { key: 'A', text: 'Use target tracking on a metric-math expression that divides visible queue messages by InService instances, with an acceptable backlog target of 120 messages per instance' },
      { key: 'B', text: 'Use target tracking on NumberOfMessagesReceived because it represents the unprocessed backlog' },
      { key: 'C', text: 'Lower the CPU target until scaling happens, even though CPU is not proportional to queue delay' },
      { key: 'D', text: 'Place an Application Load Balancer in front of SQS and scale on ALBRequestCountPerTarget' }
    ],
    correct: ['A'],
    explanation: 'Backlog per instance is visible messages divided by InService capacity and is proportional to the work each instance must drain. The acceptable target is maximum latency divided by average processing time: 60/0.5 = 120. AWS now supports metric math for this target, avoiding a custom metric publisher. NumberOfMessagesReceived is throughput, not current backlog.',
    reference: 'https://docs.aws.amazon.com/autoscaling/ec2/userguide/as-using-sqs-queue.html'
  },
  {
    id: 'dop-0164', domain: 4, type: 'single', numToSelect: 1,
    stem: 'A closed-source application writes one JSON record per line to local EC2 log files. Records with eventType="diagnostic" contain no PII, while eventType="customer" records contain addresses and phone numbers. An external support team needs near-real-time diagnostic records without SSH access. Which solution is the most cost-effective?',
    options: [
      { key: 'A', text: 'Use the CloudWatch agent to send the files to CloudWatch Logs, apply a JSON subscription filter for diagnostic records, invoke Lambda to write matches to S3, and grant the support team read access to that bucket' },
      { key: 'B', text: 'Give the support team SSH access and rely on a written instruction not to open customer records' },
      { key: 'C', text: 'Run a continuously provisioned OpenSearch cluster and ingest all records, including PII, for occasional support investigations' },
      { key: 'D', text: 'Configure the unified CloudWatch agent to deliver local log files directly to an S3 bucket without CloudWatch Logs or another delivery service' }
    ],
    correct: ['A'],
    explanation: 'The CloudWatch agent can collect local files into CloudWatch Logs. A JSON subscription filter forwards only matching diagnostic records to Lambda in near real time, and Lambda can store the sanitized stream in S3 for low-cost controlled access. The design excludes the PII-bearing record type and avoids production SSH or an always-on search cluster.',
    reference: 'https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html'
  },
  {
    id: 'dop-0165', domain: 1, type: 'single', numToSelect: 1,
    stem: 'Separate CodePipeline pipelines currently rebuild the same commit for development and UAT, and the resulting applications sometimes differ. The environments must also remain structurally identical. Which redesign provides the strongest guarantee?',
    options: [
      { key: 'A', text: 'Use one pipeline to build once, pass that immutable output artifact to both deployment stages, and provision both environments from the same parameterized CloudFormation template' },
      { key: 'B', text: 'Keep two independent builds but use buildspec files that are intended to be equivalent' },
      { key: 'C', text: 'Build separately and compare source commit IDs, without comparing or reusing the produced artifacts' },
      { key: 'D', text: 'Reuse an EC2 instance for both environments and configure each environment manually after deployment' }
    ],
    correct: ['A'],
    explanation: 'A CodePipeline output artifact can be consumed by more than one later action or stage. Building once removes nondeterminism between rebuilds, and deploying the same artifact ensures binary identity. A shared parameterized CloudFormation template controls environment structure; independent builds and manual configuration do not provide those guarantees.',
    reference: 'https://docs.aws.amazon.com/codepipeline/latest/userguide/welcome-introducing-artifacts.html'
  },
  {
    id: 'dop-0166', domain: 6, type: 'single', numToSelect: 1,
    stem: 'An AWS SAM application uses an API Gateway HTTP API. Each request contains a proprietary token and tenant header that must be validated by an existing authentication service. The service does not issue JWTs and is not compatible with OpenID Connect or SAML. Which authentication mechanism should the template configure?',
    options: [
      { key: 'A', text: 'A Lambda REQUEST authorizer for AWS::Serverless::HttpApi with the token and tenant headers as identity sources' },
      { key: 'B', text: 'A native JWT authorizer with a fabricated issuer URL for the proprietary service' },
      { key: 'C', text: 'An API key only, because API keys authenticate and authorize arbitrary proprietary tokens' },
      { key: 'D', text: 'An S3 bucket policy that calls the authentication service before API Gateway invokes Lambda' }
    ],
    correct: ['A'],
    explanation: 'HTTP APIs support Lambda request authorizers, and SAM can define the authorizer and header identity sources. The authorizer function can call the proprietary authentication service and return an authorization result. A JWT authorizer requires a compatible JWT issuer, and API keys are intended for usage identification and throttling rather than custom authentication.',
    reference: 'https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/serverless-controlling-access-to-apis-lambda-authorizer.html'
  },
  {
    id: 'dop-0167', domain: 2, type: 'single', numToSelect: 1,
    stem: 'An Elastic Beanstalk environment was created with the EB CLI. A later application bundle sets InstanceType in .ebextensions, but deployments continue using the instance type chosen during environment creation. Other new settings in the file take effect. What is the cause?',
    options: [
      { key: 'A', text: 'The EB CLI applies a recommended instance-type value directly to the environment at the API level, which has higher precedence than saved configurations, .ebextensions, and defaults' },
      { key: 'B', text: '.ebextensions can set environment variables but can never set an EC2 instance type' },
      { key: 'C', text: 'Default values always override values in .ebextensions' },
      { key: 'D', text: 'Elastic Beanstalk silently ignores all .ebextensions files when the EB CLI created the environment' }
    ],
    correct: ['A'],
    explanation: 'Elastic Beanstalk precedence is direct environment/API settings, saved configurations, .ebextensions, then defaults. The EB CLI and console set recommended values such as InstanceType at the highest environment/API level, so a lower-precedence configuration file cannot replace that setting until the higher-level value is changed or removed.',
    reference: 'https://docs.aws.amazon.com/elasticbeanstalk/latest/dg/command-options.html'
  },
  {
    id: 'dop-0168', domain: 1, type: 'multi', numToSelect: 2,
    stem: 'A CodeDeploy blue/green deployment to an EC2 Auto Scaling group must roll back automatically when application logs show too many ERROR records. The application does not return these failures as ALB HTTP error codes. Which TWO actions meet the requirement?',
    options: [
      { key: 'A', text: 'Send the application logs to CloudWatch Logs and create a metric filter plus a CloudWatch alarm for the unacceptable error rate' },
      { key: 'B', text: 'Associate the alarm with the CodeDeploy deployment group and enable automatic rollback when the alarm threshold is met' },
      { key: 'C', text: 'Alarm only on ALB HTTPCode_Target_4XX_Count even though the failures appear only in application logs' },
      { key: 'D', text: 'Publish an SNS message and configure CodeDeploy to poll the topic for rollback commands' },
      { key: 'E', text: 'Run an hourly Lambda poll that calls rollback regardless of CodeDeploy alarm integration' }
    ],
    correct: ['A', 'B'],
    explanation: 'A CloudWatch Logs metric filter converts matching application error records into a metric that an alarm can evaluate. CodeDeploy deployment groups can monitor CloudWatch alarms and automatically deploy the last known good revision when an associated alarm activates. ALB metrics do not observe log-only errors, and CodeDeploy does not consume SNS messages as rollback commands.',
    reference: 'https://docs.aws.amazon.com/codedeploy/latest/userguide/deployment-groups-configure-advanced-options.html'
  }
];
