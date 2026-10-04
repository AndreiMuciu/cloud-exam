# KCSA Mock Exam - Set 1

## Exam Information

- **Total Questions:** 60
- **Time Limit:** 90 minutes
- **Passing Score:** 75% (45 correct answers)
- **Instructions:** Choose the BEST answer for each question

## Domain Distribution

- Overview of Cloud Native Security: Questions 1-8 (14%)
- Kubernetes Cluster Component Security: Questions 9-21 (22%)
- Kubernetes Security Fundamentals: Questions 22-34 (22%)
- Kubernetes Threat Model: Questions 35-44 (16%)
- Platform Security: Questions 45-54 (16%)
- Compliance and Security Frameworks: Questions 55-60 (10%)

---

## Questions

### Question 1

A security architect is classifying controls for a new Kubernetes deployment. Which of the following security controls belongs to the **Cluster** layer of the 4Cs model?

A. Configuring VPC security groups to restrict traffic to the Kubernetes nodes  
B. Enforcing a NetworkPolicy that denies all ingress traffic by default  
C. Scanning container images for known CVEs before pushing to a registry  
D. Implementing input validation in the application to prevent SQL injection

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Network Policies are a Kubernetes-native mechanism that controls pod-to-pod and pod-to-external traffic at the cluster level. They are configured as Kubernetes API resources and enforced by the CNI plugin, making them a Cluster layer control.

**Why others are wrong:**

- **A:** VPC security groups are cloud provider infrastructure controls, placing them in the Cloud layer.
- **C:** Image scanning targets the container artifact itself and is a Container layer control.
- **D:** Input validation is implemented in the application source code, making it a Code layer control.

</details>

---

### Question 2

Your organization runs workloads on AWS EKS. The cloud operations team manages the underlying EC2 instances and VPC networking, while the platform team manages Kubernetes RBAC and admission controllers. A developer asks who is responsible for ensuring container images do not run as root. Under the shared responsibility model, who owns this responsibility?

A. AWS, because it provides the underlying compute infrastructure  
B. The cloud operations team, because they manage the EC2 instances  
C. The platform team and development team, because container security context is configured in pod specifications  
D. The Kubernetes project maintainers, because they define Pod Security Standards

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** In the shared responsibility model, the cloud provider (AWS) is responsible for the Cloud layer infrastructure. Ensuring containers run as non-root is a Container layer concern that falls on the teams managing the Kubernetes cluster configuration (platform team enforcing PSS/PSA) and the teams writing the pod specifications (developers setting securityContext). Both the platform team and developers share this responsibility.

**Why others are wrong:**

- **A:** AWS manages infrastructure (Cloud layer) but has no responsibility for how container images are configured inside the cluster.
- **B:** The cloud operations team manages the VMs and networking, not the container-level security settings within Kubernetes.
- **D:** Kubernetes maintainers define the standards but do not enforce them in your cluster; that is the operator's responsibility.

</details>

---

### Question 3

An organization wants to reduce the attack surface of its container images in production. Which approach is MOST effective?

A. Use a full Ubuntu base image and remove unnecessary packages after build  
B. Use distroless images that contain only the application and its runtime dependencies  
C. Use the latest tag for base images to always get security patches automatically  
D. Run all containers as root to avoid permission errors during package removal

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Distroless images contain only the application binary and its runtime dependencies, with no shell, package manager, or unnecessary utilities. This dramatically reduces the attack surface because an attacker who compromises the container has far fewer tools available for exploitation or lateral movement.

**Why others are wrong:**

- **A:** Starting with a full image and removing packages is less effective because it relies on knowing exactly what to remove, and residual files may remain in earlier image layers.
- **C:** Using the `latest` tag is a security anti-pattern because it makes builds non-reproducible and may pull untested or potentially compromised images.
- **D:** Running as root is a significant security risk and the opposite of container hardening best practices.

</details>

---

### Question 4

A team is deploying a payment processing application on Kubernetes. The security team asks you to classify the following control: "Encrypt all data in etcd at rest using an EncryptionConfiguration with AES-CBC." Which 4Cs layer does this control belong to?

A. Cloud  
B. Cluster  
C. Container  
D. Code

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Encrypting data at rest in etcd is a Cluster layer control. The EncryptionConfiguration is a Kubernetes API server configuration that protects the cluster's backing store. etcd is a core cluster component, and encrypting its data is part of securing the Kubernetes cluster itself.

**Why others are wrong:**

- **A:** Cloud layer encryption refers to infrastructure-level encryption services like AWS KMS disk encryption or VPC-level TLS, not Kubernetes-specific etcd encryption.
- **C:** Container layer controls involve image scanning, SecurityContext settings, and runtime security for individual containers.
- **D:** Code layer controls involve TLS in application code, dependency scanning, and input validation.

</details>

---

### Question 5

A CIS Kubernetes Benchmark scan reveals that the kubelet on several worker nodes has `--anonymous-auth=true` and `--read-only-port=10255`. What is the MOST critical security risk this creates?

A. The kubelet will fail to register with the API server  
B. Unauthenticated users can list running pods and execute commands in containers via the kubelet API  
C. The kubelet cannot communicate with etcd to retrieve pod specifications  
D. Container images will not be pulled because the kubelet lacks authentication credentials

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** With anonymous authentication enabled, the kubelet API on port 10250 accepts unauthenticated requests. The kubelet exposes endpoints like `/pods`, `/run`, and `/exec` that allow listing all pods on the node and executing arbitrary commands inside containers. The read-only port (10255) additionally exposes pod and node information over unencrypted HTTP without any authentication. Together, these misconfigurations allow full reconnaissance and command execution by any network-reachable attacker.

**Why others are wrong:**

- **A:** Anonymous auth settings do not affect kubelet registration with the API server; the kubelet uses its own client certificate for that.
- **C:** The kubelet never communicates directly with etcd; it communicates with the API server, which is the only component that talks to etcd.
- **D:** Image pulling is handled by the container runtime and configured through image pull secrets, not kubelet authentication settings.

</details>

---

### Question 6

Which of the following correctly describes the principle of **defense in depth** in the context of the 4Cs model?

A. Each inner layer compensates for weaknesses in the outer layers, so only the Code layer needs to be fully secured  
B. Security at any layer depends on the security of all outer layers; multiple independent layers of security work together  
C. The Cloud layer alone provides sufficient security because it is the outermost boundary  
D. All four layers must have identical security policies to maintain consistency

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Defense in depth means that multiple independent layers of security work together so that if one layer is breached, the others still provide protection. In the 4Cs model, each layer nests inside the one above it, and you cannot address security weaknesses in an outer layer by adding controls to an inner layer. Each layer adds protection independently.

**Why others are wrong:**

- **A:** Inner layers cannot compensate for weaknesses in outer layers. If the Cloud layer is insecure, no amount of Code-level security will protect the workloads.
- **C:** No single layer provides sufficient security on its own; that is the entire point of defense in depth.
- **D:** Each layer has different security controls appropriate to its scope; they do not need identical policies.

</details>

---

### Question 7

Your CI/CD pipeline uses Trivy to scan container images. A scan reveals a CRITICAL CVE in the `curl` package of your base image. Which action should you take FIRST?

A. Immediately deploy the image to production and patch it later with a rolling update  
B. Update the base image to a patched version that resolves the CVE, rebuild, and rescan  
C. Add the CVE to an ignore list so the pipeline does not block future deployments  
D. Switch from Trivy to a different scanner that might not detect the vulnerability

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The correct response to a CRITICAL CVE is to update the base image to a version that includes the fix, rebuild the application image, and rescan to confirm the vulnerability is resolved. This directly addresses the security risk before the image reaches production.

**Why others are wrong:**

- **A:** Deploying a known critically vulnerable image to production violates security best practices and exposes the application to exploitation.
- **C:** Ignoring critical CVEs defeats the purpose of vulnerability scanning and leaves the organization exposed.
- **D:** Switching scanners to avoid detection does not remediate the vulnerability and is a dangerous approach to security.

</details>

---

### Question 8

An organization runs multi-tenant workloads on a shared Kubernetes cluster. Which combination of isolation techniques provides the STRONGEST workload isolation?

A. Separate namespaces with RBAC, NetworkPolicies, and ResourceQuotas  
B. A single namespace with pod labels for logical separation  
C. Separate namespaces with RBAC, NetworkPolicies, ResourceQuotas, Pod Security Standards, and sandboxed runtimes (gVisor/Kata)  
D. Separate clusters for each tenant with no inter-cluster communication

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** This combination provides the strongest isolation within a shared cluster: namespaces provide logical boundaries, RBAC restricts API access, NetworkPolicies enforce network segmentation, ResourceQuotas prevent resource exhaustion, Pod Security Standards enforce container hardening, and sandboxed runtimes (gVisor or Kata Containers) provide kernel-level or VM-level isolation to prevent container escape attacks.

**Why others are wrong:**

- **A:** This is a good baseline but lacks the additional protection of Pod Security Standards enforcement and sandboxed runtimes for kernel-level isolation.
- **B:** A single namespace with labels provides no meaningful security isolation; it is purely organizational.
- **D:** While separate clusters do provide strong isolation, the question asks about workload isolation techniques within the context of the available options. Option D also introduces significant operational overhead and may not be practical. Option C provides the strongest multi-layered isolation on a shared cluster.

