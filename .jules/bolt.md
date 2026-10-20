# Bolt's Journal - Critical Learnings

## 2026-07-01 - Route-Based Code Splitting in Dashboard React App
**Learning:** In Vite/React SPA applications with heavy dependencies like Recharts, statically importing all route pages in `App.tsx` bundles the entire application (660+ kB) into a single initial JavaScript chunk.
**Action:** Use `React.lazy` and `React.Suspense` for page components (`Dashboard`, `Report`) in `App.tsx` to split page bundles into separate async chunks, reducing the main entry chunk size significantly and improving initial Time to Interactive.
