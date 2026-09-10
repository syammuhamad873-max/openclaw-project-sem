## 2026-08-23 - Route-based Code Splitting for React Dashboard
**Learning:** Heavy visualization dependencies like Recharts double initial bundle size if statically imported across all page routes. Using `React.lazy()` and `React.Suspense` defers loading route chunks until requested by navigation.
**Action:** Splitting route components dynamically with `React.lazy` reduces initial bundle size from 660 kB to 266 kB (~60% reduction).
