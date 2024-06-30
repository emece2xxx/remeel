import React from 'react';
import './LandingMedico.css';
import logoRemeel from '../Assets/logoRemeel.svg';
import { useUser } from '../Controller/UserContext';

const LandingMedico =() => {
	const { userReg } = useUser();
	
    return (
    	<div className='contentLandingMedico' >
        <img src={logoRemeel} width='200' style={{ paddingBottom: 40 + 'px' }}/><br/>
        <h1>¡Bienvenido!</h1>
        <h2>Usuario: {userReg.apellido_nombre}, Médico</h2>
        </div>
    );
};

export default LandingMedico;
