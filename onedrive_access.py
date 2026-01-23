#!/usr/bin/env python3
"""
OneDrive Access API Service for JRD Companies

This service provides API endpoints for accessing OneDrive files
using Microsoft Graph API with daemon/application authentication.
"""

import json
import os
import logging
from pathlib import Path

import msal
import requests
from flask import Flask, jsonify, request, send_file
from flask_cors import CORS

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

app = Flask(__name__)
CORS(app)

# Configuration paths from environment
MS_CONFIG_PATH = os.environ.get('MS_CONFIG_PATH', '/root/.ms_app_config.json')
MS_TOKEN_PATH = os.environ.get('MS_TOKEN_PATH', '/root/.ms_daemon_token.json')
DATA_DIR = Path('/app/data')

# Microsoft Graph API endpoints
GRAPH_API_ENDPOINT = 'https://graph.microsoft.com/v1.0'
SCOPES = ['https://graph.microsoft.com/.default']


class OneDriveClient:
    """Client for accessing OneDrive via Microsoft Graph API."""

    def __init__(self, config_path: str, token_path: str):
        self.config_path = config_path
        self.token_path = token_path
        self.config = None
        self.app = None
        self._load_config()

    def _load_config(self):
        """Load Microsoft app configuration."""
        try:
            if os.path.exists(self.config_path):
                with open(self.config_path, 'r') as f:
                    self.config = json.load(f)
                logger.info("Loaded Microsoft app configuration")
                self._init_msal_app()
            else:
                logger.warning(f"Config file not found at {self.config_path}")
        except Exception as e:
            logger.error(f"Failed to load config: {e}")

    def _init_msal_app(self):
        """Initialize MSAL confidential client application."""
        if not self.config:
            return

        try:
            self.app = msal.ConfidentialClientApplication(
                client_id=self.config.get('client_id'),
                client_credential=self.config.get('client_secret'),
                authority=f"https://login.microsoftonline.com/{self.config.get('tenant_id')}"
            )
            logger.info("MSAL application initialized")
        except Exception as e:
            logger.error(f"Failed to initialize MSAL app: {e}")

    def _get_access_token(self) -> str | None:
        """Acquire access token using client credentials flow."""
        if not self.app:
            logger.error("MSAL app not initialized")
            return None

        try:
            # Try to get token from cache first
            result = self.app.acquire_token_silent(SCOPES, account=None)

            if not result:
                # Acquire new token
                result = self.app.acquire_token_for_client(scopes=SCOPES)

            if 'access_token' in result:
                # Save token for persistence
                self._save_token(result)
                return result['access_token']
            else:
                logger.error(f"Token acquisition failed: {result.get('error_description')}")
                return None
        except Exception as e:
            logger.error(f"Failed to acquire token: {e}")
            return None

    def _save_token(self, token_data: dict):
        """Save token to file for persistence."""
        try:
            with open(self.token_path, 'w') as f:
                json.dump(token_data, f)
        except Exception as e:
            logger.warning(f"Failed to save token: {e}")

    def _make_graph_request(self, endpoint: str, method: str = 'GET', **kwargs) -> dict | None:
        """Make an authenticated request to Microsoft Graph API."""
        token = self._get_access_token()
        if not token:
            return None

        headers = {
            'Authorization': f'Bearer {token}',
            'Content-Type': 'application/json'
        }

        url = f"{GRAPH_API_ENDPOINT}{endpoint}"

        try:
            response = requests.request(method, url, headers=headers, **kwargs)
            response.raise_for_status()
            return response.json() if response.content else {}
        except requests.exceptions.HTTPError as e:
            logger.error(f"Graph API error: {e.response.status_code} - {e.response.text}")
            return None
        except Exception as e:
            logger.error(f"Request failed: {e}")
            return None

    def is_configured(self) -> bool:
        """Check if the client is properly configured."""
        return self.config is not None and self.app is not None

    def list_drive_root(self, user_id: str = None) -> dict | None:
        """List items in the root of OneDrive."""
        if user_id:
            endpoint = f"/users/{user_id}/drive/root/children"
        else:
            endpoint = "/me/drive/root/children"
        return self._make_graph_request(endpoint)

    def list_folder(self, folder_path: str, user_id: str = None) -> dict | None:
        """List items in a specific folder."""
        if user_id:
            endpoint = f"/users/{user_id}/drive/root:/{folder_path}:/children"
        else:
            endpoint = f"/me/drive/root:/{folder_path}:/children"
        return self._make_graph_request(endpoint)

    def get_file_content(self, file_path: str, user_id: str = None) -> bytes | None:
        """Download file content from OneDrive."""
        token = self._get_access_token()
        if not token:
            return None

        if user_id:
            endpoint = f"/users/{user_id}/drive/root:/{file_path}:/content"
        else:
            endpoint = f"/me/drive/root:/{file_path}:/content"

        url = f"{GRAPH_API_ENDPOINT}{endpoint}"
        headers = {'Authorization': f'Bearer {token}'}

        try:
            response = requests.get(url, headers=headers, allow_redirects=True)
            response.raise_for_status()
            return response.content
        except Exception as e:
            logger.error(f"Failed to download file: {e}")
            return None

    def get_drive_info(self, user_id: str = None) -> dict | None:
        """Get information about the user's OneDrive."""
        if user_id:
            endpoint = f"/users/{user_id}/drive"
        else:
            endpoint = "/me/drive"
        return self._make_graph_request(endpoint)


