DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;

USE employee_db;

create table department(
	id INT NOT NULL auto_increment,
    departmentName VARCHAR(30) NOT NULL,
    PRIMARY KEY (id)
);

create table role(
	id INT NOT NULL auto_increment,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    departmentID INT NOT NULL,
    PRIMARY KEY(id)
);

create table employee(
	id INT NOT NULL auto_increment,
    firstName VARCHAR(30) NOT NULL,
    lastName VARCHAR(30) NOT NULL,
    roleID INT NOT NULL,
    managerID INT,
    PRIMARY KEY(id)
);