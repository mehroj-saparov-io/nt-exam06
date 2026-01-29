from django.urls import path
from .views import(
    GetAllEnrollmentsView
)

urlpatterns = [
    path('', GetAllEnrollmentsView.as_view(), name='enrollments'),
]
