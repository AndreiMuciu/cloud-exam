# AWS-Flavored Mock Track

This track adds **AWS-shaped** Terraform practice without requiring a real AWS account. It uses **LocalStack** to emulate AWS APIs locally, so you can practice provider configuration, common `aws_*` resources, tagging, data flow, and CLI workflows in a way that is much closer to typical Terraform-on-AWS work.

## What this track is for

Use this when you want your practice to look more like day-to-day AWS Terraform:

- `provider "aws"` configuration
- endpoint overrides for local emulation
- common AWS resource types and arguments
- module-like naming and tagging patterns
- plan/apply/state/output loops against AWS-style resources

## What this track is not

It is **not** a perfect AWS replica and **not** a replica of the certification exam environment. Some LocalStack behaviors differ from real AWS.

Treat it as a provider-flavored practice layer on top of the validated local-first labs.

## Prerequisites

- Docker
- Terraform
- Internet access the first time Terraform downloads the AWS provider and Docker pulls the LocalStack image

## Start LocalStack

From the repository root:

```bash
./scripts/localstack-up.sh
```

To verify it is responding:

```bash
curl http://localhost:4566/_localstack/health
```

To stop it later:

```bash
./scripts/localstack-down.sh
```

## Track layout

- `01-s3-iam/` - buckets, objects, IAM policy documents, tags, filtered outputs
- `02-network-services/` - VPC, subnets, security groups, SQS, and workspace-aware naming

Each scenario has a `challenge/` directory and a matching `solution/` directory.

## Recommended flow

1. Start LocalStack.
2. Work from a `challenge/` directory.
3. Run `terraform init`, `terraform validate`, `terraform plan`, and `terraform apply`.
4. Inspect with `terraform state list` and `terraform output`.
5. Compare with the `solution/` once you finish.

## Cleanup

Destroy lab resources before stopping LocalStack:

```bash
terraform destroy -auto-approve
```

Then stop the emulator:

```bash
./scripts/localstack-down.sh
```
