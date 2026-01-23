# Deployment Instructions

## Current Status
- ✅ Commit ready locally: `9e11d40` - "Add Azure Static Web Apps deployment config and Docker OneDrive access tools"
- ❌ Push blocked: Network DNS resolution failing (can't resolve github.com)

## What's Ready
1. Azure Static Web Apps GitHub Actions workflow (`.github/workflows/azure-static-web-apps.yml`)
2. Static web app config (`staticwebapp.config.json`)
3. Site verified: Password gate "jackd" + 3 overlapping translucent logo windows

## How to Deploy

### Option 1: Push when network is available
```bash
cd /Users/jdurand/jrdcompanies.com
git push origin main
```

### Option 2: Use GitHub Desktop or another Git client
- Open the repo in GitHub Desktop
- Push the commit manually

### Option 3: Deploy bundle file
A bundle file `deploy.bundle` has been created. You can:
1. Transfer it to a machine with network access
2. Clone from bundle: `git clone deploy.bundle jrdcompanies-temp`
3. Add remote and push: `git remote add origin https://github.com/jacksondurand95-debug/jrdcompanies.com.git && git push origin main`

### Option 4: Manual file upload to GitHub
1. Go to: https://github.com/jacksondurand95-debug/jrdcompanies.com
2. Upload the new files via web interface:
   - `.github/workflows/azure-static-web-apps.yml`
   - `staticwebapp.config.json`
   - All other new files

## After Push
Once the commit is on GitHub:
1. GitHub Actions will automatically trigger
2. Azure Static Web Apps will deploy the site
3. Site will be live at jrdcompanies.com

## Required GitHub Secret
Make sure `AZURE_STATIC_WEB_APPS_API_TOKEN` is set in:
GitHub Repo → Settings → Secrets and variables → Actions

## Files Changed
- `.devcontainer/Dockerfile` (new)
- `.devcontainer/devcontainer.json` (modified)
- `.github/workflows/azure-static-web-apps.yml` (new)
- `DOCKER_ONEDRIVE.md` (new)
- `Dockerfile` (new)
- `docker-compose.yml` (new)
- `entrypoint.sh` (new)
- `fetch_onedrive_site.py` (new)
- `onedrive.sh` (new)
- `onedrive_access.py` (new)
- `requirements.txt` (new)
- `staticwebapp.config.json` (new)
