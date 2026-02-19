# System Design Document: TapTots v0.2.0 (Maintenance Sprint)

## 1. Architecture Overview
*   **Style:** No major architectural changes. Continuing with Offline-First PWA using React, Vite, and Dexie.js.
*   **Enhancement:** Integration of the Browser Notification API for background alerts.

## 2. Data Model Update
The `Child` entity in Dexie.js (`src/db.ts`) will be updated:

### Entity: Child
*   `id` (auto-incrementing)
*   `firstName` (string)
*   `lastName` (string)
*   `photoUrl` (string)
*   `roomId` (integer, FK)
*   `status` ('Checked In' | 'Checked Out')
*   `lastUpdated` (ISO String)
*   `cutoffTime` (string, HH:mm) - Arrival Deadline
*   **`leftTime`** (string, HH:mm) - **[NEW]** Departure Time
*   **`parentPhone`** (string) - **[NEW]** Contact number

## 3. Logic & Component Design

### 3.1 Accurate Late Logic
Function `isLate(child)` implementation:
```typescript
const isLate = (child) => {
  if (child.status === 'Checked In') return false;
  
  const now = new Date();
  const [cHours, cMins] = child.cutoffTime.split(':').map(Number);
  const [lHours, lMins] = child.leftTime.split(':').map(Number);
  
  const cutoff = new Date().setHours(cHours, cMins, 0, 0);
  const left = new Date().setHours(lHours, lMins, 0, 0);
  
  return now.getTime() > cutoff && now.getTime() < left;
};
```

### 3.2 Notification Engine
A `useEffect` in `App.tsx` will:
1. Check if `Notification.permission` is granted.
2. If granted, periodically scan `children` for `isLate(child) === true`.
3. Trigger `new Notification('Late Alert', { body: '...' })` for each late child, avoiding duplicate notifications for the same child within a short window.

## 4. UI/UX Concepts

### 4.1 Responsive Design (Scaled Tablet View)
*   **Tablet (> 600px):** 100% width room slides, 3-5 columns grid.
*   **Phone (< 600px):**
    *   `.child-grid` will transition to 2 columns.
    *   Card padding and font sizes reduced by ~15%.
    *   "Call Parent" button will be a prominent icon/button in the 'Late' state.

### 4.2 "Call Parent" Integration
*   **Component:** `ChildCard`
*   **Element:** `<a href={`tel:${child.parentPhone}`} className="call-btn">Call Parent</a>`
*   **Placement:** Appears only when `isLate(child)` is true, positioned below the status badge.

## 5. Implementation Strategy
1. **Database:** Update `src/db.ts` schema and `src/mockData.ts` generators.
2. **CSS:** Update `src/index.css` with mobile media queries and alert styles.
3. **Logic:** Update `App.tsx` with refined `isLate` and Notification setup.
