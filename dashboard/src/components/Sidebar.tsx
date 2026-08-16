
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FileText, Settings, Users } from 'lucide-react';
import { cn } from './Card';

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export function Sidebar({ isOpen, setIsOpen }: SidebarProps) {
  const navItems = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'Reports', href: '/reports', icon: FileText },
    { name: 'Customers', href: '#', icon: Users },
    { name: 'Settings', href: '#', icon: Settings },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/50 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 w-64 transform bg-white border-r border-gray-200 transition-transform duration-300 ease-in-out dark:bg-gray-950 dark:border-gray-800 lg:static lg:translate-x-0 lg:block",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex h-16 shrink-0 items-center px-6 border-b border-gray-200 dark:border-gray-800">
          <span className="text-xl font-bold">OpenClaw</span>
        </div>
        <div className="flex flex-1 flex-col overflow-y-auto">
          <nav className="flex-1 space-y-1 px-4 py-4">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.href}
                className={({ isActive }) => cn(
                  "group flex items-center px-2 py-2 text-sm font-medium rounded-md",
                  isActive
                    ? "bg-gray-100 text-gray-900 dark:bg-gray-800 dark:text-gray-50"
                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-50"
                )}
                onClick={() => setIsOpen(false)}
              >
                <item.icon
                  className={cn("mr-3 h-5 w-5 flex-shrink-0")}
                  aria-hidden="true"
                />
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
}
