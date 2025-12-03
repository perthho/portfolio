'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {

  for (let i = 0; i < filterItems.length; i++) {

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === filterItems[i].dataset.category) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }

  }

}

// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    const clickedPage = this.innerHTML.toLowerCase();

    // Update pages
    for (let j = 0; j < pages.length; j++) {
      if (clickedPage === pages[j].dataset.page) {
        pages[j].classList.add("active");
      } else {
        pages[j].classList.remove("active");
      }
    }

    // Update nav links
    for (let k = 0; k < navigationLinks.length; k++) {
      if (navigationLinks[k].innerHTML.toLowerCase() === clickedPage) {
        navigationLinks[k].classList.add("active");
      } else {
        navigationLinks[k].classList.remove("active");
      }
    }

    window.scrollTo(0, 0);
  });
}



// Space Particle Background
(function() {
  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  let width, height;
  let mouseX = 0, mouseY = 0;
  let particles = [];
  const particleCount = 120;
  const connectionDistance = 150;
  const mouseRadius = 300;
  
  // Purple/violet color scheme to match theme
  const colors = [
    'rgba(180, 130, 255, ',
    'rgba(147, 112, 219, ',
    'rgba(138, 43, 226, ',
    'rgba(255, 255, 255, ',
    'rgba(200, 160, 255, '
  ];
  
  function resize() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  
  class Particle {
    constructor() {
      this.reset();
    }
    
    reset() {
      this.x = Math.random() * width;
      this.y = Math.random() * height;
      this.baseSize = Math.random() * 2 + 0.5;
      this.size = this.baseSize;
      this.speedX = 0;
      this.speedY = 0;
      this.color = colors[Math.floor(Math.random() * colors.length)];
      this.alpha = Math.random() * 0.5 + 0.3;
      this.targetAlpha = this.alpha;
      this.pulseSpeed = Math.random() * 0.003 + 0.002;
      this.pulseOffset = Math.random() * Math.PI * 2;
      this.pulseAmount = Math.random() * 0.5 + 0.3;
    }
    
    update(time) {
      const heartbeat = Math.sin(time * this.pulseSpeed + this.pulseOffset);
      const pulse = Math.pow(Math.abs(heartbeat), 0.5) * Math.sign(heartbeat);
      this.size = this.baseSize * (1 + pulse * this.pulseAmount);
      this.currentAlpha = this.alpha * (1 + pulse * 0.3);
      
      const dx = mouseX - this.x;
      const dy = mouseY - this.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      if (dist < mouseRadius) {
        const force = (mouseRadius - dist) / mouseRadius;
        const angle = Math.atan2(dy, dx);
        this.speedX += Math.cos(angle) * force * 0.02;
        this.speedY += Math.sin(angle) * force * 0.02;
        this.currentAlpha = Math.min(1, this.currentAlpha + force * 0.3);
      }
      
      this.x += this.speedX;
      this.y += this.speedY;
      this.speedX *= 0.98;
      this.speedY *= 0.98;
      
      if (this.x < -10) this.x = width + 10;
      if (this.x > width + 10) this.x = -10;
      if (this.y < -10) this.y = height + 10;
      if (this.y > height + 10) this.y = -10;
    }
    
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 0.5, 0, Math.PI * 2);
      ctx.fillStyle = 'rgba(255, 255, 255, ' + this.currentAlpha + ')';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = this.color + (this.currentAlpha * 0.9) + ')';
      ctx.fill();
      
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size * 1.3, 0, Math.PI * 2);
      ctx.strokeStyle = this.color + (this.currentAlpha * 0.5) + ')';
      ctx.lineWidth = 0.5;
      ctx.stroke();
    }
  }
  
  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < connectionDistance) {
          const opacity = (1 - dist / connectionDistance) * 0.15;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(180, 130, 255, ${opacity})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
  }
  
  function init() {
    resize();
    particles = [];
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
  }
  
  function animate(time) {
    ctx.clearRect(0, 0, width, height);
    drawConnections();
    particles.forEach(p => {
      p.update(time);
      p.draw();
    });
    requestAnimationFrame(animate);
  }
  
  window.addEventListener('resize', resize);
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });
  window.addEventListener('touchmove', (e) => {
    mouseX = e.touches[0].clientX;
    mouseY = e.touches[0].clientY;
  });
  
  init();
  animate(0);
})();



// Background toggle functionality
(function() {
  const toggleBtn = document.getElementById('bgToggle');
  if (!toggleBtn) return;
  
  const main = document.querySelector('main');
  const navbar = document.querySelector('.navbar');
  let isHidden = false;

  toggleBtn.addEventListener('click', function() {
    isHidden = !isHidden;
    main.classList.toggle('hidden-content', isHidden);
    if (navbar) navbar.style.opacity = isHidden ? '0' : '1';
    this.querySelector('ion-icon').setAttribute('name', isHidden ? 'eye-off-outline' : 'eye-outline');
  });
})();



// Infinite carousel for testimonials and clients
(function() {
  function createInfiniteCarousel(containerSelector) {
    const container = document.querySelector(containerSelector);
    if (!container) return;
    
    const items = Array.from(container.children);
    if (items.length === 0) return;
    
    const track = document.createElement('div');
    track.className = 'carousel-track';
    
    items.forEach(item => track.appendChild(item));
    items.forEach(item => track.appendChild(item.cloneNode(true)));
    
    container.innerHTML = '';
    container.appendChild(track);
  }
  
  function initCarousels() {
    createInfiniteCarousel('.testimonials-list');
    createInfiniteCarousel('.clients-list');
  }
  
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCarousels);
  } else {
    initCarousels();
  }
})();


document.querySelector("[data-form]").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector("[data-form-btn]");
  submitBtn.disabled = true;

  const formData = new FormData(form);

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    body: formData
  });

  if (response.ok) {
    showPopup("Your message has been sent!");
    form.reset();
    submitBtn.disabled = false;
  } else {
    showPopup("Something went wrong. Try again.");
    submitBtn.disabled = false;
  }
});

function showPopup(message) {
  const popup = document.createElement("div");
  popup.innerText = message;
  popup.style.position = "fixed";
  popup.style.bottom = "20px";
  popup.style.right = "20px";
  popup.style.background = "#4ade80";
  popup.style.color = "#fff";
  popup.style.padding = "12px 18px";
  popup.style.borderRadius = "8px";
  popup.style.boxShadow = "0 2px 10px rgba(0,0,0,0.2)";
  popup.style.fontSize = "14px";
  popup.style.zIndex = "9999";
  document.body.appendChild(popup);

  setTimeout(() => popup.remove(), 3000);
}