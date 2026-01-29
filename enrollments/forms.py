from django import forms
from students.models import Student
from courses.models import Course

class EnrollmentForm(forms.Form):
    student = forms.ModelChoiceField(queryset=Student.objects.all())
    course = forms.ModelChoiceField(queryset=Course.objects.all())
