// src/pages/LoanApplication.jsx
import React, { useState } from 'react';
import {
    Button,
    TextField,
    Select,
    MenuItem,
    Typography,
    Container,
    Box,
    InputLabel,
    FormControl,
    FormGroup,
    FormControlLabel,
    Checkbox,
    Grid
} from '@mui/material';
import axios from 'axios';

export default function LoanApplication() {
    const [formData, setFormData] = useState({
        requested_amount: '',
        loan_purpose: '',
        title: '',
        first_name: '',
        middle_name: '',
        last_name: '',
        dob: '',
        email: '',
        phone: '',
        marital_status: '',
        residential_status: '',
        residency_status: '',
        unit_number: '',
        street_number: '',
        street_name: '',
        street_type: '',
        alley: '',
        suburb: '',
        state: '',
        postcode: '',
        referral_source: '',
        employment_status: '',
        employment_years: '',
        employment_months: '',
        net_income: '',
        monthly_expenses: '',
        income_frequency: '',
        next_pay_day: '',
        receives_govt_benefits: false,
        recent_short_term_loans: false,
        consent_lead_gen: false,
        agree_terms: false,
        want_offers: false
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/loans/', formData);
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Submission error:', error.response?.data || error.message);
            alert('Submission failed. Check console for details.');
        }
    };

    return (
        <Container maxWidth="md">
            <Typography variant="h4" gutterBottom>Loan Application</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <Typography variant="h6">Loan Details</Typography>
                <TextField name="requested_amount" label="Requested Amount" fullWidth margin="normal" onChange={handleChange} />
                <TextField name="loan_purpose" label="Loan Reason" fullWidth margin="normal" onChange={handleChange} />

                <Typography variant="h6" mt={3}>Personal Details</Typography>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Title</InputLabel>
                    <Select name="title" value={formData.title} onChange={handleChange}>
                        <MenuItem value="Mr">Mr</MenuItem>
                        <MenuItem value="Ms">Ms</MenuItem>
                        <MenuItem value="Mrs">Mrs</MenuItem>
                        <MenuItem value="Dr">Dr</MenuItem>
                    </Select>
                </FormControl>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}><TextField name="first_name" label="First Name" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={12} sm={6}><TextField name="middle_name" label="Middle Name" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={12} sm={6}><TextField name="last_name" label="Last Name" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={12} sm={6}><TextField name="dob" label="Date of Birth" type="date" fullWidth InputLabelProps={{ shrink: true }} onChange={handleChange} /></Grid>
                </Grid>
                <TextField name="email" label="Email Address" fullWidth margin="normal" onChange={handleChange} />

                <Typography variant="h6" mt={3}>Contact Details</Typography>
                <TextField name="phone" label="Mobile Phone" fullWidth margin="normal" onChange={handleChange} />
                <TextField name="residential_status" label="Residential Status" fullWidth margin="normal" onChange={handleChange} />
                <TextField name="residency_status" label="Residency Status" fullWidth margin="normal" onChange={handleChange} />

                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}><TextField name="unit_number" label="Unit #" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={12} sm={6}><TextField name="street_number" label="Street #" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={12} sm={6}><TextField name="street_name" label="Street Name" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={12} sm={6}><TextField name="street_type" label="Street Type" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={12}><TextField name="alley" label="Alley" fullWidth onChange={handleChange} /></Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}><TextField name="suburb" label="Suburb" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={12} sm={3}><TextField name="state" label="State" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={12} sm={3}><TextField name="postcode" label="Post Code" fullWidth onChange={handleChange} /></Grid>
                </Grid>
                <TextField name="referral_source" label="How did you find out about us?" fullWidth margin="normal" onChange={handleChange} />

                <Typography variant="h6" mt={3}>Additional Information</Typography>
                <TextField name="employment_status" label="Employment Status" fullWidth margin="normal" onChange={handleChange} />
                <Grid container spacing={2}>
                    <Grid item xs={6}><TextField name="employment_years" label="Total Years Employed" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField name="employment_months" label="Total Months Employed" fullWidth onChange={handleChange} /></Grid>
                </Grid>
                <Grid container spacing={2}>
                    <Grid item xs={6}><TextField name="net_income" label="Net Income" fullWidth onChange={handleChange} /></Grid>
                    <Grid item xs={6}><TextField name="monthly_expenses" label="Monthly Expenses" fullWidth onChange={handleChange} /></Grid>
                </Grid>
                <TextField name="income_frequency" label="Income Frequency" fullWidth margin="normal" onChange={handleChange} />
                <TextField name="next_pay_day" label="Next Pay Day" type="date" fullWidth margin="normal" InputLabelProps={{ shrink: true }} onChange={handleChange} />

                <FormGroup>
                    <FormControlLabel control={<Checkbox name="receives_govt_benefits" checked={formData.receives_govt_benefits} onChange={handleChange} />} label="Receives Government Benefits" />
                    <FormControlLabel control={<Checkbox name="recent_short_term_loans" checked={formData.recent_short_term_loans} onChange={handleChange} />} label="Had 2 or More Short Term Loans in Last 90 Days" />
                    <FormControlLabel control={<Checkbox name="consent_lead_gen" checked={formData.consent_lead_gen} onChange={handleChange} />} label="I consent for my info to be used for lead generation" />
                    <FormControlLabel control={<Checkbox name="agree_terms" checked={formData.agree_terms} onChange={handleChange} />} label="I agree to Terms and Privacy Policy" />
                    <FormControlLabel control={<Checkbox name="want_offers" checked={formData.want_offers} onChange={handleChange} />} label="I want to receive rewards and offers" />
                </FormGroup>

                <Box textAlign="center" mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit Application
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}
