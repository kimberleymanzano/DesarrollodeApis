const express = require('express');
const { json } = require('express/lib/response');
const res = require('express/lib/response');
const app = express();
const morgan = require('morgan');

//configuraciones
app.set('port',3000);
app.set("json spaces",2); //genera espacios en el mostrados

//middlewares
app.use(morgan('dev'));
app.use(express.json());

//rutas
app.use('/api/planta',require('./routes/rutas'));

//empezando el servidor
app.listen(app.get('port'));
console.log("mi primer servidor");

