
 const mysql = require('mysql2/promise');

 //async call to get the list of employees
 async function getEmployees() {
        
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
                         e.id AS Id,
                         CONCAT (e.first_name, " ", e.last_name) AS Name,
                         r.title AS Role,
                         CONCAT (m.first_name, " ", m.last_name) AS manager 
                    FROM employees e
                    LEFT JOIN roles r
                    ON e.role_id = r.id
                    LEFT JOIN employees m
                    ON e.manager_id= m.id`;
 
     const [employee, fields]  = await db.execute(sql);
 
     db.end();
 
     return employee;
 
} 
 
async function setEmployee() {
        
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

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?)`;

    const [employee, fields]  = await db.execute(sql);

    db.end();

    return employee;

} 
 
module.exports = {
    getEmployees,
    setEmployee,
};