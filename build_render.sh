#!/usr/bin/env bash
# Exit on error
set -o errexit

# Install dependencies
pip install -r requirements.txt

# Run migrations
cd api
python manage.py migrate
python manage.py collectstatic --no-input
