const slides = document.querySelectorAll(".slide");
const slidesContainer = document.querySelector(".slides");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");
const dotsContainer = document.querySelector(".dots");

// how many slides are visible at once; should match flex basis in CSS
const visibleSlides = 3;

let index = 0;           // current page index (0 = first slide visible)
let interval;

// Create dots – one dot per page, not per slide
const pageCount = Math.max(1, slides.length - visibleSlides + 1);
for (let i = 0; i < pageCount; i++) {
  const dot = document.createElement("span");
  dot.addEventListener("click", () => showSlide(i));
  dotsContainer.appendChild(dot);
}

// query dots after they've been generated
const dots = document.querySelectorAll(".dots span");

function updateSlideStyles() {
  // determine center slide index for the current page
  const centerOffset = Math.floor(visibleSlides / 2);
  const centerIdx = (index + centerOffset) % slides.length;

  slides.forEach((slide, idx) => {
    slide.classList.remove("center", "side");
    // is the slide within the current visible window?
    const rel = (idx - index + slides.length) % slides.length;
    if (rel < visibleSlides) {
      // it's one of the visible slides
      if (idx === centerIdx) {
        slide.classList.add("center");
      } else {
        slide.classList.add("side");
      }
    }
  });
}

function showSlide(i) {
  index = i;
  // clamp between 0 and last page
  if (index >= pageCount) index = 0;
  if (index < 0) index = pageCount - 1;

  // translate by percentage of one slide width; each page moves by 100/visibleSlides
  const shift = (index * 100) / visibleSlides;
  slidesContainer.style.transform = `translateX(-${shift}%)`;

  dots.forEach(dot => dot.classList.remove("active"));
  dots[index].classList.add("active");

  // apply center/side styling
  updateSlideStyles();
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

// Simple dynamic WhatsApp message example

function bookWithDate() {
  const date = prompt("Enter your event date (DD-MM-YYYY):");
  if (date) {
    window.open(`https://wa.me/91XXXXXXXXXX?text=Hi, I want to book Mehndi for ${date}`);
  }
}
