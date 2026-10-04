SHELL := /bin/bash

.PHONY: help check reset

help:
@printf "Available targets:\n"
@printf "  make check  - run fmt and validate across supported labs\n"
@printf "  make reset  - remove Terraform local state and init artifacts\n"

check:
@./scripts/check.sh

reset:
@./scripts/reset.sh
