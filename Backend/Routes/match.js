const express = require('express')
const router = express.Router();
const Match = require('../Models/Match')
const Team = require('../Models/Team')
const appError = require('../Utility/appError')
const catchAsync = require('../Utility/catchAsync')


router.route('/:team1Id/:team2Id')
    .post(catchAsync(async (req,res,next)=>{
        const {team1Id,team2Id} = req.params;
        const team1 = await Team.findById(team1Id)
        const team2 = await Team.findById(team2Id)
        // console.log(team1,team2)
        if(!team1 || !team2){
            throw new appError('Team does not exist',404)
        }

        const match = new Match(req.body.match);
        match.Team1 = team1;
        match.Team2 = team2;
        match.save();
        res.json(match);
    }))


    module.exports = router
