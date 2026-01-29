from django.urls import path
from .views import(
    GetAllCoursesView,
    CourseCreateView,
    CourseDetailView
)

urlpatterns = [
    path('', GetAllCoursesView.as_view(), name='course_list'),
    path('create/', CourseCreateView.as_view(), name='course_create'),
    path('<int:pk>/', CourseDetailView.as_view(), name='course_detail')
]