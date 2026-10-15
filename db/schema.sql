CREATE TABLE IF NOT EXISTS regions (
  id BIGSERIAL PRIMARY KEY,
  code VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(120) NOT NULL,
  province VARCHAR(120) NOT NULL,
  target_revenue NUMERIC(18,2) NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  sku VARCHAR(80) UNIQUE NOT NULL,
  name VARCHAR(200) NOT NULL,
  category VARCHAR(120),
  unit_price NUMERIC(18,2) NOT NULL DEFAULT 0,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS sales_orders (
  id BIGSERIAL PRIMARY KEY,
  order_number VARCHAR(80) UNIQUE NOT NULL,
  order_date TIMESTAMPTZ NOT NULL,
  region_id BIGINT NOT NULL REFERENCES regions(id),
  product_id BIGINT NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL CHECK (quantity > 0),
  gross_amount NUMERIC(18,2) NOT NULL CHECK (gross_amount >= 0),
  discount_amount NUMERIC(18,2) NOT NULL DEFAULT 0 CHECK (discount_amount >= 0),
  net_amount NUMERIC(18,2) NOT NULL CHECK (net_amount >= 0),
  status VARCHAR(30) NOT NULL DEFAULT 'completed',
  channel VARCHAR(50),
  customer_id VARCHAR(100),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sales_orders_date ON sales_orders(order_date);
CREATE INDEX IF NOT EXISTS idx_sales_orders_region_date ON sales_orders(region_id, order_date);
CREATE INDEX IF NOT EXISTS idx_sales_orders_product_date ON sales_orders(product_id, order_date);
CREATE INDEX IF NOT EXISTS idx_sales_orders_status ON sales_orders(status);
