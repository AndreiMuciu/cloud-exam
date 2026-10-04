variable "release_version" {
  description = "Release version being promoted through workspaces."
  type        = string
  default     = "2026.03.0"
}

variable "workspace_overrides" {
  description = "Workspace-specific deployment settings."
  type = map(object({
    approval_required = bool
    replica_count     = number
    change_window     = string
  }))

  default = {
    default = {
      approval_required = false
      replica_count     = 1
      change_window     = "anytime"
    }
    stage = {
      approval_required = true
      replica_count     = 2
      change_window     = "business-hours"
    }
    prod = {
      approval_required = true
      replica_count     = 3
      change_window     = "after-hours"
    }
  }
}
