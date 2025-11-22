#!/bin/bash

echo "🎭 Comedy Shows App - Quick Start Script"
echo "========================================"
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Get the directory where the script is located
SCRIPT_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" && pwd )"

echo -e "${BLUE}Step 1: Setting up Backend${NC}"
echo "----------------------------"

cd "$SCRIPT_DIR/backend"

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating Python virtual environment..."
    python3 -m venv venv
fi

echo "Activating virtual environment..."
source venv/bin/activate

echo "Installing Python dependencies..."
pip install -r requirements.txt

echo "Running Django migrations..."
python manage.py migrate

echo -e "${GREEN}✓ Backend setup complete!${NC}"
echo ""

echo -e "${BLUE}Step 2: Setting up Frontend${NC}"
echo "----------------------------"

cd "$SCRIPT_DIR/frontend"

echo "Installing Node.js dependencies..."
npm install

echo -e "${GREEN}✓ Frontend setup complete!${NC}"
echo ""

echo -e "${YELLOW}Setup Complete!${NC}"
echo ""
echo "To start the application:"
echo ""
echo "Terminal 1 (Backend):"
echo "  cd backend"
echo "  source venv/bin/activate"
echo "  python manage.py runserver"
echo ""
echo "Terminal 2 (Frontend):"
echo "  cd frontend"
echo "  npm start"
echo ""
echo "Then open http://localhost:3000 in your browser"
echo ""
echo -e "${GREEN}Happy coding! 🚀${NC}"
