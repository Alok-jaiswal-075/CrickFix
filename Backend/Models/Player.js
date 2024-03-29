const mongoose = require('mongoose')
const Team = require('./Team')
const bcrypt = require('bcryptjs')
const {Schema} = mongoose

const playerSchema = new Schema({
    fname: {
        type: String,
        required: true
    },
    lname: {
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
    contact:{
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
    fours : {
        type : Number,
        default : 0
    },
    sixes : {
        type : Number,
        default : 0
    },
    balls : {
        type : Number,
        default : 0
    },
    highest_score: {
        type: Number,
        default: 0
    },
    tournaments_played: {
        type: Number,
        default: 0
    },
    captainOf : [
        {
            type: Schema.Types.ObjectId,
            ref:'Team'
        }
    ],

    
    sentRequests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Team'
      }],

    teams_joined: [{
        type: Schema.Types.ObjectId,
        ref: 'Team'
    }]

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


playerSchema.pre('findOneAndUpdate', async function (next) {
    let update = {...this.getUpdate()};
  
    // Only run this function if password was modified
    if (update.password){
  
    // Hash the password
    update.password = await bcrypt.hash(this.getUpdate().password, 12);
    this.setUpdate(update);
    }

    next()
  })


playerSchema.post('findOneAndDelete', async function (doc) {    // finding and deleting all the associated teams
    if (doc) {
        await Team.deleteMany({
            _id: {
                $in: doc.captainOf
            }
        })
    }
})

module.exports = mongoose.model('Player', playerSchema);