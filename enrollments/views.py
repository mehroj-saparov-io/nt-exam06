from django.shortcuts import render, redirect
from django.views import View
from .models import Enrollment
from .forms import EnrollmentForm

class EnrollmentListView(View):
    def get(self, request):
        enrollments = Enrollment.objects.all()
        return render(request, 'enrollments/enrollment_list.html', {'enrollments': enrollments})


class EnrollmentCreateView(View):
    def get(self, request):
        form = EnrollmentForm()
        return render(request, 'enrollments/enrollment_form.html', {'form': form})

    def post(self, request):
        form = EnrollmentForm(request.POST)
        if form.is_valid():
            student = form.cleaned_data['student']
            course = form.cleaned_data['course']

            # Validatsiya: bitta student bir kursga faqat 1 marta yozilishi mumkin
            if Enrollment.objects.filter(student=student, course=course).exists():
                form.add_error(None, 'Bu student allaqachon shu kursga yozilgan!')
                return render(request, 'enrollments/enrollment_form.html', {'form': form})

            Enrollment.objects.create(student=student, course=course)
            return redirect('enrollment_list')

        return render(request, 'enrollments/enrollment_form.html', {'form': form})
