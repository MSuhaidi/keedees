# Requirements Specification Document: TapTots v0.2.0 (Maintenance Sprint)

## 1. Introduction
*   **Purpose:** Define the requirements for the v0.2.0 sprint, addressing bugs and user-requested improvements for the TapTots Kiosk.
*   **Scope:** Includes functional logic fixes, parent communication features, mobile responsiveness, and localized data enhancements.

## 2. User Personas (Updated)
*   **Sarah (Staff Member):** 
    *   **Goal:** Quickly identify who is late without false alerts; call parents directly from the app; use her own phone if the tablet is unavailable.
    *   **Pain Point:** False "Late" alerts for children who already left; missed alerts when the tablet screen is off or app is in the background.

## 3. Functional Requirements
*   **FR-07: Accurate Late Logic (I-001)**
    *   **Priority:** Must Have
    *   **Description:** A child is only considered "Late" if:
        1. `status` is NOT "Checked In" (This allows a child to be 'Checked Out' and still show as Late if they never arrived).
        2. `currentTime > cutoffTime` (Arrival deadline).
        3. `currentTime < leftTime` (Departure time).
    *   **Constraint:** If staff accidentally checks in a child who hasn't arrived, they can toggle them back to "Checked Out", and the "Late" alert must reappear if the time is between `cutoffTime` and `leftTime`.
*   **FR-12: Departure Time Management**
    *   **Priority:** Must Have
    *   **Description:** Each child profile includes a `leftTime` field (HH:mm format). This represents the time the child is expected to be picked up.
*   **FR-08: Parent Phone Management (I-004)**
    *   **Priority:** Must Have
    *   **Description:** Each child profile includes a `parentPhone` field (string).
    *   **Feature:** A "Call Parent" button/link appears on "Late" child cards. Tapping this opens the device's native phone dialer with the `parentPhone` number pre-filled (`tel:` link).
*   **FR-09: Mobile Responsive Dashboard (I-003)**
    *   **Priority:** Must Have
    *   **Description:** The Kiosk dashboard must be usable on smartphone screens.
    *   **Constraint:** The layout should scale down gracefully (Scaled Tablet View), ensuring cards are legible and buttons are large enough for touch interaction (min 44x44px).
*   **FR-10: Browser Notification Alerts (I-002)**
    *   **Priority:** Should Have
    *   **Description:** The system periodically triggers browser notifications for children who are in the "Late" state.
    *   **Frequency:** Every [X] minutes (e.g., 5-10 minutes) until the status changes or the alert is acknowledged/dismissed for that session.
*   **FR-11: Localized Mock Data (I-005)**
    *   **Priority:** Must Have
    *   **Description:** Expand the initial mock database to include 5-10 children per room.
    *   **Constraint:** Use diverse Malaysian names (e.g., Aiman, Mei Ling, Kavita) and include `parentPhone` data.

## 4. Non-Functional Requirements
*   **NFR-05 (Safety):** Alerts must be loud and clear (visual + notification).
*   **NFR-06 (Compatibility):** Must work on modern mobile browsers (Chrome, Safari, Firefox).
*   **NFR-07 (Trust):** Eliminate false positives in the late alert system.

## 5. User Stories
*   **Story 4:** As a Staff Member, I want to be alerted if a child hasn't arrived by their cutoff time, even if I previously toggled their status incorrectly, so I can ensure all children are accounted for before they are due to go home.
    *   **Acceptance Criteria:**
        *   [ ] "Late" status is active if child is NOT Checked In AND current time is between `cutoffTime` and `leftTime`.
        *   [ ] If a child is "Checked Out", they can still show as "Late" (indicating they never arrived for the day).
        *   [ ] Once a child is "Checked In", the "Late" alert disappears.
        *   [ ] After `leftTime`, the "Late" alert disappears (as the school day is over for that child).
*   **Story 5:** As a Staff Member, I want to call a late child's parent with one tap, so I can quickly find out why they are late.
    *   **Acceptance Criteria:**
        *   [ ] "Call Parent" button appears on Late cards.
        *   [ ] Clicking the button triggers a phone call.
*   **Story 6:** As a Staff Member, I want the app to notify me even when I'm not looking at the screen, so I don't miss a late child.
    *   **Acceptance Criteria:**
        *   [ ] Browser notification pops up for late status.
        *   [ ] Alerts repeat periodically until addressed.
