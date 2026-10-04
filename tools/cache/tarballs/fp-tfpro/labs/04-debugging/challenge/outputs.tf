output "enabled_service_names" {
  value = sort(keys(terraform_data.services))
}

output "service_owners" {
  value = local.owner_index
}
