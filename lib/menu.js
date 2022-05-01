const inquirer = require("inquirer");

const { getRoles, setRole }  = require("./roles");
const { getDepartments, setDepartments } = require("./departments");
const { getEmployees, setEmployee }  = require("./Employees");
const consoleTable = require("./functions");

function addDepartment() {

    inquirer.prompt(
        {
            type: "input",
            name: "department",
            message: "What department would you like to add?",
        }).then(answers => {
            setDepartments(answers.department);
            console.log("Department added: " + answers.department);
            menuStart()
        })
        .catch(err => {
            console.log(err);
        });    
}

function addRole() {

  
    getDepartments().
        then(departments => {

            const listDepartments = departments;
            inquirer.prompt([
                {
                    type: "input",
                    name: "title",
                    message: "What is the name of the role?",
                },
                {
                    type: "input",
                    name: "salary",
                    message: "What is the salary of the role?",
                },
                {
                    type: "list",
                    name: "department_id",
                    choices: listDepartments,
                    message: "What is the salary of the role?",
                },
            ]).then(answers => {

                //find the register of the department
                const departmentFind = listDepartments.find(function(department) {
                    return department.name === answers.department_id;
                });
 
                const strRole = {
                    title : answers.title,
                    salary : answers.salary,
                    department_id : departmentFind.id
                }

                setRole(strRole);
                console.log("Role added: " + strRole.title);
                menuStart()
                })
                .catch(err => {
                        console.log(err);
                });    
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
                    addDepartment();
                    break;
                case 'Add Role':
                    addRole();
                    break;
        }
        })
            .catch(err => {
                console.log(err);
            });

}

module.exports = menuStart;