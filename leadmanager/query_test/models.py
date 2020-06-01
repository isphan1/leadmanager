from django.db import models

# Create your models here.

class Author(models.Model):

    name = models.CharField(max_length=200)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Book(models.Model):

    title = models.CharField(max_length=50)
    author = models.ForeignKey(Author,on_delete=models.CASCADE)
    price = models.FloatField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    