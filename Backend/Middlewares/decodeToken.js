// decodes the token from header and saves its value in req.token
// later it will get the token from either cookie or session

const express = require('express')
const jwt = require('jsonwebtoken');
const appError = require('../Utility/appError')

const JWT_SECRET = 'this is a #$#@# very tough secret @&%^#&&**'

const decodeToken = async (req, res, next) => {
    try {
        let token = req.headers.token
        const decoded = await jwt.verify(token, JWT_SECRET)
        req.playerId = decoded.playerId
    } catch (err) {
        res.status(400).json(new appError(err, 'Bad Request'))
    }

    next()
}

module.exports = decodeToken