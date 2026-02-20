# Maintenance Log (Active)

## Backlog
- [ ] **M-001:** Monitor Cloudflare analytics for 404/500 errors.
- [ ] **M-002:** Verify 'Offline Mode' sync behavior in real-world network conditions.
- [ ] **M-003:** Gather user feedback from pilot daycares.

- [ ] **I-006 (High):** Database/Mock Data not updating for existing users.
    - **Context:** User reported that deploying the new version doesn't overwrite the old local database. The initialization logic likely checks for emptiness, skipping updates if old data exists.
    - **Fix:** Update db.ts and mockData.ts to handle schema versioning upgrades or provide a 'Reset Data' function for the MVP.
- [ ] **I-007 (High):** Offline Update Failure After Refresh.
    - **Context:** User cannot update child status after refreshing the page while offline. Dexie.js persistence works, but UI/State might be losing the connection or failing to re-initialize properly without network.
    - **Fix:** Verify live query behavior and Service Worker caching strategy for the PWA.
