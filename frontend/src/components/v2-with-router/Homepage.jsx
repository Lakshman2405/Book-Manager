import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
    return (
        <div className="home-page">
            
            <div className="hero">
                <h1>Welcome to Book Manager System</h1>
                <p>
                    Manage books, track tasks, and explore React form handling — all in one place.
                </p>
            </div>

            <div className="features">

                {/* BOOKS MODULE */}
                <div className="feature-card">
                    <div className="feature-icon">📚</div>
                    <h3>Books Management</h3>
                    <p>View, add, update, delete books and manage stock efficiently</p>
                    <Link to="/books" className="feature-link">Manage Books →</Link>
                </div>

                {/* ADD BOOK */}
                <div className="feature-card">
                    <div className="feature-icon">➕</div>
                    <h3>Add Books</h3>
                    <p>Add new books or increase stock using ISBN</p>
                    <Link to="/add-book" className="feature-link">Add Book →</Link>
                </div>

                {/* SEARCH */}
                <div className="feature-card">
                    <div className="feature-icon">🔍</div>
                    <h3>Search Books</h3>
                    <p>Quickly find books using their unique ID</p>
                    <Link to="/search-book" className="feature-link">Search →</Link>
                </div>

                {/* TASKS MODULE */}
                <div className="feature-card">
                    <div className="feature-icon">✅</div>
                    <h3>Task Manager</h3>
                    <p>Create, update, and manage your daily tasks</p>
                    <Link to="/tasks" className="feature-link">Manage Tasks →</Link>
                </div>

                {/* FORMS MODULE */}
                <div className="feature-card">
                    <div className="feature-icon">📝</div>
                    <h3>Forms Playground</h3>
                    <p>Explore controlled, uncontrolled, and React Hook Form</p>
                    <Link to="/forms" className="feature-link">Explore Forms →</Link>
                </div>

            </div>
        </div>
    );
}

export default HomePage;