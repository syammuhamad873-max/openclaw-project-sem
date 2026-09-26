## 2026-09-26 - [Route-based Code Splitting in Vite/React App]
**Learning:** Checking out feature branches (e.g. `feature/enterprise-dashboard-...`) reveals project directories like `dashboard/` that exist in feature branches rather than `main`. Route-based code splitting using `React.lazy` and `React.Suspense` effectively reduces initial bundle size for apps with large libraries like Recharts.
**Action:** Always inspect feature branches when working on subsystem optimizations in multi-branch repositories.
