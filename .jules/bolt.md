## 2026-07-01 - Route-based code splitting for Recharts heavy pages
**Learning:** Recharts is a large library (~338 kB JS) that was being loaded synchronously in `App.tsx` on initial page render even before any page route rendered. Splitting routes with `React.lazy` reduced the initial chunk size by ~60% (from 660 kB to 265 kB).
**Action:** When working with route-heavy React SPA codebases with dynamic chart components, always split page routes with `React.lazy` and `Suspense` to defer heavy visualization libraries from the main initial entry bundle.
