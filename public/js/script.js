document.addEventListener('DOMContentLoaded', function() {
    // Toggle search bar
    const searchIcon = document.querySelector('.search-icon');
    if (searchIcon) {
        searchIcon.addEventListener('click', function() {
            const searchContainer = document.getElementById('search-container');
            if (searchContainer) {
                searchContainer.style.display = searchContainer.style.display === 'none' ? 'block' : 'none';
            }
        });
    }

    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Copy link tooltip
    const copyLink = document.getElementById('copy-link');
    if (copyLink) {
        copyLink.addEventListener('click', function() {
            const url = window.location.href;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(url).then(() => {
                    this.setAttribute('data-tooltip', '¡Enlace copiado!');
                    setTimeout(() => {
                        this.setAttribute('data-tooltip', 'Copiar enlace');
                    }, 2000);
                }).catch(err => {
                    console.error('Error al copiar el enlace: ', err);
                });
            }
        });
    }

    // Active nav link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                navLinks.forEach(nav => nav.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });

    // Carousel functionality
    const wrapper = document.querySelector('.carousel-wrapper');
    const slides = document.querySelectorAll('.carousel-slide');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    const indicators = document.querySelectorAll('.indicator');
    const titles = document.querySelectorAll('.slide-title');

    if (wrapper && slides.length && prevButton && nextButton) {
        let currentIndex = 0;

        function updateCarousel() {
            wrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
            indicators.forEach((ind, index) => {
                ind.classList.toggle('active', index === currentIndex);
            });
            titles.forEach((title, index) => {
                title.classList.toggle('active', index === currentIndex);
            });
        }

        prevButton.addEventListener('click', () => {
            currentIndex = (currentIndex - 1 + slides.length) % slides.length;
            updateCarousel();
        });

        nextButton.addEventListener('click', () => {
            currentIndex = (currentIndex + 1) % slides.length;
            updateCarousel();
        });

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentIndex = index;
                updateCarousel();
            });
        });

        updateCarousel();
    }
});

document.addEventListener('DOMContentLoaded', function() {
    const sections = ['nosotros', 'equipo', 'proyectos', 'contacto'];
    const dynamicContent = document.getElementById('dynamic-content');

    sections.forEach(section => {
        fetch(`${section}.html`)
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Error al cargar ${section}.html: ${response.statusText}`);
                }
                return response.text();
            })
            .then(data => {
                const sectionElement = document.createElement('div');
                sectionElement.innerHTML = data;
                dynamicContent.appendChild(sectionElement);
            })
            .catch(error => console.error('Error loading section:', error));
    });
});