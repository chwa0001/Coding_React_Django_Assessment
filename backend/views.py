from django.shortcuts import render

from rest_framework.views import APIView
from rest_framework import generics,status
from rest_framework.response import Response
from django.http import HttpResponse

from .models import User,Image
from .serializers import UserSerializer,ImageSerializer,ImageByUserSerializer

import os
from django.conf import settings
import json
from django.utils import timezone

class UserImageView(APIView):

    def get(self, request, format=None):
        try:
            userid      = request.GET.get('userid')
            queryset    = Image.objects.filter(userId=userid).order_by('uploadedDateTime')
            if queryset.exists():
                imageList   = [ImageByUserSerializer(instance).data for instance in queryset]
                return Response({'images':imageList},status=status.HTTP_200_OK)
            else:
                return Response({'images':[]},status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
            print(e)
            return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)
        
class CreateUserView(APIView):
    
    def post(self, request, format=None):
        
        try:
            username = request.data.get('username')
            queryset = User.objects.filter(username=username)
            if queryset.exists():
                return Response({'error':'User has been created'},status=status.HTTP_302_FOUND)
            else:
                userData = User(username=username)
                userData.save()
                return Response({'data':UserSerializer(userData).data},status=status.HTTP_201_CREATED)
        
        except Exception as e:
            print(e)
            return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)

class GetUsers(APIView):
    
    def get(self, request, format=None):

        try:
            queryset = User.objects.all()
            usersData = [UserSerializer(data).data for data in queryset]
            return Response({'data':usersData},status=status.HTTP_200_OK)
        
        except Exception as e:
            print(e)
            return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)

        
class UploadImageView(APIView):

    def post(self, request, format=None):
        try:
            data            = json.load(request.FILES.get('document'))
            userid          = data.get('userid')
            user_queryset   = User.objects.filter(id=userid)
            if user_queryset.exists():
                pathUser = os.path.join(settings.MEDIA_ROOT[0],'images',str(userid))
                if not os.path.exists(pathUser):
                    os.makedirs(pathUser)
                file = request.FILES.get('file')
                fileDirectory = os.path.join(pathUser,file.name)
                if os.path.exists(fileDirectory):
                    message             = 'Image is uploaded and overwritten the file with same name!'
                    replyStatus         = status.HTTP_200_OK
                    image_queryset      = Image.objects.filter(imagename=file.name,userId=userid)
                    if image_queryset.exists():
                        imageData                       = image_queryset[0]
                        imageData.uploadedDateTime      = timezone.now()
                    else:
                        imageData                       = Image(userId=user_queryset[0],directory=fileDirectory,imagename=file.name)
                else:
                    message = 'Image is uploaded!'
                    replyStatus         = status.HTTP_201_CREATED
                    imageData           = Image(userId=user_queryset[0],directory=fileDirectory,imagename=file.name)
                    
                with open(fileDirectory,'wb') as f:
                    f.write(file.read())
                
                imageData.save()

                return Response({'message':message,'imageid':1},status=replyStatus)    
            else:        
                return Response({'message':'Cannot find the user id in database!'},status=status.HTTP_401_UNAUTHORIZED)
        except Exception as e:
            print(e)
            return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)

class ShowImageView(APIView):
    
    def get(self, request, format=None):
        try:
            imageid         = request.GET.get('imageid')
            image_queryset  = Image.objects.filter(id=imageid)
            if image_queryset.exists():
                imageData = image_queryset[0]
                directory = imageData.directory
                fileType = imageData.imagename.split('.')[-1]

                if fileType in ['png','jpeg','svg']:
                    if os.path.exists(directory):
                        with open(directory,'rb') as f:
                            data = f.read()

                        return HttpResponse(data,content_type=f'image/{fileType}',status=status.HTTP_200_OK)
                    else:
                        return HttpResponse(None,content_type='image/png',status=status.HTTP_204_NO_CONTENT)
                else:
                    return HttpResponse({'error':'Incorrect file type of the image!'},status=status.HTTP_415_UNSUPPORTED_MEDIA_TYPE)
                
            else:
                return HttpResponse(None,content_type='image/png',status=status.HTTP_204_NO_CONTENT)
        except Exception as e:
                print(e)
                return Response({'error':str(e)},status=status.HTTP_400_BAD_REQUEST)
