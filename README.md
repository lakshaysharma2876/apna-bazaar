# Apna Bazaar - Modern E-Commerce Store

A full-stack e-commerce application built with React and Node.js, featuring a modern UI with Tailwind CSS and a clean, maintainable codebase. This project demonstrates best practices in web development with a focus on simplicity and performance.

## ✨ Features

- **🔐 User Authentication**: Secure sign up and sign in with JWT tokens
- **🛍️ Product Catalog**: Browse products with advanced filtering and search
- **🛒 Shopping Cart**: Add, remove, and manage cart items with real-time updates
- **📱 Responsive Design**: Mobile-first design that works on all devices
- **🎨 Modern UI**: Beautiful interface built with Tailwind CSS and custom components
- **⚡ Fast Performance**: Optimized with Vite for lightning-fast development and builds
- **🔒 Secure**: Password hashing, JWT authentication, and input validation

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom e-commerce theme
- **React Router DOM** - Client-side routing for SPA navigation
- **Axios** - Promise-based HTTP client for API communication
- **Lucide React** - Beautiful, customizable icon library
- **clsx** - Utility for constructing className strings conditionally


### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **SQLite** - Lightweight, serverless database
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **bcryptjs** - Password hashing and verification
- **CORS** - Cross-Origin Resource Sharing middleware
- **Multer** - File upload handling middleware

## 📁 Project Structure

```
apna-bazaar/
├── server/                     # Backend Node.js application
│   ├── server.js              # Main server file with Express setup
│   ├── package.json           # Backend dependencies
│   ├── ecommerce.db           # SQLite database file
│   └── uploads/               # File upload directory
├── src/                       # Frontend React application
│   ├── components/            # Reusable UI components
│   │   ├── Header.jsx        # Navigation header component
│   │   ├── ProductCard.jsx   # Product display component
│   │   └── SimpleToast.jsx   # Simple toast notification system
│   ├── hooks/                # Custom React hooks
│   │   ├── useAuth.jsx       # Authentication hook
│   │   └── useCart.jsx       # Shopping cart hook
│   ├── lib/                  # Utility functions and API client
│   │   ├── api.js            # API client configuration
│   │   └── utils.ts          # Utility functions
│   ├── pages/                # Page components
│   │   ├── Auth.jsx          # Authentication page
│   │   ├── Cart.jsx          # Shopping cart page
│   │   ├── Index.jsx         # Home page
│   │   ├── Products.jsx      # Products listing page
│   │   └── NotFound.jsx      # 404 error page
│   ├── App.jsx               # Main App component
│   ├── App.css               # App-specific styles
│   ├── index.css             # Global styles and Tailwind imports
│   └── main.jsx              # React entry point
├── public/                   # Static assets
│   ├── favicon.ico           # Site favicon
│   └── placeholder.svg       # Placeholder image
├── dist/                     # Production build output
├── package.json              # Frontend dependencies
├── tailwind.config.ts        # Tailwind CSS configuration
├── postcss.config.js         # PostCSS configuration
├── vite.config.js           # Vite build configuration
└── README.md                 # Project documentation
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js) or **yarn**
- **Git** (for cloning the repository)

### 📦 Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd apna-bazaar
   ```

2. **Install backend dependencies**
   ```bash
   cd server
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ..
   npm install
   ```

### 🏃‍♂️ Running the Application

#### Option 1: Manual Start (Recommended for Development)

1. **Start the backend server**
   ```bash
   cd server
   npm run dev
   ```
   The backend will run on `http://localhost:3001`

2. **Start the frontend development server** (in a new terminal)
   ```bash
   npm run dev
   ```
   The frontend will run on `http://localhost:8080`

3. **Open your browser**
   Navigate to `http://localhost:8080` to see the application

#### Option 2: Quick Start Script

Use the provided start script for convenience:
```bash
./start.sh
```

### 🏗️ Building for Production

1. **Build the frontend**
   ```bash
   npm run build
   ```

2. **Preview the production build**
   ```bash
   npm run preview
   ```

## 🔌 API Endpoints

### 🔐 Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user

### 🛍️ Products
- `GET /api/products` - Get all products (with optional filters)
- `GET /api/products/:id` - Get a specific product
- `GET /api/categories` - Get all product categories

### 🛒 Cart Management
- `GET /api/cart` - Get user's cart items
- `POST /api/cart` - Add item to cart
- `PUT /api/cart/:productId` - Update item quantity
- `DELETE /api/cart/:productId` - Remove item from cart
- `DELETE /api/cart` - Clear entire cart

