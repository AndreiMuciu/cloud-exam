# KCSA Mock Exam - Set 2

## Exam Information

- **Total Questions:** 60
- **Time Limit:** 90 minutes
- **Passing Score:** 75% (45 correct answers)

## Domain Distribution

| Domain | Weight | Questions |
|--------|--------|-----------|
| Cloud Native Security | 14% | Q1-Q8 |
| Cluster Component Security | 22% | Q9-Q21 |
| Kubernetes Security Fundamentals | 22% | Q22-Q34 |
| Kubernetes Threat Model | 16% | Q35-Q44 |
| Platform Security | 16% | Q45-Q54 |
| Compliance and Security Frameworks | 10% | Q55-Q60 |

---

## Questions

---

### Question 1

Which security principle states that multiple layers of security controls should be implemented so that if one layer fails, others still provide protection?

A. Least privilege  
B. Defense in depth  
C. Zero trust  
D. Separation of duties

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Defense in depth is the strategy of layering multiple security controls so that no single point of failure compromises the entire system. In cloud native environments this means combining network policies, RBAC, container isolation, and runtime security together.

**Why others are wrong:** A: Least privilege limits permissions but is a single control, not a layering strategy. C: Zero trust is an access model, not specifically about layering defenses. D: Separation of duties divides responsibilities among people, not about stacking security layers.
</details>

---

### Question 2

In the cloud shared responsibility model for managed Kubernetes (e.g., EKS, GKE, AKS), who is responsible for securing the application container images?

A. The cloud provider  
B. The customer  
C. The Kubernetes community  
D. The container runtime vendor

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** In a shared responsibility model, the cloud provider secures the underlying infrastructure and control plane, while the customer is responsible for workload-level security including container images, application code, and their dependencies.

**Why others are wrong:** A: The cloud provider manages the control plane and infrastructure, not customer workloads. C: The Kubernetes community develops the platform but does not secure individual deployments. D: The container runtime vendor provides the runtime engine, not application image security.
</details>

---

### Question 3

Which technology provides kernel-level sandboxing for containers by intercepting system calls and running them through a user-space kernel?

A. SELinux  
B. AppArmor  
C. gVisor  
D. Seccomp

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** gVisor implements a user-space kernel (called Sentry) that intercepts and handles container system calls, providing strong isolation without requiring a full virtual machine. This sandboxing approach limits the attack surface of the host kernel.

**Why others are wrong:** A: SELinux is a MAC system that enforces access policies but does not provide a user-space kernel. B: AppArmor restricts program capabilities via profiles but does not intercept syscalls through a user-space kernel. D: Seccomp filters system calls but does not implement a separate user-space kernel.
</details>

---

### Question 4

What is the primary purpose of a Software Bill of Materials (SBOM) in a cloud native environment?

A. To encrypt container images at rest  
B. To provide an inventory of all components, libraries, and dependencies in software  
C. To enforce network segmentation between microservices  
D. To manage TLS certificates for service-to-service communication

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** An SBOM is a comprehensive list of all components, libraries, and dependencies included in a software artifact. It enables organizations to quickly identify whether they are affected by newly disclosed vulnerabilities such as Log4Shell.

**Why others are wrong:** A: Encryption at rest is handled by storage-level encryption, not SBOMs. C: Network segmentation uses network policies or service meshes. D: TLS certificate management is handled by tools like cert-manager.
</details>

---

### Question 5

Which tool is used to cryptographically sign container images so that their integrity and provenance can be verified before deployment?

A. Trivy  
B. cosign  
C. Falco  
D. kube-bench

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Cosign (part of the Sigstore project) is designed specifically for signing, verifying, and attesting container images and other OCI artifacts. It enables supply chain security by ensuring images have not been tampered with.

**Why others are wrong:** A: Trivy is a vulnerability scanner, not a signing tool. C: Falco is a runtime threat detection engine. D: kube-bench checks cluster configurations against CIS benchmarks.
</details>

---

### Question 6

What is the primary security benefit of using immutable container images in production?

A. They automatically apply security patches  
B. They prevent runtime modifications, ensuring the deployed artifact matches what was tested  
C. They eliminate the need for vulnerability scanning  
D. They encrypt all data inside the container

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Immutable images ensure that what was scanned and tested in CI/CD is exactly what runs in production, preventing unauthorized runtime modifications like installing new packages or altering binaries inside running containers.

**Why others are wrong:** A: Immutable images must be rebuilt to apply patches; they do not self-update. C: Immutable images still need vulnerability scanning before deployment. D: Immutability prevents modification but does not encrypt data.
</details>

---

### Question 7

Which container sandboxing technology uses lightweight virtual machines to run each container or pod with its own dedicated kernel?

A. gVisor  
B. Kata Containers  
C. Seccomp  
D. runc

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Kata Containers provides hardware-virtualized isolation by running containers inside lightweight VMs, each with its own kernel. This gives VM-level security boundaries while maintaining a container-like workflow.

**Why others are wrong:** A: gVisor uses a user-space kernel, not a VM-based approach. C: Seccomp is a syscall filtering mechanism in the Linux kernel. D: runc is the default OCI container runtime and does not provide VM-level isolation.
</details>

---

### Question 8

In the 4C's model of cloud native security, which layer is the outermost?

A. Code  
B. Container  
C. Cluster  
D. Cloud

<details><summary>Answer & Explanation</summary>

**Correct Answer: D**

**Why D is correct:** The 4C's model layers security from outside in: Cloud, Cluster, Container, Code. The Cloud layer is outermost and represents the underlying infrastructure or data center security that all other layers depend on.

