 import express from "express"
 import mongoose from "mongoose"

 import Cards from "./dbCards.js"
 import Cors from "cors"

 //App config
 const app = express(); 
 const port = process.env.PORT || 8001
 const conection_url = `mongodb+srv://admin:ZBEfzs97@cluster0.kguw0.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`

 //Middlewares
app.use(express.json())
app.use(Cors())


 //Db config
 mongoose.connect(conection_url, {
     useNewUrlParser:true,
     useCreateIndex:true,
     useUnifiedTopology:true
 })

 //API Endpoints
 app.get("/", (req, res)=>res.status(200).send("HELLO WORLD"))
 
 app.post("/tinder/card", (req,res)=>{
     const dbCard = req.body;

     Cards.create(dbCard, (err, data) => {
         if (err){
             res.status(500).send(err)             
         }else{
             res.status(201).send(data)
         }
     })
 })

 app.get("/tinder/cards", (req, res)=>{
    Cards.find((err,data)=>{
        if (err){
            res.status(500).send(err)             
        }else{
            res.status(200).send(data)
        }
    })

 })
 //Listener
 app.listen(port, ()=>console.log("listening on local host:"+port))