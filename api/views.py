from django.shortcuts import render, HttpResponse
from rest_framework import generics, status
from rest_framework.utils import serializer_helpers
from .serializers import RoomSerializer, CreateRoomSerializer
from .models import Room
from rest_framework.views import APIView
from rest_framework.response import Response


def main(request):
    return HttpResponse("Welcome to Rooms app", request)


class AddRoom(generics.CreateAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

class GetRooms(generics.ListAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class CreateRoomView(APIView):
    serializer_class = CreateRoomSerializer

    def post(self, request, format=None):
        # if current user has no active session with server, create new session
        if not self.request.session.exists(self.request.session.session_key):
            self.request.session.create()

        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            guest_can_pause = serializer.data.get('guest_can_pause')
            votes_to_skip = serializer.data.get('votes_to_skip')
            name = serializer.data.get('name')
            host = self.request.session.session_key
            queryset = Room.objects.filter(host=host)
            if (queryset.exists()):
                room = queryset[0]
                room.guest_can_pause = guest_can_pause
                room.votes_to_skip = votes_to_skip
                room.name = name
                room.save(update_fields=['guest_can_pause', 'votes_to_skip', 'name'])
            else:
                room = Room(host=host, guest_can_pause=guest_can_pause, votes_to_skip=votes_to_skip, name=name)
                room.save()
            
            return Response(RoomSerializer(room).data, status=status.HTTP_201_CREATED)
        

