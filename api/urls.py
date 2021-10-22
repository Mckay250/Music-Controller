
from django.urls import path
from .views import AddRoom, CreateRoomView, GetRooms, main

urlpatterns = [
    path('rooms/', GetRooms.as_view()),
    path('rooms/add', CreateRoomView.as_view()),
    path('', main)
]
