import './style.css'

// Enhanced smooth scrolling with snap effect
document.addEventListener('DOMContentLoaded', function() {
  // Ensure scroll snap is working
  document.documentElement.style.scrollSnapType = 'y mandatory';
  document.body.style.scrollSnapType = 'y mandatory';

  // Service Cards Hover Logic - Using flex-grow approach
  const serviceCards = document.querySelectorAll('.service-card');
  const servicesContainer = document.querySelector('.services-cards');

  // Initialize default state (all cards closed)
  function initializeCards() {
    serviceCards.forEach((card) => {
      card.classList.remove('card-open');
      card.classList.add('card-closed');
      card.style.flex = '1'; // Reset to equal width
      
      // Explicitly hide all subtitles
      const subtitle = card.querySelector('.service-card-subtitle');
      if (subtitle) {
        subtitle.style.opacity = '0';
        subtitle.style.transform = 'translateY(20px)';
      }
    });
  }

  // Set initial state
  initializeCards();

  // Add hover event listeners to each card
  serviceCards.forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
      // Remove all classes first
      serviceCards.forEach(c => {
        c.classList.remove('card-open', 'card-closed');
        c.classList.add('card-closed');
        c.style.flex = '1'; // Set non-hovered cards to flex: 1
        
        // Hide subtitle for non-hovered cards
        const subtitle = c.querySelector('.service-card-subtitle');
        if (subtitle) {
          subtitle.style.opacity = '0';
          subtitle.style.transform = 'translateY(20px)';
        }
      });
      
      // Set the hovered card to open
      card.classList.remove('card-closed');
      card.classList.add('card-open');
      card.style.flex = '2'; // Expand hovered card with flex: 2
      
      // Show subtitle only for hovered card
      const subtitle = card.querySelector('.service-card-subtitle');
      if (subtitle) {
        subtitle.style.opacity = '1';
        subtitle.style.transform = 'translateY(0)';
      }
    });
  });

  // Reset to default state when mouse leaves the container
  servicesContainer.addEventListener('mouseleave', function() {
    initializeCards();
  });

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
      // Check if it's the hero CTA button
      if (this.classList.contains('hero-cta')) {
        // Scroll to services section
        const servicesSection = document.querySelector('#services');
        if (servicesSection) {
          servicesSection.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      } else {
        console.log('Get Started clicked');
      }
    });
  });

  // Enhanced scroll effect for header background with better transitions
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const servicesSection = document.querySelector('#services');
    
    if (servicesSection && header) {
      const servicesTop = servicesSection.offsetTop;
      const scrollPosition = window.scrollY;
      
      // Change header style based on section with smoother transitions
      if (scrollPosition >= servicesTop - 100) {
        header.style.background = 'rgba(255, 255, 255, 0.4)';
        header.style.backdropFilter = 'blur(20px)';
        
        // Change text colors for services section
        const logo = header.querySelector('.logo');
        const navItems = header.querySelectorAll('.nav-menu a');
        const getStartedBtn = header.querySelector('.btn-primary');
        
        if (logo) logo.style.color = '#333';
        navItems.forEach(item => {
          item.style.color = '#333';
        });
        
        // Keep button orange but adjust for visibility
        if (getStartedBtn) {
          getStartedBtn.style.background = '#ff6b35';
          getStartedBtn.style.color = '#fff';
        }
      } else if (scrollPosition > 50) {
        header.style.background = 'rgba(0, 0, 0, 0.1)';
        header.style.backdropFilter = 'blur(20px)';
        
        const logo = header.querySelector('.logo');
        const navItems = header.querySelectorAll('.nav-menu a');
        
        if (logo) logo.style.color = '#fff';
        navItems.forEach(item => {
          item.style.color = '#fff';
        });
      } else {
        header.style.background = 'rgba(0, 0, 0, 0.8)';
        header.style.backdropFilter = 'blur(10px)';
        
        const logo = header.querySelector('.logo');
        const navItems = header.querySelectorAll('.nav-menu a');
        
        if (logo) logo.style.color = '#fff';
        navItems.forEach(item => {
          item.style.color = '#fff';
        });
      }
    }
  });

  // Variables for better scroll control
  let isScrolling = false;
  let scrollDelta = 0;
  let scrollTimeout;

  // Much more sensitive wheel event handler
  window.addEventListener('wheel', function(e) {
    e.preventDefault(); // Prevent default scrolling
    
    // Accumulate scroll delta for more sensitivity
    scrollDelta += e.deltaY;
    
    // Clear existing timeout
    clearTimeout(scrollTimeout);
    
    // Much lower threshold for easier scrolling
    const threshold = 30; // Reduced from 50 to 30
    
    scrollTimeout = setTimeout(function() {
      if (Math.abs(scrollDelta) > threshold && !isScrolling) {
        isScrolling = true;
        
        const currentSection = getCurrentSection();
        
        if (scrollDelta > 0) {
          // Scrolling down
          scrollToNextSection(currentSection);
        } else {
          // Scrolling up
          scrollToPrevSection(currentSection);
        }
        
        // Reset scroll delta
        scrollDelta = 0;
        
        // Allow next scroll after animation
        setTimeout(() => {
          isScrolling = false;
        }, 800); // Reduced from longer timeout
      } else if (Math.abs(scrollDelta) <= threshold) {
        // Reset if below threshold
        scrollDelta = 0;
      }
    }, 50); // Much faster response time
  }, { passive: false });

  // Touch events for mobile
  let touchStartY = 0;
  let touchEndY = 0;

  window.addEventListener('touchstart', function(e) {
    touchStartY = e.touches[0].clientY;
  });

  window.addEventListener('touchend', function(e) {
    touchEndY = e.changedTouches[0].clientY;
    const touchDelta = touchStartY - touchEndY;
    
    // Lower threshold for touch as well
    if (Math.abs(touchDelta) > 30 && !isScrolling) {
      isScrolling = true;
      
      const currentSection = getCurrentSection();
      
      if (touchDelta > 0) {
        // Swiping up (scroll down)
        scrollToNextSection(currentSection);
      } else {
        // Swiping down (scroll up)
        scrollToPrevSection(currentSection);
      }
      
      setTimeout(() => {
        isScrolling = false;
      }, 800);
    }
  });

  // Keyboard navigation for accessibility
  window.addEventListener('keydown', function(e) {
    if (!isScrolling) {
      const currentSection = getCurrentSection();
      
      switch(e.key) {
        case 'ArrowDown':
        case 'PageDown':
        case ' ': // Spacebar
          e.preventDefault();
          isScrolling = true;
          scrollToNextSection(currentSection);
          setTimeout(() => { isScrolling = false; }, 800);
          break;
          
        case 'ArrowUp':
        case 'PageUp':
          e.preventDefault();
          isScrolling = true;
          scrollToPrevSection(currentSection);
          setTimeout(() => { isScrolling = false; }, 800);
          break;
          
        case 'Home':
          e.preventDefault();
          isScrolling = true;
          document.querySelector('#hero').scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          setTimeout(() => { isScrolling = false; }, 800);
          break;
          
        case 'End':
          e.preventDefault();
          isScrolling = true;
          const sections = document.querySelectorAll('section');
          sections[sections.length - 1].scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          setTimeout(() => { isScrolling = false; }, 800);
          break;
      }
    }
  });

  // Helper functions with better performance
  function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const scrollPosition = window.scrollY + (window.innerHeight / 2);
    
    for (let section of sections) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return section;
      }
    }
    return sections[0];
  }

  function scrollToNextSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex < sections.length - 1) {
      const nextSection = sections[currentIndex + 1];
      nextSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }

  function scrollToPrevSection(currentSection) {
    const sections = Array.from(document.querySelectorAll('section'));
    const currentIndex = sections.indexOf(currentSection);
    
    if (currentIndex > 0) {
      const prevSection = sections[currentIndex - 1];
      prevSection.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
});