# Bolt's Journal

Critical learnings on performance optimizations for this codebase.

## 2026-09-25 - Code splitting route components with React.lazy
**Learning:** `App.tsx` imported all pages statically (`Dashboard`, `Report`), causing heavy visualization dependencies like `recharts` to be included in the initial bundle. Using `React.lazy` and `Suspense` allows splitting page bundles, significantly reducing initial chunk size and load time.
**Action:** Always lazy load route-level page components in React SPA applications with multi-page routes.
