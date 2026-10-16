/**
 * OncoAid - Appointment Booking Logic (Frontend Demo)
 * Validates form inputs, stores appointment record in localStorage (demo),
 * and triggers a confirmation modal with comprehensive summary.
 */
document.addEventListener('DOMContentLoaded', function () {
  'use strict';

  const appointmentForm = document.getElementById('oaAppointmentForm');
  const confirmModalEl = document.getElementById('oaAppointmentSuccessModal');

  if (appointmentForm) {
    appointmentForm.addEventListener('submit', function (e) {
      e.preventDefault();

      if (!appointmentForm.checkValidity()) {
        e.stopPropagation();
        appointmentForm.classList.add('was-validated');
        return;
      }

      // Gather form inputs
      const patientName = document.getElementById('oaPatientName')?.value || 'Valued Patient';
      const patientEmail = document.getElementById('oaPatientEmail')?.value || 'Not provided';
      const patientPhone = document.getElementById('oaPatientPhone')?.value || 'Not provided';
      const appointmentType = document.getElementById('oaAppointmentType')?.value || 'Oncology Consultation';
      const preferredDoctor = document.getElementById('oaPreferredDoctor')?.value || 'Assigned Care Coordinator';
      const preferredDate = document.getElementById('oaPreferredDate')?.value || 'Upcoming Date';
      const preferredTime = document.getElementById('oaPreferredTime')?.value || '10:00 AM';

      // Populate confirmation modal fields
      const summaryName = document.getElementById('summaryPatientName');
      const summaryType = document.getElementById('summaryApptType');
      const summaryDoctor = document.getElementById('summaryDoctor');
      const summaryDateTime = document.getElementById('summaryDateTime');

      if (summaryName) summaryName.textContent = patientName;
      if (summaryType) summaryType.textContent = appointmentType;
      if (summaryDoctor) summaryDoctor.textContent = preferredDoctor;
      if (summaryDateTime) summaryDateTime.textContent = `${preferredDate} at ${preferredTime}`;

      // Open Modal via Bootstrap 5 API
      if (confirmModalEl && window.bootstrap) {
        const modal = new bootstrap.Modal(confirmModalEl);
        modal.show();
      }

      // Reset form
      appointmentForm.reset();
      appointmentForm.classList.remove('was-validated');
    });
  }
});
