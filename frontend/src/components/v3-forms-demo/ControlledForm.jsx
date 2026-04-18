import React, { useState } from 'react';

function ControlledForm() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [submitted, setSubmitted] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted(formData);
        setFormData({ name: '', email: '', message: '' });
    };

    return (
        <div className="form-demo">
            <h2>🎯 Controlled Component</h2>
            <p>Form inputs are controlled by React state</p>
            
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
                <textarea
                    name="message"
                    placeholder="Message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="3"
                />
                <button type="submit">Submit</button>
            </form>

            {submitted && (
                <div className="submitted-data">
                    <h3>Submitted Data:</h3>
                    <p>Name: {submitted.name}</p>
                    <p>Email: {submitted.email}</p>
                    <p>Message: {submitted.message}</p>
                </div>
            )}
        </div>
    );
}

export default ControlledForm;