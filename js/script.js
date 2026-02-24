const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

let index = 0;
let interval;

// Create dots
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => showSlide(i));
  dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll(".dots span");

function showSlide(i) {
  index = i;
  if (index >= slides.length) index = 0;
  if (index < 0) index = slides.length - 1;

  slidesContainer.style.transform = `translateX(-${index * 100}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");
}

function nextSlide() {
  showSlide(index + 1);
}

function prevSlide() {
  showSlide(index - 1);
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

// Auto Slide
function startAutoSlide() {
  interval = setInterval(nextSlide, 4000);
}

startAutoSlide();

// Pause on hover
document.querySelector(".hero-slider").addEventListener("mouseenter", () => clearInterval(interval));
document.querySelector(".hero-slider").addEventListener("mouseleave", startAutoSlide);

showSlide(index);
