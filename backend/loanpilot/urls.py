# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import LoanApplicationViewSet
from api.views import LoanApplicationViewSet
from api.views import LenderViewSet


router = DefaultRouter()
router.register(r'loan-applications', LoanApplicationViewSet, basename='loan-application')
router.register(r'lenders', LenderViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
]


