const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const catchAsync = require('../Utility/catchAsync')
const appError = require('../Utility/appError')
const Player = require('../Models/Player');
const { findById, findByIdAndUpdate } = require('../Models/Team');
const bcrypt = require('bcryptjs')

router.route('/')
    .post(catchAsync(async (req,res,next)=>{
        // console.log(req.body.player)
        req.body.player.age = parseInt(req.body.player.age);
        req.body.player.contact = parseInt(req.body.player.contact)
        const player = new Player(req.body.player);
        // console.log(player)
        
        
        await player.save()     // now before saving we want to becrypt our password, we will use a middleware in our player schema which will automatically becrypt the password when it is changed
        res.json(player)
        // res.json({"msg":"success"})
    }))

router.route('/:id') 
    .put(catchAsync(async (req,res,next)=>{
        const {id} = req.params
        const player = await Player.findByIdAndUpdate(id, {...req.body.player});
        await player.save();
        res.json(player)
    }))
    .get(catchAsync(async (req,res,next)=>{
        const player =await Player.findById(req.params.id).populate('team_joined');
        if(!player){
            throw new appError('Player not found',404);
        }

        res.json(player)
    }))
    .delete(catchAsync(async (req,res,next)=>{
        const {id} = req.params
        await Player.findByIdAndDelete(id);
        res.json('Player Deleted Successfully')
    }))
    
    module.exports = router


    router.post('/login', catchAsync(async(req, res)=>{

        const {email, password} = req.body
        
            const player = await Player.findOne({email : email})

            if(!player || bcrypt.compareSync(password, player.password)){
                const token = jwt.sign({ player: player}, JWT_SECRET);
                // console.log(token)
                // res.cookie('token', token)
                res.json(player)
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