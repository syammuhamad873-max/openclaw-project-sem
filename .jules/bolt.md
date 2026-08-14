## 2026-08-14 - Route-based code splitting with Recharts
**Learning:** Recharts visualization library contributes ~340kB to the JS bundle. By dynamic importing route components (`Dashboard` and `Report`), heavy components and `recharts` are split into deferred chunks (`CartesianChart`), dropping the main entry chunk size from 660.28 kB down to 265.79 kB (a ~60% reduction in initial JS load) and eliminating Vite's bundle size warning.
**Action:** Always lazy-load heavy chart/visualization routes using `React.lazy()` and `Suspense` to optimize initial page loading.
