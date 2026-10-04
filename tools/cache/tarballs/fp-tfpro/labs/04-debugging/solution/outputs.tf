output "enabled_service_names" {
  value = sort(keys(terraform_data.service))
}

output "service_owners" {
  value = local.all_owners
}
