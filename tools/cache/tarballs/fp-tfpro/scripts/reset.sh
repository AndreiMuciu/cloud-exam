#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

find labs -type d -name .terraform -prune -exec rm -rf {} +
find labs -type f \( -name '.terraform.lock.hcl' -o -name 'terraform.tfstate' -o -name 'terraform.tfstate.*' \) -delete

echo "Terraform working directories and state files removed from labs/."
