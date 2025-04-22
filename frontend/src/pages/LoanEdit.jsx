// LoanEdit.jsx
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoanEdit = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/loan-applications/${id}/`)
            .then((res) => {
                setFormData(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to load loan application:', err);
                setLoading(false);
            });
    }, [id]);

    const handleChange = (section, field, value) => {
        setFormData(prev => {
            const updated = { ...prev };
            if (section) {
                updated.customer[section][field] = value;
            } else if (field.startsWith('customer.')) {
                const key = field.split('.')[1];
                updated.customer[key] = value;
            } else {
                updated[field] = value;
            }
            return updated;
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await axios.put(`http://localhost:8000/api/loan-applications/${id}/`, formData);
            alert('Loan updated successfully!');
            navigate('/loan-list');
        } catch (error) {
            console.error('Error updating loan:', error);
            alert('Update failed. See console for details.');
        } finally {
            setSaving(false);
        }
    };

    if (loading || !formData) return <div>Loading...</div>;

    const { customer, requested_amount, loan_purpose, referral_source, status } = formData;
    const { first_name, last_name, middle_name, title, dob, email, phone, marital_status, address, employment, consent } = customer;

    return (
        <form onSubmit={handleSubmit} className="loan-edit-form">
            <h2>Edit Loan Application</h2>

            <h4>Personal Info</h4>
            <input value={title} onChange={(e) => handleChange(null, 'customer.title', e.target.value)} placeholder="Title" />
            <input value={first_name} onChange={(e) => handleChange(null, 'customer.first_name', e.target.value)} placeholder="First Name" />
            <input value={middle_name} onChange={(e) => handleChange(null, 'customer.middle_name', e.target.value)} placeholder="Middle Name" />
            <input value={last_name} onChange={(e) => handleChange(null, 'customer.last_name', e.target.value)} placeholder="Last Name" />
            <input type="date" value={dob} onChange={(e) => handleChange(null, 'customer.dob', e.target.value)} />
            <input value={email} onChange={(e) => handleChange(null, 'customer.email', e.target.value)} placeholder="Email" />
            <input value={phone} onChange={(e) => handleChange(null, 'customer.phone', e.target.value)} placeholder="Phone" />
            <input value={marital_status} onChange={(e) => handleChange(null, 'customer.marital_status', e.target.value)} placeholder="Marital Status" />

            <h4>Address</h4>
            <input value={address.unit_number} onChange={(e) => handleChange('address', 'unit_number', e.target.value)} placeholder="Unit #" />
            <input value={address.street_number} onChange={(e) => handleChange('address', 'street_number', e.target.value)} placeholder="Street #" />
            <input value={address.street_name} onChange={(e) => handleChange('address', 'street_name', e.target.value)} placeholder="Street Name" />
            <input value={address.street_type} onChange={(e) => handleChange('address', 'street_type', e.target.value)} placeholder="Street Type" />
            <input value={address.suburb} onChange={(e) => handleChange('address', 'suburb', e.target.value)} placeholder="Suburb" />
            <input value={address.state} onChange={(e) => handleChange('address', 'state', e.target.value)} placeholder="State" />
            <input value={address.postcode} onChange={(e) => handleChange('address', 'postcode', e.target.value)} placeholder="Postcode" />

            <h4>Employment</h4>
            <input value={employment.employment_status} onChange={(e) => handleChange('employment', 'employment_status', e.target.value)} placeholder="Employment Status" />
            <input value={employment.employment_years} onChange={(e) => handleChange('employment', 'employment_years', e.target.value)} placeholder="Years Employed" />
            <input value={employment.employment_months} onChange={(e) => handleChange('employment', 'employment_months', e.target.value)} placeholder="Months Employed" />
            <input value={employment.net_income} onChange={(e) => handleChange('employment', 'net_income', e.target.value)} placeholder="Net Income" />
            <input value={employment.monthly_expenses} onChange={(e) => handleChange('employment', 'monthly_expenses', e.target.value)} placeholder="Monthly Expenses" />
            <input value={employment.income_frequency} onChange={(e) => handleChange('employment', 'income_frequency', e.target.value)} placeholder="Income Frequency" />
            <input type="date" value={employment.next_pay_day} onChange={(e) => handleChange('employment', 'next_pay_day', e.target.value)} />

            <h4>Consent</h4>
            <label>
                <input type="checkbox" checked={consent.receives_govt_benefits} onChange={(e) => handleChange('consent', 'receives_govt_benefits', e.target.checked)} /> Receives Govt Benefits
            </label>
            <label>
                <input type="checkbox" checked={consent.recent_short_term_loans} onChange={(e) => handleChange('consent', 'recent_short_term_loans', e.target.checked)} /> Recent Short Term Loans
            </label>
            <label>
                <input type="checkbox" checked={consent.consent_lead_gen} onChange={(e) => handleChange('consent', 'consent_lead_gen', e.target.checked)} /> Lead Gen Consent
            </label>
            <label>
                <input type="checkbox" checked={consent.agree_terms} onChange={(e) => handleChange('consent', 'agree_terms', e.target.checked)} /> Agree Terms
            </label>
            <label>
                <input type="checkbox" checked={consent.want_offers} onChange={(e) => handleChange('consent', 'want_offers', e.target.checked)} /> Wants Offers
            </label>

            <h4>Loan</h4>
            <input value={requested_amount} onChange={(e) => handleChange(null, 'requested_amount', e.target.value)} placeholder="Requested Amount" />
            <input value={loan_purpose} onChange={(e) => handleChange(null, 'loan_purpose', e.target.value)} placeholder="Loan Purpose" />
            <input value={referral_source} onChange={(e) => handleChange(null, 'referral_source', e.target.value)} placeholder="Referral Source" />
            <select value={status} onChange={(e) => handleChange(null, 'status', e.target.value)}>
                <option value="draft">Draft</option>
                <option value="submitted">Submitted</option>
                <option value="under_review">Under Review</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
            </select>

            <button type="submit" disabled={saving}>
                {saving ? 'Saving...' : 'Update Loan'}
            </button>
        </form>
    );
};

export default LoanEdit;
