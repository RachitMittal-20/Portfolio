// Navbar scroll effect
window.addEventListener('scroll', function() {
  const navbar = document.getElementById('navbar');
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile menu toggle
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.querySelector('.hamburger');
  const navRight = document.querySelector('.right');
  const navLinks = document.querySelectorAll('.right a');
  
  // Toggle menu
  hamburger.addEventListener('click', function() {
    hamburger.classList.toggle('active');
    navRight.classList.toggle('active');
  });
  
  // Close menu when clicking on a link
  navLinks.forEach(link => {
    link.addEventListener('click', function() {
      hamburger.classList.remove('active');
      navRight.classList.remove('active');
    });
  });
  
  // Close menu when clicking outside
  document.addEventListener('click', function(event) {
    if (!hamburger.contains(event.target) && !navRight.contains(event.target)) {
      hamburger.classList.remove('active');
      navRight.classList.remove('active');
    }
  });
});

// Active section highlighting
document.addEventListener('DOMContentLoaded', function() {
  const sections = document.querySelectorAll('section, div[id]');
  const navLinks = document.querySelectorAll('#navbar a');

  // Add smooth scroll behavior to nav links
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Highlight active section in navbar
  function highlightNavigation() {
    let currentSection = '';
    
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= (sectionTop - sectionHeight/3)) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  // Call on scroll and load
  window.addEventListener('scroll', highlightNavigation);
  window.addEventListener('load', highlightNavigation);
});
