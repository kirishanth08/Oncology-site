/**
 * OncoAid - Dashboard Controls & Interactive Clinical Modules
 * Provides interactive functionalities for all buttons, modals, downloads, filters, and forms.
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  // 1. Mobile Sidebar Drawer Toggle & Backdrop
  const sidebarToggle = document.getElementById('oaSidebarToggle');
  const sidebar = document.querySelector('.oa-dash-sidebar');

  if (sidebarToggle && sidebar) {
    sidebarToggle.addEventListener('click', function (e) {
      e.stopPropagation();
      sidebar.classList.toggle('show');
      sidebar.classList.toggle('collapsed');
    });

    document.addEventListener('click', function (e) {
      if (window.innerWidth < 992 && sidebar.classList.contains('show')) {
        if (!sidebar.contains(e.target) && e.target !== sidebarToggle) {
          sidebar.classList.remove('show');
          sidebar.classList.add('collapsed');
        }
      }
    });
  }

  // 2. Global Toast Notification System
  function showDashToast(message, type = 'success') {
    let toastContainer = document.getElementById('oaDashToastContainer');
    if (!toastContainer) {
      toastContainer = document.createElement('div');
      toastContainer.id = 'oaDashToastContainer';
      toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
      toastContainer.style.zIndex = '9999';
      document.body.appendChild(toastContainer);
    }

    const toastId = 'toast-' + Date.now();
    const bgClass = type === 'success' ? 'bg-amber text-dark' : (type === 'danger' ? 'bg-danger text-white' : 'bg-dark text-white');
    const iconClass = type === 'success' ? 'bi-check-circle-fill' : (type === 'danger' ? 'bi-exclamation-triangle-fill' : 'bi-info-circle-fill');

    const toastEl = document.createElement('div');
    toastEl.id = toastId;
    toastEl.className = 'toast align-items-center border-0 shadow-lg mb-2 show';
    toastEl.setAttribute('role', 'alert');
    toastEl.setAttribute('aria-live', 'assertive');
    toastEl.setAttribute('aria-atomic', 'true');
    toastEl.innerHTML = `
      <div class="d-flex ${bgClass} rounded-3 p-3 align-items-center">
        <div class="toast-body d-flex align-items-center gap-2 fw-semibold" style="font-size: 0.92rem;">
          <i class="bi ${iconClass} fs-5"></i>
          <span>${escapeHTML(message)}</span>
        </div>
        <button type="button" class="btn-close btn-close-white ms-auto me-2" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    `;

    toastContainer.appendChild(toastEl);
    const bsToast = new bootstrap.Toast(toastEl, { delay: 4000 });
    bsToast.show();

    toastEl.addEventListener('hidden.bs.toast', () => {
      toastEl.remove();
    });
  }
  window.showDashToast = showDashToast;

  // 3. Document Download Simulation using Client-Side Blobs
  window.triggerDocumentDownload = function (docTitle, dateStr, doctor) {
    const fileContent = `=====================================================
ONCOAID CANCER CARE CENTER - CLINICAL RECORD EXPORT
=====================================================
Document: ${docTitle}
Patient: Alex Morgan (MRN: ONC-892401)
DOB: 1982-06-14 | Primary Oncologist: Dr. Maya Carter, MD
Date Issued: ${dateStr || new Date().toLocaleDateString()}
Authorized Clinician: ${doctor || 'OncoAid Multidisciplinary Care Board'}
Status: Verified & Electronically Signed (21 CFR Part 11)

CLINICAL RECAP & SUMMARY:
This document represents an official patient care summary for Alex Morgan
under the active Dose-Dense Paclitaxel/Carboplatin protocol at OncoAid.
All vital parameters, premedication clearances, and supportive care metrics
have been reviewed by your designated oncology team.

For clinical inquiries or direct verification, contact:
OncoAid 24/7 Clinical Triage: (555) 234-ONCO
Patient Portal: https://oncoaid.org/patient-dashboard
=====================================================
End of Document Export.
`;
    const blob = new Blob([fileContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    const safeName = docTitle.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
    link.href = url;
    link.download = `${safeName}_alex_morgan.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    showDashToast(`Downloading: ${docTitle}`, 'success');
  };

  // 4. Clinical Document Preview Modal Handler
  window.openDocumentPreview = function (docTitle, dateStr, doctor, excerpt) {
    let previewModalEl = document.getElementById('oaDocPreviewModal');
    if (!previewModalEl) {
      previewModalEl = document.createElement('div');
      previewModalEl.id = 'oaDocPreviewModal';
      previewModalEl.className = 'modal fade';
      previewModalEl.setAttribute('tabindex', '-1');
      previewModalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content oa-card border-0 p-3 p-md-4">
            <div class="modal-header border-bottom pb-3">
              <div>
                <span class="oa-badge oa-badge-amber mb-1">Electronic Medical Record</span>
                <h5 class="modal-title text-cocoa fw-bold" id="oaDocPreviewTitle">Document Preview</h5>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-4">
              <div class="p-3 rounded-3 mb-3" style="background-color: var(--oa-bg-subtle);">
                <div class="row g-2 small">
                  <div class="col-sm-6"><strong>Patient:</strong> Alex Morgan (MRN: ONC-892401)</div>
                  <div class="col-sm-6"><strong>Date:</strong> <span id="oaDocPreviewDate"></span></div>
                  <div class="col-sm-6"><strong>Clinician:</strong> <span id="oaDocPreviewDoc"></span></div>
                  <div class="col-sm-6"><strong>Format:</strong> Verified Clinical PDF Summary</div>
                </div>
              </div>
              <div class="border rounded-3 p-4" style="min-height: 200px; font-family: monospace; font-size: 0.9rem; line-height: 1.6; background-color: var(--oa-bg-subtle); border-color: var(--oa-border-color) !important; color: var(--oa-text-main);" id="oaDocPreviewContent">
              </div>
            </div>
            <div class="modal-footer border-top pt-3">
              <button type="button" class="btn btn-outline-brand" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" id="oaDocPreviewDownloadBtn">
                <i class="bi bi-download me-1"></i> Download File
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(previewModalEl);
    }

    document.getElementById('oaDocPreviewTitle').textContent = docTitle;
    document.getElementById('oaDocPreviewDate').textContent = dateStr;
    document.getElementById('oaDocPreviewDoc').textContent = doctor;
    document.getElementById('oaDocPreviewContent').textContent = excerpt || `Clinical Summary Report for ${docTitle}. Patient tolerating protocol with good hematologic clearance and no acute adverse events. Full oncology parameters logged.`;

    const downloadBtn = document.getElementById('oaDocPreviewDownloadBtn');
    downloadBtn.onclick = function () {
      window.triggerDocumentDownload(docTitle, dateStr, doctor);
      const bsModal = bootstrap.Modal.getInstance(previewModalEl);
      if (bsModal) bsModal.hide();
    };

    const bsModal = new bootstrap.Modal(previewModalEl);
    bsModal.show();
  };

  // 5. Appointment Details Modal Handler
  window.openAppointmentDetails = function (title, doctor, date, time, location, notes) {
    let apptModalEl = document.getElementById('oaApptDetailModal');
    if (!apptModalEl) {
      apptModalEl = document.createElement('div');
      apptModalEl.id = 'oaApptDetailModal';
      apptModalEl.className = 'modal fade';
      apptModalEl.setAttribute('tabindex', '-1');
      apptModalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content oa-card border-0 p-4">
            <div class="modal-header border-bottom pb-3">
              <div>
                <span class="oa-status-pill oa-status-upcoming mb-1">Confirmed Visit ●</span>
                <h5 class="modal-title text-cocoa fw-bold" id="oaApptTitle">Appointment Details</h5>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-3">
              <div class="d-flex flex-column gap-3">
                <div class="d-flex align-items-center gap-3 p-3 rounded-3" style="background-color: var(--oa-bg-subtle);">
                  <i class="bi bi-person-badge fs-2 text-amber"></i>
                  <div>
                    <h6 class="mb-0 text-cocoa fw-bold" id="oaApptDoctor"></h6>
                    <span class="small text-muted" id="oaApptLocation"></span>
                  </div>
                </div>
                <div class="row g-2 small">
                  <div class="col-6">
                    <span class="text-muted d-block">Scheduled Date:</span>
                    <strong class="text-cocoa" id="oaApptDate"></strong>
                  </div>
                  <div class="col-6">
                    <span class="text-muted d-block">Scheduled Time:</span>
                    <strong class="text-cocoa" id="oaApptTime"></strong>
                  </div>
                </div>
                <div class="p-3 border rounded-3" style="background-color: var(--oa-bg-subtle); border-color: var(--oa-border-color) !important;">
                  <strong class="small text-cocoa d-block mb-1">Preparation & Clinical Instructions:</strong>
                  <p class="small mb-0" id="oaApptNotes" style="color: var(--oa-text-main); font-weight: 500; line-height: 1.6;"></p>
                </div>
              </div>
            </div>
            <div class="modal-footer border-top pt-3">
              <button type="button" class="btn btn-outline-brand" data-bs-dismiss="modal">Close</button>
              <a href="../appointment.html" class="btn btn-primary">
                <i class="bi bi-calendar-event me-1"></i> Reschedule
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(apptModalEl);
    }

    document.getElementById('oaApptTitle').textContent = title;
    document.getElementById('oaApptDoctor').textContent = doctor;
    document.getElementById('oaApptLocation').textContent = location;
    document.getElementById('oaApptDate').textContent = date;
    document.getElementById('oaApptTime').textContent = time;
    document.getElementById('oaApptNotes').textContent = notes || 'Please arrive 15 minutes prior to your visit. Bring an updated list of current oral medications and hydration log.';

    const bsModal = new bootstrap.Modal(apptModalEl);
    bsModal.show();
  };

  // 6. Appointment Cancellation Trigger with Live Badge Update
  window.cancelAppointmentPrompt = function (btn, apptName) {
    if (confirm(`Are you sure you want to request cancellation for "${apptName}"? Your oncology coordinator will be notified immediately.`)) {
      const card = btn.closest('.oa-card');
      if (card) {
        const pill = card.querySelector('.oa-status-pill');
        if (pill) {
          pill.className = 'oa-badge oa-badge-cocoa';
          pill.textContent = 'Cancellation Pending';
        }
        btn.disabled = true;
        btn.textContent = 'Requested';
        btn.classList.add('opacity-50');
      }
      showDashToast(`Cancellation request logged for: ${apptName}`, 'danger');
    }
  };

  // 7. Clinical History Record Modal
  window.openClinicalRecord = function (title, date, provider, details, vitals) {
    let recordModalEl = document.getElementById('oaClinicalRecordModal');
    if (!recordModalEl) {
      recordModalEl = document.createElement('div');
      recordModalEl.id = 'oaClinicalRecordModal';
      recordModalEl.className = 'modal fade';
      recordModalEl.setAttribute('tabindex', '-1');
      recordModalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered modal-lg">
          <div class="modal-content oa-card border-0 p-4">
            <div class="modal-header border-bottom pb-3">
              <div>
                <span class="oa-badge oa-badge-cocoa mb-1">Clinical Milestone Record</span>
                <h5 class="modal-title text-cocoa fw-bold" id="oaRecordTitle">Clinical Event Summary</h5>
              </div>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body py-3">
              <div class="row g-3 mb-3">
                <div class="col-sm-6">
                  <div class="p-3 rounded-3" style="background-color: var(--oa-bg-subtle);">
                    <small class="text-muted d-block">Attending Provider</small>
                    <strong class="text-cocoa" id="oaRecordProvider"></strong>
                  </div>
                </div>
                <div class="col-sm-6">
                  <div class="p-3 rounded-3" style="background-color: var(--oa-bg-subtle);">
                    <small class="text-muted d-block">Date of Clinical Service</small>
                    <strong class="text-cocoa" id="oaRecordDate"></strong>
                  </div>
                </div>
              </div>
              <div class="mb-3" id="oaRecordVitalsContainer">
                <small class="text-muted d-block mb-1 fw-bold">Documented Vitals & Clearance:</small>
                <div class="d-flex flex-wrap gap-2" id="oaRecordVitals"></div>
              </div>
              <div class="border rounded-3 p-3" style="background-color: var(--oa-bg-subtle); border-color: var(--oa-border-color) !important;">
                <small class="d-block mb-1 fw-bold text-cocoa" style="font-size: 0.85rem;">Physician & Care Team Documentation:</small>
                <p class="mb-0 small" id="oaRecordDetails" style="line-height: 1.65; color: var(--oa-text-main); font-weight: 500;"></p>
              </div>
            </div>
            <div class="modal-footer border-top pt-3">
              <button type="button" class="btn btn-outline-brand" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-primary" onclick="window.print();">
                <i class="bi bi-printer me-1"></i> Print Summary
              </button>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(recordModalEl);
    }

    document.getElementById('oaRecordTitle').textContent = title;
    document.getElementById('oaRecordDate').textContent = date;
    document.getElementById('oaRecordProvider').textContent = provider;
    document.getElementById('oaRecordDetails').textContent = details;

    const vitalsBox = document.getElementById('oaRecordVitals');
    vitalsBox.innerHTML = '';
    if (vitals && vitals.length) {
      vitals.forEach(v => {
        const span = document.createElement('span');
        span.className = 'oa-vitals-pill';
        span.innerHTML = `<i class="bi bi-activity text-amber"></i> ${escapeHTML(v)}`;
        vitalsBox.appendChild(span);
      });
      document.getElementById('oaRecordVitalsContainer').style.display = 'block';
    } else {
      document.getElementById('oaRecordVitalsContainer').style.display = 'none';
    }

    const bsModal = new bootstrap.Modal(recordModalEl);
    bsModal.show();
  };

  // 8. Document Upload Simulation
  window.openUploadModal = function () {
    let uploadModalEl = document.getElementById('oaUploadDocModal');
    if (!uploadModalEl) {
      uploadModalEl = document.createElement('div');
      uploadModalEl.id = 'oaUploadDocModal';
      uploadModalEl.className = 'modal fade';
      uploadModalEl.setAttribute('tabindex', '-1');
      uploadModalEl.innerHTML = `
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content oa-card border-0 p-4">
            <div class="modal-header border-bottom pb-3">
              <h5 class="modal-title text-cocoa fw-bold">
                <i class="bi bi-cloud-arrow-up text-amber me-2"></i> Upload Care Document
              </h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <form id="oaUploadDocForm">
              <div class="modal-body py-3">
                <div class="mb-3">
                  <label class="form-label">Document Category *</label>
                  <select class="form-select" id="oaUploadDocCat" required>
                    <option value="External Lab Results">External Lab / Pathology Report</option>
                    <option value="Physician Consultation Note">Prior Oncologist Consultation Note</option>
                    <option value="Insurance / Authorization">Insurance Prior Authorization</option>
                    <option value="Supportive Care Log">Hydration / Side-Effect Daily Log</option>
                  </select>
                </div>
                <div class="mb-3">
                  <label class="form-label">Select PDF or Scanned Document *</label>
                  <input type="file" class="form-control" id="oaUploadFileInput" accept=".pdf,.png,.jpg,.jpeg" required>
                  <small class="text-muted">Accepted formats: PDF, PNG, JPG (Max 15MB)</small>
                </div>
                <div id="oaUploadProgressBox" class="d-none">
                  <div class="progress mb-2" style="height: 8px;">
                    <div class="progress-bar progress-bar-striped progress-bar-animated bg-amber" id="oaUploadProgressBar" style="width: 0%; background-color: var(--oa-soft-amber);"></div>
                  </div>
                  <small class="text-muted" id="oaUploadProgressText">Uploading securely to EHR...</small>
                </div>
              </div>
              <div class="modal-footer border-top pt-3">
                <button type="button" class="btn btn-outline-brand" data-bs-dismiss="modal">Cancel</button>
                <button type="submit" class="btn btn-primary" id="oaUploadSubmitBtn">
                  <i class="bi bi-upload me-1"></i> Upload to EHR
                </button>
              </div>
            </form>
          </div>
        </div>
      `;
      document.body.appendChild(uploadModalEl);

      const form = document.getElementById('oaUploadDocForm');
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        const fileInput = document.getElementById('oaUploadFileInput');
        const cat = document.getElementById('oaUploadDocCat').value;
        const submitBtn = document.getElementById('oaUploadSubmitBtn');
        const progressBox = document.getElementById('oaUploadProgressBox');
        const progressBar = document.getElementById('oaUploadProgressBar');
        const progressText = document.getElementById('oaUploadProgressText');

        if (!fileInput.files.length) return;
        const fileName = fileInput.files[0].name;

        submitBtn.disabled = true;
        progressBox.classList.remove('d-none');
        progressBar.style.width = '35%';

        setTimeout(() => {
          progressBar.style.width = '75%';
          progressText.textContent = 'Encrypting & logging to patient record...';
        }, 400);

        setTimeout(() => {
          progressBar.style.width = '100%';
          progressText.textContent = 'Upload Complete!';

          setTimeout(() => {
            const bsModal = bootstrap.Modal.getInstance(uploadModalEl);
            if (bsModal) bsModal.hide();
            submitBtn.disabled = false;
            progressBox.classList.add('d-none');
            progressBar.style.width = '0%';
            form.reset();
            showDashToast(`Successfully uploaded "${fileName}" to ${cat}!`, 'success');
          }, 400);
        }, 900);
      });
    }

    const bsModal = new bootstrap.Modal(uploadModalEl);
    bsModal.show();
  };

  // 9. Profile Forms Feedback
  const profileForms = document.querySelectorAll('.oa-dash-content form');
  profileForms.forEach(form => {
    if (!form.id || form.id !== 'oaAddMedForm' && form.id !== 'oaUploadDocForm') {
      form.addEventListener('submit', function (e) {
        e.preventDefault();
        showDashToast('Profile information saved and synchronized with your clinical care team.', 'success');
      });
    }
  });

  // 10. Patient Messaging Demo
  const chatForm = document.getElementById('oaChatForm');
  const chatMessages = document.getElementById('oaChatMessages');
  const chatInput = document.getElementById('oaChatInput');

  if (chatForm && chatMessages && chatInput) {
    chatForm.addEventListener('submit', function (e) {
      e.preventDefault();
      const text = chatInput.value.trim();
      if (!text) return;

      const timeStr = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const userBubble = document.createElement('div');
      userBubble.className = 'd-flex justify-content-end mb-3';
      userBubble.innerHTML = `
        <div class="bg-amber text-near-black p-3 rounded-4 shadow-sm" style="max-width: 75%; background-color: var(--oa-soft-amber);">
          <div class="small font-weight-bold text-dark mb-1">You (Alex Morgan)</div>
          <p class="mb-1">${escapeHTML(text)}</p>
          <div class="text-end" style="font-size: 0.75rem; opacity: 0.8;">${timeStr} · Sent</div>
        </div>
      `;
      chatMessages.appendChild(userBubble);
      chatInput.value = '';
      chatMessages.scrollTop = chatMessages.scrollHeight;

      setTimeout(() => {
        const replyBubble = document.createElement('div');
        replyBubble.className = 'd-flex justify-content-start mb-3';
        replyBubble.innerHTML = `
          <div class="oa-card p-3 rounded-4 shadow-sm" style="max-width: 75%;">
            <div class="small font-weight-bold text-cocoa mb-1">
              <i class="bi bi-person-heart text-amber me-1"></i> Nurse Coordinator Clara
            </div>
            <p class="mb-1 text-muted">Thank you for updating us, Alex. Your message has been logged in your care coordination record. Remember, for immediate medical questions, please call our 24/7 care desk directly.</p>
            <div class="text-end text-muted" style="font-size: 0.75rem;">${timeStr} · Demo Response</div>
          </div>
        `;
        chatMessages.appendChild(replyBubble);
        chatMessages.scrollTop = chatMessages.scrollHeight;
      }, 900);
    });
  }

  function escapeHTML(str) {
    if (!str) return '';
    return str.replace(/[&<>'"]/g, 
      tag => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[tag] || tag)
    );
  }
});
