import React from 'react';
import { useNavigate } from 'react-router-dom';
import './firstpage.css'; // Import your CSS file

function App() {
    const navigate = useNavigate();

    const selectRole = (role) => {
        if (role === 'student') {
            navigate('/loginstudent');
        } else if (role === 'teacher') {
            navigate('/loginteacher');
        } else if (role === 'staff') {
            navigate('/loginstaff');
        } else if (role === 'driver') {
            navigate('/logindriver');
        } else if (role === 'supervisor') {
            navigate('/loginsupervisor');
        } else if (role === 'admin') {
            navigate('/loginadmin');
        }
    };

    return (
        <div className="container">
            <h1>Select Your Role</h1>
            <div className="options">
                <button onClick={() => selectRole('student')}>Student</button>
                <button onClick={() => selectRole('teacher')}>Teacher</button>
                <button onClick={() => selectRole('staff')}>Staff</button>
                <button onClick={() => selectRole('driver')}>Driver</button>
                <button onClick={() => selectRole('supervisor')}>Supervisor</button>
                <button onClick={() => selectRole('admin')}>Admin</button>
            </div>
        </div>
    );
}

export default App;
