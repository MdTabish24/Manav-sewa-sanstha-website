// Wait for DOM to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Navigation scroll effect
    const navbar = document.getElementById('navbar');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
            
            if (navMenu.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'auto';
            }
        });
    }
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
            document.body.style.overflow = 'auto';
        });
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Counter animation for statistics
    const counters = document.querySelectorAll('.stat-number, .impact-number');
    const speed = 200;
    
    const countUp = (counter) => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;
        
        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(() => countUp(counter), 10);
        } else {
            counter.innerText = target.toLocaleString();
            // Add plus sign for percentage
            if (counter.closest('.impact-card') && counter.innerText.includes('45') || counter.innerText.includes('85')) {
                counter.innerText = counter.innerText + '%';
            }
            // Add plus sign for numbers
            if (counter.innerText === '12000' || counter.innerText === '3000' || counter.innerText === '25' || counter.innerText === '15') {
                counter.innerText = counter.innerText + '+';
            }
        }
    };
    
    // Intersection Observer for counter animation
    const observerOptions = {
        threshold: 0.5,
        rootMargin: '0px'
    };
    
    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                countUp(counter);
                observer.unobserve(counter);
            }
        });
    }, observerOptions);
    
    counters.forEach(counter => {
        counterObserver.observe(counter);
    });
    
    // Scroll reveal animation
    const revealElements = document.querySelectorAll('.program-card, .story-card, .mv-card, .impact-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(30px)';
                
                setTimeout(() => {
                    entry.target.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
                
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });
    
    revealElements.forEach(element => {
        revealObserver.observe(element);
    });
    
    // Parallax effect for hero section
    const heroSection = document.querySelector('.hero-background');
    if (heroSection) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const parallax = -scrolled * 0.5;
            heroSection.style.transform = `translateY(${parallax}px)`;
        });
    }
    
    // Form handling
    const csrForm = document.getElementById('csr-form');
    if (csrForm) {
        csrForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Collect form data
            const formData = new FormData(csrForm);
            const data = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            
            // Show success message
            const button = csrForm.querySelector('button[type="submit"]');
            const originalText = button.innerText;
            button.innerText = 'Thank you! We will contact you soon.';
            button.style.background = 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)';
            
            // Reset form after 3 seconds
            setTimeout(() => {
                csrForm.reset();
                button.innerText = originalText;
                button.style.background = '';
            }, 3000);
        });
    }
    
    // Typing effect for hero title
    const heroTitle = document.querySelector('.hero-main-title');
    if (heroTitle) {
        const text = heroTitle.innerText;
        heroTitle.innerText = '';
        let index = 0;
        
        function typeWriter() {
            if (index < text.length) {
                heroTitle.innerText += text.charAt(index);
                index++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }
    
    // Image lazy loading
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
    
    // Sector carousel touch/swipe support
    const sectorsCarousel = document.querySelector('.sectors-carousel');
    if (sectorsCarousel) {
        let isDown = false;
        let startX;
        let scrollLeft;
        
        sectorsCarousel.addEventListener('mousedown', (e) => {
            isDown = true;
            sectorsCarousel.classList.add('active');
            startX = e.pageX - sectorsCarousel.offsetLeft;
            scrollLeft = sectorsCarousel.scrollLeft;
        });
        
        sectorsCarousel.addEventListener('mouseleave', () => {
            isDown = false;
            sectorsCarousel.classList.remove('active');
        });
        
        sectorsCarousel.addEventListener('mouseup', () => {
            isDown = false;
            sectorsCarousel.classList.remove('active');
        });
        
        sectorsCarousel.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault();
            const x = e.pageX - sectorsCarousel.offsetLeft;
            const walk = (x - startX) * 2;
            sectorsCarousel.scrollLeft = scrollLeft - walk;
        });
        
        // Touch events for mobile
        let touchStartX = 0;
        let touchScrollLeft = 0;
        
        sectorsCarousel.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].pageX - sectorsCarousel.offsetLeft;
            touchScrollLeft = sectorsCarousel.scrollLeft;
        });
        
        sectorsCarousel.addEventListener('touchmove', (e) => {
            const x = e.touches[0].pageX - sectorsCarousel.offsetLeft;
            const walk = (x - touchStartX) * 2;
            sectorsCarousel.scrollLeft = touchScrollLeft - walk;
        });
    }
    
    // Add floating animation to certain elements
    const floatingElements = document.querySelectorAll('.hero-badge, .experience-badge');
    floatingElements.forEach(element => {
        element.style.animation = 'float 3s ease-in-out infinite';
    });
    
    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes float {
            0% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
            100% { transform: translateY(0px); }
        }
        
        .sectors-carousel.active {
            cursor: grabbing;
        }
        
        .sectors-carousel {
            cursor: grab;
            -webkit-overflow-scrolling: touch;
            scrollbar-width: thin;
            scrollbar-color: var(--primary-color) var(--light-color);
        }
        
        .sectors-carousel::-webkit-scrollbar {
            height: 8px;
        }
        
        .sectors-carousel::-webkit-scrollbar-track {
            background: var(--light-color);
            border-radius: 10px;
        }
        
        .sectors-carousel::-webkit-scrollbar-thumb {
            background: var(--primary-color);
            border-radius: 10px;
        }
        
        .sectors-carousel::-webkit-scrollbar-thumb:hover {
            background: var(--dark-color);
        }
        
        /* Hamburger animation */
        .hamburger.active span:nth-child(1) {
            transform: rotate(-45deg) translate(-5px, 6px);
        }
        
        .hamburger.active span:nth-child(2) {
            opacity: 0;
        }
        
        .hamburger.active span:nth-child(3) {
            transform: rotate(45deg) translate(-5px, -6px);
        }
        
        /* Pulse animation for CTA buttons */
        @keyframes pulse {
            0% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
            }
            70% {
                box-shadow: 0 0 0 10px rgba(255, 255, 255, 0);
            }
            100% {
                box-shadow: 0 0 0 0 rgba(255, 255, 255, 0);
            }
        }
        
        .btn-primary {
            animation: pulse 2s infinite;
        }
    `;
    document.head.appendChild(style);
    
    // Add smooth fade-in for page load
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease-in';
    
    window.addEventListener('load', () => {
        document.body.style.opacity = '1';
    });
    
    // Interactive hover effects for cards
    const cards = document.querySelectorAll('.program-card, .story-card, .mv-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Progress bar on scroll
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        height: 3px;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        z-index: 10000;
        transition: width 0.2s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
        progressBar.style.width = scrollPercentage + '%';
    });
    
    // Back to top button
    const backToTop = document.createElement('button');
    backToTop.innerHTML = '<i class="fas fa-arrow-up"></i>';
    backToTop.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 50%;
        cursor: pointer;
        opacity: 0;
        transform: translateY(100px);
        transition: all 0.3s ease;
        z-index: 999;
        box-shadow: 0 4px 15px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(backToTop);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTop.style.opacity = '1';
            backToTop.style.transform = 'translateY(0)';
        } else {
            backToTop.style.opacity = '0';
            backToTop.style.transform = 'translateY(100px)';
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    // Add hover effect to back to top button
    backToTop.addEventListener('mouseenter', () => {
        backToTop.style.transform = 'translateY(0) scale(1.1)';
    });
    
    backToTop.addEventListener('mouseleave', () => {
        backToTop.style.transform = 'translateY(0) scale(1)';
    });
    
});

// Preloader
window.addEventListener('load', () => {
    const preloader = document.createElement('div');
    preloader.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: white;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
        transition: opacity 0.5s ease;
    `;
    
    preloader.innerHTML = `
        <div style="text-align: center;">
            <div style="width: 60px; height: 60px; border: 3px solid #f3f3f3; border-top: 3px solid #667eea; border-radius: 50%; animation: spin 1s linear infinite;"></div>
            <p style="margin-top: 20px; color: #667eea; font-weight: 600;">Loading...</p>
        </div>
    `;
    
    // Add spin animation
    const spinStyle = document.createElement('style');
    spinStyle.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(spinStyle);
    
    document.body.appendChild(preloader);
    
    setTimeout(() => {
        preloader.style.opacity = '0';
        setTimeout(() => {
            preloader.remove();
        }, 500);
    }, 1000);
});

