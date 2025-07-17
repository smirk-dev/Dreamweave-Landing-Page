// Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.stat-number');

    counters.forEach(counter => {
        const originalText = counter.textContent;
        // Extract numeric part and suffix
        const match = originalText.match(/^(\d+)(\+|%|\/\d+)?$/);
        if (!match) return; // Skip if not a simple number or number+suffix

        const number = parseInt(match[1]);
        const suffix = match[2] || '';

        // Skip animation for "24/7"
        if (originalText.includes('/')) return;

        let current = 0;
        const increment = Math.max(1, Math.ceil(number / 100));

        function updateCounter() {
            if (current < number) {
                current += increment;
                if (current > number) current = number;
                counter.textContent = current + suffix;
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = number + suffix;
            }
        }
        updateCounter();
    });
}

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats-grid');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    statsObserver.observe(statsSection);
}

// Add loading animation to buttons
document.querySelectorAll('.btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        if (this.type !== 'submit') {
            this.classList.add('loading');
            this.style.transform = 'scale(0.98)';
            setTimeout(() => {
                this.classList.remove('loading');
                this.style.transform = '';
            }, 150);
        }
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
    });

    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Handle window resize
window.addEventListener('resize', () => {
    // Close mobile menu on resize
    const navMenu = document.getElementById('nav-menu');
    if (window.innerWidth > 768 && navMenu) {
        navMenu.classList.remove('active');
    }
});

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    const navMenu = document.getElementById('nav-menu');
    if (e.key === 'Escape' && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
    }
});

// Performance optimization: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to scroll events
const debouncedScrollHandler = debounce(() => {
    // Scroll-based animations here (AOS handles most now)
}, 10);

window.addEventListener('scroll', debouncedScrollHandler);

// Initialize AOS (Animate On Scroll) library
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800, // values from 0 to 3000 with step 50ms
        once: true,    // whether animation should happen only once - while scrolling down
        mirror: false, // whether elements should animate out while scrolling past them
    });

    // Initialize particles.js
    // IMPORTANT: Ensure particles.min.js is loaded BEFORE this script.js
    // Also, make sure particles.json is in the correct path relative to your HTML.
    if (typeof particlesJS !== 'undefined') {
        particlesJS.load('particles-js', 'particles.json', function() {
            console.log('particles.js loaded - callback');
        });
    } else {
        console.warn('particles.js not found. Interactive background will not load.');
    }
});