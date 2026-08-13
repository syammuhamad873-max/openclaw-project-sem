
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';

// Code-splitting page components to optimize initial bundle size.
// Since Dashboard and Report contain heavy libraries/visualizations (e.g., recharts),
// lazy loading these components prevents them from blocking the initial page load.
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Report = lazy(() => import('./pages/Report').then(module => ({ default: module.Report })));

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="openclaw-theme">
      <BrowserRouter>
        <Suspense fallback={
          <div className="flex h-screen w-screen items-center justify-center bg-gray-50 dark:bg-gray-900">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-gray-900 dark:border-gray-800 dark:border-t-gray-50" />
          </div>
        }>
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
