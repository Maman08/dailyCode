const mongoose = require('mongoose');

const teamSchema = new mongoose.Schema({
    name:{
        type : String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
},{
    timestamps: true
});

teamSchema.pre('save', function(next) {
    if (this.name) {
        this.name = this.name.toUpperCase();
    }
    next();
});


const Team = mongoose.model('Team', teamSchema);
module.exports = Team;

