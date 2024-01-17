const express=require('express')
const  cors=require('cors')
const morgan=require('morgan');
const dotenv=require('dotenv');
const connectDB = require('./config/db');

// import router
const userRoutes=require('./routes/userRoutes')
const blogRoutes=require('./routes/blogRoutes')

dotenv.config()
// rest object

connectDB()
const app=express()

// Middleware 
app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


// Router
app.use('/api/v1/user',userRoutes)
app.use('/api/v1/blog',blogRoutes)
// dotenv config
const PORT=process.env.PORT ||8080

app.listen(PORT,()=>{
  console.log(`Running on ${process.env.DEV_MODE} this ${PORT}`)
})