/* eslint-disable jsx-a11y/anchor-is-valid */
// Home.js
import React from 'react';
import { Route, Routes, Link, useNavigate } from 'react-router-dom';
import { Navbar, Nav, Button } from 'react-bootstrap';
import AceptarReceta from './AceptarReceta';
import LandingFarmaceutico from './LandingFarmaceutico';
import LandingPaciente from './LandingPaciente';
import LandingMedico from './LandingMedico';
import CrearReceta from './CrearReceta';
import AnularReceta from './AnularReceta';
import { useUser } from '../Controller/UserContext';
import VerRecetas from './VerRecetas';
const Home = () => {
  const navigate = useNavigate();
  const { userType } = useUser();
  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div  className="home-container">
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
    {userType === 'Farmaceutico' && (
      <>
        <Route path="LandingFarmaceutico" element={<LandingFarmaceutico />} />
        <Route path="AceptarReceta" element={<AceptarReceta />} />
        {/* Agrega aquí las demás rutas específicas para 'Farmaceutico' */}
      </>
    )}
    {userType === 'Medico' && (
      <>
        <Route path="LandingMedico" element={<LandingMedico />} />
        <Route path="CrearReceta" element={<CrearReceta />} />
        <Route path="AnularReceta" element={<AnularReceta />} />
        {/* Agrega aquí las demás rutas específicas para 'Medico' */}
      </>
    )}
    {userType === 'Paciente' && (
      <>
        <Route path="LandingPaciente" element={<LandingPaciente />} />
        <Route path="VerRecetas" element={<VerRecetas />} />
        {/* Agrega aquí las demás rutas específicas para 'Paciente' */}
      </>
    )}
  </Routes>
</div>

      <footer className='bg-dark text-light'>
      <div className="row">


      
    </div>
    <div>
      <div className="d-flex flex-column flex-sm-row justify-content-between py-4 my-4 border-top">
        <p>© Creado para la asignatura Ingenieria Web de la Carrera Licenciatura en Sistemas de Información del año 2024</p>
        <ul className="list-unstyled d-flex">
          <li className="ms-3">
            <a className="link-body-emphasis" href="#">
              <svg className="bi" width="24" height="24">
                <use href="#twitter" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="link-body-emphasis" href="#">
              <svg className="bi" width="24" height="24">
                <use href="#instagram" />
              </svg>
            </a>
          </li>
          <li className="ms-3">
            <a className="link-body-emphasis" href="#">
              <svg className="bi" width="24" height="24">
                <use href="#facebook" />
              </svg>
            </a>
          </li>
        </ul>
      </div>
    </div>
      </footer>
    </div>
  );
};

export default Home;
