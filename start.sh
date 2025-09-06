#!/bin/bash

# Apna Bazaar - Startup Script
echo "🚀 Starting Apna Bazaar E-Commerce Store..."

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js first."
    exit 1
fi

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd server
npm install

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd ..
npm install

# Start backend server in background
echo "🔧 Starting backend server..."
cd server
npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend server
echo "🎨 Starting frontend server..."
cd ..
npm run dev &
FRONTEND_PID=$!

echo "✅ Apna Bazaar is now running!"
echo "🌐 Frontend: http://localhost:8080"
echo "🔧 Backend: http://localhost:3001"
echo ""
echo "Press Ctrl+C to stop both servers"

# Wait for user to stop
wait $FRONTEND_PID $BACKEND_PID
