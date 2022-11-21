require('dotenv').config()
const express=require('express')
const sequelize=require('./db')
const cors=require('cors')
const fileUpload=require('express-fileupload')
const router=require('./routes/router')
const path =require('path')
const  errorHandler=require('./middleware/ErrorHandlingMiddelware')
const  cookieParser=require('cookie-parser')


const PORT=process.env.PORT || 5555
const app=express()
app.use(cors({origin:'http://localhost:3000', credentials: true}))
app.use(express.static(path.resolve(__dirname,'static')))
app.use(express.json())
app.use(cookieParser(process.env.SECRET_KEY))
app.use(fileUpload({}))
app.use('/api',router)
app.use(errorHandler)


const start=async ()=>{
    try{
        await sequelize.authenticate()
        await sequelize.sync()
        app.listen(PORT,()=>{ console.log(`Сервер запустился на ${PORT} порту`)})
    }
    catch (err){
        console.log(err)
    }
}

start()