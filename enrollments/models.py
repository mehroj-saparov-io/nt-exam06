from django.db import models

class Enrollment(models.Model):
    student = models.ForeignKey(
        'students.Student',   
        on_delete=models.CASCADE,
        related_name='enrollments'
    )
    course = models.ForeignKey(
        'courses.Course',    
        on_delete=models.PROTECT, # 
        related_name='enrollments'
    )
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student} → {self.course}"
