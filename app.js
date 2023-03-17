'use strict';
const fs = require('fs');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

//MongoDB
const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/raven_messenger";
const client = new MongoClient(url);

const New_message = require('./src/message');


const ip = "127.0.0.1";
const port = 8081;


//JSON
fs.readFile('./data/messages_data.json', 'utf-8', (error, data)=>{
    let messageObj = JSON.parse(data);
   
    //console.log(messageObj);

    app.set("view engine", "ejs");

    app.use(express.static("./public"));

    //POST new guest entry using the form
    app.use(bodyParser.urlencoded({
        extended: true
    }));

    app.get("/", (req, res)=>{
        //console.log(messageObj);
        res.render("index",{     
            messageObj: messageObj
        })
    })

    app.post('/send', (req, res) => {

        //set date
        let time = new Date();
        let d = String(time.getDate()).padStart(2, '0');
        let m = String(time.getMonth()+1).padStart(2, '0');
        let y = time.getFullYear();
        let t = time.getHours() + ":" + time.getMinutes();

        time = d + "-" + m + "-" + y + "," + t
        req.body.time = time;  

 
        const new_message = new New_message(
            req.body.id,
            req.body.avatar,
            req.body.profile,
            req.body.time,
            req.body.message           
            );
            messageObj.push(new_message);

            fs.writeFile("./data/messages_data.json", JSON.stringify(messageObj), "utf-8", (error) => {
                if (error) console.log("Error:" + error);
              });

            //Mongo database
            async function databaseRun(){
            const messenger = client.db("raven_messenger");
            const messages = messenger.collection("messages");

            const msgObj = {
                new_message
            };

            const result = await messages.insertOne(msgObj);
            console.log("new message: " + JSON.stringify(result));

            await client.close();

            }
            databaseRun();

            res.redirect('/');
    });

    //EDIT
    app.get('/edit/:id', (req, res)=>{
        
    })

    app.get('/delete/:id', (req,res)=>{

        //console.log(messageObj);
     
        messageObj.splice(req.params.id, 1);

        //delete one mongo
        //???
        
        fs.writeFile("./data/messages_data.json", JSON.stringify(messageObj), "utf-8",(error) =>{
            if(error){
                if (error) console.log("Error:" + error);
            }
        })
        res.redirect('/');
    })
 
    
    
    app.listen(port, ip, () => {
        console.log(`Server running at http://${ip}:${port}/`);
    });

  }
);