</details>

---

### Question 9

You are reviewing the API server configuration on a kubeadm cluster. The following flag is set: `--authorization-mode=Node,RBAC`. What is the purpose of including the **Node** authorization mode alongside RBAC?

A. It allows nodes to authenticate to the API server using their hostname  
B. It ensures kubelets can only access API objects related to pods scheduled on their specific node  
C. It replaces RBAC for all node-related API requests  
D. It enables automatic TLS certificate rotation for kubelet certificates

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The Node authorization mode is a special-purpose authorizer that specifically handles API requests made by kubelets. It ensures that a kubelet can only read Secrets, ConfigMaps, PersistentVolumes, and PersistentVolumeClaims that are mounted by pods scheduled on that kubelet's node. It also restricts kubelets to only modifying their own Node object and the status of pods on their node.

**Why others are wrong:**

- **A:** Node authorization handles authorization decisions, not authentication. Kubelets authenticate using client certificates with the identity `system:node:<nodeName>`.
- **C:** Node authorization does not replace RBAC; it works alongside it. Authorization modes are evaluated in order, and both can contribute to the authorization decision.
- **D:** Certificate rotation is handled by the kubelet configuration settings `rotateCertificates` and `serverTLSBootstrap`, not by the authorization mode.

</details>

---

### Question 10

An administrator discovers that secrets in etcd are stored in base64 encoding but are NOT encrypted at rest. Which step is required to enable encryption at rest for secrets in etcd?

A. Set the `--etcd-encryption=true` flag on the etcd server  
B. Create an EncryptionConfiguration file and pass it to the API server with `--encryption-provider-config`  
C. Enable TLS on the etcd client port to automatically encrypt all stored data  
D. Configure the kubelet with `--secret-encryption=aes256` to encrypt secrets before sending them to the API server

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Encryption at rest for data stored in etcd is configured on the API server, not on etcd itself. You create an `EncryptionConfiguration` resource that specifies which resources to encrypt (e.g., secrets) and which encryption provider to use (e.g., `aescbc`, `aesgcm`, `secretbox`, or `kms`). This file is passed to the API server using the `--encryption-provider-config` flag.

**Why others are wrong:**

- **A:** There is no `--etcd-encryption` flag on etcd. Encryption at rest is managed by the API server, which encrypts data before writing it to etcd.
- **C:** TLS encrypts data in transit between the API server and etcd, but it does not encrypt data at rest on disk.
- **D:** The kubelet does not handle secret encryption. The API server is the only component that writes data to etcd, and it is responsible for encrypting data before persisting it.

</details>

---

### Question 11

A security audit finds that the kubelet on a worker node has `authorization.mode` set to `AlwaysAllow`. What is the security implication, and how should it be remediated?

A. The kubelet will accept any API server instruction without verifying its identity; change to certificate-based authentication  
B. Any authenticated request to the kubelet API will be authorized, allowing any user to exec into containers on that node; change the authorization mode to `Webhook`  
C. The kubelet will ignore RBAC policies from the API server; reinstall the kubelet to restore defaults  
D. The kubelet will allow any container to run as root; change the pod security policy on the node

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** When the kubelet authorization mode is set to `AlwaysAllow`, every authenticated request to the kubelet API on port 10250 is authorized regardless of who made it. This means any user or service with network access and valid credentials can use the kubelet's `/exec`, `/run`, and `/logs` endpoints to execute commands inside any container running on that node. The remediation is to set `authorization.mode: Webhook`, which causes the kubelet to delegate authorization decisions to the API server, leveraging RBAC.

**Why others are wrong:**

- **A:** Authorization mode controls what authenticated users can do, not how identities are verified. Authentication and authorization are separate concerns.
- **C:** Reinstalling the kubelet is not necessary; changing the configuration setting is sufficient. Also, `AlwaysAllow` does not mean RBAC is ignored for API server requests.
- **D:** Kubelet authorization mode does not control whether containers run as root; that is governed by SecurityContext and Pod Security Standards.

</details>

---

### Question 12

Which container runtime provides the **strongest isolation** by running each pod inside a lightweight virtual machine with its own guest kernel?

A. runc  
B. containerd  
C. gVisor (runsc)  
D. Kata Containers

<details><summary>Answer & Explanation</summary>

**Correct Answer: D**

**Why D is correct:** Kata Containers runs each container or pod inside a lightweight virtual machine with its own guest kernel, providing hardware-level isolation. This is the strongest isolation available for containerized workloads because the workload has no direct access to the host kernel.

**Why others are wrong:**

- **A:** runc is the standard OCI runtime that uses Linux namespaces and cgroups for isolation but shares the host kernel, providing the weakest isolation boundary.
- **B:** containerd is a high-level container runtime (CRI runtime) that manages container lifecycle; it is not a low-level OCI runtime and delegates to runc or other runtimes for actual container execution.
- **C:** gVisor intercepts system calls in a user-space kernel, which provides stronger isolation than runc but still runs on the host kernel, unlike Kata's VM-based approach.

</details>

---

### Question 13

You need to run untrusted third-party code in your Kubernetes cluster alongside trusted production workloads. Which Kubernetes resource allows you to specify that the untrusted pods should use a sandboxed runtime like gVisor?

A. PodSecurityPolicy  
B. RuntimeClass  
C. SecurityContext  
D. LimitRange

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** RuntimeClass is a Kubernetes resource that allows you to select different container runtimes for different workloads. By creating a RuntimeClass that references the gVisor handler and setting `runtimeClassName` in the pod specification, you can ensure untrusted workloads run in a sandboxed runtime while trusted workloads use the default runc runtime.

**Why others are wrong:**

- **A:** PodSecurityPolicy was deprecated and removed in Kubernetes v1.25. It controlled security constraints on pods but did not allow selecting different container runtimes.
- **C:** SecurityContext configures container-level security settings like running as non-root, dropping capabilities, and setting seccomp profiles, but it cannot change the underlying container runtime.
- **D:** LimitRange sets default and maximum resource limits (CPU, memory) for containers in a namespace; it has nothing to do with container runtime selection.

</details>

---

### Question 14

What is the default port on which the kubelet exposes its HTTPS API, and which port should be set to `0` to disable unauthenticated access?

A. HTTPS API on port 6443; disable port 2379  
B. HTTPS API on port 10250; disable port 10255  
C. HTTPS API on port 10255; disable port 10250  
D. HTTPS API on port 8080; disable port 443

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The kubelet exposes its authenticated HTTPS API on port 10250, which handles operations like exec, logs, and metrics. Port 10255 is the read-only HTTP port that historically served pod and node information without any authentication. Setting `readOnlyPort: 0` in the kubelet configuration disables this unauthenticated endpoint.

**Why others are wrong:**

- **A:** Port 6443 is the kube-apiserver's default HTTPS port, and port 2379 is the etcd client port. Neither is related to the kubelet.
- **C:** This reverses the ports. Port 10255 is the read-only port (which should be disabled), and port 10250 is the HTTPS API (which should remain active with proper authentication).
- **D:** Port 8080 was historically used as the insecure API server port (removed in v1.24+), and port 443 is a generic HTTPS port, neither of which are kubelet ports.

</details>

---

### Question 15

You are configuring etcd security for a production cluster. Which combination of settings ensures that communication between etcd members is authenticated and encrypted?

A. `--peer-cert-file`, `--peer-key-file`, `--peer-trusted-ca-file`, and `--peer-client-cert-auth=true`  
B. `--cert-file`, `--key-file`, and `--trusted-ca-file` only  
C. `--encryption-provider-config` with an `aescbc` provider  
D. `--etcd-servers=https://127.0.0.1:2379` on the API server

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** Peer-to-peer communication between etcd members requires its own set of TLS certificates. The `--peer-cert-file` and `--peer-key-file` provide the TLS certificate and key for peer communication, `--peer-trusted-ca-file` specifies the CA to verify peer certificates, and `--peer-client-cert-auth=true` requires peers to present valid client certificates. Together, these settings ensure that only authorized etcd members with valid certificates can join the cluster, and all peer traffic is encrypted.

**Why others are wrong:**

- **B:** These flags configure client-to-etcd TLS (e.g., API server connecting to etcd), not peer-to-peer TLS between etcd members.
- **C:** The encryption provider config handles encryption of data at rest within etcd, not encryption of network communication between etcd members.
- **D:** This flag is on the API server and configures the etcd endpoint URL; it does not configure etcd's own peer communication security.

</details>

---

### Question 16

An administrator wants to ensure that only the kube-apiserver can connect to etcd. Which TWO measures should be implemented? (Choose the best single answer that covers both measures.)

A. Run etcd with `--client-cert-auth=true` and use firewall rules to restrict port 2379 to only the API server IP  
B. Disable TLS on etcd and rely on the API server's built-in authentication  
C. Configure etcd to listen only on `localhost` and run the API server on a different host  
D. Set `--anonymous-auth=false` on the API server to prevent unauthorized etcd connections

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** Enabling `--client-cert-auth=true` on etcd ensures that any client connecting to etcd must present a valid TLS client certificate signed by the trusted CA. Combined with firewall rules that restrict port 2379 access to only the API server's IP address, this provides both authentication (certificate validation) and network-level access control, ensuring only the API server can reach etcd.

