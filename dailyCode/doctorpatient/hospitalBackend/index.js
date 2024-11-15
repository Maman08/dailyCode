const express=require('express');
const app = express();
const connectDB=require('./config/db');
const apiRoutes=require('./routes/doctorRoute');
app.use(express.json());
connectDB();



app.get('/',(req,res)=>
    res.send('Hello World'));



app.use('/api', apiRoutes);



const PORT =3000;
app.listen(PORT,()=>console.log('Server running sussecfully on PORT',PORT));