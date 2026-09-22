## 2026-09-22 - Route-based code splitting with React.lazy
**Learning:** Heavy libraries like `recharts` significantly inflate the main initial bundle if route components are statically imported. Using `React.lazy` and `React.Suspense` decouples page chunks and reduces initial load bundle size by ~60%.
**Action:** Always check if route pages in Vite/React apps can be dynamically imported with `React.lazy` when page size or chunk size warning occurs.
