output "catalog_summary" {
  description = "Complete catalog for quick inspection in plans and outputs."
  value       = terraform_data.catalog.input
}

output "environment_names" {
  description = "Sorted list of environment names."
  value       = sort(keys(local.environment_catalog))
}

output "environment_owners" {
  description = "Map of environment owners keyed by environment name."
  value = {
    for name, env in local.environment_catalog : name => env.owner
  }
}

output "large_environment_names" {
  description = "Sorted list of environments with the large size flag."
  value       = sort([for name, env in local.environment_catalog : name if env.size == "large"])
}
