// --- Carrusel automático ---
const slides = document.querySelectorAll('.slide');
let indice = 0;

function siguienteSlide() {
    slides[indice].classList.remove('activo');
    indice = (indice + 1) % slides.length;
    slides[indice].classList.add('activo');
}

setInterval(siguienteSlide, 5000); // Cambia cada 5 segundos


// --- Scroll suave al hacer click en la flecha ---
const flecha = document.querySelector('.flecha'); 
if (flecha) {
    flecha.addEventListener('click', () => {
        const headerHeight = document.querySelector('header').offsetHeight;
        const target = document.querySelector('.bienvenida'); // 👈 destino
        const offsetTop = target.getBoundingClientRect().top + window.scrollY - headerHeight;

        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
    });
}


// --- Animación cambio en los horarios ---
document.addEventListener('DOMContentLoaded', () => {
    const dias = document.querySelectorAll('.horarios-contenedor .dia');
    let indiceActual = 1;

    function alternarDestacado() {
        dias.forEach(dia => {
            dia.classList.remove('destacado');
        });

        dias[indiceActual].classList.add('destacado');
        indiceActual++;

        if (indiceActual >= dias.length) {
            indiceActual = 0;
        }
    }

    alternarDestacado();

    setInterval(alternarDestacado, 3000);
});


// --- Animación letra por letra en redes sociales ---
document.querySelectorAll('.social-icon span').forEach(span => {
    let letras = span.textContent.split('');
    span.innerHTML = letras.map((l, i) => `<span style="animation-delay:${i*0.2}s">${l}</span>`).join('');
});


// --- Menú hamburguesa con animación a cruz ---
const menuToggle = document.getElementById('menu-toggle');
const navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  menuToggle.classList.toggle('active');
});


// --- Cierra el menú al hacer clic en un enlace ---
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});


// --- Ampliar imágenes de especialidades ---
document.addEventListener('DOMContentLoaded', () => {
    const modal = document.getElementById('img-modal');
    const modalImg = document.getElementById('img-modal-img');
    const modalClose = document.getElementById('img-modal-close');
    if (!modal || !modalImg) return;

    // Desktop-only helper
    const isDesktop = () => window.matchMedia('(min-width: 993px)').matches;

    let prevBodyOverflow = '';
    let prevHtmlOverflow = '';
    let prevBodyPaddingRight = '';
    function getScrollbarWidth() {
        return window.innerWidth - document.documentElement.clientWidth;
    }
    function lockScroll() {
        const scrollbarWidth = getScrollbarWidth();
        prevBodyOverflow = document.body.style.overflow;
        prevHtmlOverflow = document.documentElement.style.overflow;
        prevBodyPaddingRight = document.body.style.paddingRight;
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
        if (scrollbarWidth > 0) {
            document.body.style.paddingRight = scrollbarWidth + 'px';
        }
    }
    function unlockScroll() {
        document.documentElement.style.overflow = prevHtmlOverflow;
        document.body.style.overflow = prevBodyOverflow;
        document.body.style.paddingRight = prevBodyPaddingRight;
    }

    function abrir(src, alt) {
        if (!isDesktop()) return;
        modalImg.src = src;
        modalImg.alt = alt || '';
        modal.classList.add('abierto');
        modal.setAttribute('aria-hidden', 'false');
        lockScroll();
    }

    function cerrar() {
        modal.classList.remove('abierto');
        modal.setAttribute('aria-hidden', 'true');
        unlockScroll();
        modalImg.src = '';
    }

    document.querySelectorAll('.especialidades .plato img').forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', () => abrir(img.src, img.alt));
    });

    modal.addEventListener('click', (e) => {
        if (e.target && e.target.getAttribute('data-close') === 'true') {
            cerrar();
        }
    });
    modalClose && modalClose.addEventListener('click', cerrar);
    document.addEventListener('keydown', (e) => {
        if (!modal.classList.contains('abierto')) return;
        if (e.key === 'Escape') cerrar();
    });

    // Bloquear scroll dentro del overlay con rueda/touch
    ['wheel', 'touchmove'].forEach(evt => {
        modal.addEventListener(evt, (e) => {
            if (modal.classList.contains('abierto')) {
                e.preventDefault();
            }
        }, { passive: false });
    });

    // Cerrar si cambia a no-escritorio
    window.addEventListener('resize', () => {
        if (!isDesktop() && modal.classList.contains('abierto')) {
            cerrar();
        }
    });
});

