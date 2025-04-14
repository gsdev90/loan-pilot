import React, { useEffect, useState } from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Typography,
    Container,
    Chip
} from '@mui/material';
import axios from 'axios';

export default function LoanDashboard() {
    const [loans, setLoans] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/loans/')
            .then((res) => setLoans(res.data))
            .catch((err) => console.error('Error fetching loans:', err));
    }, []);

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom>Loan Applications</Typography>
            <TableContainer component={Paper} sx={{ mt: 2 }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell><strong>ID</strong></TableCell>
                            <TableCell><strong>Name</strong></TableCell>
                            <TableCell><strong>Type</strong></TableCell>
                            <TableCell><strong>Amount</strong></TableCell>
                            <TableCell><strong>Purpose</strong></TableCell>
                            <TableCell><strong>Status</strong></TableCell>
                            <TableCell><strong>Submitted</strong></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {loans.map((loan) => (
                            <TableRow key={loan.id}>
                                <TableCell>{loan.id}</TableCell>
                                <TableCell>{loan.applicant_name}</TableCell>
                                <TableCell>{loan.applicant_type}</TableCell>
                                <TableCell>${loan.loan_amount}</TableCell>
                                <TableCell>{loan.loan_purpose}</TableCell>
                                <TableCell>
                                    <Chip
                                        label={loan.status}
                                        color={loan.status === 'approved' ? 'success' : 'warning'}
                                        variant="outlined"
                                    />
                                </TableCell>
                                <TableCell>{new Date(loan.created_at).toLocaleString()}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Container>
    );
}