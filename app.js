'use strict';
const fs = require('fs');
const express = require("express");
const bodyParser = require('body-parser');
const app = express();

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

        if(req.body.img === undefined){
            console.log("placeholder profile");
        }


        const new_message = new New_message(
            req.body.id,
            req.body.profile,
            req.body.img,
            req.body.time,
            req.body.message           
            );
            messageObj.push(new_message);
            res.redirect('/');
    });

    //EDIT
    app.get('/edit/:id', (req, res)=>{
        
    })

    app.get('/delete/:id', (req,res)=>{

        //console.log(messageObj);
     
        messageObj.splice(req.params.id, 1);
        
        fs.writeFile("./data/messages_data.json", JSON.stringify(messageObj), "utf-8",(error) =>{
            if(error){
                if (error) console.log("Error:" + error);
            }
        })
        res.redirect('/');
    })

         

    fs.writeFile("./data/messages_data.json", JSON.stringify(messageObj), "utf-8", (error) => {
        if (error) console.log("Error:" + error);
      });

    
    
    
    app.listen(port, ip, () => {
        console.log(`Server running at http://${ip}:${port}/`);
    });

  }
);

