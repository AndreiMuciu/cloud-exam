output "workspace_summary" {
  description = "Quick summary of the active workspace and release settings."
  value       = terraform_data.release.input
}

output "component_addresses" {
  description = "Useful resource addresses for state inspection drills."
  value       = sort([for name in keys(terraform_data.component) : "terraform_data.component[\"${name}\"]"])
}

output "component_lanes" {
  description = "Deployment lanes keyed by component."
  value = {
    for name, component in terraform_data.component : name => component.input.lane
  }
}
