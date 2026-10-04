# AWS Mock Lab 01 - S3 and IAM Foundations

This lab practices common AWS Terraform tasks against LocalStack.

## Challenge goal

Starting from `challenge/`, update the configuration so that it:

- creates one S3 bucket per enabled environment
- uploads a bootstrap object to each enabled bucket
- exposes a sorted list of enabled bucket names
- exposes a map of owner tags keyed by environment

## Suggested commands

```bash
cd labs/aws-mock/01-s3-iam/challenge
terraform init
terraform validate
terraform plan
terraform apply -auto-approve
terraform state list
terraform output
terraform destroy -auto-approve
```
