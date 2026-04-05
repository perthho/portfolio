'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
  const expanded = sidebar.classList.contains("active");
  this.setAttribute("aria-expanded", expanded);
});



// Typed text effect for sidebar role
(function() {
  const el = document.querySelector('.info-content .title');
  if (!el) return;

  const roles = ['Web Developer', 'UI/UX Designer', 'Startup Co-founder'];
  let roleIndex = 0, charIndex = 0, isDeleting = false;

  function type() {
    const current = roles[roleIndex];
    el.innerHTML = current.substring(0, charIndex) + '<span class="typed-cursor">|</span>';

    if (!isDeleting && charIndex === current.length) {
      setTimeout(() => { isDeleting = true; type(); }, 2000);
      return;
    }
    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
    }

    charIndex += isDeleting ? -1 : 1;
    setTimeout(type, isDeleting ? 40 : 80);
  }

  type();
})();



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



// Animated nav indicator
(function() {
  const navList = document.querySelector('.navbar-list');
  if (!navList) return;

  const indicator = document.createElement('div');
  indicator.className = 'nav-indicator';
  navList.appendChild(indicator);

  function moveIndicator(link) {
    const rect = link.getBoundingClientRect();
    const parentRect = navList.getBoundingClientRect();
    indicator.style.left = (rect.left - parentRect.left) + 'px';
    indicator.style.width = rect.width + 'px';
  }

  // Set initial position
  const activeLink = navList.querySelector('.navbar-link.active');
  if (activeLink) {
    // Delay to ensure layout is computed
    requestAnimationFrame(() => moveIndicator(activeLink));
  }

  // Update on resize
  window.addEventListener('resize', () => {
    const current = navList.querySelector('.navbar-link.active');
    if (current) moveIndicator(current);
  });

  // Expose for nav click handler
  window._moveNavIndicator = moveIndicator;
})();



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

    // Move nav indicator
    if (window._moveNavIndicator) {
      window._moveNavIndicator(this);
    }

    // Re-trigger scroll reveals for newly active page
    initScrollReveal();

    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}



// Scroll-reveal with stagger
function initScrollReveal() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const revealElements = document.querySelectorAll(
    '.active .service-item, .active .timeline-item, .active .skill-category, .active .project-item, .active .contact-item, .active .about-text, .active .about-projects-list, .active .mapbox, .active .contact-form'
  );

  revealElements.forEach(el => {
    el.classList.add('reveal-element');
    el.classList.remove('revealed');
  });

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  revealElements.forEach((el, i) => {
    // Stagger within groups of similar elements
    const siblings = Array.from(el.parentElement.children).filter(
      s => s.classList.contains('reveal-element')
    );
    const indexInGroup = siblings.indexOf(el);
    el.style.transitionDelay = `${indexInGroup * 100}ms`;
    observer.observe(el);
  });
}

// Init on first load
initScrollReveal();



// Space Particle Background
(function() {
  // Skip particles for users who prefer reduced motion
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const canvas = document.getElementById('particles-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');

  let width, height;
  let mouseX = 0, mouseY = 0;
  let particles = [];
  // Reduce particles on mobile for performance
  const particleCount = window.innerWidth < 768 ? 60 : 120;
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



// Contact form submission
document.querySelector("[data-form]").addEventListener("submit", async function(e) {
  e.preventDefault();

  const form = e.target;
  const submitBtn = form.querySelector("[data-form-btn]");
  submitBtn.disabled = true;

  const formData = new FormData(form);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      body: formData
    });

    if (response.ok) {
      showPopup("Your message has been sent!", "success");
      form.reset();
    } else {
      showPopup("Something went wrong. Try again.", "error");
    }
  } catch {
    showPopup("Network error. Please try again.", "error");
  }

  submitBtn.disabled = false;
});

function showPopup(message, type) {
  const popup = document.createElement("div");
  popup.innerText = message;
  popup.style.cssText = `
    position: fixed; bottom: 20px; right: 20px;
    background: ${type === "error" ? "#ef4444" : "#4ade80"};
    color: #fff; padding: 12px 18px; border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0,0,0,0.2);
    font-size: 14px; z-index: 9999;
    transition: opacity 0.3s ease, transform 0.3s ease;
    transform: translateY(0);
  `;
  document.body.appendChild(popup);

  setTimeout(() => {
    popup.style.opacity = "0";
    popup.style.transform = "translateY(10px)";
    setTimeout(() => popup.remove(), 300);
  }, 3000);
}
