// Contact Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Form elements
    const contactForm = document.getElementById('contactForm');
    const successMessage = document.getElementById('contactSuccessMessage');
    const submitBtn = document.querySelector('.contact-submit-btn');
    
    // Form validation patterns
    const validationRules = {
        email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        phone: /^[\+]?[1-9][\d]{0,15}$/
    };
    
    // Initialize form interactions
    initializeFormInteractions();
    initializeAnimations();
    
    function initializeFormInteractions() {
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                validateField(this);
            });
            
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            // Add focus animations
            input.addEventListener('focus', function() {
                this.parentElement.classList.add('focused');
            });
            
            input.addEventListener('blur', function() {
                this.parentElement.classList.remove('focused');
            });
        });
        
        // Form submission
        contactForm.addEventListener('submit', handleFormSubmission);
    }
    
    function validateField(field) {
        const value = field.value.trim();
        const fieldName = field.name;
        let isValid = true;
        let errorMessage = '';
        
        // Remove existing error states
        field.classList.remove('error', 'success');
        removeErrorMessage(field);
        
        // Check if required field is empty
        if (field.hasAttribute('required') && !value) {
            isValid = false;
            errorMessage = 'Ce champ est requis';
        }
        
        // Specific validation rules
        switch (fieldName) {
            case 'email':
                if (value && !validationRules.email.test(value)) {
                    isValid = false;
                    errorMessage = 'Adresse email invalide';
                }
                break;
                
            case 'phone':
                if (value && !validationRules.phone.test(value.replace(/\s/g, ''))) {
                    isValid = false;
                    errorMessage = 'Numéro de téléphone invalide';
                }
                break;
                
            case 'firstName':
            case 'lastName':
                if (value && value.length < 2) {
                    isValid = false;
                    errorMessage = 'Minimum 2 caractères requis';
                }
                break;
                
            case 'company':
                if (value && value.length < 2) {
                    isValid = false;
                    errorMessage = 'Nom d\'entreprise invalide';
                }
                break;
                
            case 'message':
                if (value && value.length < 10) {
                    isValid = false;
                    errorMessage = 'Message trop court (minimum 10 caractères)';
                }
                break;
        }
        
        // Apply validation styles
        if (!isValid) {
            field.classList.add('error');
            showErrorMessage(field, errorMessage);
        } else if (value) {
            field.classList.add('success');
        }
        
        return isValid;
    }
    
    function showErrorMessage(field, message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        field.parentElement.appendChild(errorDiv);
    }
    
    function removeErrorMessage(field) {
        const existingError = field.parentElement.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }
    }
    
    function handleFormSubmission(e) {
        e.preventDefault();
        
        // Validate all fields
        const inputs = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        let isFormValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isFormValid = false;
            }
        });
        
        // Check consent checkbox
        const consentCheckbox = contactForm.querySelector('input[name="consent"]');
        if (!consentCheckbox.checked) {
            isFormValid = false;
            consentCheckbox.focus();
            showNotification('Veuillez accepter les conditions pour continuer', 'error');
            return;
        }
        
        if (!isFormValid) {
            showNotification('Veuillez corriger les erreurs dans le formulaire', 'error');
            return;
        }
        
        // Show loading state
        submitBtn.classList.add('loading');
        submitBtn.disabled = true;
        
        // Simulate form submission
        setTimeout(() => {
            submitForm();
        }, 2000);
    }
    
    function submitForm() {
        // Hide form and show success message
        contactForm.style.display = 'none';
        successMessage.classList.add('show');
        
        // Reset button state
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        
        // Track analytics (placeholder)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'contact_form', {
                'event_category': 'engagement',
                'event_label': 'contact_form_submission'
            });
        }
        
        // Show notification
        showNotification('Message envoyé avec succès !', 'success');
        
        // Scroll to success message
        successMessage.scrollIntoView({ 
            behavior: 'smooth', 
            block: 'center' 
        });
    }
    
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-icon">
                    ${type === 'success' ? '✓' : type === 'error' ? '⚠' : 'ℹ'}
                </span>
                <span class="notification-message">${message}</span>
            </div>
        `;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Trigger animation
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        
        // Remove after delay
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 4000);
    }
    
    function initializeAnimations() {
        // Intersection Observer for scroll animations
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, observerOptions);
        
        // Form field animations
        const formFields = document.querySelectorAll('.form-group');
        formFields.forEach((field, index) => {
            field.style.animationDelay = `${index * 0.1}s`;
            observer.observe(field);
        });
        
        // Contact info cards animations
        const infoCards = document.querySelectorAll('.contact-info-card');
        infoCards.forEach((card, index) => {
            card.style.animationDelay = `${index * 0.2}s`;
            observer.observe(card);
        });
        
        // Parallax effect for background elements
        window.addEventListener('scroll', throttle(handleParallax, 16));
    }
    
    function handleParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        const bgDecoration = document.querySelector('.contact-bg-decoration');
        if (bgDecoration) {
            bgDecoration.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
        
        // Form glow rotation based on scroll
        const formGlow = document.querySelector('.contact-form-glow');
        if (formGlow) {
            const rotationRate = scrolled * 0.1;
            formGlow.style.transform = `rotate(${rotationRate}deg)`;
        }
    }
    
    // Auto-formatting for phone input
    const phoneInput = document.querySelector('input[name="phone"]');
    if (phoneInput) {
        phoneInput.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.startsWith('33')) {
                value = '+' + value;
            } else if (value.startsWith('0')) {
                value = '+33' + value.substring(1);
            } else if (value && !value.startsWith('+')) {
                value = '+33' + value;
            }
            
            // Format: +33 1 23 45 67 89
            if (value.length > 3) {
                value = value.replace(/(\\+33)(\\d{1})(\\d{2})(\\d{2})(\\d{2})(\\d{2})/, '$1 $2 $3 $4 $5 $6');
            }
            
            e.target.value = value;
        });
    }
    
    // Subject-specific form behavior
    const subjectSelect = document.querySelector('select[name="subject"]');
    const messageTextarea = document.querySelector('textarea[name="message"]');
    
    if (subjectSelect && messageTextarea) {
        subjectSelect.addEventListener('change', function() {
            const subject = this.value;
            const placeholders = {
                'demo': 'Décrivez vos besoins pour la démonstration : secteur d\'activité, cas d\'usage, nombre d\'utilisateurs...',
                'partnership': 'Présentez votre organisation et le type de partenariat envisagé...',
                'support': 'Décrivez votre problème technique en détail pour que nous puissions vous aider rapidement...',
                'pricing': 'Précisez vos besoins (nombre d\'utilisateurs, fonctionnalités, fréquence d\'utilisation) pour un devis personnalisé...',
                'careers': 'Présentez votre profil, vos compétences et le type de poste qui vous intéresse...',
                'press': 'Précisez votre média, le sujet de votre article et les informations recherchées...',
                'other': 'Décrivez votre demande en détail...'
            };
            
            if (placeholders[subject]) {
                messageTextarea.placeholder = placeholders[subject];
                
                // Add a subtle animation to draw attention
                messageTextarea.style.transform = 'scale(1.02)';
                setTimeout(() => {
                    messageTextarea.style.transform = '';
                }, 200);
            }
        });
    }
    
    // Form progress indicator
    function updateFormProgress() {
        const requiredFields = contactForm.querySelectorAll('input[required], select[required], textarea[required]');
        const filledFields = Array.from(requiredFields).filter(field => {
            return field.value.trim() !== '';
        });
        
        const progress = (filledFields.length / requiredFields.length) * 100;
        
        // Enable/disable submit button based on progress
        const isComplete = progress === 100;
        submitBtn.style.opacity = isComplete ? '1' : '0.7';
    }
    
    // Add progress tracking to all form inputs
    const allFormInputs = contactForm.querySelectorAll('input, select, textarea');
    allFormInputs.forEach(input => {
        input.addEventListener('input', updateFormProgress);
        input.addEventListener('change', updateFormProgress);
    });
    
    // Initial progress update
    updateFormProgress();
    
    // Auto-resize textarea
    if (messageTextarea) {
        messageTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.min(this.scrollHeight, 200) + 'px';
        });
    }
    
    // Character counter for message
    if (messageTextarea) {
        const maxLength = 1000;
        const counterElement = document.createElement('div');
        counterElement.className = 'character-counter';
        counterElement.style.cssText = `
            font-size: 12px;
            color: #9b9b9b;
            text-align: right;
            margin-top: 4px;
            font-family: 'FindoraRegular', sans-serif;
        `;
        
        messageTextarea.parentElement.appendChild(counterElement);
        
        function updateCounter() {
            const currentLength = messageTextarea.value.length;
            counterElement.textContent = `${currentLength}/${maxLength} caractères`;
            
            if (currentLength > maxLength * 0.9) {
                counterElement.style.color = '#ef4444';
            } else if (currentLength > maxLength * 0.7) {
                counterElement.style.color = '#f59e0b';
            } else {
                counterElement.style.color = '#9b9b9b';
            }
        }
        
        messageTextarea.addEventListener('input', updateCounter);
        messageTextarea.setAttribute('maxlength', maxLength);
        updateCounter();
    }
});

// Utility functions
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

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

// Add notification styles to head
const notificationStyles = `
<style>
.notification {
    position: fixed;
    top: 20px;
    right: 20px;
    background: white;
    border-radius: 8px;
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
    border-left: 4px solid #ffbd59;
    padding: 16px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    z-index: 1000;
    max-width: 400px;
}

.notification.show {
    transform: translateX(0);
}

.notification-success {
    border-left-color: #10b981;
}

.notification-error {
    border-left-color: #ef4444;
}

.notification-content {
    display: flex;
    align-items: center;
    gap: 12px;
}

.notification-icon {
    font-size: 18px;
    font-weight: bold;
}

.notification-success .notification-icon {
    color: #10b981;
}

.notification-error .notification-icon {
    color: #ef4444;
}

.notification-message {
    font-family: 'FindoraRegular', sans-serif;
    color: #161616;
    font-size: 14px;
}

.character-counter {
    font-size: 12px;
    color: #9b9b9b;
    text-align: right;
    margin-top: 4px;
    font-family: 'FindoraRegular', sans-serif;
}

@media (max-width: 768px) {
    .notification {
        right: 10px;
        left: 10px;
        max-width: none;
        transform: translateY(-100%);
    }
    
    .notification.show {
        transform: translateY(0);
    }
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', notificationStyles);