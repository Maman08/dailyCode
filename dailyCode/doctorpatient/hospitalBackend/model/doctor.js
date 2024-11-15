const mongoose = require('mongoose');
const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    available: {
        type: Boolean,
        default: true
    },
    busy: {
        type: Boolean,
        default: false // Add this field to track the doctor's status
    }
});

const Doctor = mongoose.model('Doctor', doctorSchema);
module.exports = Doctor;
