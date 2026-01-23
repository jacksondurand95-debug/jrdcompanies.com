#!/bin/bash
# Quick OneDrive access via Docker

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Build if needed
if ! docker image inspect jrd-onedrive >/dev/null 2>&1; then
    echo "Building Docker image..."
    docker build -t jrd-onedrive "$SCRIPT_DIR"
fi

# Run container
docker run -it --rm \
    -v ~/.ms_app_config.json:/root/.ms_app_config.json:ro \
    -v ~/.ms_daemon_token.json:/root/.ms_daemon_token.json:rw \
    -v "$SCRIPT_DIR/onedrive_data:/app/data" \
    -e MS_CONFIG_PATH=/root/.ms_app_config.json \
    -e MS_TOKEN_PATH=/root/.ms_daemon_token.json \
    jrd-onedrive "$@"
