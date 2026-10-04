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

variable "service_matrix" {
  description = "Service definitions for queue-backed workloads."
  type = map(object({
    enabled = bool
    port    = number
  }))

  default = {
    api = {
      enabled = true
      port    = 8080
    }
    worker = {
      enabled = true
      port    = 9090
    }
    ui = {
      enabled = false
      port    = 3000
    }
  }
}
