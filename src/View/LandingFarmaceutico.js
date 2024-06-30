import React from 'react';
import './LandingFarmaceutico.css';
import logoRemeel from '../Assets/logoRemeel.svg';
import { useUser } from '../Controller/UserContext';

const LandingFarmaceutico =() => {
	const { userReg } = useUser();
	
    return (
    	<div className='contentLandingFarmaceutico' >
        <img src={logoRemeel} width='200' style={{ paddingBottom: 40 + 'px' }}/><br/>
        <h1>¡Bienvenido!</h1>
        <h2>Usuario: {userReg.apellido_nombre}, Farmacéutico</h2>
        </div>
    );
};

export default LandingFarmaceutico;
