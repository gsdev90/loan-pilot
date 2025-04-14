import React, { useEffect, useState } from 'react';
import {
    Table, TableBody, TableCell, TableContainer, TableHead, TableRow,
    Paper, Typography, Container, Chip, CircularProgress
} from '@mui/material';
import axios from 'axios';

export default function LoanList() {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:8000/api/loans/')
            .then((res) => {
                setLoans(res.data);
                setLoading(false);
            })
            .catch((err) => {
                console.error('Failed to fetch loan list:', err);
                setLoading(false);
            });
    }, []);

    return (
        <Container maxWidth="lg" sx={{ mt: 4 }}>
            <Typography variant="h4" gutterBottom>
                All Loan Applications
            </Typography>

            {loading ? (
                <CircularProgress />
            ) : (
                <TableContainer component={Paper}>
                    <Table>
                        <TableHead sx={{ backgroundColor: '#f5f5f5' }}>
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
            )}
        </Container>
    );
}
