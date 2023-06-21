const mongoose = require('mongoose')
const Player = require('./Player')
const Match = require('./Match')
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
    requests: [
        {

        type: mongoose.Schema.Types.ObjectId,
        ref: 'Player'
        
        }
    ],

    received_match_requests : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Match'
        }
    ],
    sent_match_requests : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Match'
        }
    ],
    accepted_match_requests : [
        {
            type : Schema.Types.ObjectId,
            ref : 'Match'
        }
    ]

})

module.exports = mongoose.model('Team', teamSchema);