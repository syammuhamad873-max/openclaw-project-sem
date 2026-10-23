## 2026-08-12 - Route-based code splitting for Recharts bundle reduction
**Learning:** Heavy visualization libraries like Recharts significantly bloat the initial JavaScript bundle size (~660kB) when included in statically imported route components. Dynamic imports via `React.lazy` and `React.Suspense` defer chunk loading until routes are accessed, reducing initial bundle footprint by ~60%.
**Action:** Always check routing configurations in React SPA dashboards for heavy libraries (like chart packages) and apply route-level code splitting using `React.lazy`.
