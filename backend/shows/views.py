from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from datetime import datetime
from .airtable_service import AirtableService


class ShowListCreateView(APIView):
    """
    API endpoint for listing all shows and creating new shows
    GET: List all shows
    POST: Create a new show
    """
    
    def get(self, request):
        """Get all shows from Airtable"""
        try:
            airtable_service = AirtableService()
            shows = airtable_service.get_all_shows()
            
            # Optional: Filter by upcoming/past based on query param
            filter_type = request.query_params.get('filter', None)
            
            if filter_type:
                today = datetime.now().strftime('%Y-%m-%d')
                if filter_type.lower() == 'upcoming':
                    shows = [show for show in shows if show.get('date', '') >= today]
                elif filter_type.lower() == 'past':
                    shows = [show for show in shows if show.get('date', '') < today]
            
            return Response({
                'success': True,
                'count': len(shows),
                'data': shows
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'success': False,
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def post(self, request):
        """Create a new show in Airtable"""
        try:
            airtable_service = AirtableService()
            
            # Extract data from request
            data = {
                'Title': request.data.get('title'),
                'Date': request.data.get('date'),
                'Location': request.data.get('location'),
                'Description': request.data.get('description'),
                'Ticket Link': request.data.get('ticket_link', ''),
            }
            
            # Validate required fields
            if not all([data['Title'], data['Date'], data['Location']]):
                return Response({
                    'success': False,
                    'error': 'Title, Date, and Location are required fields'
                }, status=status.HTTP_400_BAD_REQUEST)
            
            show = airtable_service.create_show(data)
            
            return Response({
                'success': True,
                'data': show
            }, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({
                'success': False,
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ShowDetailView(APIView):
    """
    API endpoint for retrieving, updating, and deleting individual shows
    GET: Retrieve a show
    PUT: Update a show
    DELETE: Delete a show
    """
    
    def get(self, request, record_id):
        """Get a single show by ID"""
        try:
            airtable_service = AirtableService()
            show = airtable_service.get_show(record_id)
            
            return Response({
                'success': True,
                'data': show
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'success': False,
                'error': str(e)
            }, status=status.HTTP_404_NOT_FOUND)
    
    def put(self, request, record_id):
        """Update a show"""
        try:
            airtable_service = AirtableService()
            
            # Extract data from request
            data = {}
            if 'title' in request.data:
                data['Title'] = request.data['title']
            if 'date' in request.data:
                data['Date'] = request.data['date']
            if 'location' in request.data:
                data['Location'] = request.data['location']
            if 'description' in request.data:
                data['Description'] = request.data['description']
            if 'ticket_link' in request.data:
                data['Ticket Link'] = request.data['ticket_link']
            
            show = airtable_service.update_show(record_id, data)
            
            return Response({
                'success': True,
                'data': show
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'success': False,
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def delete(self, request, record_id):
        """Delete a show"""
        try:
            airtable_service = AirtableService()
            result = airtable_service.delete_show(record_id)
            
            return Response({
                'success': True,
                'message': result['message']
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                'success': False,
                'error': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
