# System Design Document: TapTots Hotfix v0.2.1

## 1. Architecture Overview
*   **Style:** Offline-First PWA (Addressing current gaps in implementation).
*   **Enhancement 1 (I-006):** Introduce Dexie.js schema upgrade paths (`db.version(2).upgrade(...)`).
*   **Enhancement 2 (I-007):** Properly configure `vite-plugin-pwa` to generate a Service Worker that caches `index.html` and assets. Currently, the plugin is missing from `vite.config.ts`, meaning the app is NOT a true PWA and relies only on browser cache heuristics, which fails on explicit refresh.

## 2. Data Model Versioning (Dexie)
*   **Current State:** `db.version(1)` defines `rooms`, `children`, `logs`.
*   **Problem:** If a user has v1, and we add fields (like we did in v0.2.0 with `leftTime`), Dexie needs instructions on how to handle the schema change.
*   **Design Solution:**
    *   Keep `db.version(1)` as the baseline.
    *   Add `db.version(2).stores({ children: '++id, roomId, status' })`. Note: Dexie only needs indexes declared here, but we will use the `.upgrade()` hook to safely inject new mock data fields (`leftTime`, `parentPhone`) into existing records without deleting the `logs` table.
    *   *Self-Correction:* Actually, since we use mock data initialization, we should modify `initializeMockData` to check if existing children are missing `leftTime` and update them, rather than relying solely on Dexie upgrades for mock data injection.

## 3. PWA & Service Worker Configuration
*   **Missing Component:** `vite-plugin-pwa` is installed but not used in `vite.config.ts`.
*   **Design Solution:**
    *   Update `vite.config.ts` to include `VitePWA({ registerType: 'autoUpdate', workbox: { globPatterns: ['**/*.{js,css,html,ico,png,svg}'] } })`.
    *   This ensures that when offline, the Service Worker intercepts the navigation request for `/` and serves `index.html` from the cache, allowing React and Dexie to initialize and handle the state.

## 4. Implementation Strategy
1. **PWA Setup:** Modify `vite.config.ts` to activate the Service Worker.
2. **Data Migration Logic:** Update `src/mockData.ts` to iterate over existing `children` and patch missing fields (`leftTime`, `parentPhone`) instead of just checking `roomCount === 0`.
3. **Dexie Version Bump:** Explicitly bump Dexie to version 2 in `src/db.ts` to establish the pattern for future updates, even if index keys haven't changed.
