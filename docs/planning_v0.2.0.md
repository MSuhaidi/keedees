# Project Planning Document: TapTots Sprint 2 (v0.2.0)

## 1. Project Overview
*   **Objective:** Stabilize the core safety loop, improve user accessibility on mobile devices, and enhance the development testing environment with localized data.
*   **Business Value:** Fixes "Late" alert inaccuracies to maintain user trust, enables broader device usage (phones), and provides a better feedback loop for staff when children are late.

## 2. Scope & Boundaries
*   **In-Scope:**
    *   **Logic Fix (I-001):** Correct the "Late" alert logic to exclude children who are already "Checked Out".
    *   **Parent Contact Feature (I-004):** Add a functional "Call Parent" button (tel link) to child cards in the "Late" state.
    *   **Mobile Optimization (I-003):** Implement responsive CSS to ensure the Kiosk dashboard is usable on phone screens.
    *   **Browser Notifications (I-002):** Implement the Web Notification API for active alerts when the app is in the background or minimized.
    *   **Testing & Localization (I-005):** Expand mock data to 5-10 children per room using Malaysian names for better UI stress testing and localization.
*   **Out-of-Scope:**
    *   Persistent notification history (server-side).
    *   Native mobile app development.
    *   Backend synchronization for parent contact details (will use mock data fields for now).

## 3. Team & Resources
*   **Roles Required:**
    *   **Lead Developer/Architect:** (Gemini)
    *   **QA Engineer:** (Gemini)
*   **Tools/Tech Stack:** React, Vite, TypeScript, Dexie.js, CSS Media Queries, Web Notification API.

## 4. Risk Analysis
*   **Risk 1: Browser Notification Permissions** - **Impact: Medium** - **Mitigation:** Ensure clear instructions or fallback UI if the user denies notification permissions.
*   **Risk 2: UI Overcrowding on Mobile** - **Impact: Medium** - **Mitigation:** Use a responsive grid or list view specifically for smaller screens.
*   **Risk 3: False Alert Complexity** - **Impact: High** - **Mitigation:** Thoroughly test various check-in/out scenarios before deployment.

## 5. High-Level Roadmap
*   **Milestone 1: Logic & Contact (Day 1)** - Fix I-001 and implement I-004.
*   **Milestone 2: Mobile UI & Mock Data (Day 2)** - Implement I-003 and I-005.
*   **Milestone 3: Notifications & Final Testing (Day 3)** - Implement I-002 and conduct full regression testing.
*   **Milestone 4: Deployment (Day 4)** - Deploy v0.2.0 to Cloudflare Pages.
