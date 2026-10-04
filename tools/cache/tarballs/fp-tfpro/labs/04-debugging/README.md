# Lab 04 - Debugging Broken Terraform

This lab is intentionally different: the `challenge/` configuration is **broken on purpose**.

That makes it closer to a practical troubleshooting task where you need to inspect errors, follow references, and repair data flow under time pressure.

## Challenge goal

Fix the configuration in `challenge/` so that it:

- validates successfully
- creates one `terraform_data` resource per enabled service
- exposes a sorted list of enabled service names
- exposes a distinct, sorted list of service owners

## Suggested workflow

```bash
cd labs/04-debugging/challenge
terraform init
terraform validate
terraform plan
```

When you are stuck, compare your repaired version against `solution/`.
