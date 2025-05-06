# views.py
from rest_framework import viewsets
from .models import LoanApplication
from .serializers import LoanApplicationSerializer
from .models import Lender
from .serializers import LenderSerializer
from django.contrib.auth.models import User
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.views import TokenObtainPairView



class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all().select_related('customer__address', 'customer__employment', 'customer__consent')
    serializer_class = LoanApplicationSerializer

class LenderViewSet(viewsets.ModelViewSet):
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer

class StaffSignupView(APIView):
    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')
        
        if not (username and password):
            return Response(
                {"error": "Username and password required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.create_user(username, email, password)
            return Response(
                {"message": "Staff account created!", "user_id": user.id},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class StaffLoginView(TokenObtainPairView):
    pass