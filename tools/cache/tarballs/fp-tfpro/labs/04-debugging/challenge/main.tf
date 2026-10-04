locals {
  enabled_services = {
    for name, service in var.service_matrix : name => service if service.enabled
  }

  all_owners = sort(distinct(flatten([
    for service in local.enabled_services : service.owners
  ])))
}

resource "terraform_data" "service" {
  for_each = local.enabled_services

  input = {
    name          = each.key
    replica_count = each.value.replica_count
    primary_owner = each.value.owner[0]
  }
}
