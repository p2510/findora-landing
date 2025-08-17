// Blog Article Script - Dynamic Content and Functionality

// Article data structure
const articleData = {
  1: {
    id: 1,
    title: "L'avenir de l'IA conversationnelle avec Findora",
    author: "FINDORA TEAM",
    date: "Août 14, 2025",
    readTime: "6 min de lecture",
    category: "Actualités",
    image: "/images/ai-conversation.jpg",
    content: `
      <h2>Introduction à l'IA conversationnelle</h2>
      <p>L'intelligence artificielle conversationnelle représente l'une des avancées les plus prometteuses de notre époque. Chez Findora, nous développons des solutions qui transforment la façon dont les entreprises interagissent avec leurs clients.</p>
      
      <h2>Les défis actuels</h2>
      <p>Malgré les progrès significatifs, plusieurs défis persistent dans le domaine de l'IA conversationnelle :</p>
      <ul>
        <li>La compréhension contextuelle profonde</li>
        <li>La personnalisation en temps réel</li>
        <li>L'intégration multi-plateforme</li>
        <li>La sécurité des données conversationnelles</li>
      </ul>
      
      <h2>Notre approche innovante</h2>
      <p>Findora propose une approche unique qui combine :</p>
      <blockquote>
        "Nous croyons que l'avenir de l'IA conversationnelle réside dans la capacité à créer des interactions naturelles et contextuellement pertinentes."
      </blockquote>
      
      <h3>Technologies clés</h3>
      <p>Nos agents IA utilisent des technologies de pointe :</p>
      <ul>
        <li><strong>Traitement du langage naturel avancé</strong> : Compréhension nuancée du contexte</li>
        <li><strong>Apprentissage adaptatif</strong> : Amélioration continue des interactions</li>
        <li><strong>Architecture modulaire</strong> : Intégration facile dans vos systèmes existants</li>
      </ul>
      
      <h2>Cas d'usage concrets</h2>
      <p>Nos solutions sont déjà déployées dans plusieurs secteurs :</p>
      
      <h3>Service client</h3>
      <p>Réduction de 60% du temps de traitement des demandes clients grâce à nos agents IA spécialisés.</p>
      
      <h3>Vente et marketing</h3>
      <p>Augmentation de 40% des conversions grâce à des interactions personnalisées en temps réel.</p>
      
      <h2>L'avenir avec Findora</h2>
      <p>Nous travaillons constamment à repousser les limites de ce qui est possible. Nos prochaines innovations incluront :</p>
      <ul>
        <li>IA multimodale (texte, voix, image)</li>
        <li>Agents IA émotionnellement intelligents</li>
        <li>Intégration IoT pour des contextes enrichis</li>
      </ul>
      
      <h2>Conclusion</h2>
      <p>L'IA conversationnelle n'est plus une technologie du futur, mais une réalité présente qui transforme déjà les entreprises. Avec Findora, vous avez accès aux outils les plus avancés pour créer des expériences client exceptionnelles.</p>
    `,
    tags: ["Intelligence Artificielle", "Agents IA", "Innovation"],
    relatedArticles: [2, 3, 4]
  },
  2: {
    id: 2,
    title: "Comment intégrer des agents IA dans votre entreprise",
    author: "FINDORA TEAM",
    date: "Août 10, 2025",
    readTime: "8 min de lecture",
    category: "Guide",
    image: "/images/ai-integration.jpg",
    content: `
      <h2>Étapes clés pour l'intégration</h2>
      <p>L'intégration d'agents IA dans votre entreprise nécessite une approche méthodique...</p>
    `,
    tags: ["Intégration", "Entreprise", "Guide"],
    relatedArticles: [1, 3, 5]
  },
  3: {
    id: 3,
    title: "Les tendances IA pour 2025",
    author: "FINDORA TEAM",
    date: "Août 5, 2025",
    readTime: "5 min de lecture",
    category: "Tendances",
    image: "/images/ai-trends.jpg",
    content: `
      <h2>Principales tendances à surveiller</h2>
      <p>2025 s'annonce comme une année charnière pour l'intelligence artificielle...</p>
    `,
    tags: ["Tendances", "2025", "Futur"],
    relatedArticles: [1, 2, 4]
  }
};

// Recent articles data
const recentArticles = [
  {
    id: 2,
    title: "Comment intégrer des agents IA dans votre entreprise",
    date: "Août 10, 2025"
  },
  {
    id: 3,
    title: "Les tendances IA pour 2025",
    date: "Août 5, 2025"
  },
  {
    id: 4,
    title: "Sécurité et IA : bonnes pratiques",
    date: "Juillet 28, 2025"
  },
  {
    id: 5,
    title: "ROI des solutions IA en entreprise",
    date: "Juillet 22, 2025"
  }
];

