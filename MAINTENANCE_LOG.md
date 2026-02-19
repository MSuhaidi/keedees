# Maintenance Log (Active)

## Backlog
- [ ] **M-001:** Monitor Cloudflare analytics for 404/500 errors.
- [ ] **M-002:** Verify 'Offline Mode' sync behavior in real-world network conditions.
- [ ] **M-003:** Gather user feedback from pilot daycares.

## Reported Issues
- [ ] **I-001 (High):** False positive 'Late' alerts for checked-out children.
    - **Context:** System alerts 'Late' if current time > cutoff time, even if child is already Checked Out.
    - **Fix:** Update logic to only alert if  AND  (or similar logic).
- [ ] **I-002 (Medium):** Silent late alerts are easily missed.
    - **Context:** Visual badge only.
    - **Fix:** Implement Browser Notification API for audible/system alerts.
- [ ] **I-003 (Medium):** UI not optimized for mobile phones.
    - **Context:** Layout breaks or is hard to use on small screens.
    - **Fix:** Add responsive media queries for phone sizes.

- [ ] **I-004 (Medium):** Missing call link/button for late children.
    - **Context:** While the app prompts 'Call Parent!', there is no functional button to initiate the call.
    - **Fix:** Add a 'tel:' link or button to the child card when in 'Late' state.
- [ ] **I-005 (Low):** Improve Mock Data for UI Testing & Localization.
    - **Context:** Current mock data is too small (4 kids) to test scrolling/grid layout effectively. Names are Western.
    - **Fix:** Increase to 5-10 children per room. Use Malaysian names (e.g., Aiman, Mei Ling, Raju) to reflect target demographic.
