const express=require("express");
const cors=require("cors");
const mysql=require("mysql");
const e = require("cors");

const app=express();
app.use(cors());
app.use(express.json());



//connection a la base de donné
const db=mysql.createConnection({
    user:"root",
    database:"php-blog2023",
    host:"localhost",
    password:""
});

/**
 * Ce routage permert de recuperer les informations
 * ded la base de donnée et les envoies au client...
 */

app.get('/user',(req,res)=>{

    db.query('SELECT * FROM react_express ',(err,results)=>{
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

/**
 * Ce routage permet sauvegarder les infos du client à la base de donnnée...
 * Client -> Server
 */

app.post('/InsertUser',(req,res)=>{
    
    const pseudo=req.body.pseudo;
    const pwd=req.body.pwd;

    db.query('INSERT INTO react_express (speudo,pwd) VALUES (?,?)',[pseudo,pwd],(err,results)=>{
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

/**
 *Ce routage permet d'effacer les utilisateur de ma 
 * base de donnée...
*/

app.delete('/deleteUser/:id',(req,res)=>{
    const id=parseInt(req.params.id);
    

    db.query("DELETE FROM react_express WHERE id=? ",id,(err,results)=>{
        if(err){
            console.log(err);
        }else{
            res.send(results);
        }
    });
});

/**
 * Ce routage permet de mettre a jour les données
 * d'un utilisateteur
 */

app.put("/updateUser",(req,res)=>{
       const id=req.body.id;
       const pseudo=req.body.pseudo;
       const pwd=req.body.pwd;

       db.query("UPDATE react_express SET speudo=?, pwd=? WHERE id=?",[pseudo,pwd,id],(err,results)=>{
          
        if(err){
            console.log(err);
        }else{

            res.send(results);
        }
       });
});

//running our app

app.listen(3002,(req,res)=>{
    console.log('server is running in port 3002...');
})