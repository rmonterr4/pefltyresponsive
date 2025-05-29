class Carousel {
  constructor(container) {
    this.container = container;
    this.slide = container.querySelector('.carousel-slide');
    this.items = container.querySelectorAll('.carousel-item');
    this.next = container.querySelector('.next');
    this.prev = container.querySelector('.prev');
    this.dots = container.querySelectorAll('.dot');
    this.counter = 0;
    this.itemWidth = this.items[0].clientWidth;
    this.touchStartX = 0;
    this.touchEndX = 0;
    this.autoplayInterval = null;

    this.init();
  }

  init() {
    this.addEventListeners();
    this.startAutoplay();
    this.updateSlide();
  }

  addEventListeners() {
    // Botones de navegación
    this.next.addEventListener('click', () => this.nextSlide());
    this.prev.addEventListener('click', () => this.prevSlide());

    // Soporte táctil
    this.slide.addEventListener('touchstart', (e) => this.handleTouchStart(e));
    this.slide.addEventListener('touchmove', (e) => this.handleTouchMove(e));
    this.slide.addEventListener('touchend', () => this.handleTouchEnd());

    // Dots de navegación
    this.dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        this.counter = index;
        this.updateSlide();
      });
    });

    // Pausar autoplay al hover
    this.container.addEventListener('mouseenter', () => this.stopAutoplay());
    this.container.addEventListener('mouseleave', () => this.startAutoplay());

    // Actualizar tamaño en resize
    window.addEventListener('resize', () => {
      this.itemWidth = this.items[0].clientWidth;
      this.updateSlide();
    });
  }

  handleTouchStart(e) {
    this.touchStartX = e.touches[0].clientX;
    this.stopAutoplay();
  }

  handleTouchMove(e) {
    this.touchEndX = e.touches[0].clientX;
    const diff = this.touchStartX - this.touchEndX;
    const threshold = this.itemWidth / 4;
    
    if (Math.abs(diff) > threshold) {
      if (diff > 0) {
        this.nextSlide();
      } else {
        this.prevSlide();
      }
      this.touchStartX = 0;
      this.touchEndX = 0;
    }
  }

  handleTouchEnd() {
    this.startAutoplay();
  }

  nextSlide() {
    this.counter = (this.counter + 1) % this.items.length;
    this.updateSlide();
  }

  prevSlide() {
    this.counter = (this.counter - 1 + this.items.length) % this.items.length;
    this.updateSlide();
  }

  updateSlide() {
    this.slide.style.transform = `translateX(-${this.counter * 100}%)`;
    this.updateDots();
  }

  updateDots() {
    this.dots.forEach(dot => dot.classList.remove('active'));
    this.dots[this.counter].classList.add('active');
  }

  startAutoplay() {
    if (this.autoplayInterval) return;
    this.autoplayInterval = setInterval(() => this.nextSlide(), 5000);
  }

  stopAutoplay() {
    if (this.autoplayInterval) {
      clearInterval(this.autoplayInterval);
      this.autoplayInterval = null;
    }
  }
}

// Inicializar todos los carruseles en la página
document.addEventListener('DOMContentLoaded', () => {
  const carousels = document.querySelectorAll('.carousel-container');
  carousels.forEach(container => new Carousel(container));
});
