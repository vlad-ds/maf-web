# Money as Finance Research Network Website

A minimalist, Apple-inspired website for the Money as Finance Research Network. Built with clean HTML, CSS, and JavaScript following modern web standards.

## Features

- **Minimalist Design**: Clean, Apple-inspired interface with black/white color scheme
- **Times Roman Typography**: Professional serif font throughout
- **Fully Responsive**: Works perfectly on desktop, tablet, and mobile devices
- **Smooth Animations**: Subtle hover effects and scroll animations
- **Newsletter Signup**: Built-in email subscription form
- **Mobile-Friendly Navigation**: Hamburger menu for small screens
- **YouTube Integration Ready**: Placeholder sections for video content

## Structure

```
website/
├── index.html          # Main homepage
├── css/
│   └── style.css       # All styles and responsive design
├── js/
│   └── script.js       # Interactive functionality
├── images/             # Place your images here
└── README.md          # This file
```

## Sections

The website includes the following sections:

1. **Hero Section**: Main introduction with call-to-action buttons
2. **About**: Network overview and mission
3. **Research Focus**: Four key research areas with cards
4. **Events**: Workshop information and upcoming events
5. **Publications**: Research domains and publication areas
6. **Videos**: YouTube integration and video content
7. **Partners**: Collaborating institutions and organizations
8. **Contact & Newsletter**: Contact information and email signup

## Customization Guide

### Adding Your Logo
1. Create a logo image and save it in the `images/` folder
2. In `index.html`, replace the text logo with:
```html
<div class="logo">
    <img src="images/your-logo.png" alt="Money as Finance Research Network" height="40">
</div>
```

### Adding YouTube Videos
1. Get your YouTube video embed codes
2. In the Videos section, replace the placeholder content with:
```html
<div class="video-item">
    <iframe width="100%" height="315" src="https://www.youtube.com/embed/YOUR_VIDEO_ID" frameborder="0" allowfullscreen></iframe>
    <h3>Video Title</h3>
    <p>Video description...</p>
</div>
```

### Adding Real Partners
1. Add partner logos to the `images/` folder
2. Replace the placeholder partner cards with:
```html
<div class="partner-card">
    <img src="images/partner-logo.png" alt="Partner Name">
    <h3>Partner Name</h3>
    <p>Brief description of partnership</p>
</div>
```

### Adding Events
To add new events, duplicate the event card structure in the Events section:
```html
<div class="event-card">
    <h3>Event Title</h3>
    <p class="event-date">Date</p>
    <p>Event description...</p>
    <a href="#" class="btn-primary">Register</a>
</div>
```

### Adding Publications
Add new publication items to the Publications section:
```html
<div class="publication-item">
    <h3>Publication Title</h3>
    <p class="publication-authors">Author names</p>
    <p>Publication description...</p>
    <a href="#" class="btn-secondary">Read More</a>
</div>
```

### Newsletter Integration
The newsletter form is ready for backend integration. To connect it to your email service:

1. Update the form action in `index.html`:
```html
<form class="newsletter-form" action="your-backend-endpoint" method="POST">
```

2. Or modify the JavaScript in `js/script.js` to send data to your API:
```javascript
// Replace the console.log with actual API call
fetch('your-api-endpoint', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: email })
});
```

## Technical Details

- **Framework**: Vanilla HTML, CSS, and JavaScript (no dependencies)
- **CSS Grid & Flexbox**: Modern layout techniques
- **Responsive Design**: Mobile-first approach
- **Performance**: Optimized images and minimal JavaScript
- **Browser Support**: Works in all modern browsers

## Color Scheme

- **Primary**: Black (#000)
- **Secondary**: White (#fff)
- **Text**: Dark gray (#333)
- **Borders**: Light gray (#e0e0e0)
- **Background**: Light gray (#f8f8f8)

## Deployment

To deploy the website:

1. Upload all files to your web server
2. Ensure the folder structure is maintained
3. Update any absolute paths if needed
4. Configure your domain's DNS settings

## Future Enhancements

Consider adding:
- Content Management System (CMS) integration
- Blog functionality
- Member login system
- Event registration system
- Publication database with search
- Multi-language support

## Browser Compatibility

Tested and optimized for:
- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## Support

For questions about customization or technical issues, refer to the inline comments in the code or contact your developer.

---

*Built with modern web standards and Apple-inspired design principles.* 