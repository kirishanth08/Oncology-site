/**
 * OncoAid - Main JavaScript
 * Handles sticky navigation, back-to-top, active states, and mobile menu
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Sticky Navbar Enhancement on Scroll
  const navbar = document.querySelector('.oa-navbar-wrapper');
  if (navbar) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 40) {
        navbar.classList.add('shadow-sm');
      } else {
        navbar.classList.remove('shadow-sm');
      }
    });
  }

  // 2. Back to Top Button
  const backToTopBtn = document.querySelector('.oa-back-to-top');
  if (backToTopBtn) {
    window.addEventListener('scroll', function () {
      if (window.scrollY > 300) {
        backToTopBtn.classList.add('show');
      } else {
        backToTopBtn.classList.remove('show');
      }
    });

    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // 3. Highlight Current Active Nav Link
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.oa-navbar .nav-link, .oa-dash-nav-link');
  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href && (href === currentPath || (currentPath === '' && href === 'index.html'))) {
      link.classList.add('active');
    }
  });

  // 4. Mobile Menu Close on Nav-item Click
  const mobileCollapse = document.getElementById('oncoaidNavbar');
  if (mobileCollapse && window.bootstrap) {
    const navItems = mobileCollapse.querySelectorAll('.nav-link:not(.dropdown-toggle)');
    navItems.forEach(item => {
      item.addEventListener('click', () => {
        const bsCollapse = bootstrap.Collapse.getInstance(mobileCollapse);
        if (bsCollapse) {
          bsCollapse.hide();
        }
      });
    });
  }

  // 5. Intelligent Form Validation & Keystroke Filtering
  // Prevents numbers in name/word fields, and letters in phone/number fields
  function setupFormInputGuards() {
    // Helper to check if an input is for names / pure letters
    function isNameField(input) {
      if (input.dataset.oaType === 'name' || input.dataset.type === 'name') return true;
      const id = (input.id || '').toLowerCase();
      const name = (input.name || '').toLowerCase();
      const placeholder = (input.placeholder || '').toLowerCase();
      const label = input.closest('.mb-3, .col-md-6, .col-12, .form-group')?.querySelector('label')?.textContent.toLowerCase() || '';

      const nameTokens = ['fullname', 'patientname', 'firstname', 'lastname', 'first-name', 'last-name', 'your name', 'patient name', 'caregiver', 'doctor name', 'emergency contact name'];
      const combined = `${id} ${name} ${placeholder} ${label}`;
      
      // Exclude username, email, search
      if (combined.includes('username') || combined.includes('email') || combined.includes('search')) return false;
      return nameTokens.some(token => combined.includes(token));
    }

    // Helper to check if an input is for phone / numeric data
    function isPhoneOrNumberField(input) {
      if (input.type === 'tel' || input.type === 'number') return true;
      if (input.dataset.oaType === 'phone' || input.dataset.type === 'phone' || input.dataset.type === 'number') return true;
      const id = (input.id || '').toLowerCase();
      const name = (input.name || '').toLowerCase();
      const placeholder = (input.placeholder || '').toLowerCase();
      const label = input.closest('.mb-3, .col-md-6, .col-12, .form-group')?.querySelector('label')?.textContent.toLowerCase() || '';

      const phoneTokens = ['phone', 'mobile', 'cell', 'telephone', 'tel', 'fax', 'zip', 'postal', 'dosage', 'dose', 'mg'];
      const combined = `${id} ${name} ${placeholder} ${label}`;
      return phoneTokens.some(token => combined.includes(token));
    }

    // Attach listeners to all inputs in forms or standalone inputs
    const allInputs = document.querySelectorAll('input, textarea');
    allInputs.forEach(input => {
      // A. Name & Word Fields: Strictly Letters and Punctuation (NO NUMBERS)
      if (isNameField(input)) {
        input.setAttribute('pattern', "^[A-Za-z\\s.'\\-]+$");
        input.setAttribute('title', 'Please enter letters only (no numbers).');

        // Prevent typing digits
        input.addEventListener('keydown', function (e) {
          if (e.ctrlKey || e.altKey || e.metaKey) return;
          // Block keys 0-9 from main keyboard and numpad
          if ((e.key >= '0' && e.key <= '9') || (e.keyCode >= 96 && e.keyCode <= 105)) {
            e.preventDefault();
            showInputFeedback(input, 'Letters only — numbers are not accepted in name fields.');
          }
        });

        // Clean on paste or input
        input.addEventListener('input', function () {
          if (/[0-9]/.test(this.value)) {
            this.value = this.value.replace(/[0-9]/g, '');
            showInputFeedback(input, 'Numbers removed from name field.');
          }
        });
      }

      // B. Phone & Number Fields: Strictly Digits and Phone Characters (NO LETTERS)
      else if (isPhoneOrNumberField(input)) {
        input.setAttribute('inputmode', 'tel');
        input.setAttribute('pattern', '[0-9+\\s()\\-]{7,20}');
        input.setAttribute('title', 'Please enter a valid phone number (digits only).');

        // Prevent typing alphabetic characters
        input.addEventListener('keydown', function (e) {
          if (e.ctrlKey || e.altKey || e.metaKey) return;
          // Ignore navigation/functional keys
          if (['Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter', 'Escape', 'Home', 'End'].includes(e.key)) {
            return;
          }
          // Allow digits and standard phone formatting (+, -, (, ), space)
          const isPhoneChar = /^[\d+\s()\-]$/.test(e.key);
          if (!isPhoneChar) {
            e.preventDefault();
            showInputFeedback(input, 'Numbers only — letters are not accepted in phone/number fields.');
          }
        });

        // Clean on paste or input
        input.addEventListener('input', function () {
          if (/[a-zA-Z]/.test(this.value)) {
            this.value = this.value.replace(/[a-zA-Z]/g, '');
            showInputFeedback(input, 'Letters removed from phone field.');
          }
        });
      }
    });

    // Subtle inline tooltip helper
    function showInputFeedback(input, message) {
      let badge = input.parentNode.querySelector('.oa-input-toast');
      if (!badge) {
        badge = document.createElement('div');
        badge.className = 'oa-input-toast small text-danger mt-1';
        badge.style.fontSize = '0.78rem';
        badge.style.transition = 'opacity 0.2s ease';
        input.parentNode.appendChild(badge);
      }
      badge.textContent = message;
      badge.style.opacity = '1';
      clearTimeout(badge._timer);
      badge._timer = setTimeout(() => {
        badge.style.opacity = '0';
        setTimeout(() => { if (badge.parentNode) badge.remove(); }, 250);
      }, 2400);
    }

    // Form submit validation safeguard
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
      form.addEventListener('submit', function (e) {
        let hasError = false;
        const inputs = form.querySelectorAll('input');
        inputs.forEach(inp => {
          if (isNameField(inp) && /[0-9]/.test(inp.value)) {
            inp.classList.add('is-invalid');
            showInputFeedback(inp, 'Please remove numbers from your name.');
            hasError = true;
          }
          if (isPhoneOrNumberField(inp) && /[a-zA-Z]/.test(inp.value)) {
            inp.classList.add('is-invalid');
            showInputFeedback(inp, 'Please enter a valid phone number with digits only.');
            hasError = true;
          }
        });
        if (hasError) {
          e.preventDefault();
          e.stopPropagation();
        }
      });
    });
  }

  setupFormInputGuards();
});
