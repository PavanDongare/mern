const express = require('express');
const app = express();
const PORT = process.env.PORT || 5000; // if no env var set, 5000


app.get('/',(req,res)=> res.send('root requested'));
app.listen(PORT,()=> console.log(`sercer on ${PORT}`)); // `` directly access var in string