import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LoanList = () => {
    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLoans = async () => {
            try {
                const response = await axios.get('http://localhost:8000/api/loan-applications/');
                setLoans(response.data);
            } catch (error) {
                console.error('Error fetching loan applications:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchLoans();
    }, []);

    const viewDetails = (id) => {
        alert(`View more details for loan #${id}`);
        // Or route to /loans/:id using React Router
    };

    if (loading) return <p>Loading loan applications...</p>;

    return (
        <div className="loan-list">
            <h2>All Loan Applications</h2>
            <table border="1" cellPadding="8" cellSpacing="0">
                <thead>
                    <tr>
                        <th>Application ID</th>
                        <th>Customer</th>
                        <th>Phone</th>
                        <th>Email</th>
                        <th>State</th>
                        <th>Amount</th>
                        <th>Purpose</th>
                        <th>Status</th>
                        <th>Submitted At</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {loans.map((loan) => (
                        <tr key={loan.id}>
                            <td>{loan.id}</td>
                            <td>
                                {loan.customer?.first_name} {loan.customer?.last_name}
                            </td>
                            <td>{loan.customer?.phone}</td>
                            <td>{loan.customer?.email}</td>
                            <td>{loan.customer?.address?.state || 'N/A'}</td>
                            <td>${Number(loan.requested_amount).toFixed(2)}</td>
                            <td>{loan.loan_purpose.replace('_', ' ')}</td>
                            <td>
                                <span
                                    className={`status-badge ${loan.status.toLowerCase()}`}
                                    style={{
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        color: 'white',
                                        backgroundColor:
                                            loan.status === 'approved'
                                                ? 'green'
                                                : loan.status === 'rejected'
                                                    ? 'red'
                                                    : 'orange',
                                    }}
                                >
                                    {loan.status}
                                </span>
                            </td>
                            <td>{new Date(loan.created_at).toLocaleString()}</td>
                            <td>
                                <button onClick={() => viewDetails(loan.id)}>View</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default LoanList;
