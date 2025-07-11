document.addEventListener('DOMContentLoaded', function() {
    // Theme Toggle
    const themeSwitch = document.getElementById('theme-switch');
    const body = document.body;
    
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        body.classList.add(savedTheme);
        themeSwitch.checked = savedTheme === 'light-theme';
    }
    
    themeSwitch.addEventListener('change', function() {
        if (this.checked) {
            body.classList.add('light-theme');
            localStorage.setItem('theme', 'light-theme');
        } else {
            body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark-theme');
        }
    });
    
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    menuBtn.addEventListener('click', function() {
        menuBtn.classList.toggle('active');
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuBtn.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // Back to top button
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Smooth scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Animate elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.animate-pop-in, .animate-slide-in, .animate-card, .animate-zoom, .soft-skill, .interest-item');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translate(0) scale(1)';
            }
        });
    };
    
    // Initialize animations on load
    window.addEventListener('load', function() {
        // Home section animations
        document.querySelector('.home-content .title').style.opacity = '1';
        document.querySelector('.home-content .title').style.transform = 'translateY(0)';
        
        setTimeout(() => {
            document.querySelector('.home-content .subtitle').style.opacity = '1';
            document.querySelector('.home-content .subtitle').style.transform = 'translateY(0)';
        }, 300);
        
        setTimeout(() => {
            document.querySelector('.home-content .description').style.opacity = '1';
            document.querySelector('.home-content .description').style.transform = 'translateY(0)';
        }, 600);
        
        setTimeout(() => {
            document.querySelector('.btn-container').style.opacity = '1';
            document.querySelector('.btn-container').style.transform = 'translateY(0)';
        }, 900);
        
        setTimeout(() => {
            document.querySelector('.scroll-down').style.opacity = '1';
        }, 1200);
        
        // Other section animations
        animateOnScroll();
    });
    
    // Animate on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Animate skill bars when they come into view
    const skillBars = document.querySelectorAll('.skill-level');
    
    function animateSkillBars() {
        skillBars.forEach(bar => {
            const barWidth = bar.style.width;
            bar.style.width = '0';
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        bar.style.width = barWidth;
                        observer.unobserve(entry.target);
                    }
                });
            });
            
            observer.observe(bar.parentElement.parentElement);
        });
    }
    
    animateSkillBars();
    
    // Initialize EmailJS
   emailjs.init('ZaP1oBYsYuWDgk59i');

const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('form-message');
const submitBtn = contactForm.querySelector('button[type="submit"]');
const btnText = submitBtn.querySelector('.btn-text');
const btnLoading = submitBtn.querySelector('.btn-loading');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Show loading state
        btnText.style.display = 'none';
        btnLoading.style.display = 'inline-block';
        submitBtn.disabled = true;
        
        // Get form values
        const formData = {
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            subject: document.getElementById('subject').value,
            message: document.getElementById('message').value
        };
        
        // Send email using EmailJS
        emailjs.send('service_8qio54l', 'template_gu01b3x', formData)
            .then(function() {
                // Show success message
                formMessage.textContent = 'Your message has been sent successfully!';
                formMessage.classList.remove('error');
                formMessage.classList.add('success');
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Hide message after 5 seconds
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);
            }, function(error) {
                // Show error message
                formMessage.textContent = 'Failed to send message. Please try again later.';
                formMessage.classList.remove('success');
                formMessage.classList.add('error');
                formMessage.style.display = 'block';
                
                console.error('EmailJS Error:', error);
            })
            .finally(() => {
                // Reset button state
                btnText.style.display = 'inline-block';
                btnLoading.style.display = 'none';
                submitBtn.disabled = false;
            });
    });
}
});