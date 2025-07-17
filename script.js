// IIFE to avoid global scope pollution
(function() {
    // DOM Elements
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navContainer = document.querySelector('.nav-container');
    const navLinks = document.querySelector('.nav-links');
    const allSections = document.querySelectorAll('section');
    const navLinkElements = document.querySelectorAll('.nav-links a');
    const yearSpan = document.querySelector('footer p');
    const contactForm = document.querySelector('.contact-form');
    const downloadResume = document.querySelector('.resume-actions .cta-button');
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    // Initialize the application
    function init() {
        setupMobileMenu();
        setupSmoothScrolling();
        setupStickyNav();
        setupContactForm();
        setupScrollReveal();
        setupScrollIndicator();
        setupActiveNavLinks();
        updateFooterYear();
        setupResumeDownload();
    }

    // Mobile Menu Functionality
    function setupMobileMenu() {
        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', () => {
                navLinks.classList.toggle('show');
                mobileMenuBtn.classList.toggle('active');
                document.body.style.overflow = document.body.style.overflow === 'hidden' ? '' : 'hidden';
            });

            // Close mobile menu when clicking on a link
            navLinkElements.forEach(link => {
                link.addEventListener('click', () => {
                    navLinks.classList.remove('show');
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = '';
                });
            });
        }
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
        if (navbar) {
            window.addEventListener('scroll', () => {
                const currentScroll = window.pageYOffset;
                
                // Hide/show navbar on scroll
                if (currentScroll <= 0) {
                    navbar.style.transform = 'translateY(0)';
                    return;
                }
                
                if (currentScroll > lastScroll && currentScroll > navbar.offsetHeight) {
                    // Scrolling down
                    navbar.style.transform = 'translateY(-100%)';
                } else {
                    // Scrolling up
                    navbar.style.transform = 'translateY(0)';
                }
                
                lastScroll = currentScroll;
            });
        }
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
            yearSpan.textContent = `© ${new Date().getFullYear()} Victor Musyoka. All rights reserved.`;
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
