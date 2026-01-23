// Force scroll to top on refresh
if (history.scrollRestoration) {
  history.scrollRestoration = 'manual';
} else {
  window.onbeforeunload = function () {
    window.scrollTo(0, 0);
  }
}
window.onload = function () {
  window.scrollTo(0, 0);
}

const skillsContainer = document.getElementById("skillsContainer");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

// Arrow button events
nextBtn.addEventListener("click", () => {
  const skillCard = document.querySelector(".skill-card");
  const gap = parseInt(getComputedStyle(skillsContainer).gap) || 0;
  const isMobile = window.innerWidth <= 768;
  const scrollCount = isMobile ? 1 : 3;
  const scrollAmount = (skillCard.offsetWidth + gap) * scrollCount;

  skillsContainer.scrollBy({
    left: scrollAmount,
    behavior: "smooth"
  });
});

prevBtn.addEventListener("click", () => {
  const skillCard = document.querySelector(".skill-card");
  const gap = parseInt(getComputedStyle(skillsContainer).gap) || 0;
  const isMobile = window.innerWidth <= 768;
  const scrollCount = isMobile ? 1 : 3;
  const scrollAmount = (skillCard.offsetWidth + gap) * scrollCount;

  skillsContainer.scrollBy({
    left: -scrollAmount,
    behavior: "smooth"
  });
});

// Sticky Navbar
const nav = document.querySelector("nav");
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("sticky");
  } else {
    nav.classList.remove("sticky");
  }
});

// Hamburger Menu
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const links = document.querySelectorAll(".nav-links a");
const logoLink = document.querySelector(".logo").parentElement;

const closeMenu = () => {
  navLinks.classList.remove("active");
  hamburger.classList.remove("active");

  // Close any open mobile dropdowns
  document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
};

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  hamburger.classList.toggle("active");

  if (!navLinks.classList.contains("active")) {
    document.querySelectorAll('.dropdown').forEach(d => d.classList.remove('active'));
  }
});

// Mobile Dropdown Toggle
const dropdownTrigger = document.querySelector(".dropdown-trigger");
dropdownTrigger.addEventListener("click", (e) => {
  if (window.innerWidth <= 768) {
    e.preventDefault();
    dropdownTrigger.parentElement.classList.toggle("active");
  }
});

// Close menu on resize if switching to desktop
window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    closeMenu();
  }
});

// Smooth scroll and close menu when a link is clicked
const handleNavLinkClick = (e, link) => {
  const isMobile = window.innerWidth <= 768;
  const isDropdownTrigger = link.classList.contains("dropdown-trigger");

  if (isMobile && isDropdownTrigger) return;

  e.preventDefault();
  const targetId = link.getAttribute("href");
  if (!targetId || targetId === "#") return;

  const targetElement = document.querySelector(targetId);
  if (targetElement) {
    const navHeight = nav.offsetHeight;
    const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navHeight;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth"
    });
  }
  closeMenu();
};

links.forEach(link => {
  link.addEventListener("click", (e) => handleNavLinkClick(e, link));
});

logoLink.addEventListener("click", (e) => handleNavLinkClick(e, logoLink));


// Scroll Animations (Intersection Observer)
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px"
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, observerOptions);

// Initialize animations
const initAnimations = () => {
  const elementsToAnimate = document.querySelectorAll(
    ".hero-text, .hero-image, .hero-buttons, .socials, .about-image, .about-text, .project-card, .timeline-item, .contact-content, .projects h1, .about h1, .skills h1, .experience h1, .certificates h1, .contact h1, .skills-wrapper, .cert-card, .projects-footer"
  );

  elementsToAnimate.forEach((el) => {
    el.classList.add("hidden");
    observer.observe(el);
  });

  // Stagger delays
  const projectCards = document.querySelectorAll('.project-card');
  projectCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 100}ms`;
  });

  const timelineItems = document.querySelectorAll('.timeline-item');
  timelineItems.forEach((item, index) => {
    item.style.transitionDelay = `${index * 200}ms`;
  });

  const certCards = document.querySelectorAll('.cert-card');
  certCards.forEach((card, index) => {
    card.style.transitionDelay = `${index * 150}ms`;
  });
};

// Typing Effect
const roleElement = document.querySelector(".role");
const roles = ["Aspiring Software Engineer", "Freelance Software Developer", "Freelance Web Developer"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 100;

const typeEffect = () => {
  if (!roleElement) return;

  const currentRole = roles[roleIndex];

  if (isDeleting) {
    roleElement.textContent = currentRole.substring(0, charIndex--);
    typeSpeed = 25; // Fast delete
  } else {
    roleElement.textContent = currentRole.substring(0, charIndex++);
    typeSpeed = 25;
  }

  if (!isDeleting && charIndex === currentRole.length + 1) {
    isDeleting = true;
    typeSpeed = 2000; // Pause at end
    charIndex = currentRole.length - 1; // Force visual delete on next frame
  } else if (isDeleting && charIndex === -1) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
    typeSpeed = 200; // Pause before typing next
    charIndex = 0;
  }

  setTimeout(typeEffect, typeSpeed);
};

// View All Projects button handler
const viewAllProjectsBtn = document.getElementById('viewAllProjectsBtn');
if (viewAllProjectsBtn) {
  viewAllProjectsBtn.addEventListener('click', (e) => {
    e.preventDefault();

    // Add fade-out animation to body
    document.body.style.transition = 'opacity 0.5s ease';
    document.body.style.opacity = '0';

    // Navigate after animation completes
    setTimeout(() => {
      window.location.href = 'all-projects.html';
    }, 500);
  });
}

// Run initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => {
    initAnimations();
    typeEffect();
  });
} else {
  initAnimations();
  typeEffect();
}