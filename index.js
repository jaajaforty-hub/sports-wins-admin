import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
dotenv.config()


const app = express();


const db = new pg.Pool({
  user: 'postgres',
  host: 'localhost',         
  database: 'data',
  password: '1841', 
  port: 5432,
          
});


app.use(express.static("public"));
app.use(express.urlencoded({extended:true}));
app.use(cookieParser())

let teams = []
async function getTable() {
   const data  = await db.query('SELECT * FROM teams')
   teams = data.rows 
   return teams
    
}
getTable()


app.get("/",(req,res)=>{res.render("login.ejs",{teams:teams})});
app.get("/login",(req,res)=>{res.render("login.ejs",{teams:teams})})
app.get("/home",(req,res)=>{res.render("backend.ejs",{teams:teams})});
app.get("/monday",(req,res)=>{res.render("monday.ejs",{teams:teams})});
app.get("/tuesday",(req,res)=>{ res.render("tuesday.ejs",{teams:teams})});
app.get("/wednesday",(req,res)=>{res.render("wednesday.ejs",{teams:teams})});
app.get("/thursday",(req,res)=>{ res.render("thursday.ejs",{teams:teams})});
app.get("/friday",(req,res)=>{ res.render("friday.ejs",{teams:teams})});
app.get("/saturday",(req,res)=>{res.render("saturday.ejs",{teams:teams})});
app.get("/sunday",(req,res)=>{ res.render("sunday.ejs",{teams:teams})});



app.post("/login",(req,res)=>{
    const {Email,Password} = req.body
    
    if(Email !== process.env.EMAIL || Password !== process.env.PASSWORD){
        return res.redirect("/login")
    }
    const token = jwt.sign({Email},process.env.ACCESS_KEY,{expiresIn: "1h"})
    res.cookie("token",token,{
        httpOnly:true,
        secure:false,
        sameSite:"lax"
    })
    res.redirect("/backend")
    
})

function auth(req,res,next){
    const token = req.cookies.token
    if(!token){
       return res.redirect("/login")
    }
    try{
      const Decode = jwt.verify(token, process.env.ACCESS_KEY)
        req.user = Decode
        return next()  
    }catch(e){
        return res.redirect("/login")
    }
    
}

app.get("/logout",(req,res)=>{
    res.clearCookie("token")
    res.redirect("/login")
})
app.get("/backend",auth,(req,res)=>{res.render("backend.ejs",{teams:teams})})

app.post("/monday", async (req, res) => {
    try {
        
        const queryText = `
        UPDATE monday 
        SET team = $1, results = $2, odd = $3, time = $4
        WHERE id = $5`;


        await db.query(queryText, [
            req.body.name_team_one, req.body.results_team_one, 
            req.body.odd_team_one, req.body.time_team_one, 1
        ]);

     
        await db.query(queryText, [
            req.body.name_team_two, req.body.results_team_two, 
            req.body.odd_team_two, req.body.time_team_two, 2
        ]);

      
        await db.query(queryText, [
            req.body.name_team_three, req.body.results_team_three, 
            req.body.odd_team_three, req.body.time_team_three, 3
        ]);


        await db.query(queryText, [
            req.body.name_team_four, req.body.results_team_four, 
            req.body.odd_team_four, req.body.time_team_four, 4
        ]);
        let sucMessage = "Table uploading was successful."
        res.render("monday.ejs",{message:sucMessage, teams:teams});
        
    }catch (err) {

        let errMessage = "Uploading was not successful.All fiel must be filled or Enter 0"
        console.error(err);
        res.status(500).render("monday.ejs",{message:errMessage, teams:teams});
      
    }
});

app.post("/tuesday", async (req, res) => {
    try {
        
        const queryText = `
        UPDATE tuesday 
        SET team = $1, results = $2, odd = $3, time = $4
        WHERE id = $5`;


        await db.query(queryText, [
            req.body.name_team_one, req.body.results_team_one, 
            req.body.odd_team_one, req.body.time_team_one, 1
        ]);

     
        await db.query(queryText, [
            req.body.name_team_two, req.body.results_team_two, 
            req.body.odd_team_two, req.body.time_team_two, 2
        ]);

      
        await db.query(queryText, [
            req.body.name_team_three, req.body.results_team_three, 
            req.body.odd_team_three, req.body.time_team_three, 3
        ]);


        await db.query(queryText, [
            req.body.name_team_four, req.body.results_team_four, 
            req.body.odd_team_four, req.body.time_team_four, 4
        ]);
        let sucMessage = "Table uploading was successful."
        res.render("tuesday.ejs",{message:sucMessage, teams:teams});
        
    }catch (err) {

        let errMessage = "Uploading was not successful.All fiel must be filled or Enter 0"
        console.error(err);
        res.status(500).render("tuesday.ejs",{message:errMessage, teams:teams});
      
    }
});
app.post("/wednesday", async (req,res)=>{
    try {
        
        const queryText = `
        UPDATE wednesday 
        SET team = $1, results = $2, odd = $3, time = $4
        WHERE id = $5`;


        await db.query(queryText, [
            req.body.name_team_one, req.body.results_team_one, 
            req.body.odd_team_one, req.body.time_team_one, 1
        ]);

     
        await db.query(queryText, [
            req.body.name_team_two, req.body.results_team_two, 
            req.body.odd_team_two, req.body.time_team_two, 2
        ]);

      
        await db.query(queryText, [
            req.body.name_team_three, req.body.results_team_three, 
            req.body.odd_team_three, req.body.time_team_three, 3
        ]);


        await db.query(queryText, [
            req.body.name_team_four, req.body.results_team_four, 
            req.body.odd_team_four, req.body.time_team_four, 4
        ]);
        let sucMessage = "Table uploading was successful."
        res.render("wednesday.ejs",{message:sucMessage, teams:teams});
        
    }catch (err) {

        let errMessage = "Uploading was not successful.All fiel must be filled or Enter 0"
        console.error(err);
        res.status(500).render("wednesday.ejs",{message:errMessage, teams:teams});
      
    }
});
        
