locals {
  default_tags = {
    lab        = "authoring"
    managed_by = "terraform"
  }

  environment_catalog = {
    for name, env in var.environments : name => {
      name  = name
      cidr  = env.cidr
      owner = env.owner
      size  = env.size
      tags = merge(local.default_tags, {
        environment = name
        owner       = env.owner
        size        = env.size
      })
    }
  }
}

resource "terraform_data" "catalog" {
  input = {
    project      = var.project_name
    environments = local.environment_catalog
  }
}

resource "terraform_data" "environment" {
  for_each = local.environment_catalog
  input    = each.value
}
