import React, { useRef, useState } from 'react';

function UncontrolledForm() {
    const nameRef = useRef(null);
    const emailRef = useRef(null);
    const messageRef = useRef(null);
    const [submitted, setSubmitted] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitted({
            name: nameRef.current.value,
            email: emailRef.current.value,
            message: messageRef.current.value
        });
        nameRef.current.value = '';
        emailRef.current.value = '';
        messageRef.current.value = '';
    };

    return (
        <div className="form-demo">
            <h2>🔄 Uncontrolled Component</h2>
            <p>Form data handled by DOM using useRef hook</p>
            
            <form onSubmit={handleSubmit}>
                <input type="text" ref={nameRef} placeholder="Name" required />
                <input type="email" ref={emailRef} placeholder="Email" required />
                <textarea ref={messageRef} placeholder="Message" rows="3" />
                <button type="submit">Submit</button>
            </form>

            {submitted && (
                <div className="submitted-data">
                    <h3>✓ Submitted Data:</h3>
                    <p>Name: {submitted.name}</p>
                    <p>Email: {submitted.email}</p>
                    <p>Message: {submitted.message}</p>
                </div>
            )}
        </div>
    );
}

export default UncontrolledForm;