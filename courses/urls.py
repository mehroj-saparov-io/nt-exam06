from django.urls import path, include
from .views import(
    GetAllCoursesView
)

urlpatterns = [
    path('', GetAllCoursesView.as_view(), name='courses')
]