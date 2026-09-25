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

// Case Studies — dados e modal
const CASE_STUDIES = {
    viagens: {
        title: 'Agência de Viagens',
        badge: 'Front-End · Case Study',
        problem: 'Agências de turismo locais precisavam de presença digital que convertesse visitantes em contatos, com foco em destinos de vilarejos e experiências autênticas.',
        solution: 'Landing page responsiva com hierarquia visual clara, CTAs estratégicos, semântica HTML5, acessibilidade e design mobile-first.',
        result: 'Projeto de certificação aprovado com deploy em produção. Página leve, indexável e pronta para campanhas de marketing digital.',
        role: 'Desenvolvedor Front-End (projeto individual)',
        stack: ['HTML5', 'CSS3', 'JavaScript', 'Font Awesome', 'Vercel'],
        challenge: 'Equilibrar estética moderna com performance: otimizei imagens, usei CSS Grid/Flexbox para layouts complexos e garanti contraste adequado em todos os breakpoints sem depender de frameworks.',
        demoUrl: 'https://viagens-landing-page-self.vercel.app/',
        codeUrl: 'https://github.com/jvaribeiro/viagens--landing-page',
        mediaType: 'iframe',
        mediaSrc: 'https://viagens-landing-page-self.vercel.app/',
        fallbackImage: 'asset/Agencia-de-Viagens.png'
    },
    automacao: {
        title: 'Automação Pecuária — TCC',
        badge: 'IoT + Dashboard Web · TCC IFRN',
        problem: 'Produtores rurais do Agreste Potiguar enfrentam perdas por estresse térmico no gado leiteiro, sem soluções de monitoramento ambiental acessíveis (sistemas comerciais custam milhares).',
        solution: 'Sistema IoT de baixo custo (R$ 283,00) com Raspberry Pi Pico W, sensores DHT22/LDR, controle de ventiladores e nebulizadores via relés, e dashboard web local para monitoramento em tempo real.',
        result: 'TCC aprovado com protótipo funcional. Monitoramento contínuo de temperatura, umidade e luminosidade com acionamento automático de atuadores — solução viável para pequenos produtores.',
        role: 'Desenvolvedor Full-Stack + Hardware (TCC individual) — firmware em C, servidor web embarcado, dashboard front-end',
        stack: ['C (Pico SDK)', 'Raspberry Pi Pico W', 'DHT22', 'Sensor LDR', 'Relés', 'HTML/CSS/JS', 'Wi-Fi AP'],
        challenge: 'Integrar três camadas distintas: firmware em C lendo sensores e acionando atuadores, servidor HTTP embarcado no Pico W servindo o dashboard, e front-end consumindo dados via polling/WebSocket local — tudo com hardware limitado e conectividade instável em ambiente rural.',
        demoUrl: 'https://simulacao-sistema-de-automacao-pecu.vercel.app/',
        codeUrl: 'https://github.com/jvaribeiro/tcc-automacao',
        mediaType: 'iframe',
        mediaSrc: 'https://simulacao-sistema-de-automacao-pecu.vercel.app/',
        fallbackImage: 'asset/Automacao-Pecuaria.jpeg'
    }
};

const caseModal = document.getElementById('case-study-modal');
const caseContent = document.getElementById('case-study-content');
const caseCloseBtn = document.getElementById('case-study-close');
let lastFocusedElement = null;

