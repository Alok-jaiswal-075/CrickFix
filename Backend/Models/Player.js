const mongoose = require('mongoose')
const Team = require('./Team')
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

module.exports = mongoose.model('Player', playerSchema);