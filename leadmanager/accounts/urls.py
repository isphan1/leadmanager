from django.urls import path
from accounts import views
from rest_framework_jwt.views import refresh_jwt_token,obtain_jwt_token

urlpatterns = [
    path('register/',views.RegisterUser.as_view()),
    path('login/',views.LoginUser.as_view()),
    path('jwt/',obtain_jwt_token),
    path('jwt/refresh',refresh_jwt_token)

]
