from django.urls import path
from .views import(
    GetAllCoursesView,
    CourseCreateView
)

urlpatterns = [
    path('', GetAllCoursesView.as_view(), name='course_list'),
    path('create/', CourseCreateView.as_view(), name='course_create'),
]