const inquirer = require("inquirer");

const { getRoles, setRole }  = require("./roles");
const { getDepartments, setDepartments } = require("./departments");
const { getEmployees,
        setEmployee,
        getEmpSync,
        updateEmployeeRole,
        updateEmployeeManager,
        getEmployeesManager,
        getEmployeesDepartment,
        deleteEmployee } = require("./Employees");
        
const consoleTable = require("./functions");

function addDepartment() {

    inquirer.prompt(
        {
            type: "input",
            name: "department",
            message: "What department would you like to add?",
        }).then(answers => {
            setDepartments(answers.department);
            console.log("Department added!");
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

function addEmployee() {


    getEmployees().
        then(employees => {

            //console.log(employees);
            const newManager = employees.map(function (employee) {
                //the select query rename AS NAME concatenate the nambre and last name
                return employee.Name;
            })

             getRoles().
                 then(roles => {
                    
                    const newRoles = roles.map(function (role) {
                        //the select query rename AS NAME concatenate the nambre and last name
                        return role.Title;
                    })
                    
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
;
                        const strEmployee = {
   
                            first_name : answers.first_name,
                            last_name : answers.last_name,
                            role_id: roleFind.Id,
                            manager_id: mangerFind.Id
                        }

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

function updateEmployeeByRole() {

    getEmployees().
        then(employees => {

            const newEmployees = employees.map(function (employee) {
                //the select query rename AS NAME concatenate the nambre and last name
                return employee.Name;
            })

             getRoles().
                 then(roles => {
                    
                    const newRoles = roles.map(function (role) {
                        //the select query rename AS NAME concatenate the nambre and last name
                        return role.Title;
                    })
                    
                    inquirer.prompt([
                        {
                            type: "list",
                            name: "employee_id",
                            choices: newEmployees,
                            message: "Which employee's role do you want to update?",
                        },
                        {
                            type: "list",
                            name: "roles_id",
                            choices: newRoles,
                            message: "What is the employee's new role?",
                        },
                    ]).then(answers => {

                        //find the register of the roles
                        const roleFind = roles.find(function (role) {
                            return role.Title === answers.roles_id;
                        });

                        const employeeFind = employees.find(function (employee) {
                            return employee.Name === answers.employee_id;
                        });

                        const strEmployee = {
   
                            id : employeeFind.Id,
                            role_id: roleFind.Id
                        }

                        updateEmployeeRole(strEmployee);
                        console.log("Employee role updated!");
                        menuStart()

                    })
                        .catch(err => {
                            console.log(err);
                        });
                });
        });      
}

function updateEmployeeByManager() {

    getEmployees().
        then(employees => {

            const newEmployees = employees.map(function (employee) {
                //the select query rename AS NAME concatenate the nambre and last name
                return employee.Name;
            })
           inquirer.prompt([
               {
                   type: "list",
                   name: "employee_id",
                   choices: newEmployees,
                   message: "Which employee's manager do you want to update?",
                },
                {
                    type: "list",
                    name: "manager_id",
                    choices: newEmployees,
                    message: "What is the employee's new manager?",
                },
                ]).then(answers => {

                    //find the register of the employess

                     const employeeFind = employees.find(function (employee) {
                        return employee.Name === answers.employee_id;
                     });
                    
                     const employeeManager = employees.find(function (employee) {
                        return employee.Name === answers.manager_id;
                     });
                    console.log(employeeManager);
                   const strEmployee = {
   
                        id : employeeFind.Id,
                        manager_id: employeeManager.Id
                    }

                    updateEmployeeManager(strEmployee);
                    console.log("Employee manager updated!");
                     menuStart()

                })
                .catch(err => {
                    console.log(err);
                });
            });
     
}

function getEmployeeByManager() {
    getEmployees().
    then(employees => {

        const newEmployees = employees.map(function (employee) {
            //the select query rename AS NAME concatenate the nambre and last name
            return employee.Name;
        })
        inquirer.prompt(
             {
                 type: "list",
                 name: "manager_id",
                 choices: newEmployees,
                 message: "Select the manager to view the list of employees",
             },
             ).then(answers => {

                 //find the register of the employess
                  const employeeManager = employees.find(function (employee) {
                     return employee.Name === answers.manager_id;
                  });
                 
                 const managerId = employeeManager.Id;
 
                 getEmployeesManager(managerId).
                     then(employeesManager => { 
                         consoleTable(employeesManager);
                         menuStart()
                     });
             })
             .catch(err => {
                 console.log(err);
             });
         });
}

function getEmployeeByDepartment() {
  
    getDepartments().
        then(departments => {

            const listDepartments = departments;
            inquirer.prompt(
                {
                    type: "list",
                    name: "department_id",
                    choices: listDepartments,
                    message: "Select the department to view the list of employees",
                },
            ).then(answers => {

                //find the register of the department
                const departmentFind = listDepartments.find(function(department) {
                    return department.name === answers.department_id;
                });
                
                const departmentId = departmentFind.id;
 
                getEmployeesDepartment(departmentId).
                    then(employeesDepartment => { 
                        consoleTable(employeesDepartment);
                        menuStart()
                    });
            })
            .catch(err => {
                console.log(err);
            });
        });
}

function deleteOptionEmployee() {
    getEmployees().
    then(employees => {

        const newEmployees = employees.map(function (employee) {
            //the select query rename AS NAME concatenate the nambre and last name
            return employee.Name;
        })
        inquirer.prompt(
             {
                 type: "list",
                 name: "employee_id",
                 choices: newEmployees,
                 message: "Select the employee to be deleted",
             },
             ).then(answers => {

                 //find the register of the employess
                  const employeeDelete = employees.find(function (employee) {
                     return employee.Name === answers.employee_id;
                  });
                 
                 const employeeId = employeeDelete.Id;
 
                 deleteEmployee(employeeId).
                     then(employeesManager => { 
                         console.log("User deleted: " + employeeDelete.Name)
                         menuStart()
                     });
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
                case 'Add Employee':
                    addEmployee();
                    break;
                case 'Update Employee Role':
                    updateEmployeeByRole();
                    break;
                case 'Update Employee Manager':
                    updateEmployeeByManager();
                    break;
                case "View All Employees By Manager":
                    getEmployeeByManager();
                    break;
                case "View All Employees By Department":
                    getEmployeeByDepartment();
                    break;
                case "Delete Employee":
                    deleteOptionEmployee();
                    break;
                case "Exit":
                    console.log("Exiting from Employee Tracker");
                    process.exit()
                    break;
            }
        });

}

module.exports = menuStart;