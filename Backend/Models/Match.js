const mongoose = require('mongoose')
const Team = require('./Team')
const Player = require('./Player')
const {Schema} = mongoose

const matchSchema = new Schema({
    Team1 : {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        players : [
            {
                type : Schema.Types.ObjectId,
                ref : 'Player'
            }
        ]
    },

    Team2: {
        type: Schema.Types.ObjectId,
        ref: 'Team',
        players : [
            {
                type : Schema.Types.ObjectId,
                ref : 'Player'
            }
        ]
    },

    overs : {
        type : Number,
        min : 2,
        max : 50
    },

    Team1_score: {
        type: Number,
        default: 0
    },
    Team2_score: {
        type: Number,
        default: 0
    },
    Team_won: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }
})

module.exports = mongoose.model('Match', matchSchema);
