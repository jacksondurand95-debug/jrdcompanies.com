#!/usr/bin/env python3
"""
Fetch jrdcompanies.com site files from OneDrive
"""
import os
import json
import sys
from msal import ConfidentialClientApplication
import requests

CONFIG_PATH = os.path.expanduser('~/.ms_app_config.json')
TOKEN_PATH = os.path.expanduser('~/.ms_daemon_token.json')
GRAPH_API_BASE = 'https://graph.microsoft.com/v1.0'
SCOPES = ['https://graph.microsoft.com/.default']

def get_token(config):
    app = ConfidentialClientApplication(
        client_id=config['client_id'],
        client_credential=config['client_secret'],
        authority=f"https://login.microsoftonline.com/{config['tenant_id']}"
    )
    result = app.acquire_token_for_client(scopes=SCOPES)
    if 'access_token' in result:
        with open(TOKEN_PATH, 'w') as f:
            json.dump(result, f, indent=2)
        return result['access_token']
    else:
        print(f"Token error: {result.get('error_description', result.get('error'))}", file=sys.stderr)
        sys.exit(1)

def list_files(user_id, path='/', token=None):
    """List files in OneDrive"""
    if user_id == 'me':
        endpoint = f'/me/drive/root:{path}:/children'
    else:
        endpoint = f'/users/{user_id}/drive/root:{path}:/children'
    
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(f"{GRAPH_API_BASE}{endpoint}", headers=headers)
    if response.status_code == 401:
        return None  # Token expired
    response.raise_for_status()
    return response.json().get('value', [])

def download_file(user_id, file_path, save_path, token=None):
    """Download a file from OneDrive"""
    if user_id == 'me':
        endpoint = f'/me/drive/root:{file_path}:/content'
    else:
        endpoint = f'/users/{user_id}/drive/root:{file_path}:/content'
    
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(f"{GRAPH_API_BASE}{endpoint}", headers=headers)
    if response.status_code == 401:
        return None
    response.raise_for_status()
    
    os.makedirs(os.path.dirname(save_path), exist_ok=True)
    with open(save_path, 'wb') as f:
        f.write(response.content)
    return save_path

def main():
    # Load config
    with open(CONFIG_PATH, 'r') as f:
        config = json.load(f)
    
    token = get_token(config)
    
    # Search for jrdcompanies.com files
    user_id = 'jdurand@jrdcompanies.com'
    
    print("Searching OneDrive for jrdcompanies.com files...")
    
    # Try common locations
    paths_to_check = [
        '/',
        '/Documents',
        '/Documents/jrdcompanies.com',
        '/jrdcompanies.com',
        '/Sites',
        '/Websites'
    ]
    
    found_files = []
    for path in paths_to_check:
        try:
            files = list_files(user_id, path, token)
            if files is None:  # Token expired
                token = get_token(config)
                files = list_files(user_id, path, token)
            
            if files:
                print(f"\nFound {len(files)} items in {path}:")
                for item in files:
                    name = item.get('name', 'N/A')
                    item_type = '📁' if 'folder' in item else '📄'
                    print(f"  {item_type} {name}")
                    
                    # Look for HTML files or jrdcompanies.com related
                    if 'jrdcompanies' in name.lower() or name.endswith('.html') or name == 'index.html':
                        found_files.append((path, item))
        except Exception as e:
            print(f"Error checking {path}: {e}")
            continue
    
    # Download found files
    if found_files:
        print(f"\n\nDownloading {len(found_files)} files...")
        for path, item in found_files:
            file_path = f"{path.rstrip('/')}/{item['name']}"
            save_path = f"./{item['name']}"
            try:
                download_file(user_id, file_path, save_path, token)
                print(f"✓ Downloaded: {save_path}")
            except Exception as e:
                print(f"✗ Error downloading {item['name']}: {e}")
    else:
        print("\nNo jrdcompanies.com files found. Listing all files in root:")
        try:
            files = list_files(user_id, '/', token)
            if files:
                for item in files[:20]:  # First 20
                    print(f"  {'📁' if 'folder' in item else '📄'} {item.get('name', 'N/A')}")
        except Exception as e:
            print(f"Error: {e}")

if __name__ == '__main__':
    main()
