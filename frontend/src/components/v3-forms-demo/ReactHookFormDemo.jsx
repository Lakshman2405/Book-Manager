import React from 'react';
import { useForm } from 'react-hook-form';

function ReactHookFormDemo() {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [submitted, setSubmitted] = React.useState(null);

    const onSubmit = (data) => {
        setSubmitted(data);
        reset();
    };

    return (
        <div className="form-demo">
            <h2>🎯 React Hook Form</h2>
            <p>Using react-hook-form library with built-in validation</p>
            
            <form onSubmit={handleSubmit(onSubmit)}>
                <input
                    {...register('name', { required: 'Name is required' })}
                    placeholder="Name"
                />
                {errors.name && <span className="error">{errors.name.message}</span>}
                
                <input
                    {...register('email', { 
                        required: 'Email is required',
                        pattern: {
                            value: /^\S+@\S+$/i,
                            message: 'Invalid email address'
                        }
                    })}
                    placeholder="Email"
                />
                {errors.email && <span className="error">{errors.email.message}</span>}
                
                <textarea
                    {...register('message')}
                    placeholder="Message"
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

export default ReactHookFormDemo;