**Why others are wrong:** A: Code is the innermost layer. B: Container is the third layer from outside. C: Cluster is the second layer from outside.
</details>

---

### Question 9

What is the primary function of the Kubernetes controller manager?

A. To schedule pods onto worker nodes  
B. To run control loops that regulate cluster state and reconcile desired state with actual state  
C. To serve the Kubernetes API  
D. To manage container networking on each node

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The controller manager runs a set of controllers (e.g., Deployment controller, ReplicaSet controller, Node controller) that continuously watch the cluster state via the API server and take actions to reconcile actual state with the desired state.

**Why others are wrong:** A: The scheduler handles pod placement on nodes. C: The API server serves the Kubernetes API. D: kube-proxy and CNI plugins manage container networking.
</details>

---

### Question 10

Which Kubernetes component is responsible for selecting the optimal node for a newly created pod?

A. kubelet  
B. kube-proxy  
C. kube-scheduler  
D. etcd

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The kube-scheduler watches for newly created pods with no assigned node and selects the best node based on resource requirements, affinity rules, taints/tolerations, and other scheduling constraints.

**Why others are wrong:** A: The kubelet runs pods on a node but does not choose which node. B: kube-proxy manages network rules for Services. D: etcd stores cluster state but does not make scheduling decisions.
</details>

---

### Question 11

Why should the kubelet read-only port (10255) be disabled in production?

A. It consumes excessive CPU resources  
B. It exposes pod and node metrics without authentication, allowing information disclosure  
C. It allows remote code execution on the node  
D. It conflicts with the kube-proxy port

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The kubelet read-only port (10255) serves metrics and pod information over HTTP without any authentication or authorization. An attacker with network access can enumerate running pods, environment variables, and resource usage.

**Why others are wrong:** A: The port does not cause significant resource consumption. C: It is read-only and does not allow command execution. D: It uses a different port than kube-proxy and does not conflict.
</details>

---

### Question 12

What authentication mechanism does etcd use to verify the identity of API server connections?

A. Token-based authentication  
B. Mutual TLS (mTLS) with client certificates  
C. Basic username and password  
D. OAuth 2.0

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** etcd uses mutual TLS where both the client (API server) and server (etcd) present certificates to each other. This ensures that only authenticated and authorized components can read or write to the cluster's key-value store.

**Why others are wrong:** A: etcd relies on mTLS, not token-based authentication, for peer and client authentication. C: Basic auth is insecure and not the standard etcd authentication method. D: OAuth 2.0 is not used for etcd communication.
</details>

---

### Question 13

Which container runtime is the default high-level runtime used by Kubernetes after the removal of dockershim?

A. runc  
B. CRI-O  
C. containerd  
D. Docker Engine

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** After dockershim was removed in Kubernetes 1.24, containerd became the most widely adopted high-level container runtime. It implements the Container Runtime Interface (CRI) natively and manages the full container lifecycle.

**Why others are wrong:** A: runc is a low-level OCI runtime that containerd uses underneath, not a CRI-compliant high-level runtime. B: CRI-O is an alternative CRI runtime but is not the default on most distributions. D: Docker Engine required the now-removed dockershim to work with Kubernetes.
</details>

---

### Question 14

Which flag on the kube-apiserver enables encryption of Secret data stored in etcd?

A. --encryption-provider-config  
B. --etcd-encryption-key  
C. --secret-encryption-enabled  
D. --enable-encryption-at-rest

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** The `--encryption-provider-config` flag points to a configuration file that defines which resources should be encrypted and which encryption providers (aescbc, aesgcm, secretbox, kms) to use for data at rest in etcd.

**Why others are wrong:** B: This is not a valid kube-apiserver flag. C: This is not a valid kube-apiserver flag. D: This is not a valid kube-apiserver flag.
</details>

---

### Question 15

What is the security risk of running the kube-apiserver with `--anonymous-auth=true`?

A. It disables TLS encryption on the API server  
B. It allows unauthenticated requests to reach the API server, potentially exposing cluster information  
C. It bypasses all RBAC authorization  
D. It stores credentials in plaintext

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** When anonymous auth is enabled, requests without credentials are assigned the `system:anonymous` user. If RBAC grants permissions to this user or the `system:unauthenticated` group, unauthenticated users can access cluster resources.

**Why others are wrong:** A: Anonymous auth does not affect TLS configuration. C: RBAC still applies, but the anonymous user may have been granted permissions. D: Anonymous auth is unrelated to credential storage.
</details>

---

### Question 16

Which kube-proxy mode uses Linux kernel hash tables for more efficient service load balancing compared to iptables?

A. userspace  
B. iptables  
C. IPVS  
D. nftables

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** IPVS (IP Virtual Server) mode uses kernel-level hash tables for service routing, providing O(1) connection processing complexity. This makes it significantly more efficient than iptables mode for clusters with large numbers of Services.

**Why others are wrong:** A: Userspace mode is the oldest and least efficient proxy mode. B: iptables mode uses sequential rule matching which degrades with many Services. D: nftables is a Linux packet filtering framework but not a standard kube-proxy mode.
</details>

---

### Question 17

What happens if the etcd cluster loses quorum?

A. The cluster continues operating normally  
B. The API server can still write new data but not read  
C. The cluster becomes read-only and cannot process writes or leader elections  
D. All worker nodes automatically shut down

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** etcd uses the Raft consensus protocol, which requires a majority of members (quorum) to agree on writes. Without quorum, the cluster cannot elect a leader or commit new writes, effectively making it read-only or unavailable.

**Why others are wrong:** A: The cluster cannot process state changes without quorum. B: Without quorum, writes are impossible; existing reads may still work from local data. D: Worker nodes continue running existing workloads even if the control plane is unavailable.
</details>

