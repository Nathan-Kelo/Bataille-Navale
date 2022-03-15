
window.onload = function(){

    let signUp = document.getElementById("register");     
    let user = document.getElementById("username");
    let pass = document.getElementById("password");
    let passValid = document.getElementById("confirmPassword");
    console.log("salut");
    var Alert = false;
    const express = require('express');
    const app = express();
    const http = require('http').Server(app);
    const io = require('socket.io')(http);
    const session = require("express-session")({
        // CIR2-chat encode in sha256
        secret: "eb8fcc253281389225b4f7872f2336918ddc7f689e1fc41b64d5c4f378cdc438",
        resave: true,
        saveUninitialized: true,
        cookie: {
            maxAge: 2 * 60 * 60 * 1000,
            secure: false
        }
    });
    const sharedsession = require("express-socket.io-session");
    const bodyParser = require('body-parser');
    const { body, validationResult } = require('express-validator');
    const fs = require('fs');
    const mysql = require('mysql');                                         //Même utilité que la variable dans le login.JS


    const con = mysql.createConnection({
        host:'localhost',
        user: 'root',
        password:'',
        database:'bataill-navale'
    });

    con.connect(err=>{
        if(err) throw err;
        signUp.addEventListener('submit', event => {
            event.preventDefault();
            console.log("j'ai submit");
            if (user.value.length > 2) {                //Pseudo de Plus de 3 caractères
                if (pass.value.length >= 3) {      
                    if(passValid==pass){   
                        console.log("coooli");  //MDP de Plus de 4 caractères
                    }
                    console.log(passValid+' '+pass);
                }
            console.log('c');
            
        }
    });
});
    

    function login(){
        
    };

}

