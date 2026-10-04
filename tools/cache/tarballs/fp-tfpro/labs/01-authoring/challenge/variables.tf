variable "project_name" {
  description = "Logical project name used in summary objects."
  type        = string
  default     = "authoring-lab"
}

variable "environments" {
  description = "Training environments to model in Terraform."
  type = map(object({
    cidr  = string
    owner = string
    size  = string
  }))

  default = {
    dev = {
      cidr  = "10.10.0.0/24"
      owner = "platform"
      size  = "small"
    }
    stage = {
      cidr  = "10.20.0.0/24"
      owner = "platform"
      size  = "medium"
    }
    prod = {
      cidr  = "10.30.0.0/24"
      owner = "operations"
      size  = "large"
    }
  }
}
