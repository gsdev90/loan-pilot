# urls.py
from django.urls import path, include
from rest_framework.routers import DefaultRouter
# from .views import LoanApplicationViewSet
from api.views import LoanApplicationViewSet
from api.views import LenderViewSet
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import StaffSignupView
from api.views import StaffLoginView


router = DefaultRouter()
router.register(r'loan-applications', LoanApplicationViewSet, basename='loan-application')
router.register(r'lenders', LenderViewSet)

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/signup/', StaffSignupView.as_view(), name='staff-signup'),
    path('api/login/', StaffLoginView.as_view(), name='staff-login'),
]


