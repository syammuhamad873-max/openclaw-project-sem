## 2026-09-12 - Route-Based Code Splitting in Vite Application

**Learning:** Heavy page components (and their large dependency graphs like Recharts) bundled in the initial entry chunk degrade initial load performance and Time To Interactive (TTI). Using `React.lazy()` with `React.Suspense` for route components effectively breaks these pages into separate dynamic chunks fetched on-demand.

**Action:** When working on React single-page applications with multiple pages/routes, check `App.tsx` routes to apply code splitting for non-critical page routes.
