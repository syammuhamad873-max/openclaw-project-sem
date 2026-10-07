## 2025-02-23 - Route-based Code Splitting in Vite Dashboard
**Learning:** Statically importing page components that pull in heavy visualization libraries (like recharts) causes a monolith bundle (>660kB) that triggers Vite size warnings. Using `React.lazy` with `Suspense` for page routes splits heavy page assets and dependencies into separate async chunks, reducing initial bundle size by ~60%.
**Action:** Always prefer route-based code splitting using `React.lazy()` for heavy page components to optimize initial page load performance.