### 📁 File Upload
- `POST /api/upload` - Upload product images

## 🗄️ Database Schema

The application uses SQLite with the following tables:

- **users** - User accounts and authentication data
- **categories** - Product categories and metadata
- **products** - Product information, pricing, and inventory
- **cart_items** - Shopping cart items linked to users

## 📊 Sample Data

The application comes with pre-populated sample data including:

- **5 Product Categories**: Electronics, Clothing, Books, Home & Garden, Sports
- **8 Sample Products**: Realistic products with pricing, descriptions, and images
- **Test User Account**: Ready-to-use credentials for testing

## 🎨 Styling & UI

### Tailwind CSS Configuration

The project uses **pure Tailwind CSS** with a simplified approach:

- **No Custom UI Components**: All styling is done directly with Tailwind classes
- **Custom Color Palette**: Brand colors, success/warning states, and e-commerce specific colors
- **Built-in Animations**: Using standard Tailwind animations (bounce, pulse, spin)
- **Responsive Design**: Mobile-first approach with custom breakpoints
- **Dark Mode Support**: Built-in dark mode with CSS variables
- **Simple & Clean**: Easy to understand and modify styling

### Custom CSS Classes

The project includes custom utility classes defined in `tailwind.config.ts`:

- `.text-gradient` - Gradient text effect
- `.card-hover` - Card hover animations
- `.product-card` - Product card hover effects
- `.btn-primary` - Primary button styling
- `.price-text` - Styled price display
- `.sale-badge` - Sale/discount badges

## 🛠️ Development Notes

### 🎯 Design Philosophy

This project demonstrates a **simple, maintainable** approach to web development:

1. **⚡ Performance First**: Vite for fast builds, optimized bundle sizes
2. **🎨 Pure Tailwind CSS**: No custom UI components, just Tailwind classes
3. **🔧 Maintainable Code**: Clean, readable JavaScript with React hooks
4. **📱 Mobile-First**: Responsive design that works on all devices
5. **🔒 Security**: Proper authentication, input validation, and password hashing
6. **📦 Minimal Dependencies**: Only essential packages, no bloat
7. **🎯 Simple & Clean**: Easy to understand and modify codebase

### 🏗️ Key Design Decisions

- **Vite**: Chosen for lightning-fast development and optimized production builds
- **Pure Tailwind CSS**: No custom UI components, just Tailwind utility classes
- **SQLite**: Lightweight database perfect for development and small-scale production
- **JWT Authentication**: Stateless authentication for scalability
- **Simple Components**: Direct Tailwind styling instead of complex UI libraries
- **RESTful API**: Clean, predictable API design following REST principles
- **File Structure**: Organized, scalable folder structure for easy maintenance

### 🚀 Performance Optimizations

- **Code Splitting**: Automatic code splitting with Vite
- **Tree Shaking**: Unused code elimination in production builds
- **CSS Optimization**: Tailwind CSS purging for minimal CSS bundles
- **Image Optimization**: Efficient image handling and lazy loading
- **Caching**: Proper HTTP caching headers for static assets
- **Minimal Dependencies**: Reduced bundle size by removing unnecessary packages
- **Simple Components**: No complex UI libraries, just Tailwind classes

## 🤝 Contributing

This project is designed to be educational and maintainable. We welcome contributions!

### How to Contribute

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```
3. **Make your changes**
4. **Test your changes**
   ```bash
   npm run build
   npm run preview
   ```
5. **Commit your changes**
   ```bash
   git commit -m "Add: your feature description"
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/your-feature-name
   ```
7. **Submit a pull request**

### Development Guidelines

- Follow the existing code style and structure
- Add comments for complex logic
- Test your changes thoroughly
- Update documentation if needed
- Keep commits focused and descriptive

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🆘 Support & Troubleshooting

### Common Issues

**CSS not rendering properly?**
- Make sure Tailwind CSS is properly configured
- Check that all dependencies are installed
- Try rebuilding the project: `npm run build`

**Authentication not working?**
- Verify the backend server is running on port 3001
- Check that JWT tokens are being stored correctly
- Ensure CORS is properly configured

**Database issues?**
- SQLite database file should be in the `server/` directory
- Check that the database schema is properly initialized
- Verify file permissions for the database file

### Getting Help

- 📧 **Open an issue** for bug reports or feature requests
- 💬 **Start a discussion** for questions or general help
- 📖 **Check the documentation** for detailed setup instructions

---

**Built with ❤️ using React, Node.js, and Tailwind CSS**