# views.py
from rest_framework import viewsets
from .models import LoanApplication
from .serializers import LoanApplicationSerializer
from .models import Lender
from .serializers import LenderSerializer

class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all().select_related('customer__address', 'customer__employment', 'customer__consent')
    serializer_class = LoanApplicationSerializer

class LenderViewSet(viewsets.ModelViewSet):
    queryset = Lender.objects.all()
    serializer_class = LenderSerializer
