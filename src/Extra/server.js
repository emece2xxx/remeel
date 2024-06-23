// Importamos módulos requeridos
require('dotenv').config();
const express = require('express');
const app = express();
const conn = require('./db');

// Con este método codificamos la carga útil de HTTP en formato JSON
app.use(express.json());

// *** ENDPOINTS ***
// Envía credenciales de usuario al servidor y espera id y tipo de usuario
app.post('/login', async (req,resp) => {
	try {
		const consulta = "SELECT id_usuario, tipo FROM usuario WHERE nombre = ? AND ? = pwd";
		const db = await conn.getConn();
		const data = await db.query(consulta,[req.body.nombre,req.body.pwd]);
		db.end();
		return resp.json(data);
	} catch(err) {
		throw err;
	}
});

// Obtiene registro de medico según id de usuario
app.get('/usuario-medico/:id', async (req,resp) => {
	try {
		const consulta = "SELECT * FROM medico WHERE id_usuario = ?";
		const db = await conn.getConn();
		const data = await db.query(consulta,[req.params.id]);
		db.end();
		return resp.json(data);
	} catch(err) {
		throw err;
	}
});

// Obtiene registro de paciente según id de usuario
app.get('/usuario-paciente/:id', async (req,resp) => {
	try {
		const consulta = "SELECT * FROM paciente WHERE id_usuario = ?";
		const db = await conn.getConn();
		const data = await db.query(consulta,[req.params.id]);
		db.end();
		return resp.json(data);
	} catch(err) {
		throw err;
	}
});

// Obtiene registro de farmaceutico según id de usuario
app.get('/usuario-farmaceutico/:id', async (req,resp) => {
	try {
		const consulta = "SELECT * FROM farmaceutico WHERE id_usuario = ?";
		const db = await conn.getConn();
		const data = await db.query(consulta,[req.params.id]);
		db.end();
		return resp.json(data);
	} catch(err) {
		throw err;
	}
});

/* EN PRINCIPIO ESTE ENDPOINT YA NO SE USARÍA
// Obtiene listado de recetas según matrícula de médico
app.get('/receta-medico/:mat', async (req,resp) => {
	try {
		const consulta = "SELECT nro_receta,apellido_nombre,fecha_emision,estado FROM receta JOIN paciente ON dni_paciente = dni WHERE matricula_med = ?";
		const db = await conn.getConn();
		const data = await db.query(consulta,[req.params.mat]);
		db.end();
		return resp.json(data);
	} catch(err) {
		throw err;
	}
});*/

// Obtiene registro de un paciente por dni
app.get('/paciente/:dni', async (req,resp) => {
	try {
		const consulta = "SELECT * FROM paciente WHERE dni = ?";
		const db = await conn.getConn();
		const data = await db.query(consulta,[req.params.dni]);
		db.end();
		return resp.json(data);
	} catch(err) {
		throw err;
	}
});

/*

ESTE MÉTODO NO SÉ SI ES DE UTILIDAD, YA VEREMOS

*/
// Obtiene registro de un encabezado de receta según código de barras
app.get('/receta-enc/:cod', async (req,resp) => {
  	try {
		const consulta = "SELECT * FROM receta WHERE codigo_barras = ?";
    	        const db = await conn.getConn();
    	        const data = await db.query(consulta,[req.params.cod]);
    	        db.end();
    	        return resp.json(data);
  	} catch(err) {
    	throw err;
  	}
});

// Obtiene listado de medicamentos
app.get('/medicam', async (req,resp) => {
	try {
		const consulta = "SELECT * FROM medicamento";
		const db = await conn.getConn();
		const data = await db.query(consulta);
		db.end();
		return resp.json(data);
	} catch(err) {
		throw err;
	}
});

// Inserta una nueva receta y obtiene id y código de barras de la nueva receta
app.post('/receta-nueva', async (req,resp) => {
  try {
    const string1 = req.body.detalle.map(item => `(LAST_INSERT_ID(),${item.codigo},${item.cantidad})`).toString();
    const consulta1 = "INSERT INTO receta(codigo_barras,fecha_emision,estado,matricula_med,dni_paciente) VALUES (9000000000000+floor(rand()*1000000000000),?,1,?,?)";
    const consulta2 = `INSERT INTO receta_medicamento VALUES ${string1}`;
    const consulta3 = "SELECT nro_receta,CAST(codigo_barras AS CHAR) AS codigo_barras FROM receta WHERE nro_receta=LAST_INSERT_ID()";
    const db = await conn.getConn();
    await db.query(consulta1,[req.body.fecha_emision,req.body.matricula_med,req.body.dni_paciente]);
    await db.query(consulta2);
    const data = await db.query(consulta3);
    db.end();
    return resp.json(data);
  } catch(err) {
      throw err;
  }
});

// Anula una receta según nro. de receta
app.get('/receta-anular/:nro', async (req,resp) => {
	try {
		const consulta = "UPDATE receta SET estado = 4 WHERE nro_receta = ?";
		const db = await conn.getConn();
		await db.query(consulta,[req.params.nro]);
		db.end();
		return resp.json();
	} catch(err) {
		throw err;
	}
});

// Obtiene listado de recetas según dni del paciente
app.get('/receta-paciente/:dni', async (req,resp) => {
	try {
		const consulta = "SELECT nro_receta,CAST(codigo_barras AS CHAR) AS codigo_barras,apellido_nombre,fecha_emision,estado FROM receta JOIN medico ON matricula_med = matricula WHERE dni_paciente = ?";
		const db = await conn.getConn();
		const data = await db.query(consulta,[req.params.dni]);
		db.end();
		return resp.json(data);
	} catch(err) {
		throw err;
	}
});

// Obtiene registro de receta completa (encabezado + detalle) según el código de barras
app.get('/receta/:cod', async (req,resp) => {
	try {
		const consulta = "SELECT nro_receta,CAST(codigo_barras AS CHAR) AS codigo_barras,fecha_emision,estado,matricula,nom_medico,especialidad,dni,nom_paciente,obra_social,nro_afiliado,cod_medicamento,nombre,laboratorio,dosis,cantidad FROM receta_completa WHERE codigo_barras = ?";
		const db = await conn.getConn();
		const data = await db.query(consulta,[req.params.cod]);
		db.end();
		return resp.json(data);
	} catch(err) {
		throw err;
	}
});

// Acepta una receta según su nro. de receta
app.get('/receta-usar/:nro', async (req,resp) => {
	try {
		const consulta = "UPDATE receta SET estado = 2 WHERE nro_receta = ?";
		const db = await conn.getConn();
		await db.query(consulta,[req.params.nro]);
		db.end();
		return resp.json();
	} catch(err) {
		throw err;
	}
});

// *** ACTIVAMOS EL SERVIDOR ***
const port = process.env.PORT;
app.listen(port, () => {
	console.log("Servidor ejecutándose en puerto " + port);
});
