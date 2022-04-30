const chalk = require('chalk');
const clear = require('clear');
const figlet = require('figlet');


const { example1 } = require("./lib/roles");

const menu = require('./lib/inquirer');

const console = require('console');
  

console.log(
    chalk.yellow(
        figlet.textSync('EMPLOYEE MANAGER', { width: 50,  verticalLayout: 'default' })
      )
);



function consoleTable(data) {
    const cTable = require('console.table');
    const table = cTable.getTable(data);
    console.log(table);
}

async function getDepartments () {
    const mysql = require('mysql2/promise');
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

async function getRoles() {
    
    const mysql = require('mysql2/promise');
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
    
   // console.table(roles);

   consoleTable(roles)

    db.end();

}
 

//getRoles ()
//menu();


const inquirer = require("inquirer");

function menuStart() {
    
    const menu = [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add Department",
        "Add Role",
        "Add Employee",
        "Update Employee Role",
        "Update Employee Manager",
        "View All Employees By Manager",
        "View All Employees By Department",
        "Delete Department",
        "Delete Role",
        "Delete Employee",
        "Exit"
    ];

    inquirer.prompt(
        {
            type: "list",
            name: "menu",
            message: "What would you like to do?",
            choices: menu
        }).then(answers => {
            switch (answers.menu) {
                case 'View All Departments':
                    getDepartments().
                        then(departments => { consoleTable(departments); menuStart()   });
                     
                    break;
            }

        
            console.log(answers.menu)
            
        })
            .catch(err => {
                console.log(err);
            });

}
menuStart();