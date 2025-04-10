from django.db import models

class LoanApplication(models.Model):
    APPLICANT_TYPES = [
        ('IND', 'Individual'),
        ('BUS', 'Business'),
    ]
    
    applicant_name = models.CharField(max_length=100)
    applicant_type = models.CharField(max_length=3, choices=APPLICANT_TYPES)
    loan_amount = models.DecimalField(max_digits=12, decimal_places=2)
    loan_purpose = models.TextField()
    status = models.CharField(max_length=20, default='Pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"{self.applicant_name} - {self.loan_amount}"