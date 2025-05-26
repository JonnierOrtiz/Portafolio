document.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  const loadingBar = document.getElementById('loading-bar');
  const loadingText = document.querySelector('.loading-text');
  const navbar = document.getElementById('navbar');
  const advanceBtn = document.getElementById('advance-btn');
  const content = document.querySelector('.content');
  const menuBtn = document.getElementById('menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');

  // Elementos del Hero
  const heroTitle = document.getElementById('hero-title');
  const heroText = document.getElementById('hero-text');
  const heroBtn = document.getElementById('hero-btn');

  const startTime = Date.now();
  const loadDuration = 2000;
  let progress = 0;

  // Pre-cargar el sonido de hover
  const hoverSound = new Audio('sounds/hover.mp3'); // Cargar el sonido

  // Función para actualizar el progreso de la barra de carga usando requestAnimationFrame
  function updateProgress() {
    const elapsedTime = Date.now() - startTime;
    progress = Math.min((elapsedTime / loadDuration) * 100, 100);
    loadingBar.style.width = progress + '%';

    if (progress < 100) {
      requestAnimationFrame(updateProgress);
    } else {
      // Mostrar el botón de avanzar después de que la carga haya terminado
      setTimeout(() => {
        if (advanceBtn) {
          advanceBtn.style.display = 'block';
        }
      }, 300); // Pequeña demora para que el botón se vea después de la carga
    }
  }

  requestAnimationFrame(updateProgress);

  // Función para mostrar un elemento
  function showElement(element) {
    if (element) {
      element.style.display = 'block';
    }
  }

  // Mostrar contenido al hacer clic en avanzar
  if (advanceBtn) {
    advanceBtn.addEventListener('click', () => {
      if (loadingScreen) loadingScreen.style.display = 'none';
      if (navbar) navbar.style.visibility = 'visible';
      if (content) content.style.display = 'block';

      // Animaciones al Hero
      if (heroTitle) {
        heroTitle.classList.add('opacity-100', 'animate-fade-in-down', 'delay-200');
        void heroTitle.offsetWidth; // Forzar reflow para reiniciar la animación
      }
      if (heroText) {
        heroText.classList.add('opacity-100', 'animate-fade-in-down', 'delay-500');
        void heroText.offsetWidth;
      }
      if (heroBtn) {
        heroBtn.classList.add('opacity-100', 'animate-fade-in-up', 'delay-700');
        void heroBtn.offsetWidth;
      }
    });
  }

  // Activar sonido hover en todos los enlaces y botones al cargar la página
  document.querySelectorAll('a, button').forEach(element => {
    element.addEventListener('mouseenter', () => {
      hoverSound.currentTime = 0; // Reiniciar el sonido al inicio
      hoverSound.play(); // Reproducir el sonido
    });
  });

  // Mostrar/ocultar menú móvil
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // Cerrar el menú móvil al hacer clic en un enlace
  document.querySelectorAll('#mobile-menu a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.add('hidden');
    });
  });

  // Función para activar el enlace correspondiente en el navbar según la URL
  function setActiveLink() {
    const path = window.location.pathname; // Obtener la URL actual
    const currentPage = path.split('/').pop(); // Extraer el nombre del archivo

    // Remover clase 'active' de todos los enlaces
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });

    // Activar el enlace correspondiente
    if (currentPage === 'about.html') {
      document.getElementById('about-link').classList.add('active');
    } else if (currentPage === 'skills.html') {
      document.getElementById('skills-link').classList.add('active');
    } else if (currentPage === 'projects.html') {
      document.getElementById('projects-link').classList.add('active');
    } else if (currentPage === 'contact.html') {
      document.getElementById('contact-link').classList.add('active');
    }
  }

  // Llamar la función para establecer el enlace activo
  setActiveLink();
});


//

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('form');
    const submitBtn = form.querySelector('button[type="submit"]');
    const modal = document.getElementById('modal');
    const modalContent = modal.querySelector('div');
    const closeModalBtn = document.getElementById('closeModalBtn');

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const name = form.name.value.trim();
      const email = form.email.value.trim();
      const message = form.message.value.trim();

      if (!name || !email || !message) {
        alert('Por favor, completa todos los campos.');
        return;
      }

      submitBtn.disabled = true;
      submitBtn.textContent = 'Enviando...';

      setTimeout(() => {
        modal.classList.remove('hidden');
        // Añadir clase de animación
        modalContent.classList.add('modal-animate');

        form.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = '¡Hablemos ahora!';
      }, 1500);
    });

    function closeModal() {
      modal.classList.add('hidden');
      // Remover clase para que la animación pueda reproducirse de nuevo
      modalContent.classList.remove('modal-animate');
    }

    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal();
    });
  });