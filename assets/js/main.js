document.addEventListener('DOMContentLoaded', () => {

    // ===== LOADER =====
    const loader = document.getElementById('loader');
    if (loader) {
        // Ocultar rápidamente sin esperar a que descarguen los 28MB del video
        setTimeout(() => loader.classList.add('hidden'), 800);
        window.addEventListener('load', () => loader.classList.add('hidden'));
    }

    // ===== PARTICLES =====
    const particlesContainer = document.getElementById('heroParticles');
    if (particlesContainer) {
        for (let i = 0; i < 30; i++) {
            const p = document.createElement('div');
            p.className = 'particle';
            p.style.left = Math.random() * 100 + '%';
            p.style.animationDelay = Math.random() * 6 + 's';
            p.style.animationDuration = (4 + Math.random() * 4) + 's';
            p.style.width = p.style.height = (2 + Math.random() * 3) + 'px';
            particlesContainer.appendChild(p);
        }
    }

    // ===== NAVBAR =====
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navLinks = document.getElementById('navLinks');

    window.addEventListener('scroll', () => {
        navbar.classList.toggle('scrolled', window.scrollY > 50);
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile nav on link click
    navLinks.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    // ===== SCROLL SPY (Navegación Activa) =====
    const sections = document.querySelectorAll('section[id]');
    const navLinksAll = document.querySelectorAll('.nav-link');

    // Usar IntersectionObserver con un margen del 40% arriba y abajo 
    // para detectar exactamente qué sección está en el centro de la pantalla
    const scrollSpyObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                let current = entry.target.id;

                // Corrección especial: Si vemos anuncios, seguimos en la sección experiencia
                if (current === 'announcements') current = 'experience';

                navLinksAll.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + current) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, {
        root: null,
        rootMargin: '-40% 0px -40% 0px',
        threshold: 0
    });

    sections.forEach(section => scrollSpyObserver.observe(section));

    // ===== CATEGORY TABS LOGIC =====
    const catTabs = document.querySelectorAll('.menu-cat-tab');
    const catalogs = document.querySelectorAll('.menu-catalog-container');

    catTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const target = tab.dataset.catalog;
            
            // Cambiar estado de botones
            catTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Cambiar contenedor visible
            catalogs.forEach(c => {
                c.classList.remove('active');
                if (c.id === 'catalog-' + target) {
                    c.classList.add('active');
                }
            });
        });
    });

    // ===== MEGA MENU CLICKS (Vincular con Catálogo) =====
    const megaLinks = document.querySelectorAll('[data-catalog-target]');
    megaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetCat = link.dataset.catalogTarget;
            const correspondingTab = document.querySelector(`.menu-cat-tab[data-catalog="${targetCat}"]`);
            
            if (correspondingTab) {
                // Pequeño delay para dejar que el scroll suceda o forzar el cambio antes
                correspondingTab.click();
            }
        });
    });

    // ===== SCROLL ANIMATIONS =====
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const delay = entry.target.dataset.delay || 0;
            if (entry.isIntersecting) {
                if (delay > 0) {
                    entry.target.timeoutId = setTimeout(() => {
                        entry.target.classList.add('visible');
                    }, parseInt(delay));
                } else {
                    entry.target.classList.add('visible');
                }
            } else {
                // Removemos la clase cuando sale de la pantalla para que vuelva a animarse al entrar
                if (entry.target.timeoutId) {
                    clearTimeout(entry.target.timeoutId);
                }
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('[data-animate]').forEach(el => observer.observe(el));

    // ===== SMOOTH SCROLL =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // ===== HERO VIDEO CONTROLLER =====
    const heroSection = document.getElementById('hero');
    const heroVideo = document.getElementById('heroMainVideo');
    if (heroSection && heroVideo) {
        let isFirstLoad = true;
        
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    if (!isFirstLoad) {
                        heroVideo.currentTime = 0;
                    }
                    heroVideo.play().catch(e => console.log('Autoplay prevenido:', e));
                    isFirstLoad = false;
                } else {
                    heroVideo.pause();
                }
            });
        }, { threshold: 0.1 });

        videoObserver.observe(heroSection);
    }

    // ===== PARALLAX ABOUT IMAGE =====
    const aboutImgWrapper = document.querySelector('.about-img-wrapper');
    if (aboutImgWrapper) {
        let ticking = false;
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const rect = aboutImgWrapper.getBoundingClientRect();
                    // Si el elemento es visible en pantalla
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        // Calcula el centro del elemento relativo al centro de la ventana
                        const elementCenter = rect.top + rect.height / 2;
                        const windowCenter = window.innerHeight / 2;
                        // Rango de -1 a 1
                        const scrollProgress = (elementCenter - windowCenter) / windowCenter;
                        
                        // Setear variables CSS para que sections.css las anime
                        aboutImgWrapper.style.setProperty('--scroll-y', `${scrollProgress * 25}px`);
                        aboutImgWrapper.style.setProperty('--scroll-deco-y', `${-scrollProgress * 35}px`);
                    }
                    ticking = false;
                });
                ticking = true;
            }
        });
    }
});
