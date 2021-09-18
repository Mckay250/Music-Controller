
from django.urls import path
from .views import RoomView, main

urlpatterns = [
    path('room', RoomView.as_view()),
    path('', main)
]
