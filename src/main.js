import './style.css'

// Simple smooth scrolling for navigation links
document.addEventListener('DOMContentLoaded', function() {
  // Get all navigation links
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  // Add smooth scrolling behavior
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      
      // Only handle internal links (starting with #)
      if (href.startsWith('#')) {
        e.preventDefault();
        const targetElement = document.querySelector(href);
        
        if (targetElement) {
          targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      }
    });
  });

  // Add click handlers for CTA buttons
  const ctaButtons = document.querySelectorAll('.btn-primary');
  
  ctaButtons.forEach(button => {
    button.addEventListener('click', function() {
      // You can add your CTA logic here
      console.log('Get Started clicked');
      // For now, just scroll to features section
      const featuresSection = document.querySelector('.features');
      if (featuresSection) {
        featuresSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  // Add scroll effect for header background
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    
    if (window.scrollY > 50) {
      header.style.background = 'rgba(0, 0, 0, 0.95)';
    } else {
      header.style.background = 'rgba(0, 0, 0, 0.8)';
    }
  });
});