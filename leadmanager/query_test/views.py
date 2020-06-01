from django.shortcuts import render
from django.db.models import Avg,Sum,Min,Max,Count
from django.http import HttpResponse
from .models import Author,Book
# Create your views here.

def index():

    return HttpResponse({'a':"abc"})


