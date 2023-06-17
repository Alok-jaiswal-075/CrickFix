const express = require('express')
const router = express.Router();
const Team = require('../Models/Team')
const Player = require('../Models/Player')
const appError = require('../Utility/appError')
const catchAsync = require('../Utility/catchAsync')
const {isLoggedIn,isCaptain} = require('../Middlewares')



router.route('/')
    .post(isLoggedIn,catchAsync(async (req,res,next)=>{
        const player = await Player.findById(req.playerId);
        const team = new Team(req.body.team);
        player.captainOf.push(team)
        team.captain = player
        await team.save()
        await player.save();
        res.status(200).json(team)
    }))
    .get(catchAsync(async (req,res,next)=>{
        const team =await Team.find({}).populate('players').populate('captain');
        if(!team){
            throw new appError(404,'No team exist');
        }
        res.json(team)
    }))

 router.route('/myteams').get(isLoggedIn,catchAsync(async (req,res,next) => {
        const myteams = await Team.find({ captain: req.playerId }).exec();
        // console.log(myteams);
        // console.log('hello')
        res.json(myteams)
    }))

 router.route('/otherteams').get(isLoggedIn,catchAsync(async (req,res,next) => {
        const otherteams = await Team.find({ captain: {$ne: req.playerId}}).exec();
        // console.log(otherteams);
        // console.log('hello')
        res.json(otherteams)
    }))


router.route('/:id')
    .put(isLoggedIn,isCaptain,catchAsync(async (req,res,next)=>{
        const {id} = req.params
        const teamdata = await Team.findByIdAndUpdate(id, {...req.body.team});
        await teamdata.save();
        res.json(teamdata)
        // console.log(req.body.team);
    }))
    .get(isLoggedIn,catchAsync(async (req,res,next)=>{
        const team =await Team.findById(req.params.id).populate('players').populate('captain');
        if(!team){
            throw new appError(404,'Team not found');
        }
        res.json(team)
    }))
    .delete(isLoggedIn,isCaptain,catchAsync(async (req,res,next)=>{
        const {id} = req.params
        await Player.findByIdAndUpdate(req.playerId, { $pull: { captainOf: id } });
        await Team.findByIdAndDelete(id);
        res.json({'msg':'Team Deleted Successfully'})
    }))


router.route('/requests/:id')
    .get(isLoggedIn,isCaptain,catchAsync(async (req,res,next) => {
        const {id} = req.params
        const team = await Team.findById(id).populate('requests');
        if(!team) throw new appError(500,'Cannot get team details')

        res.json(team.requests)
    }))

// Endpoint for sending a request from a player to a team
router.route('/request-accept/:id/:playerid')
    .post(isLoggedIn,isCaptain,catchAsync(async (req, res,next) => {
        const {id,playerid} = req.params
        // console.log(id,playerid)
        const team =await Team.findById(id)
        const player = await Player.findById(playerid)
        
        player.sentRequests.pull(team)
        player.teams_joined.push(team)

        team.requests.pull(player)
        team.players.push(player)
         
        await player.save()
        await team.save()

        res.json({'msg':'Request accepted'})

        if(!team){
            throw new appError(500,'Error accepting request');
        }

        if(!player){
            throw new appError(500,'Error accepting request');
        }
               
        }))

router.post('/request-reject/:id/:playerid',isLoggedIn,isCaptain,catchAsync( async (req, res) => {
    const {id,playerid} = req.params
    // console.log(id,playerid)
    const player = await Player.findById(playerid)

    if(!player) throw new appError(500,'Player does not exist')
    // console.log(id)
    const team =await Team.findById(id)

    if(!team){
        throw new appError(500,'Error rejecting request');
    }
    // Remove the team from the player's received requests array
    player.sentRequests.pull(team)
    team.requests.pull(player)
    await player.save()
    await team.save()

    res.json({'msg':'Request rejected successfully'})

}))
    

module.exports = router