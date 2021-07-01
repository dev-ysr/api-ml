const express = require('express');
const morgan = require('morgan');
const app = express();

// settings
app.set('port', process.env.PORT || 3000);
app.set('json spaces', 2);

//routes
app.use(require('./routes/index'));

// midelwares
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.json())

app.listen(3000, () => {
    console.log(`Server on port ${app.get('port')}`);
});