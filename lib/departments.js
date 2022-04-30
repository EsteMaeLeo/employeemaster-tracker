
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
        console.log('connected to the election database.')
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
      } 



} 

module.exports = {
    getDepartments,
    setDepartments,
};