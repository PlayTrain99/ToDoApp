from django.shortcuts import render
from django.http import HttpResponse

from rest_framework import generics
from rest_framework.permissions import AllowAny
from .models import ToDoIteam
from .serializers import ToDoIteamSerializer

# def welcome(request): 
#     return HttpResponse("http://localhost:3000")

class IteamList(generics.ListCreateAPIView):
    queryset = ToDoIteam.objects.all()
    serializer_class = ToDoIteamSerializer
    permission_classes = [AllowAny]

class IteamDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ToDoIteam.objects.all()
    serializer_class = ToDoIteamSerializer
    permission_classes = [AllowAny]
