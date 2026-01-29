from django.urls import path
from .views import(
    GetAllCoursesView,
    CourseCreateView,
    CourseDetailView,
    CourseEditView,
    CourseDeleteView
)

urlpatterns = [
    path('', GetAllCoursesView.as_view(), name='course_list'),
    path('create/', CourseCreateView.as_view(), name='course_create'),
    path('<int:pk>/', CourseDetailView.as_view(), name='course_detail'),
    path('<int:pk>/edit/', CourseEditView.as_view(), name='course_edit'),
    path('<int:pk>/delete/', CourseDeleteView.as_view(), name='course_delete'),
]