---

### Question 18

Which kubelet flag restricts anonymous access to the kubelet API?

A. --authorization-mode=Webhook  
B. --anonymous-auth=false  
C. --read-only-port=0  
D. --client-ca-file

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Setting `--anonymous-auth=false` on the kubelet ensures that all requests to the kubelet API must be authenticated. Without this, unauthenticated users could potentially access pod logs, exec into containers, or retrieve metrics.

**Why others are wrong:** A: This configures authorization mode but does not disable anonymous access at the authentication step. C: This disables the read-only port but does not affect authentication on the main kubelet port. D: This specifies the CA for client certificate verification but does not disable anonymous access by itself.
</details>

---

### Question 19

What is the recommended practice for securing access to the Kubernetes API server from external networks?

A. Expose the API server on a public IP with basic authentication  
B. Place the API server behind a VPN or firewall and use certificate-based authentication  
C. Use HTTP instead of HTTPS to reduce latency  
D. Allow all IP addresses in the API server's CORS configuration

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Restricting API server access to a VPN or private network and requiring certificate-based authentication significantly reduces the attack surface. This prevents unauthorized internet access to the control plane.

**Why others are wrong:** A: Public exposure with basic auth is insecure and easily brute-forced. C: Using HTTP exposes all API traffic including credentials to interception. D: Permissive CORS settings enable cross-origin attacks.
</details>

---

### Question 20

Which component stores all Kubernetes cluster state including Secrets, ConfigMaps, and resource definitions?

A. kube-apiserver  
B. kube-controller-manager  
C. etcd  
D. kubelet

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** etcd is the distributed key-value store that serves as Kubernetes' backing store for all cluster data. Every object created through the API server is ultimately persisted in etcd.

**Why others are wrong:** A: The API server serves as the interface to etcd but does not store data itself. B: The controller manager reads state from the API server but does not store it. D: The kubelet manages pods on individual nodes but relies on the API server for state.
</details>

---

### Question 21

What is the purpose of the `--service-account-key-file` flag on the kube-apiserver?

A. To encrypt etcd data at rest  
B. To specify the public key used to verify service account tokens  
C. To configure TLS for the API server  
D. To set the signing key for webhook tokens

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The `--service-account-key-file` flag specifies the PEM-encoded public key(s) used to verify ServiceAccount tokens. The controller manager uses the corresponding private key to sign these tokens.

**Why others are wrong:** A: etcd encryption is configured via `--encryption-provider-config`. C: TLS is configured via `--tls-cert-file` and `--tls-private-key-file`. D: Webhook token authentication is configured separately with `--authentication-token-webhook-config-file`.
</details>

---

### Question 22

Which Pod Security Admission (PSA) label on a namespace causes non-compliant pods to be rejected?

A. `pod-security.kubernetes.io/warn`  
B. `pod-security.kubernetes.io/audit`  
C. `pod-security.kubernetes.io/enforce`  
D. `pod-security.kubernetes.io/deny`

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The `enforce` mode label causes the admission controller to reject any pod that violates the specified Pod Security Standard level. This is the only mode that actively blocks non-compliant pods from being created.

**Why others are wrong:** A: The `warn` mode only returns a warning to the user but still allows the pod. B: The `audit` mode logs violations to the audit log but does not block pods. D: There is no `deny` mode label in PSA.
</details>

---

### Question 23

Which RBAC verb allows a user to create new resources in Kubernetes?

A. get  
B. list  
C. create  
D. watch

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The `create` verb in an RBAC Role or ClusterRole grants permission to create new resources. Each API operation maps to a specific verb: GET to `get`, POST to `create`, PUT to `update`, DELETE to `delete`.

**Why others are wrong:** A: `get` allows reading a specific resource by name. B: `list` allows listing collections of resources. D: `watch` allows subscribing to change notifications on resources.
</details>

---

### Question 24

What is ClusterRole aggregation in Kubernetes RBAC?

A. Combining multiple namespaces into a single RBAC scope  
B. Automatically merging rules from multiple ClusterRoles into one using label selectors  
C. Granting a ClusterRole to all users in the cluster  
D. Duplicating a Role across all namespaces

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** ClusterRole aggregation uses `aggregationRule.clusterRoleSelectors` to automatically combine rules from ClusterRoles matching specified labels into a parent ClusterRole. The default `admin`, `edit`, and `view` ClusterRoles use this mechanism.

**Why others are wrong:** A: Aggregation operates on ClusterRoles, not namespace scoping. C: Aggregation merges role rules, not user bindings. D: Aggregation combines ClusterRoles, not namespace-scoped Roles.
</details>

---

### Question 25

Which Kubernetes Secret type is specifically designed for storing Docker registry credentials?

A. `Opaque`  
B. `kubernetes.io/tls`  
C. `kubernetes.io/dockerconfigjson`  
D. `kubernetes.io/service-account-token`

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The `kubernetes.io/dockerconfigjson` type stores Docker registry authentication credentials in the `.dockerconfigjson` format. Kubernetes uses these Secrets as imagePullSecrets to authenticate with private container registries.

**Why others are wrong:** A: `Opaque` is the default generic Secret type with no format validation. B: `kubernetes.io/tls` stores TLS certificate and key pairs. D: `kubernetes.io/service-account-token` stores auto-generated service account tokens.
</details>

---

### Question 26

Which encryption provider in the `EncryptionConfiguration` delegates key management to an external service such as AWS KMS or HashiCorp Vault?

A. aescbc  
B. aesgcm  
C. secretbox  
D. kms

