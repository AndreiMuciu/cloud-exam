# Lab 01 - Authoring and Collection Shaping

This lab focuses on the kind of Terraform authoring you need to do quickly during an exam: read variables, normalize data with locals, create repeated resources with `for_each`, and expose targeted outputs.

## Challenge goal

Starting from `challenge/`, update the configuration so that it:

- creates one `terraform_data` resource per environment
- adds a filtered output for environments tagged as `large`
- adds a map output of environment owners keyed by environment name
- keeps the root catalog resource for summary inspection

## Practice loop

```bash
cd labs/01-authoring/challenge
terraform init
terraform validate
terraform plan
terraform console
```

Useful console expressions:

```hcl
local.environment_catalog
[for name, env in local.environment_catalog : name if env.size == "large"]
```

## Reference

Compare your work with `solution/` after you finish.
