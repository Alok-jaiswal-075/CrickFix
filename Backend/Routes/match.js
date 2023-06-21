const express = require('express')
const router = express.Router();
const Match = require('../Models/Match')
const Team = require('../Models/Team')
const appError = require('../Utility/appError')
const catchAsync = require('../Utility/catchAsync')
const { isLoggedIn } = require("../Middlewares")


router.route('/request/:team1Id/:team2Id').post(catchAsync( async (req, res,next) => {
    const { team1Id,team2Id } = req.params
    // console.log(req.body)

    const team1 = await Team.findById(team1Id);
    if(!team1){
        new appError(500,'Team does not exits')
    }
    const team2 = await Team.findById(team2Id);
    if(!team2){
        new appError(500,'Team does not exits')
    }

    const match = new Match();
    match.Team1 = team1;
    match.team1_players = req.body.players
    match.Team2 = team2;
    match.team2_players = []
    match.overs = req.body.overs

    
    // console.log(match.team1_players)
    team1.sent_match_requests.push(match)
    team2.received_match_requests.push(match)

    // console.log(team1)
    // console.log(team2)

    await team1.save()
    await team2.save()
    await match.save()


      res.json({'msg':'Match request sent'});

      

    }))


    module.exports = router