app.post("/thursday", async (req, res) => {
    try {
        
        const queryText = `
        UPDATE thursday 
        SET team = $1, results = $2, odd = $3, time = $4
        WHERE id = $5`;


        await db.query(queryText, [
            req.body.name_team_one, req.body.results_team_one, 
            req.body.odd_team_one, req.body.time_team_one, 1
        ]);

     
        await db.query(queryText, [
            req.body.name_team_two, req.body.results_team_two, 
            req.body.odd_team_two, req.body.time_team_two, 2
        ]);

      
        await db.query(queryText, [
            req.body.name_team_three, req.body.results_team_three, 
            req.body.odd_team_three, req.body.time_team_three, 3
        ]);


        await db.query(queryText, [
            req.body.name_team_four, req.body.results_team_four, 
            req.body.odd_team_four, req.body.time_team_four, 4
        ]);
        let sucMessage = "Table uploading was successful."
        res.render("thursday.ejs",{message:sucMessage, teams:teams});
        
    }catch (err) {

        let errMessage = "Uploading was not successful.All fiel must be filled or Enter 0"
        console.error(err);
        res.status(500).render("thursday.ejs",{message:errMessage, teams:teams});
      
    }
});
app.post("/friday", async (req, res) => {
    try {
        
        const queryText = `
        UPDATE friday 
        SET team = $1, results = $2, odd = $3, time = $4
        WHERE id = $5`;


        await db.query(queryText, [
            req.body.name_team_one, req.body.results_team_one, 
            req.body.odd_team_one, req.body.time_team_one, 1
        ]);

     
        await db.query(queryText, [
            req.body.name_team_two, req.body.results_team_two, 
            req.body.odd_team_two, req.body.time_team_two, 2
        ]);

      
        await db.query(queryText, [
            req.body.name_team_three, req.body.results_team_three, 
            req.body.odd_team_three, req.body.time_team_three, 3
        ]);


        await db.query(queryText, [
            req.body.name_team_four, req.body.results_team_four, 
            req.body.odd_team_four, req.body.time_team_four, 4
        ]);
        let sucMessage = "Table uploading was successful."
        res.render("friday.ejs",{message:sucMessage, teams:teams});
        
    }catch (err) {

        let errMessage = "Uploading was not successful.All fiel must be filled or Enter 0"
        console.error(err);
        res.status(500).render("friday.ejs",{message:errMessage, teams:teams});
      
    }
});
app.post("/saturday", async (req, res) => {
    try {
        
        const queryText = `
        UPDATE saturday 
        SET team = $1, results = $2, odd = $3, time = $4
        WHERE id = $5`;


        await db.query(queryText, [
            req.body.name_team_one, req.body.results_team_one, 
            req.body.odd_team_one, req.body.time_team_one, 1
        ]);

     
        await db.query(queryText, [
            req.body.name_team_two, req.body.results_team_two, 
            req.body.odd_team_two, req.body.time_team_two, 2
        ]);

      
        await db.query(queryText, [
            req.body.name_team_three, req.body.results_team_three, 
            req.body.odd_team_three, req.body.time_team_three, 3
        ]);


        await db.query(queryText, [
            req.body.name_team_four, req.body.results_team_four, 
            req.body.odd_team_four, req.body.time_team_four, 4
        ]);
        let sucMessage = "Table uploading was successful."
        res.render("saturday.ejs",{message:sucMessage, teams:teams});
        
    }catch (err) {

        let errMessage = "Uploading was not successful.All fiel must be filled or Enter 0"
        console.error(err);
        res.status(500).render("saturday.ejs",{message:errMessage, teams:teams});
      
    }
});

app.post("/sunday", async (req, res) => {
    try {
        
        const queryText = `
        UPDATE sunday 
        SET team = $1, results = $2, odd = $3, time = $4
        WHERE id = $5`;


        await db.query(queryText, [
            req.body.name_team_one, req.body.results_team_one, 
            req.body.odd_team_one, req.body.time_team_one, 1
        ]);

     
        await db.query(queryText, [
            req.body.name_team_two, req.body.results_team_two, 
            req.body.odd_team_two, req.body.time_team_two, 2
        ]);

      
        await db.query(queryText, [
            req.body.name_team_three, req.body.results_team_three, 
            req.body.odd_team_three, req.body.time_team_three, 3
        ]);


        await db.query(queryText, [
            req.body.name_team_four, req.body.results_team_four, 
            req.body.odd_team_four, req.body.time_team_four, 4
        ]);
        let sucMessage = "Table uploading was successful."
        res.render("sunday.ejs",{message:sucMessage, teams:teams});
        
    }catch (err) {

        let errMessage = "Uploading was not successful.All fiel must be filled or Enter 0"
        console.error(err);
        res.status(500).render("sunday.ejs",{message:errMessage, teams:teams});
      
    }
});
        
const PORT = process.env.PORT || 5000;

app.listen(PORT,()=>{
    console.log('sarver is running')
})