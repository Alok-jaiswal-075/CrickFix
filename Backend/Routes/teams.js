const express = require('express')
const router = express.Router();
const Team = require('../Models/Team')
const appError = require('../Utility/appError')
const catchAsync = require('../Utility/catchAsync')


router.route('/')
    .post(catchAsync(async (req,res,next)=>{
        const team = new Team(req.body.team);
        await team.save()
        res.json(team)
    }))


router.route('/:id')
    .put(catchAsync(async (req,res,next)=>{
        const {id} = req.params
        const team = await Team.findByIdAndUpdate(id, {...req.body.team});
        await team.save();
        res.json(team)
    }))
    .get(catchAsync(async (req,res,next)=>{
        const team =await Team.findById(req.params.id).populate('players');
        if(!team){
            throw new appError('Team not found',404);
        }

        res.json(team)
    }))
    .delete(catchAsync(async (req,res,next)=>{
        const {id} = req.params
        await Team.findByIdAndDelete(id);
        res.json('Team Deleted Successfully')
    }))

module.exports = router