// Initialize article content on page load
document.addEventListener('DOMContentLoaded', function() {
  loadArticleContent();
  setupSharingButtons();
  generateTableOfContents();
  loadRecentArticles();
  loadRelatedArticles();
  setupNewsletterForm();
  setupScrollToTop();
});

// Load article content based on URL parameter or default to first article
function loadArticleContent() {
  const urlParams = new URLSearchParams(window.location.search);
  const articleId = urlParams.get('id') || '1';
  const article = articleData[articleId];
  
  if (!article) {
    console.error('Article not found');
    return;
  }
  
  // Update page elements
  document.getElementById('article-title').textContent = article.title;
  document.getElementById('article-author').textContent = article.author;
  document.getElementById('article-date').textContent = article.date;
  document.getElementById('article-read').textContent = article.readTime;
  document.getElementById('article-breadcrumb').textContent = article.title;
  
  // Update badge
  const badge = document.querySelector('#article-badge .badge-text');
  if (badge) {
    badge.textContent = article.category;
  }
  
  // Update cover image
  const coverElement = document.getElementById('article-cover');
  if (article.image) {
    coverElement.style.backgroundImage = `url(${article.image})`;
  } else {
    // Use gradient if no image
    const gradients = ['gradient-blue', 'gradient-indigo', 'gradient-purple'];
    const randomGradient = gradients[Math.floor(Math.random() * gradients.length)];
    coverElement.classList.add(randomGradient);
  }
  
  // Update content
  document.getElementById('article-body').innerHTML = article.content;
  
  // Update tags
  updateArticleTags(article.tags);
  
  // Update navigation
  updateArticleNavigation(parseInt(articleId));
  
  // Update page title
  document.title = `${article.title} - Findora`;
}

// Update article tags
function updateArticleTags(tags) {
  const tagsContainer = document.querySelector('.article-tags');
  if (tagsContainer && tags) {
    tagsContainer.innerHTML = tags.map(tag => 
      `<span class="tag">${tag}</span>`
    ).join('');
  }
}

// Update article navigation (previous/next)
function updateArticleNavigation(currentId) {
  const prevId = currentId - 1;
  const nextId = currentId + 1;
  
  const prevLink = document.getElementById('prev-article');
  const nextLink = document.getElementById('next-article');
  
  if (articleData[prevId]) {
    prevLink.href = `?id=${prevId}`;
    prevLink.querySelector('.nav-title').textContent = articleData[prevId].title;
    prevLink.style.display = 'block';
  } else {
    prevLink.style.display = 'none';
  }
  
  if (articleData[nextId]) {
    nextLink.href = `?id=${nextId}`;
    nextLink.querySelector('.nav-title').textContent = articleData[nextId].title;
    nextLink.style.display = 'block';
  } else {
    nextLink.style.display = 'none';
  }
}

// Setup sharing buttons
function setupSharingButtons() {
  const twitterBtn = document.getElementById('share-twitter');
  const linkedinBtn = document.getElementById('share-linkedin');
  const copyBtn = document.getElementById('share-copy');
  
  const currentUrl = window.location.href;
  const articleTitle = document.getElementById('article-title').textContent;
  
  // Twitter sharing
  twitterBtn.href = `https://twitter.com/intent/tweet?text=${encodeURIComponent(articleTitle)}&url=${encodeURIComponent(currentUrl)}`;
  
  // LinkedIn sharing
  linkedinBtn.href = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(currentUrl)}`;
  
  // Copy link functionality
  copyBtn.addEventListener('click', function(e) {
    e.preventDefault();
    navigator.clipboard.writeText(currentUrl).then(() => {
      // Show temporary feedback
      const originalIcon = copyBtn.innerHTML;
      copyBtn.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      `;
      setTimeout(() => {
        copyBtn.innerHTML = originalIcon;
      }, 2000);
    });
  });
}

// Generate table of contents from headings
function generateTableOfContents() {
  const content = document.getElementById('article-body');
  const tocContainer = document.getElementById('table-of-contents');
  const headings = content.querySelectorAll('h2, h3, h4');
  
  if (headings.length === 0) return;
  
  let tocHTML = '';
  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;
    
    const level = parseInt(heading.tagName.charAt(1));
    const indent = level === 2 ? '' : 'ml-4';
    
    tocHTML += `
      <a href="#${id}" class="toc-link ${indent}" data-target="${id}">
        ${heading.textContent}
      </a>
    `;
  });
  
  tocContainer.innerHTML = tocHTML;
  
  // Add smooth scrolling and active state management
  setupTableOfContentsNavigation();
}

