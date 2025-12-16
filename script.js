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

// EmailJS Configuration
(function() {
  // Initialize EmailJS with your public key
  emailjs.init("JnjMCI-wRCWYbHwhp"); // EmailJS public key
})();

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contact-form');
  const formStatus = document.getElementById('form-status');
  
  if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      const submitBtn = contactForm.querySelector('.send-btn');
      const originalBtnText = submitBtn.textContent;
      submitBtn.textContent = 'Sending...';
      submitBtn.disabled = true;
      formStatus.textContent = '';
      
      // Send email using EmailJS
      emailjs.sendForm(
        'service_qmsyxcv',    // EmailJS service ID
        'template_yxzqzg3',   // EmailJS template ID
        contactForm
      )
      .then(function(response) {
        console.log('SUCCESS!', response.status, response.text);
        
        // Show success message
        formStatus.textContent = '✓ Message sent successfully! I\'ll get back to you soon.';
        formStatus.style.color = '#10b981';
        formStatus.style.display = 'block';
        
        // Reset form
        contactForm.reset();
        
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
        
        // Hide success message after 5 seconds
        setTimeout(() => {
          formStatus.style.display = 'none';
        }, 5000);
      })
      .catch(function(error) {
        console.log('FAILED...', error);
        
        // Show error message
        formStatus.textContent = '✗ Failed to send message. Please try again or email me directly.';
        formStatus.style.color = '#ef4444';
        formStatus.style.display = 'block';
        
        // Reset button
        submitBtn.textContent = originalBtnText;
        submitBtn.disabled = false;
      });
    });
  }
});
