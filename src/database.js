const mysql = require('mysql');

const connection = mysql.createConnection({
  host: '',
  user: 'kacc',
  password: 'dellfF9930;',
  database: 'kacc',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database!');
  }
});

module.exports = connection;
