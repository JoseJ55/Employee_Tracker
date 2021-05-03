// Thinking about making this file a global file so "department.js"
// "employee.js" and "role.js" can all get the inquriers they need
// from here. 

//Once the file are change make only the fetch request be in those
// file and inquirers in here.

//---------------------------------------------------------

//const inqurier = require('inquirer')
// const Department = require('./department')

// class Inq {
//     toDo(role){
//         inqurier.prompt([{
//             type: "list",
//             name: "toDo",
//             message: "What would you like to do with the list.",
//             choices: ["Add a new " + role, "Update an existing " + role, "Delete a " + role, "Exit"]
//         }]).then(ans => {
//             switch(ans.toDo){
//                 case "Add a new " + role:
//                     // console.log("add");
//                     switch (role){
//                         case "department":
//                             this.add(role)
//                             break;
//                         case "role":
//                             console.log('role');
//                             break;
//                         case "employee":
//                             console.log("employee");
//                             break;
//                     }
//                     break;

//                 case "Update an existing " + role:
//                     console.log("Update");
//                     break;
//                 case "Delete a " + role:
//                     console.log("del");
//                     break;
//                 case "Exit":
//                     break
//             }
//         })
//     }

//     add(role){
//         let m;

//         switch(role){
//             case "department":
//                 m = [{
//                     type: "input",
//                     name: "adding",
//                     message: "Name of new department",
//                 }]
//                 break;
//             case "role":
//                 console.log('role');
//                 break;
//             case "employee":
//                 console.log("employee");
//                 break;
//         }

//         inqurier.prompt(m).then(ans => {
//             console.log(ans.adding)

//             switch (role){
//                 case "department":
//                     Department.addOne(ans.adding);
//                     break;
//                 case "role":
//                     console.log('role');
//                     break;
//                 case "employee":
//                     console.log("employee");
//                     break;
//             }
//         })
//     }
// }

// module.exports = new Inq