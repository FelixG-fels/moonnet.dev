/**
 * Moonnet DevOps - Bilingual Landing Page
 * Main JavaScript Application
 */

// ============================================
// Language Management
// ============================================

/**
 * Set the active language and update DOM
 * @param {string} lang - Language code: 'en' or 'ar'
 */
function setLanguage(lang) {
    let isArabic = lang === 'ar';
    const htmlElement = document.documentElement;
    
    // Validate language parameter
    if (!['en', 'ar'].includes(lang)) {
        console.warn(`Invalid language: ${lang}. Defaulting to English.`);
        lang = 'en';
        isArabic = false;
    }
    
    // Set direction and language attributes
    htmlElement.dir = isArabic ? 'rtl' : 'ltr';
    htmlElement.lang = lang;
    
    // Hide all language-specific content
    document.querySelectorAll('.en, .ar').forEach(elem => {
        elem.classList.add('hidden');
    });
    
    // Show content for selected language
    const selector = isArabic ? '.ar' : '.en';
    document.querySelectorAll(selector).forEach(elem => {
        elem.classList.remove('hidden');
    });
    
    // Update active language button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    // Mark current language button as active
    const langButtons = document.querySelectorAll('.lang-btn');
    if (isArabic && langButtons.length > 1) {
        langButtons[1].classList.add('active');
    } else if (!isArabic && langButtons.length > 0) {
        langButtons[0].classList.add('active');
    }
    
    // Save user preference
    localStorage.setItem('moonnet-language', lang);
    
    // Trigger custom event for other components
    window.dispatchEvent(new CustomEvent('languageChanged', { detail: { lang } }));
    
    console.log(`✅ Language changed to: ${lang === 'ar' ? 'العربية' : 'English'}`);
}

// ============================================
// Initialize Language on Page Load
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure DOM is fully painted
    setTimeout(function() {
        // Restore saved language preference or default to English
        const savedLang = localStorage.getItem('moonnet-language') || 'en';
        setLanguage(savedLang);
        
        // Initialize all interactive features
        initializeLanguageToggle();
        initializeSmoothScroll();
        initializeScrollAnimations();
        initializeFormHandling();
        initializeAnalytics();
        handleResponsive();
        initializeLazyLoading();
    }, 50);
});

// ============================================
// Language Toggle Button Listeners
// ============================================

function initializeLanguageToggle() {
    const langButtons = document.querySelectorAll('.lang-btn');
    
    langButtons.forEach((button, index) => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            // Use data-lang attribute if available, fallback to index
            const lang = (button.dataset && button.dataset.lang) ? button.dataset.lang : (index === 0 ? 'en' : 'ar');
            setLanguage(lang);
        });
    });
}

// ============================================
// Smooth Scroll to Sections
// ============================================

function initializeSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Skip if href is just '#'
            if (href === '#' || href === '') return;
            
            e.preventDefault();
            
            const target = document.querySelector(href);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// ============================================
// Scroll Animations (Fade In on Scroll)
// ============================================

function initializeScrollAnimations() {
    // Check if IntersectionObserver is supported
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported');
        return;
    }
    
    // Create Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                // Stop observing to avoid repeated work
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all cards and sections
    document.querySelectorAll('.offer-card, .roi-card, .pricing-card, .contact-method').forEach(elem => {
        elem.style.opacity = '0';
        elem.style.transform = 'translateY(20px)';
        elem.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(elem);
    });
}

// ============================================
// Form Handling & Link Tracking
// ============================================

function initializeFormHandling() {
    // Handle WhatsApp CTA buttons
    document.querySelectorAll('a[href*="wa.me"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('engagement', 'whatsapp_click', this.textContent.trim() || 'WhatsApp');
        });
    });
    
    // Handle email links
    document.querySelectorAll('a[href^="mailto:"]').forEach(link => {
        link.addEventListener('click', function() {
            trackEvent('engagement', 'email_click', this.textContent.trim() || 'Email');
        });
    });
    
    // Handle CTA buttons
    document.querySelectorAll('.cta-primary, .demo-button').forEach(btn => {
        btn.addEventListener('click', function() {
            const section = this.closest('section');
            const sectionName = section ? section.className.split(' ')[0] : 'unknown';
            trackEvent('conversion', 'cta_click', sectionName);
        });
    });
}

// ============================================
// Analytics & Tracking
// ============================================

function initializeAnalytics() {
    // Track page view
    trackEvent('page_view', 'moonnet_landing', document.title);
    
    // Track scroll depth
    let maxScrollDepth = 0;
    window.addEventListener('scroll', throttle(function() {
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        
        // Prevent division by zero
        if (scrollHeight <= 0) return;
        
        const scrollPercent = (window.scrollY / scrollHeight) * 100;
        if (scrollPercent > maxScrollDepth) {
            maxScrollDepth = Math.round(scrollPercent);
            if (maxScrollDepth % 25 === 0) {
                trackEvent('engagement', 'scroll_depth', `${maxScrollDepth}%`);
            }
        }
    }, 1000));
    
    // Track time on page
    setTimeout(() => {
        trackEvent('engagement', 'time_on_page', '30_seconds');
    }, 30000);
}

/**
 * Track custom events (with Google Analytics support)
 * @param {string} category - Event category
 * @param {string} action - Event action
 * @param {string} label - Event label
 */
