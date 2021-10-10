
from django.urls import path
from .views import AddRoom, GetRooms, main

urlpatterns = [
    path('room/list', GetRooms.as_view()),
    path('room/add', AddRoom.as_view()),
    path('', main)
]
