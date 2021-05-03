const inqurier = require('inquirer')
const fetch = require('node-fetch')

class Role {
    getAll(){
        // console.log("hi")
        fetch("http://localhost:3001/api/role/", {
            method: 'GET', 
            headers: {
                'Content-Type': 'apllication/json',
            },
        }).then(data => {
            if(data.ok){
                data.json().then(json => {
                    console.log(json);
                    this.toDo('role');
                })
            }
        })
    }

    addOne(data){
        try{
            fetch("http://localhost:3001/api/role/", {
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
            fetch(`http://localhost:3001/api/role/${id}`, {
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
            fetch(`http://localhost:3001/api/role/${id}`, {
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
            choices: ["Add a new role", "Update an existing role's data", "Delete a role", "Exit"]
        }]).then(ans => {
            switch(ans.toDo){
                case "Add a new role":
                    // console.log("add");
                    this.add();
                    break;
                case "Update an existing role's data":
                    // console.log("Update");
                    this.update();
                    break;
                case "Delete a role":
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
            name: "title",
            message: "Enter role's title",
        },{
            type: "input",
            name: "salary",
            message: "Enter the role's salary",
        },{
            type: "input",
            name: "departmentID",
            message: "Enter department id",
        }]).then(ans => {
            // console.log(ans);

            this.addOne(ans)
        })
    }

    update(){
        inqurier.prompt([{
            type: "input",
            name: "updateID",
            message: "Enter id of role you want to update",
        },{
            type: "checkbox",
            name: "check",
            message: "Check all that you want to update",
            choices: ["title", "salary", "department ID"]
        }]).then(ans => {
            // console.log(ans.updateID)
            // console.log(ans.check)
            this.update2(ans.updateID, ans.check)
        })
    }

    update2(id, columns){
        const i = [];
        columns.forEach(items => {
            switch(items){
                case "title":
                    var arr = {
                        type: "input",
                        name: "title",
                        message: "Enter new title",
                    }
                    i.push(arr)
                    break;
                case "salary":
                    var arr = {
                        type: "input",
                        name: "salary",
                        message: "Enter new salary",
                    }
                    i.push(arr)
                    break;
                case "department ID":
                    var arr = {
                        type: "input",
                        name: "departmentID",
                        message: "Enter new department ID",
                    }
                    i.push(arr)
                    break;
            }
        });

        inqurier.prompt(i).then(ans => {
            // console.log(ans)
            this.updateOne(id, ans)
        })
    }

    delete(){
        inqurier.prompt([{
            type: "input",
            name: "delete",
            message: "Enter id of the role you want to delete",
        }]).then(ans => {
            // console.log(ans.delete);
            this.deleteOne(ans.delete);
        })
    }
}

module.exports = new Role;