const express = require('express')
const jwt = require('jsonwebtoken');
const appError = require('./Utility/appError')
const catchAsync = require('./Utility/catchAsync')
const Player = require('./Models/Player')
const Team = require('./Models/Team')

const JWT_SECRET = 'this is a #$#@# very tough secret @&%^#&&**'

module.exports.isLoggedIn =catchAsync( async (req, res, next) => {
    const token = req.cookies.token
    if(!token) throw new appError(401,'User not logged in')
    const decoded = jwt.verify(token, JWT_SECRET)
    const player = await Player.findById(decoded.playerId);
    if(!player) throw new appError(401,'Not authorised')
    req.playerId = player._id;
    next();
})

module.exports.isCaptain = catchAsync( async (req, res, next) => {
    const {id} = req.params
    const team = await Team.findById(id).populate('captain');
    if(!team) throw new appError(401,'Team does not exist')
    const player = await Player.findById(req.playerId)
    if(team.captain.email != player.email) throw new appError(401,'Only captain is authorised to make changes')
    next();
})
