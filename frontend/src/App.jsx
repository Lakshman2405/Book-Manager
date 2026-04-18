import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/v2-with-router/Navbar';
import HomePage from './components/v2-with-router/HomePage';
import BooksPage from './components/v2-with-router/BooksPage';
import AddBookPage from './components/v2-with-router/AddBookPage';
import SearchBookPage from './components/v2-with-router/SearchBookPage';

import FormsHomePage from './components/v3-forms-demo/FormsHomePage';
import ControlledForm from './components/v3-forms-demo/ControlledForm';
import UncontrolledForm from './components/v3-forms-demo/UncontrolledForm';
import ReactHookFormDemo from './components/v3-forms-demo/ReactHookFormDemo';

import TasksHomePage from './components/v4-tasks/TasksHomePage';

import AlertBar from './components/AlertBar';

import './App.css';

function App() {
    const [alert, setAlert] = useState({
        message: "",
        type: "success"
    });

    const showAlert = (message, type = "success") => {
        setAlert({ message, type });
    };

    return (
        <Router>
            <div className="App">
                <div className="container">
                    
                    <Navbar />

                    {/* ✅ GLOBAL ALERT BAR */}
                    <AlertBar
                        message={alert.message}
                        type={alert.type}
                        onClose={() => setAlert({ message: "", type: "success" })}
                    />

                    <main className="main-content">
                        <Routes>

                            {/* Core Pages */}
                            <Route path="/" element={<HomePage />} />

                            <Route 
                                path="/books" 
                                element={<BooksPage showAlert={showAlert} />} 
                            />

                            <Route 
                                path="/add-book" 
                                element={<AddBookPage showAlert={showAlert} />} 
                            />

                            <Route 
                                path="/search-book" 
                                element={<SearchBookPage showAlert={showAlert} />} 
                            />

                            {/* Forms */}
                            <Route path="/forms" element={<FormsHomePage />} />
                            <Route path="/forms/controlled" element={<ControlledForm />} />
                            <Route path="/forms/uncontrolled" element={<UncontrolledForm />} />
                            <Route path="/forms/react-hook-form" element={<ReactHookFormDemo />} />

                            {/* Tasks */}
                            <Route 
                                path="/tasks" 
                                element={<TasksHomePage showAlert={showAlert} />} 
                            />

                        </Routes>
                    </main>
                </div>
            </div>
        </Router>
    );
}

export default App;