**Why others are wrong:**

- **B:** Disabling TLS removes encryption and authentication, making etcd accessible to anyone with network access. This is the opposite of hardening.
- **C:** If etcd listens only on localhost and the API server is on a different host, the API server cannot reach etcd at all.
- **D:** The `--anonymous-auth` flag on the API server controls authentication to the API server, not connections from the API server to etcd. These are completely different communication channels.

</details>

---

### Question 17

The API server request flow processes requests through three security gates in a specific order. What is the correct order?

A. Admission Control -> Authentication -> Authorization  
B. Authorization -> Authentication -> Admission Control  
C. Authentication -> Authorization -> Admission Control  
D. Authentication -> Admission Control -> Authorization

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** Every request to the kube-apiserver passes through three gates in this exact order: (1) Authentication determines WHO the requester is, (2) Authorization determines WHAT the authenticated user is allowed to do, and (3) Admission Control determines whether the request SHOULD be allowed or modified before being persisted to etcd.

**Why others are wrong:**

- **A:** Admission control is the last step, not the first. You must know who the user is (authentication) and whether they are allowed (authorization) before evaluating admission policies.
- **B:** Authorization cannot happen before authentication because you must know the identity of the requester before you can check their permissions.
- **D:** Admission control runs after authorization, not between authentication and authorization.

</details>

---

### Question 18

Which kube-proxy mode uses the Linux kernel's netfilter framework to create DNAT rules for routing Service traffic to backend pods, and is the default mode in most Kubernetes clusters?

A. userspace mode  
B. iptables mode  
C. IPVS mode  
D. eBPF mode

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** iptables mode is the default proxy mode in most Kubernetes clusters. It uses the Linux kernel's netfilter/iptables framework to create DNAT (Destination Network Address Translation) rules that rewrite Service ClusterIP addresses to the actual pod IP addresses. All packet processing happens in kernel space, making it efficient for most workloads.

**Why others are wrong:**

- **A:** Userspace mode was the original kube-proxy implementation where traffic was proxied through a userspace process. It is the slowest mode and is rarely used today.
- **C:** IPVS mode uses the kernel's IP Virtual Server for load balancing, which scales better with large numbers of services but is not the default mode.
- **D:** eBPF is not a kube-proxy mode; it is an alternative approach used by CNI plugins like Cilium that can replace kube-proxy entirely.

</details>

---

### Question 19

You are configuring a pod's security context for a container that processes sensitive data. Which configuration ensures the container cannot gain additional privileges beyond what it was started with?

A. `readOnlyRootFilesystem: true`  
B. `runAsNonRoot: true`  
C. `allowPrivilegeEscalation: false`  
D. `privileged: false`

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** Setting `allowPrivilegeEscalation: false` ensures that the container process cannot gain more privileges than its parent process. This prevents exploits that use setuid binaries, `no_new_privs` flag abuse, or other mechanisms to escalate from an unprivileged user to root within the container.

**Why others are wrong:**

- **A:** `readOnlyRootFilesystem: true` prevents writing to the container's root filesystem, which is a good hardening measure but does not prevent privilege escalation.
- **B:** `runAsNonRoot: true` ensures the container runs as a non-root user, but a process running as non-root can still escalate privileges through setuid binaries or other mechanisms if `allowPrivilegeEscalation` is not set to `false`.
- **D:** `privileged: false` ensures the container does not run in privileged mode (which gives access to all host devices and capabilities), but it does not prevent privilege escalation within the container's own security context.

</details>

---

### Question 20

A StorageClass is configured with `reclaimPolicy: Retain`. A developer deletes the PersistentVolumeClaim (PVC) that was bound to a PersistentVolume (PV). What happens to the data on the PV?

A. The data is immediately deleted and the PV is available for a new claim  
B. The data is preserved on the PV, which remains in a Released state and must be manually cleaned up  
C. The data is encrypted and the PV transitions to an Available state for reuse  
D. The PV and its data are moved to a backup location before the storage is reclaimed

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** With the `Retain` reclaim policy, when a PVC is deleted, the PV transitions to a `Released` state. The data on the underlying storage volume is preserved, but the PV is not available for new claims until an administrator manually handles it (cleans up the data and either deletes or reclaims the PV). This is important from a security perspective because sensitive data may persist and be accessible if not properly wiped.

**Why others are wrong:**

- **A:** This describes the behavior of the `Delete` reclaim policy, not `Retain`.
- **C:** The data is not automatically encrypted, and the PV does not become Available. It stays in Released state, which cannot be bound to a new PVC without manual intervention.
- **D:** Kubernetes does not automatically create backups when a PVC is deleted. The data simply remains on the storage as-is.

</details>

---

### Question 21

Which of the following is a security advantage of Cilium's eBPF-based networking over traditional kube-proxy with iptables?

A. Cilium eliminates the need for NetworkPolicies because eBPF provides built-in isolation  
B. Cilium can enforce Layer 7 (application-layer) network policies, such as filtering HTTP methods and paths  
C. Cilium automatically encrypts all pod-to-pod traffic without any configuration  
D. Cilium replaces the need for TLS between services because eBPF inspects encrypted traffic

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Cilium uses eBPF programs running in the Linux kernel to provide advanced networking features, including Layer 7 (L7) network policies. This means Cilium can filter traffic based on HTTP methods (GET, POST), URL paths, DNS queries, and other application-layer attributes, going beyond the Layer 3/4 (IP and port) filtering that standard Kubernetes NetworkPolicies and kube-proxy provide.

**Why others are wrong:**

- **A:** Cilium does not eliminate the need for NetworkPolicies. In fact, it enhances them by supporting both standard Kubernetes NetworkPolicies and its own CiliumNetworkPolicy resources with extended features.
- **C:** While Cilium supports transparent encryption (via WireGuard or IPsec), it does not enable encryption automatically without configuration.
- **D:** Cilium does not replace TLS. L7 inspection works on unencrypted traffic or traffic terminated at the pod. It cannot break TLS encryption between services.

</details>

---

### Question 22

A namespace has the following labels:

```yaml
labels:
  pod-security.kubernetes.io/enforce: baseline
  pod-security.kubernetes.io/warn: restricted
  pod-security.kubernetes.io/audit: restricted
```

A developer deploys a pod that sets `hostNetwork: true`. What will happen?

A. The pod will be created successfully with no warnings  
B. The pod will be created with a warning about violating the restricted level  
C. The pod will be rejected because `hostNetwork: true` violates the baseline level  
D. The pod will be created but a warning will appear only in the audit log

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The `hostNetwork: true` setting is blocked at the **Baseline** level. Since the namespace has `enforce: baseline`, any pod that violates the Baseline Pod Security Standard will be rejected. The `hostNetwork`, `hostPID`, and `hostIPC` fields must be `false` or unset to comply with the Baseline level. The enforce mode causes the API server to reject the pod creation request.

**Why others are wrong:**

- **A:** The pod cannot be created successfully because it violates the enforced baseline level.
- **B:** The pod would receive a warning if it only violated the `warn: restricted` level. However, since it also violates the stricter `enforce: baseline` level, it is rejected outright, not just warned.
- **D:** The audit mode logs violations but does not block them. However, the enforce mode takes precedence and rejects the pod before audit logging alone would matter.

</details>

---

### Question 23

Which Pod Security Standards level requires that `allowPrivilegeEscalation` must be set to `false`, `capabilities.drop` must include `ALL`, and a seccomp profile must be explicitly set to `RuntimeDefault` or `Localhost`?

A. Privileged  
B. Baseline  
C. Restricted  
D. These requirements are not part of any standard PSS level

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The Restricted level is the most stringent Pod Security Standard. It requires explicit hardening settings including `allowPrivilegeEscalation: false`, `capabilities.drop: ["ALL"]`, `runAsNonRoot: true`, and a seccomp profile set to either `RuntimeDefault` or `Localhost`. These settings enforce current pod hardening best practices.

**Why others are wrong:**

- **A:** The Privileged level is completely unrestricted and imposes no requirements whatsoever.
- **B:** The Baseline level prevents known privilege escalations (like privileged containers and hostNetwork) but does NOT require `allowPrivilegeEscalation: false`, dropping all capabilities, or setting a seccomp profile. These are additional restrictions unique to the Restricted level.
- **D:** These requirements are explicitly defined as part of the Restricted PSS level in the Kubernetes documentation.

</details>

---

### Question 24

The Pod Security Admission controller operates in three modes. Which mode **rejects** pods that violate the configured Pod Security Standard level?

A. audit  
B. warn  
C. enforce  
D. deny

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The `enforce` mode actively rejects (blocks) pods that violate the configured Pod Security Standard level. If a pod does not comply, the API server returns an error and the pod is not created.

**Why others are wrong:**

- **A:** The `audit` mode records violations in the API server audit log but allows the pod to be created. It is non-blocking.
- **B:** The `warn` mode sends a warning message to the API client (visible in kubectl output) but also allows the pod to be created. It is non-blocking.
- **D:** There is no `deny` mode in Pod Security Admission. The three valid modes are `enforce`, `audit`, and `warn`.

