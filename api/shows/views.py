from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.utils import timezone
from datetime import datetime
from .models import Show
from .serializers import ShowSerializer
from .airtable_service import AirtableService


class ShowViewSet(viewsets.ModelViewSet):
    """
    ViewSet for managing comedy shows.
    Supports CRUD operations and syncs with Airtable.
    """
    serializer_class = ShowSerializer
    
    def get_queryset(self):
        """
        Filter shows based on query parameters.
        Supports 'filter' parameter: 'upcoming' or 'past'
        """
        queryset = Show.objects.all()
        filter_type = self.request.query_params.get('filter', None)
        
        if filter_type == 'upcoming':
            queryset = queryset.filter(date_time__gte=timezone.now())
        elif filter_type == 'past':
            queryset = queryset.filter(date_time__lt=timezone.now())
        
        return queryset
    
    def list(self, request, *args, **kwargs):
        """List shows and sync with Airtable first"""
        try:
            # Sync with Airtable before listing
            airtable_service = AirtableService()
            airtable_service.sync_from_airtable()
        except Exception as e:
            print(f"Error syncing with Airtable: {e}")
        
        return super().list(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        """Create a show in both Django and Airtable"""
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        try:
            # Create in Airtable
            airtable_service = AirtableService()
            airtable_record = airtable_service.create_show(serializer.validated_data)
            
            # Save to Django with Airtable ID
            serializer.validated_data['airtable_id'] = airtable_record['id']
            self.perform_create(serializer)
            
            headers = self.get_success_headers(serializer.data)
            return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
        except Exception as e:
            return Response(
                {'error': f'Failed to create show: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def update(self, request, *args, **kwargs):
        """Update a show in both Django and Airtable"""
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        
        try:
            # Update in Airtable
            airtable_service = AirtableService()
            airtable_service.update_show(instance.airtable_id, serializer.validated_data)
            
            # Update in Django
            self.perform_update(serializer)
            
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {'error': f'Failed to update show: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    def destroy(self, request, *args, **kwargs):
        """Delete a show from both Django and Airtable"""
        instance = self.get_object()
        
        try:
            # Delete from Airtable
            airtable_service = AirtableService()
            airtable_service.delete_show(instance.airtable_id)
            
            # Delete from Django
            self.perform_destroy(instance)
            
            return Response(status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            return Response(
                {'error': f'Failed to delete show: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
    
    @action(detail=False, methods=['post'])
    def sync(self, request):
        """Manually trigger sync from Airtable"""
        try:
            airtable_service = AirtableService()
            synced_count = airtable_service.sync_from_airtable()
            return Response({
                'message': f'Successfully synced {synced_count} shows from Airtable'
            })
        except Exception as e:
            return Response(
                {'error': f'Failed to sync: {str(e)}'}, 
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
