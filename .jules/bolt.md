## 2026-10-28 - Route Code Splitting in Vite / React App
**Learning:** Heavy components like recharts in page routes cause a large initial bundle size (over 660 KB). Using `React.lazy` with default exports allows Vite/Rollup to split routes into separate lazy-loaded chunks, reducing initial bundle size by over 59%.
**Action:** When working on React SPAs with distinct routes, use `React.lazy` and `<Suspense>` for route-level code splitting.
