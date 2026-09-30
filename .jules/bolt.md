## 2026-07-01 - Route-based code splitting for lazy route component loading
**Learning:** In React applications built with Vite, importing route page components statically bundles all pages and heavy third-party libraries (like recharts) into the main bundle. Splitting routes using `React.lazy` and `Suspense` defers chunk loading until needed.
**Action:** Use `React.lazy` for top-level page components in React Router routes to optimize initial bundle size.
