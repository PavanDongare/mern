const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // if no env var set, 5000
const pool = require('./dbConnection');



app.get('/',(req,res)=> {
    pool.query('SELECT * FROM user', (error, result) => {
        if (error) res.send(error);
        res.send(result);
    });
});


// init middlewear for req.body
app.use(express.json({extended: false}));

// define routes
app.use('/api/users',require('./routes/api/users'));
app.use('/api/post',require('./routes/api/post'));
app.use('/api/profile',require('./routes/api/profile'));
app.use('/api/auth',require('./routes/api/auth'));


app.listen(PORT,()=> console.log(`server on ${PORT}`)); // `` directly access var in string