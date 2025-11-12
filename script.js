// ============================
// DOM Ready
// ============================
document.addEventListener('DOMContentLoaded', () => {

  // ============================
  // Mobile Menu Toggle
  // ============================
  const toggle = document.getElementById('menuToggle');
  const nav = document.getElementById('navMenu');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
    });
  }

  // Close mobile nav when a link is clicked
  const navLinks = document.querySelectorAll('#navMenu a');
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      nav.classList.remove('open');
    });
  });

  // ============================
  // Highlight Active Nav Link
  // ============================
  const currentPage = window.location.pathname.split("/").pop();
  const allLinks = document.querySelectorAll("nav a");

  allLinks.forEach(link => {
    const linkPage = link.getAttribute("href");
    if (linkPage === currentPage) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });

  // ============================
  // Swiper Slider Initialization
  // ============================
  if (typeof Swiper !== 'undefined' && document.querySelector('.mySwiper')) {
    const swiper = new Swiper('.mySwiper', {
      slidesPerView: 1,
      spaceBetween: 40,
      loop: true,
      autoplay: {
        delay: 4000,
        disableOnInteraction: false,
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
    });
  }

  // ============================
  // Explore Buttons
  // ============================
  document.querySelectorAll('.explore-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      window.location.href = 'services.html';
    });
  });

  // ============================
  // Scroll Fade Animation
  // ============================
  const fadeElements = document.querySelectorAll(
    '.service-card, .tech-card, .ai-item, .why-choose, .hero-content'
  );

  const observer = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) entry.target.classList.add('visible');
      });
    },
    { threshold: 0.2 }
  );

  fadeElements.forEach(el => observer.observe(el));

  // ============================
  // Smooth Scroll for Anchors
  // ============================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const targetId = anchor.getAttribute('href');
      const target = document.querySelector(targetId);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  // ============================
  // About Card Scroll Fade
  // ============================
  document.addEventListener('scroll', () => {
    document.querySelectorAll('.about-card').forEach(card => {
      const rect = card.getBoundingClientRect();
      if (rect.top < window.innerHeight - 100) {
        card.classList.add('visible');
      }
    });
  });

  // ============================
  // Counter Animation (Stats Section)
  // ============================
  const counters = document.querySelectorAll('.counter');
  const speed = 100;

  function animateCounters() {
    counters.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const suffix = counter.getAttribute('data-suffix') || '';
      const updateCount = () => {
        const count = +counter.innerText;
        const increment = target / speed;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 15);
        } else {
          counter.innerText = suffix === "K+" ? Math.round(target / 1000) + "K+" : target + suffix;
        }
      };
      updateCount();
    });
  }

  const section = document.querySelector('.stats-section');
  let started = false;

  if (section) {
    window.addEventListener('scroll', () => {
      const sectionTop = section.offsetTop - window.innerHeight + 100;
      if (!started && window.scrollY > sectionTop) {
        animateCounters();
        started = true;
      }
    });
  }

  // ============================
  // Google Sheet Form Submission
  // ============================
 
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbygvJQOBLBxSDptQD-4tD-KgsoN52G64N0IwPbo4thCis8UZkf27qsBd7eBCoPBgxbL/exec";

document.addEventListener('DOMContentLoaded', () => {
  // ============================
  // Function Definition
  // ============================
  function attachFormHandler() {
    const consultForm = document.getElementById('consultForm');
    if (!consultForm) return;

    consultForm.addEventListener('submit', async function (e) {
      e.preventDefault();
      const form = e.target;

      const data = {
        name: form.name.value.trim(),
        number: form.number.value.trim(),
        email: form.email.value.trim(),
        url: form.url.value.trim(),
        industry: form.industry.value,
        enquire: form.enquire ? form.enquire.value.trim() : "",
        source: window.location.href,
        timestamp: new Date().toISOString()
      };

      try {
        const res = await fetch(SCRIPT_URL, {
          method: "POST",
          body: JSON.stringify(data),
          headers: { "Content-Type": "application/json" }
        });

        const json = await res.json();

        if (json.result === "success") {
          alert(`✅ Thank you, ${data.name}! Your request has been received.`);
          form.reset();
        } else {
          alert("❌ Submission failed. Please try again.");
        }
      } catch (err) {
        alert("⚠️ Network error — please check your connection.");
        console.error(err);
      }
    });
  }

  // ============================
  // Call the function safely
  // ============================
  attachFormHandler();

  const consultBtn = document.querySelector('.btn.btn-accent');
  if (consultBtn) {
    consultBtn.addEventListener('click', () => {
      setTimeout(() => {
        attachFormHandler(); // reattach after form appears
      }, 500);
    });
  }
});


  // ============================
  // Button-to-Form & Calendly Mapping
  // ============================
  const formLink = "consultation.html";
  const calendlyLink = "https://calendly.com/rankgenius-digital/30min?month=2025-11"; // ✅ Your Live Calendly Link

  // Buttons leading to consultation form
  const mapToFormSelectors = [
    'a.btn.btn-accent[href="#"]',
    'a[href="#analyze"]',
    'a.book-meeting',
    '.get-free-consultation'
  ];

  mapToFormSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
      el.addEventListener('click', (ev) => {
        ev.preventDefault();
        window.location.href = formLink;
      });
    });
  });

  // Buttons that open Calendly directly
  document.querySelectorAll('.btn-calendly, .book-meeting').forEach(b => {
    b.addEventListener('click', e => {
      e.preventDefault();
      window.open(calendlyLink, '_blank');
    });
  });



// 🌸 Smooth resize animation feedback 
let resizeTimer;
window.addEventListener("resize", () => {
  document.body.classList.add("resizing");
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    document.body.classList.remove("resizing");
  }, 400);
});

});
// Optional: subtle fade during resize 
const style = document.createElement('style');
style.innerHTML = `
  body.resizing {
    transition: opacity 0.3s ease;
    opacity: 0.98; 
  }
`;
document.head.appendChild(style);
