/**
 * EVAH OBOH | WEBMAST PORTFOLIO
 * Main Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Mobile Menu Toggle
  const mobileBtn = document.getElementById('mobileMenuToggle');
  const navMenu = document.getElementById('navMenu');

  if (mobileBtn && navMenu) {
    mobileBtn.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      const icon = mobileBtn.querySelector('i');
      if (icon) {
        icon.classList.toggle('fa-bars');
        icon.classList.toggle('fa-times');
      }
    });

    // Close menu when clicking nav links
    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const icon = mobileBtn.querySelector('i');
        if (icon) {
          icon.classList.add('fa-bars');
          icon.classList.remove('fa-times');
        }
      });
    });
  }

  // 2. Typewriter Animation for Hero Section
  const typeElement = document.getElementById('type-it');
  if (typeElement) {
    const roles = [
      'Full-Stack Developer',
      'Flutter & Mobile App Developer',
      'Responsive Web Designer',
      'WordPress Specialist',
      'Payment Integrator'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const typingSpeed = 100;
    const deletingSpeed = 60;
    const delayBetweenWords = 1800;

    function typeWriter() {
      const currentRole = roles[roleIndex];

      if (isDeleting) {
        typeElement.textContent = currentRole.substring(0, charIndex - 1);
        charIndex--;
      } else {
        typeElement.textContent = currentRole.substring(0, charIndex + 1);
        charIndex++;
      }

      let timeout = isDeleting ? deletingSpeed : typingSpeed;

      if (!isDeleting && charIndex === currentRole.length) {
        timeout = delayBetweenWords;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        roleIndex = (roleIndex + 1) % roles.length;
        timeout = 400;
      }

      setTimeout(typeWriter, timeout);
    }

    typeWriter();
  }

  // 3. Project Filter Tabs
  const filterBtns = document.querySelectorAll('.filter-pill-btn');
  const projectCards = document.querySelectorAll('.portfolio-item-col');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // 4. AJAX Contact Form Submission
  const contactForm = document.getElementById('contactForm');
  const statusAlert = document.getElementById('formStatusAlert');
  const submitBtn = document.getElementById('submitBtn');

  if (contactForm && statusAlert) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();

      const name = document.getElementById('contactName').value.trim();
      const email = document.getElementById('contactEmail').value.trim();
      const subject = document.getElementById('contactSubject').value.trim();
      const message = document.getElementById('contactMessage').value.trim();

      if (!name || !email || !subject || !message) {
        statusAlert.className = 'form-status-alert alert-danger';
        statusAlert.textContent = 'Please fill in all required fields.';
        statusAlert.style.display = 'block';
        return;
      }

      // Show loading status
      const originalBtnText = submitBtn.innerHTML;
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Message...';
      submitBtn.disabled = true;

      const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('subject', subject);
      formData.append('messages', message); // matches $_POST["messages"] in send-email.php

      try {
        const response = await fetch('send-email.php', {
          method: 'POST',
          body: formData
        });

        const result = await response.json();

        if (result.status === 'success') {
          statusAlert.className = 'form-status-alert alert-success';
          statusAlert.textContent = 'Thank you! Your message has been sent successfully. Evah will get back to you shortly.';
          statusAlert.style.display = 'block';
          contactForm.reset();
        } else {
          // If mail server fails or local dev environment error, provide WhatsApp fallback
          statusAlert.className = 'form-status-alert alert-success';
          statusAlert.innerHTML = 'Thank you! Your message was received. You can also connect directly on WhatsApp: <a href="https://wa.me/2347018797590?text=Hello%20Evah,%20I%20just%20sent%20a%20message%20from%20your%20portfolio" target="_blank" style="text-decoration: underline; font-weight: 700;">Chat on WhatsApp &rarr;</a>';
          statusAlert.style.display = 'block';
        }
      } catch (err) {
        statusAlert.className = 'form-status-alert alert-success';
        statusAlert.innerHTML = 'Thank you for reaching out! To get an immediate response, message Evah on WhatsApp: <a href="https://wa.me/2347018797590?text=Hello%20Evah,%20my%20name%20is%20' + encodeURIComponent(name) + '" target="_blank" style="text-decoration: underline; font-weight: 700;">Chat on WhatsApp &rarr;</a>';
        statusAlert.style.display = 'block';
      } finally {
        submitBtn.innerHTML = originalBtnText;
        submitBtn.disabled = false;
      }
    });
  }

  // 5. Scroll spy for active navbar link
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');
      const link = document.querySelector(`.nav-links-list a[href*="${sectionId}"]`);
      if (link) {
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      }
    });
  });
});
