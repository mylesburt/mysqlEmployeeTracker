const mysql = require("mysql");
const inquirer = require("inquirer");

const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
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
        type: "list",
        message: "Welcome to Employee Tracker, how may I help you?",
        choices: [
            "Add department",
            "Add role",
            "Add employee",
            "View departments",
            "View roles",
            "View employees",
            "Update employee roles",
            "Exit?"
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

                case "Exit?":
                    process.exit();
                    break;
            }
        });
}

// This function will add user data into the department table of schema.sql

function addDepartment() {
    inquirer.prompt([
        {
            name: "name",
            type: "input",
            message: "What department would you like to add?"
        }
    ])
        .then(function (answer) {
            connection.query("INSERT INTO department SET ?", answer);
            runTracker();
        });
};

// This function will add user data into the employee_role table of schema.sql

function addRole() {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const departmentChoices = res.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        console.log(departmentChoices);
        inquirer.prompt([
            {
                name: "title",
                type: "input",
                message: "What role would you like to add?"
            },
            {
                name: "salary",
                type: "input",
                message: "What is the salary for this role?"
            },
            {
                name: "department_id",
                type: "list",
                choices: departmentChoices,
                message: "What department does this role belong to?"
            }
        ])
            .then(function (answer) {
                connection.query("INSERT INTO role SET ?", answer);
                runTracker();
            }
            );
    });
};

// This function will add user data into the employee table of schema.sql

function addEmployee() {
    let query = "SELECT * FROM role"
    connection.query(query, function (err, res) {
        if (err) throw err;
        const roleChoices = res.map(({ title, salary, department_id }) => ({
            title: title,
            salary: salary,
            value: department_id
        }));
        console.log(roleChoices);
        inquirer.prompt([
            {
                name: "first_name",
                type: "input",
                message: "What is the Employee's first name?"
            },
            {
                name: "last_name",
                type: "input",
                message: "What it the Employee's last name?"
            },
            {
                name: "role_id",
                type: "rawlist",
                choices: roleChoices,
                message: "What is the role of the Employee?",
            }
        ])
            .then(function (answer) {
                connection.query("INSERT INTO employee SET ?", answer);
                runTracker();
            }
            );
    });
};

function viewDepartments() {
    let query = "SELECT * FROM department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const departmentList = res.map(({ id, name }) => ({
            name: name,
            value: id
        }));
        console.table(departmentList);
        runTracker();
    });
};

function viewRoles() {
    let query = "SELECT * FROM role";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const roleList = res.map(({ title, salary, department_id }) => ({
            title: title,
            salary: salary,
            value: department_id
        }));
        console.table(roleList);
        runTracker();
    });
};

function viewEmployees() {
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const employeeList = res.map(({ first_name, last_name, role_id }) => ({
            first_name: first_name,
            last_name: last_name,
            role_id: role_id
        }));
        console.table(employeeList);
        runTracker();
    });
};

function updateEmployees() {

    // look up on join mysql
    let query = "SELECT * FROM employee";
    connection.query(query, function (err, res) {
        if (err) throw err;
        const employeeUpdateList = res.map(({ first_name, last_name, id }) => ({
            name: first_name + ' ' + last_name,

            value: id
        }));
        const roleSelectorList = res.map(({ title, id }) => ({
            name: title,
            value: id
        }));
        inquirer.prompt([
            {
                name: "id",
                type: "list",
                choices: employeeUpdateList,
                message: "Which employee would you like to update?"
            },
            {
                name: "role_id",
                type: "list",
                choices: roleSelectorList,
                message: "Choose a new role for the employee."
            }
        ])
            .then(function (answer) {
                connection.query("UPDATE employee SET role_id = ? WHERE id = ?", [answer.role_id, answer.id]);
                runTracker();
            });
    });
};