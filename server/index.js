import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import pg from 'pg';

const { Pool } = pg;
const app = express();
const port = Number(process.env.PORT || 3000);
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dashboardDir = path.resolve(__dirname, '../dashboard');

const pool = process.env.DATABASE_URL
  ? new Pool({
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.DATABASE_SSL === 'false' ? false : { rejectUnauthorized: false },
      max: Number(process.env.DB_POOL_MAX || 10),
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 5000
    })
  : null;

app.disable('x-powered-by');
app.use(express.json({ limit: '1mb' }));
app.use(express.static(dashboardDir, { extensions: ['html'] }));

app.get('/api/health', async (_req, res) => {
  if (!pool) return res.status(503).json({ status: 'degraded', database: 'not_configured' });
  try {
    await pool.query('SELECT 1');
    res.json({ status: 'ok', database: 'connected' });
  } catch (error) {
    res.status(503).json({ status: 'degraded', database: 'unavailable', error: error.message });
  }
});

app.get('/api/dashboard', async (req, res) => {
  if (!pool) return res.status(503).json({ error: 'DATABASE_URL is not configured' });

  const period = String(req.query.period || 'YTD 2026');
  const now = new Date();
  const year = now.getUTCFullYear();
  const start = period === 'Juli 2026'
    ? new Date(Date.UTC(2026, 6, 1))
    : period === 'Q3 2026'
      ? new Date(Date.UTC(2026, 6, 1))
      : new Date(Date.UTC(year, 0, 1));
  const end = period === 'Juli 2026'
    ? new Date(Date.UTC(2026, 7, 1))
    : period === 'Q3 2026'
      ? new Date(Date.UTC(2026, 9, 1))
      : now;

  try {
    const [summary, trend, regions, products] = await Promise.all([
      pool.query(`SELECT COALESCE(SUM(net_amount),0) revenue, COUNT(DISTINCT order_number) orders FROM sales_orders WHERE status='completed' AND order_date >= $1 AND order_date < $2`, [start, end]),
      pool.query(`SELECT TO_CHAR(DATE_TRUNC('month', order_date),'Mon') month, COALESCE(SUM(net_amount),0) revenue FROM sales_orders WHERE status='completed' AND order_date >= $1 AND order_date < $2 GROUP BY 1, DATE_TRUNC('month', order_date) ORDER BY DATE_TRUNC('month', order_date)`, [start, end]),
      pool.query(`SELECT r.name, COALESCE(SUM(s.net_amount),0) revenue, COALESCE(r.target_revenue,0) target_revenue FROM regions r LEFT JOIN sales_orders s ON s.region_id=r.id AND s.status='completed' AND s.order_date >= $1 AND s.order_date < $2 WHERE r.active=true GROUP BY r.id ORDER BY revenue DESC LIMIT 10`, [start, end]),
      pool.query(`SELECT p.name, COUNT(DISTINCT s.order_number) orders, COALESCE(SUM(s.net_amount),0) revenue FROM products p LEFT JOIN sales_orders s ON s.product_id=p.id AND s.status='completed' AND s.order_date >= $1 AND s.order_date < $2 WHERE p.active=true GROUP BY p.id ORDER BY revenue DESC LIMIT 10`, [start, end])
    ]);

    res.json({
      period,
      generatedAt: new Date().toISOString(),
      summary: { revenue: Number(summary.rows[0].revenue), orders: Number(summary.rows[0].orders) },
      trend: trend.rows.map(r => ({ month: r.month, revenue: Number(r.revenue) })),
      regions: regions.rows.map(r => ({
        name: r.name,
        revenue: Number(r.revenue),
        achievement: Number(r.target_revenue) ? Number(((Number(r.revenue) / Number(r.target_revenue)) * 100).toFixed(1)) : null
      })),
      products: products.rows.map(r => ({ name: r.name, orders: Number(r.orders), revenue: Number(r.revenue) }))
    });
  } catch (error) {
    console.error('dashboard query failed', error);
    res.status(500).json({ error: 'Failed to load dashboard data' });
  }
});

app.use((_req, res) => res.sendFile(path.join(dashboardDir, 'index.html')));

const server = app.listen(port, () => console.log(`National Sales API listening on :${port}`));

const shutdown = async () => {
  server.close(async () => {
    if (pool) await pool.end();
    process.exit(0);
  });
};
process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);
