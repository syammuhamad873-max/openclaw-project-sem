## 2026-10-04 - Static Report Data Optimization
**Learning:** Top-level module execution of `Array.from` and `Math.random` recalculates data unnecessarily on evaluation/import and can introduce hydration mismatch / render inconsistencies.
**Action:** Replace dynamic mock data generators in static view pages with pre-computed static array constants.
