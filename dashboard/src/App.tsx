import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';

// Performance Optimization: Route-based code splitting using React.lazy
// Defers loading heavy page components and chart libraries (e.g. recharts) until navigated to
const Dashboard = lazy(() => import('./pages/Dashboard').then(module => ({ default: module.Dashboard })));
const Report = lazy(() => import('./pages/Report').then(module => ({ default: module.Report })));

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="openclaw-theme">
      <BrowserRouter>
        <Suspense fallback={<div className="flex items-center justify-center min-h-[50vh] text-muted-foreground">Loading...</div>}>
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
