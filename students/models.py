from django.db import models
from django.core.exceptions import ValidationError

class Student(models.Model):
    full_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    age = models.PositiveIntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.age < 16:
            raise ValidationError("Student age must be at least 16")

    def __str__(self):
        return self.full_name
