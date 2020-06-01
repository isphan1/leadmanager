from django.shortcuts import render
import json
from rest_framework import generics,permissions,mixins
from rest_framework.response import Response
from django.db.models import Q
from rest_framework.views import APIView
from .serializers import registerSerializer
from django.contrib.auth import authenticate,get_user_model
# Create your views here.


from accounts.utils import jwt_response_payload_handler
from rest_framework_jwt.settings import api_settings

jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER
jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER

User = get_user_model()

class RegisterUser(generics.CreateAPIView):

    permission_classes = (permissions.AllowAny,)
    serializer_class = registerSerializer
    queryset = User.objects.all()

    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)
        

class LoginUser(APIView):

    permission_classes = [permissions.AllowAny]

    def post(self,request,*args,**kwargs):

        if request.user.is_authenticated:
            return Response({'detail':'You are already authenticated.'},status=400)

        data = request.data

        username  = data.get('username')
        password  = data.get('password')

        # if username or password is None:
        #     return Response({'msg':'required field cannot blank'})

        user = authenticate(username=username,password=password)

        if user:

            payload = jwt_payload_handler(user)
            token = jwt_encode_handler(payload)
            response = jwt_response_payload_handler(token,user,request=request)

            return Response(response)

        return Response({"msg":{'failed':'Incorrect username or password. please try again !'}},status=401)



