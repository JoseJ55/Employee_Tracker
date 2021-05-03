const inquirer = require("inquirer");
const Department = require('./fetchs/department')
const Role = require('./fetchs/role')
const Employee = require('./fetchs/employee')

class Company{
    ask(){
        inquirer.prompt([{
                type: "list",
                name: "whatToDo",
                message: "What would you like to do.",
                choices: ["See all departments", "See all roles", "See all Employees", "Exit"]
            }
        ]).then(ans =>{
            switch(ans.whatToDo){
                case "See all departments":
                    Department.getAll();
                    break;
                case "See all roles":
                    Role.getAll();
                    break;
                case "See all Employees":
                    Employee.getAll();
                    break;
                case "Exit":
                    break;
            }
        });
    }
}

module.exports = new Company;