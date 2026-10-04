locals {
  common_tags = {
    lab        = "module-refactor"
    managed_by = "terraform"
  }
}

module "service_manifests" {
  for_each    = var.services
  source      = "./modules/service_manifest"
  name        = each.key
  config      = each.value
  common_tags = local.common_tags
}

moved {
  from = terraform_data.api
  to   = module.service_manifests["api"].terraform_data.this
}

moved {
  from = terraform_data.worker
  to   = module.service_manifests["worker"].terraform_data.this
}

moved {
  from = terraform_data.ui
  to   = module.service_manifests["ui"].terraform_data.this
}
