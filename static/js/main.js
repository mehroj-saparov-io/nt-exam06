/**
 * Student Course Management System - JavaScript
 * Interactive features and animations
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ============================================
    // Smooth Scroll for Internal Links
    // ============================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
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

    // ============================================
    // Form Validation Enhancements
    // ============================================
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input[required], select[required], textarea[required]');
        
        inputs.forEach(input => {
            // Real-time validation feedback
            input.addEventListener('blur', function() {
                validateInput(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('is-invalid')) {
                    validateInput(this);
                }
            });
        });
        
        // Form submission validation
        form.addEventListener('submit', function(e) {
            let isValid = true;
            inputs.forEach(input => {
                if (!validateInput(input)) {
                    isValid = false;
                }
            });
            
            if (!isValid) {
                e.preventDefault();
                // Scroll to first error
                const firstError = form.querySelector('.has-error');
                if (firstError) {
                    firstError.scrollIntoView({
                        behavior: 'smooth',
                        block: 'center'
                    });
                }
            }
        });
    });
    
    function validateInput(input) {
        const formGroup = input.closest('.form-group');
        
        if (!input.value.trim() && input.hasAttribute('required')) {
            if (formGroup) {
                formGroup.classList.add('has-error');
            }
            return false;
        }
        
        // Email validation
        if (input.type === 'email') {
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(input.value)) {
                if (formGroup) {
                    formGroup.classList.add('has-error');
                }
                return false;
            }
        }
        
        // Number validation
        if (input.type === 'number') {
            const value = parseInt(input.value);
            const min = input.min ? parseInt(input.min) : null;
            const max = input.max ? parseInt(input.max) : null;
            
            if (min !== null && value < min) {
                if (formGroup) {
                    formGroup.classList.add('has-error');
                }
                return false;
            }
            
            if (max !== null && value > max) {
                if (formGroup) {
                    formGroup.classList.add('has-error');
                }
                return false;
            }
        }
        
        if (formGroup) {
            formGroup.classList.remove('has-error');
        }
        return true;
    }

    // ============================================
    // Delete Confirmation with Animation
    // ============================================
    const deleteForms = document.querySelectorAll('form[action*="delete"]');
    deleteForms.forEach(form => {
        form.addEventListener('submit', function(e) {
            const confirmed = this.getAttribute('data-confirmed');
            if (confirmed !== 'true') {
                e.preventDefault();
                
                const itemName = this.getAttribute('data-item-name') || 'bu elementni';
                const message = `Rostdan ham ${itemName} o'chirmoqchimisiz? Bu amalni bekor qilish mumkin emas.`;
                
                if (confirm(message)) {
                    this.setAttribute('data-confirmed', 'true');
                    this.submit();
                }
            }
        });
    });

    // ============================================
    // Animated Counter for Stats
    // ============================================
    const statValues = document.querySelectorAll('.stat-value');
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const statObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const finalValue = parseInt(target.textContent);
                animateValue(target, 0, finalValue, 1000);
                statObserver.unobserve(target);
            }
        });
    }, observerOptions);
    
    statValues.forEach(stat => {
        if (!isNaN(parseInt(stat.textContent))) {
            statObserver.observe(stat);
        }
    });
    
    function animateValue(element, start, end, duration) {
        const startTime = performance.now();
        
        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            
            // Easing function for smooth animation
            const easeOutQuart = 1 - Math.pow(1 - progress, 4);
            const current = Math.floor(start + (end - start) * easeOutQuart);
            
            element.textContent = current;
            
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = end;
            }
        }
        
        requestAnimationFrame(update);
    }

    // ============================================
    // Auto-hide Messages/Alerts
    // ============================================
    const alerts = document.querySelectorAll('.alert');
    alerts.forEach(alert => {
        setTimeout(() => {
            alert.style.transition = 'opacity 0.5s, transform 0.5s';
            alert.style.opacity = '0';
            alert.style.transform = 'translateX(100px)';
            setTimeout(() => {
                alert.remove();
            }, 500);
        }, 5000);
        
        // Click to dismiss
        alert.style.cursor = 'pointer';
        alert.addEventListener('click', function() {
            this.style.opacity = '0';
            this.style.transform = 'translateX(100px)';
            setTimeout(() => {
                this.remove();
            }, 500);
        });
    });

    // ============================================
    // Table Row Hover Effects
    // ============================================
    const tableRows = document.querySelectorAll('.table-row');
    tableRows.forEach(row => {
        row.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.01)';
        });
        
        row.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    // ============================================
    // Card Stagger Animation on Load
    // ============================================
    const cards = document.querySelectorAll('.course-card, .student-item, .stat-card');
    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s, transform 0.5s';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });

    // ============================================
    // Lazy Load Images (if any)
    // ============================================
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));

    // ============================================
    // Search/Filter Debounce
    // ============================================
    const searchInputs = document.querySelectorAll('.filter-input[type="text"]');
    searchInputs.forEach(input => {
        let timeout;
        input.addEventListener('input', function() {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                // Auto-submit form after typing stops
                const form = this.closest('form');
                if (form && this.value.length >= 3) {
                    // Optional: auto-submit filter forms
                    // form.submit();
                }
            }, 500);
        });
    });

    // ============================================
    // Tooltip Enhancement
    // ============================================
    const tooltipElements = document.querySelectorAll('[title]');
    tooltipElements.forEach(element => {
        const title = element.getAttribute('title');
        element.removeAttribute('title');
        element.setAttribute('data-tooltip', title);
        
        element.addEventListener('mouseenter', function(e) {
            const tooltip = document.createElement('div');
            tooltip.className = 'custom-tooltip';
            tooltip.textContent = this.getAttribute('data-tooltip');
            tooltip.style.cssText = `
                position: absolute;
                background: rgba(0, 0, 0, 0.9);
                color: white;
                padding: 0.5rem 1rem;
                border-radius: 0.5rem;
                font-size: 0.875rem;
                pointer-events: none;
                z-index: 1000;
                white-space: nowrap;
            `;
            document.body.appendChild(tooltip);
            
            const rect = this.getBoundingClientRect();
            tooltip.style.left = rect.left + (rect.width / 2) - (tooltip.offsetWidth / 2) + 'px';
            tooltip.style.top = rect.top - tooltip.offsetHeight - 8 + 'px';
            
            this._tooltip = tooltip;
        });
        
        element.addEventListener('mouseleave', function() {
            if (this._tooltip) {
                this._tooltip.remove();
                this._tooltip = null;
            }
        });
    });

    // ============================================
    // Keyboard Shortcuts
    // ============================================
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K: Focus search
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.querySelector('.filter-input[type="text"]');
            if (searchInput) {
                searchInput.focus();
            }
        }
        
        // Escape: Clear focus
        if (e.key === 'Escape') {
            document.activeElement.blur();
        }
    });

    // ============================================
    // Print Styles Enhancement
    // ============================================
    window.addEventListener('beforeprint', function() {
        document.body.classList.add('printing');
    });
    
    window.addEventListener('afterprint', function() {
        document.body.classList.remove('printing');
    });

    // ============================================
    // Performance: Reduce Motion for Users
    // ============================================
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    
    if (prefersReducedMotion.matches) {
        document.querySelectorAll('*').forEach(element => {
            element.style.animation = 'none';
            element.style.transition = 'none';
        });
    }

    // ============================================
    // Console Welcome Message
    // ============================================
    console.log('%c📚 Student Course Management System', 'color: #667eea; font-size: 20px; font-weight: bold;');
    console.log('%cDjango Template-based Project', 'color: #764ba2; font-size: 14px;');
    console.log('%cBuilt with ❤️ for Education', 'color: #666; font-size: 12px;');
});

// ============================================
// Utility Functions
// ============================================

// Debounce function
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

// Throttle function
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Format number with commas
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// Smooth scroll to element
function smoothScrollTo(element, duration = 500) {
    const targetPosition = element.getBoundingClientRect().top + window.pageYOffset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;
    
    function animation(currentTime) {
        if (startTime === null) startTime = currentTime;
        const timeElapsed = currentTime - startTime;
        const run = ease(timeElapsed, startPosition, distance, duration);
        window.scrollTo(0, run);
        if (timeElapsed < duration) requestAnimationFrame(animation);
    }
    
    function ease(t, b, c, d) {
        t /= d / 2;
        if (t < 1) return c / 2 * t * t + b;
        t--;
        return -c / 2 * (t * (t - 2) - 1) + b;
    }
    
    requestAnimationFrame(animation);
}