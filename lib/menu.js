const inquirer = require("inquirer");

const getRoles  = require("./roles");
const { getDepartments, setDepartments } = require("./departments");
const { getEmployees, setEmployee }  = require("./Employees");
const consoleTable = require("./functions");

function addEmp() {

    inquirer.prompt(
        {
            type: "input",
            name: "department",
            message: "What department would you like to add?",
        }).then(answers => {
            setDepartments(answers.department);
            menuStart()
        })
            .catch(err => {
                console.log(err);
            });    
}

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
                        then(departments => {
                            consoleTable(departments);
                            menuStart();
                        });                    
                    break;
                case 'View All Roles':
                    getRoles().
                        then(roles => {
                            consoleTable(roles);
                            menuStart();
                        });                    
                    break;
                 case 'View All Employees':
                    getEmployees().
                        then(employees => {
                            consoleTable(employees);
                            menuStart();
                        });                    
                    break;
                case 'Add Department':
                    addEmp();
                    break;
        }
        })
            .catch(err => {
                console.log(err);
            });

}

module.exports = menuStart;