# Terraform Authoring & Operations Professional Local Lab

This repository is a self-contained practice lab for the **Terraform Authoring and Operations Professional** certification. It is designed to feel exam-oriented: you work in a terminal, edit Terraform locally, validate quickly, and solve hands-on scenarios around authoring, refactoring, state, and operations.

It is **not** a verbatim replica of the exam. Instead, it mimics the style of work you are likely to practice for the exam: reading unfamiliar Terraform, fixing issues, refactoring repeated code, working with modules, and using operational CLI commands confidently.

## What this lab covers

- Terraform authoring with variables, locals, expressions, and outputs
- Refactoring repeated resources into reusable modules
- State-aware refactors with `moved` blocks
- Workspace-oriented operations and inspection workflows
- Debugging invalid Terraform configurations
- Fast repetition with local-only resources and no cloud credentials

## Why it is local-first

The official professional learning path is often taught with AWS examples, but for fast repetition this lab avoids paid infrastructure and cloud credentials. All scenarios use Terraform features that work locally with Terraform's built-in `terraform_data` resource.

That keeps practice focused on Terraform itself:

- HCL fluency
- resource addressing
- `for_each` and collection shaping
- module design
- outputs and dependency flow
- `terraform init`, `validate`, `plan`, `apply`, `state`, `workspace`, and `console`

## Repository layout

- `labs/01-authoring/` - expressions, locals, filtered outputs, repeated resources
- `labs/02-module-refactor/` - refactor repeated resources into a module and preserve state addresses with `moved`
- `labs/03-operations-workspaces/` - workspace and state inspection drills
- `labs/04-debugging/` - broken challenge plus working solution for debugging practice
- `scripts/check.sh` - repository-wide formatting and validation helper
- `scripts/reset.sh` - cleanup helper between practice runs

## Quick start

1. Verify the lab repository itself:

   ```bash
   ./scripts/check.sh
   ```

2. Pick a challenge and initialize it:

   ```bash
   cd labs/01-authoring/challenge
   terraform init
   terraform plan
   ```

3. Work through the scenario README in that lab directory.

4. Compare your work to the matching `solution/` directory when you want a reference implementation.

## Suggested study flow

Start in this order:

1. `labs/01-authoring/challenge`
2. `labs/02-module-refactor/challenge`
3. `labs/03-operations-workspaces`
4. `labs/04-debugging/challenge`

A good repetition loop is:

```bash
terraform fmt -recursive
terraform validate
terraform plan
terraform apply
terraform state list
terraform output
terraform destroy
```

## Notes for exam-style practice

- Time-box yourself per lab.
- Avoid opening the solution until you have attempted the scenario.
- Practice reading addresses like `module.service_manifests["api"].terraform_data.this` quickly.
- Use `terraform console` to inspect collection transformations.
- Practice explaining *why* a refactor is safe, especially when `moved` blocks are involved.

## Resetting the lab

Run:

```bash
./scripts/reset.sh
```

This removes `.terraform/`, state files, and lock files under `labs/` so you can start fresh.
