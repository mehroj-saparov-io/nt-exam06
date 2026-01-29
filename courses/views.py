from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views import View


class GetAllCoursesView(View):
    def get(self, request: HttpRequest) -> HttpResponse:
        return HttpResponse('Welcome to the Courses page')
