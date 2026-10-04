output "catalog_summary" {
  description = "Complete catalog for quick inspection in plans and outputs."
  value       = terraform_data.catalog.input
}

output "environment_names" {
  description = "Sorted list of environment names."
  value       = sort(keys(local.environment_catalog))
}
