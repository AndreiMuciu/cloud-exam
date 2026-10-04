output "service_ports" {
  description = "Service ports keyed by service name."
  value = {
    for name, service in module.service_manifests : name => service.manifest.config.port
  }
}

output "service_tags" {
  description = "Effective tags per service after the module refactor."
  value = {
    for name, service in module.service_manifests : name => service.manifest.config.tags
  }
}
