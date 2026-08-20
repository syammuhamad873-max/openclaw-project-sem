## 2026-08-20 - Route-Based Code Splitting in Vite / React App

**Learning:** Heavy visualization packages like `recharts` and icon sets like `lucide-react` significantly inflate the initial JavaScript bundle if imported directly into top-level page components. By wrapping route components (`Dashboard`, `Report`) with `React.lazy()` and `React.Suspense`, Vite splits `recharts` into separate dynamic chunks (`CartesianChart`), reducing the initial entry bundle from 660 kB to 265 kB (~60% reduction in initial payload).

**Action:** Always check if heavy chart or UI libraries can be route-split via `React.lazy()` before opting for micro-optimizations.
