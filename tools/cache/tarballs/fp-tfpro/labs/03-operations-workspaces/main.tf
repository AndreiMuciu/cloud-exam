locals {
  workspace_name = terraform.workspace

  active_settings = lookup(
    var.workspace_overrides,
    terraform.workspace,
    var.workspace_overrides["default"]
  )

  components = {
    api = {
      lane = "core"
    }
    worker = {
      lane = "async"
    }
    ui = {
      lane = "edge"
    }
  }

  rollout_plan = {
    for name, component in local.components : name => {
      component         = name
      lane              = component.lane
      workspace         = local.workspace_name
      release_version   = var.release_version
      approval_required = local.active_settings.approval_required
      replica_count     = local.active_settings.replica_count
      change_window     = local.active_settings.change_window
    }
  }
}

resource "terraform_data" "release" {
  input = {
    workspace = local.workspace_name
    settings  = local.active_settings
    release   = var.release_version
  }
}

resource "terraform_data" "component" {
  for_each = local.rollout_plan
  input    = each.value
}
