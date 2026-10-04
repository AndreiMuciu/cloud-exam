# AWS Mock Lab 02 - Network and Service Primitives

This lab is closer to common infrastructure authoring patterns: VPC-style networking, security rules, and queue-backed services.

## Challenge goal

Starting from `challenge/`, refactor the configuration so that it:

- creates one SQS queue per enabled service
- uses workspace-aware naming
- exposes queue URLs keyed by service name
- keeps network resources consistently tagged

## Suggested commands

```bash
cd labs/aws-mock/02-network-services/challenge
terraform init
terraform workspace new stage || terraform workspace select stage
terraform plan
terraform apply -auto-approve
terraform state list
terraform output
terraform destroy -auto-approve
```
