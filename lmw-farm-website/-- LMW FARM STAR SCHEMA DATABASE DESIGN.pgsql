-- LMW FARM STAR SCHEMA DATABASE DESIGN
-- PostgreSQL Implementation

-- ============================================
-- DIMENSION TABLES
-- ============================================

-- Dimension: Products (What is being sold)
CREATE TABLE dim_products (
    product_id SERIAL PRIMARY KEY,
    product_name VARCHAR(255) NOT NULL,
    category VARCHAR(50) NOT NULL, -- 'plant', 'animal', 'merch'
    subcategory VARCHAR(100), -- 'eggs', 'chicks', 'herbs', 'butter', etc.
    breed VARCHAR(100), -- For chicks: 'Black Copper Marans', 'Cream Legbar', etc.
    product_type VARCHAR(50), -- For chicks: 'straight_run', 'pullet', 'rooster'
    size VARCHAR(50), -- For merch: 'S', 'M', 'L', 'XL', etc. or egg holder size
    description TEXT,
    unit_price DECIMAL(10,2) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dimension: Customers (Who is buying)
CREATE TABLE dim_customers (
    customer_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    last_name VARCHAR(100),
    phone VARCHAR(20),
    customer_type VARCHAR(50) DEFAULT 'retail', -- 'retail', 'wholesale', 'subscriber'
    is_email_subscriber BOOLEAN DEFAULT FALSE,
    registration_date DATE,
    last_purchase_date DATE,
    total_lifetime_orders INTEGER DEFAULT 0,
    total_lifetime_value DECIMAL(10,2) DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Dimension: Time (When purchases happen)
CREATE TABLE dim_time (
    time_id SERIAL PRIMARY KEY,
    date DATE NOT NULL UNIQUE,
    year INTEGER NOT NULL,
    quarter INTEGER NOT NULL,
    month INTEGER NOT NULL,
    month_name VARCHAR(20) NOT NULL,
    week INTEGER NOT NULL,
    day_of_month INTEGER NOT NULL,
    day_of_week INTEGER NOT NULL,
    day_name VARCHAR(20) NOT NULL,
    is_weekend BOOLEAN NOT NULL,
    season VARCHAR(20) -- 'Spring', 'Summer', 'Fall', 'Winter'
);

-- Dimension: Locations (Where - pickup/delivery)
CREATE TABLE dim_locations (
    location_id SERIAL PRIMARY KEY,
    location_type VARCHAR(50) NOT NULL, -- 'farm_pickup', 'farmers_market', 'delivery', 'vending_machine'
    location_name VARCHAR(255), -- 'Farm Pickup', 'Downtown Mount Airy Market', etc.
    address_line1 VARCHAR(255),
    address_line2 VARCHAR(255),
    city VARCHAR(100),
    state VARCHAR(2),
    zip_code VARCHAR(10),
    delivery_fee DECIMAL(10,2) DEFAULT 0,
    is_active BOOLEAN DEFAULT TRUE
);

-- Dimension: Payment Methods
CREATE TABLE dim_payment (
    payment_id SERIAL PRIMARY KEY,
    payment_method VARCHAR(50) NOT NULL, -- 'stripe', 'square', 'cash', 'venmo', 'zelle'
    payment_status VARCHAR(50) NOT NULL, -- 'completed', 'pending', 'failed', 'refunded'
    transaction_id VARCHAR(255), -- External payment processor transaction ID
    payment_date TIMESTAMP
);

-- ============================================
-- FACT TABLE (Center of the Star)
-- ============================================

-- Fact: Orders (Granular transaction data)
-- Fact: Orders (Granular transaction data)
CREATE TABLE fact_orders (
    order_fact_id SERIAL PRIMARY KEY,
    
    -- Foreign Keys to Dimensions
    product_id INTEGER NOT NULL REFERENCES dim_products(product_id),
    customer_id INTEGER NOT NULL REFERENCES dim_customers(customer_id),
    time_id INTEGER NOT NULL REFERENCES dim_time(time_id),
    location_id INTEGER NOT NULL REFERENCES dim_locations(location_id),
    payment_id INTEGER REFERENCES dim_payment(payment_id),
    
    -- Order Information
    order_number VARCHAR(50) NOT NULL, -- Groups line items into one order
    
    -- Measures (Additive Facts)
    quantity INTEGER NOT NULL,
    unit_price DECIMAL(10,2) NOT NULL,
    line_total DECIMAL(10,2) NOT NULL, -- quantity * unit_price
    discount_amount DECIMAL(10,2) DEFAULT 0,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    
    -- Order Status
    order_status VARCHAR(50) DEFAULT 'pending', -- 'pending', 'confirmed', 'fulfilled', 'cancelled'
    fulfillment_date DATE,
    
    -- Timestamps
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for fact_orders
CREATE INDEX idx_order_number ON fact_orders(order_number);
CREATE INDEX idx_product_id ON fact_orders(product_id);
CREATE INDEX idx_customer_id ON fact_orders(customer_id);
CREATE INDEX idx_time_id ON fact_orders(time_id);
CREATE INDEX idx_order_status ON fact_orders(order_status);

-- ============================================
-- SUPPORTING TABLES (Not part of star, but necessary)
-- ============================================

-- Inventory tracking (real-time stock levels)
CREATE TABLE inventory (
    inventory_id SERIAL PRIMARY KEY,
    product_id INTEGER NOT NULL REFERENCES dim_products(product_id),
    quantity_available INTEGER NOT NULL DEFAULT 0,
    quantity_reserved INTEGER DEFAULT 0, -- In pending orders
    restock_date DATE,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shopping Cart (temporary storage before order)
CREATE TABLE cart (
    cart_id SERIAL PRIMARY KEY,
    customer_id INTEGER REFERENCES dim_customers(customer_id),
    session_id VARCHAR(255), -- For guest checkout
    product_id INTEGER NOT NULL REFERENCES dim_products(product_id),
    quantity INTEGER NOT NULL,
    added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Email Subscribers (newsletter list)
CREATE TABLE email_subscribers (
    subscriber_id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    first_name VARCHAR(100),
    subscribed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    is_active BOOLEAN DEFAULT TRUE,
    unsubscribed_at TIMESTAMP
);

-- Contact Form Submissions
CREATE TABLE contact_submissions (
    submission_id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255),
    phone VARCHAR(20),
    message TEXT,
    submitted_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status VARCHAR(50) DEFAULT 'new' -- 'new', 'read', 'responded'
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================

CREATE INDEX idx_products_category ON dim_products(category);
CREATE INDEX idx_products_subcategory ON dim_products(subcategory);
CREATE INDEX idx_products_active ON dim_products(is_active);

CREATE INDEX idx_customers_email ON dim_customers(email);
CREATE INDEX idx_customers_type ON dim_customers(customer_type);

CREATE INDEX idx_time_date ON dim_time(date);
CREATE INDEX idx_time_year_month ON dim_time(year, month);

CREATE INDEX idx_inventory_product ON inventory(product_id);

-- ============================================
-- VIEWS FOR COMMON ANALYTICS QUERIES
-- ============================================

-- Order summary with all dimension details
CREATE VIEW vw_order_details AS
SELECT 
    fo.order_fact_id,
    fo.order_number,
    fo.order_status,
    
    -- Product details
    dp.product_name,
    dp.category,
    dp.subcategory,
    dp.breed,
    
    -- Customer details
    dc.email AS customer_email,
    dc.first_name,
    dc.last_name,
    dc.customer_type,
    
    -- Time details
    dt.date AS order_date,
    dt.year,
    dt.month,
    dt.month_name,
    dt.season,
    
    -- Location details
    dl.location_type,
    dl.location_name,
    
    -- Payment details
    dp_pay.payment_method,
    dp_pay.payment_status,
    
    -- Measures
    fo.quantity,
    fo.unit_price,
    fo.line_total,
    fo.discount_amount,
    fo.tax_amount,
    (fo.line_total - fo.discount_amount + fo.tax_amount) AS final_amount
    
FROM fact_orders fo
JOIN dim_products dp ON fo.product_id = dp.product_id
JOIN dim_customers dc ON fo.customer_id = dc.customer_id
JOIN dim_time dt ON fo.time_id = dt.time_id
JOIN dim_locations dl ON fo.location_id = dl.location_id
LEFT JOIN dim_payment dp_pay ON fo.payment_id = dp_pay.payment_id;

-- Sales summary by product
CREATE VIEW vw_sales_by_product AS
SELECT 
    dp.product_name,
    dp.category,
    dp.subcategory,
    COUNT(DISTINCT fo.order_number) AS total_orders,
    SUM(fo.quantity) AS total_quantity_sold,
    SUM(fo.line_total) AS total_revenue,
    AVG(fo.unit_price) AS avg_unit_price
FROM fact_orders fo
JOIN dim_products dp ON fo.product_id = dp.product_id
WHERE fo.order_status = 'fulfilled'
GROUP BY dp.product_id, dp.product_name, dp.category, dp.subcategory;

-- Sales summary by time period
CREATE VIEW vw_sales_by_month AS
SELECT 
    dt.year,
    dt.month,
    dt.month_name,
    COUNT(DISTINCT fo.order_number) AS total_orders,
    SUM(fo.line_total) AS total_revenue,
    AVG(fo.line_total) AS avg_order_value
FROM fact_orders fo
JOIN dim_time dt ON fo.time_id = dt.time_id
WHERE fo.order_status = 'fulfilled'
GROUP BY dt.year, dt.month, dt.month_name
ORDER BY dt.year, dt.month;

-- Customer lifetime value
CREATE VIEW vw_customer_ltv AS
SELECT 
    dc.customer_id,
    dc.email,
    dc.first_name,
    dc.last_name,
    COUNT(DISTINCT fo.order_number) AS total_orders,
    SUM(fo.line_total) AS lifetime_value,
    MIN(dt.date) AS first_purchase_date,
    MAX(dt.date) AS last_purchase_date
FROM dim_customers dc
JOIN fact_orders fo ON dc.customer_id = fo.customer_id
JOIN dim_time dt ON fo.time_id = dt.time_id
WHERE fo.order_status = 'fulfilled'
GROUP BY dc.customer_id, dc.email, dc.first_name, dc.last_name;

-- ============================================
-- FUNCTIONS & TRIGGERS
-- ============================================

-- Auto-update timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON dim_products
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_customers_updated_at BEFORE UPDATE ON dim_customers
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON fact_orders
FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- SAMPLE DATA INSERTS (for testing)
-- ============================================

-- Populate dim_time for next 2 years
INSERT INTO dim_time (date, year, quarter, month, month_name, week, day_of_month, day_of_week, day_name, is_weekend, season)
SELECT 
    date::DATE,
    EXTRACT(YEAR FROM date)::INTEGER,
    EXTRACT(QUARTER FROM date)::INTEGER,
    EXTRACT(MONTH FROM date)::INTEGER,
    TO_CHAR(date, 'Month'),
    EXTRACT(WEEK FROM date)::INTEGER,
    EXTRACT(DAY FROM date)::INTEGER,
    EXTRACT(DOW FROM date)::INTEGER,
    TO_CHAR(date, 'Day'),
    CASE WHEN EXTRACT(DOW FROM date) IN (0, 6) THEN TRUE ELSE FALSE END,
    CASE 
        WHEN EXTRACT(MONTH FROM date) IN (3,4,5) THEN 'Spring'
        WHEN EXTRACT(MONTH FROM date) IN (6,7,8) THEN 'Summer'
        WHEN EXTRACT(MONTH FROM date) IN (9,10,11) THEN 'Fall'
        ELSE 'Winter'
    END
FROM generate_series('2025-01-01'::DATE, '2026-12-31'::DATE, '1 day'::INTERVAL) AS date;

-- Sample locations
INSERT INTO dim_locations (location_type, location_name, city, state, delivery_fee, is_active) VALUES
('farm_pickup', 'LMW Farm Pickup', 'Mount Airy', 'NC', 0, TRUE),
('farmers_market', 'Downtown Mount Airy Farmers Market', 'Mount Airy', 'NC', 0, TRUE),
('delivery', 'Local Delivery (Surry County)', 'Mount Airy', 'NC', 5.00, TRUE);

-- Sample products - Eggs
INSERT INTO dim_products (product_name, category, subcategory, description, unit_price, is_active) VALUES
('Rainbow Dozen Eggs', 'animal', 'eggs', 'Mixed color eggs from our heritage breeds', 6.00, TRUE),
('Two Dozen Eggs Special', 'animal', 'eggs', 'Save $2 on 2 dozen eggs', 10.00, TRUE);

-- Sample products - Chicks (Spring 2026)
INSERT INTO dim_products (product_name, category, subcategory, breed, product_type, description, unit_price, is_active) VALUES
('Black Copper Marans Chick - Straight Run', 'animal', 'chicks', 'Black Copper Marans', 'straight_run', 'Day-old chick, unsexed', 8.00, TRUE),
('Black Copper Marans Chick - Pullet', 'animal', 'chicks', 'Black Copper Marans', 'pullet', 'Day-old female chick', 12.00, TRUE),
('Black Copper Marans Chick - Rooster', 'animal', 'chicks', 'Black Copper Marans', 'rooster', 'Day-old male chick', 5.00, TRUE),
('Cream Legbar Chick - Straight Run', 'animal', 'chicks', 'Cream Legbar', 'straight_run', 'Day-old chick, unsexed', 8.00, TRUE),
('Cream Legbar Chick - Pullet', 'animal', 'chicks', 'Cream Legbar', 'pullet', 'Day-old female chick', 12.00, TRUE);

-- Sample products - Merch
INSERT INTO dim_products (product_name, category, subcategory, size, description, unit_price, is_active) VALUES
('LMW Farm T-Shirt', 'merch', 'apparel', 'M', 'Comfortable cotton t-shirt with farm logo', 25.00, TRUE),
('Wooden Egg Holder - 12 count', 'merch', 'egg_holders', NULL, 'Handcrafted wooden egg holder', 20.00, TRUE),
('Egg Scrubber', 'merch', 'tools', NULL, 'Natural bristle egg cleaning brush', 8.00, TRUE);

-- ============================================
-- COMMENTS FOR DOCUMENTATION
-- ============================================

COMMENT ON TABLE fact_orders IS 'Central fact table containing all order transactions with measures';
COMMENT ON TABLE dim_products IS 'Product dimension containing all sellable items';
COMMENT ON TABLE dim_customers IS 'Customer dimension with contact and lifetime value data';
COMMENT ON TABLE dim_time IS 'Time dimension for temporal analysis';
COMMENT ON TABLE dim_locations IS 'Location dimension for pickup/delivery analysis';
COMMENT ON TABLE dim_payment IS 'Payment method and status tracking';