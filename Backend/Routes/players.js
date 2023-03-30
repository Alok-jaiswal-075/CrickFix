const express = require('express');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const catchAsync = require('../Utility/catchAsync')
const appError = require('../Utility/appError')
const Player = require('../Models/Player');
const { findById, findByIdAndUpdate } = require('../Models/Team');

router.route('/')
    .post(catchAsync(async (req,res,next)=>{
        const player = new Player(req.body.player);
        // console.log(player)
        
        await player.save()     // now before saving we want to becrypt our password, we will use a middleware in our player schema which will automatically becrypt the password when it is changed
        res.json(player)
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


    router.post('/signin', async(req, res)=>{
        const {email, password} = req.body
        
        try{
            const player = await Player.findOne({email : email})
            if(!player){
                // if user doesn't exist, redirect the user to signup page
                // res.redirect(200, '/api/auth/signup')
                throw new appError('Player not found',404)
            }
            else if(password === player.password){
                // res.json(player)
                const token = jwt.sign({ playerId: player.id }, JWT_SECRET);
                // res.json({token: token})
                res.cookie('token', token)
            }else{
                throw new appError('Email or password is incorrect',400)
            }
        }catch(err){
            res.json(new appError(err, 'Something went wrong'))
        }
    })




    /*
    for postman

{"player":{
"name":"alok",
"age": 19,
"email": "alok@93",
"phone" : 2323,
"password": "fsd"
}}
    
    */