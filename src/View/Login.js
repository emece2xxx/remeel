import React, { useState } from "react";
import { Form, Button } from 'react-bootstrap';
import { Alert } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import { useUser } from '../Controller/UserContext';
const sha2_256 = require('simple-js-sha2-256');

  const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    const { login, setUserReg } = useUser();

    // evento login
    const handleSubmit = (e) => {
      e.preventDefault();
      const hashedPass = sha2_256(password);
      fetch('/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nombre: username, pwd: hashedPass })
      })
      .then(response1 => response1.json())
      .then(data1 => {
        login(data1[0].tipo);
        return fetch(`/usuario-${data1[0].tipo}/${data1[0].id_usuario}`);
      })
      .then(response2 => response2.json())
      .then(data2 => {
        setUserReg(data2[0]);
        navigate('/home');
      })
      //.catch(err => { alert('Credenciales inválidas') });
      .catch(err => setErrorMessage(<Alert severity="error" variant='outlined' sx={{margin: '10px', width: 'fit-content'}}>Credenciales inválidas</Alert>));
    }

    // render de la página
    return (
        <div className="login-container">
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
                <Button variant="primary" type="submit" style={{marginTop: "10px"}}>
                    Login
                </Button>
            </Form>
            {errorMessage}
        </div>
    );
};

export default Login;
