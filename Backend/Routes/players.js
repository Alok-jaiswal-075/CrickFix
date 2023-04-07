const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const catchAsync = require('../Utility/catchAsync')
const appError = require('../Utility/appError')
const Player = require('../Models/Player');
const { findById, findByIdAndUpdate } = require('../Models/Team');
const bcrypt = require('bcryptjs')
const verifyPlayer = require("../Middlewares/verifyPlayer")

const JWT_SECRET = "this is a #$#@# very tough secret @&%^#&&**"

router.route('/')
    .post(catchAsync(async (req,res,next)=>{
        // console.log(req.body.player)
        req.body.player.age = parseInt(req.body.player.age);
        req.body.player.contact = parseInt(req.body.player.contact)
        const player = new Player(req.body.player);
        // console.log(player)
        
        
        await player.save()     // now before saving we want to becrypt our password, we will use a middleware in our player schema which will automatically becrypt the password when it is changed
        res.status(200).json({"msg":"registration successfull"})
        // res.json({"msg":"success"})
    }))

router.route('/') 
    .put(verifyPlayer,catchAsync(async (req,res,next)=>{
        console.log(req.player)
        const {id} = req.params
        const player = await Player.findByIdAndUpdate(id, {...req.body.player});
        await player.save();
        res.json(player)
    }))
    .get(verifyPlayer,catchAsync(async (req,res,next)=>{
        const player =await Player.findById(req.playerId).populate('team_joined');
        if(!player){
            throw new appError('Player not found',404);
        }
        const {fname,lname,age,email,contact,ranking,half_centuries,centuries,total_score,highest_score,tournaments_played} = player
        res.json({fname,lname,age,email,contact,ranking,half_centuries,centuries,total_score,highest_score,tournaments_played})
    }))
    .delete(verifyPlayer,catchAsync(async (req,res,next)=>{
        const {id} = req.params
        await Player.findByIdAndDelete(id);
        res.json('Player Deleted Successfully')
    }))
    
    module.exports = router


    router.post('/login', catchAsync(async(req, res)=>{

        const {email, password} = req.body
        
            const player = await Player.findOne({email : email})

            if(player && bcrypt.compareSync(password, player.password)){
                const token = jwt.sign({ "playerId": player._id}, JWT_SECRET);
                // console.log(token)
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