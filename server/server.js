const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const sqlite3 = require('sqlite3').verbose();
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors({
  origin: ['https://your-vercel-domain.vercel.app'],
  credentials: true
}));
app.use(express.json());
app.use('/uploads', express.static('uploads'));

// Create uploads directory if it doesn't exist
if (!fs.existsSync('uploads')) {
  fs.mkdirSync('uploads');
}

// Database setup
const db = new sqlite3.Database('ecommerce.db');

// Initialize database tables
db.serialize(() => {
  // Users table
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    full_name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Categories table
  db.run(`CREATE TABLE IF NOT EXISTS categories (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  )`);

  // Products table
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price REAL NOT NULL,
    image_url TEXT,
    stock_quantity INTEGER DEFAULT 0,
    category_id INTEGER,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (category_id) REFERENCES categories (id)
  )`);

  // Cart items table
  db.run(`CREATE TABLE IF NOT EXISTS cart_items (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER DEFAULT 1,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users (id),
    FOREIGN KEY (product_id) REFERENCES products (id),
    UNIQUE(user_id, product_id)
  )`);

  // Insert sample data
  db.run(`INSERT OR IGNORE INTO categories (name) VALUES 
    ('Electronics'), ('Clothing'), ('Books'), ('Home & Garden'), ('Sports')`);

  db.run(`INSERT OR IGNORE INTO products (name, description, price, image_url, stock_quantity, category_id) VALUES 
    ('iPhone 15', 'Latest iPhone with advanced features', 999.99, '/placeholder.svg', 50, 1),
    ('Samsung Galaxy S24', 'Premium Android smartphone', 899.99, '/placeholder.svg', 30, 1),
    ('MacBook Pro', 'Powerful laptop for professionals', 1999.99, '/placeholder.svg', 20, 1),
    ('Nike Air Max', 'Comfortable running shoes', 129.99, '/placeholder.svg', 100, 4),
    ('Adidas T-Shirt', 'Comfortable cotton t-shirt', 29.99, '/placeholder.svg', 200, 2),
    ('JavaScript Guide', 'Complete guide to JavaScript', 39.99, '/placeholder.svg', 75, 3),
    ('Coffee Maker', 'Automatic drip coffee maker', 89.99, '/placeholder.svg', 40, 4),
    ('Yoga Mat', 'Non-slip yoga mat', 49.99, '/placeholder.svg', 60, 4)`);
});

// File upload configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Auth middleware
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ error: 'Invalid token' });
    }
    req.user = user;
    next();
  });
};

// Auth routes
app.post('/api/auth/register', async (req, res) => {
  try {
    const { email, password, fullName } = req.body;

    if (!email || !password || !fullName) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    // Check if user already exists
    db.get('SELECT id FROM users WHERE email = ?', [email], async (err, row) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (row) {
        return res.status(400).json({ error: 'User already exists' });
      }

      // Hash password and create user
      const hashedPassword = await bcrypt.hash(password, 10);
      
      db.run('INSERT INTO users (email, password, full_name) VALUES (?, ?, ?)', 
        [email, hashedPassword, fullName], function(err) {
          if (err) {
            return res.status(500).json({ error: 'Failed to create user' });
          }

          const token = jwt.sign({ id: this.lastID, email }, JWT_SECRET);
          res.json({ token, user: { id: this.lastID, email, fullName } });
        });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    db.get('SELECT * FROM users WHERE email = ?', [email], async (err, user) => {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }

      if (!user) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const validPassword = await bcrypt.compare(password, user.password);
      if (!validPassword) {
        return res.status(400).json({ error: 'Invalid credentials' });
      }

      const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET);
      res.json({ token, user: { id: user.id, email: user.email, fullName: user.full_name } });
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Products routes
app.get('/api/products', (req, res) => {
  const { search, category, minPrice, maxPrice, sortBy } = req.query;
  
  let query = `
    SELECT p.*, c.name as category_name 
    FROM products p 
    LEFT JOIN categories c ON p.category_id = c.id 
    WHERE 1=1
  `;
  const params = [];

  if (search) {
    query += ' AND p.name LIKE ?';
    params.push(`%${search}%`);
  }

  if (category && category !== 'all') {
    query += ' AND p.category_id = ?';
    params.push(category);
  }

  if (minPrice) {
    query += ' AND p.price >= ?';
    params.push(minPrice);
  }

  if (maxPrice) {
    query += ' AND p.price <= ?';
    params.push(maxPrice);
  }

  switch (sortBy) {
    case 'price_asc':
      query += ' ORDER BY p.price ASC';
      break;
    case 'price_desc':
      query += ' ORDER BY p.price DESC';
      break;
    default:
      query += ' ORDER BY p.name ASC';
  }

  db.all(query, params, (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.get('/api/categories', (req, res) => {
  db.all('SELECT * FROM categories ORDER BY name', (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

// Cart routes
app.get('/api/cart', authenticateToken, (req, res) => {
  const query = `
    SELECT ci.*, p.name, p.price, p.image_url, p.stock_quantity
    FROM cart_items ci
    JOIN products p ON ci.product_id = p.id
    WHERE ci.user_id = ?
  `;
  
  db.all(query, [req.user.id], (err, rows) => {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json(rows);
  });
});

app.post('/api/cart', authenticateToken, (req, res) => {
  const { productId, quantity = 1 } = req.body;

  if (!productId) {
    return res.status(400).json({ error: 'Product ID is required' });
  }

  const query = `
    INSERT OR REPLACE INTO cart_items (user_id, product_id, quantity)
    VALUES (?, ?, COALESCE((SELECT quantity FROM cart_items WHERE user_id = ? AND product_id = ?), 0) + ?)
  `;

  db.run(query, [req.user.id, productId, req.user.id, productId, quantity], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true });
  });
});

app.put('/api/cart/:productId', authenticateToken, (req, res) => {
  const { productId } = req.params;
  const { quantity } = req.body;

  if (quantity < 1) {
    return res.status(400).json({ error: 'Quantity must be at least 1' });
  }

  db.run('UPDATE cart_items SET quantity = ? WHERE user_id = ? AND product_id = ?',
    [quantity, req.user.id, productId], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true });
    });
});

app.delete('/api/cart/:productId', authenticateToken, (req, res) => {
  const { productId } = req.params;

  db.run('DELETE FROM cart_items WHERE user_id = ? AND product_id = ?',
    [req.user.id, productId], function(err) {
      if (err) {
        return res.status(500).json({ error: 'Database error' });
      }
      res.json({ success: true });
    });
});

app.delete('/api/cart', authenticateToken, (req, res) => {
  db.run('DELETE FROM cart_items WHERE user_id = ?', [req.user.id], function(err) {
    if (err) {
      return res.status(500).json({ error: 'Database error' });
    }
    res.json({ success: true });
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
