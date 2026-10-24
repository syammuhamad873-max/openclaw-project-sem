## 2026-10-24 - Route Code Splitting for Recharts Pages

**Learning:** Eagerly importing page components that consume heavy visualization libraries (like Recharts) bundles all heavy visualization code into the main entry bundle (e.g. 660kB index.js). Using `React.lazy()` for route components splits Recharts into async chunks (`CartesianChart-*.js`), reducing initial JS payload by ~60% (down to 265kB).
**Action:** Always check if route pages import heavy visualization or data-processing libraries before eager loading, and apply `React.lazy` code splitting at the route level.
