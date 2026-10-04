locals {
  common_tags = {
    lab        = "module-refactor"
    managed_by = "terraform"
  }
}

resource "terraform_data" "api" {
  input = {
    name = "api"
    config = merge(var.services.api, {
      tags = merge(local.common_tags, { service = "api" })
    })
  }
}

resource "terraform_data" "worker" {
  input = {
    name = "worker"
    config = merge(var.services.worker, {
      tags = merge(local.common_tags, { service = "worker" })
    })
  }
}

resource "terraform_data" "ui" {
  input = {
    name = "ui"
    config = merge(var.services.ui, {
      tags = merge(local.common_tags, { service = "ui" })
    })
  }
}
