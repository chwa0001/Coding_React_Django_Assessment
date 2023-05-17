from django.db import models

# Create your models here.
class User(models.Model):
    id           = models.AutoField(primary_key=True)
    username     = models.CharField(max_length=200,unique=True)

    class Meta:
        managed = True
        db_table    = "USER_DATABASE"

class Image(models.Model):
    id                  = models.AutoField(primary_key=True)
    userId              = models.ForeignKey(User, on_delete=models.CASCADE)
    uploadedDateTime    = models.DateTimeField(auto_now_add=True,blank=False)
    directory           = models.CharField(max_length=1000,blank=False)
    imagename           = models.CharField(max_length=200)

    class Meta:
        managed = True
        db_table    = "IMAGE_DATABASE"
        unique_together = ('userId','imagename')