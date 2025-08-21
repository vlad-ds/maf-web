// Smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle functionality
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on a link
        const navLinks = document.querySelectorAll('.nav-menu a');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Handle navigation clicks
    const navLinks = document.querySelectorAll('.nav-menu a, .hero-buttons a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            if (this.getAttribute('href').startsWith('#')) {
                e.preventDefault();
                const targetId = this.getAttribute('href').substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // Newsletter form handling
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value.trim();
            
            if (email) {
                // Show success message
                const button = this.querySelector('button');
                const originalText = button.textContent;
                
                button.textContent = 'Subscribed!';
                button.style.backgroundColor = '#4CAF50';
                
                // Reset form
                emailInput.value = '';
                
                // Reset button after 3 seconds
                setTimeout(() => {
                    button.textContent = originalText;
                    button.style.backgroundColor = '#000';
                }, 3000);
                
                // In a real application, you would send this data to your server
                console.log('Newsletter subscription:', email);
            }
        });
    }

    // Add scroll effect to navbar
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });

    // Add intersection observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all cards and sections
    const animatedElements = document.querySelectorAll(
        '.research-card, .domain-card, .video-placeholder, .partner-placeholder, .event-card'
    );
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    // Mobile menu toggle (for future enhancement)
    const createMobileMenu = () => {
        const nav = document.querySelector('.nav-container');
        const menuButton = document.createElement('button');
        menuButton.className = 'mobile-menu-toggle';
        menuButton.innerHTML = '☰';
        menuButton.style.display = 'none';
        menuButton.style.background = 'none';
        menuButton.style.border = 'none';
        menuButton.style.fontSize = '1.5rem';
        menuButton.style.cursor = 'pointer';
        
        const navMenu = document.querySelector('.nav-menu');
        
        // Add mobile styles
        const style = document.createElement('style');
        style.textContent = `
            @media (max-width: 768px) {
                .mobile-menu-toggle {
                    display: block !important;
                }
                
                .nav-menu {
                    position: fixed;
                    top: 60px;
                    left: -100%;
                    width: 100%;
                    height: calc(100vh - 60px);
                    background-color: rgba(255, 255, 255, 0.98);
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    padding-top: 2rem;
                    transition: left 0.3s ease;
                    backdrop-filter: blur(10px);
                }
                
                .nav-menu.active {
                    left: 0;
                }
                
                .nav-menu li {
                    margin: 1rem 0;
                }
                
                .nav-menu a {
                    font-size: 1.2rem;
                }
            }
        `;
        document.head.appendChild(style);
        
        // Toggle functionality
        menuButton.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
        
        // Close menu when clicking on links
        navMenu.addEventListener('click', (e) => {
            if (e.target.tagName === 'A') {
                navMenu.classList.remove('active');
            }
        });
        
        nav.appendChild(menuButton);
    };
    
    createMobileMenu();

    // Add typing effect to hero text (coordinated with logo animation)
    const heroText = document.querySelector('.hero-content h2');
    if (heroText) {
        const originalText = heroText.textContent;
        heroText.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < originalText.length) {
                heroText.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 60);
            }
        };
        
        // Start typing effect after logo animation completes (3200ms)
        setTimeout(typeWriter, 3200);
    }

    // Publication filtering system
    const filterButtons = document.querySelectorAll('.filter-btn');
    const publicationCards = document.querySelectorAll('.publication-card');
    const tags = document.querySelectorAll('.tag');
    const researchFocuses = document.querySelectorAll('.clickable-focus');

    // Filter function
    function filterPublications(targetFilter) {
        // Update active filter button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        const activeButton = document.querySelector(`[data-filter="${targetFilter}"]`);
        if (activeButton) activeButton.classList.add('active');

        // Show/hide publications with limit of 4 per filter
        let visibleCount = 0;
        const maxVisible = 4;
        
        publicationCards.forEach(card => {
            const cardTags = card.getAttribute('data-tags');
            if (targetFilter === 'all' || (cardTags && cardTags.includes(targetFilter))) {
                if (visibleCount < maxVisible) {
                    card.classList.remove('hidden');
                    visibleCount++;
                } else {
                    card.classList.add('hidden');
                }
            } else {
                card.classList.add('hidden');
            }
        });

        // Scroll to publications section
        document.getElementById('publications').scrollIntoView({ 
            behavior: 'smooth', 
            block: 'start' 
        });
    }

    // Initialize page with only 4 publications visible
    function initializePublications() {
        let visibleCount = 0;
        const maxVisible = 4;
        
        publicationCards.forEach(card => {
            if (visibleCount < maxVisible) {
                card.classList.remove('hidden');
                visibleCount++;
            } else {
                card.classList.add('hidden');
            }
        });
    }

    // Call initialization
    initializePublications();

    // Filter button click handlers
    filterButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.getAttribute('data-filter');
            filterPublications(filter);
        });
    });

    // Tag click handlers
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const focus = tag.getAttribute('data-focus');
            filterPublications(focus);
        });
    });

    // Research focus card click handlers
    researchFocuses.forEach(focus => {
        focus.addEventListener('click', () => {
            const focusType = focus.getAttribute('data-focus');
            filterPublications(focusType);
        });
        
        // Add hover effect to indicate clickability
        focus.style.cursor = 'pointer';
        focus.addEventListener('mouseenter', () => {
            focus.style.transform = 'translateY(-2px)';
            focus.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.15)';
        });
        focus.addEventListener('mouseleave', () => {
            focus.style.transform = 'translateY(0)';
            focus.style.boxShadow = 'none';
        });
    });

    // People section tab functionality
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    console.log('Tab buttons found:', tabButtons.length);
    console.log('Tab contents found:', tabContents.length);

    tabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault();
            const targetTab = button.getAttribute('data-tab');
            console.log('Tab clicked:', targetTab);
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            // Show corresponding tab content
            const targetContent = document.getElementById(`${targetTab}-tab`);
            console.log('Target content element:', targetContent);
            if (targetContent) {
                targetContent.classList.add('active');
                console.log('Tab switched to:', targetTab);
            } else {
                console.error('Could not find tab content for:', targetTab);
            }
        });
    });

    // Add parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Reposition logo to normal position after animation
    setTimeout(() => {
        const heroLogo = document.querySelector('.hero-logo');
        if (heroLogo) {
            heroLogo.style.position = 'relative';
            heroLogo.style.top = 'auto';
            heroLogo.style.left = 'auto';
            heroLogo.style.transform = 'none';
            heroLogo.style.zIndex = '100';
            heroLogo.style.marginBottom = '2rem';
            heroLogo.style.opacity = '1';
        }
    }, 4500);
    
    // Step 3: Add typewriter effect after background appears
    setTimeout(() => {
        typewriterEffect();
    }, 4800); // Start typing 0.3s after background appears (4.5s + 0.3s)
    
    // Load Bluesky feed
    loadBlueskyFeed();
    
    // Load RSS feed
    loadRSSFeed();
});

