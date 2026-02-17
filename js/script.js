// ===================================
// Ramadan 2026 Landing Page JavaScript
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all functionality
    initNavigation();
    initScrollEffects();
    initAnimations();
    initSmoothScroll();
});

// ===== NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Mobile menu toggle
    hamburger.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
        
        // Animate hamburger
        const spans = hamburger.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(7px, 7px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -7px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            
            const spans = hamburger.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        });
    });

    // Highlight active section in navigation
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== SCROLL EFFECTS =====
function initScrollEffects() {
    const scrollTopBtn = document.getElementById('scrollTop');

    // Show/hide scroll to top button
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });

    // Scroll to top functionality
    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// ===== ANIMATIONS =====
function initAnimations() {
    // Simple scroll-based animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aos-animate');
            }
        });
    }, observerOptions);

    // Observe all elements with data-aos attribute
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach(el => {
        observer.observe(el);
        
        // Add delay if specified
        const delay = el.getAttribute('data-aos-delay');
        if (delay) {
            el.style.transitionDelay = `${delay}ms`;
        }
    });

    // Add entrance animations to cards
    addCardAnimations();
    
    // Add counter animations to stats (if any)
    addCounterAnimations();
}

function addCardAnimations() {
    const cards = document.querySelectorAll('.khutbah-card, .stream-card, .resource-card');
    
    cards.forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
}

function addCounterAnimations() {
    const counters = document.querySelectorAll('[data-count]');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        let count = 0;
        const duration = 2000; // 2 seconds
        const increment = target / (duration / 16); // 60fps

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const timer = setInterval(() => {
                        count += increment;
                        if (count >= target) {
                            counter.textContent = target;
                            clearInterval(timer);
                        } else {
                            counter.textContent = Math.floor(count);
                        }
                    }, 16);
                    observer.unobserve(counter);
                }
            });
        }, { threshold: 0.5 });

        observer.observe(counter);
    });
}

// ===== SMOOTH SCROLL =====
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            
            // Skip if href is just '#'
            if (href === '#') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                const navbarHeight = document.getElementById('navbar').offsetHeight;
                const targetPosition = target.offsetTop - navbarHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ===== PARALLAX EFFECT =====
function initParallax() {
    const parallaxElements = document.querySelectorAll('.hero-pattern');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        
        parallaxElements.forEach(el => {
            const speed = 0.5;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        });
    });
}

// Initialize parallax on load
initParallax();

// ===== RESOURCE DOWNLOADS =====
function initResourceDownloads() {
    const downloadButtons = document.querySelectorAll('.btn-resource:not(.btn-disabled)');
    
    downloadButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Add download animation
            const icon = button.querySelector('i');
            if (icon) {
                icon.classList.remove('fa-download');
                icon.classList.add('fa-spinner', 'fa-spin');
                
                setTimeout(() => {
                    icon.classList.remove('fa-spinner', 'fa-spin');
                    icon.classList.add('fa-check');
                    
                    setTimeout(() => {
                        icon.classList.remove('fa-check');
                        icon.classList.add('fa-download');
                    }, 2000);
                }, 1000);
            }
        });
    });
}

// Initialize resource downloads
initResourceDownloads();

// ===== ENHANCED INTERACTIONS =====

// Add hover effects to khutbah cards
const khutbahCards = document.querySelectorAll('.khutbah-card');
khutbahCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        card.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'translateY(0) scale(1)';
    });
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add CSS for ripple effect dynamically
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.5);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ===== LAZY LOADING FOR IMAGES =====
function initLazyLoad() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading
initLazyLoad();

// ===== SCROLL PROGRESS INDICATOR =====
function createScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 4px;
        background: linear-gradient(90deg, #D4AF37, #006B3F);
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });
}

// Create scroll progress indicator
createScrollProgress();

// ===== PRINT STYLES =====
// Add print-friendly styles
const printStyle = document.createElement('style');
printStyle.setAttribute('media', 'print');
printStyle.textContent = `
    @media print {
        .navbar,
        .scroll-top,
        .hamburger,
        .hero-cta,
        .footer {
            display: none !important;
        }
        
        body {
            font-size: 12pt;
            color: black;
            background: white;
        }
        
        section {
            page-break-inside: avoid;
            padding: 20px 0;
        }
        
        .khutbah-card,
        .stream-card,
        .resource-card {
            page-break-inside: avoid;
            box-shadow: none;
            border: 1px solid #ccc;
        }
    }
`;
document.head.appendChild(printStyle);

// ===== ACCESSIBILITY ENHANCEMENTS =====
function enhanceAccessibility() {
    // Add skip to content link
    const skipLink = document.createElement('a');
    skipLink.href = '#main-content';
    skipLink.textContent = 'Skip to main content';
    skipLink.style.cssText = `
        position: absolute;
        left: -9999px;
        z-index: 999;
        padding: 1em;
        background-color: black;
        color: white;
        text-decoration: none;
    `;
    skipLink.addEventListener('focus', () => {
        skipLink.style.left = '0';
    });
    skipLink.addEventListener('blur', () => {
        skipLink.style.left = '-9999px';
    });
    document.body.insertBefore(skipLink, document.body.firstChild);
    
    // Add ARIA labels to interactive elements
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        if (!btn.getAttribute('aria-label')) {
            btn.setAttribute('aria-label', btn.textContent.trim());
        }
    });
    
    // Ensure all links have meaningful text
    const links = document.querySelectorAll('a');
    links.forEach(link => {
        if (!link.textContent.trim() && !link.getAttribute('aria-label')) {
            link.setAttribute('aria-label', 'Link');
        }
    });
}

// Enhance accessibility
enhanceAccessibility();

// ===== PERFORMANCE MONITORING =====
if (window.performance) {
    window.addEventListener('load', () => {
        const perfData = window.performance.timing;
        const pageLoadTime = perfData.loadEventEnd - perfData.navigationStart;
        console.log(`Page loaded in ${pageLoadTime}ms`);
    });
}

// ===== ERROR HANDLING =====
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.error);
});

// ===== CONSOLE MESSAGE =====
console.log('%c🌙 Ramadan 2026 Landing Page 🌙', 'font-size: 20px; font-weight: bold; color: #006B3F;');
console.log('%cفَاسْتَقِمْ كَمَا أُمِرْتَ', 'font-size: 16px; font-weight: bold; color: #D4AF37;');
console.log('%cSo be steadfast as you have been commanded (Qur\'an 11:112)', 'font-size: 14px; color: #666;');
console.log('%cDeveloped for Islamic Relief Canada', 'font-size: 12px; color: #999;');