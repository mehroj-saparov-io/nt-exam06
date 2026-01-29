from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views import View


class GetAllEnrollmentsView(View):
    def get(self, request: HttpRequest) -> HttpRequest:
        return HttpResponse('Enrollments list')