// Typewriter effect function
function typewriterEffect() {
    const heroDescription = document.querySelector('.hero-content p');
    const heroButtons = document.querySelector('.hero-buttons');
    
    if (!heroDescription || !heroButtons) return;
    
    // Use fixed text for description only
    const descriptionText = "Advancing understanding of money and finance through interdisciplinary collaboration.";
    
    // Clear description content and show hero content container
    heroDescription.textContent = '';
    heroButtons.style.opacity = '0';
    
    // Make hero content visible (override CSS animation)
    const heroContent = document.querySelector('.hero-content');
    heroContent.style.opacity = '1';
    
    let descriptionIndex = 0;
    
    // Type the description
    function typeDescription() {
        if (descriptionIndex < descriptionText.length) {
            heroDescription.textContent += descriptionText.charAt(descriptionIndex);
            descriptionIndex++;
            setTimeout(typeDescription, 40); // Typing speed
        } else {
            // Show buttons after description is complete
            setTimeout(() => {
                heroButtons.style.opacity = '1';
                heroButtons.style.transition = 'opacity 0.5s ease-in-out';
            }, 500);
        }
    }
    
    // Start typing the description immediately
    typeDescription();
}

// Utility functions for future enhancements
const utils = {
    // Smooth scroll to element
    scrollTo: (elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    },
    
    // Simple fade in animation
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.display = 'block';
        
        let start = null;
        const fade = (timestamp) => {
            if (!start) start = timestamp;
            const progress = timestamp - start;
            element.style.opacity = Math.min(progress / duration, 1);
            
            if (progress < duration) {
                requestAnimationFrame(fade);
            }
        };
        
        requestAnimationFrame(fade);
    },
    
    // Validate email format
    validateEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }
};

// Export utils for global use
window.utils = utils;

// Bluesky feed loader
async function loadBlueskyFeed() {
    const blueskyContainer = document.getElementById('bluesky-posts');
    if (!blueskyContainer) return;
    
    try {
        // Bluesky AT Protocol API endpoint for public posts
        const handle = 'moneyfinance.bsky.social';
        const response = await fetch(`https://public.api.bsky.app/xrpc/app.bsky.feed.getAuthorFeed?actor=${handle}&limit=5`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch Bluesky posts');
        }
        
        const data = await response.json();
        const posts = data.feed;
        
        // Clear loading placeholder
        blueskyContainer.innerHTML = '';
        
        if (posts && posts.length > 0) {
            posts.forEach(item => {
                const post = item.post;
                const postElement = createBlueskyPostElement(post);
                blueskyContainer.appendChild(postElement);
            });
        } else {
            blueskyContainer.innerHTML = '<p>No recent posts found.</p>';
        }
    } catch (error) {
        console.error('Error loading Bluesky feed:', error);
        blueskyContainer.innerHTML = `
            <div class="error-message">
                <p>Unable to load Bluesky posts at the moment.</p>
                <a href="https://bsky.app/profile/moneyfinance.bsky.social" target="_blank" class="btn-secondary">Visit our Bluesky profile</a>
            </div>
        `;
    }
}

