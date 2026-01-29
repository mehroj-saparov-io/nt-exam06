from django.shortcuts import render, redirect, get_object_or_404
from django.views import View
from .models import Student
from .forms import StudentForm

# Studentlar ro'yxati
class StudentListView(View):
    def get(self, request):
        students = Student.objects.all()

        # Filter by minimum age
        min_age = request.GET.get('min_age')
        if min_age:
            try:
                students = students.filter(age__gte=int(min_age))
            except ValueError:
                pass

        # Filter by search query
        search = request.GET.get('search')
        if search:
            students = students.filter(full_name__icontains=search)

        # Har bir studentga kurslar sonini qo'shish
        for student in students:
            student.courses_count = student.enrollments.count()  # <--- enrollments bilan

        return render(request, 'students/students_list.html', {'students': students})


class StudentCreateView(View):
    def get(self, request):
        form = StudentForm()
        return render(request, 'students/student_form.html', {'form': form})

    def post(self, request):
        form = StudentForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('student_list')
        return render(request, 'students/student_form.html', {'form': form})


class StudentDetailView(View):
    def get(self, request, pk):
        student = get_object_or_404(Student, pk=pk)
        enrollments = student.enrollments.all()  # <--- enrollments bilan
        return render(request, 'students/student_detail.html', {
            'student': student,
            'enrollments': enrollments
        })


class StudentDeleteView(View):
    def post(self, request, pk):
        student = get_object_or_404(Student, pk=pk)
        student.delete()
        return redirect('student_list')
