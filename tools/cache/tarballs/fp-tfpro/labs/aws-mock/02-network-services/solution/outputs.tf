output "vpc_id" {
  value = aws_vpc.lab.id
}

output "queue_urls" {
  value = {
    for name, queue in aws_sqs_queue.service : name => queue.url
  }
}

output "enabled_service_names" {
  value = sort(keys(aws_sqs_queue.service))
}
