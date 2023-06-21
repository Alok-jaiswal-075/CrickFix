const { urlencoded } = require('express')
const express = require('express')
const playerRoutes = require('./Routes/players')
const teamRoutes = require('./Routes/teams')
const matchRoutes = require('./Routes/match')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const app = express()
const port = 5000

// Route imports
const auth = require('./Routes/auth')
app.use(express.urlencoded({ extended: true }));

// DB connection
const dbUrl = 'mongodb+srv://myprojects121130:rootuser@cluster0.gwub0n1.mongodb.net/?retryWrites=true&w=majority'

mongoose.connect(dbUrl,{
    // useCreateIndex:true,
    // useNewUrlParse: true,
    useUnifiedTopology: true
}).then(d=>{
    console.log("Mongodb connection successful!!")
}).catch(err=>{
    console.log("Mongodb connection error")
    console.log(err)
})

// Mentioning Content type
app.use(express.json())
app.use(urlencoded({extended: false}))
app.use(cookieParser())

app.use('/players',playerRoutes);
app.use('/teams',teamRoutes)
app.use('/matches',matchRoutes)

// Route Drivers
// app.use('/api/auth', auth)

app.get('/hello', (req, res)=>{
    res.send({"Hello" :"World"})
    console.log('hello')
})


app.use((err,req,res,next)=>{
    const { statusCode = 500 } = err;
    if (!err.message) err.message = 'Oh No, Something Went Wrong!'
    res.status(statusCode).json({"msg":err.message})
})

app.listen(port, ()=>{
    console.log(`App running at http://127.0.0.1:${port}`)
})