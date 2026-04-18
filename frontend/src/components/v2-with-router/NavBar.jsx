import React from 'react';
import { NavLink } from 'react-router-dom';


function Navbar() {
    return (
        <nav className="navbar">
            <h2>📚 Book Manager</h2>
            <div className="nav-links">
                <NavLink to="/" className={({ isActive }) => isActive ? 'active-link' : ''}>Home</NavLink>
                <NavLink to="/books" className={({ isActive }) => isActive ? 'active-link' : ''}>All Books</NavLink>
                <NavLink to="/add-book" className={({ isActive }) => isActive ? 'active-link' : ''}>Add Book</NavLink>
                <NavLink to="/search-book" className={({ isActive }) => isActive ? 'active-link' : ''}>Search Book</NavLink>
                <NavLink to="/forms" className={({ isActive }) => isActive ? 'active-link' : ''}>Forms</NavLink>
                <NavLink to="/tasks" className={({ isActive }) => isActive ? 'active-link' : ''}>Tasks</NavLink>
            </div>
        </nav>
    );
}

export default Navbar;