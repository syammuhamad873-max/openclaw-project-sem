import { Card } from '../components/Card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/Table';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { Button } from '../components/Button';
import { Download } from 'lucide-react';

const data = [
  { name: 'Product A', sales: 4000, returns: 240 },
  { name: 'Product B', sales: 3000, returns: 139 },
  { name: 'Product C', sales: 2000, returns: 980 },
  { name: 'Product D', sales: 2780, returns: 390 },
  { name: 'Product E', sales: 1890, returns: 480 },
  { name: 'Product F', sales: 2390, returns: 380 },
  { name: 'Product G', sales: 3490, returns: 430 },
];

// Optimization: Replace dynamic Math.random() execution on module initialization with a static array.
// This eliminates runtime loop and calculation overhead during load and provides deterministic rendering.
const reportData = [
  { id: 'REP-1000', date: '2023-10-24', category: 'Electronics', revenue: '$3240.50', margin: '22.4%' },
  { id: 'REP-1001', date: '2023-10-23', category: 'Clothing', revenue: '$1820.00', margin: '15.8%' },
  { id: 'REP-1002', date: '2023-10-22', category: 'Food', revenue: '$950.25', margin: '12.1%' },
  { id: 'REP-1003', date: '2023-10-21', category: 'Books', revenue: '$4120.80', margin: '28.3%' },
  { id: 'REP-1004', date: '2023-10-20', category: 'Electronics', revenue: '$2750.00', margin: '19.5%' },
  { id: 'REP-1005', date: '2023-10-19', category: 'Clothing', revenue: '$1430.60', margin: '14.2%' },
  { id: 'REP-1006', date: '2023-10-18', category: 'Food', revenue: '$3890.10', margin: '25.7%' },
  { id: 'REP-1007', date: '2023-10-17', category: 'Books', revenue: '$620.40', margin: '11.0%' },
  { id: 'REP-1008', date: '2023-10-16', category: 'Electronics', revenue: '$4980.00', margin: '32.1%' },
  { id: 'REP-1009', date: '2023-10-15', category: 'Clothing', revenue: '$2110.30', margin: '18.6%' },
  { id: 'REP-1010', date: '2023-10-14', category: 'Food', revenue: '$1780.90', margin: '16.4%' },
  { id: 'REP-1011', date: '2023-10-13', category: 'Books', revenue: '$3050.00', margin: '21.0%' },
  { id: 'REP-1012', date: '2023-10-12', category: 'Electronics', revenue: '$1240.75', margin: '13.5%' },
  { id: 'REP-1013', date: '2023-10-11', category: 'Clothing', revenue: '$3670.20', margin: '24.8%' },
  { id: 'REP-1014', date: '2023-10-10', category: 'Food', revenue: '$2890.50', margin: '20.2%' },
];

export function Report() {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Sales Report</h2>
          <p className="text-muted-foreground">
            Detailed performance analysis and historical data.
          </p>
        </div>
        <Button>
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Product Performance</h3>
        <div className="h-[400px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#888888" opacity={0.2} />
              <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
              <Tooltip cursor={{fill: 'transparent'}} />
              <Legend />
              <Bar dataKey="sales" name="Sales" fill="#2563eb" radius={[4, 4, 0, 0]} />
              <Bar dataKey="returns" name="Returns" fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-medium mb-4">Detailed Revenue Log</h3>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Report ID</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Revenue</TableHead>
              <TableHead>Margin</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {reportData.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="font-medium">{row.id}</TableCell>
                <TableCell>{row.date}</TableCell>
                <TableCell>{row.category}</TableCell>
                <TableCell>{row.revenue}</TableCell>
                <TableCell>{row.margin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
}
