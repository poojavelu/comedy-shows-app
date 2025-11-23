#!/bin/bash

# Build script for Vercel

# Install Python dependencies
cd api
pip install -r requirements.txt

# Run migrations
python manage.py migrate --noinput

# Collect static files
python manage.py collectstatic --noinput

# Build frontend
cd ..
npm install
npm run build
