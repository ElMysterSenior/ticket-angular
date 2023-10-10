const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Asegúrate de poner tu usuario de MySQL aquí
  password: '', // Asegúrate de poner tu contraseña de MySQL aquí
  database: 'TramitesDB'
});

class Solicitud {
  static fetchAll(callback) {
    connection.query('SELECT * FROM Solicitudes', callback);
  }

  static findById(id, callback) {
    connection.query('SELECT * FROM Solicitudes WHERE id = ?', [id], callback);
  }

  static create(data, callback) {
    const query = 'INSERT INTO Solicitudes (nombreCompleto, curp, nombre, paterno, materno, nivel, municipio, tema) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    connection.query(query, [data.nombreCompleto, data.curp, data.nombre, data.paterno, data.materno, data.nivel, data.municipio, data.tema], callback);
  }

  static update(id, data, callback) {
    const query = 'UPDATE Solicitudes SET nombreCompleto = ?, curp = ?, nombre = ?, paterno = ?, materno = ?, nivel = ?, municipio = ?, tema = ? WHERE id = ?';
    connection.query(query, [data.nombreCompleto, data.curp, data.nombre, data.paterno, data.materno, data.nivel, data.municipio, data.tema, id], callback);
  }

  static delete(id, callback) {
    connection.query('DELETE FROM Solicitudes WHERE id = ?', [id], callback);
  }
}

module.exports = Solicitud;
