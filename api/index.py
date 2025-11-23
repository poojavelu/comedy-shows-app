import os
import sys

# Add api directory to path
sys.path.insert(0, os.path.dirname(__file__))

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'comedy_api.settings')

from comedy_api.wsgi import application

# Vercel handler
app = application
