
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';

// Bolt Optimization: Dynamic imports with React.lazy enable route-based code splitting.
// Heavy page components (and dependencies like Recharts) are split into separate chunks
// and loaded on-demand when visiting the specific routes, significantly reducing initial bundle size and initial page load duration.
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const Report = lazy(() => import('./pages/Report').then((m) => ({ default: m.Report })));

function PageLoading() {
  return (
    <div className="flex h-64 w-full items-center justify-center">
      <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent"></div>
    </div>
  );
}

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="openclaw-theme">
      <BrowserRouter>
        <Suspense fallback={<PageLoading />}>
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
