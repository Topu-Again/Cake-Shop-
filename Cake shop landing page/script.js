/**
 * Miss Barishal - Cake Shop Landing Page
 * JavaScript Interactions & Dynamic Features
 */

document.addEventListener('DOMContentLoaded', () => {

  /* ==========================================
   * 1. Sticky Navigation & Hamburger Menu
   * ========================================== */
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav-menu__link');

  // Sticky Navbar Effect
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Toggle Mobile Navigation
  hamburger.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('active');
    hamburger.setAttribute('aria-expanded', isOpen);
  });

  // Close Mobile Menu when link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    });
  });

  /* ==========================================
   * 2. Navigation Active Link Highlight on Scroll
   * ========================================== */
  const sections = document.querySelectorAll('section[id]');

  const highlightNavOnScroll = () => {
    const scrollY = window.pageYOffset;

    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 100;
      const sectionId = current.getAttribute('id');
      const targetNavLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

      if (targetNavLink) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          targetNavLink.classList.add('active');
        } else {
          targetNavLink.classList.remove('active');
        }
      }
    });
  };

  window.addEventListener('scroll', highlightNavOnScroll);

  /* ==========================================
   * 3. Ripple Effect on Buttons
   * ========================================== */
  const rippleButtons = document.querySelectorAll('.ripple');

  rippleButtons.forEach(button => {
    button.addEventListener('click', function (e) {
      const circle = document.createElement('span');
      const diameter = Math.max(this.clientWidth, this.clientHeight);
      const radius = diameter / 2;

      const rect = this.getBoundingClientRect();
      circle.style.width = circle.style.height = `${diameter}px`;
      circle.style.left = `${e.clientX - rect.left - radius}px`;
      circle.style.top = `${e.clientY - rect.top - radius}px`;
      circle.classList.add('ripple-effect');

      const existingRipple = this.querySelector('.ripple-effect');
      if (existingRipple) {
        existingRipple.remove();
      }

      this.appendChild(circle);
    });
  });

  /* ==========================================
   * 4. Menu Filtering System
   * ========================================== */
  const filterBtns = document.querySelectorAll('.filter-btn');
  const menuCards = document.querySelectorAll('.menu-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      menuCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');

        if (filterValue === 'all' || filterValue === cardCategory) {
          card.style.display = 'block';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.display = 'none';
          }, 300);
        }
      });
    });
  });

  /* ==========================================
   * 5. Image Lightbox Zoom Feature
   * ========================================== */
  const imageModal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const zoomableImages = document.querySelectorAll('.zoomable-img');

  zoomableImages.forEach(img => {
    img.addEventListener('click', (e) => {
      modalImg.src = e.target.src;
      modalImg.alt = e.target.alt;
      imageModal.classList.add('active');
    });
  });

  imageModal.addEventListener('click', () => {
    imageModal.classList.remove('active');
  });

  /* ==========================================
   * 6. Testimonial Slider / Carousel
   * ========================================== */
  const track = document.getElementById('testimonial-track');
  const cards = document.querySelectorAll('.testimonial-card');
  const prevBtn = document.getElementById('prev-slide');
  const nextBtn = document.getElementById('next-slide');
  const dotsContainer = document.getElementById('slider-dots');

  let currentIndex = 0;
  const totalSlides = cards.length;

  cards.forEach((_, idx) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (idx === 0) dot.classList.add('active');
    dot.addEventListener('click', () => goToSlide(idx));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll('.slider-dots .dot');

  const goToSlide = (index) => {
    if (index < 0) index = totalSlides - 1;
    if (index >= totalSlides) index = 0;

    currentIndex = index;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    dots.forEach((dot, idx) => {
      dot.classList.toggle('active', idx === currentIndex);
    });
  };

  prevBtn.addEventListener('click', () => goToSlide(currentIndex - 1));
  nextBtn.addEventListener('click', () => goToSlide(currentIndex + 1));

  let autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);

  const slider = document.getElementById('testimonial-slider');
  slider.addEventListener('mouseenter', () => clearInterval(autoSlide));
  slider.addEventListener('mouseleave', () => {
    autoSlide = setInterval(() => goToSlide(currentIndex + 1), 5000);
  });

  /* ==========================================
   * 7. Scroll Reveal Animations
   * ========================================== */
  const revealElements = document.querySelectorAll('.reveal-up, .reveal-left, .reveal-right');

  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('reveal-active');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15
  });

  revealElements.forEach(el => revealObserver.observe(el));

  /* ==========================================
   * 8. Number Counter Animation
   * ========================================== */
  const statNumbers = document.querySelectorAll('.stat-card__number');
  let animatedStats = false;

  const animateCounters = () => {
    statNumbers.forEach(counter => {
      const target = +counter.getAttribute('data-target');
      const increment = target / 100;

      const updateCount = () => {
        const count = +counter.innerText;
        if (count < target) {
          counter.innerText = Math.ceil(count + increment);
          setTimeout(updateCount, 20);
        } else {
          counter.innerText = target + (target === 49 ? '' : '+');
        }
      };

      updateCount();
    });
  };

  const statsSection = document.querySelector('.about');
  const statsObserver = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !animatedStats) {
      animateCounters();
      animatedStats = true;
    }
  }, { threshold: 0.3 });

  if (statsSection) statsObserver.observe(statsSection);

  /* ==========================================
   * 9. Cursor Floating Sparkle Trail
   * ========================================== */
  const sparkleContainer = document.getElementById('sparkle-container');

  window.addEventListener('mousemove', (e) => {
    if (Math.random() < 0.1) {
      const sparkle = document.createElement('div');
      sparkle.classList.add('cursor-sparkle');
      sparkle.style.left = `${e.clientX}px`;
      sparkle.style.top = `${e.clientY}px`;

      const colors = ['#ff8fa3', '#e2afff', '#ffb703', '#ffffff'];
      sparkle.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

      sparkleContainer.appendChild(sparkle);

      setTimeout(() => {
        sparkle.remove();
      }, 800);
    }
  });

  /* ==========================================
   * 10. Back To Top Button
   * ========================================== */
  const backToTopBtn = document.getElementById('back-to-top');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});