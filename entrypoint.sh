#!/bin/bash
set -e

# Ensure token directory exists
mkdir -p $(dirname "${MS_TOKEN_PATH:-/root/.ms_daemon_token.json}")

# Run the Python script
exec python3 onedrive_access.py "$@"
