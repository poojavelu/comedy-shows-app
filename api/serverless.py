import sys
import os
from pathlib import Path

# Add the api directory to Python path
api_dir = Path(__file__).resolve().parent
sys.path.insert(0, str(api_dir))

# Set Django settings
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'comedy_api.settings')

# Import Django setup and WSGI
import django
django.setup()

from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()

# Vercel expects 'app' or 'application'
app = application
