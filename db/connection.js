const mysql = require('mysql2');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'Sql2022',
        database: 'employee_tracker'
    },
    console.log('connected to the EmployeeTracker database.')
);

module.exports = db;