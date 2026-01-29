from django.db import models
from django.core.exceptions import ValidationError

class Student(models.Model):
    full_name = models.CharField(max_length=150)
    email = models.EmailField(unique=True)
    age = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        if self.age is None:
            raise ValidationError("Yosh maydoni majburiy")
        if self.age < 16:
            raise ValidationError("Student yoshini 16 dan kichik bo‘lishi mumkin emas")

    def __str__(self):
        return self.full_name
