# OncoAid — Oncology Support & Cancer Care Center
> **Tagline:** “Compassionate Care. Every Step of the Way.”  
> **Brand Concept:** Modern oncology support and cancer care center focused on coordinated cancer care, treatment support, chemotherapy coordination, specialist care, medication management, patient education, supportive services, and compassionate guidance throughout the patient's care journey.

---

## 🌟 Executive Overview

**OncoAid** is a premium, marketplace-ready, frontend-only healthcare website template architected specifically for cancer support centers, medical oncology practices, chemotherapy infusion clinics, and patient care coordination organizations.

Designed around the foundational concept of **“The Care Journey”**, OncoAid avoids cold clinical dashboards, stereotypical cancer imagery, and generic hospital layouts. Instead, it balances warmth, dignity, clinical authority, and clear patient empowerment.

---

## 🎨 Exact Brand Design System

### Signature Color Palette
* **#FFF0DC (Warm Ivory — 45%):** Primary canvas, large content areas, soft editorial backgrounds, and patient-focused comfort zones.
* **#F0BB78 (Soft Amber — 15%):** Signature primary accent, active milestone markers, important action buttons, focus rings, and badges.
* **#543A14 (Deep Cocoa Brown — 10%):** Headings, brand authority, borders, secondary action elements, and stable typography.
* **#131010 (Near Black — 5%):** Footers, strong contrast panels, and dashboard navigation.
* **#FFFFFF (Pure White — 25%):** Card surfaces, form inputs, modals, and content containers.

### Dark Theme: “Calm Evening Care”
* Background: `#131010`
* Secondary / Dark Contrast: `#211C17`
* Elevated Cards & Surfaces: `#2B241D`
* Accent: `#F0BB78`
* Warm Text: `#FFF0DC`

---

## 🌐 Complete Page Inventory

Every single page contains **5 to 6 substantial, unique content sections** (excluding navbar and footer) with unique photography, SEO titles, and compassionate copy:

### Public Website
1. **`index.html`** — Home 1: Coordinated Cancer Care, 5-Step Journey Pathway, Service Grid, Multidisciplinary Team, Patient Resources.
2. **`home-2.html`** — Home 2: Editorial Care Focus, Whole-Person Oncology Pillars, Care Navigation, Specialist Quotes.
3. **`about.html`** — Unified About, Care Journey & Patient Support Hub: Origin story, 4 Care Philosophy Tenets, Complete 5-Step Care Journey (interactive pathway, milestones, expectations), Patient & Caregiver Support Hub (pathology simplified, visit checklist, questions to ask, caregiver circles), and Healing Environment Facilities.
4. **`services.html`** — Comprehensive Services & Curative Treatments: 8 Advanced cancer-clearing treatments (Immunotherapy, Targeted Therapy, Radiation Oncology, Chemotherapy & Biologics, CAR-T, Robotic Surgery, Hormone Therapy, Clinical Trials) with high-res hopeful photography for each, 6 core oncology services with photos, Multidisciplinary Tumor Board, and Survivorship Remission Roadmap.
5. **`service-details.html`** — Service Details: Clinical consultation scope, diagnostic verification, preparation checklist, post-care support.
6. **`chemotherapy.html`** — Chemotherapy Coordination: Infusion scheduling, laboratory synchronization, premedication regimens, 24/7 care desk.
7. **`supportive-care.html`** — Supportive Care: Fatigue management, caregiver respite, oncology dietetics, psychosocial counseling.
8. **`our-team.html`** — The Care Team: Board-certified oncologists, nurse navigators, genetic counselors, unhurried consultation commitment.
9. **`doctor-details.html`** — Doctor Profile: Dr. Maya Carter, MD (Chief of Medical Oncology), credentials, fellowship training, care philosophy.
10. **`pricing.html`** — Service Fee Guidance & Financial Navigation: Transparent consultation fees (labeled demo), insurance pre-auth advocacy, foundation grants.
11. **`blog.html`** — Oncology Insights: Filterable educational guides, featured articles, newsletter subscription.
12. **`blog-details.html`** — Deep-Dive Article: "What to Expect During Your First 30 Days of Cancer Care", key takeaways, helpful checklists.
13. **`contact.html`** — Contact & Campus: Stylized vector map (no external API), visiting hours, parking directions, inquiry form.
14. **`appointment.html`** — Appointment Booking: Interactive booking flow, input validation, confirmation summary modal.
15. **`care-journey.html`** & **`patient-support.html`** — Seamless redirects to `about.html#care-journey` and `about.html#patient-support`.

### Authentication Portal
17. **`auth/login.html`** — Patient Portal Sign-In (pre-populated with demo user Alex Morgan).
18. **`auth/register.html`** — New Patient Account Creation.
19. **`auth/forgot-password.html`** — Secure Password Recovery Flow.

