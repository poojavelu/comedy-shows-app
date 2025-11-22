"""
ASGI config for comedy_shows project.
"""

import os

from django.core.asgi import get_asgi_application

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'comedy_shows.settings')

application = get_asgi_application()
