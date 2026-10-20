import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';

// Route-based code splitting: Lazy load page components to reduce initial bundle size.
// Heavy dependencies like Recharts are isolated into on-demand chunks instead of blocking main bundle parsing.
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const Report = lazy(() => import('./pages/Report').then((m) => ({ default: m.Report })));

function PageLoadingFallback() {
  return (
    <div className="flex items-center justify-center min-h-[300px]">
      <div className="text-muted-foreground animate-pulse text-sm">Loading page...</div>
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
                <Suspense fallback={<PageLoadingFallback />}>
                  <Dashboard />
                </Suspense>
              }
            />
            <Route
              path="reports"
              element={
                <Suspense fallback={<PageLoadingFallback />}>
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
