from django.db import models
from django.contrib.auth import get_user_model
from django.db.models import Q
import uuid

# Create your models here.

User = get_user_model()


class BookQuerySet(models.QuerySet):

    def get_author_book(self,name):
        return self.filter(title__icontains=name)

class BookManager(models.Manager):

    def get_queryset(self):
        return BookQuerySet(self.model,using=self._db)
    
    def get_author_book(self,name):
        return self.get_queryset().get_author_book(name)


class Author(models.Model):

    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Book(models.Model):

    title = models.CharField(max_length=120)
    author = models.ManyToManyField(Author)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)
    objects = BookManager()

    def __str__(self):
        return self.title



class Product(models.Model):

    name = models.CharField(max_length=100)
    price = models.FloatField(max_length=4,db_index=True)
    seller = models.ForeignKey(User,on_delete=models.DO_NOTHING)    

    def __str__(self):
        return self.name 

class Order(models.Model):

    statuses = (('pending','pending'),('paid','paid'),('complete','complete'))
    transaction = models.CharField(max_length=50,blank=False,null=True)
    status = models.CharField(choices=statuses,max_length=20)
    total = models.FloatField(max_length=6)
    buyer = models.ForeignKey(User,on_delete=models.DO_NOTHING)
    ordered_at = models.DateField(auto_now_add=True)

    class Meta:
        indexes = [ models.Index(fields=['total'],
                    name='total_idx',
                    condition=Q(status='paid'))
                    ]

    def __str__(self):
        return self.transaction
       


class Invoice(models.Model):

    order = models.ForeignKey(Order,on_delete=models.DO_NOTHING)
    product = models.ForeignKey(Product,on_delete=models.DO_NOTHING)
    quantity = models.IntegerField()
    unit_price = models.FloatField(max_length=5) 

    def __str__(self):
        return "product name - {}".format(self.product.name)