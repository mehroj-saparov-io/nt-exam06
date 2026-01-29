from django.urls import path
from .views import(
    GetAllStudetsView
)

urlpatterns = [
    path('', GetAllStudetsView.as_view(), name='students'),
]
