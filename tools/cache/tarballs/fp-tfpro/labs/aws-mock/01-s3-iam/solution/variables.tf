variable "aws_region" {
  description = "AWS region used against LocalStack."
  type        = string
  default     = "us-east-1"
}

variable "localstack_endpoint" {
  description = "LocalStack edge endpoint."
  type        = string
  default     = "http://localhost:4566"
}

variable "project_name" {
  description = "Logical project name used in bucket naming."
  type        = string
  default     = "tf-pro-mock"
}

variable "environments" {
  description = "Environment definitions for bucket creation."
  type = map(object({
    enabled = bool
    owner   = string
    tier    = string
  }))

  default = {
    dev = {
      enabled = true
      owner   = "platform"
      tier    = "sandbox"
    }
    stage = {
      enabled = true
      owner   = "platform"
      tier    = "preprod"
    }
    prod = {
      enabled = false
      owner   = "operations"
      tier    = "prod"
    }
  }
}
