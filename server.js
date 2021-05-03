const express = require('express');
const routes = require('./routes/index');
const routesD = require('./routes/api/deparmentRoutes')
const sequelize = require('./config/connection');
const a = require('./lib/index')

const app = express();
const PORT = process.env.PORT || 3001;
// let route = __dirname + "/index";

app.use(express.json());
app.use(express.urlencoded({extended: true}));

app.use(routes); 

sequelize.sync({force: false}).then(()=>{
    app.listen(PORT, () => console.log(`Now listening on port ${PORT}!`))
}); 

a.ask();


