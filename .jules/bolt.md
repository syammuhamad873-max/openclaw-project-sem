## 2026-08-31 - Route-Based Code Splitting with React.lazy and Suspense
**Learning:** Heavy page components and charting libraries (`recharts`) included in the main entry bundle increase initial page load times and bundle sizes unnecessarily.
**Action:** Use `React.lazy` and `React.Suspense` for route components in `App.tsx` to split pages into separate async chunks.
