import { React, useState, useRef } from 'react';
import './AnularReceta.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Alert, TextField } from '@mui/material';
import VentanaModal from './VentanaModal';
import Receta from '../Models/Receta';
import Paciente from '../Models/Paciente';

const AnularReceta =() => {
	const [datosPaciente, setDatosPaciente] = useState({});
	const [datosReceta, setDatosReceta] = useState({});
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [dataFound, setDataFound] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    let modalExito = useRef(false);
    let modalMensaje = useRef('');

    const handleClick = (row) => {
    	setFilaSeleccionada(row); 
    };
    
    // busca la receta por el código de barras
    const handleSearch = () => {
        fetch(`/receta/${document.getElementById('input').value}`)
        .then(response => response.json())
        .then(data => {
            setDatosPaciente(new Paciente(data[0].dni,data[0].nom_paciente,data[0].obra_social,data[0].nro_afiliado));
            setDatosReceta(new Receta(data[0].nro_receta,new Date(data[0].fecha_emision).toLocaleDateString('es-AR'),data[0].codigo_barras,data[0].dni,data[0].matricula,data[0].estado));
            setDataFound(true);
            setErrorMessage('');
        })
        .catch(err => {
           setDataFound(false);
           setErrorMessage(<Alert severity="error" variant='filled' sx={{margin: '10px', width: 'fit-content'}}>No se encontraron datos</Alert>);
        });
    };
    
	// maneja la anulación de la receta
	const handleAnular = () => {
        if(datosReceta.Estado === 'Activa') {
            fetch(`/receta-anular/${datosReceta.NumeroReceta}`)
            .then(response => {
            	modalExito.current = true;
            	modalMensaje.current = `Receta Nro. ${datosReceta.NumeroReceta} - Código ${datosReceta.CodigoBarra} ANULADA`;
            	setModalOpen(true);
                // limpia las tablas
                setDatosPaciente({});
                setDatosReceta({});
            })
            .catch(err => alert('Error de conexión con la BD'));
        }
        else {
        	modalExito.current = false;
        	modalMensaje.current = 'Sólo se pueden anular recetas activas';
        	setModalOpen(true);
        }
	}
	
	const handleCerrarModal = () => setModalOpen(false);

    return (
        <div className='contentAnularReceta'>
        <h1>Anular Receta</h1>
        <div className='botonesSuperiores'>
            <h6>Búsqueda de Recetas</h6>
                <TextField id='input' style={{ marginLeft: '10px' }} label='Ingrese el código de barras'/>
                <Button variant="contained" style={{ marginLeft: '10px' }} onClick={handleSearch}>Buscar</Button>
        </div>
        {errorMessage}
            <div className='listadoTable'>
                <TableContainer className='listadoPacienteTable' component={Paper} style={{ flex: 2 }}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4} variant='head'>Paciente</TableCell>
                            </TableRow>                            
                            <TableRow>
                                <TableCell>Apellido y Nombre</TableCell>
                                <TableCell>DNI</TableCell>
                                <TableCell>Obra Social</TableCell>
                                <TableCell>Número de Afiliado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            <TableRow
                                key={datosPaciente.DNI}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >                                
                                <TableCell >{datosPaciente.ApellidoNombre}</TableCell>
                                <TableCell >{datosPaciente.DNI}</TableCell>                                
                                <TableCell >{datosPaciente.ObraSocial}</TableCell>
                                <TableCell >{datosPaciente.NumeroSocio}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer className='listadoRecetasTable' component={Paper} style={{ flex: 2 }}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4} variant='head'>Receta</TableCell>
                            </TableRow>                            
                            <TableRow>
                                <TableCell>Número de Receta</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>DNI</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            <TableRow
                                key={datosReceta.NumeroReceta}
                                onClick={() => handleClick(datosReceta)}
                                selected={filaSeleccionada === datosReceta}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >                                
                                <TableCell >{datosReceta.NumeroReceta}</TableCell>
                                <TableCell >{datosReceta.Fecha}</TableCell>
                                <TableCell >{datosReceta.DNI}</TableCell>
                                <TableCell >{datosReceta.Estado}</TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '30px'}}>
            	<Button id='anularRecetaButton' variant='contained' color='error' onClick={handleAnular}>Anular Receta</Button>
        	</div>
        	<VentanaModal abierta={modalOpen} exito={modalExito.current} mensaje={modalMensaje.current} onCloseModal={handleCerrarModal} />
        </div>
    );
};

export default AnularReceta;
