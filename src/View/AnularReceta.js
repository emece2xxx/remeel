import React, {useState} from 'react';
import './AnularReceta.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, TextField } from '@mui/material';
import Receta from '../Models/Receta';
import Paciente from '../Models/Paciente';

const datosReceta = [
    new Receta(2333,"12/12/2012",666,11222333,12,'Activa'),
    new Receta(2334,"10/10/2010",12333,11222333,12,'Invalida')
];
const datosPaciente =[
    new Paciente(11222333,'Mastropiero','Johann Sebastian','Sancor',111222)
];

const AnularReceta =() => {
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [dataFound, setDataFound] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleClick = (row) => {
    setFilaSeleccionada(row); 
    };
    const handleSearch = () => {

        const data = fetchData();

        if (data.length > 0) {
            setDataFound(true);
            setErrorMessage('');
        } else {
            setDataFound(false);
            setErrorMessage('No se encontraron datos');
        }
    };
    const fetchData = () => {

        return [];
    };
    return (
        <div className='contentAnularReceta'>
        <h1>Anular Receta</h1>
        <div className='botonesSuperiores'>
            <h6>Busqueda de Recetas</h6>
                <TextField id='input' variant='filled' label='Ingrese el codigo de barras'/>
                <Button variant="contained" style={{ marginLeft: '10px' }}>Buscar</Button>
                <Button variant="contained" color="error" style={{marginLeft: 'auto'}}> Anular Receta</Button>
        </div>
            <div className='listadoTable'>
                <TableContainer className='listadoPacienteTable' component={Paper} style={{ flex: 1 }}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={4} variant='head'>Paciente</TableCell>
                            </TableRow>                            
                            <TableRow>
                                <TableCell>Nombre y Apellido</TableCell>
                                <TableCell>DNI</TableCell>
                                <TableCell>Obra Social</TableCell>
                                <TableCell>Numero Afiliado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {datosPaciente.map((row) => (
                            <TableRow
                                key={row.DNI}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >                                
                                <TableCell >{row.Apellido +' ' + row.Nombre}</TableCell>
                                <TableCell >{row.DNI}</TableCell>                                
                                <TableCell >{row.ObraSocial}</TableCell>
                                <TableCell >{row.NumeroSocio}</TableCell>
                            </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TableContainer className='listadoRecetasTable' component={Paper} style={{ flex: 3 }}>
                    <Table aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={5} variant='head'>Receta</TableCell>
                            </TableRow>                            
                            <TableRow>
                                <TableCell>Numero de Receta</TableCell>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Codigo de Barra</TableCell>
                                <TableCell>DNI</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody >
                            {datosReceta.map((row) => (
                            <TableRow
                                key={row.NumeroReceta}
                                onClick={() => handleClick(row)}
                                selected={filaSeleccionada === row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >                                
                                <TableCell >{row.NumeroReceta}</TableCell>
                                <TableCell >{row.Fecha}</TableCell>                                
                                <TableCell >{row.CodigoBarra}</TableCell>
                                <TableCell >{row.DNI}</TableCell>
                                <TableCell >{row.Estado}</TableCell>
                            </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};
export default AnularReceta;