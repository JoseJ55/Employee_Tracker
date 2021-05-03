const inqurier = require('inquirer')
const fetch = require('node-fetch')

class Department{
    getAll(){
        // console.log("hi")
        fetch("http://localhost:3001/api/department/", {
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
        const entry = {departmentName: data};

        try{
            fetch("http://localhost:3001/api/department/", {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json; charset=UTF-8',
                },
                body: JSON.stringify(entry),
            }).then(res => {res.text()}).then(json => {
                console.log("Added data");
                this.getAll();
                })
        } catch (err) {
            console.log(err);
        }
    }

    updateOne(id, data){
        try{
            fetch(`http://localhost:3001/api/department/${id}`, {
                method: 'PUT', 
                headers: {'Content-Type': 'application/json; charset=UTF-8',},
                body: JSON.stringify({departmentName: data}),
            }).then(res => {res.text()}).then(json => {
                console.log("Updated data");
                this.getAll();
                })
        } catch (err) {
            console.log(err);
        }
    }

    deleteOne(id){
        try{
            fetch(`http://localhost:3001/api/department/${id}`, {
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
            choices: ["Add a new department", "Update an existing department", "Delete a department", "Exit"]
        }]).then(ans => {
            switch(ans.toDo){
                case "Add a new department":
                    // console.log("add");
                    this.add();
                    break;
                case "Update an existing department":
                    // console.log("Update");
                    this.update();
                    break;
                case "Delete a department":
                    // console.log("del");
                    this.delete();
                    break;
                case "Exit":
                    break
            }
        })
    }

    add(){
        inqurier.prompt([{
            type: "input",
            name: "adding",
            message: "Name of new department",
        }]).then(ans => {
            // console.log(ans.adding);
            this.addOne(ans.adding);
        })
    }

    update(){
        inqurier.prompt([{
            type: "input",
            name: "updateID",
            message: "Enter id of department you want to update",
        },{
            type: "input",
            name: "updateName",
            message: "Enter the new name for choosen department"
        }]).then(ans => {
            // console.log(ans.updateID)
            // console.log(ans.updateName)
            this.updateOne(ans.updateID, ans.updateName)
        })
    }

    delete(){
        inqurier.prompt([{
            type: "input",
            name: "delete",
            message: "Enter id of department you want to delete",
        }]).then(ans => {
            // console.log(ans.delete);
            this.deleteOne(ans.delete);
        })
    }
}

module.exports = new Department;