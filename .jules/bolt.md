# Bolt's Journal - Critical Learnings

This journal contains critical codebase-specific performance learnings to avoid repeating past mistakes.

## 2026-08-12 - Route Code Splitting for Heavy Visualizations
**Learning:** In the dashboard frontend, direct imports of heavy charting components (e.g., recharts) in page components cause the initial bundle size to exceed 660 kB. Using `React.lazy` with named exports resolution (`import().then(m => ({ default: m.Component }))`) and `React.Suspense` in `App.tsx` enables Vite/Rollup to chunk heavy chart dependencies separately, reducing initial JS load size by ~60% (from 660 kB to 265 kB).
**Action:** Always prefer route-based dynamic imports for pages containing large visualization or data libraries.
