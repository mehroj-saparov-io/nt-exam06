from django import forms
from .models import Student

class StudentForm(forms.ModelForm):
    class Meta:
        model = Student
        fields = ['full_name', 'email', 'age']

    def clean_age(self):
        age = self.cleaned_data.get('age')
        if age is None:
            raise forms.ValidationError("Yosh maydoni majburiy")
        if age < 16:
            raise forms.ValidationError("Student yoshini 16 dan kichik bo‘lishi mumkin emas")
        return age