<details><summary>Answer & Explanation</summary>

**Correct Answer: D**

**Why D is correct:** The `kms` provider uses an envelope encryption scheme where the data encryption key (DEK) is encrypted by an external Key Management Service. This allows centralized key rotation and management outside the Kubernetes cluster.

**Why others are wrong:** A: aescbc performs encryption locally using a key stored in the encryption config file. B: aesgcm also uses a locally stored key with AES-GCM encryption. C: secretbox uses a locally stored key with XSalsa20-Poly1305 encryption.
</details>

---

### Question 27

What is the effect of creating a NetworkPolicy that selects all pods in a namespace but specifies no ingress rules?

A. All ingress traffic is allowed  
B. All ingress traffic is denied (default deny)  
C. Only DNS traffic is allowed  
D. The NetworkPolicy has no effect

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A NetworkPolicy that selects pods and lists `Ingress` in its `policyTypes` but defines no `ingress` rules creates a default deny for all inbound traffic to those pods. Selected pods will reject all incoming connections.

**Why others are wrong:** A: Empty ingress rules means no traffic is explicitly allowed, so everything is denied. C: DNS traffic is not automatically exempted by NetworkPolicy. D: The policy actively denies ingress by having an empty ingress rule set.
</details>

---

### Question 28

Which Kubernetes audit log level records the request metadata and the request body but not the response body?

A. None  
B. Metadata  
C. Request  
D. RequestResponse

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The `Request` audit level logs event metadata plus the request body, but omits the response body. This is useful for capturing what actions were requested without the overhead of storing potentially large response payloads.

**Why others are wrong:** A: `None` disables logging entirely. B: `Metadata` only logs request metadata (user, resource, verb, timestamp) without any body. D: `RequestResponse` logs both the request and response bodies.
</details>

---

### Question 29

What does the `escalate` RBAC verb allow a user to do?

A. Increase the CPU limits of a pod  
B. Modify a Role or ClusterRole to grant permissions the user does not already have  
C. Promote a regular user to cluster-admin  
D. Scale up a Deployment beyond its resource quota

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The `escalate` verb on Roles or ClusterRoles permits a user to create or update those objects with permissions exceeding their own. Without this verb, RBAC prevents privilege escalation by blocking such modifications.

**Why others are wrong:** A: CPU limit changes are controlled by resource management, not RBAC verbs. C: Promoting users requires creating ClusterRoleBindings, not the `escalate` verb specifically. D: Scaling is controlled by the `update` or `patch` verb on Deployments.
</details>

---

### Question 30

Which PSA level is the most restrictive and follows current pod hardening best practices?

A. privileged  
B. baseline  
C. restricted  
D. enforced

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The `restricted` Pod Security Standard is the most stringent level, requiring pods to follow hardening best practices such as running as non-root, dropping all capabilities, and using a read-only root filesystem.

**Why others are wrong:** A: `privileged` is the least restrictive level and applies no restrictions. B: `baseline` is moderately restrictive, preventing known privilege escalations but allowing some less-hardened configurations. D: `enforced` is a PSA mode, not a security level.
</details>

---

### Question 31

By default, how are Kubernetes Secrets stored in etcd?

A. Encrypted with AES-256  
B. Base64-encoded but not encrypted  
C. Encrypted with the cluster's TLS certificate  
D. Stored as plaintext without any encoding

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** By default, Kubernetes Secrets are stored in etcd as base64-encoded data without encryption. Anyone with direct access to etcd can decode and read the Secret values unless encryption at rest is explicitly configured.

**Why others are wrong:** A: AES-256 encryption requires explicit configuration of an EncryptionConfiguration. C: TLS certificates secure data in transit, not at rest in etcd. D: They are base64-encoded, though this is encoding, not encryption.
</details>

---

### Question 32

What does the `bind` RBAC verb allow?

A. Binding a PersistentVolume to a PersistentVolumeClaim  
B. Creating RoleBindings or ClusterRoleBindings that reference a specific Role  
C. Attaching a network policy to a pod  
D. Linking a ServiceAccount to a Deployment

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The `bind` verb allows a user to create a RoleBinding or ClusterRoleBinding that references a specific Role or ClusterRole, even if they do not hold all the permissions in that role. This is a controlled way to delegate role binding permissions.

**Why others are wrong:** A: PV/PVC binding is handled by the PersistentVolume controller, not the `bind` RBAC verb. C: Network policies are applied via label selectors, not a `bind` verb. D: ServiceAccount assignment to pods does not use the `bind` verb.
</details>

---

### Question 33

Which field in a NetworkPolicy spec defines rules for traffic leaving the selected pods?

A. ingress  
B. egress  
C. outbound  
D. external

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The `egress` field in a NetworkPolicy spec defines rules governing outgoing traffic from the selected pods. Each egress rule can specify allowed destination pods, namespaces, and IP blocks along with ports.

**Why others are wrong:** A: `ingress` defines rules for incoming traffic to selected pods. C: `outbound` is not a valid NetworkPolicy field. D: `external` is not a valid NetworkPolicy field.
</details>

---

### Question 34

When a ServiceAccount token is projected into a pod using a projected volume, what security improvement does this provide over the legacy approach?

A. The token is encrypted with the pod's TLS certificate  
B. The token is audience-bound, time-limited, and automatically rotated  
C. The token is stored in etcd instead of the pod filesystem  
D. The token grants cluster-admin privileges by default

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Projected ServiceAccount tokens (bound tokens) are issued with a specific audience, have an expiration time, and are automatically rotated by the kubelet. This significantly reduces the risk compared to legacy non-expiring tokens.

