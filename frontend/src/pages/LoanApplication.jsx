import React, { useState } from 'react';
import { Button, TextField, Select, MenuItem, Typography, Container } from '@mui/material';

export default function LoanApplication() {
    const [formData, setFormData] = useState({
        applicantName: '',
        applicantType: 'IND',
        loanAmount: '',
        loanPurpose: ''
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/api/loans/', formData);
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Error submitting application:', error);
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Loan Application</Typography>
            <form onSubmit={handleSubmit}>
                {/* Form fields here */}
                <Button type="submit" variant="contained">Submit Application</Button>
            </form>
        </Container>
    );
}