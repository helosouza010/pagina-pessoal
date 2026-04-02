const body = document.body;
const themeToggle = document.getElementById('themeToggle');
const menuToggle = document.getElementById('menuToggle');
const sideLinks = document.querySelectorAll('.side-nav a');

function applyTheme(theme) {
    if (theme === 'light') {
        body.classList.add('theme-light');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i><span>Modo Claro</span>';
    } else {
        body.classList.remove('theme-light');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i><span>Modo Escuro</span>';
    }
}

const savedTheme = localStorage.getItem('theme') || 'dark';
applyTheme(savedTheme);

if (themeToggle) {
    themeToggle.addEventListener('click', () => {
        const nextTheme = body.classList.contains('theme-light') ? 'dark' : 'light';
        localStorage.setItem('theme', nextTheme);
        applyTheme(nextTheme);
    });
}

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        const isClosed = body.classList.toggle('menu-closed');
        menuToggle.innerHTML = isClosed
            ? '<i class="fas fa-bars"></i><span></span>'
            : '<i class="fas fa-times"></i><span></span>';
    });
}

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        if (window.pageYOffset >= sectionTop - 160) {
            current = section.getAttribute('id');
        }
    });

    sideLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

const contactForm = document.getElementById('contactForm');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Obrigada pela sua mensagem! Responderei em breve.');
        contactForm.reset();
    });
}

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.about-text, .skill-card, .timeline-content, .contact-card, .project-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero-image');

    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.4}px)`;
    }
});

console.log('Página de Heloisa carregada com sucesso!');
