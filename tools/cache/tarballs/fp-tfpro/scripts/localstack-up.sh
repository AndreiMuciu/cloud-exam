#!/usr/bin/env bash
set -euo pipefail

CONTAINER_NAME="terraform-pro-cert-localstack"
IMAGE="localstack/localstack:latest"
PORT="4566"

if ! command -v docker >/dev/null 2>&1; then
  echo "docker is required but was not found in PATH" >&2
  exit 1
fi

if docker ps --format '{{.Names}}' | grep -Fxq "$CONTAINER_NAME"; then
  echo "LocalStack is already running as $CONTAINER_NAME"
  exit 0
fi

if docker ps -a --format '{{.Names}}' | grep -Fxq "$CONTAINER_NAME"; then
  docker rm -f "$CONTAINER_NAME" >/dev/null
fi

docker run -d \
  --name "$CONTAINER_NAME" \
  -p "$PORT:$PORT" \
  -e SERVICES=s3,iam,sts,ec2,sqs \
  -e AWS_DEFAULT_REGION=us-east-1 \
  "$IMAGE" >/dev/null

echo "Started LocalStack on http://localhost:$PORT"
