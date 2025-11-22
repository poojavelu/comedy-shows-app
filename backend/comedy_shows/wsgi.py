"""
WSGI config for comedy_shows project.
"""

import os

from django.core.wsgi import get_wsgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'comedy_shows.settings')

application = get_wsgi_application()
app = application
