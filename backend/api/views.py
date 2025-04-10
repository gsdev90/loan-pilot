from rest_framework import viewsets
from .models import LoanApplication
from .serializers import LoanApplicationSerializer

class LoanApplicationViewSet(viewsets.ModelViewSet):
    queryset = LoanApplication.objects.all()
    serializer_class = LoanApplicationSerializer