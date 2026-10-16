/**
 * OncoAid - Medication Reminders Management (Frontend Demo CRUD)
 * Allows users to add, edit, mark as taken, and delete reminders.
 * Sample demo data stored in localStorage for persistence.
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const STORAGE_KEY = 'oncoaid_demo_medications';
  const medContainer = document.getElementById('oaMedicationList');
  const addMedForm = document.getElementById('oaAddMedForm');
  const addMedModalEl = document.getElementById('oaAddMedModal');

  // Initial Sample Reminders
  const defaultReminders = [
    {
      id: 'med-1',
      name: 'Anti-Nausea Support (Sample A)',
      time: '08:00 AM',
      frequency: 'Daily with breakfast',
      status: 'Active',
      taken: false,
      notes: 'Take with warm water before meals'
    },
    {
      id: 'med-2',
      name: 'Hydration Electrolyte Formula',
      time: '01:30 PM',
      frequency: 'Twice daily',
      status: 'Active',
      taken: true,
      notes: 'Stay hydrated throughout the afternoon'
    },
    {
      id: 'med-3',
      name: 'Gentle Rest & Recovery Capsule (Sample B)',
      time: '08:00 PM',
      frequency: 'Every evening',
      status: 'Active',
      taken: false,
      notes: 'Recommended 30 minutes before sleep'
    }
  ];

  function getMedications() {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : defaultReminders;
  }

  function saveMedications(meds) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(meds));
    renderMedications();
  }

  function renderMedications() {
    if (!medContainer) return;
    const meds = getMedications();

    if (meds.length === 0) {
      medContainer.innerHTML = `
        <div class="text-center py-5">
          <i class="bi bi-capsule text-soft" style="font-size: 2.5rem;"></i>
          <h5 class="mt-3">No active reminders found</h5>
          <p class="text-muted">Click "+ Add New Reminder" above to set a supportive reminder.</p>
        </div>
      `;
      return;
    }

    medContainer.innerHTML = meds.map(item => `
      <div class="oa-med-item ${item.taken ? 'taken' : ''}" id="${item.id}">
        <div class="d-flex align-items-center gap-3">
          <div class="form-check m-0">
            <input class="form-check-input oa-med-check" type="checkbox" ${item.taken ? 'checked' : ''} data-id="${item.id}" id="check-${item.id}">
          </div>
          <div>
            <div class="d-flex align-items-center gap-2">
              <h5 class="oa-med-name mb-0 font-weight-bold ${item.taken ? 'text-decoration-line-through' : ''}">${escapeHTML(item.name)}</h5>
              <span class="oa-badge ${item.taken ? 'oa-badge-cocoa' : 'oa-badge-amber'} oa-badge-pill">
                ${item.taken ? '<i class="bi bi-check2"></i> Taken' : '<i class="bi bi-clock"></i> Active'}
              </span>
            </div>
            <div class="text-muted small mt-1 d-flex flex-wrap gap-3">
              <span><i class="bi bi-alarm me-1 text-amber"></i>${escapeHTML(item.time)}</span>
              <span><i class="bi bi-repeat me-1 text-amber"></i>${escapeHTML(item.frequency)}</span>
              ${item.notes ? `<span><i class="bi bi-info-circle me-1"></i>${escapeHTML(item.notes)}</span>` : ''}
            </div>
          </div>
        </div>

        <div class="oa-med-actions d-flex gap-2">
          <button class="btn btn-sm btn-outline-brand oa-med-toggle-btn" data-id="${item.id}">
            ${item.taken ? 'Undo' : 'Mark Taken'}
          </button>
          <button class="btn btn-sm btn-outline-secondary oa-med-del-btn text-danger border-danger" data-id="${item.id}" title="Remove reminder">
            <i class="bi bi-trash"></i>
          </button>
        </div>
      </div>
    `).join('');

    attachListeners();
  }

  function attachListeners() {
    // Checkbox and mark taken toggle
    document.querySelectorAll('.oa-med-check, .oa-med-toggle-btn').forEach(elem => {
      elem.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        const meds = getMedications();
        const target = meds.find(m => m.id === id);
        if (target) {
          target.taken = !target.taken;
          saveMedications(meds);
        }
      });
    });

    // Delete button
    document.querySelectorAll('.oa-med-del-btn').forEach(btn => {
      btn.addEventListener('click', function () {
        const id = this.getAttribute('data-id');
        if (confirm('Are you sure you want to remove this demo medication reminder?')) {
          let meds = getMedications();
          meds = meds.filter(m => m.id !== id);
          saveMedications(meds);
        }
      });
    });
  }

  // Handle Add Reminder Form
  if (addMedForm) {
    addMedForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const name = document.getElementById('medName')?.value.trim();
      const time = document.getElementById('medTime')?.value;
      const frequency = document.getElementById('medFreq')?.value;
      const notes = document.getElementById('medNotes')?.value.trim();

      if (!name || !time) return;

      const newMed = {
        id: 'med-' + Date.now(),
        name: name,
        time: time,
        frequency: frequency || 'Once daily',
        status: 'Active',
        taken: false,
        notes: notes || ''
      };

      const meds = getMedications();
      meds.unshift(newMed);
      saveMedications(meds);

      // Close modal
      if (addMedModalEl && window.bootstrap) {
        const modal = bootstrap.Modal.getInstance(addMedModalEl);
        if (modal) modal.hide();
      }

      addMedForm.reset();
    });
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }

  // Initial render
  renderMedications();
});
