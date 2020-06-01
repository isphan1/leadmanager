from django.contrib import admin

from .models import Author,Book
# Register your models here.

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['name','created_at']


@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title','author','price','created_at']