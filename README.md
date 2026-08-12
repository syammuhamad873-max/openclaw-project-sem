# National Sales Intelligence Platform

Platform dashboard penjualan nasional dan fondasi AI Sales Intelligence yang dikembangkan di atas repository OpenClaw Project.

## Current build

Branch aktif untuk pengembangan: `feature/national-sales-dashboard`

- Executive sales dashboard responsive
- Dynamic period filtering
- Production Node.js/Express API
- PostgreSQL schema dan indexing dasar
- Docker deployment stack
- Health endpoint
- API-to-dashboard integration dengan demo fallback untuk UI development

## Production architecture

`Browser → Express API → PostgreSQL`

Data penjualan disimpan pada `sales_orders`, dengan master data `regions` dan `products`.

## Important

Data pada `dashboard/data.js` adalah data demo. Data tersebut bukan data penjualan nyata. Sebelum go-live, isi database harus berasal dari sumber transaksi resmi dan konfigurasi keamanan produksi harus diterapkan.

## Documentation

Lihat `DEPLOYMENT_SALES.md` untuk deployment dan batas kesiapan produksi.
