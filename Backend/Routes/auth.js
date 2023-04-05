// // Route for this driver : /api/auth

// const express = require('express')
// const mongoose = require('mongoose')
// const { body, validationResult } = require('express-validator');
// const jwt = require('jsonwebtoken');
// const appError = require('../Utility/appError')

// // Middleware
// const decodeToken = require('../Middlewares/decodeToken')

// // Model Imports
// const Player = require('../Models/Player')
// const Team = require('../Models/Team')

// const router = express.Router()

// router.get('/', (req, res)=>{
//     res.send('this is auth')
// })

// const JWT_SECRET = 'this is a #$#@# very tough secret @&%^#&&**'


// // Add a new player : POST : /api/auth/signup
// // Add express validator for validation later
//  router.post('/signup', async(req, res)=>{
//     const {email, password, phone, name, age} = req.body
//     const newUser = {
//         email: email,
//         password: password,
//         phone: phone,
//         name: name,
//         age: age
//     }
//     try{
//         const player = new Player(newUser)
//         await player.save()
//         res.json(player)
//     }catch(err){
//         res.status(500).json(new appError(err, 'Something went wrong'))
//     }
// })

// // Login an existing player : POST : /api/auth/signin
// router.post('/signin', async(req, res)=>{
//     const {email, password} = req.body
    
//     try{
//         const player = await Player.findOne({email : email})
//         if(!player){
//             // if user doesn't exist, redirect the user to signup page
//             res.redirect(200, '/api/auth/signup')
//         }
//         else if(password === player.password){
//             // res.json(player)
//             const token = jwt.sign({ playerId: player.id }, JWT_SECRET);
//             // res.json({token: token})
//             res.setHeader('token', token).json({token: token})
//         }else{
//             res.json(new appError('bad credentials', 'Password is Incorrect'))
//         }
//     }catch(err){
//         res.json(new appError(err, 'Something went wrong'))
//     }
// })

// // Register a new team : POST : /api/auth/team/new
// router.post('/team/new', async(req, res)=>{
//     const {name, location_based, matches_played, players} = req.body
    
//     try{
//         const newTeam = new Team({
//             name: name,
//             location_based: location_based,
//             matches_played: matches_played,
//             players: players
//         })
//         await newTeam.save()
//         res.json(newTeam)
//     }catch(err){
//         res.json(new appError(err, 'Something went wrong'))
//     }
// })

// // Get player details : GET : /api/auth/{player id}'
// router.get('/:id', async(req, res)=>{
//     const id = req.params.id
//     try{
//         const player = await Player.findById(id)
//         res.json(player)
//     }catch(err){
//         res.status(400).json(new appError(err, 'Bad Request'))
//     }
// })

// // Get team details : GET : /api/auth/team/{team id}'
// router.get('/team/:id', async(req, res)=>{
//     const id = req.params.id
//     try{
//         const team = await Team.findById(id)
//         res.json(team)
//     }catch(err){
//         res.status(400).json(new appError(err, 'Bad Request'))
//     }
// })


// module.exports = router