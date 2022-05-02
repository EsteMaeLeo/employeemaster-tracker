
const mysql = require('mysql2/promise');
const db = require('../db/connection');

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
         //console.log('connected to the election database.')
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

async function getEmployeesManager(managerId) {
        
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
        //console.log('connected to the election database.')
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
                   ON e.manager_id= m.id
                   WHERE e.manager_id = ?`;

    // const [employee, fields]  = await db.execute(sql);

    // db.end();

    // return employee;
    try {    
        const [employee, fields]  = await db.execute(sql, [ managerId ]);

        db.end();

        return employee;
      } catch (err) {
        console.log(err);
        db.end();
        return
      } 

} 


//regular call to get the list of employees
function getEmpSync() {
        
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
    
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log(rows);
        console.log("LIST********");
        return rows;
    });
} 
 
async function setEmployee(employeeData) {
        
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
    );

    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?,?,?,?)`;

    try {    
        const [employee, fields]  = await db.execute(sql, [ employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id ]);

        db.end();

        return employee;
      } catch (err) {
        console.log(err);
        db.end();
        return
      } 
} 


async function updateEmployeeRole(employeeData) {
        
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
    );

    const sql = `UPDATE employees SET role_id = ?
                 WHERE id = ?`;

    try {    
        const [employee, fields]  = await db.execute(sql, [ employeeData.role_id, employeeData.id ]);

        db.end();

        return ;
      } catch (err) {
        console.log(err);
        db.end();
        return
      } 
} 

async function updateEmployeeManager(employeeData) {
        
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
    );

    const sql = `UPDATE employees SET manager_id = ?
                 WHERE id = ?`;

    try {    
        const [employee, fields]  = await db.execute(sql, [ employeeData.manager_id, employeeData.id ]);

        db.end();

        return ;
      } catch (err) {
        console.log(err);
        db.end();
        return
      } 
} 

module.exports = {
    getEmployees,
    setEmployee,
    getEmpSync,
    updateEmployeeRole,
    updateEmployeeManager,
    getEmployeesManager,
};