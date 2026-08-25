
import { KPICard } from '../components/KPICard';
import { Card } from '../components/Card';
import { DollarSign, Users, ShoppingCart, Activity } from 'lucide-react';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const transactions = [
  { id: '1', customer: 'John Doe', amount: '$120.00', status: 'Completed', date: '2023-10-24' },
  { id: '2', customer: 'Jane Smith', amount: '$450.50', status: 'Pending', date: '2023-10-23' },
  { id: '3', customer: 'Bob Johnson', amount: '$85.00', status: 'Completed', date: '2023-10-22' },
  { id: '4', customer: 'Alice Brown', amount: '$1,200.00', status: 'Failed', date: '2023-10-21' },
  { id: '5', customer: 'Charlie Davis', amount: '$340.20', status: 'Completed', date: '2023-10-20' },
];

// Performance Optimization: Hoist static KPI metrics outside the render function to prevent creating new object references on every render, ensuring React.memo on KPICard works efficiently.
const kpiMetrics = [
  {
    title: 'Total Revenue',
    value: '$45,231.89',
    icon: DollarSign,
    trend: { value: 20.1, isPositive: true },
  },
  {
    title: 'Subscriptions',
    value: '+2350',
    icon: Users,
    trend: { value: 180.1, isPositive: true },
  },
  {
    title: 'Sales',
    value: '+12,234',
    icon: ShoppingCart,
    trend: { value: 19, isPositive: true },
  },
  {
    title: 'Active Now',
    value: '+573',
    icon: Activity,
    trend: { value: 201, isPositive: true },
  },
];

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of your enterprise metrics.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiMetrics.map((kpi) => (
          <KPICard
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            trend={kpi.trend}
          />
        ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 p-6">
          <h3 className="text-lg font-medium mb-4">Revenue Overview</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={data}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
                <XAxis
                  dataKey="name"
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis
                  stroke="#888888"
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `$${value}`}
                />
                <Tooltip />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#2563eb"
                  strokeWidth={2}
                  activeDot={{ r: 8 }}
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="col-span-3 p-6">
          <h3 className="text-lg font-medium mb-4">Recent Transactions</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((tx) => (
                <TableRow key={tx.id}>
                  <TableCell className="font-medium">{tx.customer}</TableCell>
                  <TableCell>{tx.amount}</TableCell>
                  <TableCell>
                    <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                      tx.status === 'Completed' ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400' :
                      tx.status === 'Pending' ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400' :
                      'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                    }`}>
                      {tx.status}
                    </span>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Card>
      </div>
    </div>
  );
}
