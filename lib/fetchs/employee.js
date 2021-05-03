const inqurier = require('inquirer')
const fetch = require('node-fetch')

class Employee{
    getAll(){
        // console.log("hi")
        fetch("http://localhost:3001/api/employee/", {
            method: 'GET', 
            headers: {
                'Content-Type': 'application/json',
            },
        }).then(data => {
            if(data.ok){
                data.json().then(json => {
                    console.log(json);
                    this.toDo();
                })
            }
        })
    }

    addOne(data){
        try{
            fetch("http://localhost:3001/api/employee/", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(data),
            }).then(res => {res.text()}).then(json => {
                console.log("Added employee");
                this.getAll();
                })
        } catch (err) {
            console.log(err);
        }
    }

    updateOne(id, data){
        try{
            fetch(`http://localhost:3001/api/employee/${id}`, {
                method: 'PUT', 
                headers: {'Content-Type': 'application/json; charset=UTF-8',},
                body: JSON.stringify(data),
            }).then(res => {res.text()}).then(json => {
                // console.log(data)
                console.log("Updated data");
                this.getAll();
                })
        } catch (err) {
            console.log(err);
        }
    }

    deleteOne(id){
        try{
            fetch(`http://localhost:3001/api/employee/${id}`, {
                method: 'DELETE', 
                headers: {'Content-Type': 'application/json; charset=UTF-8',},
            }).then(res => {res.text()}).then(json => {
                console.log("Deleted data!");
                this.getAll();
                })
        } catch (err) {
            console.log(err);
        }
    }


    //----------------Inquirers--------------------

    toDo(){
        inqurier.prompt([{
            type: "list",
            name: "toDo",
            message: "What would you like to do with the list.",
            choices: ["Add a new employee", "Update an existing employee's data", "Delete a employee", "Exit"]
        }]).then(ans => {
            switch(ans.toDo){
                case "Add a new employee":
                    // console.log("add");
                    this.add();
                    break;
                case "Update an existing employee's data":
                    // console.log("Update");
                    this.update();
                    break;
                case "Delete a employee":
                    // console.log("del");
                    this.delete();
                    break;
                case "Exit":
                    break
            }
        })
    }

    add(){ // add something here so role is dynamic with database
        inqurier.prompt([{
            type: "input",
            name: "firstName",
            message: "Employee's first name",
        },{
            type: "input",
            name: "lastName",
            message: "Employee's last name",
        },{
            type: "list",
            name: "roleID",
            message: "Choose the role of the employee.",
            choices: ["developer", "engineer", "marketing", "sales"]
        },{
            type: "input",
            name: "managerID",
            message: "Enter manager ID",
        }]).then(ans => {
            switch (ans.roleID){ // look for a way to change roles to database here
                case "developer":
                    ans.roleID = 2;
                    break;
                case "engineer":
                    ans.roleID = 1;
                    break;
                case "marketing":
                    ans.roleID = 3;
                    break;
                case "sales":
                    ans.roleID = 3;
                    break;
            }
            // console.log(ans);

            this.addOne(ans)
        })
    }

    update(){
        inqurier.prompt([{
            type: "input",
            name: "updateID",
            message: "Enter id of department you want to update",
        },{
            type: "checkbox",
            name: "check",
            message: "Check all that you want to update",
            choices: ["first name", "last name", "role", "manager"]
        }]).then(ans => {
            // console.log(ans.updateID)
            // console.log(ans.check)
            this.update2(ans.updateID, ans.check)
            // this.updateOne(ans.updateID, ans.updateName)
        })
    }

    update2(id, columns){
        const i = [];
        columns.forEach(items => {
            switch(items){
                case "first name":
                    var arr = {
                        type: "input",
                        name: "firstName",
                        message: "Enter new first name",
                    }
                    i.push(arr)
                    break;
                case "last name":
                    var arr = {
                        type: "input",
                        name: "lastName",
                        message: "Enter new last name",
                    }
                    i.push(arr)
                    break;
                case "role":
                    var arr = {
                        type: "list",
                        name: "roleID",
                        message: "Choose the role of the employee.",
                        choices: ["developer", "engineer", "marketing", "sales"]
                    }
                    i.push(arr)
                    break;
                case "manager":
                    var arr = {
                        type: "input",
                        name: "managerID",
                        message: "Enter new manager ID",
                    }
                    i.push(arr);
                    break;
            }
        });

        // console.log(i)
        inqurier.prompt(i).then(ans => {
            if("roleID" in ans){
                switch (ans.roleID){ // look for a way to change roles to database here
                    case "developer":
                        ans.roleID = 2;
                        break;
                    case "engineer":
                        ans.roleID = 1;
                        break;
                    case "marketing":
                        ans.roleID = 3;
                        break;
                    case "sales":
                        ans.roleID = 3;
                        break;
                }
            }
            this.updateOne(id, ans)
        })
    }

    delete(){
        inqurier.prompt([{
            type: "input",
            name: "delete",
            message: "Enter id of employee you want to delete",
        }]).then(ans => {
            // console.log(ans.delete);
            this.deleteOne(ans.delete);
        })
    }

}

module.exports = new Employee;