**Why others are wrong:** A: The token is not encrypted; it is a signed JWT. C: The token is still mounted into the pod filesystem, not stored in etcd. D: Projected tokens follow the same RBAC permissions as the ServiceAccount.
</details>

---

### Question 35

Which framework provides a knowledge base of adversary tactics and techniques specifically adapted for Kubernetes environments?

A. OWASP Top 10  
B. MITRE ATT&CK for Containers  
C. CIS Benchmarks  
D. NIST CSF

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** MITRE ATT&CK includes a Containers matrix that catalogs adversary tactics, techniques, and procedures (TTPs) specific to container and Kubernetes environments, from initial access through exfiltration.

**Why others are wrong:** A: OWASP Top 10 focuses on web application vulnerabilities, not Kubernetes-specific attack techniques. C: CIS Benchmarks provide configuration hardening guidelines, not attacker technique taxonomy. D: NIST CSF is a general cybersecurity risk management framework.
</details>

---

### Question 36

In the Microsoft Kubernetes Threat Matrix, which tactic involves an attacker establishing long-term access to a compromised cluster?

A. Initial Access  
B. Execution  
C. Persistence  
D. Lateral Movement

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** Persistence in the Kubernetes Threat Matrix covers techniques attackers use to maintain access across restarts and disruptions, such as creating backdoor pods, modifying admission webhooks, or deploying malicious DaemonSets.

**Why others are wrong:** A: Initial Access describes how an attacker first enters the cluster. B: Execution covers techniques to run malicious code within the cluster. D: Lateral Movement describes moving between different resources or nodes in the cluster.
</details>

---

### Question 37

How can an attacker achieve persistence in a Kubernetes cluster by abusing CronJobs?

A. By exploiting a kernel vulnerability through the CronJob container  
B. By creating a CronJob that periodically deploys a backdoor pod or exfiltrates data  
C. By modifying the kube-scheduler to always schedule their pods first  
D. By deleting all existing CronJobs to cause a denial of service

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A malicious CronJob runs on a schedule, providing persistent access by repeatedly spawning attacker-controlled pods. Even if individual pods are deleted, the CronJob controller recreates them on the defined schedule.

**Why others are wrong:** A: Kernel exploitation is a privilege escalation technique, not a persistence mechanism via CronJobs. C: Modifying the scheduler is a different attack vector and not related to CronJob abuse. D: Deleting CronJobs is disruption, not persistence.
</details>

---

### Question 38

Which attack involves an attacker consuming all available cluster resources to prevent legitimate workloads from running?

A. Man-in-the-middle  
B. Resource exhaustion denial of service  
C. Container breakout  
D. Credential theft

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Resource exhaustion DoS occurs when an attacker deploys workloads that consume all available CPU, memory, or storage, starving legitimate applications of resources. ResourceQuotas and LimitRanges are key defenses against this attack.

**Why others are wrong:** A: Man-in-the-middle intercepts network traffic but does not exhaust resources. C: Container breakout involves escaping to the host, not resource exhaustion. D: Credential theft steals access tokens but does not directly exhaust resources.
</details>

---

### Question 39

What is ARP spoofing in the context of a Kubernetes cluster network?

A. Injecting malicious DNS responses to redirect pod traffic  
B. Sending false ARP messages to associate an attacker's MAC address with a legitimate pod IP  
C. Modifying iptables rules on a worker node  
D. Exploiting etcd to change Service endpoints

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** ARP spoofing involves sending falsified ARP messages on the cluster network, causing traffic intended for a legitimate pod or node to be redirected to the attacker. This enables traffic interception in flat cluster networks.

**Why others are wrong:** A: This describes DNS spoofing, not ARP spoofing. C: Modifying iptables is a host-level attack, not ARP spoofing. D: Manipulating etcd is a control plane attack, not a network-layer ARP attack.
</details>

---

### Question 40

Which technique could an attacker use to exfiltrate data from a Kubernetes cluster?

A. Creating a pod with a hostPath volume that reads sensitive node files and sends them to an external endpoint  
B. Applying a NetworkPolicy that blocks all egress  
C. Enabling Pod Security Admission in enforce mode  
D. Configuring mutual TLS between services

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** A hostPath volume mounts host filesystem directories into a pod, allowing an attacker to read sensitive files such as kubelet credentials, node configurations, or other pod data and transmit them externally.

**Why others are wrong:** B: Blocking egress prevents data exfiltration rather than enabling it. C: PSA enforcement restricts pod capabilities and prevents attacks. D: mTLS secures communication and does not aid exfiltration.
</details>

---

### Question 41

What is a container breakout?

A. Scaling a container beyond its resource limits  
B. An attacker escaping the container's isolation to gain access to the host operating system  
C. A container crashing due to an out-of-memory error  
D. Migrating a container from one node to another

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A container breakout occurs when an attacker exploits vulnerabilities in the container runtime, kernel, or misconfiguration (e.g., privileged mode) to escape the container's namespace/cgroup isolation and access the underlying host.

**Why others are wrong:** A: Exceeding resource limits causes throttling or OOM kills, not a breakout. C: OOM crashes are resource issues, not security breakouts. D: Container migration is a scheduling operation, not a security event.
</details>

---

### Question 42

Which Kubernetes resource can an attacker abuse to intercept or modify all API requests entering the cluster?

A. NetworkPolicy  
B. MutatingAdmissionWebhook  
C. ResourceQuota  
D. PodDisruptionBudget

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A MutatingAdmissionWebhook intercepts API requests after authentication and can modify resource definitions before they are persisted. An attacker with webhook creation privileges can inject sidecar containers, modify security contexts, or alter any resource.

