from django.contrib import admin
from .models import Author,Book,Product,Order,Invoice
# Register your models here.

@admin.register(Author)
class AuthorAdmin(admin.ModelAdmin):
    list_display = ['id','name','created_at']

@admin.register(Book)
class BookAdmin(admin.ModelAdmin):
    list_display = ['title','price','created_at']
    search_fields = ('title',)


@admin.register(Product)
class ProductAdmin(admin.ModelAdmin):
    list_display = ['name','price','seller']

@admin.register(Order)
class OrderAdmin(admin.ModelAdmin):
    list_display = ['buyer','total','status','ordered_at']
    list_filter = ['status','ordered_at']
    search_fields = ('buyer__username',)


@admin.register(Invoice)
class InvoiceAdmin(admin.ModelAdmin):
    list_display = ['product','quantity','unit_price','order']
