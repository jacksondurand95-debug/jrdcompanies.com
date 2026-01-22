# jdR Companies Website

Official website for jdR Companies - Culinary expertise, restaurant concept development, and hospitality ventures based in Lake Bluff, Illinois.

## About

This website showcases the jdR family of companies founded by John des Rosiers, featuring over 25 years of experience in the restaurant industry. The site includes information about:

- **Portfolio of Businesses**: Inovasi Restaurant, The Otherdoor, Everett Farms, The Old Mill Lounge, JD Wine & Beer, and Half and Half Pizza Co.
- **Consulting Services**: Culinary consulting, concept development, operational efficiency, and business strategy
- **Contact Information**: Location at 28 E Center Ave, Lake Bluff, IL 60044

## Project Structure

```
jrdcompanies.com/
├── index.html          # Main homepage
├── css/
│   └── styles.css      # Stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── images/             # Image assets (to be added)
└── README.md           # This file
```

## Features

- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Smooth Scrolling**: Navigation links smoothly scroll to sections
- **Contact Form**: Functional contact form for inquiries
- **Accessibility**: Built with accessibility in mind
- **Modern UI**: Clean, professional design with animations
- **Portfolio Showcase**: Displays all business ventures

## Local Development

To run this website locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/jacksondurand95-debug/jrdcompanies.com.git
   cd jrdcompanies.com
   ```

2. Open `index.html` in your web browser:
   - **Option 1**: Double-click the `index.html` file
   - **Option 2**: Use a local server (recommended):
     ```bash
     # Using Python 3
     python -m http.server 8000
     
     # Using Node.js (if http-server is installed)
     npx http-server
     ```
   Then visit `http://localhost:8000` in your browser

## Deployment

### GitHub Pages

1. Go to repository Settings → Pages
2. Set Source to "Deploy from a branch"
3. Select branch: `main` or `copilot/fetch-jrdcompanies-site-data`
4. Set folder: `/ (root)`
5. Click Save
6. Your site will be published at `https://jacksondurand95-debug.github.io/jrdcompanies.com/`

### Custom Domain Setup

To use a custom domain (jrdcompanies.com):

1. Add a `CNAME` file to the repository root with your domain:
   ```
   jrdcompanies.com
   ```

2. Configure DNS settings with your domain provider:
   - Add an A record pointing to GitHub Pages IPs:
     - 185.199.108.153
     - 185.199.109.153
     - 185.199.110.153
     - 185.199.111.153
   - Or add a CNAME record pointing to `jacksondurand95-debug.github.io`

3. In GitHub Settings → Pages, enter your custom domain and enable HTTPS

### Other Hosting Options

This is a static website and can be deployed to:
- **Netlify**: Drag and drop the folder or connect to GitHub
- **Vercel**: Import the GitHub repository
- **AWS S3 + CloudFront**: Upload files to S3 bucket and configure CloudFront
- **Traditional Web Hosting**: Upload files via FTP to any web host

## Customization

### Updating Content

- **Business Information**: Edit the text in `index.html`
- **Portfolio Items**: Modify the portfolio grid section in `index.html`
- **Styling**: Change colors and styles in `css/styles.css`
- **Functionality**: Adjust behavior in `js/main.js`

### Adding Images

1. Place images in the `images/` directory
2. Reference them in HTML: `<img src="images/your-image.jpg" alt="Description">`

### Color Scheme

The site uses CSS custom properties (variables) defined in `css/styles.css`:
- `--primary-color`: #2c3e50 (Navy)
- `--secondary-color`: #e74c3c (Red)
- `--accent-color`: #3498db (Blue)

Modify these to change the color scheme throughout the site.

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Technologies Used

- HTML5
- CSS3 (with CSS Grid and Flexbox)
- Vanilla JavaScript (ES6+)
- Responsive Design
- Intersection Observer API for scroll animations

## Contact Form

The contact form currently uses client-side JavaScript. To make it fully functional:

1. **Option 1**: Use a form service like Formspree or Netlify Forms
2. **Option 2**: Implement a backend server to handle form submissions
3. **Option 3**: Use a serverless function (AWS Lambda, Netlify Functions, etc.)

## Future Enhancements

- Add individual pages for each portfolio business
- Implement photo galleries
- Add online reservation system integration
- Include customer testimonials
- Add blog/news section
- Integrate social media feeds
- Add menu displays for restaurants

## License

© 2026 jdR Companies. All rights reserved.

## Accessibility

This website strives to be accessible to all users following WCAG guidelines:
- Semantic HTML structure
- Proper heading hierarchy
- Alt text for images (to be added with images)
- Keyboard navigation support
- Sufficient color contrast
- Responsive text sizing

## Support

For questions or support, please contact through the website contact form or reach out to the repository maintainer. 
