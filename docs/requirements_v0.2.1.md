# Requirements Specification Document: TapTots Hotfix v0.2.1

## 1. Introduction
*   **Purpose:** Define the functional and technical requirements for resolving database update and offline reliability issues.
*   **Scope:** Specifically targets Dexie.js schema versioning and Service Worker caching behavior.

## 2. User Personas
*   **Sarah (Staff Member):**
    *   **Goal:** Use the app reliably in areas with spotty internet; receive app updates without losing her logs.
    *   **Pain Point:** App becomes unresponsive after refreshing while offline; losing data after a version update.

## 3. Functional Requirements
*   **FR-13: Automated Schema Migration (I-006)**
    *   **Priority:** Must Have
    *   **Description:** The application must utilize Dexie.js versioning to handle schema changes. 
    *   **Requirement:** When a new version of the app is loaded, existing data (especially `AttendanceLog`) must be preserved and migrated to the new schema if necessary.
*   **FR-14: Offline Interactivity (I-007)**
    *   **Priority:** Must Have
    *   **Description:** Status updates (Check-in/out) must function correctly even after a page refresh in offline mode.
    *   **Requirement:** The app state must correctly re-initialize from IndexedDB upon reload, independent of network availability.
*   **FR-15: Service Worker Reliability**
    *   **Priority:** Must Have
    *   **Description:** All static assets must be cached via the Service Worker to allow the "Scaled Tablet View" and logic to load offline.

## 4. Non-Functional Requirements
*   **NFR-08 (Reliability):** Data persistence must be 100% reliable during app updates.
*   **NFR-09 (Availability):** The app must be 100% functional (read/write to local DB) without an internet connection once cached.

## 5. User Stories
*   **Story 7:** As a Staff Member, I want the app to update automatically without losing my history, so I don't have to worry about maintenance.
    *   **Acceptance Criteria:**
        *   [ ] App version update in `package.json` triggers a Dexie version upgrade.
        *   [ ] Existing logs are still present after the upgrade.
*   **Story 8:** As a Staff Member, I want to refresh the app while offline and still be able to check children in, so I'm not stuck if the browser reloads unexpectedly.
    *   **Acceptance Criteria:**
        *   [ ] App loads from cache when offline.
        *   [ ] Tapping a child card updates the local database successfully.
