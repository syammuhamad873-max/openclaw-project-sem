# Bolt's Journal - Critical Learnings

## 2023-10-24 - Route-based code splitting for Vite/React applications with heavy dependencies
**Learning:** Heavy libraries like Recharts add ~330KB (minified) to the initial bundle if page routes are statically imported. By lazy loading page components with `React.lazy()` and `React.Suspense`, Vite splits those route-specific dependencies into separate chunks, cutting the main bundle size by >50%.
**Action:** Always check `App.tsx` routes for static page imports when heavy charting or table libraries are used and code split routes using `React.lazy()`.