// Setup table of contents navigation
function setupTableOfContentsNavigation() {
  const tocLinks = document.querySelectorAll('.toc-link');
  
  tocLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
        
        // Update active state
        tocLinks.forEach(l => l.classList.remove('active'));
        this.classList.add('active');
      }
    });
  });
  
  // Highlight current section on scroll
  window.addEventListener('scroll', updateActiveTocLink);
}

// Update active table of contents link based on scroll position
function updateActiveTocLink() {
  const headings = document.querySelectorAll('#article-body h2, #article-body h3, #article-body h4');
  const tocLinks = document.querySelectorAll('.toc-link');
  
  let activeHeading = null;
  
  headings.forEach(heading => {
    const rect = heading.getBoundingClientRect();
    if (rect.top <= 150 && rect.bottom >= 0) {
      activeHeading = heading;
    }
  });
  
  tocLinks.forEach(link => link.classList.remove('active'));
  
  if (activeHeading) {
    const activeLink = document.querySelector(`[data-target="${activeHeading.id}"]`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}

// Load recent articles in sidebar
function loadRecentArticles() {
  const container = document.getElementById('recent-articles');
  
  const html = recentArticles.map(article => `
    <a href="?id=${article.id}" class="recent-article">
      <div class="recent-article-title">${article.title}</div>
      <div class="recent-article-date">${article.date}</div>
    </a>
  `).join('');
  
  container.innerHTML = html;
}

// Load related articles
function loadRelatedArticles() {
  const container = document.getElementById('related-articles');
  const urlParams = new URLSearchParams(window.location.search);
  const currentId = parseInt(urlParams.get('id') || '1');
  const currentArticle = articleData[currentId];
  
  if (!currentArticle || !currentArticle.relatedArticles) return;
  
  const html = currentArticle.relatedArticles.map(id => {
    const article = articleData[id];
    if (!article) return '';
    
    return `
      <div class="bg-white rounded-xl border border-border-subtle hover:border-accent transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div class="article-cover ${article.image ? '' : 'gradient-blue'}" style="${article.image ? `background-image: url(${article.image})` : ''} height: 200px; background-size: cover; background-position: center;"></div>
        <div class="p-6">
          <div class="flex items-center gap-2 mb-3">
            <span class="bg-accent/10 text-text-primary px-2 py-1 rounded-full text-xs font-medium">${article.category}</span>
            <span class="text-text-light text-xs">${article.readTime}</span>
          </div>
          <h3 class="text-lg font-bold text-text-primary mb-3 line-clamp-2 font-findora-inter">${article.title}</h3>
          <div class="flex items-center justify-between">
            <span class="text-text-secondary text-sm">${article.date}</span>
            <a href="?id=${article.id}" class="text-accent hover:text-primary transition-colors font-medium text-sm">
              Lire l'article →
            </a>
          </div>
        </div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
}

// Setup newsletter form
function setupNewsletterForm() {
  const forms = document.querySelectorAll('.newsletter-form');
  
  forms.forEach(form => {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = this.querySelector('input[type="email"]');
      const submitBtn = this.querySelector('button[type="submit"]');
      
      if (!emailInput.value) return;
      
      // Simulate form submission
      const originalText = submitBtn.textContent;
      submitBtn.textContent = 'Inscription...';
      submitBtn.disabled = true;
      
      setTimeout(() => {
        submitBtn.textContent = 'Inscrit ✓';
        emailInput.value = '';
        
        setTimeout(() => {
          submitBtn.textContent = originalText;
          submitBtn.disabled = false;
        }, 3000);
      }, 1500);
    });
  });
}

// Setup scroll to top functionality
function setupScrollToTop() {
  // Create scroll to top button
  const scrollBtn = document.createElement('button');
  scrollBtn.className = 'fixed bottom-8 right-8 w-12 h-12 bg-accent text-primary rounded-full shadow-lg hover:bg-accent-light transition-all duration-300 z-50 opacity-0 pointer-events-none';
  scrollBtn.innerHTML = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" class="mx-auto">
      <path d="M7 14l5-5 5 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  `;
  
  document.body.appendChild(scrollBtn);
  
  // Show/hide button based on scroll position
  window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
      scrollBtn.style.opacity = '1';
      scrollBtn.style.pointerEvents = 'auto';
    } else {
      scrollBtn.style.opacity = '0';
      scrollBtn.style.pointerEvents = 'none';
    }
  });
  
  // Scroll to top functionality
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Handle page navigation for single-page application behavior
window.addEventListener('popstate', function() {
  loadArticleContent();
  generateTableOfContents();
  loadRelatedArticles();
});