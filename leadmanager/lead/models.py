from django.db import models
from django.contrib.auth.models import User


# class LeadQuerySet(models.Queryset):
#     def get_user_lead(self,name):
#         return self.filter(name=name)

# class LeadManager(models.Manager):
#     def get_queryset(self):
#         return LeadQuerySet(self.model,using=self._db)

#     def get_user_lead(self,name):
#         return get_queryset().get_user_lead(name)


class Lead(models.Model):

    name = models.CharField(max_length=200)
    email = models.EmailField(max_length=100,unique=True)
    message = models.TextField(max_length=500,blank=True)
    owner = models.ForeignKey(User,related_name='leads',on_delete=models.CASCADE,null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    # object = LeadManager()


