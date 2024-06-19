import React,{useState} from 'react';
import './VerRecetas.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography, TextField } from '@mui/material';
import Medicamento from '../Models/Medicamento';
import Receta from '../Models/Receta';
import { LocalizationProvider, DatePicker } from '@mui/x-date-pickers';
import {AdapterDateFns} from '@mui/x-date-pickers/AdapterDateFns';


const datosReceta = [
    new Receta(2333,"12/12/2012",666,11222333,12,'Activa'),
    new Receta(2334,"10/10/2010",12333,11222333,12,'Invalida')
]

const VerRecetas =() => {
    const [filaSeleccionada, setFilaSeleccionada] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const handleDateChange = (date) => {
    setSelectedDate(date);    
  };
  const handleClick = (row) => {
    setFilaSeleccionada(row); 
    };

    return (

        <div className='contentVerRecetas' >  
        <Typography variant="h3" align="center" className="MuiTypography-h1">Ver Recetas</Typography>

            <div className='botonesSuperiores'>
            <h6>Busqueda de Recetas</h6>                
            <LocalizationProvider dateAdapter={AdapterDateFns}>
          <DatePicker
            label="Seleccione la fecha"
            value={selectedDate}
            onChange={handleDateChange}
            format="dd/MM/AAAA"
            inputFormat="dd/MM/AAAA"
            locale="es-ES"
            renderInput={(params) => <TextField {...params} style={{ marginLeft: '10px' }} />}
          />
            </LocalizationProvider>
                <Button variant="contained" style={{ marginLeft: '10px' }}>Buscar</Button>
                <Button variant="contained" style={{ marginLeft: '10px' }}>Traer Todas las Recetas</Button>
                <Button variant="contained" style={{ marginLeft: '10px' }}>Solo las validas</Button>
                <Button variant="contained" style={{ marginLeft: '10px' }}>Solo invalidas</Button>
                <Button variant="contained" color="success" style={{marginLeft: 'auto'}}> Ver Receta</Button>
            </div>
            <div className='listadoRecetasTable'>
            <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 200 }} aria-label='simple table'>
                        <TableHead>
                            <TableRow>
                                <TableCell colSpan={5} variant='head' >Receta</TableCell>
                            </TableRow>
                            <TableRow>                                                         
                                <TableCell>Numero de Receta</TableCell>
                                <TableCell>Fecha DD/MM/AAAA</TableCell>
                                <TableCell>Codigo de Barra</TableCell>
                                <TableCell>Numero de Matricula Profesional</TableCell>
                                <TableCell>Estado</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                        {datosReceta.map((row) => (
                            <TableRow
                                key={row.NumeroReceta}
                                onClick={() => handleClick(row)}
                                selected={filaSeleccionada === row}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                            >                        
                                <TableCell >{row.NumeroReceta}</TableCell>
                                <TableCell >{row.Fecha}</TableCell>                                                                
                                <TableCell>{row.CodigoBarra}</TableCell>
                                <TableCell>{row.MPMedico}</TableCell>
                                <TableCell>{row.Estado}</TableCell>
                            </TableRow> 
                            ))}
                        </TableBody>
                    </Table>
            </TableContainer>
            </div>
            
        </div>

    );
};
export default VerRecetas;