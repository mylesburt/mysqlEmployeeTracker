const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 4400,
    user: "root",
    password: "#codingismypassion20",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as " + connection.threadId + "\n");
    runTracker();
});

function runTracker() {
    inquirer.prompt({
        name: "trackerOptions",
        type: "rawlist",
        message: "Welcome to Employee Tracker, how may I help you?",
        choices: [
            "Add department",
            "Add role",
            "Add employee",
            "View departments",
            "View roles",
            "View employees",
            "Update employee roles"
        ]
    })
        .then(function (answer) {
            switch (answer.trackerOptions) {
                case "Add department":
                    addDepartment();
                    break;

                case "Add role":
                    addRole();
                    break;

                case "Add employee":
                    addEmployee();
                    break;

                case "View departments":
                    viewDepartments();
                    break;

                case "View roles":
                    viewRoles();
                    break;

                case "View employees":
                    viewEmployees();
                    break;

                case "Update employee roles":
                    updateEmployees();
                    break;
            }
        });
}

// This function will add user data into the department table of schema.sql

function addDepartment() {
    inquirer.prompt([
        {
            name: "departmentAdded",
            type: "input",
            message: "What department would you like to add?"
        }
    ])
        .then(function (answer) {
            connection.query("INSERT...",
                [
                    {
                        department_name: answer.departmentAdded
                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log("Role " + answer.departmentAdded + " has been added.");
                    runTracker();
                }
            );
        });
}

// This function will add user data into the employee_role table of schema.sql

function addRole() {
    inquirer.prompt([
        {
            name: "roleAdded",
            type: "input",
            message: "What role would you like to add?"
        },
        {
            name: "roleSalary",
            type: "input",
            message: "What is the salary for this role?"
        },
        {
            name: "roleDepartment",
            type: "rawlist",
            choices: function () {
                let roleDepartArray = [];
                for (var i = 0; i < results.length; i++) {
                    roleDepartArray.push(results[i].department_name);
                }
                return roleDepartArray;
            },
            message: "What department does this role belong to?"
        }
    ])
        .then(function (answer) {
            connection.query("INSERT...",
                [
                    {
                        role_title: answer.roleAdded,
                    },
                    {
                        role_salary: answer.roleSalary
                    }
                ],
                function (err) {
                    if (err) throw err;
                    console.log("Role " + answer.roleAdded + " has been added.");
                    runTracker();
                }
            );
        });
}

// This function will add user data into the employee table of schema.sql

function addEmployee() {
    inquirer.prompt([
        {
            name: "employeeFirst",
            type: "input",
            message: "What is the Employee's first name?"
        },
        {
            name: "employeeLast",
            type: "input",
            message: "What it the Employee's last name?"
        },
        {
            name: "employeeRole",
            type: "rawlist",
            choices: function () {
                let roleArray = [];
                for (var i = 0; i < results.length; i++) {
                    roleArray.push(results[i].role_title);
                }
                return roleArray;
            },
            message: "What is the role of the Employee?",
        }
    ])
        .then(function (answer) {
            connection.query("INSERT...",
                {
                    employeeAdded: answer.employeeAdded
                },
                function (err) {
                    if (err) throw err;
                    console.log("Role " + answer.employeeAdded + " has been added.");
                    runTracker();
                }
            );
        });
}