function trackEvent(category, action, label) {
    // Validate parameters
    if (!category || !action) {
        console.warn('trackEvent requires category and action');
        return;
    }
    
    // Log to console for debugging
    console.log(`📊 Event: ${category} > ${action} > ${label}`);
    
    // Google Analytics (if loaded)
    if (typeof gtag !== 'undefined' && gtag) {
        try {
            gtag('event', action, {
                'event_category': category,
                'event_label': label || ''
            });
        } catch (error) {
            console.warn('Google Analytics tracking failed:', error);
        }
    }
    
    // Store in localStorage for analytics
    try {
        const eventLog = JSON.parse(localStorage.getItem('moonnet_events') || '[]');
        eventLog.push({
            category,
            action,
            label: label || 'none',
            timestamp: new Date().toISOString()
        });
        
        // Keep only last 100 events to prevent storage overflow
        if (eventLog.length > 100) {
            eventLog.shift();
        }
        
        localStorage.setItem('moonnet_events', JSON.stringify(eventLog));
    } catch (error) {
        console.warn('localStorage tracking failed:', error);
    }
}

// ============================================
// Utility Functions
// ============================================

/**
 * Throttle function for performance optimization
 * @param {function} func - Function to throttle
 * @param {number} limit - Time limit in ms
 * @returns {function} Throttled function
 */
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => { inThrottle = false; }, limit);
        }
    };
}

/**
 * Debounce function for event handlers
 * @param {function} func - Function to debounce
 * @param {number} delay - Delay in ms
 * @returns {function} Debounced function
 */
function debounce(func, delay) {
    let timeoutId;
    return function(...args) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => func.apply(this, args), delay);
    };
}

// ============================================
// Mobile Menu / Responsive Features
// ============================================

/**
 * Handle mobile responsiveness and touch events
 */
function handleResponsive() {
    const isMobile = window.innerWidth < 768;
    
    if (isMobile) {
        // Mobile-specific behavior - touch feedback
        document.querySelectorAll('.offer-card, .roi-card, .pricing-card').forEach(card => {
            // Avoid adding duplicate listeners on repeated calls
            if (card.dataset.touchListenerAdded === '1') return;
            
            card.addEventListener('touchstart', function() {
                this.style.transform = 'scale(0.98)';
            }, { passive: true });
            
            card.addEventListener('touchend', function() {
                this.style.transform = 'scale(1)';
            }, { passive: true });
            
            card.dataset.touchListenerAdded = '1';
        });
    }
}

window.addEventListener('resize', debounce(handleResponsive, 250));
window.addEventListener('load', handleResponsive);

// ============================================
// Dark Mode Toggle (Optional Feature)
// ============================================

/**
 * Toggle dark mode theme
 * @returns {boolean} Current dark mode state
 */
function toggleDarkMode() {
    const isDarkMode = localStorage.getItem('moonnet_dark_mode') === 'true';
    const newMode = !isDarkMode;
    
    if (newMode) {
        document.documentElement.style.setProperty('--navy', '#0d1b2a');
        document.documentElement.style.setProperty('--light-gray', '#1a1a1a');
        document.documentElement.style.setProperty('--white', '#222222');
    } else {
        document.documentElement.style.setProperty('--navy', '#0A1F44');
        document.documentElement.style.setProperty('--light-gray', '#F5F7FA');
        document.documentElement.style.setProperty('--white', '#FFFFFF');
    }
    
    localStorage.setItem('moonnet_dark_mode', newMode);
    console.log(`🌙 Dark mode ${newMode ? 'enabled' : 'disabled'}`);
    return newMode;
}

// ============================================
// Lazy Loading Images (Optional)
// ============================================

function initializeLazyLoading() {
    if (!('IntersectionObserver' in window)) {
        console.warn('IntersectionObserver not supported for lazy loading');
        return;
    }
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    img.classList.add('loaded');
                }
                observer.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// Performance Monitoring
// ============================================

/**
 * Log performance metrics to console
 */
function logPerformanceMetrics() {
    if (window.performance && window.performance.timing) {
        try {
            const timing = window.performance.timing;
            const metrics = {
                pageLoadTime: timing.loadEventEnd - timing.navigationStart,
                domReadyTime: timing.domContentLoadedEventEnd - timing.navigationStart,
                resourceLoadTime: timing.responseEnd - timing.fetchStart
            };
            
            console.log('📈 Performance Metrics:', metrics);
        } catch (error) {
            console.warn('Error logging performance metrics:', error);
        }
    }
}

window.addEventListener('load', logPerformanceMetrics);

// ============================================
// Error Handling
// ============================================

window.addEventListener('error', function(event) {
    console.error('❌ JavaScript Error:', event.error);
    
    // Only track if error has a message
    if (event.error && event.error.message) {
        trackEvent('error', 'javascript_error', event.error.message.substring(0, 100));
    }
});

window.addEventListener('unhandledrejection', function(event) {
    console.error('❌ Unhandled Promise Rejection:', event.reason);
    
    // Only track if reason exists
    if (event.reason) {
        const reason = typeof event.reason === 'string' ? event.reason : 'Unknown rejection';
        trackEvent('error', 'promise_rejection', reason.substring(0, 100));
    }
});

// ============================================
// Page Visibility Handler (Optional)
// ============================================

document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        trackEvent('engagement', 'page_hidden', 'user_left_tab');
    } else {
        trackEvent('engagement', 'page_visible', 'user_returned');
    }
});

// ============================================
// Export for testing
// ============================================

if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        setLanguage,
        trackEvent,
        throttle,
        debounce,
        toggleDarkMode,
        handleResponsive
    };
}

console.log('✅ Moonnet DevOps App Initialized Successfully');