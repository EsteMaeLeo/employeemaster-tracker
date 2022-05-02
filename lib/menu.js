const inquirer = require("inquirer");

const { getRoles, setRole }  = require("./roles");
const { getDepartments, setDepartments } = require("./departments");
const { getEmployees, setEmployee, getEmpSync }  = require("./Employees");
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
                    message: "What is the department of the role?",
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

function mapEmp(employees) {
       
    getEmployees().
        then(employees => {
            console.log(employees);
            const newManager = employees.map(function (employee) {
                //the select query rename AS NAME concatenate the nambre and last name
                return employee.Name;
            })
            console.log(newManager);
        });
}

function addEmployee() {

   // mapEmp();
    
    getEmployees().
        then(employees => {

            //console.log(employees);
            const newManager = employees.map(function (employee) {
                //the select query rename AS NAME concatenate the nambre and last name
                return employee.Name;
            })
            //console.log(newManager);

             getRoles().
                 then(roles => {
                    
                   // console.log(roles);
                    const newRoles = roles.map(function (role) {
                        //the select query rename AS NAME concatenate the nambre and last name
                        return role.Title;
                    })
                    //console.log(newRoles);
                    
                    inquirer.prompt([
                        {
                            type: "input",
                            name: "first_name",
                            message: "What is the first name of the employee?",
                        },
                        {
                            type: "input",
                            name: "last_name",
                            message: "What is the last name of the employee?",
                        },
                        {
                            type: "list",
                            name: "roles_id",
                            choices: newRoles,
                            message: "What is the employee's role?",
                        },
                        {
                            type: "list",
                            name: "manager_id",
                            choices: newManager,
                            message: "What is the employee's manager?",
                        },
                    ]).then(answers => {

                        //find the register of the roles
                        const roleFind = roles.find(function (role) {
                            return role.Title === answers.roles_id;
                        });

                        const mangerFind = employees.find(function (employee) {
                            return employee.Name === answers.manager_id;
                        });
                        //console.log(roleFind);
                        //console.log(mangerFind);
                        const strEmployee = {
   
                            first_name : answers.first_name,
                            last_name : answers.last_name,
                            role_id: roleFind.Id,
                            manager_id: mangerFind.Id
                        }
                        //console.log(strEmployee);
                        setEmployee(strEmployee);
                        console.log("Employee added: " + strEmployee.first_name + " " + strEmployee.last_name);
                       menuStart()
                    })
                        .catch(err => {
                            console.log(err);
                        });
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
                case 'Add Employee':
                    addEmployee();
                    break;
        }
        })
            .catch(err => {
                console.log(err);
            });

}

module.exports = menuStart;