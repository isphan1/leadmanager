from django.shortcuts import render
from rest_framework.response import Response

from .serializers import LeadSerializer
from .models import Lead
from rest_framework import generics,mixins,permissions
from django.template import RequestContext
# Create your views here.

class LeadApiView (mixins.CreateModelMixin,
                    generics.ListAPIView):

    permission_classes = (permissions.AllowAny,)
    serializer_class = LeadSerializer
    # queryset = Lead.objects.all()

    def get_queryset(self):
        return self.request.user.leads.all()

    def perform_create(self,serializer):
        serializer.save(owner=self.request.user)

    def post(self,request,*args,**kwargs):
        return self.create(request,*args,**kwargs)


class LeadDetailApiView(mixins.UpdateModelMixin,
                        mixins.DestroyModelMixin,
                        generics.RetrieveAPIView):

    permission_classes = [permissions.IsAuthenticated]
    serializer_class = LeadSerializer
    queryset = Lead.objects.all()
    lookup_field = 'id'

    def perform_destroy(self,instance):
        if instance is not None:
            return instance.delete()
            return Response({'msg':{'removed':'Item removed'}},status=201)
        return None

    def put(self,request,*args,**kwargs):
        return self.update(request,*args,**kwargs)

    def patch(self,request,*args,**kwargs):
        return self.update(request,*args,**kwargs)

    def delete(self,request,*args,**kwargs):
        return self.destroy(request,*args,**kwargs)

def handler404(request, *args, **kwargs):
    response = render('404.html', {})
    response.status_code = 404
    return response


def handler500(request, *args, **kwargs):
    response = render('500.html', {})
    response.status_code = 500
    return response

def handler403(request, *args, **kwargs):
    response = render('404.html', {})
    response.status_code = 403
    return response

def handler400(request, *args, **kwargs):
    response = render('500.html', {})
    response.status_code = 400
    return response

