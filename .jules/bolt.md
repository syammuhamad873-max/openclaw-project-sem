# Bolt's Journal - Critical Learnings

## 2023-10-24 - Route Code Splitting with Vite and Recharts
**Learning:** Recharts and large UI dependencies add ~600kB+ to the main bundle if imported synchronously in route components. Using `React.lazy` for route-based code splitting cleanly isolates heavy page dependencies into separate chunks, keeping initial bundle size below Vite's 500kB warning threshold.
**Action:** Always implement `React.lazy` and `React.Suspense` for top-level page routes when heavy charting or visualization packages are used in specific pages.
