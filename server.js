const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');




const menuStart = require('./lib/menu');

const console = require('console');
  

console.log(
    chalk.yellow(
        figlet.textSync('EMPLOYEE MANAGER', { width: 50,  verticalLayout: 'default' })
      )
);



// function consoleTable(data) {
//     const cTable = require('console.table');
//     const table = cTable.getTable(data);
//     console.log(table);
// }


// async function getRoles() {
    
//     const mysql = require('mysql2/promise');
//     // get the promise implementation, we will use bluebird
//     const bluebird = require('bluebird');
//     const db = await mysql.createConnection(
//         {
//             host: 'localhost',
//             user: 'root',
//             password: 'Sql2022',
//             database: 'employee_tracker',
//             Promise: bluebird
//         },
//         console.log('connected to the election database.')
//     );

//     const sql = `SELECT 
//                         r.id AS Id,
//                         r.title AS Title,
//                         r.salary AS Salary,
//                         d.name AS Department
//                    FROM roles r
//                    LEFT JOIN departments d
//                    ON r.department_id = d.id`;

//     const [roles, fields]  = await db.execute(sql);
    
//    // console.table(roles);

//    consoleTable(roles)

//     db.end();

// }
 


menuStart();