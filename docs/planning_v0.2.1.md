# Project Planning Document: TapTots Hotfix v0.2.1

## 1. Project Overview
*   **Objective:** Resolve critical offline reliability and data update issues (I-006 & I-007) to ensure stable pilot operations.
*   **Business Value:** Restores the core 'Offline-First' reliability promise. Prevents data loss during future deployments.

## 2. Scope & Boundaries
*   **In-Scope:**
    *   **I-006 (Data Updates):** Implement proper Dexie.js schema versioning and data migration strategies to allow seamless app updates without manual cache clearing.
    *   **I-007 (Offline Refresh):** Diagnose and repair the Service Worker (vite-plugin-pwa) configuration or React state initialization that causes status updates to fail when the page is reloaded offline.
*   **Out-of-Scope:**
    *   Any UI/UX changes or new features.
    *   Backend API development (remaining strictly local for MVP).

## 3. Team & Resources
*   **Roles Required:** Lead Developer (Frontend/PWA Specialist), QA Engineer.
*   **Tools/Tech Stack:** React, Vite, vite-plugin-pwa, Dexie.js, Chrome DevTools (Offline simulation).

## 4. Risk Analysis
*   **Risk 1:** **Data Loss during Migration (I-006)**
    *   *Impact:* High.
    *   *Mitigation:* Create robust unit tests for the Dexie upgrade function. Ensure AttendanceLog data is never dropped during a schema upgrade.
*   **Risk 2:** **Service Worker Complexity (I-007)**
    *   *Impact:* Medium.
    *   *Mitigation:* Simplify the Vite PWA caching strategy if necessary; focus on generateSW basics to ensure the index.html and assets serve correctly offline.

## 5. High-Level Roadmap
*   **Phase 1 (Diagnosis):** Reproduce I-006 and I-007 locally.
*   **Phase 2 (Implementation):** Implement Dexie versioning and adjust PWA config.
*   **Phase 3 (Testing):** Rigorous offline simulation testing.
*   **Phase 4 (Deployment):** Release Hotfix v0.2.1.

