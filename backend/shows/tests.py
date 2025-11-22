from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APITestCase
from rest_framework import status
from unittest.mock import patch, MagicMock


class ShowsAPITestCase(APITestCase):
    """Test cases for Shows API endpoints"""
    
    def setUp(self):
        """Set up test data"""
        self.sample_show = {
            'id': 'recTEST123',
            'title': 'Test Comedy Show',
            'date': '2025-12-01',
            'location': 'Test Venue',
            'description': 'Test description',
            'ticket_link': 'https://test.com',
            'created_time': '2025-11-20T10:00:00.000Z'
        }
    
    @patch('shows.views.AirtableService')
    def test_get_all_shows(self, mock_airtable):
        """Test retrieving all shows"""
        # Mock Airtable service
        mock_instance = MagicMock()
        mock_instance.get_all_shows.return_value = [self.sample_show]
        mock_airtable.return_value = mock_instance
        
        # Make request
        url = reverse('show-list-create')
        response = self.client.get(url)
        
        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertEqual(len(response.data['data']), 1)
        self.assertEqual(response.data['data'][0]['title'], 'Test Comedy Show')
    
    @patch('shows.views.AirtableService')
    def test_create_show(self, mock_airtable):
        """Test creating a new show"""
        # Mock Airtable service
        mock_instance = MagicMock()
        mock_instance.create_show.return_value = self.sample_show
        mock_airtable.return_value = mock_instance
        
        # Make request
        url = reverse('show-list-create')
        data = {
            'title': 'Test Comedy Show',
            'date': '2025-12-01',
            'location': 'Test Venue',
            'description': 'Test description',
        }
        response = self.client.post(url, data, format='json')
        
        # Assert
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['data']['title'], 'Test Comedy Show')
    
    @patch('shows.views.AirtableService')
    def test_get_single_show(self, mock_airtable):
        """Test retrieving a single show"""
        # Mock Airtable service
        mock_instance = MagicMock()
        mock_instance.get_show.return_value = self.sample_show
        mock_airtable.return_value = mock_instance
        
        # Make request
        url = reverse('show-detail', kwargs={'record_id': 'recTEST123'})
        response = self.client.get(url)
        
        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['data']['id'], 'recTEST123')
    
    @patch('shows.views.AirtableService')
    def test_update_show(self, mock_airtable):
        """Test updating a show"""
        # Mock Airtable service
        updated_show = self.sample_show.copy()
        updated_show['title'] = 'Updated Title'
        mock_instance = MagicMock()
        mock_instance.update_show.return_value = updated_show
        mock_airtable.return_value = mock_instance
        
        # Make request
        url = reverse('show-detail', kwargs={'record_id': 'recTEST123'})
        data = {'title': 'Updated Title'}
        response = self.client.put(url, data, format='json')
        
        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
        self.assertEqual(response.data['data']['title'], 'Updated Title')
    
    @patch('shows.views.AirtableService')
    def test_delete_show(self, mock_airtable):
        """Test deleting a show"""
        # Mock Airtable service
        mock_instance = MagicMock()
        mock_instance.delete_show.return_value = {'message': 'Show deleted successfully'}
        mock_airtable.return_value = mock_instance
        
        # Make request
        url = reverse('show-detail', kwargs={'record_id': 'recTEST123'})
        response = self.client.delete(url)
        
        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
    
    @patch('shows.views.EmailService')
    @patch('shows.views.AirtableService')
    def test_send_email(self, mock_airtable, mock_email):
        """Test sending email"""
        # Mock services
        mock_airtable_instance = MagicMock()
        mock_airtable_instance.get_show.return_value = self.sample_show
        mock_airtable.return_value = mock_airtable_instance
        
        mock_email_instance = MagicMock()
        mock_email_instance.send_show_email.return_value = {
            'status': 'success',
            'status_code': 202,
            'message': 'Email sent'
        }
        mock_email.return_value = mock_email_instance
        
        # Make request
        url = reverse('send-email')
        data = {
            'email': 'test@example.com',
            'first_name': 'Test',
            'show_id': 'recTEST123'
        }
        response = self.client.post(url, data, format='json')
        
        # Assert
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertTrue(response.data['success'])
