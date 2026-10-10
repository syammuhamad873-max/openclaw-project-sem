## 2026-10-10 - Mock Data Hoisting Outside Component Render Loop
**Learning:** Re-creating arrays with `Array.from()` and dynamic calculation inside component render functions causes unnecessary memory allocation on every re-render and breaks object identity / key stability. Hoisting static mock data generation outside the component function eliminates re-allocation overhead.
**Action:** Always check if mock or static data structures inside component render loops can be hoisted outside the component body.