</details>

---

### Question 25

A security engineer needs to grant a developer read-only access to pods in the `staging` namespace but NOT in any other namespace. Which combination of RBAC resources should be used?

A. ClusterRole with pod read permissions + ClusterRoleBinding to the developer  
B. ClusterRole with pod read permissions + RoleBinding in the `staging` namespace to the developer  
C. Role in the `staging` namespace with pod read permissions + ClusterRoleBinding to the developer  
D. Role in the `staging` namespace with pod read permissions + RoleBinding in a different namespace

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A ClusterRole defines permissions that can be reused across namespaces, and a RoleBinding in the `staging` namespace scopes those permissions to only that namespace. This is a common pattern: define a reusable ClusterRole (like the built-in `view` role) and bind it with a RoleBinding to grant those permissions in a specific namespace only.

**Why others are wrong:**

- **A:** A ClusterRoleBinding grants cluster-wide permissions across ALL namespaces, not just `staging`. The developer would be able to read pods in every namespace.
- **C:** A namespace-scoped Role cannot be referenced by a ClusterRoleBinding. ClusterRoleBindings can only reference ClusterRoles. Also, a ClusterRoleBinding would grant access across all namespaces.
- **D:** A RoleBinding in a different namespace would grant the Role's permissions in that different namespace, not in `staging`.

</details>

---

### Question 26

In Kubernetes RBAC, what is the effect of the following Role definition?

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: secret-manager
  namespace: production
