require('dotenv').config();
const mariadb = require('mariadb');
const pool = mariadb.createPool({
	host: process.env.MARIADB_HOST,
	user: process.env.MARIADB_USER,
	password: process.env.MARIADB_PASSWORD,
	database: process.env.MARIADB_DB
});

async function getConn() {
	try {
		const connection = await pool.getConnection();
		return connection;
	} catch(err) {
		console.log('Se produjo el error ' + err);
	}
}

module.exports = { getConn };
