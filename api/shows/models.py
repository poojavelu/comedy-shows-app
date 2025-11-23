from django.db import models


class Show(models.Model):
    """Model for storing comedy show data from Airtable"""
    airtable_id = models.CharField(max_length=255, unique=True)
    title = models.CharField(max_length=255)
    date_time = models.DateTimeField()
    location = models.CharField(max_length=255)
    description = models.TextField()
    comedian = models.CharField(max_length=255, blank=True, null=True)
    ticket_price = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    ticket_url = models.URLField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = ['date_time']

    def __str__(self):
        return f"{self.title} - {self.date_time}"
