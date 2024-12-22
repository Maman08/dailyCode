const mongoose = require('mongoose');

const PatientSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    ailments: [String],
   assignedDoctor:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Doctor'
    }
})

const Patient=mongoose.model('Patient',PatientSchema);
module.exports=Patient;