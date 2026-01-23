# Docker OneDrive Access

Docker container for accessing JRD OneDrive via Microsoft Graph API.

## Quick Start

```bash
# Build and run
./onedrive.sh

# Or with docker compose
docker compose up -d onedrive
docker compose exec onedrive python onedrive_access.py
```

## Usage

### Interactive Mode
```bash
./onedrive.sh
```

### Direct Access
```bash
# List files for specific user
./onedrive.sh "jdurand@jrdcompanies.com" "/Documents"

# List files for current user (me)
./onedrive.sh "me" "/"
```

## Available Methods

The `onedrive_access.py` script provides:

- `list_users()` - List all organization users
- `get_drive(user_id)` - Get OneDrive info
- `list_files(user_id, path)` - List files in a directory
- `download_file(user_id, file_path, save_path)` - Download file
- `upload_file(user_id, local_path, remote_path)` - Upload file
- `search_files(user_id, query)` - Search files

## Configuration

Uses existing MS Graph credentials:
- Config: `~/.ms_app_config.json`
- Tokens: `~/.ms_daemon_token.json`

Mounted into container at `/root/` with read-only config and read-write tokens.

## Data Directory

Downloaded files are saved to `./onedrive_data/` in the project directory.
