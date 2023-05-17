from django.urls import path
from . import views

urlpatterns = [
    path('userimage', views.UserImageView.as_view()),
    path('upload', views.UploadImageView.as_view()),
    path('image', views.ShowImageView.as_view()),
    path('createUser', views.CreateUserView.as_view()),
    path('getUsers', views.GetUsers.as_view()),
]