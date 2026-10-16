/**
 * OncoAid - Treatment Schedule & Calendar Filter (Frontend Demo)
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const filterBtns = document.querySelectorAll('.oa-schedule-filter-btn');
  const scheduleCards = document.querySelectorAll('.oa-schedule-card');

  if (filterBtns.length > 0) {
    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        filterBtns.forEach(b => b.classList.remove('active', 'btn-primary'));
        filterBtns.forEach(b => b.classList.add('btn-outline-brand'));

        this.classList.add('active', 'btn-primary');
        this.classList.remove('btn-outline-brand');

        const filter = this.getAttribute('data-filter');

        scheduleCards.forEach(card => {
          const status = card.getAttribute('data-status');
          if (filter === 'all' || status === filter) {
            card.style.display = 'flex';
          } else {
            card.style.display = 'none';
          }
        });
      });
    });
  }
});
