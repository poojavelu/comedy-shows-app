from rest_framework import serializers
from .models import Show


class ShowSerializer(serializers.ModelSerializer):
    class Meta:
        model = Show
        fields = ['id', 'airtable_id', 'title', 'date_time', 'location', 
                  'description', 'comedian', 'ticket_price', 'ticket_url',
                  'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
