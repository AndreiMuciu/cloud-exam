#!/usr/bin/env bash
set -euo pipefail

CONTAINER_NAME="terraform-pro-cert-localstack"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required but was not found in PATH" >&2
  exit 1
fi

if docker ps -a --format '{{.Names}}' | grep -Fxq "$CONTAINER_NAME"; then
  docker rm -f "$CONTAINER_NAME" >/dev/null
  echo "Stopped and removed $CONTAINER_NAME"
else
  echo "No LocalStack container named $CONTAINER_NAME was found"
fi
