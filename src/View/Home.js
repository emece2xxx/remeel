/* eslint-disable jsx-a11y/anchor-is-valid */
// Home.js
import React from 'react';
import { Route, Routes, Link, useNavigate, Navigate } from 'react-router-dom';
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

  return (
    <div className="homeContainer">
      <div className="header">
            <Navbar bg="dark" variant="dark">
        <Navbar.Brand>REMEEL</Navbar.Brand>
        <Nav className="me-auto">
        {userType === 'Farmaceutico' && (
            <>
              <Nav.Link as={Link} to="./LandingFarmaceutico">Página Principal</Nav.Link>
              <Nav.Link as={Link} to="./AceptarReceta">Aceptar Receta</Nav.Link>
            </>
          )}
          {userType === 'Medico' && (
            <>
              <Nav.Link as={Link} to="./LandingMedico">Página Principal</Nav.Link>
              <Nav.Link as={Link} to="./CrearReceta">Crear Receta</Nav.Link>
              <Nav.Link as={Link} to="./AnularReceta">Anular Receta</Nav.Link>
            </>
          )}
          {userType === 'Paciente' && (
            <>
              <Nav.Link as={Link} to="./LandingPaciente">Página Principal</Nav.Link>
              <Nav.Link as={Link} to="./VerRecetas">Ver Recetas</Nav.Link>
            </>
          )}
        </Nav>
        <div className="ms-auto">
          <Button variant="outline-light" onClick={handleLogout}>Cerrar Sesión</Button>
        </div>
          </Navbar>
      </div>
      <div className="content">
      <Routes>
       userType === 'Farmaceutico' ? (
        <>
        <Route path="LandingFarmaceutico" element={<LandingFarmaceutico />} />
        <Route path="AceptarReceta" element={<AceptarReceta />} />
        
      </>
      )
      : userType === 'Medico' ? (
        <>
          <Route path="LandingMedico" element={<LandingMedico />} />
          <Route path="CrearReceta" element={<CrearReceta />} />
          <Route path="AnularReceta" element={<AnularReceta />} />

        </>
      )
      : userType === 'Paciente' ? (
        <>
          <Route path="LandingPaciente" element={<LandingPaciente />} />
          <Route path="VerRecetas" element={<VerRecetas />} />

        </>
      )
    </Routes>
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
