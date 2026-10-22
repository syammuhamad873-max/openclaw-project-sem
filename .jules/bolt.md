## 2026-10-22 - Route-based code splitting reduces initial bundle size
**Learning:** Heavy visualization libraries (e.g., Recharts in Dashboard/Report pages) inflate the initial bundle size to >660 kB. Using `React.lazy` for route component loading defers parsing and executing chart code until navigated to, reducing initial bundle chunk size down to 265 kB (~60% reduction).
**Action:** Always use `React.lazy` with `Suspense` for top-level route pages that pull in large chart or heavy UI libraries.
