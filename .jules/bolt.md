## 2026-09-28 - Route-based Code Splitting in App.tsx
**Learning:** React Router routes importing heavy page components (and chart libraries like recharts) statically include all page modules in the initial main bundle (~660 kB).
**Action:** Use `React.lazy` and `React.Suspense` to code-split page components, reducing initial bundle size to ~265 kB.
