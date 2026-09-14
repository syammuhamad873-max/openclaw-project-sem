## 2026-09-14 - Replace dynamic array generation during module evaluation
**Learning:** Generating mock data using `Math.random()` during module load in static components introduces needless CPU overhead on module evaluation and causes potential hydration mismatches. Replacing it with deterministic static arrays avoids recalculation and ensures stable rendering across renders and environments.
**Action:** Always prefer deterministic static constants for mock table/chart data in dashboard components.
