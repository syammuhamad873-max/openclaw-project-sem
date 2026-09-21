import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';

// Bolt Optimization: Route-based code splitting using React.lazy
// Defer loading page components and heavy libraries (like recharts) until navigated to.
// This reduces initial bundle size significantly (~660kB -> ~265kB).
const Dashboard = lazy(() => import('./pages/Dashboard').then(m => ({ default: m.Dashboard })));
const Report = lazy(() => import('./pages/Report').then(m => ({ default: m.Report })));

// Minimal loading placeholder for smooth lazy route fallback
function PageLoader() {
  return (
    <div className="flex items-center justify-center h-64 text-gray-500 dark:text-gray-400">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="openclaw-theme">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route
              index
              element={
                <Suspense fallback={<PageLoader />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="reports"
              element={
                <Suspense fallback={<PageLoader />}>
                  <Report />
                </Suspense>
              }
            />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
