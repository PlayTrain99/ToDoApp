from django.urls import path
from .views import IteamDetail, IteamList

urlpatterns = [
    path('iteams/', IteamList.as_view(), name='iteam-list'),
    path('iteams/<int:pk>/', IteamDetail.as_view(), name='iteam-detail'),
]
