// Navigation et Menu Déroulant
document.addEventListener('DOMContentLoaded', function() {
    // Gestion du menu déroulant Solutions
    const dropdownToggle = document.getElementById('solutions-dropdown');
    const dropdown = dropdownToggle ? dropdownToggle.closest('.dropdown') : null;
    const dropdownMenu = document.getElementById('solutions-menu');
    
    // Gestion du menu déroulant Ressources
    const ressourcesDropdownToggle = document.getElementById('ressources-dropdown');
    const ressourcesDropdown = ressourcesDropdownToggle ? ressourcesDropdownToggle.closest('.dropdown') : null;
    const ressourcesDropdownMenu = document.getElementById('ressources-menu');
    
    let solutionsTimeoutId;
    let ressourcesTimeoutId;
    
    if (dropdown && dropdownToggle) {
        dropdown.addEventListener('mouseenter', function() {
            clearTimeout(solutionsTimeoutId);
            clearTimeout(ressourcesTimeoutId);
            if (ressourcesDropdown) ressourcesDropdown.classList.remove('active');
            dropdown.classList.add('active');
        });
        dropdown.addEventListener('mouseleave', function() {
            solutionsTimeoutId = setTimeout(() => { dropdown.classList.remove('active'); }, 150);
        });
        dropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (ressourcesDropdown) ressourcesDropdown.classList.remove('active');
            dropdown.classList.toggle('active');
        });
    }
    
    if (ressourcesDropdown && ressourcesDropdownToggle) {
        ressourcesDropdown.addEventListener('mouseenter', function() {
            clearTimeout(ressourcesTimeoutId);
            clearTimeout(solutionsTimeoutId);
            if (dropdown) dropdown.classList.remove('active');
            ressourcesDropdown.classList.add('active');
        });
        ressourcesDropdown.addEventListener('mouseleave', function() {
            ressourcesTimeoutId = setTimeout(() => { ressourcesDropdown.classList.remove('active'); }, 150);
        });
        ressourcesDropdownToggle.addEventListener('click', function(e) {
            e.preventDefault();
            if (dropdown) dropdown.classList.remove('active');
            ressourcesDropdown.classList.toggle('active');
        });
    }
    
    // Fermer les menus en cliquant ailleurs
    document.addEventListener('click', function(e) {
        if (dropdown && ressourcesDropdown && !dropdown.contains(e.target) && !ressourcesDropdown.contains(e.target)) {
            dropdown.classList.remove('active');
            ressourcesDropdown.classList.remove('active');
        }
    });
    
    // Navigation fluide
    const navLinks = document.querySelectorAll('a[href^="#"]');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                const offsetTop = targetElement.offsetTop - 80; // Hauteur de la navbar
                window.scrollTo({ top: offsetTop, behavior: 'smooth' });
            }
        });
    });
    
    // Effet de scroll sur la navbar
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        if (navbar) {
            if (scrollTop > lastScrollTop && scrollTop > 100) navbar.style.transform = 'translateY(-100%)';
            else navbar.style.transform = 'translateY(0)';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
        lastScrollTop = scrollTop;
    });
    
    // Animation des cartes solutions au scroll
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    const solutionCards = document.querySelectorAll('.solution-card');
    solutionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
    
    // Parallaxe léger sur le hero
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroGradient = document.querySelector('.hero-gradient');
        const visStage = document.getElementById('visStage');
        if (heroGradient) heroGradient.style.transform = `translateY(${scrolled * 0.3}px)`;
        if (visStage) {
            const rotateY = Math.min(5, scrolled * 0.02);
            const rotateX = Math.min(4, scrolled * 0.015);
            visStage.style.transform = `rotateX(${rotateX}deg) rotateY(${-rotateY}deg)`;
        }
    });
    
    // Auto-activation des cartes stack
    (function autoActivateStackCards() {
        const cards = Array.from(document.querySelectorAll('.stack-card'));
        if (cards.length === 0) return;
        let idx = 0;
        function activate(i) {
            cards.forEach(c => c.classList.remove('sc-active'));
            const card = cards[i % cards.length];
            card.classList.add('sc-active');
        }
        activate(idx);
        setInterval(() => { idx = (idx + 1) % cards.length; activate(idx); }, 2200);
    })();
    
    // Accordéon FAQ
    (function initFaqAccordion() {
        const container = document.getElementById('faqAccordion');
        if (!container) return;
        const items = Array.from(container.querySelectorAll('.faq-item'));
        const headers = Array.from(container.querySelectorAll('.faq-header'));
        function collapse(item) {
            const content = item.querySelector('.faq-content');
            if (!content) return;
            content.style.height = content.scrollHeight + 'px';
            requestAnimationFrame(() => { content.style.height = '0px'; item.classList.remove('active'); });
        }
        function expand(item) {
            const content = item.querySelector('.faq-content');
            if (!content) return;
            content.style.height = content.scrollHeight + 'px';
            item.classList.add('active');
            content.addEventListener('transitionend', function handler() { content.style.height = 'auto'; content.removeEventListener('transitionend', handler); });
        }
        headers.forEach((btn) => {
            btn.addEventListener('click', () => {
                const parent = btn.closest('.faq-item');
                const isActive = parent.classList.contains('active');
                items.forEach((it) => { if (it.classList.contains('active')) collapse(it); });
                if (!isActive) expand(parent);
            });
        });
    })();
    
    // Pipeline V2 toggle
    (function initPipelineV2(){
        const container = document.getElementById('pipelineV2');
        if(!container) return;
        const buttons = container.querySelectorAll('.pipeline-toolbar button');
        buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                buttons.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const flow = btn.getAttribute('data-flow');
                container.classList.remove('is-text','is-audio','is-image');
                container.classList.add(`is-${flow}`);
            });
        });
    })();
});

// Utilitaires
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => { clearTimeout(timeout); func(...args); };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Performance optimization pour le scroll
const optimizedScroll = debounce(function() { /* noop */ }, 10);
window.addEventListener('scroll', optimizedScroll);




