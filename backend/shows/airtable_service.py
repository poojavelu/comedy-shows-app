from django.conf import settings
from pyairtable import Api


class AirtableService:
    """Service to interact with Airtable API"""
    
    def __init__(self):
        self.api = Api(settings.AIRTABLE_TOKEN)
        self.table = self.api.table(settings.AIRTABLE_BASE_ID, settings.AIRTABLE_TABLE_NAME)
    
    def get_all_shows(self):
        """Get all shows from Airtable"""
        try:
            records = self.table.all()
            return [self._format_record(record) for record in records]
        except Exception as e:
            raise Exception(f"Error fetching shows from Airtable: {str(e)}")
    
    def get_show(self, record_id):
        """Get a single show by record ID"""
        try:
            record = self.table.get(record_id)
            return self._format_record(record)
        except Exception as e:
            raise Exception(f"Error fetching show from Airtable: {str(e)}")
    
    def create_show(self, data):
        """Create a new show in Airtable"""
        try:
            record = self.table.create(data)
            return self._format_record(record)
        except Exception as e:
            raise Exception(f"Error creating show in Airtable: {str(e)}")
    
    def update_show(self, record_id, data):
        """Update an existing show in Airtable"""
        try:
            record = self.table.update(record_id, data)
            return self._format_record(record)
        except Exception as e:
            raise Exception(f"Error updating show in Airtable: {str(e)}")
    
    def delete_show(self, record_id):
        """Delete a show from Airtable"""
        try:
            self.table.delete(record_id)
            return {"message": "Show deleted successfully"}
        except Exception as e:
            raise Exception(f"Error deleting show from Airtable: {str(e)}")
    
    def _format_record(self, record):
        """Format Airtable record to a consistent structure"""
        fields = record.get('fields', {})
        return {
            'id': record.get('id'),
            'title': fields.get('Title', ''),
            'date': fields.get('Date', ''),
            'location': fields.get('Location', ''),
            'description': fields.get('Description', ''),
            'ticket_link': fields.get('Ticket Link', ''),
            'created_time': record.get('createdTime', ''),
        }
