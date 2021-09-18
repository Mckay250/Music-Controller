from django.shortcuts import render, HttpResponse
from rest_framework import generics
from .serializers import RoomSerializer
from .models import Room


def main(request):
    return HttpResponse("Welcome to Rooms app", request)


class RoomView(generics.ListAPIView, generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer



