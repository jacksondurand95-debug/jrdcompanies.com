#!/usr/bin/env python3
"""
OneDrive Access via Microsoft Graph API
Docker container for accessing JRD OneDrive
"""

import os
import json
import sys
from msal import ConfidentialClientApplication
import requests

# Configuration paths
CONFIG_PATH = os.getenv('MS_CONFIG_PATH', '/root/.ms_app_config.json')
TOKEN_PATH = os.getenv('MS_TOKEN_PATH', '/root/.ms_daemon_token.json')

# Graph API endpoints
GRAPH_API_BASE = 'https://graph.microsoft.com/v1.0'
SCOPES = ['https://graph.microsoft.com/.default']

class OneDriveAccess:
    def __init__(self):
        self.load_config()
        self.app = ConfidentialClientApplication(
            client_id=self.config['client_id'],
            client_credential=self.config['client_secret'],
            authority=f"https://login.microsoftonline.com/{self.config['tenant_id']}"
        )
        self.token = self.get_token()
    
    def load_config(self):
        """Load MS Graph configuration"""
        try:
            with open(CONFIG_PATH, 'r') as f:
                self.config = json.load(f)
        except Exception as e:
            print(f"Error loading config: {e}", file=sys.stderr)
            sys.exit(1)
    
    def get_token(self):
        """Get or refresh access token"""
        # Try to load cached token
        cached_token = None
        if os.path.exists(TOKEN_PATH):
            try:
                with open(TOKEN_PATH, 'r') as f:
                    token_data = json.load(f)
                    cached_token = token_data.get('access_token')
            except:
                pass
        
        # Get new token
        result = self.app.acquire_token_for_client(scopes=SCOPES)
        
        if 'access_token' in result:
            # Save token
            with open(TOKEN_PATH, 'w') as f:
                json.dump(result, f, indent=2)
            return result['access_token']
        else:
            error = result.get('error_description', result.get('error', 'Unknown error'))
            print(f"Token acquisition failed: {error}", file=sys.stderr)
            sys.exit(1)
    
    def _request(self, endpoint, method='GET', **kwargs):
        """Make authenticated Graph API request"""
        url = f"{GRAPH_API_BASE}{endpoint}"
        headers = {
            'Authorization': f'Bearer {self.token}',
            'Content-Type': 'application/json'
        }
        headers.update(kwargs.pop('headers', {}))
        
        response = requests.request(method, url, headers=headers, **kwargs)
        
        if response.status_code == 401:
            # Token expired, refresh
            self.token = self.get_token()
            headers['Authorization'] = f'Bearer {self.token}'
            response = requests.request(method, url, headers=headers, **kwargs)
        
        response.raise_for_status()
        return response
    
    def list_users(self):
        """List all users in the organization"""
        response = self._request('/users')
        return response.json().get('value', [])
    
    def get_drive(self, user_id='me'):
        """Get OneDrive for a user"""
        endpoint = f'/users/{user_id}/drive' if user_id != 'me' else '/me/drive'
        response = self._request(endpoint)
        return response.json()
    
    def list_files(self, user_id='me', path='/', top=100):
        """List files in OneDrive"""
        if user_id == 'me':
            endpoint = f'/me/drive/root:{path}:/children'
        else:
            endpoint = f'/users/{user_id}/drive/root:{path}:/children'
        
        params = {'$top': top}
        response = self._request(endpoint, params=params)
        return response.json().get('value', [])
    
    def download_file(self, user_id='me', file_path, save_path=None):
        """Download a file from OneDrive"""
        if user_id == 'me':
            endpoint = f'/me/drive/root:{file_path}:/content'
        else:
            endpoint = f'/users/{user_id}/drive/root:{file_path}:/content'
        
        response = self._request(endpoint)
        
        if save_path:
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            with open(save_path, 'wb') as f:
                f.write(response.content)
            return save_path
        return response.content
    
    def upload_file(self, user_id='me', local_path, remote_path):
        """Upload a file to OneDrive"""
        if user_id == 'me':
            endpoint = f'/me/drive/root:{remote_path}:/content'
        else:
            endpoint = f'/users/{user_id}/drive/root:{remote_path}:/content'
        
        with open(local_path, 'rb') as f:
            content = f.read()
        
        headers = {'Content-Type': 'application/octet-stream'}
        response = self._request(endpoint, method='PUT', headers=headers, data=content)
        return response.json()
    
    def search_files(self, user_id='me', query='', top=100):
        """Search files in OneDrive"""
        if user_id == 'me':
            endpoint = '/me/drive/root/search(q=\'{}\')'.format(query)
        else:
            endpoint = f'/users/{user_id}/drive/root/search(q=\'{query}\')'
        
        params = {'$top': top}
        response = self._request(endpoint, params=params)
        return response.json().get('value', [])

def main():
    """Interactive CLI"""
    od = OneDriveAccess()
    
    print("=" * 60)
    print("JRD OneDrive Access - Docker Container")
    print("=" * 60)
    print()
    
    # List available users
    print("Available users:")
    users = od.list_users()
    user_map = {}
    for i, user in enumerate(users[:10], 1):  # Show first 10
        email = user.get('mail', user.get('userPrincipalName', 'N/A'))
        user_id = user.get('id')
        user_map[str(i)] = user_id
        print(f"  {i}. {email} ({user.get('displayName', 'N/A')})")
    print()
    
    # Get user selection
    if len(sys.argv) > 1:
        user_choice = sys.argv[1]
    else:
        user_choice = input("Select user (1-10) or email/ID, or 'me' for current user: ").strip()
    
    if user_choice in user_map:
        user_id = user_map[user_choice]
    elif user_choice.lower() == 'me':
        user_id = 'me'
    else:
        # Try to find by email or use as ID
        user_id = user_choice
    
    # Get path
    if len(sys.argv) > 2:
        path = sys.argv[2]
    else:
        path = input("Enter path (default: /): ").strip() or '/'
    
    print(f"\nListing files for user {user_id} at path: {path}")
    print("-" * 60)
    
    try:
        files = od.list_files(user_id, path)
        if not files:
            print("No files found.")
        else:
            for item in files:
                item_type = '📁' if 'folder' in item else '📄'
                name = item.get('name', 'N/A')
                size = item.get('size', 0)
                size_str = f"{size:,} bytes" if size else "N/A"
                print(f"{item_type} {name} ({size_str})")
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        sys.exit(1)

if __name__ == '__main__':
    main()
