import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/loanlist.css';

const LoanList = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLoans();
    }, []);

    const fetchLoans = async () => {
        try {
            const response = await axios.get('http://localhost:8000/api/loan-applications/');
            setLoans(response.data);
        } catch (error) {
            console.error('Error fetching loans:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        const confirm = window.confirm('Are you sure you want to delete this application?');
        if (!confirm) return;

        try {
            await axios.delete(`http://localhost:8000/api/loan-applications/${id}/`);
            fetchLoans(); // Refresh list
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };



    if (loading) return <div>Loading loan applications...</div>;

    return (
        <div className="loan-list">
            <h2>Loan Applications</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Customer</th>
                        <th>Phone No</th>
                        <th>Email</th>
                        <th>Address</th>
                        <th>Requested Amount</th>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Submitted</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan.id}>
                            <td>{loan.id}</td>
                            <td>{loan.customer?.first_name} {loan.customer?.middle_name} {loan.customer?.last_name}</td>
                            <td>{loan.customer?.phone}</td>
                            <td>{loan.customer?.email}</td>
                            <td>{loan.customer?.address.state}</td>
                            <td>${parseFloat(loan.requested_amount).toFixed(2)}</td>
                            <td>{loan.loan_purpose}</td>
                            <td>{loan.status}</td>
                            <td>{new Date(loan.created_at).toLocaleDateString()}</td>
                            <td>
                                <button onClick={() => window.location.href = `/loan-list/${loan.id}`}>View</button>
                                <button onClick={() => window.location.href = `/loan-list/${loan.id}/edit`}>Edit</button>
                                <button onClick={() => handleDelete(loan.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanList;
