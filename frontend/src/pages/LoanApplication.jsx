import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const LoanApplicationForm = () => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            const applicationData = {
                customer: {
                    title: data.title,
                    first_name: data.first_name,
                    middle_name: data.middle_name,
                    last_name: data.last_name,
                    dob: data.dob,
                    email: data.email,
                    phone: data.phone,
                    marital_status: data.marital_status,

                    address: {
                        residential_status: data.residential_status,
                        residency_status: data.residency_status,
                        unit_number: data.unit_number,
                        street_number: data.street_number,
                        street_name: data.street_name,
                        street_type: data.street_type,
                        alley: data.alley,
                        suburb: data.suburb,
                        state: data.state,
                        postcode: data.postcode,
                    },

                    employment: {
                        employment_status: data.employment_status,
                        employment_years: data.employment_years,
                        employment_months: data.employment_months,
                        net_income: data.net_income,
                        monthly_expenses: data.monthly_expenses,
                        income_frequency: data.income_frequency,
                        next_pay_day: data.next_pay_day,
                    },

                    consent: {
                        receives_govt_benefits: data.receives_govt_benefits,
                        recent_short_term_loans: data.recent_short_term_loans,
                        consent_lead_gen: data.consent_lead_gen,
                        agree_terms: data.agree_terms,
                        want_offers: data.want_offers,
                    }
                },

                requested_amount: data.requested_amount,
                loan_purpose: data.loan_purpose,
                referral_source: data.referral_source,
            };
            // console.log("Application Data Being Sent:", JSON.stringify(applicationData, null, 2)); // To test Data structure
            await axios.post('http://localhost:8000/api/loan-applications/', applicationData);
            setSuccess(true);
        } catch (error) {
            console.error("Full error:", error.response?.data || error.message);
            alert("Submission failed. See console for details.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            {/* Step 1: Personal Information */}
            {step === 1 && (
                <div>
                    <h2>Personal Information</h2>
                    <select {...register("title", { required: true })}>
                        <option value="">Select Title</option>
                        <option value="Mr">Mr</option>
                        <option value="Mrs">Mrs</option>
                        <option value="Ms">Ms</option>
                        <option value="Dr">Dr</option>
                    </select>

                    <input {...register("first_name", { required: true })} placeholder="First Name" />
                    <input {...register("middle_name")} placeholder="Middle Name" />
                    <input {...register("last_name", { required: true })} placeholder="Last Name" />
                    <input {...register("dob", { required: true })} type="date" placeholder="Date of Birth" />
                    <input {...register("email", { required: true })} type="email" placeholder="Email" />
                    <input {...register("phone", { required: true })} placeholder="Phone" />
                    <select {...register("marital_status")}>
                        <option value="">Marital Status</option>
                        <option value="single">Single</option>
                        <option value="married">Married</option>
                        <option value="divorced">Divorced</option>
                        <option value="widowed">Widowed</option>
                    </select>

                    <button type="button" onClick={() => setStep(2)}>Next</button>
                </div>
            )}

            {/* Step 2: Address */}
            {step === 2 && (
                <div>
                    <h2>Address Information</h2>
                    <select {...register("residential_status")}>
                        <option value="">Residential Status</option>
                        <option value="own">Own</option>
                        <option value="rent">Rent</option>
                        <option value="board">Board</option>
                        <option value="live_with_family">Live with Family</option>
                    </select>
                    <input {...register("residency_status")} placeholder="Residency Status" />
                    <input {...register("unit_number")} placeholder="Unit #" />
                    <input {...register("street_number")} placeholder="Street #" />
                    <input {...register("street_name")} placeholder="Street Name" />
                    <input {...register("street_type")} placeholder="Street Type" />
                    <input {...register("alley")} placeholder="Alley (optional)" />
                    <input {...register("suburb")} placeholder="Suburb" />
                    <input {...register("state")} placeholder="State" />
                    <input {...register("postcode")} placeholder="Postcode" />
                    <button type="button" onClick={() => setStep(1)}>Back</button>
                    <button type="button" onClick={() => setStep(3)}>Next</button>
                </div>
            )}

            {/* Step 3: Employment */}
            {step === 3 && (
                <div>
                    <h2>Employment Information</h2>
                    <select {...register("employment_status")}>
                        <option value="">Employment Status</option>
                        <option value="full_time">Full Time</option>
                        <option value="part_time">Part Time</option>
                        <option value="casual">Casual</option>
                        <option value="self_employed">Self Employed</option>
                        <option value="unemployed">Unemployed</option>
                    </select>
                    <input {...register("employment_years")} placeholder="Years Employed" type="number" />
                    <input {...register("employment_months")} placeholder="Months Employed" type="number" />
                    <input {...register("net_income")} placeholder="Net Income" type="number" />
                    <input {...register("monthly_expenses")} placeholder="Monthly Expenses" type="number" />
                    <select {...register("income_frequency")}>
                        <option value="">Income Frequency</option>
                        <option value="weekly">Weekly</option>
                        <option value="fortnightly">Fortnightly</option>
                        <option value="monthly">Monthly</option>
                        <option value="annually">Annually</option>
                    </select>
                    <input {...register("next_pay_day")} type="date" placeholder="Next Pay Day" />
                    <button type="button" onClick={() => setStep(2)}>Back</button>
                    <button type="button" onClick={() => setStep(4)}>Next</button>
                </div>
            )}

            {/* Step 4: Loan + Consent */}
            {step === 4 && (
                <div>
                    <h2>Loan Details & Consent</h2>
                    <input {...register("requested_amount")} placeholder="Requested Amount" type="number" />
                    <select {...register("loan_purpose")}>
                        <option value="">Loan Purpose</option>
                        <option value="debt_consolidation">Debt Consolidation</option>
                        <option value="home_improvement">Home Improvement</option>
                        <option value="medical">Medical</option>
                        <option value="education">Education</option>
                        <option value="vehicle">Vehicle</option>
                        <option value="other">Other</option>
                    </select>
                    <input {...register("referral_source")} placeholder="How did you hear about us?" />

                    <label>
                        <input type="checkbox" {...register("receives_govt_benefits")} />
                        Receiving government benefits
                    </label>
                    <label>
                        <input type="checkbox" {...register("recent_short_term_loans")} />
                        Taken short term loans recently
                    </label>
                    <label>
                        <input type="checkbox" {...register("consent_lead_gen")} />
                        Consent for lead generation
                    </label>
                    <label>
                        <input type="checkbox" {...register("agree_terms")} />
                        I agree to terms
                    </label>
                    <label>
                        <input type="checkbox" {...register("want_offers")} />
                        I want promotional offers
                    </label>

                    <button type="button" onClick={() => setStep(3)}>Back</button>
                    <button type="submit" disabled={loading}>
                        {loading ? 'Submitting...' : 'Submit Application'}
                    </button>
                </div>
            )}

            {success && (
                <div className="success-message">
                    <h3>Application Submitted Successfully!</h3>
                </div>
            )}
        </form>
    );
};

export default LoanApplicationForm;
