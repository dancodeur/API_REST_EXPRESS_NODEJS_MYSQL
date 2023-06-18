const express=require('express');
const mysql=require("mysql");
const cors=require("cors");


const app=express();
app.use(express.json()); //utilisation du format json...
app.use(cors()); //utilisation du module cors.

//connextion a la base de donnée...

const db=mysql.createConnection({
    user:"root",
    database:"php-blog2023",
    password:"",
    host:"localhost"
});

/**
 * Routage
 */

//SELECT * USERS 
app.get("/usersList",(req,res)=>{

    db.query("SELECT * FROM react_express",(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.send(result);
        }
    });
});

//SELECT  USERS WHERE ID...
app.get("/users/:id",(req,res)=>{

    const id=req.params.id;

    db.query("SELECT * FROM react_express WHERE id=?",id,(err,result)=>{
        if(err){
            console.log(err);
        }else{
            res.status(200).send(result);
        }
    });
});


//UPDATE USERS  PROFIL WHERE ID...

app.put("/updateUsers",(req,res)=>{

    const id=req.body.id;
    const pseudo=req.body.pseudo;
    const pwd=req.body.pwd;

    db.query("UPDATE react_express SET speudo=?, pwd=? WHERE id=? ", [pseudo,pwd,id],(err,result)=>{
        if(err){
           console.log(err)
        }else{
            res.status(200).send(result);
        }
    });
});

// INSERT NEW USER

app.post("/insertUsers/",(req,res)=>{

    const pseudo=req.body.pseudo;
    const pwd=req.body.pwd;

    db.query("INSERT INTO react_express(speudo,pwd) VALUES(?,?)", [pseudo,pwd],(err,result)=>{
        if(err){
           console.log("BAD REQUEST");
        }else{
            res.status(200).send(result);
        }
    });
});


//DELETE  USERS WHERE ID...
app.delete("/usersDelete/:id",(req,res)=>{

    const id=req.params.id;

    db.query("DELETE FROM react_express WHERE id=?",id,(err,result)=>{
        if(err){
            console.log("BAD REQUEST");
        }else{
            res.status(200).send(result);
        }
    });
});



//Initialisation du serveur 

app.listen(3001,(res)=>{
    console.log("Server is running in port 3001");    
});