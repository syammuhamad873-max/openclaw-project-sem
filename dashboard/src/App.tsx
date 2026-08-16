
import { lazy, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { Layout } from './components/Layout';

// Route-based code splitting: Lazy load page components to split large chart dependencies and improve initial load time
const Dashboard = lazy(() => import('./pages/Dashboard').then((m) => ({ default: m.Dashboard })));
const Report = lazy(() => import('./pages/Report').then((m) => ({ default: m.Report })));

function App() {
  return (
    <ThemeProvider defaultTheme="light" storageKey="openclaw-theme">
      <BrowserRouter>
        <Suspense fallback={<div className="flex h-screen items-center justify-center p-4 text-muted-foreground">Loading...</div>}>
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