rules:
- apiGroups: [""]
  resources: ["secrets"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["secrets"]
  resourceNames: ["db-credentials"]
  verbs: ["update", "patch"]
```

A. The role grants full read/write access to all secrets in the production namespace  
B. The role allows reading all secrets in the production namespace but only allows updating the specific secret named `db-credentials`  
C. The role allows reading and updating only the secret named `db-credentials`  
D. The role definition is invalid because you cannot mix resourceNames with unrestricted resource rules

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** RBAC rules are additive. The first rule grants `get` and `list` verbs on all secrets in the `production` namespace (no `resourceNames` restriction). The second rule grants `update` and `patch` verbs but only on the specific secret named `db-credentials`. Combined, a user with this role can read (get/list) all secrets but can only modify the one named `db-credentials`.

**Why others are wrong:**

- **A:** The role does not grant `create`, `delete`, or unrestricted `update`/`patch` on all secrets. Write access is limited to the `db-credentials` secret only.
- **C:** The first rule does not have a `resourceNames` restriction, so `get` and `list` apply to ALL secrets in the namespace, not just `db-credentials`.
- **D:** This is perfectly valid RBAC. You can have multiple rules with different restrictions in the same Role, and they are evaluated additively.

</details>

---

### Question 27

Which Kubernetes authentication method is RECOMMENDED for human users in production clusters because it integrates with external identity providers and supports token-based authentication with short-lived credentials?

A. Static token file (`--token-auth-file`)  
B. X.509 client certificates  
C. OpenID Connect (OIDC)  
D. Basic authentication (`--basic-auth-file`)

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** OpenID Connect (OIDC) is the recommended authentication method for human users in production. It integrates with external identity providers (Keycloak, Okta, Azure AD, Google) to provide short-lived JWT tokens, supports group claims for RBAC integration, and leverages existing organizational identity infrastructure. The API server validates the OIDC ID token without needing to contact the identity provider for every request.

**Why others are wrong:**

- **A:** Static token files store credentials in plaintext CSV files, require API server restarts to change, and are explicitly not recommended for production.
- **B:** X.509 client certificates are commonly used for component authentication (kubelet, controller manager) but are problematic for human users because individual certificates cannot be revoked without rotating the entire CA.
- **D:** Basic authentication has been deprecated and removed from Kubernetes. It transmitted credentials in base64 (not encrypted) and is not a valid option in modern clusters.

</details>

---

### Question 28

A ServiceAccount token is automatically mounted into a pod at `/var/run/secrets/kubernetes.io/serviceaccount/token`. Starting with Kubernetes v1.22, what type of token is projected by default?

A. A non-expiring Secret-based token that persists until the Secret is deleted  
B. A bound token that is time-limited, audience-bound, and invalidated when the pod is deleted  
C. An OIDC JWT token issued by the cluster's identity provider  
D. A static bearer token from the token auth file

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Since Kubernetes v1.22, the default service account token projected into pods is a bound ServiceAccount token issued by the TokenRequest API. These tokens are time-limited (default expiration of 1 hour, automatically refreshed by the kubelet), audience-bound (tied to the API server audience), and object-bound (invalidated when the associated pod is deleted). This is a significant security improvement over legacy non-expiring tokens.

**Why others are wrong:**

- **A:** Non-expiring Secret-based tokens were the default before v1.22. Starting in v1.24, automatic creation of Secret-based tokens was removed, and in v1.29, unused legacy tokens are automatically purged.
- **C:** The token is a Kubernetes-native service account token, not an OIDC token from an external identity provider. While the token is a JWT, it is issued by the Kubernetes API server itself.
- **D:** Static bearer tokens from a token auth file are a separate, deprecated authentication mechanism unrelated to ServiceAccount token projection.

</details>

---

### Question 29

An administrator wants to check whether the user `alice` has permission to create deployments in the `production` namespace. Which command should they use?

A. `kubectl get roles -n production | grep alice`  
B. `kubectl auth can-i create deployments -n production --as=alice`  
C. `kubectl describe serviceaccount alice -n production`  
D. `kubectl get clusterrolebindings -o yaml | grep alice`

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The `kubectl auth can-i` command is the standard way to check permissions in Kubernetes. The `--as=alice` flag uses impersonation to test whether the user `alice` can perform the specified action (`create deployments`) in the specified namespace (`production`). It queries the authorization system directly and returns `yes` or `no`.

**Why others are wrong:**

- **A:** Listing roles and grepping for a username does not reveal effective permissions. Permissions come from the combination of Roles/ClusterRoles and their Bindings, and a user's name may not appear directly in a Role definition.
- **C:** `alice` is a human user, not a ServiceAccount. Even if she were a ServiceAccount, `describe` would not show effective permissions across all bound roles.
- **D:** Grepping ClusterRoleBindings for `alice` might reveal some bindings, but it would miss RoleBindings, and it does not evaluate the effective permissions from all sources (multiple roles, group memberships, etc.).

</details>

---

### Question 30

An organization's security policy requires that all RBAC configurations follow the principle of least privilege. Which of the following Role definitions violates this principle?

A. A Role that grants `get`, `list`, and `watch` on pods in the `monitoring` namespace  
B. A ClusterRole that grants `get` on nodes and `get` on `persistentvolumes`  
C. A ClusterRole with `apiGroups: ["*"]`, `resources: ["*"]`, and `verbs: ["*"]`  
D. A Role that grants `create` and `update` on deployments in the `staging` namespace

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** A ClusterRole with wildcards (`*`) for apiGroups, resources, and verbs grants unrestricted access to every resource in the cluster with every possible action. This is equivalent to the built-in `cluster-admin` role and represents the most extreme violation of the least privilege principle. Production environments should never use wildcard permissions except for break-glass emergency accounts.

**Why others are wrong:**

- **A:** Granting read-only access (`get`, `list`, `watch`) to pods in a specific namespace is appropriately scoped and follows least privilege.
- **B:** Granting `get` on cluster-scoped resources like nodes and persistentvolumes is a specific, limited permission appropriate for monitoring or audit use cases.
- **D:** Granting `create` and `update` on deployments in a specific namespace is a reasonably scoped permission for a deployer role in a staging environment.

</details>

---

### Question 31

A developer creates a Kubernetes Secret using `kubectl create secret generic db-pass --from-literal=password=S3cur3P@ss`. Where and how is this secret stored in the cluster by default (without EncryptionConfiguration)?

A. Encrypted with AES-256 in etcd  
B. Base64-encoded (not encrypted) in etcd  
C. Stored as plaintext in the kubelet's local filesystem only  
D. Encrypted with the cluster's TLS CA key in etcd

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** By default, Kubernetes Secrets are stored in etcd encoded in base64, but they are NOT encrypted at rest. Base64 is an encoding scheme, not an encryption method, so anyone with direct access to etcd can decode and read all secrets. Enabling EncryptionConfiguration on the API server is required to actually encrypt secrets at rest.

**Why others are wrong:**

- **A:** Secrets are not encrypted by default. AES-256 encryption requires explicitly configuring an EncryptionConfiguration with a provider like `aescbc` or `aesgcm`.
- **C:** Secrets are stored in etcd, not only on the kubelet filesystem. The kubelet receives secrets from the API server and may cache them, but the primary storage is etcd.
- **D:** The cluster TLS CA key is used for signing certificates, not for encrypting data in etcd. There is no automatic encryption using the CA key.

</details>

---

### Question 32

A security team wants to restrict pod-to-pod traffic so that only the `frontend` pods in the `web` namespace can communicate with the `api` pods in the `backend` namespace on port 8080. Which NetworkPolicy should be applied?

A. An ingress NetworkPolicy in the `backend` namespace selecting `api` pods and allowing traffic from pods with the `frontend` label in the `web` namespace on port 8080  
B. An egress NetworkPolicy in the `web` namespace that blocks all traffic except to port 8080  
C. A NetworkPolicy in the `default` namespace that denies all traffic cluster-wide  
D. An ingress NetworkPolicy in the `web` namespace selecting `frontend` pods and allowing traffic from the `backend` namespace

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** NetworkPolicies are applied in the namespace of the pods they protect. To control who can reach the `api` pods, you create an ingress NetworkPolicy in the `backend` namespace. The policy selects `api` pods using a `podSelector`, then specifies an ingress rule allowing traffic from pods with the `frontend` label in the `web` namespace (using `namespaceSelector` and `podSelector`) on port 8080.

**Why others are wrong:**

- **B:** An egress policy in the `web` namespace would control outbound traffic from `frontend` pods, but it does not restrict who else can reach the `api` pods. Both ingress and egress policies are typically needed for full control, but the question asks specifically about restricting access to the `api` pods.
- **C:** A NetworkPolicy in the `default` namespace only affects pods in the `default` namespace. NetworkPolicies are namespace-scoped and cannot enforce cluster-wide rules from a single namespace.
- **D:** This policy is in the wrong namespace and has the direction reversed. It would control traffic coming INTO `frontend` pods, not traffic going TO `api` pods.

</details>

---

### Question 33

An organization wants to detect unauthorized API calls and data access in their Kubernetes cluster. Which Kubernetes feature should they enable and configure?

A. Container runtime logging with `--log-driver=json-file`  
B. Kubernetes audit logging with an audit policy file passed to `--audit-policy-file` on the API server  
C. kubelet verbose logging with `--v=10`  
D. etcd debug logging with `--log-level=DEBUG`

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Kubernetes audit logging records all requests made to the API server, including who made the request, what action was performed, which resource was affected, and whether it was allowed or denied. The audit policy file defines which events to record and at what level (None, Metadata, Request, RequestResponse). This is the primary mechanism for detecting unauthorized access attempts and maintaining an audit trail.

**Why others are wrong:**

- **A:** Container runtime logging captures application stdout/stderr output from containers, not API server activity. It is useful for application debugging but does not track Kubernetes API calls.
- **C:** Kubelet verbose logging increases the verbosity of kubelet operations (pod lifecycle, volume mounting) but does not capture API server request/response audit data.
- **D:** etcd debug logging shows etcd internal operations (leader election, compaction, key operations) but does not provide structured audit data about who accessed which Kubernetes resources.

</details>

---

### Question 34

Which Kubernetes audit logging level records the request metadata AND the request body, but NOT the response body?

A. None  
B. Metadata  
C. Request  
D. RequestResponse

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The `Request` audit level logs the event metadata (who, what, when, where) plus the full request body that was sent to the API server. This is useful for understanding exactly what changes were requested (e.g., the full pod spec in a create request) without the overhead of also logging potentially large response bodies.

**Why others are wrong:**

- **A:** The `None` level disables audit logging entirely for matching rules. No events are recorded.
- **B:** The `Metadata` level logs only event metadata (user, timestamp, resource, verb, response code) without the request or response body.
- **D:** The `RequestResponse` level logs metadata, the request body, AND the response body. This is the most verbose level and generates the most data.

</details>

---

### Question 35

In the STRIDE threat model, a compromised pod sending API requests using a stolen ServiceAccount token is an example of which threat category?

A. Spoofing  
B. Tampering  
C. Information Disclosure  
D. Denial of Service

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** Spoofing refers to impersonating another entity to gain unauthorized access. When an attacker uses a stolen ServiceAccount token, they are impersonating that ServiceAccount's identity to make API requests. The API server believes the requests come from the legitimate ServiceAccount, which is the definition of spoofing.

**Why others are wrong:**

- **B:** Tampering refers to unauthorized modification of data. While the attacker may tamper with resources after gaining access, the act of using a stolen token to impersonate an identity is specifically spoofing.
- **C:** Information Disclosure refers to unauthorized access to data. The stolen token itself may be a result of information disclosure, but using it to impersonate the ServiceAccount is spoofing.
- **D:** Denial of Service refers to making a system unavailable. Using a stolen token to make API requests is about unauthorized access, not about disrupting availability.

</details>

---

### Question 36

An attacker has gained shell access inside a container running as root with the `SYS_PTRACE` capability. Which attack technique is the attacker MOST likely to attempt next?

A. Modifying the Kubernetes audit log directly  
B. Escaping the container to the host node by exploiting kernel vulnerabilities or accessing the container runtime socket  
C. Directly querying the etcd cluster to extract all secrets  
D. Modifying the API server's RBAC configuration from within the container

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A root container with `SYS_PTRACE` capability has elevated privileges that enable container escape techniques. The attacker can trace and inject into processes, and if combined with other misconfigurations (mounted Docker socket, host PID namespace, or kernel vulnerabilities like CVE-2022-0185), they can break out of the container to the underlying host node. Container breakout is the most impactful next step because it gives access to all containers on the node and potentially the kubelet credentials.

**Why others are wrong:**

- **A:** Kubernetes audit logs are stored outside the container (on the API server node or a remote logging backend). A container cannot directly modify them.
- **C:** etcd is not directly accessible from within a container in a properly configured cluster. etcd listens on the control plane node and requires TLS client certificates for authentication.
- **D:** RBAC configuration is managed through the API server, and modifying it requires appropriate API server permissions, not container-level privileges.

</details>

---

### Question 37

An attacker who has compromised a pod wants to maintain persistent access to the cluster even if the pod is deleted. Which technique would provide the MOST reliable persistence?

A. Writing a file to the container's ephemeral filesystem  
B. Creating a new ClusterRoleBinding that grants `cluster-admin` to an attacker-controlled ServiceAccount  
C. Setting an environment variable with a backdoor command in the running container  
D. Increasing the pod's memory limit to prevent eviction

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Creating a ClusterRoleBinding that grants `cluster-admin` privileges to an attacker-controlled ServiceAccount provides persistent cluster-wide access that survives pod deletion. The RBAC binding is stored in etcd and persists independently of any specific pod. The attacker can use the ServiceAccount token from any pod or even externally to maintain full cluster access.

**Why others are wrong:**

- **A:** Files written to a container's ephemeral filesystem are lost when the pod is deleted or restarted. This provides no persistence.
- **C:** Environment variables exist only in the running process. When the container is restarted or the pod is deleted, the environment variable is gone.
- **D:** Increasing memory limits does not prevent pod deletion by an administrator or controller. It only affects resource-based eviction, and it does not provide any form of persistent access.

</details>

---

### Question 38

Which Kubernetes resource type is MOST commonly abused by attackers to execute code in a cluster after gaining initial access through a compromised CI/CD pipeline?

A. ConfigMap  
B. CronJob  
C. PersistentVolumeClaim  
D. HorizontalPodAutoscaler

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** CronJobs are commonly abused for persistence and execution because they automatically create pods on a schedule. An attacker with permissions to create CronJobs can schedule malicious containers to run repeatedly, even if the original compromised pod is removed. CronJobs provide both execution capability and persistence, making them a prime target for attackers who have gained cluster access.

**Why others are wrong:**

- **A:** ConfigMaps store configuration data and cannot execute code directly. They could be used to store malicious configuration, but they do not provide an execution mechanism.
- **C:** PersistentVolumeClaims provide storage but do not execute code. They could be used to persist malicious data, but they require a pod to mount and use them.
- **D:** HorizontalPodAutoscalers scale existing workloads based on metrics but cannot execute arbitrary code or create new workload types.

</details>

---

### Question 39

A pod is configured with `resources.limits` of 100m CPU and 128Mi memory, but the application occasionally requires 200m CPU during peak load. What is the security-relevant consequence?

A. The container will be terminated (OOMKilled) when it exceeds the CPU limit  
B. The container's CPU will be throttled, potentially causing request timeouts and degraded availability  
C. The pod will be evicted from the node immediately  
D. Kubernetes will automatically increase the CPU limit to match demand

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** CPU limits in Kubernetes cause throttling, not termination. When a container exceeds its CPU limit, the kernel's CFS (Completely Fair Scheduler) throttles the container's CPU usage to the specified limit. This can cause the application to respond slowly, leading to request timeouts, failed health checks, and degraded availability, which is effectively a self-inflicted denial of service condition.

**Why others are wrong:**

- **A:** OOMKilled occurs when a container exceeds its memory limit, not its CPU limit. CPU and memory limits are enforced differently by the kernel.
- **C:** Pod eviction is triggered by node-level resource pressure (such as memory pressure or disk pressure), not by individual container CPU limit exceedance.
- **D:** Kubernetes does not automatically adjust resource limits. Limits are static unless changed by an administrator or a Vertical Pod Autoscaler (which must be explicitly configured).

</details>

---

### Question 40

An attacker performs a DNS spoofing attack within a Kubernetes cluster. Which component is the PRIMARY target of this attack?

A. The kubelet on each worker node  
B. The CoreDNS pods that provide cluster DNS resolution  
C. The etcd cluster storing cluster state  
D. The kube-scheduler that places pods on nodes

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** CoreDNS is the default DNS provider in Kubernetes clusters and resolves service names to ClusterIP addresses. If an attacker can compromise or spoof responses from CoreDNS, they can redirect traffic intended for legitimate services (e.g., `database-service.production.svc.cluster.local`) to attacker-controlled pods, enabling man-in-the-middle attacks, credential theft, and data exfiltration.

**Why others are wrong:**

- **A:** The kubelet manages pod lifecycle on nodes and does not perform DNS resolution for pod-to-pod service discovery. It is not the target of DNS spoofing.
- **C:** etcd stores cluster state and is accessed via the API server using client certificates. DNS is not used to locate etcd endpoints in a properly configured cluster.
- **D:** The kube-scheduler assigns pods to nodes based on resource availability and constraints. It does not use DNS for scheduling decisions and is not targeted by DNS spoofing attacks.

</details>

---

### Question 41

Which of the following is an example of a **privilege escalation** attack in Kubernetes?

A. A user with `create pods` permission creates a pod that mounts the host's `/etc/shadow` file  
B. A user reads the Kubernetes documentation to learn about RBAC  
C. A pod sends DNS queries to resolve service names within the cluster  
D. An administrator reviews audit logs for suspicious activity

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** This is a classic privilege escalation through resource creation. A user who only has permission to create pods should not be able to read the host's `/etc/shadow` file. However, by creating a pod with a hostPath volume mount pointing to `/etc/shadow`, the user leverages pod creation privileges to gain access to sensitive host data they would not otherwise have. This is why admission controllers should restrict hostPath mounts.

**Why others are wrong:**

- **B:** Reading documentation is a normal, legitimate activity with no security implications.
- **C:** DNS queries for service discovery are standard Kubernetes networking behavior and do not involve privilege escalation.
- **D:** Reviewing audit logs is a legitimate security monitoring activity performed by authorized administrators.

</details>

---

### Question 42

An attacker has compromised a pod and wants to discover other services and pods running in the cluster. Which of the following techniques requires the LEAST amount of privileges?

A. Querying the Kubernetes API server to list all pods across all namespaces  
B. Performing DNS lookups against CoreDNS to enumerate services in known namespaces  
C. Accessing the kubelet API on port 10250 to list pods on adjacent nodes  
D. Reading etcd directly to enumerate all cluster resources

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** DNS lookups are available to any pod by default through the cluster DNS (CoreDNS). An attacker can enumerate services by querying DNS for common service names or performing zone transfer attempts (e.g., `dig SRV *.web.production.svc.cluster.local`). This requires no special Kubernetes RBAC permissions or network access beyond what is available to any pod by default, making it the lowest-privilege reconnaissance technique.

**Why others are wrong:**

- **A:** Listing pods across all namespaces requires `list pods` RBAC permission at the cluster scope, which most pods' ServiceAccounts do not have by default.
- **C:** Accessing the kubelet API on port 10250 requires network access to the node and authentication credentials. It is also blocked by NetworkPolicies in well-configured clusters.
- **D:** Reading etcd directly requires TLS client certificates and network access to the control plane, which is the highest-privilege access in the cluster.

</details>

---

### Question 43

In the STRIDE threat model applied to Kubernetes, modifying a running container's filesystem to replace a legitimate binary with a malicious one is an example of which threat?

A. Spoofing  
B. Tampering  
C. Repudiation  
D. Elevation of Privilege

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Tampering refers to the unauthorized modification of data or code. Replacing a legitimate binary inside a running container with a malicious one is a direct modification of the application's code at runtime. This can be mitigated by using `readOnlyRootFilesystem: true` in the container's SecurityContext, which prevents writes to the container's root filesystem.

**Why others are wrong:**

- **A:** Spoofing involves impersonating another identity, not modifying existing data or binaries.
- **C:** Repudiation involves denying that an action was performed. While an attacker might want to hide their tracks, the act of modifying a binary is itself a tampering action.
- **D:** Elevation of Privilege involves gaining higher privileges than originally authorized. While replacing a binary could be a step toward privilege escalation, the act of modifying the filesystem is fundamentally tampering.

</details>

---

### Question 44

An organization wants to protect against a scenario where a compromised container attempts to exfiltrate sensitive data from the cluster's etcd to an external server. Which combination of controls is MOST effective?

A. NetworkPolicies to block egress from application pods to etcd AND to the internet, plus etcd client certificate authentication  
B. Enabling verbose logging on the API server only  
C. Running all pods in privileged mode to enable monitoring  
D. Using the `latest` tag for all container images to ensure patches are applied

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** This combination addresses both attack vectors: NetworkPolicies with egress restrictions prevent application pods from directly accessing the etcd endpoints (typically port 2379/2380 on control plane nodes) and block unauthorized outbound internet traffic to prevent data exfiltration. etcd client certificate authentication ensures that even if network access were obtained, only clients with valid certificates (the API server) can read data from etcd.

**Why others are wrong:**

- **B:** Verbose logging helps with detection after the fact but does not prevent the exfiltration from occurring. Detection without prevention is insufficient.
- **C:** Running pods in privileged mode is a severe security anti-pattern that increases the attack surface rather than reducing it. Privileged containers have full access to the host.
- **D:** Using the `latest` tag does not guarantee patches and creates reproducibility issues. It does not address network-level data exfiltration.

</details>

---

### Question 45

Which admission controller is built into Kubernetes and ensures that new pods are evaluated against the Pod Security Standards configured on their namespace?

A. PodSecurityPolicy  
B. OPA Gatekeeper  
C. PodSecurity (Pod Security Admission)  
D. Kyverno

<details><summary>Answer & Explanation</summary>

**Correct Answer: C**

**Why C is correct:** The PodSecurity admission controller (also called Pod Security Admission or PSA) is the built-in Kubernetes admission controller that enforces Pod Security Standards. It evaluates pods against the Privileged, Baseline, or Restricted levels configured via namespace labels and can enforce, warn, or audit violations. It was introduced as the replacement for PodSecurityPolicy.

**Why others are wrong:**

- **A:** PodSecurityPolicy (PSP) was deprecated in Kubernetes v1.21 and removed in v1.25. It is no longer a valid admission controller in current Kubernetes versions.
- **B:** OPA Gatekeeper is a third-party admission controller that uses the Open Policy Agent (OPA) policy engine. It is not built into Kubernetes.
- **D:** Kyverno is a third-party policy engine for Kubernetes that operates as an admission controller but is not built into Kubernetes.

</details>

---

### Question 46

An organization uses OPA Gatekeeper to enforce policies in their Kubernetes cluster. What is the relationship between a **ConstraintTemplate** and a **Constraint** in Gatekeeper?

A. A ConstraintTemplate defines the Rego policy logic and parameters, while a Constraint creates an instance of that template with specific parameter values  
B. A Constraint defines the policy logic, and a ConstraintTemplate applies it to specific namespaces  
C. ConstraintTemplates and Constraints are interchangeable terms for the same resource  
D. A ConstraintTemplate is only used for auditing, while a Constraint is used for enforcement

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** In OPA Gatekeeper, a ConstraintTemplate defines a reusable policy by specifying the Rego policy logic and declaring input parameters. A Constraint is an instance of a ConstraintTemplate that provides specific parameter values and defines which resources it applies to (using match criteria like kinds, namespaces, and label selectors). This separation allows a single policy template to be reused with different configurations.

**Why others are wrong:**

- **B:** The policy logic (Rego code) is defined in the ConstraintTemplate, not the Constraint. The Constraint provides parameters and match criteria.
- **C:** They are distinct resources with different purposes. ConstraintTemplates define the schema and logic; Constraints instantiate them.
- **D:** Both ConstraintTemplates and Constraints work together for both auditing and enforcement. Gatekeeper supports an `enforcementAction` field on Constraints that can be set to `deny`, `warn`, or `dryrun`.

</details>

---

### Question 47

A platform engineer is evaluating Kyverno as a policy engine. Which feature distinguishes Kyverno from OPA Gatekeeper?

A. Kyverno can only audit policies but cannot enforce them  
B. Kyverno policies are written in YAML as Kubernetes-native resources, without requiring a separate policy language like Rego  
C. Kyverno cannot mutate resources, only validate them  
D. Kyverno does not support generating new resources based on policy rules

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Kyverno's primary distinguishing feature is that policies are written entirely in YAML as Kubernetes-native custom resources. This means Kubernetes administrators can write policies without learning a separate policy language like Rego (which OPA Gatekeeper requires). Kyverno policies use familiar Kubernetes resource patterns with `match`, `exclude`, `validate`, `mutate`, and `generate` sections.

**Why others are wrong:**

- **A:** Kyverno supports both enforcement and auditing. Policies can be set to `Enforce` mode (blocking violations) or `Audit` mode (logging violations without blocking).
- **C:** Kyverno supports mutation of resources. It can modify incoming requests, such as adding labels, setting default values, or injecting sidecar containers.
- **D:** Kyverno supports resource generation. It can automatically create new resources (like NetworkPolicies or ResourceQuotas) when certain conditions are met, such as when a new namespace is created.

</details>

---

### Question 48

A security architect is implementing mutual TLS (mTLS) between all microservices in a Kubernetes cluster. Which approach is MOST operationally efficient?

A. Manually generating and distributing TLS certificates to every pod using Kubernetes Secrets  
B. Deploying a service mesh (e.g., Istio, Linkerd) that automatically injects sidecar proxies to handle mTLS transparently  
C. Implementing TLS in each application's source code with hardcoded certificates  
D. Using a NetworkPolicy to encrypt all traffic between pods

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A service mesh like Istio or Linkerd provides transparent mTLS by injecting sidecar proxies (e.g., Envoy) alongside application containers. The sidecar handles certificate generation, rotation, and TLS termination automatically, without any changes to application code. This is the most operationally efficient approach because it centralizes certificate management, automates rotation, and provides consistent mTLS across all services.

**Why others are wrong:**

- **A:** Manually managing TLS certificates at scale is operationally burdensome and error-prone. Certificate rotation, expiration monitoring, and distribution to every pod creates significant overhead.
- **C:** Implementing TLS in each application requires code changes in every service, tight coupling to certificate paths, and manual certificate management per application.
- **D:** NetworkPolicies operate at Layer 3/4 (IP and port) and do not encrypt traffic. They control which pods can communicate but do not provide encryption or mutual authentication.

</details>

---

### Question 49

A DevOps engineer wants to verify that a container image was built by their trusted CI/CD pipeline before it is deployed to the cluster. Which tool and approach should they use?

A. Use Trivy to scan the image for vulnerabilities at deployment time  
B. Use cosign to sign images in the CI/CD pipeline and verify signatures with an admission controller before deployment  
C. Use Docker Content Trust to prevent unauthorized images from being pulled from any registry  
D. Check the image tag to ensure it matches the expected naming convention

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** cosign (part of the Sigstore project) allows you to cryptographically sign container images during the CI/CD build process and verify those signatures before deployment. By integrating signature verification into an admission controller (such as Kyverno or a Sigstore policy controller), the cluster can automatically reject any image that was not signed by the trusted CI/CD pipeline's key, ensuring provenance and integrity.

**Why others are wrong:**

- **A:** Trivy scans for known vulnerabilities (CVEs) in image layers but does not verify who built the image or whether it was built by a trusted pipeline. It addresses vulnerability management, not provenance.
- **C:** Docker Content Trust (DCT) is Docker-specific, does not integrate natively with Kubernetes admission controllers, and is limited to Docker Hub or Notary-based registries.
- **D:** Image tags can be overwritten or spoofed. Checking naming conventions provides no cryptographic guarantee of the image's origin or integrity.

</details>

---

### Question 50

In a public key infrastructure (PKI), what is the role of the Certificate Authority (CA) in a Kubernetes cluster?

A. The CA encrypts all data stored in etcd at rest  
B. The CA issues and signs TLS certificates used by cluster components to authenticate and encrypt communication with each other  
C. The CA manages RBAC policies for all users in the cluster  
D. The CA provides DNS resolution for services within the cluster

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The Kubernetes cluster CA is the root of trust for all TLS certificates used by cluster components. It signs the certificates for the API server, kubelets, controller manager, scheduler, and other components, enabling mutual TLS authentication between them. When a component presents its certificate, others verify it was signed by the trusted CA, establishing both identity and encrypted communication.

**Why others are wrong:**

- **A:** Encryption at rest in etcd is handled by the EncryptionConfiguration on the API server, not by the cluster CA. The CA handles identity and transport encryption, not data-at-rest encryption.
- **C:** RBAC policies are managed through Role, ClusterRole, RoleBinding, and ClusterRoleBinding resources via the API server. The CA handles authentication (identity verification), not authorization (permission management).
- **D:** DNS resolution is provided by CoreDNS, not the CA. The CA and DNS serve completely different functions in the cluster.

</details>

---

### Question 51

An organization exposes a web application through a Kubernetes Ingress resource. Which security configuration should be applied to the Ingress to protect against common web attacks?

A. Configure the Ingress with TLS termination, rate limiting, HSTS headers, and Web Application Firewall (WAF) annotations  
B. Set `hostNetwork: true` on the Ingress controller pods to bypass network overhead  
C. Disable TLS on the Ingress and rely on the backend services to handle encryption  
D. Use a NodePort service instead of Ingress for better security isolation

<details><summary>Answer & Explanation</summary>

**Correct Answer: A**

**Why A is correct:** A secure Ingress configuration includes TLS termination to encrypt client traffic, rate limiting to mitigate denial-of-service attacks, HTTP Strict Transport Security (HSTS) headers to force HTTPS connections, and WAF integration (via annotations in Ingress controllers like NGINX) to filter malicious requests such as SQL injection and cross-site scripting. These layers of defense together protect the exposed application.

**Why others are wrong:**

- **B:** Setting `hostNetwork: true` on the Ingress controller bypasses Kubernetes network isolation, exposing the controller to all host network traffic and increasing the attack surface.
- **C:** Disabling TLS at the Ingress exposes traffic between clients and the cluster in plaintext, enabling eavesdropping and man-in-the-middle attacks.
- **D:** NodePort services expose a port on every cluster node, lack the sophisticated routing and security features of an Ingress controller (TLS, WAF, rate limiting), and increase the attack surface by opening ports on all nodes.

</details>

---

### Question 52

What is the PRIMARY purpose of Software Bill of Materials (SBOM) generation in a container image supply chain?

A. To encrypt container images before pushing them to a registry  
B. To provide a complete inventory of all software components, libraries, and dependencies included in an image for vulnerability tracking and license compliance  
C. To limit the number of layers in a container image for performance optimization  
D. To sign container images with a cryptographic key

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** A Software Bill of Materials (SBOM) is a comprehensive inventory of all software components, libraries, packages, and dependencies contained within a container image. SBOMs enable organizations to quickly identify which images are affected when a new vulnerability is disclosed (e.g., Log4Shell), track license compliance for open-source dependencies, and maintain a clear understanding of their software supply chain.

**Why others are wrong:**

- **A:** SBOMs document image contents; they do not encrypt images. Image encryption is a separate concern handled by tools like ocicrypt.
- **C:** SBOMs have no relationship to container image layer optimization. Layer management is a Dockerfile build concern.
- **D:** Image signing is performed by tools like cosign or Notary. SBOMs and image signatures are complementary but distinct supply chain security practices.

</details>

---

### Question 53

A Kubernetes cluster uses cert-manager to automate TLS certificate management. What is the PRIMARY security benefit of cert-manager compared to manually managing certificates?

A. cert-manager eliminates the need for TLS entirely by using alternative encryption  
B. cert-manager automatically issues, renews, and rotates certificates before they expire, reducing the risk of service outages and expired certificate vulnerabilities  
C. cert-manager replaces the cluster's root CA with a publicly trusted CA  
D. cert-manager encrypts all data at rest in etcd automatically

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** cert-manager automates the entire certificate lifecycle: it issues certificates from configured CAs (Let's Encrypt, Vault, self-signed), monitors their expiration, and automatically renews them before they expire. This eliminates the risk of expired certificates causing service outages or security vulnerabilities, and removes the operational burden of manual certificate rotation across potentially hundreds of services.

**Why others are wrong:**

- **A:** cert-manager manages TLS certificates; it does not eliminate TLS. TLS remains the encryption mechanism, and cert-manager ensures certificates are always valid.
- **C:** cert-manager can work with various CAs (including public CAs like Let's Encrypt) but does not replace the cluster's root CA. It provides additional certificate management capabilities alongside the cluster CA.
- **D:** cert-manager manages TLS certificates for service communication, not etcd encryption at rest. Data-at-rest encryption requires EncryptionConfiguration on the API server.

</details>

---

### Question 54

Which supply chain attack vector involves compromising a base image in a public container registry so that all downstream images built from it inherit the malicious code?

A. Typosquatting attack  
B. Base image poisoning  
C. Dependency confusion  
D. Registry denial of service

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Base image poisoning is a supply chain attack where an attacker compromises a commonly used base image (such as an official language runtime or OS image) in a public registry. Any organization that builds container images using `FROM <compromised-base-image>` will unknowingly inherit the malicious code, making it a highly effective supply chain attack that can affect thousands of downstream users.

**Why others are wrong:**

- **A:** Typosquatting involves creating malicious packages or images with names similar to popular ones (e.g., `ngingx` instead of `nginx`) to trick users into pulling the wrong image. It does not involve compromising legitimate base images.
- **C:** Dependency confusion exploits package manager resolution logic by publishing malicious packages to public registries with the same name as internal private packages. It targets language package managers, not container base images.
- **D:** A registry denial of service disrupts the availability of a container registry, preventing image pulls, but does not inject malicious code into images.

</details>

---

### Question 55

What is the PRIMARY purpose of the CIS Kubernetes Benchmark?

A. To provide a container image scanning tool for identifying CVEs  
B. To define a set of security configuration best practices for hardening Kubernetes clusters, with specific recommendations for each component  
C. To replace Kubernetes RBAC with a more secure authorization system  
D. To automate the deployment of Kubernetes clusters on cloud providers

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The CIS (Center for Internet Security) Kubernetes Benchmark is a comprehensive set of security configuration recommendations for hardening Kubernetes clusters. It covers the API server, etcd, controller manager, scheduler, kubelet, and other components, providing specific configuration checks (e.g., "Ensure that the --anonymous-auth argument is set to false") with scoring status (Scored/Not Scored) and remediation guidance.

**Why others are wrong:**

- **A:** The CIS Benchmark is a configuration guideline document, not a vulnerability scanning tool. Tools like kube-bench automate checking clusters against the benchmark.
- **C:** The CIS Benchmark provides recommendations for configuring RBAC securely but does not replace it with a different authorization system.
- **D:** The CIS Benchmark focuses on security hardening of existing clusters, not on cluster provisioning or deployment automation.

</details>

---

### Question 56

Which open-source tool automates checking a Kubernetes cluster's configuration against the CIS Kubernetes Benchmark?

A. Falco  
B. kube-bench  
C. Prometheus  
D. Helm

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** kube-bench is an open-source tool by Aqua Security that runs automated checks against the CIS Kubernetes Benchmark. It inspects the configuration of Kubernetes components (API server, kubelet, etcd, etc.) and reports which recommendations pass, fail, or generate warnings, providing specific remediation steps for each failed check.

**Why others are wrong:**

- **A:** Falco is a runtime security tool that detects anomalous behavior and security threats in running containers and Kubernetes clusters. It does not check configuration against CIS benchmarks.
- **C:** Prometheus is a monitoring and alerting toolkit for collecting and querying metrics. It has no capability to evaluate security configurations against CIS benchmarks.
- **D:** Helm is a Kubernetes package manager for deploying applications using charts. It manages application deployments, not security configuration audits.

</details>

---

### Question 57

In the SLSA (Supply Chain Levels for Software Artifacts) framework, what does achieving **SLSA Level 3** require beyond Level 2?

A. Source code must be stored in a version control system  
B. The build process must run on a hardened, isolated build platform that generates non-falsifiable provenance, with the build definition coming from source  
C. All dependencies must be pinned to exact versions  
D. The software must be signed with a GPG key

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** SLSA Level 3 (Build L3) requires that the build runs on a hardened build platform with strong isolation between builds, preventing one build from influencing another. The provenance must be non-falsifiable (cannot be generated outside the build service), and the build definition and configuration must come from a version-controlled source. This prevents compromised build steps, insider threats, and build platform manipulation.

**Why others are wrong:**

- **A:** Version control is a requirement at lower SLSA levels (Source L1). SLSA Level 3 build requirements go significantly beyond basic source control.
- **C:** Dependency pinning is a good supply chain practice but is not the specific requirement that distinguishes SLSA Level 3 from Level 2. SLSA focuses on build integrity and provenance.
- **D:** GPG signing is a general software signing method but is not the specific mechanism SLSA Level 3 requires. SLSA emphasizes build platform integrity and non-falsifiable provenance generation.

</details>

---

### Question 58

The MITRE ATT&CK framework for Containers includes the tactic "Persistence." Which of the following is a Kubernetes-specific technique under this tactic?

A. Exploiting a known CVE in an application running inside a container  
B. Creating a malicious admission webhook that injects a sidecar into every new pod  
C. Performing a port scan to discover open services in the cluster  
D. Exfiltrating data through DNS tunneling

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Creating a malicious admission webhook (MutatingWebhookConfiguration) is a Kubernetes-specific persistence technique documented in the MITRE ATT&CK matrix for Containers. A mutating admission webhook can automatically inject malicious sidecar containers into every new pod created in the cluster, ensuring the attacker maintains access even as pods are recreated. This persists until the webhook configuration is discovered and removed.

**Why others are wrong:**

- **A:** Exploiting a CVE is an "Initial Access" or "Execution" technique, not a persistence technique. It is used to gain entry, not to maintain access over time.
- **C:** Port scanning is a "Discovery" technique used for reconnaissance to map the network and identify targets. It does not establish persistence.
- **D:** DNS tunneling is a "Command and Control" or "Exfiltration" technique used to communicate with external infrastructure or extract data, not to maintain persistent access.

</details>

---

### Question 59

Which NIST Cybersecurity Framework function focuses on developing and implementing safeguards to ensure delivery of critical infrastructure services, including access control, awareness training, and data security?

A. Identify  
B. Protect  
C. Detect  
D. Respond

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** The "Protect" function of the NIST Cybersecurity Framework (CSF) focuses on developing and implementing appropriate safeguards to ensure the delivery of critical services. It covers categories including Identity Management and Access Control, Awareness and Training, Data Security, Information Protection Processes and Procedures, Maintenance, and Protective Technology. In a Kubernetes context, this maps to implementing RBAC, encryption, network policies, and security training.

**Why others are wrong:**

- **A:** The "Identify" function focuses on understanding the organizational context, asset management, risk assessment, and governance. It is about knowing what you need to protect, not implementing the protections.
- **C:** The "Detect" function focuses on developing activities to identify the occurrence of cybersecurity events through continuous monitoring, detection processes, and anomaly detection.
- **D:** The "Respond" function focuses on developing activities to take action regarding detected cybersecurity incidents, including response planning, communications, analysis, and mitigation.

</details>

---

### Question 60

An organization needs to continuously verify that their Kubernetes clusters comply with internal security policies and regulatory requirements. Which approach provides the MOST comprehensive automated compliance monitoring?

A. Manually reviewing kubectl output for each cluster on a quarterly basis  
B. Deploying a combination of kube-bench for CIS benchmarks, OPA Gatekeeper for policy enforcement, and Falco for runtime compliance monitoring, integrated with a centralized SIEM  
C. Relying solely on the cloud provider's managed Kubernetes service to handle all compliance  
D. Running a single vulnerability scan on container images during the CI/CD build phase

<details><summary>Answer & Explanation</summary>

**Correct Answer: B**

**Why B is correct:** Comprehensive automated compliance monitoring requires multiple layers: kube-bench continuously validates cluster configurations against CIS benchmarks, OPA Gatekeeper enforces policies at the admission control level to prevent non-compliant resources from being created, and Falco monitors runtime behavior to detect compliance violations in real time. Integrating these with a centralized SIEM (Security Information and Event Management) provides unified alerting, correlation, and audit trail reporting across all compliance domains.

**Why others are wrong:**

- **A:** Manual quarterly reviews are infrequent, error-prone, and do not provide continuous compliance assurance. Clusters can drift from compliance between reviews.
- **C:** Cloud providers offer security features for their managed Kubernetes services but operate under a shared responsibility model. The provider secures the control plane infrastructure, but cluster configuration, workload policies, and runtime compliance remain the organization's responsibility.
- **D:** Vulnerability scanning in CI/CD is important but only addresses one aspect of compliance (image vulnerabilities). It does not cover cluster configuration, runtime behavior, RBAC policies, or network security compliance.

</details>

---

## Answer Key

| Question | Answer | Question | Answer | Question | Answer |
|----------|--------|----------|--------|----------|--------|
| 1        | B      | 21       | B      | 41       | A      |
| 2        | C      | 22       | C      | 42       | B      |
| 3        | B      | 23       | C      | 43       | B      |
| 4        | B      | 24       | C      | 44       | A      |
| 5        | B      | 25       | B      | 45       | C      |
| 6        | B      | 26       | B      | 46       | A      |
| 7        | B      | 27       | C      | 47       | B      |
| 8        | C      | 28       | B      | 48       | B      |
| 9        | B      | 29       | B      | 49       | B      |
| 10       | B      | 30       | C      | 50       | B      |
| 11       | B      | 31       | B      | 51       | A      |
| 12       | D      | 32       | A      | 52       | B      |
| 13       | B      | 33       | B      | 53       | B      |
| 14       | B      | 34       | C      | 54       | B      |
| 15       | A      | 35       | A      | 55       | B      |
| 16       | A      | 36       | B      | 56       | B      |
| 17       | C      | 37       | B      | 57       | B      |
| 18       | B      | 38       | B      | 58       | B      |
| 19       | C      | 39       | B      | 59       | B      |
| 20       | B      | 40       | B      | 60       | B      |

## Scoring Guide

- **90-100% (54-60 correct):** Excellent! You are well-prepared for the KCSA exam.
- **75-89% (45-53 correct):** Good! Review the domains where you missed questions.
- **60-74% (36-44 correct):** Fair. Dedicate more study time before scheduling the exam.
- **Below 60% (<36 correct):** Review all domains thoroughly before attempting the exam.

## Study Recommendations

**If you scored 90-100%:** Focus on time management and practice with additional mock exams to build confidence. Review any questions you missed to close remaining gaps.

**If you scored 75-89%:** Identify the specific domains (4Cs, Cluster Components, Security Fundamentals, Threat Model, Platform Security, Compliance) where you lost points. Re-read the relevant Kubernetes documentation sections and practice scenario-based questions in those areas.

**If you scored 60-74%:** Build a structured study plan covering all six KCSA domains. Focus on hands-on practice with tools like kube-bench, Falco, OPA Gatekeeper, and NetworkPolicies. Review the Kubernetes security documentation and CIS Benchmarks thoroughly.

**If you scored below 60%:** Start with the foundational concepts: the 4Cs model, Kubernetes architecture and component roles, RBAC, Pod Security Standards, and the shared responsibility model. Use the official Kubernetes documentation, KCSA curriculum, and hands-on labs before attempting mock exams again.
