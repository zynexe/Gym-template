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

  // Navbar hide/show on scroll functionality
  function setupNavbarScrollBehavior() {
    const header = document.querySelector('.header');
    if (!header) return;
    
    let lastScrollY = window.scrollY;
    let isScrollingDown = false;
    let scrollTimeout;
    
    function handleNavbarScroll() {
      const currentScrollY = window.scrollY;
      const scrollDifference = Math.abs(currentScrollY - lastScrollY);
      
      // Only trigger if scroll difference is significant (avoid micro-scrolls)
      if (scrollDifference > 10) {
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past 100px - hide navbar
          if (!isScrollingDown) {
            isScrollingDown = true;
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease-in-out';
          }
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up - show navbar
          if (isScrollingDown) {
            isScrollingDown = false;
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s ease-in-out';
          }
        }
        
        // Always show navbar at the very top
        if (currentScrollY <= 50) {
          isScrollingDown = false;
          header.style.transform = 'translateY(0)';
        }
        
        lastScrollY = currentScrollY;
      }
    }
    
    // Throttled scroll event for better performance
    window.addEventListener('scroll', function() {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(handleNavbarScroll, 10);
    });
    
    // Also handle wheel events for immediate response
    window.addEventListener('wheel', function(e) {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY > 100) {
        if (e.deltaY > 0) {
          // Scrolling down - hide navbar
          if (!isScrollingDown) {
            isScrollingDown = true;
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease-in-out';
          }
        } else {
          // Scrolling up - show navbar
          if (isScrollingDown) {
            isScrollingDown = false;
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s ease-in-out';
          }
        }
      }
    });
    
    // Touch events for mobile
    let touchStartY = 0;
    let touchLastY = 0;
    
    window.addEventListener('touchstart', function(e) {
      touchStartY = e.touches[0].clientY;
      touchLastY = touchStartY;
    });
    
    window.addEventListener('touchmove', function(e) {
      const currentTouchY = e.touches[0].clientY;
      const touchDiff = touchLastY - currentTouchY;
      const currentScrollY = window.scrollY;
      
      if (Math.abs(touchDiff) > 5 && currentScrollY > 100) {
        if (touchDiff > 0) {
          // Swiping up (scrolling down) - hide navbar
          if (!isScrollingDown) {
            isScrollingDown = true;
            header.style.transform = 'translateY(-100%)';
            header.style.transition = 'transform 0.3s ease-in-out';
          }
        } else {
          // Swiping down (scrolling up) - show navbar
          if (isScrollingDown) {
            isScrollingDown = false;
            header.style.transform = 'translateY(0)';
            header.style.transition = 'transform 0.3s ease-in-out';
          }
        }
      }
      
      touchLastY = currentTouchY;
    });
    
    // Show navbar when hovering near top of screen
    window.addEventListener('mousemove', function(e) {
      if (e.clientY <= 80 && window.scrollY > 100) {
        if (isScrollingDown) {
          isScrollingDown = false;
          header.style.transform = 'translateY(0)';
          header.style.transition = 'transform 0.3s ease-in-out';
        }
      }
    });
  }

  // Enhanced scroll effect for header background with better transitions
  window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    const servicesSection = document.querySelector('#services');
    
    if (servicesSection && header) {
      const servicesTop = servicesSection.offsetTop;
      const scrollPosition = window.scrollY;
      
      // Change header style based on section with smoother transitions
      if (scrollPosition >= servicesTop - 100) {
        header.style.background = 'rgba(255, 255, 255, 0.68)';
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

  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileNavClose = document.querySelector('.mobile-nav-close');
  const mobileNav = document.querySelector('.mobile-nav');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
  
  if (mobileNavToggle && mobileNav && mobileNavClose) {
    mobileNavToggle.addEventListener('click', function() {
      mobileNav.classList.add('active');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when menu is open
    });
    
    mobileNavClose.addEventListener('click', function() {
      mobileNav.classList.remove('active');
      document.body.style.overflow = ''; // Re-enable scrolling
    });
    
    // Close mobile nav when clicking on a link
    mobileNavLinks.forEach(link => {
      link.addEventListener('click', function() {
        mobileNav.classList.remove('active');
        document.body.style.overflow = '';
      });
    });
  }
  
  // Helper functions with better performance
  function getCurrentSection() {
    const sections = document.querySelectorAll('section');
    const footer = document.querySelector('footer');
    const scrollPosition = window.scrollY + (window.innerHeight / 2);
    
    // Check sections first
    for (let section of sections) {
      const sectionTop = section.offsetTop;
      const sectionBottom = sectionTop + section.offsetHeight;
      
      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        return section;
      }
    }
    
    // Check if we're in the footer
    if (footer) {
      const footerTop = footer.offsetTop;
      const footerBottom = footerTop + footer.offsetHeight;
      
      if (scrollPosition >= footerTop && scrollPosition < footerBottom) {
        return footer;
      }
    }
    
    // Default to first section if nothing is found
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
  
  // Setup animations with Intersection Observer
  function setupAnimations() {
    // Hero section elements
    const heroElements = [
      document.querySelector('.hero-title'),
      document.querySelector('.hero-description'),
      document.querySelector('.hero-cta')
    ];
    
    // Service section elements
    const serviceCards = document.querySelectorAll('.service-card');
    const servicesTitle = document.querySelector('.services-title');
    
    // Add initial hidden classes
    heroElements.forEach(el => {
      if (el) el.classList.add('hidden-left');
    });
    
    if (servicesTitle) servicesTitle.classList.add('hidden-top');
    
    serviceCards.forEach(card => {
      card.classList.add('hidden-top');
    });
    
    // Create observer for hero section
    const heroObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        // Only run animation when element enters viewport
        if (entry.isIntersecting) {
          const heroSection = entry.target;
          
          // Find elements within this hero section
          const title = heroSection.querySelector('.hero-title');
          const description = heroSection.querySelector('.hero-description');
          const cta = heroSection.querySelector('.hero-cta');
          
          // Animate with staggering
          if (title) {
            title.classList.remove('hidden-left');
            title.classList.add('animate-left', 'stagger-1');
          }
          
          if (description) {
            description.classList.remove('hidden-left');
            description.classList.add('animate-left', 'stagger-2');
          }
          
          if (cta) {
            cta.classList.remove('hidden-left');
            cta.classList.add('animate-left', 'stagger-3');
          }
        } else {
          // When hero exits viewport, reset animations
          const heroSection = entry.target;
          
          const title = heroSection.querySelector('.hero-title');
          const description = heroSection.querySelector('.hero-description');
          const cta = heroSection.querySelector('.hero-cta');
          
          if (title) {
            title.classList.remove('animate-left', 'stagger-1');
            title.classList.add('hidden-left');
          }
          
          if (description) {
            description.classList.remove('animate-left', 'stagger-2');
            description.classList.add('hidden-left');
          }
          
          if (cta) {
            cta.classList.remove('animate-left', 'stagger-3');
            cta.classList.add('hidden-left');
          }
        }
      });
    }, { threshold: 0.15 });
    
    // Create observer for services section
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const servicesSection = entry.target;
          
          // Animate services title
          const title = servicesSection.querySelector('.services-title');
          if (title) {
            title.classList.remove('hidden-top');
            title.classList.add('animate-top', 'stagger-1');
          }
          
          // Animate service cards with staggered delay
          const cards = servicesSection.querySelectorAll('.service-card');
          cards.forEach((card, index) => {
            setTimeout(() => {
              card.classList.remove('hidden-top');
              card.classList.add('animate-top');
            }, 200 + (index * 150)); // Stagger each card by 150ms
          });
        } else {
          // Reset services animations when out of viewport
          const servicesSection = entry.target;
          
          const title = servicesSection.querySelector('.services-title');
          if (title) {
            title.classList.remove('animate-top', 'stagger-1');
            title.classList.add('hidden-top');
          }
          
          const cards = servicesSection.querySelectorAll('.service-card');
          cards.forEach(card => {
            card.classList.remove('animate-top');
            card.classList.add('hidden-top');
          });
        }
      });
    }, { threshold: 0.15 });
    
    // Start observing sections
    const heroSection = document.querySelector('.hero');
    const servicesSection = document.querySelector('.services-section');
    
    if (heroSection) heroObserver.observe(heroSection);
    if (servicesSection) servicesObserver.observe(servicesSection);
  }
  
  // Call setup animations after DOM is loaded
  setupAnimations();

  // Classes Carousel Functionality
  function setupClassesCarousel() {
    const carousel = document.querySelector('.classes-carousel');
    const classItems = document.querySelectorAll('.class-item');
    const classInfos = document.querySelectorAll('.class-info');
    const prevButton = document.querySelector('.prev-arrow');
    const nextButton = document.querySelector('.next-arrow');
    
    if (!carousel || classItems.length === 0) return;
    
    let currentIndex = 0;
    const totalItems = classItems.length;
    
    // Touch/Swipe variables
    let startX = 0;
    let endX = 0;
    let isDragging = false;
    
    function updateCarousel() {
      // Remove active class from all items
      classItems.forEach(item => item.classList.remove('active'));
      classInfos.forEach(info => info.classList.remove('active'));
      
      // Add active class to current item
      classItems[currentIndex].classList.add('active');
      classInfos[currentIndex].classList.add('active');
      
      // Get current viewport width for responsive calculations
      const viewportWidth = window.innerWidth;
      let itemWidth, gap, moveDistance;
      
      if (viewportWidth <= 480) {
        // Small mobile
        itemWidth = 100;
        gap = 8; // 0.5rem
        moveDistance = (itemWidth + gap) * currentIndex;
      } else if (viewportWidth <= 768) {
        // Mobile/tablet
        itemWidth = 180;
        gap = 16; // 1rem
        moveDistance = (itemWidth + gap) * currentIndex;
      } else {
        // Desktop
        itemWidth = 400;
        gap = 32; // 2rem
        moveDistance = (itemWidth + gap) * currentIndex;
      }
      
      carousel.style.transform = `translateX(-${moveDistance}px)`;
    }

    function nextSlide() {
      currentIndex = (currentIndex + 1) % totalItems;
      updateCarousel();
    }
    
    function prevSlide() {
      currentIndex = (currentIndex - 1 + totalItems) % totalItems;
      updateCarousel();
    }
    
    // Arrow navigation (desktop only)
    if (nextButton && prevButton) {
      nextButton.addEventListener('click', nextSlide);
      prevButton.addEventListener('click', prevSlide);
    }
    
    // Touch/Mouse events for swiping
    function handleStart(e) {
      isDragging = true;
      startX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
      carousel.style.transition = 'none';
    }
    
    function handleMove(e) {
      if (!isDragging) return;
      e.preventDefault();
      endX = e.type.includes('mouse') ? e.clientX : e.touches[0].clientX;
    }
    
    function handleEnd() {
      if (!isDragging) return;
      isDragging = false;
      carousel.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
      
      const threshold = 50;
      const diff = startX - endX;
      
      if (Math.abs(diff) > threshold) {
        if (diff > 0) {
          nextSlide();
        } else {
          prevSlide();
        }
      }
      
      startX = 0;
      endX = 0;
    }
    
    // Mouse events
    carousel.addEventListener('mousedown', handleStart);
    carousel.addEventListener('mousemove', handleMove);
    carousel.addEventListener('mouseup', handleEnd);
    carousel.addEventListener('mouseleave', handleEnd);
    
    // Touch events
    carousel.addEventListener('touchstart', handleStart, { passive: false });
    carousel.addEventListener('touchmove', handleMove, { passive: false });
    carousel.addEventListener('touchend', handleEnd);
    
    // Click on items to navigate
    classItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        if (index !== currentIndex) {
          currentIndex = index;
          updateCarousel();
        }
      });
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
      const classesSection = document.querySelector('.classes-section');
      const rect = classesSection.getBoundingClientRect();
      const isInView = rect.top >= 0 && rect.bottom <= window.innerHeight;
      
      if (isInView) {
        if (e.key === 'ArrowLeft') {
          e.preventDefault();
          prevSlide();
        } else if (e.key === 'ArrowRight') {
          e.preventDefault();
          nextSlide();
        }
      }
    });
    
    
    // Initialize carousel
    updateCarousel();
    
    // Auto-play (optional - uncomment if needed)
    // setInterval(nextSlide, 5000);
  }
  
  // Call setup functions
  setupAnimations();
  setupClassesCarousel();
  setupNavbarScrollBehavior(); // Add this line

});