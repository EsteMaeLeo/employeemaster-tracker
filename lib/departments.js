
const mysql = require('mysql2/promise');

async function getDepartments() {
    
    // get the promise implementation, we will use bluebird
    const bluebird = require('bluebird');
    const db = await mysql.createConnection(
            {
                host: 'localhost',
                user: 'root',
                password: 'Sql2022',
                database: 'employee_tracker',
                Promise: bluebird
            },
            console.log('connected to the election database.')
        );

    const sql = `SELECT * FROM departments`;
    
    const [departments, fields]  = await db.execute(sql);
    
    db.end();
  
    return departments;

}

module.exports = getDepartments;