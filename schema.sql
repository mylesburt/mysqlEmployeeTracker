DROP DATABASE IF EXISTS employee_trackerDB;
CREATE database employee_trackerDB;
USE employee_trackerDB;

CREATE TABLE department (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) UNIQUE NOT NULL
);
CREATE TABLE role (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(30) UNIQUE NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INT NOT NULL,
  INDEX dep_ind (department_id),
  CONSTRAINT fk_department FOREIGN KEY (department_id) REFERENCES department(id)
);
CREATE TABLE employee (
  id INT AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  INDEX role_ind (role_id),
  CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES role(id),
  manager_id INT,
  INDEX man_ind (manager_id),
  CONSTRAINT fk_manager FOREIGN KEY (manager_id) REFERENCES employee(id)
);

INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance');
INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3);
INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('John', 'Doe', 1, NULL),
    ('Mike', 'Chan', 2, 1),
    ('Ashley', 'Rodriguez', 3, NULL),
    ('Kevin', 'Tupik', 4, 3),
    ('Kunal', 'Singh', 5, NULL),
    ('Malia', 'Brown', 1, 5);

-- DROP DATABASE IF EXISTS employee_trackerDB;

-- CREATE DATABASE employee_trackerDB;

-- USE employee_trackerDB;

-- CREATE TABLE department (
--     department_id INT NOT NULL AUTO_INCREMENT,
--     department_name VARCHAR(30),
--     PRIMARY KEY (department_id)
-- );

-- CREATE TABLE employee_role (
--     role_id INT NOT NULL AUTO_INCREMENT,
--     role_title VARCHAR(30),
--     role_salary DECIMAL(25),
--     department_id INT NOT NULL,
--     PRIMARY KEY (role_id),
--     FOREIGN KEY (department_id) REFERENCES department(department_id)
-- );

-- CREATE TABLE employee (
--     employee_id INT NOT NULL AUTO_INCREMENT,
--     employee_first_name VARCHAR(30),
--     employee_last_name VARCHAR(30),
--     role_id INT NOT NULL,
--     manager_id INT,
--     PRIMARY KEY (employee_id),
--     FOREIGN KEY (role_id) REFERENCES employee_role(role_id)
-- );