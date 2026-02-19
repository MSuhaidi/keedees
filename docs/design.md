# System Design Document: TapTots

## 1. Architecture Overview
*   **Style:** Offline-First Progressive Web App (PWA).
*   **Frontend:** React (Vite) + TypeScript.
*   **State & Offline Storage:** Dexie.js (IndexedDB wrapper).
*   **Backend (Sync/Admin):** Node.js (Express) + TypeScript.
*   **Database:** PostgreSQL (Centralized) / IndexedDB (Local).
*   **UI Library:** Vanilla CSS (per Gemini CLI defaults) or Radix UI/Shadcn for components.

### Diagram (High-Level)
*   **Kiosk (Tablet):** React App -> Dexie.js (Local DB)
*   **Sync Logic:** Background Worker -> REST API -> Central DB
*   **Admin Dashboard:** React App (Management Interface)

## 2. Data Model (Local & Central)
*   **`Room`**
    *   `id` (UUID), `name` (string), `capacity` (int)
*   **`Child`**
    *   `id` (UUID), `firstName`, `lastName`, `photoUrl`, `roomId` (FK), `cutoffTime` (e.g., "10:00")
*   **`Staff`**
    *   `id` (UUID), `name`, `pin` (hashed 4-digit), `role` (Staff/Admin)
*   **`AttendanceLog`**
    *   `id` (UUID), `childId` (FK), `staffId` (FK), `type` (CHECK_IN/CHECK_OUT), `timestamp` (DateTime), `synced` (boolean)

## 3. API Design (Sync Protocol)
*   `POST /api/sync`: Receives batch of `AttendanceLog` from tablet. Returns success/fail for each.
*   `GET /api/roster`: Fetches latest Children/Rooms/Staff data for local caching.

## 4. Component Details
*   **`AttendanceProvider` (Context):** Manages the "One-Tap" logic, updates Dexie, and triggers UI changes.
*   **`SyncEngine`:** Periodically checks for internet and pushes unsynced logs to the server.
*   **`AbsenceMonitor`:** Compares current time vs `child.cutoffTime` and generates alerts for un-checked-in children.

## 5. UI/UX Concepts
### Screen 1: PIN Entry
*   Simple 10-key numeric pad. Masked input. Auto-submit after 4 digits.
### Screen 2: Dashboard (Kiosk Mode)
*   **Top Bar:** Current Room Name, Clock, Sync Status Icon.
*   **Main Area:** Grid of "Child Cards".
    *   *Card:* Large Photo (Avatar), Name.
    *   *Visual State:* 
        *   Checked-In: Green border/background, "In" badge.
        *   Checked-Out (Default): Grey/White, "Out" badge.
        *   Late (Alert): Red pulsing border, "Late - Call Parent" button.
### Flow: One-Tap Check-In
1. Staff taps Child Card.
2. Card immediately turns Green.
3. `AttendanceLog` entry created in Dexie (`synced: false`).
4. Toast notification (brief): "Check-in successful for [Name]".
