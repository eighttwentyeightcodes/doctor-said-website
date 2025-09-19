// Doctor's Website - Main JavaScript
(function() {
    // DOM Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    const navItems = document.querySelectorAll('.nav-links a');
    const allSections = document.querySelectorAll('section');
    const navbar = document.querySelector('.navbar');
    const appointmentForm = document.querySelector('.appointment-form');
    const contactForm = document.querySelector('.contact-form');
    const scrollIndicator = document.querySelector('.scroll-indicator');
    let lastScroll = 0;

    // Initialize the application
    function init() {
        setupMobileMenu();
        setupSmoothScrolling();
        setupStickyNav();
        setupForms();
        setupScrollReveal();
        setupScrollIndicator();
        setupActiveNavLinks();
        setupAnimations();
        setupBackToTop();
        
        // Update copyright year
        const yearSpan = document.querySelector('.footer-bottom p');
        if (yearSpan) {
            yearSpan.textContent = yearSpan.textContent.replace('2023', new Date().getFullYear());
        }
    }

    // Mobile Menu Functionality
    function setupMobileMenu() {
        if (!mobileMenuBtn || !navLinks) return;
        
        // Add animation styles
        const style = document.createElement('style');
        style.textContent = `
            @keyframes slideIn {
                from { transform: translateY(-20px); opacity: 0; }
                to { transform: translateY(0); opacity: 1; }
            }
            @keyframes fadeIn {
                from { opacity: 0; }
                to { opacity: 1; }
            }
            .nav-links {
                transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s ease;
            }
            .nav-links.active {
                display: flex;
                animation: fadeIn 0.3s ease-out forwards;
            }
            .nav-links li {
                opacity: 0;
                transform: translateY(10px);
                transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
            }
            .nav-links.active li {
                opacity: 1;
                transform: translateY(0);
            }
            .mobile-menu-btn {
                transition: transform 0.3s ease, background-color 0.3s ease;
            }
            .mobile-menu-btn.active {
                transform: rotate(90deg);
            }
        `;
        document.head.appendChild(style);
        
        // Toggle menu function
        const toggleMenu = () => {
            const isOpen = navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
            document.body.style.overflow = isOpen ? 'hidden' : '';
            
            // Animate menu items
            if (isOpen) {
                const navItems = navLinks.querySelectorAll('li');
                navItems.forEach((item, index) => {
                    item.style.transitionDelay = `${index * 0.1}s`;
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                });
            } else {
                const navItems = navLinks.querySelectorAll('li');
                navItems.forEach((item, index) => {
                    item.style.transitionDelay = '0s';
                    item.style.opacity = '0';
                    item.style.transform = 'translateY(10px)';
                });
            }
        };
        
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking on a link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                if (navLinks.classList.contains('active')) {
                    toggleMenu();
                }
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.nav-container') && navLinks.classList.contains('active')) {
                toggleMenu();
            }
        });
        
        // Handle window resize
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                    
                    // Reset menu items
                    const navItems = navLinks.querySelectorAll('li');
                    navItems.forEach(item => {
                        item.style.transitionDelay = '';
                        item.style.opacity = '';
                        item.style.transform = '';
                    });
                }
            }, 250);
        });
    }

    // Smooth Scrolling for Anchor Links
    function setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // About section scroll animations
    const aboutSection = document.querySelector('#about');
    const summaries = document.querySelectorAll('.professional-summary');
    const divider = document.querySelector('.divider');
    const personalNote = document.querySelector('.personal-note');
    
    // Function to check if element is in viewport
    const isInViewport = (element) => {
        const rect = element.getBoundingClientRect();
        return (
            rect.top <= (window.innerHeight || document.documentElement.clientHeight) * 0.8
        );
    };
    
    // Function to handle scroll animations
    const handleScrollAnimations = () => {
        if (aboutSection && isInViewport(aboutSection)) {
            // Animate summaries with staggered delay
            summaries.forEach((summary, index) => {
                setTimeout(() => {
                    summary.classList.add('visible');
                }, index * 200);
            });
            
            // Animate divider
            setTimeout(() => {
                if (divider) divider.classList.add('visible');
            }, 400);
            
            // Animate personal note
            setTimeout(() => {
                if (personalNote) personalNote.classList.add('visible');
            }, 600);
            
            // Remove event listener after animations are triggered
            window.removeEventListener('scroll', handleScrollAnimations);
        }
    };
    
    // Initial check in case the section is already in view
    setTimeout(handleScrollAnimations, 500);
    
    // Add scroll event listener
    window.addEventListener('scroll', handleScrollAnimations);

    // Skills section hover effects
    const skills = document.querySelectorAll('.skill');

    skills.forEach(skill => {
        // Add initial animation on page load
        skill.style.opacity = '0';
        skill.style.transform = 'translateY(20px)';
        
        // Add hover effect
        skill.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-15px) scale(1.03)';
            this.style.boxShadow = '0 20px 40px rgba(114, 47, 55, 0.25)';
            
            // Add pulse animation to icon
            const icon = this.querySelector('i');
            if (icon) {
                icon.style.animation = 'pulse 1s ease';
                
                // Reset animation after it completes
                setTimeout(() => {
                    icon.style.animation = '';
                }, 1000);
            }
        });
        
        skill.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
        });
    });

    // Animate skills on scroll
    const animateSkillsOnScroll = () => {
        const skillsSection = document.querySelector('#skills');
        if (!skillsSection) return;
        
        const sectionTop = skillsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            skills.forEach((skill, index) => {
                // Stagger the animations
                setTimeout(() => {
                    skill.style.opacity = '1';
                    skill.style.transform = 'translateY(0)';
                    skill.style.transition = `opacity 0.5s ease-out ${index * 0.1}s, transform 0.5s ease-out ${index * 0.1}s`;
                }, 50);
            });
            
            // Remove the scroll event listener after animating
            window.removeEventListener('scroll', animateSkillsOnScroll);
        }
    };

    // Add scroll event listener for skills animation
    window.addEventListener('scroll', animateSkillsOnScroll);

    // Initial check in case skills are already in view on page load
    setTimeout(animateSkillsOnScroll, 500);

    // Sticky Navigation on Scroll
    function setupStickyNav() {
        if (!navbar) return;
        
        const headerHeight = navbar.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
        
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;
            
            if (currentScroll > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            if (currentScroll <= 0) {
                navbar.classList.remove('scroll-up');
                return;
            }
            
            if (currentScroll > lastScroll && !navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-up');
                navbar.classList.add('scroll-down');
            } else if (currentScroll < lastScroll && navbar.classList.contains('scroll-down')) {
                navbar.classList.remove('scroll-down');
                navbar.classList.add('scroll-up');
            }
            
            lastScroll = currentScroll;
        });
    }
    
    // Initialize ScrollReveal Animations
    function setupScrollReveal() {
        // Use Intersection Observer for scroll animations
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.fade-in, .fade-up, .fade-down, .fade-left, .fade-right');
            
            elements.forEach(element => {
                const elementTop = element.getBoundingClientRect().top;
                const windowHeight = window.innerHeight;
                
                if (elementTop < windowHeight - 100) {
                    element.classList.add('visible');
                }
            });
        };
        
        window.addEventListener('scroll', animateOnScroll);
        window.addEventListener('resize', animateOnScroll);
        window.addEventListener('load', animateOnScroll);
        
        // Initial check
        animateOnScroll();
    }
    
    // Scroll Indicator Functionality
    function setupScrollIndicator() {
        if (!scrollIndicator) return;
        
        // Hide scroll indicator after user starts scrolling
        const handleScroll = () => {
            if (window.pageYOffset > 100) {
                scrollIndicator.style.opacity = '0';
                scrollIndicator.style.visibility = 'hidden';
            } else {
                scrollIndicator.style.opacity = '1';
                scrollIndicator.style.visibility = 'visible';
            }
        };
        
        // Initial check
        handleScroll();
        
        // Add scroll event listener
        window.addEventListener('scroll', handleScroll, { passive: true });
        
        // Smooth scroll to next section on click
        scrollIndicator.addEventListener('click', (e) => {
            e.preventDefault();
            
            // Get the next section
            const sections = document.querySelectorAll('section');
            let currentSectionIndex = 0;
            
            // Find current section
            for (let i = 0; i < sections.length; i++) {
                const sectionTop = sections[i].offsetTop;
                const sectionHeight = sections[i].offsetHeight;
                
                if (window.pageYOffset >= sectionTop && window.pageYOffset < sectionTop + sectionHeight) {
                    currentSectionIndex = i;
                    break;
                }
            }
            
            // Scroll to next section
            const nextSection = sections[Math.min(currentSectionIndex + 1, sections.length - 1)];
            const headerHeight = document.querySelector('.navbar').offsetHeight;
            const scrollPosition = nextSection.offsetTop - headerHeight + 20;
            
            window.scrollTo({
                top: scrollPosition,
                behavior: 'smooth'
            });
        });
    }

    // Contact Form Submission
    function setupContactForm() {
        if (contactForm) {
            contactForm.addEventListener('submit', function(e) {
                e.preventDefault();
                // Here you would typically send the form data to a server
                alert('Thank you for your message! I will get back to you soon.');
                this.reset();
            });
        }
    }

    // Initialize ScrollReveal Animations
    function setupScrollReveal() {
        if (typeof ScrollReveal !== 'undefined') {
            const sr = ScrollReveal({
                origin: 'bottom',
                distance: '50px',
                duration: 1000,
                delay: 200,
                reset: false
            });
            sr.reveal('.section', { interval: 200 });
        }
    }

    // Scroll Indicator Functionality
    function setupScrollIndicator() {
        const scrollIndicator = document.querySelector('.scroll-indicator');
        if (scrollIndicator) {
            scrollIndicator.addEventListener('click', () => {
                const aboutSection = document.querySelector('#about');
                if (aboutSection) {
                    aboutSection.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    }

    // Update Active Navigation Links on Scroll
    function setupActiveNavLinks() {
        function updateActiveLink() {
            let current = '';
            
            allSections.forEach(section => {
                const sectionTop = section.offsetTop;
                const sectionHeight = section.clientHeight;
                
                if (pageYOffset >= sectionTop - 200) {
                    current = section.getAttribute('id');
                }
            });
            
            navLinkElements.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${current}`) {
                    link.classList.add('active');
                }
            });
        }

        // Add scroll event listener
        window.addEventListener('scroll', updateActiveLink);
        
        // Run once on page load
        updateActiveLink();
    }

    // Update Footer Year
    function updateFooterYear() {
        if (yearSpan) {
            yearSpan.textContent = ` Victor Musyoka. All rights reserved.`;
        }
    }

    // Resume Download Functionality
    function setupResumeDownload() {
        if (downloadResume) {
            downloadResume.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Create a temporary link to trigger the download
                const link = document.createElement('a');
                link.href = 'Victor_Musyoka_Resume.pdf';
                link.download = 'Victor_Musyoka_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            });
        }
    }

    // Initialize the application when the DOM is loaded
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
