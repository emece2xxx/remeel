import React from 'react';
import iconoExito from '../Assets/success.svg';
import iconoError from '../Assets/error.svg';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';

const VentanaModal = (props) => {
	const handleClose = () => props.onCloseModal();

	return (
		<Dialog open={props.abierta} onClose={handleClose}>
        	<DialogTitle>
          			<img src={props.exito ? iconoExito : iconoError} width='50' height='50' />{props.exito ? ' AVISO':' ERROR'}
        	</DialogTitle>
        	<DialogContent>
          		<DialogContentText>
            		{props.mensaje}
          		</DialogContentText>
        	</DialogContent>
        	<DialogActions>
          		<Button onClick={handleClose} autoFocus>Cerrar</Button>
        	</DialogActions>
      	</Dialog>
	)
}

export default VentanaModal;
