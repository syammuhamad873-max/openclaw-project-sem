
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

const reportData = Array.from({ length: 15 }).map((_, i) => ({
  id: `REP-${1000 + i}`,
  date: `2023-10-${(24 - i).toString().padStart(2, '0')}`,
  category: ['Electronics', 'Clothing', 'Food', 'Books'][Math.floor(Math.random() * 4)],
  revenue: `$${(Math.random() * 5000 + 500).toFixed(2)}`,
  margin: `${(Math.random() * 30 + 10).toFixed(1)}%`,
}));

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

export default Report;
