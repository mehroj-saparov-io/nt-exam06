from django.shortcuts import render
from django.http import HttpRequest, HttpResponse
from django.views import View


class GetAllStudetsView(View):
    def get(self, request: HttpRequest) -> HttpResponse:
        return HttpResponse('Students list page')
