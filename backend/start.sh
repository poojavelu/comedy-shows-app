#!/bin/bash

# Simple script to start the backend server
# Just run: ./start.sh

cd "$(dirname "$0")"

echo "🚀 Starting Comedy Shows Backend..."
echo ""

# Activate virtual environment and start server
./venv/bin/python manage.py runserver
