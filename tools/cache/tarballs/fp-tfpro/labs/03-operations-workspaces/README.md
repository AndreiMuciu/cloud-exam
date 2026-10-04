# Lab 03 - Operations and Workspaces

This lab is for CLI repetition. The configuration is already valid; the practice is in how you operate Terraform against it.

## Objectives

Practice these exam-relevant motions:

- initialize a working directory
- create and switch workspaces
- inspect plans and outputs for different workspaces
- inspect resource addresses in state
- use `terraform console` to understand the active configuration
- destroy cleanly and reset the lab

## Suggested commands

```bash
cd labs/03-operations-workspaces
terraform init
terraform workspace list
terraform workspace new stage
terraform plan
terraform apply -auto-approve
terraform state list
terraform state show 'terraform_data.component["api"]'
terraform output workspace_summary
terraform console
terraform destroy -auto-approve
```

Then repeat in `prod`:

```bash
terraform workspace select prod || terraform workspace new prod
terraform apply -auto-approve
terraform output -json
terraform destroy -auto-approve
```

## What to observe

- `terraform.workspace` changes the shape of the rollout plan.
- resource addresses remain stable across applies in a workspace.
- outputs help you verify environment-specific settings quickly.
