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

    // Setup mobile menu functionality
    function setupMobileMenu() {
        const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
        const navLinks = document.querySelector('.nav-links');
        const navLinkItems = document.querySelectorAll('.nav-link');

        if (mobileMenuBtn && navLinks) {
            mobileMenuBtn.addEventListener('click', function() {
                // Toggle mobile menu
                const isActive = navLinks.classList.contains('active');
                navLinks.classList.toggle('active');
                mobileMenuBtn.classList.toggle('active');
                mobileMenuBtn.setAttribute('aria-expanded', !isActive);

                // Prevent body scroll when menu is open
                if (!isActive) {
                    document.body.style.overflow = 'hidden';
                } else {
                    document.body.style.overflow = '';
                }
            });

            // Close mobile menu when clicking on nav links
            navLinkItems.forEach(link => {
                link.addEventListener('click', function() {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                });
            });

            // Close mobile menu when clicking outside
            document.addEventListener('click', function(e) {
                if (!mobileMenuBtn.contains(e.target) && !navLinks.contains(e.target)) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                    mobileMenuBtn.setAttribute('aria-expanded', 'false');
                    document.body.style.overflow = '';
                }
            });
        }
    }

    // Setup sticky navigation with scroll effects
    function setupStickyNav() {
        const navbar = document.querySelector('.navbar');
        let lastScroll = 0;
        let ticking = false;

        function updateNavbar() {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }

            // Hide navbar when scrolling down, show when scrolling up
            if (currentScroll > lastScroll && currentScroll > 200) {
                navbar.style.transform = 'translateY(-100%)';
            } else {
                navbar.style.transform = 'translateY(0)';
            }

            lastScroll = currentScroll;
            ticking = false;
        }

        function requestTick() {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }

        window.addEventListener('scroll', requestTick, { passive: true });
    }

    // Setup active navigation link highlighting (including bottom nav)
    function setupActiveNavLinks() {
        const navLinks = document.querySelectorAll('.nav-link[data-nav-link], .bottom-nav-link[data-nav-link]');
        const sections = document.querySelectorAll('section[id]');

        function updateActiveNavLink() {
            const currentScroll = window.pageYOffset;

            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150;
                const sectionHeight = section.offsetHeight;
                const sectionId = section.getAttribute('id');

                if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('data-nav-link') === sectionId ||
                            (sectionId === 'home' && link.getAttribute('href') === '#home')) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }

        window.addEventListener('scroll', updateActiveNavLink, { passive: true });
        updateActiveNavLink(); // Initial call
    }

    // Setup smooth scrolling for navigation links (including bottom nav)
    function setupSmoothScrolling() {
        const navLinks = document.querySelectorAll('.nav-link[href^="#"], .bottom-nav-link[href^="#"]');

        navLinks.forEach(link => {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);

                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }
    
    // Placeholder functions
    function setupForms() {
        // Form handling will be implemented as needed
    }
    
    function setupViewFullCV() {
        const viewCVBtn = document.querySelector('.view-cv-btn');
        if (viewCVBtn) {
            viewCVBtn.addEventListener('click', function(e) {
                e.preventDefault();

                // Create a modal or show detailed CV information
                showCVModal();
            });
        }
    }

    function showCVModal() {
        // Create modal overlay
        const overlay = document.createElement('div');
        overlay.className = 'cv-modal-overlay';
        overlay.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0, 0, 0, 0.8);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 10000;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;

        // Create modal content
        const modal = document.createElement('div');
        modal.className = 'cv-modal';
        modal.style.cssText = `
            background: white;
            border-radius: 20px;
            padding: 2rem;
            max-width: 800px;
            max-height: 80vh;
            overflow-y: auto;
            position: relative;
            transform: scale(0.9);
            transition: transform 0.3s ease;
        `;

        // Modal content
        modal.innerHTML = `
            <button class="cv-modal-close" style="
                position: absolute;
                top: 1rem;
                right: 1rem;
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #666;
                z-index: 10001;
            ">&times;</button>
            <h2 style="color: var(--primary-color); margin-bottom: 1.5rem;">Dr. Said Hussein Ali - Complete Professional CV</h2>

            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--dark-color); border-bottom: 2px solid var(--primary-color); padding-bottom: 0.5rem;">Professional Summary</h3>
                <p style="line-height: 1.8; color: var(--text-color);">
                    Board-certified Periodontist and Implantologist with over 10 years of specialized experience in advanced dental implant procedures and periodontal treatments.
                    Expertise encompasses the full spectrum of modern implantology, from single-tooth restorations to complex full-mouth rehabilitations.
                    Committed to delivering exceptional patient care through evidence-based practices and cutting-edge dental technologies.
                </p>
            </div>

            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--dark-color); border-bottom: 2px solid var(--primary-color); padding-bottom: 0.5rem;">Education</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <strong>MDS Periodontology & Implantology</strong><br>
                        University of Nairobi<br>
                        <em>Specialization in advanced periodontal procedures and dental implantology</em>
                    </li>
                </ul>
            </div>

            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--dark-color); border-bottom: 2px solid var(--primary-color); padding-bottom: 0.5rem;">Professional Experience</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <strong>Medical Officer / Dental Implant Trainee</strong><br>
                        AL-MUDDATHIR Clinic, Khartoum<br>
                        <em>May 2018 - February 2019</em><br>
                        Caring for outpatient cases at dental department. Assisted dental implants and followed up with patients at the clinic.
                    </li>
                    <li style="margin-bottom: 1rem; padding: 1rem; background: #f8f9fa; border-radius: 8px;">
                        <strong>House Officer</strong><br>
                        Sudan Ministry of Health<br>
                        <em>December 2016 - December 2017</em><br>
                        Successfully finished 1 year of organized internship involving majors: Oral maxillo-facial surgery, periodontology, dental public health, conservation, prosthodontics and pedodontics.
                    </li>
                </ul>
            </div>

            <div style="margin-bottom: 2rem;">
                <h3 style="color: var(--dark-color); border-bottom: 2px solid var(--primary-color); padding-bottom: 0.5rem;">Certifications & Training</h3>
                <ul style="list-style: none; padding: 0;">
                    <li style="margin-bottom: 0.5rem; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                        • Fellowship in Oral Implantology - German Board Certified
                    </li>
                    <li style="margin-bottom: 0.5rem; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                        • Advanced Implantology Workshop - Dandra Dental Implantology Center (DDIC)
                    </li>
                    <li style="margin-bottom: 0.5rem; padding: 0.5rem 0; border-bottom: 1px solid #eee;">
                        • Member of German Association of Dental Implantology
                    </li>
                </ul>
            </div>

            <div style="text-align: center; margin-top: 2rem;">
                <a class="cv-modal-download" href="docs/dr-said-updated-cv.pdf" download target="_blank" rel="noopener" style="
                    display: inline-block;
                    background: var(--primary-color);
                    color: white;
                    text-decoration: none;
                    padding: 1rem 2rem;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                ">Download Full CV (PDF)</a>
            </div>
        `;

        overlay.appendChild(modal);
        document.body.appendChild(overlay);

        // Animate in
        setTimeout(() => {
            overlay.style.opacity = '1';
            modal.style.transform = 'scale(1)';
        }, 10);

        // Close functionality
        function closeModal() {
            overlay.style.opacity = '0';
            modal.style.transform = 'scale(0.9)';
            setTimeout(() => {
                document.body.removeChild(overlay);
            }, 300);
        }

        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeModal();
            }
        });

        modal.querySelector('.cv-modal-close').addEventListener('click', closeModal);

        // Ensure link attributes are set (fallback if needed)
        const cvLink = modal.querySelector('.cv-modal-download');
        if (cvLink) {
            cvLink.setAttribute('href', 'docs/dr-said-updated-cv.pdf');
            cvLink.setAttribute('download', 'Dr-Said-Updated-CV.pdf');
            cvLink.setAttribute('target', '_blank');
            cvLink.setAttribute('rel', 'noopener');
        }

        // Close on escape key
        document.addEventListener('keydown', function escapeHandler(e) {
            if (e.key === 'Escape') {
                closeModal();
                document.removeEventListener('keydown', escapeHandler);
            }
        });
    }
    
    function setupBackToTop() {
        // Back to top button functionality
    }
    
    // Mobile Menu Functionality
    function setupMobileMenu() {
        if (!mobileMenuBtn || !navLinks) return;
        
        // Create overlay element
        const overlay = document.createElement('div');
        overlay.className = 'nav-overlay';
        document.body.appendChild(overlay);
        
        // Get the nav menu element
        const navMenu = document.querySelector('.nav-menu');
        
        // Close menu function
        function closeMenu() {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('active');
            navMenu.classList.remove('active');
            document.body.style.overflow = '';
            
            // Reset menu items
            const navItems = document.querySelectorAll('.nav-item');
            navItems.forEach(item => {
                item.style.opacity = '0';
                item.style.transform = 'translateX(20px)';
            });
        }
        
        // Toggle mobile menu
        function toggleMenu() {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            const newState = !isExpanded;
            
            // Update button state
            mobileMenuBtn.setAttribute('aria-expanded', newState);
            
            if (newState) {
                // Open menu
                document.body.style.overflow = 'hidden';
                overlay.classList.add('active');
                navMenu.classList.add('active');
                
                // Animate menu items in
                const navItems = document.querySelectorAll('.nav-item');
                navItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'translateX(0)';
                    }, 100 + (index * 50));
                });
            } else {
                // Close menu
                closeMenu();
            }
        }
        
        // Toggle menu on button click
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleMenu();
        });
        
        // Close menu when clicking on overlay
        overlay.addEventListener('click', (e) => {
            if (e.target === overlay) {
                closeMenu();
            }
        });
        
        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', (e) => {
                if (window.innerWidth <= 768) {
                    closeMenu();
                }
            });
        });
        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(() => {
                if (window.innerWidth > 768) {
                    closeMenu();
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

    // Appointment Form Submission (WhatsApp)
    function setupAppointmentForm() {
        const form = document.getElementById('appointmentForm');
        if (!form) return;

        // Ensure date input minimum is today
        const dateInput = form.querySelector('input[name="date"]');
        if (dateInput) {
            const today = new Date();
            const yyyy = today.getFullYear();
            const mm = String(today.getMonth() + 1).padStart(2, '0');
            const dd = String(today.getDate()).padStart(2, '0');
            dateInput.min = `${yyyy}-${mm}-${dd}`;
        }

        form.addEventListener('submit', function(e) {
            e.preventDefault();

            const name = form.elements['name'] ? form.elements['name'].value : '';
            const phone = form.elements['phone'] ? form.elements['phone'].value : '';
            const email = form.elements['email'] ? form.elements['email'].value : '';
            const date = form.elements['date'] ? form.elements['date'].value : '';
            const service = form.elements['service'] ? form.elements['service'].value : '';
            const message = form.elements['message'] ? form.elements['message'].value : '';
            const isNew = form.elements['new-patient'] && form.elements['new-patient'].checked ? 'Yes' : 'No';

            // Use clinic WhatsApp number from the site
            const waNumber = '254703553000';
            const text = encodeURIComponent(
                `Appointment Request:\n` +
                `Name: ${name}\n` +
                `Phone: ${phone}\n` +
                `Email: ${email}\n` +
                `Preferred Date: ${date}\n` +
                `Service: ${service}\n` +
                `New Patient: ${isNew}\n` +
                `Message: ${message}`
            );

            const waUrl = `https://wa.me/${waNumber}?text=${text}`;
            window.open(waUrl, '_blank');
            form.reset();
        });
    }
    // Setup service cards functionality
    function setupServiceCards() {
        const serviceCards = document.querySelectorAll('.service-card[data-service]');

        serviceCards.forEach(card => {
            card.addEventListener('click', function() {
                const serviceType = this.getAttribute('data-service');

                // Map service types to their respective pages
                const servicePages = {
                    'dental-implants': 'services/dental-implants.html',
                    'periodontal-treatment': 'services/periodontal-treatment.html',
                    'gum-grafting': 'services/gum-grafting.html',
                    'bone-grafting': 'services/bone-grafting.html',
                    'cosmetic-periodontics': 'services/cosmetic-periodontics.html',
                    'tooth-extraction': 'services/tooth-extraction.html'
                };

                const servicePage = servicePages[serviceType];
                if (servicePage) {
                    window.location.href = servicePage;
                }
            });

            // Add cursor pointer to indicate clickability
            card.style.cursor = 'pointer';
        });
    }

    // Setup FAQ functionality for service pages
    function setupServicePageFAQ() {
        const faqItems = document.querySelectorAll('.faq-item');

        faqItems.forEach(item => {
            const question = item.querySelector('.faq-question');

            question.addEventListener('click', function() {
                // Toggle active state
                item.classList.toggle('active');

                // Close other FAQ items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item) {
                        otherItem.classList.remove('active');
                    }
                });
            });
        });
    }

    // Initialize the application when the DOM is loaded
    function init() {
        try { setupMobileMenu(); } catch (e) {}
        try { setupStickyNav(); } catch (e) {}
        try { setupActiveNavLinks(); } catch (e) {}
        try { setupSmoothScrolling(); } catch (e) {}
        try { setupScrollReveal(); } catch (e) {}
        try { setupScrollIndicator(); } catch (e) {}
        try { setupContactForm(); } catch (e) {}
        try { setupAppointmentForm(); } catch (e) {}
        try { setupServiceCards(); } catch (e) {}
        try { setupServicePageFAQ(); } catch (e) {}
        try { setupViewFullCV(); } catch (e) {}
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();

// Enhanced Bottom Navigation Functionality (Disabled - bottom nav removed)
function setupDynamicBottomNav() {
    return; // Bottom nav removed from HTML
    const bottomNav = document.querySelector('.bottom-nav');
    const bottomNavItems = document.querySelectorAll('.bottom-nav-item');
    const contextualItems = document.querySelectorAll('.contextual-item');
    const sections = document.querySelectorAll('section[id]');
    
    if (!bottomNav) return;
    
    // Update contextual information based on current section
    function updateContextualInfo(currentSection) {
        contextualItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('data-section') === currentSection) {
                item.classList.add('active');
            }
        });
    }
    
    // Enhanced scroll handler for bottom nav
    function handleBottomNavScroll() {
        const currentScroll = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (currentScroll >= sectionTop && currentScroll < sectionTop + sectionHeight) {
                // Update bottom nav active states
                bottomNavItems.forEach(item => {
                    const link = item.querySelector('.bottom-nav-link');
                    if (link && link.getAttribute('data-nav-link') === sectionId) {
                        link.classList.add('active');
                        updateContextualInfo(sectionId);
                    } else if (link) {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', handleBottomNavScroll, { passive: true });
    
    // Initial call
    handleBottomNavScroll();
    
    // Add click handlers for bottom nav links
    bottomNavItems.forEach(item => {
        const link = item.querySelector('.bottom-nav-link');
        if (link) {
            link.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetSection = document.querySelector(targetId);
                
                if (targetSection) {
                    const offsetTop = targetSection.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        }
    });
    
    // Add hover effects for contextual items
    contextualItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const section = this.getAttribute('data-section');
            const navItem = document.querySelector(`.bottom-nav-item[data-section="${section}"]`);
            if (navItem) {
                navItem.classList.add('highlighted');
            }
        });
        
        item.addEventListener('mouseleave', function() {
            const section = this.getAttribute('data-section');
            const navItem = document.querySelector(`.bottom-nav-item[data-section="${section}"]`);
            if (navItem) {
                navItem.classList.remove('highlighted');
            }
        });
    });
}

// Initialize enhanced bottom navigation
document.addEventListener('DOMContentLoaded', function() {
    setupDynamicBottomNav();
});

// ============================================================================
// TESTIMONIALS CAROUSEL
// ============================================================================
function setupTestimonialsCarousel() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let autoplayInterval;

    if (!testimonials.length) return;

    function showTestimonial(index) {
        // Remove all classes
        testimonials.forEach(testimonial => {
            testimonial.classList.remove('active', 'prev');
        });

        // Add active class to current
        testimonials[index].classList.add('active');

        // Add prev class to previous slide for exit animation
        const prevIndex = currentIndex;
        if (prevIndex !== index) {
            testimonials[prevIndex].classList.add('prev');
        }

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    function nextTestimonial() {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }

    function prevTestimonial() {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }

    function startAutoplay() {
        autoplayInterval = setInterval(nextTestimonial, 5000);
    }

    function stopAutoplay() {
        clearInterval(autoplayInterval);
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextTestimonial();
            stopAutoplay();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevTestimonial();
            stopAutoplay();
            startAutoplay();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            showTestimonial(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Pause autoplay on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', stopAutoplay);
        testimonialSlider.addEventListener('mouseleave', startAutoplay);
    }

    // Initialize
    showTestimonial(0);
    startAutoplay();
}

// ============================================================================
// PARALLAX SCROLLING FOR SERVICES SECTION
// ============================================================================
function setupParallaxScrolling() {
    const parallaxShapes = document.querySelectorAll('.parallax-shape');
    const servicesSection = document.getElementById('services');

    if (!servicesSection || !parallaxShapes.length) return;

    function handleParallax() {
        const scrolled = window.pageYOffset;
        const sectionTop = servicesSection.offsetTop;
        const sectionHeight = servicesSection.offsetHeight;
        const sectionBottom = sectionTop + sectionHeight;

        // Only apply parallax when section is in viewport
        if (scrolled + window.innerHeight > sectionTop && scrolled < sectionBottom) {
            const relativeScroll = scrolled - sectionTop;

            parallaxShapes.forEach((shape, index) => {
                const speed = 0.1 + (index * 0.05); // Different speeds for each shape
                const yPos = relativeScroll * speed;
                const rotation = relativeScroll * (0.02 + index * 0.01);
                
                shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
            });
        }
    }

    // Throttle scroll event for performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(() => {
                handleParallax();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener('scroll', requestTick, { passive: true });
}

// ============================================================================
// SERVICE CARDS SCROLL ANIMATION
// ============================================================================
function setupServiceCardsAnimation() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    if (!serviceCards.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Stagger animation
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    serviceCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
}

// ============================================================================
// SCROLL-TRIGGERED TEXT ANIMATIONS (Left/Right)
// ============================================================================
function setupScrollTextAnimations() {
    // Select all elements that should animate
    const animateElements = document.querySelectorAll('.section-title, .section-subtitle, h2, h3, p, .contact-method, .features-list li, .achievement-item, .service-content');
    
    if (!animateElements.length) return;

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                // Alternate between left and right animations
                const direction = index % 2 === 0 ? 'left' : 'right';
                entry.target.classList.add('animate-' + direction);
                
                // Stagger the animation
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, index * 50);
                
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    animateElements.forEach((element) => {
        observer.observe(element);
    });
}

// ============================================================================
// ENHANCED TESTIMONIALS CAROUSEL WITH DEBUGGING
// ============================================================================
function setupTestimonialsCarouselEnhanced() {
    const testimonials = document.querySelectorAll('.testimonial');
    const prevBtn = document.querySelector('.testimonial-nav.prev');
    const nextBtn = document.querySelector('.testimonial-nav.next');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;
    let autoplayInterval;

    console.log('Testimonials found:', testimonials.length);
    console.log('Prev button:', prevBtn);
    console.log('Next button:', nextBtn);
    console.log('Indicators:', indicators.length);

    if (!testimonials.length) {
        console.warn('No testimonials found!');
        return;
    }

    function showTestimonial(index) {
        console.log('Showing testimonial:', index);
        
        // Remove all classes
        testimonials.forEach((testimonial, i) => {
            testimonial.classList.remove('active', 'prev');
            if (i !== index) {
                testimonial.style.position = 'absolute';
            }
        });

        // Add active class to current
        testimonials[index].classList.add('active');
        testimonials[index].style.position = 'relative';

        // Add prev class to previous slide for exit animation
        const prevIndex = currentIndex;
        if (prevIndex !== index && testimonials[prevIndex]) {
            testimonials[prevIndex].classList.add('prev');
        }

        // Update indicators
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });

        currentIndex = index;
    }

    function nextTestimonial() {
        const nextIndex = (currentIndex + 1) % testimonials.length;
        showTestimonial(nextIndex);
    }

    function prevTestimonial() {
        const prevIndex = (currentIndex - 1 + testimonials.length) % testimonials.length;
        showTestimonial(prevIndex);
    }

    function startAutoplay() {
        stopAutoplay(); // Clear any existing interval
        autoplayInterval = setInterval(nextTestimonial, 5000);
        console.log('Autoplay started');
    }

    function stopAutoplay() {
        if (autoplayInterval) {
            clearInterval(autoplayInterval);
            console.log('Autoplay stopped');
        }
    }

    // Event listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            console.log('Next button clicked');
            nextTestimonial();
            stopAutoplay();
            startAutoplay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            console.log('Prev button clicked');
            prevTestimonial();
            stopAutoplay();
            startAutoplay();
        });
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener('click', () => {
            console.log('Indicator clicked:', index);
            showTestimonial(index);
            stopAutoplay();
            startAutoplay();
        });
    });

    // Pause autoplay on hover
    const testimonialSlider = document.querySelector('.testimonials-slider');
    if (testimonialSlider) {
        testimonialSlider.addEventListener('mouseenter', stopAutoplay);
        testimonialSlider.addEventListener('mouseleave', startAutoplay);
    }

    // Initialize - show first testimonial
    showTestimonial(0);
    startAutoplay();
    
    console.log('Testimonials carousel initialized successfully');
}

// Initialize all features
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM Content Loaded - Initializing features...');
    setupTestimonialsCarouselEnhanced();
    setupParallaxScrolling();
    setupServiceCardsAnimation();
    setupScrollTextAnimations();
    console.log('All features initialized');
});
