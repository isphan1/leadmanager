from django.urls import path
from .views import LeadApiView,LeadDetailApiView

urlpatterns = [
    path('',LeadApiView.as_view()),
    path('<id>',LeadDetailApiView.as_view())

]

handler404 = 'lead.views.handler400'
handler500 = 'lead.views.handler500'
handler403 = 'lead.views.handler403'
handler400 = 'lead.views.handler400'