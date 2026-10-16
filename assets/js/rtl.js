/**
 * OncoAid - RTL / LTR Direction Switcher
 * Persists user preference via localStorage and toggles dir="rtl" on <html>
 */
(function() {
  'use strict';

  const STORAGE_KEY = 'oncoaid-dir-pref';
  const root = document.documentElement;

  // Initial setup
  const savedDir = localStorage.getItem(STORAGE_KEY) || 'ltr';
  applyDir(savedDir);

  function applyDir(dir) {
    if (dir === 'rtl') {
      root.setAttribute('dir', 'rtl');
    } else {
      root.setAttribute('dir', 'ltr');
    }
    updateDirButtons(dir);
  }

  function updateDirButtons(dir) {
    const dirBtns = document.querySelectorAll('.oa-rtl-toggle');
    dirBtns.forEach(btn => {
      const text = btn.querySelector('.dir-text');
      if (text) {
        text.textContent = dir === 'rtl' ? 'LTR' : 'RTL';
      }
      const label = dir === 'rtl' ? 'Switch to Left-to-Right layout' : 'Switch to Right-to-Left layout';
      btn.setAttribute('aria-label', label);
      btn.setAttribute('title', label);

      const icon = btn.querySelector('i');
      if (icon && !icon.classList.contains('bi-arrow-left-right')) {
        icon.className = 'bi bi-arrow-left-right text-amber';
      }
    });
  }

  window.toggleDirection = function() {
    const currentDir = root.getAttribute('dir') || 'ltr';
    const nextDir = currentDir === 'rtl' ? 'ltr' : 'rtl';
    localStorage.setItem(STORAGE_KEY, nextDir);
    applyDir(nextDir);
  };

  document.addEventListener('DOMContentLoaded', function() {
    const dir = localStorage.getItem(STORAGE_KEY) || 'ltr';
    applyDir(dir);

    const dirBtns = document.querySelectorAll('.oa-rtl-toggle');
    dirBtns.forEach(btn => {
      btn.addEventListener('click', function(e) {
        e.preventDefault();
        window.toggleDirection();
      });
    });
  });
})();
