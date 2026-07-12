// Script para menu mobile
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    const isExpanded = mobileMenu.classList.contains('hidden');
    mobileMenu.classList.toggle('hidden');
    mobileMenuButton.setAttribute('aria-expanded', !isExpanded);
});

// Script para fechar menu mobile ao clicar em um link
const mobileNavLinks = document.querySelectorAll('#mobile-menu a');
mobileNavLinks.forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
        mobileMenuButton.setAttribute('aria-expanded', 'false');
    });
});

// Scroll Spy — destaca o link da seção visível
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('#navigation a[href^="#"], #mobile-menu a[href^="#"]');
const sectionVisibility = new Map();

function activateNavLink(sectionId) {
    navLinks.forEach(link => {
        const isActive = link.getAttribute('href') === `#${sectionId}`;
        link.classList.toggle('nav-active', isActive);
        if (isActive) {
            link.setAttribute('aria-current', 'page');
        } else {
            link.removeAttribute('aria-current');
        }
    });
}

const spyObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            sectionVisibility.set(entry.target.id, entry.intersectionRatio);
        });

        let activeId = 'home';
        let maxRatio = 0;

        sectionVisibility.forEach((ratio, id) => {
            if (ratio > maxRatio) {
                maxRatio = ratio;
                activeId = id;
            }
        });

        if (maxRatio > 0) {
            activateNavLink(activeId);
        }
    },
    {
        rootMargin: '-15% 0px -55% 0px',
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1]
    }
);

sections.forEach(section => spyObserver.observe(section));
activateNavLink('home');

// Reveal animations — elementos entram suavemente ao rolar
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function setupReveal(elements, variant = 'reveal', staggerMs = 0) {
    elements.forEach((el, index) => {
        el.classList.add(variant);
        if (staggerMs > 0) {
            el.style.transitionDelay = `${index * staggerMs}ms`;
        }
        revealObserver.observe(el);
    });
}

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                revealObserver.unobserve(entry.target);
            }
        });
    },
    { rootMargin: '0px 0px -8% 0px', threshold: 0.1 }
);

if (!prefersReducedMotion) {
    setupReveal(document.querySelectorAll('main section:not(#home) > div > h2'));
    setupReveal(document.querySelectorAll('#about article'), 'reveal', 0);
    setupReveal(document.querySelectorAll('#skills .grid > div'), 'reveal', 100);
    setupReveal(document.querySelectorAll('#experience [role="listitem"] article'), 'reveal', 150);
    setupReveal(document.querySelectorAll('#education article'), 'reveal', 80);
    setupReveal(document.querySelectorAll('#education h3'), 'reveal');
    setupReveal(document.querySelectorAll('#projects > div > p.text-center'), 'reveal');
    setupReveal(document.querySelectorAll('#projects .grid > article'), 'reveal', 120);
    setupReveal(document.querySelectorAll('#contact .max-w-4xl'), 'reveal-scale');
}
