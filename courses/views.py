from django.shortcuts import render, redirect, get_object_or_404
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