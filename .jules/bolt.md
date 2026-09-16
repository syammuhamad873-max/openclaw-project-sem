# Bolt's Journal

## 2026-09-16 - Deterministic Mock Data Generation in Top-Level Modules
**Learning:** Top-level module evaluation that executes `Math.random()` inside dynamic array maps generates runtime overhead on module load and causes hydration mismatch risks.
**Action:** Replace dynamic array mapping in module scope with static pre-formatted objects or hoisted data structures.
