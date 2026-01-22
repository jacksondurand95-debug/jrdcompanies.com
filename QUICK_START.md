# Quick Start Guide - Editing the jdR Companies Website

This guide helps you make common updates to the website quickly.

## 🎨 Changing Colors

Edit `/css/styles.css` and modify the CSS variables at the top:

```css
:root {
    --primary-color: #2c3e50;     /* Navy blue - header, titles */
    --secondary-color: #e74c3c;   /* Red - buttons, accents */
    --accent-color: #3498db;      /* Blue - links, highlights */
    --text-color: #333;           /* Main text color */
    --light-bg: #f8f9fa;          /* Light gray - section backgrounds */
}
```

## 📝 Updating Text Content

### Update Company Description
Edit `/index.html`, find the `#about` section:
```html
<section id="about">
    <div class="container">
        <h2>About John des Rosiers</h2>
        <p>YOUR NEW TEXT HERE...</p>
    </div>
</section>
```

### Update Portfolio Items
Edit `/index.html`, find the `portfolio-grid` section:
```html
<div class="portfolio-item">
    <h3>Business Name</h3>
    <p>Business description</p>
    <a href="link-to-business-page.html" class="btn">Learn More</a>
</div>
```

### Update Contact Information
Edit `/index.html`, find the `#contact` section:
```html
<div class="contact-details">
    <h3>Location</h3>
    <p>Your Address Line 1<br>City, State ZIP</p>
</div>
```

## 🖼️ Adding Images

### 1. Add Logo
1. Place your logo file in `/images/` folder (e.g., `logo.png`)
2. Edit `/index.html`, find the logo section in the header:
```html
<div class="logo">
    <img src="images/logo.png" alt="jdR Companies Logo" style="height: 50px;">
</div>
```

### 2. Add Portfolio Images
For each portfolio item:
```html
<div class="portfolio-item">
    <img src="images/inovasi-restaurant.jpg" alt="Inovasi Restaurant" style="width: 100%; border-radius: 8px; margin-bottom: 1rem;">
    <h3>Inovasi Restaurant</h3>
    <p>Description...</p>
</div>
```

### 3. Add Hero Background Image
Edit `/css/styles.css`, update the `#hero` section:
```css
#hero {
    background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), 
                url('../images/hero-background.jpg');
    background-size: cover;
    background-position: center;
    /* ... rest of styles ... */
}
```

## 🔗 Adding New Pages

### 1. Create New HTML File
Create a new file (e.g., `inovasi-restaurant.html`):
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Inovasi Restaurant | jdR Companies</title>
    <link rel="stylesheet" href="css/styles.css">
</head>
<body>
    <!-- Copy header from index.html -->
    
    <main>
        <section>
            <div class="container">
                <h1>Inovasi Restaurant</h1>
                <!-- Your content here -->
            </div>
        </section>
    </main>
    
    <!-- Copy footer from index.html -->
    <script src="js/main.js"></script>
</body>
</html>
```

### 2. Link to New Page
Update the button in `index.html`:
```html
<a href="inovasi-restaurant.html" class="btn">Learn More</a>
```

## 📱 Adding Social Media Links

### In Footer
Edit `/index.html`, find the footer and add:
```html
<div class="footer-section">
    <h3>Follow Us</h3>
    <div class="social-links">
        <a href="https://facebook.com/jdrcompanies" target="_blank" rel="noopener noreferrer">Facebook</a>
        <a href="https://instagram.com/jdrcompanies" target="_blank" rel="noopener noreferrer">Instagram</a>
        <a href="https://twitter.com/jdrcompanies" target="_blank" rel="noopener noreferrer">Twitter</a>
    </div>
</div>
```

### Add Icons (Optional)
Use Font Awesome or similar:
1. Add to `<head>` in `index.html`:
```html
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
```

2. Use icons:
```html
<a href="https://facebook.com/jdrcompanies"><i class="fab fa-facebook"></i></a>
<a href="https://instagram.com/jdrcompanies"><i class="fab fa-instagram"></i></a>
```

## 📧 Setting Up Contact Form

The current form is client-side only. To make it functional:

### Option 1: Formspree (Easiest)
1. Sign up at [Formspree.io](https://formspree.io)
2. Get your form endpoint
3. Edit `/index.html`, update the form:
```html
<form action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
    <!-- Keep existing form fields -->
