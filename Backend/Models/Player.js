const mongoose = require('mongoose')
const Team = require('./Team')
const bcrypt = require('bcryptjs')
const {Schema} = mongoose

const playerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone:{
        type: Number,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true
    },
    ranking: {
        type: Number,
        default : 0
    }, 
    team_joined: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    half_centuries: {
        type:Number,
        default: 0
    },
    centuries: {
        type:Number,
        default: 0
    },
    total_score: {
        type: Number,
        default: 0
    },
    highest_score: {
        type: Number,
        default: 0
    },
    tournaments_played: {
        type: Number,
        default: 0
    }

})


/*
Hashing our password before saving the data using a middleware

we have to specify the type of event (pre or post ), the type of event before or after which we want the middleware to run (for eg save) and give a callback function to execute
*/

playerSchema.pre('save', async function(next){
    // this will encrypt the password only it is changed
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next()
})


module.exports = mongoose.model('Player', playerSchema);