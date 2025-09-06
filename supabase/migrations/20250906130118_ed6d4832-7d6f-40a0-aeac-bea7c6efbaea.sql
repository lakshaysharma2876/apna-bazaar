-- Create categories table
CREATE TABLE public.categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create products table
CREATE TABLE public.products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  price DECIMAL(10,2) NOT NULL CHECK (price >= 0),
  image_url TEXT,
  category_id UUID REFERENCES public.categories(id),
  stock_quantity INTEGER DEFAULT 0 CHECK (stock_quantity >= 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create profiles table for user data
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT,
  full_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Create cart_items table
CREATE TABLE public.cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  product_id UUID REFERENCES public.products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1 CHECK (quantity > 0),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, product_id)
);

-- Enable RLS
ALTER TABLE public.categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cart_items ENABLE ROW LEVEL SECURITY;

-- RLS Policies for categories (public read)
CREATE POLICY "Anyone can view categories" ON public.categories FOR SELECT USING (true);

-- RLS Policies for products (public read)
CREATE POLICY "Anyone can view products" ON public.products FOR SELECT USING (true);

-- RLS Policies for profiles
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = id);

-- RLS Policies for cart_items
CREATE POLICY "Users can view own cart items" ON public.cart_items FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own cart items" ON public.cart_items FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Users can update own cart items" ON public.cart_items FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can delete own cart items" ON public.cart_items FOR DELETE USING (auth.uid() = user_id);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for timestamp updates
CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON public.products
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at
  BEFORE UPDATE ON public.cart_items
  FOR EACH ROW
  EXECUTE FUNCTION public.update_updated_at_column();

-- Create function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', '')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Insert dummy categories
INSERT INTO public.categories (name, description) VALUES
('Electronics', 'Electronic devices and gadgets'),
('Clothing', 'Fashion and apparel'),
('Books', 'Books and educational materials'),
('Home & Garden', 'Home improvement and garden supplies'),
('Sports', 'Sports equipment and accessories');

-- Insert dummy products
INSERT INTO public.products (name, description, price, image_url, category_id, stock_quantity) 
SELECT 
  'Smartphone Pro',
  'Latest smartphone with advanced features',
  899.99,
  'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=400',
  c.id,
  50
FROM public.categories c WHERE c.name = 'Electronics'
UNION ALL
SELECT 
  'Wireless Headphones',
  'Premium noise-cancelling wireless headphones',
  299.99,
  'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400',
  c.id,
  75
FROM public.categories c WHERE c.name = 'Electronics'
UNION ALL
SELECT 
  'Designer T-Shirt',
  'Comfortable cotton t-shirt with modern design',
  29.99,
  'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
  c.id,
  100
FROM public.categories c WHERE c.name = 'Clothing'
UNION ALL
SELECT 
  'Denim Jeans',
  'Classic blue denim jeans',
  79.99,
  'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400',
  c.id,
  80
FROM public.categories c WHERE c.name = 'Clothing'
UNION ALL
SELECT 
  'Programming Book',
  'Complete guide to modern web development',
  49.99,
  'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400',
  c.id,
  30
FROM public.categories c WHERE c.name = 'Books'
UNION ALL
SELECT 
  'Coffee Table',
  'Modern wooden coffee table',
  199.99,
  'https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400',
  c.id,
  25
FROM public.categories c WHERE c.name = 'Home & Garden'
UNION ALL
SELECT 
  'Basketball',
  'Professional basketball for indoor/outdoor use',
  39.99,
  'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
  c.id,
  60
FROM public.categories c WHERE c.name = 'Sports';