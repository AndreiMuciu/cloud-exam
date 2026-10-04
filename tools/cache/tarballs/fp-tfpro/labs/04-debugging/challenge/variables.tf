variable "service_matrix" {
  description = "Services used in the debugging challenge."
  type = map(object({
    enabled  = bool
    owners   = list(string)
    replicas = number
  }))

  default = {
    api = {
      enabled  = true
      owners   = ["platform", "api-team"]
      replicas = 2
    }
    worker = {
      enabled  = true
      owners   = ["operations", "platform"]
      replicas = 1
    }
    ui = {
      enabled  = false
      owners   = ["design-systems"]
      replicas = 2
    }
  }
}
