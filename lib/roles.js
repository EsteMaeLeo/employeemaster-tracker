
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



async function setRole(roleData) {
        
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

    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?,?,?)`;

    try {    
        const [roles, fields]  = await db.execute(sql, [ roleData.title, roleData.salary, roleData.department_id ]);

        db.end();

        return roles;
      } catch (err) {
        console.log(err);
        db.end();
        return
      } 



} 

module.exports = {
    getRoles,
    setRole,
}