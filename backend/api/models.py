from django.db import models

class Customer(models.Model):
    title = models.CharField(max_length=10, default='Mr')
    first_name = models.CharField(max_length=100)
    middle_name = models.CharField(max_length=100, blank=True, null=True)
    last_name = models.CharField(max_length=100)
    dob = models.DateField()
    email = models.EmailField()
    phone = models.CharField(max_length=20)
    marital_status = models.CharField(max_length=50, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

class Address(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, related_name='address')
    residential_status = models.CharField(max_length=100)
    residency_status = models.CharField(max_length=100)
    unit_number = models.CharField(max_length=10, blank=True)
    street_number = models.CharField(max_length=10)
    street_name = models.CharField(max_length=100)
    street_type = models.CharField(max_length=50)
    alley = models.CharField(max_length=100, blank=True)
    suburb = models.CharField(max_length=100)
    state = models.CharField(max_length=50)
    postcode = models.CharField(max_length=10)

class Employment(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, related_name='employment')
    employment_status = models.CharField(max_length=100)
    employment_years = models.IntegerField()
    employment_months = models.IntegerField()
    net_income = models.DecimalField(max_digits=10, decimal_places=2)
    monthly_expenses = models.DecimalField(max_digits=10, decimal_places=2)
    income_frequency = models.CharField(max_length=50)
    next_pay_day = models.DateField()

class Consent(models.Model):
    customer = models.OneToOneField(Customer, on_delete=models.CASCADE, related_name='consent')
    receives_govt_benefits = models.BooleanField(default=False)
    recent_short_term_loans = models.BooleanField(default=False)
    consent_lead_gen = models.BooleanField(default=False)
    agree_terms = models.BooleanField(default=False)
    want_offers = models.BooleanField(default=False)

class LoanApplication(models.Model):
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, related_name='applications')
    requested_amount = models.DecimalField(max_digits=10, decimal_places=2)
    loan_purpose = models.CharField(max_length=255)
    referral_source = models.CharField(max_length=255, blank=True)
    status = models.CharField(max_length=50, default='not approved')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

class Lender(models.Model):
    name = models.CharField(max_length=255)
    contact_email = models.EmailField()
    supported_loan_types = models.CharField(max_length=255, help_text="Comma-separated values")
    min_loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    max_loan_amount = models.DecimalField(max_digits=10, decimal_places=2)
    employment_preferences = models.TextField(help_text="E.g. Accept Centrelink, Full-time only")
    credit_profile_preferences = models.TextField(help_text="E.g. No defaults, Credit score above 600")

    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

def __str__(self):
    return self.name
