// Navigation et Menu Déroulant
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu déroulant Solutions
    const dropdownToggle = document.getElementById('solutions-dropdown');
    const dropdown = dropdownToggle.closest('.dropdown');
    const dropdownMenu = document.getElementById('solutions-menu');
    
    let timeoutId;
    
    // Ouvrir le menu au survol
    dropdown.addEventListener('mouseenter', function() {
        clearTimeout(timeoutId);
        dropdown.classList.add('active');
    });
    
    // Fermer le menu avec un délai au départ du survol
    dropdown.addEventListener('mouseleave', function() {
        timeoutId = setTimeout(() => {
            dropdown.classList.remove('active');
        }, 150);
    });
    
    // Clic sur le toggle pour mobile
    dropdownToggle.addEventListener('click', function(e) {
        e.preventDefault();
        dropdown.classList.toggle('active');
    });
    
    // Fermer le menu en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('active');
        }
    });
    
    // Navigation fluide
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80; // Hauteur de la navbar
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Effet de scroll sur la navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > lastScrollTop && scrollTop > 100) {
            // Scroll vers le bas
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scroll vers le haut
            navbar.style.transform = 'translateY(0)';
        }
        
        // Ajouter un effet de transparence
        if (scrollTop > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
        }
        
        lastScrollTop = scrollTop;
    });
    
    // Animation des cartes solutions au scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observer les cartes solutions
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Gestion du menu mobile (pour futures implémentations)
    const mobileToggle = document.querySelector('.mobile-menu-toggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            // Logique pour le menu mobile
            console.log('Menu mobile cliqué');
        });
    }
    
    // Effet de parallaxe léger sur le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroGradient = document.querySelector('.hero-gradient');
        
        if (heroGradient) {
            heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
        }
    });
    
    // Animation de typing pour le titre (optionnel)
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Gestion des interactions avec les cartes solutions
    solutionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(-4px)';
        });
    });
});

// Utilitaires
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

// Performance optimization pour le scroll
const optimizedScroll = debounce(function() {
    // Logique de scroll optimisée
}, 10);

window.addEventListener('scroll', optimizedScroll);
