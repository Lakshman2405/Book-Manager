import React from 'react';
import { Link } from 'react-router-dom';

function FormsHomePage() {
    const formsList = [
        {
            id: 1,
            title: "Controlled Component",
            description: "Form data handled by React state using useState hook",
            icon: "🎯",
            path: "/forms/controlled",
            color: "#3b82f6"
        },
        {
            id: 2,
            title: "Uncontrolled Component",
            description: "Form data handled by DOM using useRef hook",
            icon: "🔄",
            path: "/forms/uncontrolled",
            color: "#f59e0b"
        },
        {
            id: 3,
            title: "React Hook Form",
            description: "Using react-hook-form library for better performance",
            icon: "⚡",
            path: "/forms/react-hook-form",
            color: "#a855f7"
        }
    ];

    return (
        <div className="forms-home-page">
            <div className="forms-hero">
                <h1>📝 Form Handling in React</h1>
                <p> Demonstrating three different approaches to form management</p>
            </div>
            

            <div className="forms-grid-new">
                {formsList.map((form) => (
                    <Link to={form.path} key={form.id} className="form-card-new" style={{ borderTopColor: form.color }}>
                        <div className="form-icon" style={{ background: `${form.color}20`, color: form.color }}>
                            {form.icon}
                        </div>
                        <h3>{form.title}</h3>
                        <p>{form.description}</p>
                        <span className="form-link" style={{ color: form.color }}>
                            View Demo →
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default FormsHomePage;