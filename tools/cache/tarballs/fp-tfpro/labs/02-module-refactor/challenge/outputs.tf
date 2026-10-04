output "service_ports" {
  description = "Current service ports from the repeated resources."
  value = {
    api    = terraform_data.api.input.config.port
    worker = terraform_data.worker.input.config.port
    ui     = terraform_data.ui.input.config.port
  }
}
