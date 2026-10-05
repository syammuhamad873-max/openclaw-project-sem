## 2026-10-05 - Route-based code splitting for chart-heavy React components

**Learning:** Heavy visualization libraries like `recharts` significantly bloat initial bundle sizes (over 600kB) when imported statically in top-level route components. Splitting routes using `React.lazy` and `<Suspense>` defers loading of charting dependencies until page navigation, reducing initial entry bundle size by ~60% (from 660kB to 265kB).

**Action:** Always wrap heavy route components containing large third-party libraries (`recharts`, `lucide-react`) in `React.lazy` dynamically imported routes to maintain small initial bundle sizes and eliminate Vite chunk size warnings.
