-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE users (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    clerk_id TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
    phone TEXT,
    company_name TEXT,
    company_email TEXT,
    country TEXT,
    city TEXT,
    location TEXT,
    shipment_address TEXT,
    emergency_contact TEXT,
    is_admin BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for users
CREATE INDEX idx_users_clerk_id ON users(clerk_id);
CREATE INDEX idx_users_email ON users(email);

-- Admin login history table
CREATE TABLE admin_login_history (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    username TEXT NOT NULL,
    login_time TIMESTAMP WITH TIME ZONE NOT NULL,
    ip_address TEXT,
    user_agent TEXT,
    success BOOLEAN NOT NULL,
    failure_reason TEXT
);

-- Create indexes for admin_login_history
CREATE INDEX idx_admin_login_history_username ON admin_login_history(username);
CREATE INDEX idx_admin_login_history_login_time ON admin_login_history(login_time);
CREATE INDEX idx_admin_login_history_success ON admin_login_history(success);

-- Categories table
CREATE TABLE categories (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    image_url TEXT,
    slug TEXT UNIQUE NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for categories
CREATE INDEX idx_categories_slug ON categories(slug);
CREATE INDEX idx_categories_is_active ON categories(is_active);

-- Products table
CREATE TABLE products (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    short_description TEXT,
    price DECIMAL(10,2) NOT NULL,
    compare_price DECIMAL(10,2),
    category_id UUID REFERENCES categories(id) ON DELETE CASCADE,
    images TEXT[] DEFAULT '{}',
    main_image TEXT NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    is_featured BOOLEAN DEFAULT FALSE,
    is_top_rated BOOLEAN DEFAULT FALSE,
    is_best_selling BOOLEAN DEFAULT FALSE,
    stock_quantity INTEGER DEFAULT 0,
    sku TEXT UNIQUE NOT NULL,
    weight TEXT,
    weight_in_grams INTEGER,
    product_size TEXT,
    asking_price DECIMAL(10,2),
    manufacturing_cost TEXT,
    estimate_shipping_cost TEXT,
    ready_to_ship BOOLEAN,
    dimensions JSONB,
    tags TEXT[] DEFAULT '{}',
    rating DECIMAL(3,2) DEFAULT 0,
    review_count INTEGER DEFAULT 0,
    estimated_delivery TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for products
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_is_active ON products(is_active);
CREATE INDEX idx_products_is_featured ON products(is_featured);
CREATE INDEX idx_products_sku ON products(sku);

-- Orders table
CREATE TABLE orders (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    order_number TEXT UNIQUE NOT NULL,
    status TEXT CHECK (status IN ('pending', 'confirmed', 'processing', 'shipped', 'delivered', 'cancelled')) DEFAULT 'pending',
    items JSONB NOT NULL,
    subtotal DECIMAL(10,2) NOT NULL,
    shipping_cost DECIMAL(10,2) NOT NULL,
    tax DECIMAL(10,2) NOT NULL,
    total DECIMAL(10,2) NOT NULL,
    shipping_address JSONB NOT NULL,
    payment_status TEXT CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')) DEFAULT 'pending',
    payment_method TEXT,
    notes TEXT,
    estimated_delivery TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for orders
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_order_number ON orders(order_number);

-- Reviews table
CREATE TABLE reviews (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    title TEXT,
    comment TEXT NOT NULL,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for reviews
CREATE INDEX idx_reviews_product_id ON reviews(product_id);
CREATE INDEX idx_reviews_user_id ON reviews(user_id);
CREATE INDEX idx_reviews_rating ON reviews(rating);

-- Cart items table
CREATE TABLE cart_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Create indexes for cart_items
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_cart_items_user_product ON cart_items(user_id, product_id);

-- Wishlist items table
CREATE TABLE wishlist_items (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    product_id UUID REFERENCES products(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, product_id)
);

-- Create indexes for wishlist_items
CREATE INDEX idx_wishlist_items_user_id ON wishlist_items(user_id);
CREATE INDEX idx_wishlist_items_user_product ON wishlist_items(user_id, product_id);

-- Contact submissions table
CREATE TABLE contact_submissions (
    id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone_number TEXT,
    whatsapp_number TEXT,
    company_name TEXT,
    company_email TEXT,
    country TEXT,
    location TEXT,
    city TEXT,
    product_quantity INTEGER,
    shipment_address TEXT,
    emergency_contact TEXT,
    message TEXT,
    status TEXT CHECK (status IN ('new', 'in_progress', 'completed', 'cancelled')) DEFAULT 'new',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for contact_submissions
CREATE INDEX idx_contact_submissions_status ON contact_submissions(status);
CREATE INDEX idx_contact_submissions_email ON contact_submissions(email);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_categories_updated_at BEFORE UPDATE ON categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_reviews_updated_at BEFORE UPDATE ON reviews FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
CREATE TRIGGER update_contact_submissions_updated_at BEFORE UPDATE ON contact_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Enable Row Level Security (RLS)
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE admin_login_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE cart_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlist_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Create RLS policies (basic policies - you may want to customize these based on your auth requirements)
-- For now, allowing all operations for authenticated users
CREATE POLICY "Allow all operations for authenticated users" ON users FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users" ON admin_login_history FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users" ON categories FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users" ON products FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users" ON orders FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users" ON reviews FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users" ON cart_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users" ON wishlist_items FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow all operations for authenticated users" ON contact_submissions FOR ALL USING (auth.role() = 'authenticated');

-- Additional policies to allow anonymous role for client-side CRUD used by the app
-- WARNING: These are permissive for development. Tighten before production.
CREATE POLICY "Allow all operations for anonymous users" ON users FOR ALL USING (auth.role() = 'anon');
CREATE POLICY "Allow all operations for anonymous users" ON admin_login_history FOR ALL USING (auth.role() = 'anon');
CREATE POLICY "Allow all operations for anonymous users" ON categories FOR ALL USING (auth.role() = 'anon');
CREATE POLICY "Allow all operations for anonymous users" ON products FOR ALL USING (auth.role() = 'anon');
CREATE POLICY "Allow all operations for anonymous users" ON orders FOR ALL USING (auth.role() = 'anon');
CREATE POLICY "Allow all operations for anonymous users" ON reviews FOR ALL USING (auth.role() = 'anon');
CREATE POLICY "Allow all operations for anonymous users" ON cart_items FOR ALL USING (auth.role() = 'anon');
CREATE POLICY "Allow all operations for anonymous users" ON wishlist_items FOR ALL USING (auth.role() = 'anon');
CREATE POLICY "Allow all operations for anonymous users" ON contact_submissions FOR ALL USING (auth.role() = 'anon');
