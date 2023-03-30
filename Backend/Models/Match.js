const mongoose = require('mongoose')
const Team = require('./Team')
const {Schema} = mongoose

const matchSchema = new Schema({
    Team1 : {
        type: Schema.Types.ObjectId,
        ref: 'Team'
    },
    Team2: {
        type: Schema.Types.ObjectId,
        ref: 'Team'
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
    },
    location: {
        type: String
    }
})

module.exports = mongoose.model('Match', matchSchema);
