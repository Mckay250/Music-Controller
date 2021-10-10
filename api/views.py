from django.shortcuts import render, HttpResponse
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room


def main(request):
    return HttpResponse("Welcome to Rooms app", request)


class AddRoom(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRooms(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer
