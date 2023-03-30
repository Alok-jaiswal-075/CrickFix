const express = require('express');
const router = express.Router();
const catchAsync = require('../Utility/catchAsync')
const appError = require('../Utility/appError')
const Player = require('../Models/Player');
const { findById, findByIdAndUpdate } = require('../Models/Team');

router.route('/')
    .post(catchAsync(async (req,res,next)=>{
        const player = new Player(req.body.player);
        // console.log(player)
        res.json(player)
        await player.save()
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