**Why others are wrong:** A: NetworkPolicy controls pod-level network traffic, not API requests. C: ResourceQuota limits resource consumption, not request modification. D: PodDisruptionBudget protects availability during evictions.
</details>

---

### Question 43

How can running a pod in `privileged: true` mode increase the risk of a container breakout?

A. It exposes the pod to the internet  
B. It gives the container full access to host devices and disables most security isolation mechanisms  
C. It increases the pod's CPU allocation  
D. It enables automatic scaling of the pod

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A privileged container has access to all host devices, can load kernel modules, and bypasses many Linux security mechanisms including AppArmor, seccomp, and device cgroups. This makes host escape trivially easy.

**Why others are wrong:** A: Privileged mode does not change network exposure. C: Privileged mode does not affect CPU resource allocation. D: Privileged mode has no relation to autoscaling.
</details>

---

### Question 44

What is the primary risk of a compromised service account token in a Kubernetes cluster?

A. It allows the attacker to decrypt etcd data directly  
B. It enables the attacker to make API calls with the permissions bound to that service account  
C. It automatically grants cluster-admin access  
D. It disables all network policies in the namespace

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A stolen service account token lets an attacker authenticate to the API server and perform any action the associated RBAC permissions allow. This is why minimizing service account permissions (least privilege) is critical.

**Why others are wrong:** A: Service account tokens authenticate to the API server, not decrypt etcd directly. C: The token only grants the permissions assigned to that service account, not cluster-admin by default. D: Service account tokens do not affect NetworkPolicy configuration unless specifically granted those permissions.
</details>

---

### Question 45

What type of policy does Kyverno use to define and enforce rules in a Kubernetes cluster?

A. Rego policies  
B. YAML-based Kubernetes-native policies  
C. JSON Schema definitions  
D. Lua scripts

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Kyverno policies are written as Kubernetes custom resources in YAML, making them accessible to Kubernetes administrators without learning a new policy language. Policies can validate, mutate, and generate resources.

**Why others are wrong:** A: Rego is the policy language used by OPA/Gatekeeper, not Kyverno. C: JSON Schema may be used within policies but is not the policy format itself. D: Lua is not used by Kyverno for policy definitions.
</details>

---

### Question 46

What is the role of OPA Gatekeeper's ConstraintTemplate resource?

A. It creates new Kubernetes namespaces with predefined security settings  
B. It defines the Rego logic and parameters for a reusable policy that Constraint resources instantiate  
C. It configures TLS certificates for the admission webhook  
D. It manages RBAC roles for the Gatekeeper controller

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A ConstraintTemplate defines the Rego policy logic and the schema of parameters it accepts. Constraint resources then instantiate the template with specific parameter values, enabling reusable and parameterized policy enforcement.

**Why others are wrong:** A: ConstraintTemplates define policy logic, not namespace creation. C: TLS configuration for webhooks is handled separately, not by ConstraintTemplates. D: Gatekeeper RBAC is configured through standard Kubernetes Role/ClusterRole resources.
</details>

---

### Question 47

In Istio, what does the `STRICT` mTLS mode enforce?

A. Only plaintext HTTP traffic is allowed between services  
B. All traffic between services in the mesh must use mutual TLS; plaintext is rejected  
C. mTLS is optional and services can fall back to plaintext  
D. Only inbound traffic requires TLS; outbound can be plaintext

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Istio's `STRICT` mTLS mode requires that all service-to-service communication within the mesh is encrypted with mutual TLS. Any plaintext connection attempt is rejected, ensuring all traffic is authenticated and encrypted.

**Why others are wrong:** A: STRICT mode enforces encryption, not plaintext. C: This describes `PERMISSIVE` mode, which accepts both mTLS and plaintext. D: STRICT mode enforces mTLS in both directions.
</details>

---

### Question 48

How does cosign verify that a container image has not been tampered with?

A. By checking the image's file permissions  
B. By validating the cryptographic signature against the signer's public key and verifying the image digest  
C. By comparing the image size with a known baseline  
D. By scanning the image for malware signatures

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Cosign verifies an image by checking that the cryptographic signature was created with the expected private key (validated against the public key) and that the image digest matches what was signed, ensuring integrity and provenance.

**Why others are wrong:** A: File permissions are not part of cryptographic image verification. C: Image size comparison is not a reliable integrity mechanism. D: Malware scanning is vulnerability assessment, not signature verification.
</details>

---

### Question 49

What is the primary function of cert-manager in a Kubernetes cluster?

A. Managing RBAC certificates for user authentication  
B. Automating the issuance, renewal, and management of TLS certificates  
C. Encrypting etcd data at rest  
D. Signing container images with X.509 certificates

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** cert-manager automates TLS certificate lifecycle management in Kubernetes. It integrates with issuers like Let's Encrypt, Vault, and self-signed CAs to automatically provision, renew, and store certificates as Kubernetes Secrets.

**Why others are wrong:** A: RBAC does not use certificates managed by cert-manager; it uses its own authentication mechanisms. C: etcd encryption at rest is configured through the API server's encryption provider config. D: Container image signing is handled by tools like cosign, not cert-manager.
</details>

---

### Question 50

How does configuring TLS termination on a Kubernetes Ingress resource improve security?

A. It encrypts pod-to-pod traffic within the cluster  
B. It encrypts traffic between external clients and the Ingress controller, preventing eavesdropping  
C. It replaces the need for NetworkPolicies  
D. It automatically rotates service account tokens

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** TLS termination at the Ingress controller encrypts traffic from external clients to the cluster entry point using HTTPS, preventing eavesdropping and man-in-the-middle attacks on external traffic.

