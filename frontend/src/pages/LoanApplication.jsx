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
    FormControl
} from '@mui/material';
import axios from 'axios';

export default function LoanApplication() {
    const [formData, setFormData] = useState({
        applicant_name: '',
        applicant_type: 'IND',
        loan_amount: '',
        loan_purpose: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/loans/', formData);
            alert('Application submitted successfully!');
        } catch (error) {
            console.error('Submission error:', error);
            alert('Submission failed. Check console for details.');
        }
    };

    return (
        <Container maxWidth="sm">
            <Typography variant="h4" gutterBottom>Loan Application</Typography>
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
                <TextField
                    fullWidth
                    label="Applicant Name"
                    name="applicant_name"
                    value={formData.applicant_name}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <FormControl fullWidth margin="normal">
                    <InputLabel id="applicant-type-label">Applicant Type</InputLabel>
                    <Select
                        labelId="applicant-type-label"
                        name="applicant_type"
                        value={formData.applicant_type}
                        label="Applicant Type"
                        onChange={handleChange}
                    >
                        <MenuItem value="IND">Individual</MenuItem>
                        <MenuItem value="BUS">Business</MenuItem>
                    </Select>
                </FormControl>

                <TextField
                    fullWidth
                    label="Loan Amount"
                    name="loan_amount"
                    type="number"
                    value={formData.loan_amount}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <TextField
                    fullWidth
                    label="Loan Purpose"
                    name="loan_purpose"
                    value={formData.loan_purpose}
                    onChange={handleChange}
                    margin="normal"
                    required
                />

                <Box textAlign="center" mt={3}>
                    <Button type="submit" variant="contained" color="primary">
                        Submit Application
                    </Button>
                </Box>
            </Box>
        </Container>
    );
}