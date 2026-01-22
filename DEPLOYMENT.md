# Deployment Guide for jdR Companies Website

This guide provides step-by-step instructions for deploying the jdR Companies website to various hosting platforms.

## Prerequisites

- Git installed on your computer
- Repository cloned locally or forked on GitHub
- Domain ownership (if using custom domain)

## Option 1: GitHub Pages (Recommended)

GitHub Pages is free and easy to set up for static websites.

### Steps:

1. **Push to GitHub** (if not already done)
   ```bash
   git push origin main
   ```

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Scroll down to "Pages" in the left sidebar
   - Under "Source", select the branch (e.g., `main` or `copilot/fetch-jrdcompanies-site-data`)
   - Select folder: `/ (root)`
   - Click "Save"

3. **Custom Domain Setup**
   - The CNAME file is already included in the repository
   - In GitHub Pages settings, enter your custom domain: `jrdcompanies.com`
   - Configure DNS with your domain provider:
     - **Option A**: Add A records pointing to:
       - 185.199.108.153
       - 185.199.109.153
       - 185.199.110.153
       - 185.199.111.153
     - **Option B**: Add CNAME record pointing to: `yourusername.github.io`
   - Enable "Enforce HTTPS" in GitHub Pages settings

4. **Verify Deployment**
   - Wait 5-10 minutes for DNS propagation
   - Visit `https://jrdcompanies.com` to see your site live

## Option 2: Netlify

Netlify offers continuous deployment and easy setup.

### Steps:

1. **Sign up/Login** to [Netlify](https://netlify.com)

2. **Deploy from Git**
   - Click "New site from Git"
   - Choose GitHub and authorize
   - Select the `jrdcompanies.com` repository
   - Configure build settings:
     - Build command: (leave empty)
     - Publish directory: `/` or `.`
   - Click "Deploy site"

3. **Custom Domain**
   - Go to "Domain settings"
   - Click "Add custom domain"
   - Enter: `jrdcompanies.com`
   - Follow DNS configuration instructions
   - Netlify will automatically provision SSL certificate

4. **Continuous Deployment**
   - Every push to the repository will automatically deploy
   - Netlify provides preview URLs for pull requests

## Option 3: Vercel

Vercel provides fast deployment with edge network.

### Steps:

1. **Sign up/Login** to [Vercel](https://vercel.com)

2. **Import Project**
   - Click "New Project"
   - Import from GitHub
   - Select `jrdcompanies.com` repository
   - Leave default settings (no framework, build command empty)
   - Click "Deploy"

3. **Custom Domain**
   - Go to project settings → Domains
   - Add `jrdcompanies.com`
   - Update DNS records as instructed
   - SSL is automatic

## Option 4: Traditional Web Hosting (cPanel/FTP)

For traditional shared hosting providers.

### Steps:

1. **Download Files**
   ```bash
   git clone https://github.com/yourusername/jrdcompanies.com.git
   cd jrdcompanies.com
   ```

2. **Upload via FTP**
   - Use FileZilla, Cyberduck, or your hosting control panel
   - Upload all files to your web root directory (usually `public_html` or `www`)
   - Ensure the file structure is maintained:
     ```
     public_html/
     ├── index.html
     ├── css/
     ├── js/
     ├── images/
     ├── 404.html
     ├── robots.txt
     └── sitemap.xml
     ```

3. **Configure Domain**
   - Point your domain to your hosting server IP
   - Configure SSL certificate (Let's Encrypt is usually free)

## Option 5: AWS S3 + CloudFront

For enterprise-grade hosting with CDN.

### Steps:

1. **Create S3 Bucket**
   ```bash
   aws s3 mb s3://jrdcompanies.com
   ```

2. **Enable Static Website Hosting**
   - In S3 console, go to bucket properties
   - Enable "Static website hosting"
   - Index document: `index.html`
   - Error document: `404.html`

3. **Upload Files**
   ```bash
   aws s3 sync . s3://jrdcompanies.com --exclude ".git/*"
   ```

4. **Configure Bucket Policy**
   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Sid": "PublicReadGetObject",
         "Effect": "Allow",
         "Principal": "*",
         "Action": "s3:GetObject",
         "Resource": "arn:aws:s3:::jrdcompanies.com/*"
       }
     ]
   }
   ```

5. **Set up CloudFront**
   - Create CloudFront distribution
   - Origin: S3 bucket
   - Configure custom SSL certificate
   - Add CNAME: `jrdcompanies.com`

6. **Update DNS**
   - Point domain to CloudFront distribution URL

## Post-Deployment Checklist

After deployment, verify:

- [ ] Website loads at `https://jrdcompanies.com`
- [ ] All navigation links work
- [ ] Contact form functions properly
- [ ] CSS and JavaScript files load correctly
- [ ] Images display (when added)
- [ ] Mobile responsiveness
- [ ] HTTPS is enabled and working
- [ ] 404 page displays for broken links
- [ ] robots.txt is accessible at `/robots.txt`
- [ ] sitemap.xml is accessible at `/sitemap.xml`

## Updating the Site

### For GitHub Pages, Netlify, or Vercel:
```bash
# Make changes to files
git add .
git commit -m "Update website content"
git push origin main
# Site will auto-deploy
```

### For Traditional Hosting:
- Make changes locally
- Re-upload modified files via FTP
- Clear browser cache to see changes

## Troubleshooting

### Site not loading
- Check DNS propagation (use tools like whatsmydns.net)
- Verify DNS records are correct
- Wait 24-48 hours for full DNS propagation

### CSS/JS not loading
- Check file paths in HTML
- Ensure files are uploaded to correct directories
- Clear browser cache

### Custom domain not working
- Verify CNAME file exists in repository root
- Check DNS configuration
- Ensure SSL certificate is issued

### Contact form not working
- Current form uses JavaScript only
- For production, integrate with:
  - Formspree
  - Netlify Forms
  - AWS Lambda
  - Custom backend server

## Support

For deployment issues:
- Check hosting provider documentation
- GitHub Pages: https://docs.github.com/pages
- Netlify: https://docs.netlify.com
- Vercel: https://vercel.com/docs

For website customization, refer to the main README.md file.
