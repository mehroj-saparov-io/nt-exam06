from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse
from django.views import View
from .models import Course
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

