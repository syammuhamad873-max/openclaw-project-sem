## 2026-09-19 - Route-based code splitting in Vite React apps with Recharts
**Learning:** Heavy libraries like Recharts (~330 kB+) are bundled into the main index chunk when page components importing them are statically imported in `App.tsx`. Implementing `React.lazy` for route components allows Vite to split Recharts and page code into separate chunks loaded on-demand per route.
**Action:** Always check `App.tsx` or main router configuration for static imports of heavy page components and use `React.lazy()` + `Suspense` to defer loading non-critical page routes and heavy charting libraries.
