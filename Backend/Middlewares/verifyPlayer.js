// decodes the token from header and saves its value in req.token
// later it will get the token from either cookie or session


const express = require('express')
const jwt = require('jsonwebtoken');
const appError = require('../Utility/appError')
const catchAsync = require('../Utility/catchAsync')
const Player = require('../Models/Player')

const JWT_SECRET = 'this is a #$#@# very tough secret @&%^#&&**'

const verifyPlayer =catchAsync( async (req, res, next) => {
    // console.log(req.cookies.token)
    const token = req.cookies.token
    const decoded = jwt.verify(token, JWT_SECRET)
    const player = await Player.findById(decoded.playerId);
    if(!player) throw new appError(401,'Not authorised')
    req.playerId = player._id;
    next();
})

module.exports = verifyPlayer