const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const catchAsync = require('../Utility/catchAsync')
const appError = require('../Utility/appError')
const Player = require('../Models/Player');
const Team = require('../Models/Team');
const { findById, findByIdAndUpdate } = require('../Models/Team');
const bcrypt = require('bcryptjs')
const { isLoggedIn } = require("../Middlewares")

const JWT_SECRET = "this is a #$#@# very tough secret @&%^#&&**"

router.route('/')
    .post(catchAsync(async (req,res,next)=>{
        req.body.player.age = parseInt(req.body.player.age);
        req.body.player.contact = parseInt(req.body.player.contact)
        const player = new Player(req.body.player);
        
        await player.save()     // now before saving we want to becrypt our password, we will use a middleware in our player schema which will automatically becrypt the password when it is changed
        res.status(200).json({"msg":"registration successfull"})
    }))

   

router.route('/') 
    .put(isLoggedIn,catchAsync(async (req,res,next)=>{
        if(!req.body.player) throw new appError('Enter data to be updated',404)
        const {fname,lname,age,oldpassword,newpassword} = req.body.player;
        if(!fname || !lname || !age || !oldpassword || !newpassword){
            throw new appError(404,"Every field is mandatory")
        }
        const player = await Player.findById(req.playerId)
        if(!player || !bcrypt.compareSync(oldpassword, player.password)) throw new appError(404,'Incorrect password')
        const newplayer = await Player.findByIdAndUpdate(req.playerId, {fname: fname,lname:lname,age:age,password:newpassword});
        res.clearCookie('token')
        res.json({msg:"User updated successfully"})
    }))

    .get(isLoggedIn,catchAsync(async (req,res,next)=>{
        const player =await Player.findById(req.playerId).populate('teams_joined').populate('captainOf');
        if(!player){
            throw new appError('Player not found',404);
        }
        const {fname,lname,age,email,contact,ranking,half_centuries,centuries,total_score,highest_score,tournaments_played,captainOf} = player
        res.json({fname,lname,age,email,contact,ranking,half_centuries,centuries,total_score,highest_score,tournaments_played,captainOf})
    }))

    .delete(isLoggedIn,catchAsync(async (req,res,next)=>{
        await Player.findByIdAndDelete(req.playerId);
        res.clearCookie('token')
        res.json({msg:'Player Deleted Successfully'})
    }))
    
    


    router.post('/login', catchAsync(async(req, res)=>{

        const {email, password} = req.body
        
            const player = await Player.findOne({email : email})

            if(player && bcrypt.compareSync(password, player.password)){
                const token = jwt.sign({ "playerId": player._id}, JWT_SECRET);
                res.cookie('token', token,{
                    expires:new Date(Date.now() + 25892000000),
                    secure: true, 
                    httpOnly: true, 
                    sameSite: 'none' 
                  });
                res.status(200).json({ msg: 'User signed in successfully'})
            }else{
                throw new appError(400,'Email or password is incorrect')
            }
        
    }))

    router.get('/all-players', catchAsync(async (req, res) => {
          const players = await Player.find();
          if(!players) throw new appError(401,'No player found')
          res.json(players);
      }));


    // Endpoint for accepting a request from a team by a player

    router.post('/send-request/:teamId',isLoggedIn,catchAsync( async (req, res) => {
        const { teamId } = req.params
        // console.log(teamId)

        const team = await Team.findById(teamId).populate('captain').populate('players').populate('requests')
        if(!team){
            new appError(500,'Error sending request')
        }
        const playerId  = req.playerId


        const player = await Player.findById(playerId)
          // add the team from the player's received requests array
        // console.log(team.captain._id)
        // console.log(playerId)
          if(playerId === team.captain._id){
            console.log("hello")
            throw new appError(401,'You are already joined')
          }
        
          const matched = team.players.find(el => el==player)
          if(matched){
            throw new appError(401,'You are already joined')
          }

          const matchedRequest = team.requests.find(el => el==player)
          if(matchedRequest){
            throw new appError(401,'Request already sent')
          }

          player.sentRequests.push(team)
          team.requests.push(player)
          await player.save()
          await team.save()


          res.json({'msg':'Request sent successfully'});

          
    
        }))
      

    // router.post('/send-request',isLoggedIn, async (req, res) => {
    //     const { playerId } = req.body;
    //     const request = {
    //     // assuming you have authentication middleware that sets req.user
    //       from: req.player._id, 
    //       to: playerId,
    //       date: new Date(),
    //     };
    //     try {
    //       // save the request in your database
    //       const result = await Request.create(request);
    //       res.json(result);
    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).json({ error: 'Internal server error' });
    //     }
    //   });
            
    module.exports = router



    /*
    for postman

{"player":{
"name":"alok",
"age": 19,
"email": "alok@93",
"phone" : 2323,
"password": "fsd"
}}

{"player":{
  "fname": "alok",
  "lname": "jaiswal",
  "age": 34,
  "email": "alok@gmail.com",
  "contact": 46424543342,
  "password": "aaklj344snjrn"
}}

{"player":{
"fname":"alok",
"lname":"jaiswal",
"age": 19,
"email": "alok@93",
"contact" : 2323,
"password": "fsd"
}}
    
    */