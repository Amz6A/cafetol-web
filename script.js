document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('header');
    
    // Header Scroll Effect - ensure text remains dark if we're not at the very top
    const handleScroll = () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initialize on load
    
    // Intersection Observer for fade-in elements (smooth appear on scroll)
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };
    
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // Optional: stop observing once it has become visible
                // observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(el => observer.observe(el));
    
    // Inject Mobile Menu 
    const nav = document.querySelector('nav');
    const headerContainer = document.querySelector('.header-container');
    if (nav && headerContainer) {
        const hamburger = document.createElement('div');
        hamburger.className = 'hamburger';
        hamburger.innerHTML = '<span></span><span></span><span></span>';
        
        // Insert right before nav
        headerContainer.insertBefore(hamburger, nav);
        
        // Toggle mobile menu logic
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            nav.classList.toggle('open');
            header.classList.add('scrolled'); // Force background so nav is visible
        });
        
        // Auto-close on click
        const navLinks = nav.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                nav.classList.remove('open');
            });
        });
    }
});
