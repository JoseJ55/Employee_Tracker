const inquirer = require("inquirer");
// const sql = require("mysql");
const express = require('express');
const routes = require('./routes/index');
const sequelize = require('./config/connection')

const app = express();
const PORT = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes); 

// app.get('/', (req, res) => res.send("working"))
 
sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`))
}); 

// Comment for important things
//-----------------------------------
// Need to work on the inquirer part next.
//-----------------------------