const express = require("express");
const morgan = require("morgan");
const app = express();

// settings
app.set("port", process.env.PORT || 4000);
app.set("json spaces", 2);

// Configurar cabeceras y cors
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});

//routes
app.use(require("./routes/index"));

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
