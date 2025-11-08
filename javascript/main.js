// main.js

document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation Toggle
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    const header = document.getElementById('header');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            // Change hamburger icon
            const icon = hamburger.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    // Header scroll effect
    if (header) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = header ? header.offsetHeight : 0;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animate skill bars on scroll
    const skillBars = document.querySelectorAll('.skill-progress');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barPosition = bar.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.3;
            
            if (barPosition < screenPosition) {
                const width = bar.getAttribute('data-width') || '0';
                bar.style.width = width + '%';
            }
        });
    }
    
    // Initialize skill bars at 0
    skillBars.forEach(bar => {
        bar.style.width = '0%';
    });
    
    if (skillBars.length > 0) {
        window.addEventListener('scroll', animateSkillBars);
        // Initial check
        setTimeout(animateSkillBars, 100);
    }

    // Project card hover effects
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Contact form handling
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // Show success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Active navigation link highlighting
    const sections = document.querySelectorAll('section[id]');
    const navItems = document.querySelectorAll('.nav-links a[href^="#"]');
    
    function highlightNavLink() {
        let current = '';
        const headerHeight = header ? header.offsetHeight : 0;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= (sectionTop - headerHeight - 50) && 
                window.scrollY < (sectionTop + sectionHeight - headerHeight - 50)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            const href = item.getAttribute('href');
            if (href === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    if (sections.length > 0 && navItems.length > 0) {
        window.addEventListener('scroll', highlightNavLink);
        highlightNavLink(); // Initial call
    }

    // Floating elements animation
    const floatingElements = document.querySelectorAll('.floating-element');
    
    floatingElements.forEach((element, index) => {
        // Add random delay to each element for more natural movement
        const randomDelay = Math.random() * 5;
        element.style.animationDelay = `${randomDelay}s`;
    });

    // Education timeline animation
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    function animateTimeline() {
        timelineItems.forEach(item => {
            const itemPosition = item.getBoundingClientRect().top;
            const screenPosition = window.innerHeight / 1.2;
            
            if (itemPosition < screenPosition) {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state and animate on scroll
    if (timelineItems.length > 0) {
        timelineItems.forEach(item => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        });
        
        animateTimeline();
        window.addEventListener('scroll', animateTimeline);
    }

    // Counter animation for stats
    const stats = document.querySelectorAll('.stat h4');
    let countersAnimated = false;

    function animateCounters() {
        if (countersAnimated) return;
        
        const statsContainer = document.querySelector('.about-stats');
        if (!statsContainer) return;
        
        const containerPosition = statsContainer.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (containerPosition < screenPosition) {
            stats.forEach(stat => {
                const originalText = stat.getAttribute('data-original') || stat.textContent;
                const target = parseInt(originalText.replace('+', '')) || 0;
                
                // Only animate if we haven't already
                if (!stat.hasAttribute('data-animated')) {
                    let count = 0;
                    const duration = 2000; // 2 seconds
                    const increment = target / (duration / 16); // 60fps
                    
                    const updateCount = () => {
                        count += increment;
                        if (count < target) {
                            stat.textContent = Math.ceil(count) + '+';
                            requestAnimationFrame(updateCount);
                        } else {
                            stat.textContent = originalText;
                            stat.setAttribute('data-animated', 'true');
                            
                            // Check if all counters are done
                            const allAnimated = Array.from(stats).every(s => 
                                s.hasAttribute('data-animated')
                            );
                            if (allAnimated) {
                                countersAnimated = true;
                            }
                        }
                    };
                    
                    updateCount();
                }
            });
        }
    }

    // Initialize counters
    function initCounters() {
        if (stats.length > 0) {
            // Store original values and set initial state
            stats.forEach(stat => {
                const originalText = stat.textContent;
                stat.setAttribute('data-original', originalText);
                stat.textContent = '0+';
                stat.removeAttribute('data-animated'); // Reset animation state
            });
            
            countersAnimated = false; // Reset animation flag
            
            window.addEventListener('scroll', animateCounters);
            animateCounters(); // Initial check
        }
    }

    // Initialize counters when page loads
    initCounters();

    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Remove loading styles after a delay
        setTimeout(() => {
            const loadingStyle = document.querySelector('style[data-loading]');
            if (loadingStyle) {
                loadingStyle.remove();
            }
        }, 500);
    });

    // Add loading styles dynamically
    const loadingStyles = `
        body:not(.loaded) {
            overflow: hidden;
        }
        body:not(.loaded)::before {
            content: '';
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--light);
            z-index: 9999;
            display: flex;
            align-items: center;
            justify-content: center;
        }
        body:not(.loaded)::after {
            content: 'Loading...';
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            font-size: 1.5rem;
            color: var(--primary);
            z-index: 10000;
            font-weight: 600;
        }
        .nav-links a.active {
            color: var(--primary);
        }
        .nav-links a.active::after {
            width: 100%;
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.setAttribute('data-loading', 'true');
    styleSheet.textContent = loadingStyles;
    document.head.appendChild(styleSheet);
});

// Additional utility function for scroll performance
let scrollTimer;
window.addEventListener('scroll', function() {
    if (scrollTimer) {
        clearTimeout(scrollTimer);
    }
    scrollTimer = setTimeout(function() {
        // Throttled scroll actions can go here
    }, 10);
});