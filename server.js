const mysql = require("mysql");
const inquirer = require("inquirer");
const { allowedNodeEnvironmentFlags } = require("process");

const connection = mysql.createConnection({
    host: "localhost",
    port: 4000,
    user: "root",
    password: ".......",
    database: "employee_trackerDB"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("Connected as " + connection.threadId + "\n");
    runTracker();
});

function runTracker() {
    inquirer
        .prompt({
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
        })
}