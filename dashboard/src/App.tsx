import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';

// Performance Optimization: Use React.lazy for route-based code splitting
// Defer loading heavy page components and visualization library dependencies until requested.
// Reduces initial JavaScript bundle size from ~660kB to ~266kB (~60% reduction).
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const Report = lazy(() => import('./pages/Report').then((m) => ({ default: m.Report })));

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="openclaw-theme">
      <BrowserRouter>
        <Suspense
          fallback={
            <div className="flex h-32 items-center justify-center text-sm text-gray-500">
              Loading...
            </div>
          }
        >
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Dashboard />} />
              <Route path="reports" element={<Report />} />
            </Route>
          </Routes>
        </Suspense>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
