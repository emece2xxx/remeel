// Home.js
import React, {useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import AceptarReceta from './AceptarReceta';
import LandingFarmaceutico from './LandingFarmaceutico';
import LandingPaciente from './LandingPaciente';
import LandingMedico from './LandingMedico';
import CrearReceta from './CrearReceta';
import AnularReceta from './AnularReceta';
import VerRecetas from './VerRecetas';
import { useUser } from '../Controller/userContext';

const Home = () => {
  const navigate = useNavigate();
  const { userType } = useUser();
  const handleLogout = () => {
    navigate('/login');
  };
  const [content, setContent] = useState(userType === 'Farmaceutico' ? 'LandingFarmaceutico' : userType === 'Medico' ? 'LandingMedico' : 'LandingPaciente');
  const changeContent = (newContent) => {
    setContent(newContent);
  };
  useEffect(() => {
    if (userType === 'Farmaceutico') {
      setContent('LandingFarmaceutico');
    } else if (userType === 'Medico') {
      setContent('LandingMedico');
    } else if (userType === 'Paciente') {
      setContent('LandingPaciente');
    }
  }, [userType]);

  return (
    <div className="homeContainer">
      <div className="header">
            <Navbar bg="dark" variant="dark">
        <Navbar.Brand>REMEEL</Navbar.Brand>
        <Nav className="me-auto">
        {userType === 'Farmaceutico' && (
              <>
                <Nav.Link onClick={() => changeContent('LandingFarmaceutico')}>Página Principal</Nav.Link>
                <Nav.Link onClick={() => changeContent('AceptarReceta')}>Aceptar Receta</Nav.Link>
              </>
            )}
            {userType === 'Medico' && (
              <>
                <Nav.Link onClick={() => changeContent('LandingMedico')}>Página Principal</Nav.Link>
                <Nav.Link onClick={() => changeContent('CrearReceta')}>Crear Receta</Nav.Link>
                <Nav.Link onClick={() => changeContent('AnularReceta')}>Anular Receta</Nav.Link>
              </>
            )}
            {userType === 'Paciente' && (
              <>
                <Nav.Link onClick={() => changeContent('LandingPaciente')}>Página Principal</Nav.Link>
                <Nav.Link onClick={() => changeContent('VerRecetas')}>Ver Recetas</Nav.Link>
              </>
            )}
        </Nav>
        <div className="ms-auto">
          <Button variant="outline-light" onClick={handleLogout}>Cerrar Sesión</Button>
        </div>
          </Navbar>
      </div>
      <div className="content">
        {content === 'LandingFarmaceutico' && <LandingFarmaceutico />}
        {content === 'AceptarReceta' && <AceptarReceta />}
        {content === 'LandingMedico' && <LandingMedico />}
        {content === 'CrearReceta' && <CrearReceta />}
        {content === 'AnularReceta' && <AnularReceta />}
        {content === 'LandingPaciente' && <LandingPaciente />}
        {content === 'VerRecetas' && <VerRecetas />}       
      </div>
      <footer className='bg-dark text-light'>
      <div className="row">      
    </div>
    <div>
      <div className="d-flex flex-column flex-sm-column justify-content-between py-2 my-2 border-top">
        <p>© Creado para la asignatura Ingenieria Web de la Carrera Licenciatura en Sistemas de Información del año 2024</p>
        <p>Grupo: Camino Oller Mauricio, Enriquez Galvan Cristian, Figueroa Daniela</p>
      </div>
      <div>
        
      </div>
    </div>
      </footer>
    </div>
  );
};

export default Home;