// Enhanced animations and interactions
document.addEventListener('DOMContentLoaded', function() {
    
    // Animate text on hover for links
    const animateLinks = document.querySelectorAll('a');
    animateLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            if (!this.classList.contains('btn')) {
                this.style.transition = 'all 0.3s ease';
                this.style.letterSpacing = '0.5px';
            }
        });
        link.addEventListener('mouseleave', function() {
            if (!this.classList.contains('btn')) {
                this.style.letterSpacing = 'normal';
            }
        });
    });
    
    // Enhanced form validation
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        const inputs = form.querySelectorAll('input, textarea, select');
        
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                if (this.hasAttribute('required') && !this.value) {
                    this.style.borderColor = '#e74c3c';
                    this.style.boxShadow = '0 0 0 3px rgba(231, 76, 60, 0.1)';
                } else if (this.value) {
                    this.style.borderColor = '#27ae60';
                    this.style.boxShadow = '0 0 0 3px rgba(39, 174, 96, 0.1)';
                }
            });
            
            input.addEventListener('focus', function() {
                this.style.borderColor = '#667eea';
                this.style.boxShadow = '0 0 0 3px rgba(102, 126, 234, 0.1)';
            });
        });
    });
    
    // Dynamic year in footer
    const footerYear = document.querySelector('.footer-bottom p');
    if (footerYear) {
        const currentYear = new Date().getFullYear();
        footerYear.innerHTML = footerYear.innerHTML.replace('2024', currentYear);
    }
    
    // Note: Smooth page transitions removed to fix navigation issues
    // Pages now load normally without fade transition
    
    // Add ripple effect to buttons
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            ripple.className = 'ripple';
            this.appendChild(ripple);
            
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                left: ${x}px;
                top: ${y}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                transform: scale(0);
                animation: ripple-animation 0.6s ease-out;
                pointer-events: none;
            `;
            
            setTimeout(() => ripple.remove(), 600);
        });
    });
    
    // Add ripple animation style
    const rippleStyle = document.createElement('style');
    rippleStyle.textContent = `
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        .btn, button {
            position: relative;
            overflow: hidden;
        }
    `;
    document.head.appendChild(rippleStyle);
    
    // Enhanced testimonial carousel
    const testimonials = document.querySelectorAll('.story-card');
    if (testimonials.length > 0) {
        let currentTestimonial = 0;
        
        function autoRotateTestimonials() {
            testimonials.forEach((testimonial, index) => {
                if (index === currentTestimonial) {
                    testimonial.style.transform = 'scale(1.05)';
                    testimonial.style.boxShadow = '0 20px 40px rgba(0,0,0,0.15)';
                } else {
                    testimonial.style.transform = 'scale(1)';
                    testimonial.style.boxShadow = '';
                }
            });
            
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        }
        
        setInterval(autoRotateTestimonials, 5000);
    }
    
    // Add notification system
    window.showNotification = function(message, type = 'success') {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 15px 25px;
            background: ${type === 'success' ? 'linear-gradient(135deg, #27ae60, #2ecc71)' : 'linear-gradient(135deg, #e74c3c, #c0392b)'};
            color: white;
            border-radius: 10px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            transform: translateX(400px);
            transition: transform 0.3s ease;
            z-index: 10000;
            font-weight: 500;
        `;
        notification.textContent = message;
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    };
    
    // Enhanced scroll animations with stagger effect
    const animatedElements = document.querySelectorAll('[data-aos]');
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add cursor follower for desktop
    if (window.innerWidth > 768) {
        const cursorFollower = document.createElement('div');
        cursorFollower.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #667eea;
            border-radius: 50%;
            pointer-events: none;
            transition: all 0.1s ease;
            z-index: 9998;
            opacity: 0;
        `;
        document.body.appendChild(cursorFollower);
        
        document.addEventListener('mousemove', (e) => {
            cursorFollower.style.opacity = '1';
            cursorFollower.style.left = e.clientX - 10 + 'px';
            cursorFollower.style.top = e.clientY - 10 + 'px';
        });
        
        document.addEventListener('mouseleave', () => {
            cursorFollower.style.opacity = '0';
        });
        
        // Enlarge cursor on hover
        const hoverElements = document.querySelectorAll('a, button, .btn');
        hoverElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursorFollower.style.transform = 'scale(2)';
                cursorFollower.style.borderColor = '#764ba2';
            });
            element.addEventListener('mouseleave', () => {
                cursorFollower.style.transform = 'scale(1)';
                cursorFollower.style.borderColor = '#667eea';
            });
        });
    }
    
    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        // Press 'H' to go home
        if (e.key === 'h' || e.key === 'H') {
            window.location.href = 'index.html';
        }
        // Press 'C' to go to contact
        if (e.key === 'c' || e.key === 'C') {
            window.location.href = 'contact.html';
        }
        // Press '?' to show help
        if (e.key === '?') {
            showNotification('Keyboard shortcuts: H - Home, C - Contact, ? - Help', 'info');
        }
    });
});