**Why others are wrong:** A: Ingress TLS termination handles external traffic; pod-to-pod encryption requires a service mesh. C: TLS and NetworkPolicies serve different purposes and are both needed. D: TLS termination has no relation to service account token management.
</details>

---

### Question 51

What security feature does Harbor provide that a basic container registry does not?

A. The ability to store container images  
B. Built-in vulnerability scanning, image signing, and role-based access control  
C. Support for OCI image format  
D. HTTP-based image pull and push

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Harbor extends basic registry functionality with enterprise security features including integrated vulnerability scanning (via Trivy), content trust (image signing with Notary), replication policies, and fine-grained RBAC.

**Why others are wrong:** A: All container registries store images; this is not a differentiating security feature. C: OCI format support is common across modern registries. D: HTTP-based operations are standard registry functionality, not a security advantage.
</details>

---

### Question 52

What is Istio's `PERMISSIVE` mTLS mode used for?

A. Blocking all non-mTLS traffic immediately  
B. Allowing a gradual migration by accepting both plaintext and mTLS traffic  
C. Disabling mTLS entirely across the mesh  
D. Encrypting only egress traffic leaving the cluster

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** PERMISSIVE mode allows services to accept both mTLS-encrypted and plaintext connections simultaneously. This is designed for incremental migration so that services not yet enrolled in the mesh can still communicate.

**Why others are wrong:** A: Blocking non-mTLS traffic describes STRICT mode. C: PERMISSIVE still supports mTLS; it does not disable it. D: PERMISSIVE applies to all service traffic directions, not just egress.
</details>

---

### Question 53

Which Kubernetes resource type is used to store a TLS certificate and private key for use by an Ingress controller?

A. ConfigMap  
B. Secret of type `kubernetes.io/tls`  
C. PersistentVolumeClaim  
D. ServiceAccount

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A `kubernetes.io/tls` Secret stores the `tls.crt` (certificate) and `tls.key` (private key) fields required for TLS termination. Ingress resources reference these Secrets in their `tls` configuration section.

**Why others are wrong:** A: ConfigMaps are for non-sensitive configuration data and should not hold private keys. C: PersistentVolumeClaims provide storage, not certificate management. D: ServiceAccounts handle pod identity, not TLS certificates.
</details>

---

### Question 54

What security risk does an admission controller with a `failurePolicy: Ignore` setting introduce?

A. It causes all pod creations to fail  
B. It allows resources to bypass policy checks if the webhook is unavailable, potentially admitting non-compliant workloads  
C. It doubles the latency of API requests  
D. It disables RBAC for the affected namespace

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** When `failurePolicy` is set to `Ignore`, any failure in the webhook (timeout, crash, network issue) causes the API server to skip the policy check and allow the request through. This can let non-compliant or malicious resources into the cluster.

**Why others are wrong:** A: `Ignore` allows requests through, not blocks them. C: Latency increase is a performance concern, not the primary security risk of this setting. D: Admission controllers are separate from RBAC authorization.
</details>

---

### Question 55

Which NIST publication provides a comprehensive catalog of security and privacy controls for information systems?

A. NIST SP 800-53  
B. NIST SP 800-190  
C. NIST CSF  
D. NIST SP 800-63

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** NIST SP 800-53 provides a catalog of security and privacy controls organized into families (Access Control, Audit, System Protection, etc.) that organizations use to protect information systems against a broad range of threats.

**Why others are wrong:** B: NIST SP 800-190 specifically addresses container security, not a comprehensive control catalog. C: NIST CSF is a high-level risk management framework with five functions, not a detailed control catalog. D: NIST SP 800-63 covers digital identity guidelines.
</details>

---

### Question 56

What does SOC 2 Type II assess compared to SOC 2 Type I?

A. It assesses a larger number of security controls  
B. It evaluates the operational effectiveness of controls over a period of time, not just their design  
C. It only applies to cloud-native organizations  
D. It replaces the need for ISO 27001 certification

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** SOC 2 Type II evaluates whether security controls are not only properly designed (Type I) but also operating effectively over a specified audit period (typically 6-12 months). This provides stronger assurance of sustained security practices.

**Why others are wrong:** A: Both types can assess the same controls; the difference is point-in-time vs. over a period. C: SOC 2 applies to any service organization, not just cloud-native ones. D: SOC 2 and ISO 27001 are separate frameworks; one does not replace the other.
</details>

---

### Question 57

What does kube-bench check a Kubernetes cluster against?

A. OWASP Top 10 web vulnerabilities  
B. CIS Kubernetes Benchmark security configuration recommendations  
C. CVE vulnerability databases  
D. Kubernetes API deprecation warnings

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** kube-bench runs automated checks against the CIS Kubernetes Benchmark, which provides prescriptive configuration recommendations for securing the control plane, worker nodes, etcd, policies, and network settings.

**Why others are wrong:** A: OWASP Top 10 addresses web application security, not cluster configuration. C: CVE scanning is performed by vulnerability scanners like Trivy, not kube-bench. D: API deprecation checks are handled by tools like pluto or kubent.
</details>

---

### Question 58

What is kubescape primarily used for?

A. Managing Kubernetes cluster upgrades  
B. Scanning clusters for security risks, misconfigurations, and compliance against frameworks like NSA-CISA and MITRE ATT&CK  
C. Deploying Helm charts to production clusters  
D. Monitoring pod CPU and memory usage

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Kubescape is a Kubernetes security platform that scans clusters, YAML manifests, and Helm charts against multiple security frameworks including NSA-CISA hardening guidelines and MITRE ATT&CK for Containers, identifying misconfigurations and compliance gaps.

