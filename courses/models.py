from django.db import models
from django.core.exceptions import ValidationError

class Course(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    duration_weeks = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.duration_weeks <= 0:
            raise ValidationError("Duration must be greater than 0")

    def __str__(self):
        return self.title
