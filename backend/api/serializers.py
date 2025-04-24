# serializers.py
from rest_framework import serializers
from .models import Customer, Address, Employment, Consent, LoanApplication

class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        exclude = ['customer']

class EmploymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employment
        exclude = ['customer']

class ConsentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Consent
        exclude = ['customer']

class CustomerSerializer(serializers.ModelSerializer):
    address = AddressSerializer(read_only=True)
    employment = EmploymentSerializer(read_only=True)
    consent = ConsentSerializer(read_only=True)

    class Meta:
        model = Customer
        fields = '__all__'

class LoanApplicationSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer()

    class Meta:
        model = LoanApplication
        fields = '__all__'

    def create(self, validated_data):
        raw_data = self.initial_data.get('customer', {})
        address_data = raw_data.get('address')
        employment_data = raw_data.get('employment')
        consent_data = raw_data.get('consent')

        if not address_data:
            raise serializers.ValidationError("Missing address data.")
        if not employment_data:
            raise serializers.ValidationError("Missing employment data.")
        if not consent_data:
            raise serializers.ValidationError("Missing consent data.")

        # Extract customer fields (excluding nested ones)
        customer_fields = [
            'title', 'first_name', 'middle_name', 'last_name',
            'dob', 'email', 'phone', 'marital_status'
        ]
        customer_data = {key: raw_data[key] for key in customer_fields if key in raw_data}

        # Create customer and related objects
        customer = Customer.objects.create(**customer_data)
        Address.objects.create(customer=customer, **address_data)
        Employment.objects.create(customer=customer, **employment_data)
        Consent.objects.create(customer=customer, **consent_data)
        validated_data.pop('customer', None)
        loan_application = LoanApplication.objects.create(customer=customer, **validated_data)
        return loan_application
    
   
    def update(self, instance, validated_data):
        customer_data = validated_data.pop('customer', {})
        address_data = customer_data.pop('address', {})
        employment_data = customer_data.pop('employment', {})
        consent_data = customer_data.pop('consent', {})

        # Update Customer
        for attr, value in customer_data.items():
            setattr(instance.customer, attr, value)
        instance.customer.save()

        # Fix these lines 👇 if you are using OneToOneField instead of ForeignKey
        address = instance.customer.address
        for attr, value in address_data.items():
            setattr(address, attr, value)
        address.save()

        employment = instance.customer.employment
        for attr, value in employment_data.items():
            setattr(employment, attr, value)
        employment.save()

        consent = instance.customer.consent
        for attr, value in consent_data.items():
            setattr(consent, attr, value)
        consent.save()

        # Update LoanApplication
        for attr, value in validated_data.items():
            setattr(instance, attr, value)
        instance.save()

        return instance

