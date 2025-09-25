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
  menuToggle.classList.toggle('active'); // animación cruz
});


// --- Cierra el menú al hacer clic en un enlace ---
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuToggle.classList.remove('active');
  });
});




