resource "terraform_data" "this" {
  input = {
    name = var.name
    config = merge(var.config, {
      tags = merge(var.common_tags, { service = var.name })
    })
  }
}
