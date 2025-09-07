# Apna Bazaar - Modern E-Commerce Store

A full-stack e-commerce application built with React and Node.js, featuring a modern UI with Tailwind CSS and a clean, maintainable codebase. This project demonstrates best practices in web development with a focus on simplicity and performance. This website also contains every required features mentioned.

## ✨ Features

-  User Authentication**: Secure sign up and sign in with JWT tokens
-  Product Catalog**: Browse products with advanced filtering and search
-  Shopping Cart**: Add, remove, and manage cart items with real-time updates
-  Responsive Design**: Mobile-first design that works on all devices
-  Modern UI**: Beautiful interface built with Tailwind CSS and custom components
-  Fast Performance**: Optimized with Vite for lightning-fast development and builds
-  Secure**: Password hashing, JWT authentication, and input validation

## Tech Stack

### Frontend
- **React 18** - Modern React with hooks and functional components
- **Vite** - Lightning-fast build tool and development server
- **Tailwind CSS** - Utility-first CSS framework with custom e-commerce theme
- **React Router DOM** - Client-side routing for SPA navigation


### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **SQLite** - Lightweight, serverless database
- **JWT (jsonwebtoken)** - Secure token-based authentication
- **bcryptjs** - Password hashing and verification
- **CORS** - Cross-Origin Resource Sharing middleware
- **Multer** - File upload handling middleware


The frontend of the website is deployed on Vercel.
The backend of the website is deployed on Render.

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
