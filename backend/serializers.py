from rest_framework  import serializers
from .models import User,Image

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        exclude = ['id']

class ImageByUserSerializer(serializers.BaseSerializer):
    def to_representation(self, instance):
        return {
            'datetime': instance.uploadedDateTime.astimezone(),
            'imagename': instance.imagename,
            'imageid': instance.id,
        }
