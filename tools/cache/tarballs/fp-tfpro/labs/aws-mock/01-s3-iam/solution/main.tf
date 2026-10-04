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

data "aws_iam_policy_document" "bootstrap_assume_role" {
  statement {
    effect = "Allow"

    principals {
      type        = "Service"
      identifiers = ["ec2.amazonaws.com"]
    }

    actions = ["sts:AssumeRole"]
  }
}

resource "aws_iam_role" "bootstrap" {
  name               = "${var.project_name}-bootstrap-role"
  assume_role_policy = data.aws_iam_policy_document.bootstrap_assume_role.json

  tags = local.common_tags
}

resource "aws_s3_bucket" "artifact" {
  for_each = local.enabled_environments

  bucket = "${var.project_name}-${each.key}-${var.aws_region}"

  tags = merge(local.common_tags, {
    environment = each.key
    owner       = each.value.owner
    tier        = each.value.tier
  })
}

resource "aws_s3_object" "bootstrap" {
  for_each = local.enabled_environments

  bucket       = aws_s3_bucket.artifact[each.key].id
  key          = "bootstrap/${each.key}.txt"
  content      = "environment=${each.key}\nowner=${each.value.owner}\ntier=${each.value.tier}\n"
  content_type = "text/plain"

  etag = md5("environment=${each.key}\nowner=${each.value.owner}\ntier=${each.value.tier}\n")
}
