from pyairtable import Api
from django.conf import settings
from datetime import datetime
from .models import Show


class AirtableService:
    """Service class for interacting with Airtable API"""
    
    def __init__(self):
        self.api = Api(settings.AIRTABLE_API_KEY)
        self.table = self.api.table(settings.AIRTABLE_BASE_ID, settings.AIRTABLE_TABLE_NAME)
    
    def sync_from_airtable(self):
        """
        Fetch all shows from Airtable and sync to Django database.
        Returns the number of shows synced.
        """
        records = self.table.all()
        synced_count = 0
        
        for record in records:
            try:
                fields = record['fields']
                airtable_id = record['id']
                
                # Parse date_time
                date_time = self._parse_datetime(fields.get('date_time'))
                
                # Update or create show in Django
                show, created = Show.objects.update_or_create(
                    airtable_id=airtable_id,
                    defaults={
                        'title': fields.get('title', ''),
                        'date_time': date_time,
                        'location': fields.get('location', ''),
                        'description': fields.get('description', ''),
                        'comedian': fields.get('comedian', ''),
                        'ticket_price': fields.get('ticket_price'),
                        'ticket_url': fields.get('ticket_url', ''),
                    }
                )
                synced_count += 1
            except Exception as e:
                print(f"Error syncing record {record.get('id')}: {e}")
                continue
        
        return synced_count
    
    def create_show(self, show_data):
        """
        Create a new show in Airtable.
        Returns the created Airtable record.
        """
        fields = {
            'title': show_data.get('title'),
            'date_time': self._format_datetime(show_data.get('date_time')),
            'location': show_data.get('location'),
            'description': show_data.get('description'),
        }
        
        # Add optional fields
        if show_data.get('comedian'):
            fields['comedian'] = show_data.get('comedian')
        if show_data.get('ticket_price'):
            fields['ticket_price'] = float(show_data.get('ticket_price'))
        if show_data.get('ticket_url'):
            fields['ticket_url'] = show_data.get('ticket_url')
        
        return self.table.create(fields)
    
    def update_show(self, airtable_id, show_data):
        """
        Update an existing show in Airtable.
        Returns the updated Airtable record.
        """
        fields = {}
        
        if 'title' in show_data:
            fields['title'] = show_data['title']
        if 'date_time' in show_data:
            fields['date_time'] = self._format_datetime(show_data['date_time'])
        if 'location' in show_data:
            fields['location'] = show_data['location']
        if 'description' in show_data:
            fields['description'] = show_data['description']
        if 'comedian' in show_data:
            fields['comedian'] = show_data['comedian']
        if 'ticket_price' in show_data:
            fields['ticket_price'] = float(show_data['ticket_price'])
        if 'ticket_url' in show_data:
            fields['ticket_url'] = show_data['ticket_url']
        
        return self.table.update(airtable_id, fields)
    
    def delete_show(self, airtable_id):
        """
        Delete a show from Airtable.
        Returns True if successful.
        """
        self.table.delete(airtable_id)
        return True
    
    def _parse_datetime(self, date_str):
        """Parse datetime string from Airtable"""
        if not date_str:
            return datetime.now()
        
        try:
            # Try ISO format first
            return datetime.fromisoformat(date_str.replace('Z', '+00:00'))
        except:
            try:
                # Try common formats
                return datetime.strptime(date_str, '%Y-%m-%d %H:%M:%S')
            except:
                return datetime.now()
    
    def _format_datetime(self, dt):
        """Format datetime for Airtable"""
        if isinstance(dt, str):
            dt = self._parse_datetime(dt)
        return dt.isoformat()
