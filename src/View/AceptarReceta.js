import React, {useState} from 'react';
import './AceptarReceta.css';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Button, Typography } from '@mui/material';
const AceptarReceta =() => {
    const [dataFound, setDataFound] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    
    const handleSearch = () => {
        // Simula una búsqueda de datos
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
        // Simula una llamada a una API o una búsqueda de datos
        // Retorna un array vacío si no se encuentran datos
        return [];
    };
    return (
    <div className='content'>
        <h1>Aceptar Receta</h1>
        <div className='title'>
        <div className='PanelSuperior'>
                <h6>Codigo de Barras</h6>
                
                <input style={{'marginLeft': '10px'}} placeholder='Codigo de Barras'></input>
                <Button variant="contained">Buscar</Button>
                
                </div>
        </div>
        {errorMessage && (
                <Typography color="error">{errorMessage}</Typography>
            )}
            
        <div className={`table ${!dataFound ? 'disabled' : ''}`}>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                    <TableHead>
                        <TableRow>
                            <TableCell> Medicamento </TableCell>
                            <TableCell align="right">Nombre</TableCell>
                            <TableCell align="right">Laboratorio</TableCell>
                            <TableCell align="right">Dosis</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {/* Aquí puedes mapear los datos encontrados */}
                    </TableBody>
                </Table>
            </TableContainer>
            <div>

            <button variant="contained" disabled={!dataFound}>Aceptar</button>
            </div>
            
        </div>                       
                    
    </div>
    );
};
export default AceptarReceta;