### Patient Dashboard (“My OncoAid”)
20. **`patient-dashboard/dashboard.html`** — Overview: Quick cards (Next Appointment, Next Treatment, Med Reminder, Care Update), recent notes.
21. **`patient-dashboard/treatment-schedule.html`** — Treatment Schedule: Hybrid calendar/list, milestone filter (All, Upcoming, Completed, Rescheduled).
22. **`patient-dashboard/appointments.html`** — Clinic Appointments: Tabs for Upcoming, Completed, Cancelled with reschedule actions.
23. **`patient-dashboard/care-team-notes.html`** — Care Team Notes: Fictional visit recaps from oncologists, nurse navigators, and dietitians.
24. **`patient-dashboard/medication-reminders.html`** — Supportive Medication Reminders: Interactive Vanilla JS CRUD (Add, Edit, Mark as Taken, Delete).
25. **`patient-dashboard/treatment-history.html`** — Treatment History: Chronological milestone record and stage achievements.
26. **`patient-dashboard/documents.html`** — Documents & Plans: Care plan summaries, lab results, PDF download simulations.
27. **`patient-dashboard/messages.html`** — Care Messages: Interactive chat interface with automatic simulated nurse reply.
28. **`patient-dashboard/profile.html`** — Profile & Settings: Contact info, emergency caregiver details, notification preferences.

### Utility Pages
29. **`utility/404.html`** — Dignified 404 Error: “This step doesn’t seem to be on the journey.”
30. **`utility/coming-soon.html`** — Coming Soon: Feature launch countdown & newsletter.
31. **`utility/maintenance.html`** — Scheduled Care: Maintenance notice with 24/7 emergency clinic phone reassurance.

---

## ⚡ Technology Stack

* **HTML5:** Semantic, accessible landmarks (`<header>`, `<nav>`, `<main>`, `<section>`, `<aside>`, `<footer>`).
* **CSS3:** Custom CSS variables, responsive grid, glassmorphism, curved pathway SVGs, accessible focus states.
* **Vanilla JavaScript:** 100% dependency-free modular logic.
* **Bootstrap 5.3.2:** Strictly utilized for layout grids, containers, modals, offcanvas, and tabs. All visuals are custom-overridden via `assets/css/style.css`.
* **Zero Disallowed Libraries:** No React, No Vue, No Angular, No Tailwind, No TypeScript, No jQuery, No Node backend, No chart libraries, No map APIs.

---

## 🚀 Key Interactive Features

1. **Dark Mode (“Calm Evening Care”):**
   * Instant toggle in navbar with `localStorage` persistence.
   * Prevents FOUC (Flash of Unstyled Content).
2. **Bidirectional RTL / LTR:**
   * One-click toggle switching `dir="rtl"` with comprehensive CSS mirroring in `assets/css/rtl.css`.
3. **Interactive Medication CRUD:**
   * Add new medication reminders via modal dialog.
   * Mark reminders as taken or undo.
   * Delete reminders with instant list update.
   * Persisted in browser `localStorage`.
4. **Treatment Schedule Filtering:**
   * Instant filtering between All, Upcoming, Completed, and Rescheduled sessions.
5. **Interactive Messaging Demo:**
   * Send messages to your care coordinator with simulated instant auto-replies.
6. **Appointment Booking Validation:**
   * Client-side form validation with summary confirmation modal.

---

## 📁 Directory Structure

```
oncoaid/
├── index.html
├── home-2.html
├── about.html
├── services.html
├── service-details.html
├── our-team.html
├── doctor-details.html
├── care-journey.html
├── chemotherapy.html
├── supportive-care.html
├── patient-support.html
├── pricing.html
├── blog.html
├── blog-details.html
├── contact.html
├── appointment.html
│
├── auth/
│   ├── login.html
│   ├── register.html
│   └── forgot-password.html
│
├── patient-dashboard/
│   ├── dashboard.html
│   ├── treatment-schedule.html
│   ├── appointments.html
│   ├── care-team-notes.html
│   ├── medication-reminders.html
│   ├── treatment-history.html
│   ├── documents.html
│   ├── messages.html
│   └── profile.html
│
├── utility/
│   ├── 404.html
│   ├── coming-soon.html
│   └── maintenance.html
│
├── assets/
│   ├── css/
│   │   ├── style.css
│   │   ├── responsive.css
│   │   └── rtl.css
│   ├── js/
│   │   ├── main.js
│   │   ├── theme.js
│   │   ├── rtl.js
│   │   ├── appointments.js
│   │   ├── medication.js
│   │   ├── schedule.js
│   │   └── dashboard.js
│   ├── icons/
│   │   ├── logo.svg
│   │   └── favicon.svg
│   └── images/
│
└── README.md
```

---

## 🔒 Medical Content Safety Disclaimer

This website template is a frontend design demonstration for commercial healthcare templates. It does not provide real medical advice, diagnoses, or prescriptions. All patient names, medications, schedules, and clinical notes are fictional demo representations. Patients seeking oncology care should always consult qualified healthcare professionals or emergency medical services.
