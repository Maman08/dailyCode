const express = require('express');
const app = express();
const mongoose = require('mongoose');
const teamRoutes = require('./routes/route');

app.use(express.json());
const PORT =3000;

const MONGO_URI = 'mongodb://mongodb:27017/sportsdb';

mongoose.connect(MONGO_URI)
.then(()=>console.log('MongoDB connected'))
.catch(err => console.error('MongoDB connection error:', err));

app.get('/health',(req,res)=>{
     res.json({
        status: 'UP',
        serveice : 'Express up',
        timestamp: new Date().toISOString()
     })
})
app.use('/api', teamRoutes);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}
);