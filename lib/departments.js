
const mysql = require('mysql2/promise');

//async function to get the list of departments
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
        );

    const sql = `SELECT * FROM departments`;
    
    const [departments, fields]  = await db.execute(sql);
    
    db.end();
  
    return departments;

}

async function setDepartments(department) {
        
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

    const sql = `INSERT INTO departments (name)
    VALUES (?)`;

    try {
        const [departments, fields] = await db.execute(sql, [department]);
        db.end();
        console.log('Department: ' + department + ' Inserted');
        return departments;
      } catch (err) {
        console.log(err);
        db.end();
        return
      } 
} 

async function deleteDepartments(departmentsId) {
        
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

    const sql = `DELETE FROM departments WHERE id = ?`;

    try {    
        const [employee, fields]  = await db.execute(sql, [ departmentsId ]);

        db.end();

        return ;
      } catch (err) {
        console.log(err);
        db.end();
        return
      } 
} 

module.exports = {
    getDepartments,
    setDepartments,
    deleteDepartments,
};