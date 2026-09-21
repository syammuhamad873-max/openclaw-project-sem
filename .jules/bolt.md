# Bolt's Journal - Critical Performance Learnings

## 2026-09-20 - Route-Based Code Splitting in Single Page Applications
**Learning:** Top-level static imports of heavy visualization libraries (e.g., `recharts`) in route page components bloat the initial JavaScript bundle size (~660kB), delaying initial page load and triggering Vite chunk size warnings.
**Action:** Use `React.lazy` and `React.Suspense` for route components to split code into dynamic chunks, deferring heavy library loading until requested.
