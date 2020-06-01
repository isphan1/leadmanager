from django.urls import path
from query_test import views
urlpatterns = [
    path('',views.index)
]
