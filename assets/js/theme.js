/**
 * OncoAid - Theme Switcher (Light / Dark "Calm Evening Care")
 * Uses localStorage and updates document element data attributes
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'oncoaid-theme-pref';
  const root = document.documentElement;

  // Initialize theme immediately to prevent FOUC
  const savedTheme = localStorage.getItem(STORAGE_KEY) || 'light';
  applyTheme(savedTheme);

  function applyTheme(theme) {
    if (theme === 'dark') {
      root.setAttribute('data-theme', 'dark');
      document.body && document.body.classList.add('dark-mode');
    } else {
      root.removeAttribute('data-theme');
      document.body && document.body.classList.remove('dark-mode');
    }
    updateToggleButtons(theme);
  }

  function updateToggleButtons(theme) {
    const toggleBtns = document.querySelectorAll('.oa-theme-toggle');
    toggleBtns.forEach(btn => {
      const icon = btn.querySelector('i');
      const text = btn.querySelector('.theme-text');
      if (theme === 'dark') {
        if (icon) icon.className = 'bi bi-sun-fill text-amber';
        if (text) text.textContent = 'Day Mode';
        btn.setAttribute('aria-label', 'Switch to Day Mode');
        btn.setAttribute('title', 'Switch to Day Mode');
      } else {
        if (icon) icon.className = 'bi bi-moon-stars-fill text-amber';
        if (text) text.textContent = 'Evening Care';
        btn.setAttribute('aria-label', 'Switch to Calm Evening Care (Dark Mode)');
        btn.setAttribute('title', 'Switch to Calm Evening Care (Dark Mode)');
      }
    });
  }

  window.toggleTheme = function() {
    const currentTheme = root.getAttribute('data-theme') === 'dark' ? 'dark' : 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    localStorage.setItem(STORAGE_KEY, nextTheme);
    applyTheme(nextTheme);
  };

  document.addEventListener('DOMContentLoaded', function() {
    const theme = localStorage.getItem(STORAGE_KEY) || 'light';
    applyTheme(theme);

    const toggleBtns = document.querySelectorAll('.oa-theme-toggle');
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.toggleTheme();
      });
    });
  });
})();
