#!/bin/bash

# Simple script to start BOTH backend and frontend servers
# Just run: ./start.sh

echo "🎭 Starting Comedy Shows App..."
echo ""
echo "Starting Backend..."

# Start backend in background
cd backend
./venv/bin/python manage.py runserver &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 2

echo ""
echo "Starting Frontend..."

# Start frontend in foreground
cd ../frontend
npm start

# When frontend is stopped (Ctrl+C), also stop backend
kill $BACKEND_PID 2>/dev/null
