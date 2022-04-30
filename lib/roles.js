
 const mysql = require('mysql2/promise');

async function getRoles() {
       
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

    const sql = `SELECT 
                        r.id AS Id,
                        r.title AS Title,
                        r.salary AS Salary,
                        d.name AS Department
                   FROM roles r
                   LEFT JOIN departments d
                   ON r.department_id = d.id`;

    const [roles, fields]  = await db.execute(sql);

    db.end();

    return roles;

} 

module.exports = getRoles;