**Why others are wrong:** A: Cluster upgrades are managed by tools like kubeadm, not kubescape. C: Helm chart deployment is done by Helm itself, not kubescape. D: Resource monitoring is handled by tools like Prometheus and metrics-server.
</details>

---

### Question 59

What does SLSA Level 3 require beyond Level 2?

A. Source code must be written in a memory-safe language  
B. The build process must run on a hardened, ephemeral build platform with non-falsifiable provenance  
C. All dependencies must be open source  
D. The software must pass penetration testing

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** SLSA (Supply-chain Levels for Software Artifacts) Level 3 requires builds to be performed on a hardened build platform where the provenance is non-falsifiable. The build environment must be ephemeral and isolated to prevent tampering.

**Why others are wrong:** A: SLSA does not mandate specific programming languages. C: SLSA focuses on build integrity and provenance, not dependency licensing. D: Penetration testing is not a SLSA requirement.
</details>

---

### Question 60

How does policy-as-code automation improve Kubernetes compliance?

A. By replacing all manual security reviews with AI  
B. By codifying compliance rules as machine-enforceable policies that are consistently applied during admission and CI/CD  
C. By eliminating the need for audit logs  
D. By automatically upgrading Kubernetes to the latest version

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Policy-as-code transforms compliance requirements into versioned, testable, and automatically enforced policies. Tools like OPA Gatekeeper and Kyverno apply these policies at admission time, ensuring continuous compliance without manual intervention.

**Why others are wrong:** A: Policy-as-code supplements manual reviews but does not fully replace human oversight. C: Audit logs remain essential for compliance evidence and incident investigation. D: Cluster upgrades are a separate operational concern.
</details>

---

## Answer Key

| Q# | Answer | Domain |
|----|--------|--------|
| 1 | B | Cloud Native Security |
| 2 | B | Cloud Native Security |
| 3 | C | Cloud Native Security |
| 4 | B | Cloud Native Security |
| 5 | B | Cloud Native Security |
| 6 | B | Cloud Native Security |
| 7 | B | Cloud Native Security |
| 8 | D | Cloud Native Security |
| 9 | B | Cluster Component Security |
| 10 | C | Cluster Component Security |
| 11 | B | Cluster Component Security |
| 12 | B | Cluster Component Security |
| 13 | C | Cluster Component Security |
| 14 | A | Cluster Component Security |
| 15 | B | Cluster Component Security |
| 16 | C | Cluster Component Security |
| 17 | C | Cluster Component Security |
| 18 | B | Cluster Component Security |
| 19 | B | Cluster Component Security |
| 20 | C | Cluster Component Security |
| 21 | B | Cluster Component Security |
| 22 | C | Kubernetes Security Fundamentals |
| 23 | C | Kubernetes Security Fundamentals |
| 24 | B | Kubernetes Security Fundamentals |
| 25 | C | Kubernetes Security Fundamentals |
| 26 | D | Kubernetes Security Fundamentals |
| 27 | B | Kubernetes Security Fundamentals |
| 28 | C | Kubernetes Security Fundamentals |
| 29 | B | Kubernetes Security Fundamentals |
| 30 | C | Kubernetes Security Fundamentals |
| 31 | B | Kubernetes Security Fundamentals |
| 32 | B | Kubernetes Security Fundamentals |
| 33 | B | Kubernetes Security Fundamentals |
| 34 | B | Kubernetes Security Fundamentals |
| 35 | B | Kubernetes Threat Model |
| 36 | C | Kubernetes Threat Model |
| 37 | B | Kubernetes Threat Model |
| 38 | B | Kubernetes Threat Model |
| 39 | B | Kubernetes Threat Model |
| 40 | A | Kubernetes Threat Model |
| 41 | B | Kubernetes Threat Model |
| 42 | B | Kubernetes Threat Model |
| 43 | B | Kubernetes Threat Model |
| 44 | B | Kubernetes Threat Model |
| 45 | B | Platform Security |
| 46 | B | Platform Security |
| 47 | B | Platform Security |
| 48 | B | Platform Security |
| 49 | B | Platform Security |
| 50 | B | Platform Security |
| 51 | B | Platform Security |
| 52 | B | Platform Security |
| 53 | B | Platform Security |
| 54 | B | Platform Security |
| 55 | A | Compliance and Security Frameworks |
| 56 | B | Compliance and Security Frameworks |
| 57 | B | Compliance and Security Frameworks |
| 58 | B | Compliance and Security Frameworks |
| 59 | B | Compliance and Security Frameworks |
| 60 | B | Compliance and Security Frameworks |

---

## Scoring Guide

| Score | Rating | Recommendation |
|-------|--------|----------------|
| 90-100% (54-60) | Excellent | You are well-prepared for the exam. |
| 75-89% (45-53) | Good | Review missed topics and retake in a few days. |
| 60-74% (36-44) | Needs Improvement | Revisit domain study material before retaking. |
| Below 60% (<36) | Not Ready | Complete the full study guide before attempting again. |

### Domain-Specific Scoring

| Domain | Questions | Your Score |
|--------|-----------|------------|
| Cloud Native Security | Q1-Q8 (8) | ___ / 8 |
| Cluster Component Security | Q9-Q21 (13) | ___ / 13 |
| Kubernetes Security Fundamentals | Q22-Q34 (13) | ___ / 13 |
| Kubernetes Threat Model | Q35-Q44 (10) | ___ / 10 |
| Platform Security | Q45-Q54 (10) | ___ / 10 |
| Compliance and Security Frameworks | Q55-Q60 (6) | ___ / 6 |
| **Total** | **60** | **___ / 60** |
