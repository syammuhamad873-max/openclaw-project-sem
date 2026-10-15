# National Sales Intelligence — Deployment

## Prerequisites

- Node.js 20+ for non-container execution.
- PostgreSQL 16+.
- Docker and Docker Compose for the recommended VPS deployment.

## Database

1. Create a PostgreSQL database.
2. Apply `db/schema.sql`.
3. Populate `regions`, `products`, and `sales_orders` from the real source system.
4. Do not commit credentials or production `.env` files.

## Environment

Copy `.env.example` to `.env` and set a real `DATABASE_URL`.

Required variables:

- `NODE_ENV=production`
- `PORT=3000`
- `DATABASE_URL`
- `DATABASE_SSL=true` for managed PostgreSQL where TLS is required.

## Docker

For the included sales stack, create a `.env` containing at minimum:

```text
POSTGRES_PASSWORD=<strong-random-password>
```

Then run:

```bash
docker compose -f docker-compose.sales.yml up -d --build
```

Health check:

```text
GET /api/health
```

Dashboard API:

```text
GET /api/dashboard?period=YTD%202026
```

The dashboard uses the production API when available and falls back to the bundled demo dataset when the API is unavailable. This fallback is for UI development only and must not be treated as production data.

## Production readiness boundary

This stage establishes the API/database foundation. Authentication, authorization/RBAC, audit logging, rate limiting, observability, real data ingestion, backups, migrations, secrets management, and security hardening are still required before a public production launch.
