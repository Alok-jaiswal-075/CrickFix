const mongoose = require('mongoose')
const Player = require('./Player')
const {Schema} = mongoose

const teamSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    location_based: {
        type: String,
        required: true
    },
    matches_played: {
        type:Number,
        default: 0
    },
    matches_won: {
        type: Number,
        default: 0
    },
    matches_lost: {
        type: Number,
        default: 0
    },
    matches_draw: {
        type: Number,
        default: 0
    },
    captain : {
        type: Schema.Types.ObjectId,
        ref: 'Player'
    },

    players: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Player'
        }
    ],
    requests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
      }],

    

})

module.exports = mongoose.model('Team', teamSchema);