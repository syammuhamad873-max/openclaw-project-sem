## 2026-08-23 - Dynamic Route-Based Code Splitting in React Single Page Application
**Learning:** Monolithic SPA bundle sizes grow drastically when large charting libraries like `recharts` are statically imported at the top-level `App.tsx` routes. Route-based code splitting using `React.lazy` and `React.Suspense` isolates page-specific dependencies into separate chunks, reducing initial bundle load by over 50%.
**Action:** Always lazy load top-level page components in React apps that import heavy third-party visualization or data libraries.
