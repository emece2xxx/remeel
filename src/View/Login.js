import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useUser } from '../Controller/UserContext';


const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const { login } = useUser();
    const handleSubmit = (e) => {
        e.preventDefault();
        if (username === 'far' && password === '123') {
            login('Farmaceutico');
            navigate('/home');
        } else if (username === 'pac' && password === '123') {
            login('Paciente');
            navigate('/home');
        } else if (username === 'med' && password === '123') {
            login('Medico');
            navigate('/home');
        } else {
            alert("Credenciales inválidas");
        }
    };

    return (
       
        <div  className="login-container">
            <h1>Login</h1>
            <Form onSubmit={handleSubmit}>
                <Form.Group controlId="formUsername">
                    <Form.Label>Usuario:</Form.Label>
                    <Form.Control
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </Form.Group>
                <Form.Group controlId="formPassword">
                    <Form.Label>Password:</Form.Label>
                    <Form.Control
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </Form.Group>
                <Button variant="primary" type="submit">
                    Login
                </Button>
            </Form>
        </div>
    );
};

export default Login;