</form>
```

### Option 2: Netlify Forms
1. Deploy to Netlify
2. Add `netlify` attribute to form:
```html
<form name="contact" method="POST" data-netlify="true">
    <input type="hidden" name="form-name" value="contact">
    <!-- Keep existing form fields -->
</form>
```

## 🎯 Adding Google Analytics

1. Get your Google Analytics tracking ID
2. Add before closing `</head>` tag in `index.html`:
```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'GA_MEASUREMENT_ID');
</script>
```

## 🍕 Adding Menus for Restaurants

Create a new section in the restaurant page:
```html
<section id="menu">
    <div class="container">
        <h2>Our Menu</h2>
        <div class="menu-section">
            <h3>Appetizers</h3>
            <div class="menu-item">
                <div class="menu-item-header">
                    <h4>Menu Item Name</h4>
                    <span class="price">$12.99</span>
                </div>
                <p class="description">Item description...</p>
            </div>
        </div>
    </div>
</section>
```

Add to `/css/styles.css`:
```css
.menu-section {
    margin: 2rem 0;
}

.menu-item {
    border-bottom: 1px solid var(--border-color);
    padding: 1rem 0;
}

.menu-item-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.price {
    font-weight: bold;
    color: var(--secondary-color);
}
```

## 📅 Adding Business Hours

In the contact section:
```html
<div class="contact-details">
    <h3>Location & Hours</h3>
    <p>28 E Center Ave<br>Lake Bluff, IL 60044</p>
    <h4>Hours</h4>
    <ul class="hours-list">
        <li>Monday - Friday: 11am - 10pm</li>
        <li>Saturday: 10am - 11pm</li>
        <li>Sunday: 10am - 9pm</li>
    </ul>
</div>
```

## 🎬 Adding Videos

### YouTube Video Embed
```html
<div class="video-container">
    <iframe width="560" height="315" 
            src="https://www.youtube.com/embed/VIDEO_ID" 
            title="Video Title" 
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
            allowfullscreen>
    </iframe>
</div>
```

Add to CSS for responsive videos:
```css
.video-container {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 aspect ratio */
    height: 0;
    overflow: hidden;
}

.video-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
}
```

## 📍 Adding Google Maps

In the contact section:
```html
<div class="map-container">
    <iframe 
        src="https://www.google.com/maps/embed?pb=YOUR_EMBED_CODE" 
        width="600" 
        height="450" 
        style="border:0;" 
        allowfullscreen="" 
        loading="lazy">
    </iframe>
</div>
```

Get embed code from Google Maps → Share → Embed a map

## 🚀 Publishing Changes

After making edits:

```bash
# 1. Test locally
python3 -m http.server 8000
# Visit http://localhost:8000 in browser

# 2. Commit changes
git add .
git commit -m "Updated website content"

# 3. Push to GitHub
git push origin main

# If using GitHub Pages, Netlify, or Vercel, changes will auto-deploy!
```

## 🆘 Common Issues

### Images not showing
- Check file path: use `images/filename.jpg` not `/images/filename.jpg`
- Ensure file extension is correct (.jpg, .png, etc.)
- Check file is actually uploaded to `/images/` folder

### CSS not applying
- Clear browser cache (Ctrl+Shift+R or Cmd+Shift+R)
- Check CSS file path in HTML `<link>` tag
- Verify CSS file uploaded correctly

### Mobile layout broken
- Test at different screen sizes
- Use browser DevTools (F12) → Toggle device toolbar
- Ensure you didn't modify media queries in CSS

## 📚 Further Resources

- [MDN Web Docs](https://developer.mozilla.org/) - HTML/CSS/JS reference
- [CSS-Tricks](https://css-tricks.com/) - CSS guides and tips
- [Can I Use](https://caniuse.com/) - Browser compatibility checker

For more detailed information, see:
- `README.md` - Full project documentation
- `DEPLOYMENT.md` - Deployment instructions
