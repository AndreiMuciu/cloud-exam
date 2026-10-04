output "bootstrap_role_name" {
  value = aws_iam_role.bootstrap.name
}

output "enabled_bucket_names" {
  value = sort([for bucket in aws_s3_bucket.artifact : bucket.bucket])
}

output "environment_owner_tags" {
  value = {
    for env, bucket in aws_s3_bucket.artifact : env => bucket.tags.owner
  }
}
