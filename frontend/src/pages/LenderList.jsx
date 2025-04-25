import React, { useEffect, useState } from 'react';
import axios from 'axios';

const LenderList = () => {
    const [lenders, setLenders] = useState([]);
    const [newLender, setNewLender] = useState({
        name: '',
        contact_email: '',
        supported_loan_types: '',
        min_loan_amount: '',
        max_loan_amount: '',
        employment_preferences: '',
        credit_profile_preferences: ''
    });

    useEffect(() => {
        fetchLenders();
    }, []);

    const fetchLenders = async () => {
        const res = await axios.get('/api/lenders/');
        setLenders(res.data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewLender(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('/api/lenders/', newLender);
        setNewLender({ name: '', contact_email: '', supported_loan_types: '', min_loan_amount: '', max_loan_amount: '', employment_preferences: '', credit_profile_preferences: '' });
        fetchLenders();
    };

    const handleDelete = async (id) => {
        await axios.delete(`/api/lenders/${id}/`);
        fetchLenders();
    };

    return (
        <div>
            <h2>Lender Management</h2>
            <form onSubmit={handleSubmit}>
                <input name="name" placeholder="Lender Name" value={newLender.name} onChange={handleChange} required />
                <input name="contact_email" placeholder="Contact Email" value={newLender.contact_email} onChange={handleChange} required />
                <input name="supported_loan_types" placeholder="Loan Types" value={newLender.supported_loan_types} onChange={handleChange} />
                <input name="min_loan_amount" type="number" placeholder="Min Amount" value={newLender.min_loan_amount} onChange={handleChange} />
                <input name="max_loan_amount" type="number" placeholder="Max Amount" value={newLender.max_loan_amount} onChange={handleChange} />
                <input name="employment_preferences" placeholder="Employment Preferences" value={newLender.employment_preferences} onChange={handleChange} />
                <input name="credit_profile_preferences" placeholder="Credit Preferences" value={newLender.credit_profile_preferences} onChange={handleChange} />
                <button type="submit">Add Lender</button>
            </form>

            <ul>
                {lenders.map(lender => (
                    <li key={lender.id}>
                        <strong>{lender.name}</strong> ({lender.contact_email}) — Loan Types: {lender.supported_loan_types} | Amounts: ${lender.min_loan_amount}–${lender.max_loan_amount}<br />
                        Employment: {lender.employment_preferences} | Credit: {lender.credit_profile_preferences}
                        <button onClick={() => handleDelete(lender.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default LenderList;