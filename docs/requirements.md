# Requirements Specification Document: TapTots

## 1. Introduction
*   **Purpose:** Define the functional and non-functional requirements for the "TapTots" tablet kiosk application.
*   **Scope:** The MVP focuses on a high-speed, "one-tap" attendance workflow for daycare staff, with basic administrative functions included.

## 2. User Personas
*   **Sarah (Staff Member):** 
    *   **Goal:** Quickly check children in/out during busy drop-off/pick-up times without delays.
    *   **Pain Point:** Paper logs are slow and easy to lose; complex apps require too many clicks.
*   **David (Administrator/Owner):**
    *   **Goal:** Manage the roster of children/staff and view accurate attendance reports.
    *   **Pain Point:** Inaccurate billing due to lost attendance records.

## 3. Functional Requirements
*   **FR-01: Kiosk Authentication**
    *   **Priority:** Must Have
    *   **Description:** Staff members authenticate using a 4-digit PIN to access the main attendance screen.
*   **FR-02: Room-Based Dashboard**
    *   **Priority:** Must Have
    *   **Description:** The main screen displays children grouped by their assigned "Room" (e.g., Infants, Toddlers).
*   **FR-03: One-Tap Attendance**
    *   **Priority:** Must Have
    *   **Description:** Tapping a child's card toggles their status between "Checked In" and "Checked Out".
        *   *Visual feedback:* Card changes color (e.g., Grey -> Green).
        *   *Data:* Timestamp is recorded automatically.
*   **FR-04: Offline Mode**
    *   **Priority:** Must Have
    *   **Description:** All attendance actions are stored locally and synced to the server once internet connectivity is restored.
*   **FR-05: Child Management (Admin)**
    *   **Priority:** Should Have
    *   **Description:** Admins can add/edit child profiles (Name, Photo, Room) directly from a protected "Admin Mode".
*   **FR-06: Absence Alerts**
    *   **Priority:** Must Have
    *   **Description:** The system alerts staff if a scheduled child has not checked in by a configurable cutoff time (e.g., 10:00 AM) and prompts to contact parents.

## 4. Non-Functional Requirements
*   **NFR-01 (Performance):** The "One-Tap" action must respond visually within 200ms.
*   **NFR-02 (Usability):** All interactive elements (buttons, cards) must be at least 48x48dp to accommodate touch interaction.
*   **NFR-03 (Security):** PIN entry should be masked. Admin Mode requires a separate, stronger password or Master PIN.
*   **NFR-04 (Reliability):** Local database must persist data even if the app crashes or the battery dies.

## 5. User Stories
*   **Story 1:** As a Staff Member, I want to see all children in my room at a glance, so I don't have to search for them.
    *   **Acceptance Criteria:**
        *   [ ] Screen shows "Rooms" as collapsible sections or tabs.
        *   [ ] Children are listed with photos and names.
*   **Story 2:** As a Staff Member, I want to check a child in with a single tap, so I can focus on greeting the parent.
    *   **Acceptance Criteria:**
        *   [ ] Tapping the child's photo immediately updates status to "Present".
        *   [ ] A timestamp is saved locally.
*   **Story 3:** As a Staff Member, I want to be alerted if a child is absent so I can ensure their safety.
    *   **Acceptance Criteria:**
        *   [ ] Dashboard highlights "Absent/Late" children after cutoff time.
        *   [ ] "Contact Parent" button appears for these children.
