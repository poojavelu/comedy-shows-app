from django.test import TestCase
from django.utils import timezone
from datetime import timedelta
from .models import Show


class ShowModelTest(TestCase):
    def setUp(self):
        self.show = Show.objects.create(
            airtable_id='rec123456',
            title='Test Comedy Show',
            date_time=timezone.now() + timedelta(days=7),
            location='Comedy Club Downtown',
            description='A hilarious comedy show!',
            comedian='John Doe',
            ticket_price=25.00
        )

    def test_show_creation(self):
        """Test that a show is created correctly"""
        self.assertEqual(self.show.title, 'Test Comedy Show')
        self.assertEqual(self.show.location, 'Comedy Club Downtown')
        self.assertEqual(self.show.comedian, 'John Doe')

    def test_show_string_representation(self):
        """Test the string representation of a show"""
        expected = f"{self.show.title} - {self.show.date_time}"
        self.assertEqual(str(self.show), expected)
