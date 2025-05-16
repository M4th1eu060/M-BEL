// Mobile Menu Toggle - Versión simplificada
document.addEventListener('DOMContentLoaded', () => {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const mainNav = document.querySelector('.main-nav');
    
    if (mobileMenuToggle && mainNav) {
        // Toggle menú principal 
        mobileMenuToggle.addEventListener('click', () => {
            mobileMenuToggle.classList.toggle('active');
            mainNav.classList.toggle('active');
            
            // Accesibilidad y scroll
            const isExpanded = mobileMenuToggle.classList.contains('active');
            mobileMenuToggle.setAttribute('aria-expanded', isExpanded);
            document.body.style.overflow = isExpanded ? 'hidden' : '';
        });
        
        // Cerrar menú al hacer clic en enlaces
        const links = mainNav.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenuToggle.classList.remove('active');
                mainNav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Eliminar cualquier navegación duplicada debajo del footer
    const footer = document.querySelector('.main-footer');
    if (footer) {
        let nextElement = footer.nextElementSibling;
        while (nextElement) {
            const temp = nextElement.nextElementSibling;
            nextElement.remove();
            nextElement = temp;
        }
    }

    
    // Header scroll effect
    const header = document.querySelector('.main-header');
    if (header) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 100;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize Font Awesome (if using it)
    if (typeof FontAwesome !== 'undefined') {
        FontAwesome.config.searchPseudoElements = true;
    }
});

// Form validation
const contactForm = document.getElementById('contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        const nameInput = document.getElementById('name');
        const emailInput = document.getElementById('email');
        const messageInput = document.getElementById('message');
        
        let isValid = true;
        
        // Validate name
        if (!nameInput.value.trim()) {
            showError(nameInput, 'Por favor, introduce tu nombre');
            isValid = false;
        } else {
            clearError(nameInput);
        }
        
        // Validate email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            showError(emailInput, 'Por favor, introduce un email válido');
            isValid = false;
        } else {
            clearError(emailInput);
        }
        
        // Validate message
        if (!messageInput.value.trim()) {
            showError(messageInput, 'Por favor, introduce tu mensaje');
            isValid = false;
        } else {
            clearError(messageInput);
        }
        
        if (!isValid) {
            event.preventDefault();
        }
    });
    
    function showError(input, message) {
        const formControl = input.parentElement;
        const errorElement = formControl.querySelector('.error-message') || document.createElement('div');
        
        errorElement.className = 'error-message';
        errorElement.textContent = message;
        
        if (!formControl.querySelector('.error-message')) {
            formControl.appendChild(errorElement);
        }
        
        formControl.className = 'form-control error';
    }
    
    function clearError(input) {
        const formControl = input.parentElement;
        formControl.className = 'form-control';
        
        const errorElement = formControl.querySelector('.error-message');
        if (errorElement) {
            formControl.removeChild(errorElement);
        }
    }
}

