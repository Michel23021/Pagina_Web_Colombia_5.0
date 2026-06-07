// Variable de control para saber el idioma activo
let currentLang = 'es';

/**
 * Función principal para alternar entre Español e Inglés
 */
function toggleLanguage() {
  const btn = document.getElementById('langBtn');
  
  // Cambiar el estado del idioma activo
  currentLang = currentLang === 'es' ? 'en' : 'es';
  
  // Modificar visualmente el botón del Navbar
  btn.textContent = currentLang === 'es' ? 'EN' : 'ES';

  // 1. Traducir textos usando los atributos de datos personalizados
  document.querySelectorAll('[data-lang-es]').forEach(elem => {
    if (currentLang === 'es') {
      elem.innerHTML = elem.getAttribute('data-lang-es');
    } else {
      elem.innerHTML = elem.getAttribute('data-lang-en');
    }
  });

  // 2. Modificar dinámicamente el marcador del buscador (placeholder)
  const searchInput = document.getElementById('glossarySearch');
  if (searchInput) {
    searchInput.placeholder = currentLang === 'es' ? 'Buscar término / Search term…' : 'Search term / Buscar término…';
  }

  // 3. Alternar la visibilidad de bloques nativos estructurados
  document.querySelectorAll('.es-content').forEach(el => {
    el.style.display = currentLang === 'es' ? '' : 'none';
  });
  
  document.querySelectorAll('.en-content').forEach(el => {
    el.style.display = currentLang === 'en' ? '' : 'none';
  });
}

/**
 * Configuración de eventos interactivos cuando el DOM esté listo
 */
document.addEventListener('DOMContentLoaded', () => {
  
  // ==========================================
  // FILTRO EN TIEMPO REAL PARA EL GLOSARIO
  // ==========================================
  const searchInput = document.getElementById('glossarySearch');
  
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      const searchValue = e.target.value.toLowerCase().trim();
      const rows = document.querySelectorAll('.gloss-row');

      rows.forEach(row => {
        // Capturar todo el contenido de texto dentro de la fila
        const rowText = row.textContent.toLowerCase();
        
        // Mostrar u ocultar según la coincidencia
        if (rowText.includes(searchValue)) {
          row.style.display = '';
        } else {
          row.style.display = 'none';
        }
      });
    });
  }

  // ==========================================
  // FUNCIONALIDAD DE LA GALERÍA (LIGHTBOX)
  // ==========================================
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxClose = document.getElementById('lightboxClose');
  const galleryItems = document.querySelectorAll('.gallery-item');

  // Abrir Lightbox al seleccionar una imagen de la grilla
  galleryItems.forEach(item => {
    item.addEventListener('click', () => {
      const imgInside = item.querySelector('img');
      if (imgInside && lightbox && lightboxImg) {
        lightboxImg.src = imgInside.src;
        lightboxImg.alt = imgInside.alt;
        lightbox.style.display = 'flex';
      }
    });
  });

  // Ocultar Lightbox al pulsar la equis (X)
  if (lightboxClose) {
    lightboxClose.addEventListener('click', () => {
      lightbox.style.display = 'none';
    });
  }

  // Ocultar Lightbox al hacer clic en cualquier área oscura de fondo
  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        lightbox.style.display = 'none';
      }
    });
  }
});