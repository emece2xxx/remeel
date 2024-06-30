import React from 'react';
import './LandingPaciente.css';
import logoRemeel from '../Assets/logoRemeel.svg';
import { useUser } from '../Controller/UserContext';

const LandingPaciente =() => {
	const { userReg } = useUser();
	
    return (
    	<div className='contentLandingPaciente' >
        <img src={logoRemeel} width='200' style={{ paddingBottom: 40 + 'px' }}/><br/>
        <h1>¡Bienvenido!</h1>
        <h2>Usuario: {userReg.apellido_nombre}, Paciente</h2>
        </div>
    );
};

export default LandingPaciente;
