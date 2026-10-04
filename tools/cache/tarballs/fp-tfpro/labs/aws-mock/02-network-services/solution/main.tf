locals {
  enabled_services = {
    for name, service in var.service_matrix : name => service if service.enabled
  }

  common_tags = {
    managed_by = "terraform"
    workspace  = terraform.workspace
    lab        = "aws-mock-02"
  }
}

resource "aws_vpc" "lab" {
  cidr_block = "10.50.0.0/16"
  tags = merge(local.common_tags, {
    Name = "${terraform.workspace}-lab-vpc"
  })
}

resource "aws_subnet" "app" {
  vpc_id     = aws_vpc.lab.id
  cidr_block = "10.50.1.0/24"
  tags = merge(local.common_tags, {
    Name = "${terraform.workspace}-app-subnet"
  })
}

resource "aws_security_group" "service" {
  name   = "${terraform.workspace}-service-sg"
  vpc_id = aws_vpc.lab.id

  ingress {
    from_port   = 8080
    to_port     = 8080
    protocol    = "tcp"
    cidr_blocks = ["10.50.0.0/16"]
  }

  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = merge(local.common_tags, {
    Name = "${terraform.workspace}-service-sg"
  })
}

resource "aws_sqs_queue" "service" {
  for_each = local.enabled_services

  name = "${terraform.workspace}-${each.key}-events"

  tags = merge(local.common_tags, {
    service = each.key
    port    = tostring(each.value.port)
  })
}
