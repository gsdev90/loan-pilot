// src/pages/LoanDetail.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const LoanDetail = () => {
    const { id } = useParams();
    const [loan, setLoan] = useState(null);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/loan-applications/${id}/`)
            .then((res) => setLoan(res.data))
            .catch((err) => console.error('Error fetching loan details:', err));
    }, [id]);

    if (!loan) return <div>Loading...</div>;

    const { customer, requested_amount, loan_purpose, referral_source, status, created_at } = loan;
    const { address, employment, consent } = customer;

    return (
        <div style={{ padding: '2rem' }}>
            <h2>Loan Application Detail</h2>
            <p><strong>Name:</strong> {customer.title} {customer.first_name} {customer.middle_name} {customer.last_name}</p>
            <p><strong>DOB:</strong> {customer.dob}</p>
            <p><strong>Email:</strong> {customer.email}</p>
            <p><strong>Phone:</strong> {customer.phone}</p>
            <p><strong>Marital Status:</strong> {customer.marital_status}</p>

            <h3>Address</h3>
            <p>{address.unit_number} {address.street_number} {address.street_name} {address.street_type}, {address.suburb}, {address.state} {address.postcode}</p>
            <p><strong>Residential Status:</strong> {address.residential_status}</p>
            <p><strong>Residency Status:</strong> {address.residency_status}</p>

            <h3>Employment</h3>
            <p><strong>Status:</strong> {employment.employment_status}</p>
            <p><strong>Years/Months:</strong> {employment.employment_years} years, {employment.employment_months} months</p>
            <p><strong>Net Income:</strong> ${employment.net_income}</p>
            <p><strong>Monthly Expenses:</strong> ${employment.monthly_expenses}</p>
            <p><strong>Income Frequency:</strong> {employment.income_frequency}</p>
            <p><strong>Next Pay Day:</strong> {employment.next_pay_day}</p>

            <h3>Consent</h3>
            <p>Receives Govt Benefits: {consent.receives_govt_benefits ? 'Yes' : 'No'}</p>
            <p>Short Term Loans Recently: {consent.recent_short_term_loans ? 'Yes' : 'No'}</p>
            <p>Consent Lead Gen: {consent.consent_lead_gen ? 'Yes' : 'No'}</p>
            <p>Agree Terms: {consent.agree_terms ? 'Yes' : 'No'}</p>
            <p>Wants Offers: {consent.want_offers ? 'Yes' : 'No'}</p>

            <h3>Loan Info</h3>
            <p><strong>Requested Amount:</strong> ${requested_amount}</p>
            <p><strong>Purpose:</strong> {loan_purpose}</p>
            <p><strong>Referral Source:</strong> {referral_source}</p>
            <p><strong>Status:</strong> {status}</p>
            <p><strong>Submitted:</strong> {new Date(created_at).toLocaleDateString()}</p>
        </div>
    );
};

export default LoanDetail;


