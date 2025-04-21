# views.py
from rest_framework import viewsets
from .models import LoanApplication
from .serializers import LoanApplicationSerializer

class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all().select_related('customer__address', 'customer__employment', 'customer__consent')
    serializer_class = LoanApplicationSerializer
