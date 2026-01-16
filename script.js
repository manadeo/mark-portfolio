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
const links = document.querySelectorAll(".nav-links li a");
const logoLink = document.querySelector(".logo").parentElement;

const closeMenu = () => {
  navLinks.classList.remove("active");
  const icon = hamburger.querySelector("i");
  icon.classList.remove("fa-xmark");
  icon.classList.add("fa-bars");
};

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("active");
  const icon = hamburger.querySelector("i");
  if (navLinks.classList.contains("active")) {
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  } else {
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }
});

// Smooth scroll and close menu when a link is clicked
const handleNavLinkClick = (e, link) => {
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
    ".hero-text, .hero-image, .socials, .about-image, .about-text, .project-card, .timeline-item, .contact-content, .projects h1, .about h1, .skills h1, .experience h1, .contact h1, .skills-wrapper"
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
};

// Run initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initAnimations);
} else {
  initAnimations();
}
