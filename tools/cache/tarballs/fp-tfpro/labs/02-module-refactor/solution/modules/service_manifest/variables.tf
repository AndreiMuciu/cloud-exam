variable "name" {
  description = "Service name."
  type        = string
}

variable "config" {
  description = "Service configuration object."
  type = object({
    port   = number
    tier   = string
    owners = list(string)
  })
}

variable "common_tags" {
  description = "Tags applied to every service manifest."
  type        = map(string)
}
