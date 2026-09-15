## 2026-08-12 - Route Code Splitting with Heavy Charting Libraries

**Learning:** When heavy data visualization libraries like `recharts` are imported directly across page routes, bundling them synchronously inflates the initial bundle size (over 660 kB). Utilizing `React.lazy` and `React.Suspense` for route components defers chunk loading and shrinks the initial JS load by ~59.7% (~266 kB).

**Action:** Always check `App.tsx` / router definitions for synchronously loaded route components when heavy dependencies exist in sub-pages.
