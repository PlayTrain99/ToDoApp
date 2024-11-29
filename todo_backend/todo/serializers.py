from rest_framework import serializers
from .models import ToDoIteam

class ToDoIteamSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoIteam
        fields = '__all__'