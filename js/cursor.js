/**
 * Custom Cursor Logic
 * Injects and manages a two-part custom cursor:
 * 1. A precision dot (follows mouse exactly)
 * 2. A smooth outer circle (follows with lag)
 */
(function() {
  // Only enable on non-touch devices
  if (window.matchMedia('(pointer: coarse)').matches) return;

  // Create cursor element (precision dot)
  const dot = document.createElement('div');
  dot.className = 'custom-cursor-dot';
  
  document.body.appendChild(dot);

  let mouseX = 0;
  let mouseY = 0;
  let dotX = 0;
  let dotY = 0;

  // Track mouse position
  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  // Smooth animation loop
  function animate() {
    // Inner dot follows with smooth lag
    let dotDistX = mouseX - dotX;
    let dotDistY = mouseY - dotY;
    dotX += dotDistX * 0.25;
    dotY += dotDistY * 0.25;
    dot.style.transform = `translate3d(${dotX}px, ${dotY}px, 0)`;

    requestAnimationFrame(animate);
  }
  animate();

  // Handle hover states
  const interactives = 'a, button, .btn, .service-row, .diag-item, .faq-q, .service-teaser-card, .method-card, [role="button"]';
  
  function handleMouseEnter() {
    dot.classList.add('hover');
  }
  
  function handleMouseLeave() {
    dot.classList.remove('hover');
  }

  // Use event delegation for dynamic elements if needed, 
  // but for this site static attachment is fine.
  function attachListeners() {
    const elements = document.querySelectorAll(interactives);
    elements.forEach(el => {
      el.addEventListener('mouseenter', handleMouseEnter);
      el.addEventListener('mouseleave', handleMouseLeave);
      
      // Hide cursor when it leaves the window
      document.addEventListener('mouseleave', () => {
        dot.style.opacity = '0';
      });
      document.addEventListener('mouseenter', () => {
        dot.style.opacity = '1';
      });
    });
  }

  attachListeners();
  
  // Re-attach on scroll or dynamic changes if necessary
  // (Simple implementation for now)
  
  // Click effect
  window.addEventListener('mousedown', () => {
    dot.classList.add('active');
  });
  window.addEventListener('mouseup', () => {
    dot.classList.remove('active');
  });

})();
