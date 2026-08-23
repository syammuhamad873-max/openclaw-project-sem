
import { Card } from './Card';
import type { LucideIcon } from 'lucide-react';
import { cn } from './Card';

interface KPICardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
}

export function KPICard({ title, value, icon: Icon, trend, className }: KPICardProps) {
  return (
    <Card className={cn("p-6", className)}>
      <div className="flex items-center justify-between space-y-0 pb-2">
        <h3 className="tracking-tight text-sm font-medium text-gray-500 dark:text-gray-400">
          {title}
        </h3>
        <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400" />
      </div>
      <div className="mt-2">
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className="text-xs mt-1">
            <span className={cn(
              "font-medium",
              trend.isPositive ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"
            )}>
              {trend.isPositive ? '+' : '-'}{Math.abs(trend.value)}%
            </span>
            {" "}from last month
          </p>
        )}
      </div>
    </Card>
  );
}
