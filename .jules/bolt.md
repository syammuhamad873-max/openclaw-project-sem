## 2026-08-12 - Route Code Splitting for Heavy Page Components

**Learning:** Static imports of pages containing heavy third-party dependencies (like Recharts in `Dashboard` and `Report`) bundle all chart logic into the main entry chunk (`index.js`), inflating initial bundle size to over 660 KB. By wrapping page components in `React.lazy()` and `React.Suspense`, Vite splits chart and page components into separate dynamic chunks, reducing the main chunk size down to ~265 KB (~60% reduction).

**Action:** Always check `App.tsx` or main router definitions for static imports of heavy pages and convert them to `React.lazy()` chunks.