function createBlueskyPostElement(post) {
    const postDiv = document.createElement('div');
    postDiv.className = 'bluesky-post';
    
    const createdAt = new Date(post.indexedAt);
    const timeAgo = getTimeAgo(createdAt);
    
    postDiv.innerHTML = `
        <div class="bluesky-post-header">
            <span class="bluesky-post-author">${post.author.displayName || post.author.handle}</span>
            <span class="bluesky-post-handle">@${post.author.handle}</span>
            <span class="bluesky-post-time">${timeAgo}</span>
        </div>
        <div class="bluesky-post-content">${post.record.text}</div>
    `;
    
    return postDiv;
}

function getTimeAgo(date) {
    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    
    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    return `${Math.floor(diffInSeconds / 86400)}d ago`;
}

// RSS Feed loader
async function loadRSSFeed() {
    const rssContainer = document.getElementById('rss-feed');
    if (!rssContainer) return;
    
    // You'll need to replace this URL with your actual RSS feed URL
    const rssUrl = 'https://your-website.com/rss.xml'; // Replace with your RSS feed URL
    
    try {
        // Using a CORS proxy service for RSS feeds (you may need to adjust this)
        const proxyUrl = `https://api.rss2json.com/v1/api.json?rss_url=${encodeURIComponent(rssUrl)}&api_key=YOUR_API_KEY&count=5`;
        
        // For now, we'll show a placeholder since we need your actual RSS URL
        showRSSPlaceholder(rssContainer);
        
    } catch (error) {
        console.error('Error loading RSS feed:', error);
        showRSSError(rssContainer);
    }
}

function showRSSPlaceholder(container) {
    container.innerHTML = `
        <div class="rss-error">
            <h3>RSS Feed Configuration Needed</h3>
            <p>To display your RSS feed, please provide:</p>
            <ul style="text-align: left; max-width: 400px; margin: 1rem auto;">
                <li>Your RSS feed URL</li>
                <li>API key for RSS2JSON service (optional)</li>
            </ul>
            <p>Once configured, this section will display your latest updates automatically.</p>
            <div class="rss-refresh">
                <button onclick="loadRSSFeed()">Refresh Feed</button>
            </div>
        </div>
    `;
}

function showRSSError(container) {
    container.innerHTML = `
        <div class="rss-error">
            <h3>Unable to Load RSS Feed</h3>
            <p>There was an issue loading the RSS feed. Please check your connection and try again.</p>
            <div class="rss-refresh">
                <button onclick="loadRSSFeed()">Retry</button>
            </div>
        </div>
    `;
}

function parseRSSFeed(data) {
    const container = document.getElementById('rss-feed');
    if (!container) return;
    
    container.innerHTML = '';
    
    if (data.items && data.items.length > 0) {
        data.items.forEach(item => {
            const rssItem = createRSSItem(item);
            container.appendChild(rssItem);
        });
        
        // Add refresh button
        const refreshDiv = document.createElement('div');
        refreshDiv.className = 'rss-refresh';
        refreshDiv.innerHTML = '<button onclick="loadRSSFeed()">Refresh Feed</button>';
        container.appendChild(refreshDiv);
    } else {
        container.innerHTML = '<div class="rss-error"><p>No recent updates found.</p></div>';
    }
}

function createRSSItem(item) {
    const itemDiv = document.createElement('div');
    itemDiv.className = 'rss-item';
    
    const pubDate = new Date(item.pubDate);
    const formattedDate = pubDate.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    
    // Clean up description (remove HTML tags if present)
    const description = item.description ? 
        item.description.replace(/<[^>]*>/g, '').substring(0, 300) + '...' : 
        'No description available.';
    
    itemDiv.innerHTML = `
        <div class="rss-item-title">
            <a href="${item.link}" target="_blank">${item.title}</a>
        </div>
        <div class="rss-item-meta">
            <span class="rss-item-date">${formattedDate}</span>
            ${item.author ? `<span class="rss-item-author">by ${item.author}</span>` : ''}
        </div>
        <div class="rss-item-description">${description}</div>
        <a href="${item.link}" target="_blank" class="rss-item-link">Read More</a>
    `;
    
    return itemDiv;
} 