# Initialize OneDrive client
onedrive_client = OneDriveClient(MS_CONFIG_PATH, MS_TOKEN_PATH)


# API Routes

@app.route('/health', methods=['GET'])
def health_check():
    """Health check endpoint."""
    return jsonify({
        'status': 'healthy',
        'service': 'jrd-onedrive',
        'configured': onedrive_client.is_configured()
    })


@app.route('/api/status', methods=['GET'])
def api_status():
    """Get API status and configuration status."""
    return jsonify({
        'status': 'running',
        'configured': onedrive_client.is_configured(),
        'config_path': MS_CONFIG_PATH,
        'config_exists': os.path.exists(MS_CONFIG_PATH)
    })


@app.route('/api/drive', methods=['GET'])
def get_drive():
    """Get OneDrive information."""
    if not onedrive_client.is_configured():
        return jsonify({'error': 'OneDrive client not configured'}), 503

    user_id = request.args.get('user_id')
    result = onedrive_client.get_drive_info(user_id)

    if result:
        return jsonify(result)
    return jsonify({'error': 'Failed to get drive info'}), 500


@app.route('/api/files', methods=['GET'])
def list_files():
    """List files in OneDrive root or specified folder."""
    if not onedrive_client.is_configured():
        return jsonify({'error': 'OneDrive client not configured'}), 503

    folder_path = request.args.get('path', '')
    user_id = request.args.get('user_id')

    if folder_path:
        result = onedrive_client.list_folder(folder_path, user_id)
    else:
        result = onedrive_client.list_drive_root(user_id)

    if result:
        return jsonify(result)
    return jsonify({'error': 'Failed to list files'}), 500


@app.route('/api/files/download', methods=['GET'])
def download_file():
    """Download a file from OneDrive."""
    if not onedrive_client.is_configured():
        return jsonify({'error': 'OneDrive client not configured'}), 503

    file_path = request.args.get('path')
    user_id = request.args.get('user_id')

    if not file_path:
        return jsonify({'error': 'File path required'}), 400

    content = onedrive_client.get_file_content(file_path, user_id)

    if content:
        # Save to local data directory
        local_path = DATA_DIR / Path(file_path).name
        local_path.parent.mkdir(parents=True, exist_ok=True)
        local_path.write_bytes(content)

        return send_file(
            local_path,
            as_attachment=True,
            download_name=Path(file_path).name
        )

    return jsonify({'error': 'Failed to download file'}), 500


@app.route('/api/sync', methods=['POST'])
def sync_folder():
    """Sync a folder from OneDrive to local storage."""
    if not onedrive_client.is_configured():
        return jsonify({'error': 'OneDrive client not configured'}), 503

    data = request.get_json() or {}
    folder_path = data.get('path', '')
    user_id = data.get('user_id')

    # List files in the folder
    if folder_path:
        result = onedrive_client.list_folder(folder_path, user_id)
    else:
        result = onedrive_client.list_drive_root(user_id)

    if not result or 'value' not in result:
        return jsonify({'error': 'Failed to list files for sync'}), 500

    synced_files = []
    errors = []

    for item in result.get('value', []):
        if item.get('file'):  # It's a file, not a folder
            file_name = item['name']
            remote_path = f"{folder_path}/{file_name}" if folder_path else file_name

            content = onedrive_client.get_file_content(remote_path, user_id)
            if content:
                local_path = DATA_DIR / file_name
                local_path.write_bytes(content)
                synced_files.append(file_name)
                logger.info(f"Synced: {file_name}")
            else:
                errors.append(file_name)

    return jsonify({
        'synced': synced_files,
        'errors': errors,
        'total': len(synced_files)
    })


@app.errorhandler(404)
def not_found(e):
    return jsonify({'error': 'Endpoint not found'}), 404


@app.errorhandler(500)
def server_error(e):
    return jsonify({'error': 'Internal server error'}), 500


if __name__ == '__main__':
    # Ensure data directory exists
    DATA_DIR.mkdir(parents=True, exist_ok=True)

    logger.info("Starting JRD OneDrive Access API")
    logger.info(f"Config path: {MS_CONFIG_PATH}")
    logger.info(f"Token path: {MS_TOKEN_PATH}")
    logger.info(f"Configured: {onedrive_client.is_configured()}")

    # Run the Flask app
    app.run(host='0.0.0.0', port=8000, debug=os.environ.get('DEBUG', 'false').lower() == 'true')
