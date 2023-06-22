const express = require('express')
const router = express.Router();
const Match = require('../Models/Match')
const Team = require('../Models/Team')
const appError = require('../Utility/appError')
const catchAsync = require('../Utility/catchAsync')
const { isLoggedIn,isCaptain } = require("../Middlewares")

router.route('/:id').get(isLoggedIn, catchAsync(async (req,res,next) => {
    const {id} = req.params

    const match = await Match.findById(id).populate('Team1').populate('Team2').populate({
        path: 'Team2',
        populate: {
            path: 'players'
        }
    })
    if(!match) new appError(404,"Match does not exist")

    res.json(match);

}))

router.route('/scoreboard/:id').get(isLoggedIn, catchAsync(async (req,res,next) => {
    const {id} = req.params
    // console.log(id)

    const match = await Match.findById(id).populate('Team1').populate('Team2').populate('team1_players').populate('team2_players')
    if(!match) new appError(404,"Match does not exist")
    
    const team1 = {
        "id" : 1,
        "score" : 0,
        "Teamid" : match.Team1._id,
        "players" : match.team1_players
    }

    const team2 = {
        "id" : 2,
        "Teamid" : match.Team2._id,
        "score" : 0,
        "players" : match.team2_players
    }

    const wickets = match.team1_players.length

    const data = {team1, team2, overs : match.overs, wickets}

    // console.log(data);

    // res.json(match);
    res.json(data)

}))




router.route('/request/:team1Id/:team2Id').post(isLoggedIn,catchAsync( async (req, res,next) => {
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
    
    router.route('/match_request_accept/:matchId').post(isLoggedIn,catchAsync( async (req, res,next) => {
        const { matchId } = req.params
        // console.log(req.body)
    
        const match = await Match.findById(matchId).populate('Team1').populate('Team2');
    
        match.team2_players = req.body.players
        // console.log(match.team1_players.length)
        // console.log(match.team2_players.length)
        if(match.team1_players.length != match.team2_players.length) throw new appError(404,'Number of players should be '+match.team1_players.length)

        const team1 = await Team.findById(match.Team1._id);
        if(!team1) new appError(404,'Team not found')
        const team2 = await Team.findById(match.Team2._id)
        if(!team2) new appError(404,'Team not found')
        
        // console.log(match.team1_players)
        team1.sent_match_requests.pull(match)
        team2.received_match_requests.pull(match)
        team1.accepted_match_requests.push(match);
    
        // console.log(team1)
        // console.log(team2)
    
        await team1.save()
        await team2.save()
        await match.save()
    
    
          res.json({'msg':'Match request accepted'});
    
          
    
        }))


        router.route('/setbowling/:matchId').get(isLoggedIn,isCaptain,catchAsync( async (req, res,next) => {
            const { matchId } = req.params
            // console.log(req.body)
        
            const match = await Match.findById(matchId).populate('Team1').populate('Team2').populate('team1_players').populate('team2_players');
        
            const team1 = await Team.findById(match.Team1._id).populate('captain');
            if(!team1) new appError(404,'Team not found')
            const team2 = await Team.findById(match.Team2._id).populate('captain')
            if(!team2) new appError(404,'Team not found')

            // console.log(match)
            
            if(team1.captain._id.equals(playerId)) 
            {
                let tempteam = match.Team1;
                match.Team1 = match.Team2;
                match.Team2 = tempteam;

                let tempplayers = match.team1_players
                match.team1_players = match.team2_players
                match.team2_players = tempplayers
            }

            

            // console.log(match)
        
            await match.save()
            res.json('done')
        
            }))

        router.route('/setbatting/:matchId').get(isLoggedIn,isCaptain,catchAsync( async (req, res,next) => {
            const { matchId } = req.params
            // console.log(req.body)
        
            const match = await Match.findById(matchId).populate('Team1').populate('Team2').populate('team1_players').populate('team2_players');
        
            const team1 = await Team.findById(match.Team1._id).populate('captain');
            if(!team1) new appError(404,'Team not found')
            const team2 = await Team.findById(match.Team2._id).populate('captain')
            if(!team2) new appError(404,'Team not found')

            // console.log(match)
            
            if(team2.captain._id.equals(playerId)) 
            {
                let tempteam = match.Team1;
                match.Team1 = match.Team2;
                match.Team2 = tempteam;

                let tempplayers = match.team1_players
                match.team1_players = match.team2_players
                match.team2_players = tempplayers
            }

            

            // console.log(match)
        
            await match.save()
            res.json('done')
        
            }))

    

    module.exports = router
