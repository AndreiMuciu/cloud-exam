#!/usr/bin/env bash
set -euo pipefail

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$ROOT_DIR"

VALIDATE_DIRS=(
  "labs/01-authoring/challenge"
  "labs/01-authoring/solution"
  "labs/02-module-refactor/challenge"
  "labs/02-module-refactor/solution"
  "labs/03-operations-workspaces"
  "labs/04-debugging/solution"
)

echo ">>> terraform fmt -check -recursive"
terraform fmt -check -recursive

for dir in "${VALIDATE_DIRS[@]}"; do
  echo
  echo ">>> terraform init -backend=false ($dir)"
  terraform -chdir="$dir" init -backend=false -input=false >/dev/null

  echo ">>> terraform validate ($dir)"
  terraform -chdir="$dir" validate >/dev/null
  echo "OK: $dir"
done

echo

echo "Repository validation completed successfully."
