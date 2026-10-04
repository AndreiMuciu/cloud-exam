variable "services" {
  description = "Service definitions managed by the platform team."
  type = object({
    api = object({
      port   = number
      tier   = string
      owners = list(string)
    })
    worker = object({
      port   = number
      tier   = string
      owners = list(string)
    })
    ui = object({
      port   = number
      tier   = string
      owners = list(string)
    })
  })

  default = {
    api = {
      port   = 8080
      tier   = "backend"
      owners = ["platform", "api-team"]
    }
    worker = {
      port   = 9090
      tier   = "backend"
      owners = ["platform", "operations"]
    }
    ui = {
      port   = 3000
      tier   = "frontend"
      owners = ["design-systems", "platform"]
    }
  }
}
