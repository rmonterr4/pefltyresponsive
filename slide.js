const slide = document.querySelector('.carousel-slide');
const items = document.querySelectorAll('.carousel-item'); 
const next = document.querySelector('.next');
const prev = document.querySelector('.prev');
const dots = document.querySelectorAll('.dot');
let counter = 0;

function updateSlide() {
  slide.style.transform = `translateX(-${counter * 100}%)`;
  setActiveDot(counter); // ← actualiza el dot al cambiar el slide
}

next.addEventListener('click', () => {
  counter = (counter + 1) % items.length;
  updateSlide();
});

prev.addEventListener('click', () => {
  counter = (counter - 1 + items.length) % items.length;
  updateSlide();
});

function setActiveDot(index) {
  dots.forEach(dot => dot.classList.remove('active'));
  dots[index].classList.add('active');
}

// Agrega esto para que los dots también funcionen al hacer clic
dots.forEach((dot, index) => {
  dot.addEventListener('click', () => {
    counter = index;
    updateSlide();
  });
});

// Auto slide (con sincronización del dot)
setInterval(() => {
  counter = (counter + 1) % items.length;
  updateSlide();
}, 5000);
