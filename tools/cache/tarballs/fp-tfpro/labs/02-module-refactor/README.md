# Lab 02 - Module Refactor with Safe State Moves

This lab simulates a common professional task: you inherit repeated Terraform resources and need to refactor them into a reusable module without losing resource identity.

## Challenge goal

Starting from `challenge/`, refactor the repeated `terraform_data` resources into a module that uses `for_each`.

Aim for these outcomes:

- create one reusable module for service manifests
- drive the module with a `services` map variable
- preserve resource history with `moved` blocks
- expose outputs for ports and tags per service

## Suggested workflow

```bash
cd labs/02-module-refactor/challenge
terraform init
terraform plan
```

After your refactor, practice these commands:

```bash
terraform state list
terraform plan
terraform output
```

## Reference

A complete refactor is available in `solution/`.