function renderCaseStudy(id) {
    const data = CASE_STUDIES[id];
    if (!data) return;

    const badgeClass = 'case-study-badge--primary';
    const challengeClass = 'case-study-challenge';
    const primaryClass = 'case-study-action--primary';

    const mediaHtml = data.mediaType === 'iframe'
        ? `<div class="case-study-media">
               <iframe src="${data.mediaSrc}" title="Demo: ${data.title}" loading="lazy"
                   sandbox="allow-scripts allow-same-origin allow-popups"></iframe>
           </div>`
        : `<div class="case-study-media">
               <img src="${data.fallbackImage}" alt="Preview: ${data.title}">
           </div>`;

    caseContent.innerHTML = `
        <span class="case-study-badge ${badgeClass}">${data.badge}</span>
        <h2 id="case-study-title" class="case-study-title">${data.title}</h2>
        ${mediaHtml}
        <div class="case-study-psr">
            <div class="case-study-psr-item case-study-psr-item--problem">
                <h4>Problema</h4>
                <p>${data.problem}</p>
            </div>
            <div class="case-study-psr-item case-study-psr-item--solution">
                <h4>Solução</h4>
                <p>${data.solution}</p>
            </div>
            <div class="case-study-psr-item case-study-psr-item--result">
                <h4>Resultado</h4>
                <p>${data.result}</p>
            </div>
        </div>
        <div class="case-study-section">
            <h4>Meu papel</h4>
            <p class="text-gray-300 text-sm leading-relaxed">${data.role}</p>
        </div>
        <div class="case-study-section">
            <h4>Stack</h4>
            <div class="case-study-tags">
                ${data.stack.map(tech => `<span class="case-study-tag">${tech}</span>`).join('')}
            </div>
        </div>
        <div class="case-study-section">
            <h4>Desafio técnico</h4>
            <p class="${challengeClass}">${data.challenge}</p>
        </div>
        <div class="case-study-actions">
            <a href="${data.demoUrl}" target="_blank" rel="noopener noreferrer" class="case-study-action ${primaryClass}">
                Ver demo ao vivo
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"/></svg>
            </a>
            <a href="${data.codeUrl}" target="_blank" rel="noopener noreferrer" class="case-study-action case-study-action--secondary">
                Ver código
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path fill-rule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.492.5.092.682-.217.682-.482 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.031-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.378.203 2.398.1 2.651.64.7 1.03 1.595 1.03 2.688 0 3.848-2.338 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z" clip-rule="evenodd"/></svg>
            </a>
        </div>
    `;
}

function openCaseStudy(id) {
    if (!CASE_STUDIES[id]) return;

    lastFocusedElement = document.activeElement;
    renderCaseStudy(id);
    caseModal.classList.remove('hidden');
    caseModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
    caseCloseBtn.focus();
}

function closeCaseStudy() {
    caseModal.classList.add('hidden');
    caseModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
    caseContent.innerHTML = '';

    if (lastFocusedElement) {
        lastFocusedElement.focus();
    }
}

document.querySelectorAll('[data-open-case]').forEach(btn => {
    btn.addEventListener('click', () => openCaseStudy(btn.dataset.openCase));
});

document.querySelectorAll('.project-card:not(.project-card--soon)').forEach(card => {
    const media = card.querySelector('.project-card-media');
    if (media) {
        media.addEventListener('click', (e) => {
            if (e.target.closest('a')) return;
            openCaseStudy(card.dataset.project);
        });
        media.setAttribute('tabindex', '0');
        media.setAttribute('role', 'button');
        media.setAttribute('aria-label', `Abrir case study: ${card.querySelector('h3')?.textContent || 'projeto'}`);
        media.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openCaseStudy(card.dataset.project);
            }
        });
    }
});

caseCloseBtn.addEventListener('click', closeCaseStudy);
caseModal.querySelector('.case-study-backdrop').addEventListener('click', closeCaseStudy);

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !caseModal.classList.contains('hidden')) {
        closeCaseStudy();
    }
});

// Timeline expandível
document.querySelectorAll('.timeline-toggle').forEach(btn => {
    btn.addEventListener('click', () => {
        const panel = document.getElementById(btn.getAttribute('aria-controls'));
        const label = btn.querySelector('.timeline-toggle-label');
        const isOpen = btn.getAttribute('aria-expanded') === 'true';

        btn.setAttribute('aria-expanded', String(!isOpen));
        if (label) label.textContent = isOpen ? 'Ver mais' : 'Ver menos';

        if (isOpen) {
            panel.classList.remove('is-open');
            panel.hidden = true;
        } else {
            panel.hidden = false;
            requestAnimationFrame(() => panel.classList.add('is-open'));
        }
    });
});
