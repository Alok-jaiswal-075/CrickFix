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


router.route('/:id')
    .put(isLoggedIn,isCaptain,catchAsync(async (req,res,next)=>{
        const {id} = req.params
        const teamdata = await Team.findByIdAndUpdate(id, {...req.body.team});
        await teamdata.save();
        res.json(teamdata)
        // console.log(req.body.team);
    }))
    .get(isLoggedIn,catchAsync(async (req,res,next)=>{
        const team =await Team.findById(req.params.id).populate('players');
        if(!team){
            throw new appError('Team not found',404);
        }
        res.json(team)
    }))
    .delete(isLoggedIn,isCaptain,catchAsync(async (req,res,next)=>{
        const {id} = req.params
        await Player.findByIdAndUpdate(req.playerId, { $pull: { captainOf: id } });
        await Team.findByIdAndDelete(id);
        res.json({'msg':'Team Deleted Successfully'})
    }))

module.exports = router