from django.shortcuts import render, redirect, get_object_or_404
from django.contrib import messages
from django.http import HttpRequest, HttpResponse
from django.views import View
from .models import Course
from enrollments.models import Enrollment
from .forms import CourseForm

class GetAllCoursesView(View):
    def get(self, request: HttpRequest) -> HttpResponse:
        courses = Course.objects.all()

        for course in courses:
            course.student_count = course.enrollments.count()

        return render(request, 'courses/courses_list.html', {'courses': courses})

class CourseCreateView(View):
    def get(self, request):
        form = CourseForm()
        return render(request, 'courses/course_form.html', {'form': form})

    def post(self, request):
        form = CourseForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('course_list')
        return render(request, 'courses/course_form.html', {'form': form})

class CourseDetailView(View):
    def get(self, request, pk):
        course = get_object_or_404(Course, pk=pk)

        enrollments = course.enrollments.all()

        return render(request, 'courses/course_detail.html', {
            'course': course,
            'enrollments': enrollments
        })
    
class CourseEditView(View):
    def get(self, request, pk):
        course = get_object_or_404(Course, pk=pk)
        form = CourseForm(instance=course)
        return render(request, 'courses/course_form.html', {'form': form, 'course': course})

    def post(self, request, pk):
        course = get_object_or_404(Course, pk=pk)
        form = CourseForm(request.POST, instance=course)
        if form.is_valid():
            form.save()
            return redirect('course_list')
        return render(request, 'courses/course_form.html', {'form': form, 'course': course})

class CourseDeleteView(View):
    def post(self, request, pk):
        course = get_object_or_404(Course, pk=pk)
        
        if course.enrollments.exists():
            return HttpResponse("Bu kursga studentlar yozilgan. O‘chirish mumkin emas.", status=400)
        
        course.delete()
        return redirect('course_list')