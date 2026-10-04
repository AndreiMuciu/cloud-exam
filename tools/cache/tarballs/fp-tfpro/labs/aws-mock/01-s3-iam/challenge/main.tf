locals {
  enabled_environments = {
    for name, env in var.environments : name => env if env.enabled
  }

  common_tags = {
    managed_by = "terraform"
    lab        = "aws-mock-01"
    project    = var.project_name
  }
}

resource "aws_iam_role" "bootstrap" {
  name = "${var.project_name}-bootstrap-role"

  assume_role_policy = jsonencode({
    Version = "2012-10-17"
    Statement = [
      {
        Effect = "Allow"
        Principal = {
          Service = "ec2.amazonaws.com"
        }
        Action = "sts:AssumeRole"
      }
    ]
  })

  tags = local.common_tags
}

resource "aws_s3_bucket" "artifact" {
  bucket = "${var.project_name}-${var.aws_region}"

  tags = merge(local.common_tags, {
    purpose = "training"
  })
}
