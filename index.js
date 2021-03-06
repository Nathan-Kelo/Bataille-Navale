/**** Import npm libs ****/
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
const mysql = require('mysql');


/**** Import project libs ****/

const states = require('./back/modules/states');
//const Theoden = require('./back/models/Theoden');

/**** Project configuration ****/

const jsonParser = bodyParser.json();
const urlencodedParser = bodyParser.urlencoded({ extended: false });

// Init of express, to point our assets
app.use(express.static(__dirname + '/front/'));
app.use(urlencodedParser);
app.use(session);

// Configure socket io with session middleware
io.use(sharedsession(session, {
    // Session automatiquement sauvegardée en cas de modification
    autoSave: true
}));

// Détection de si nous sommes en production, pour sécuriser en https
if (app.get('env') === 'production') {
    app.set('trust proxy', 1) // trust first proxy
    session.cookie.secure = true // serve secure cookies
}

const con = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password:'',
    database:'bataill-navale'
});

con.connect(err =>{
    if(err) throw err;
    else console.log("connection effectuee");

    let username_ = 'usertest2';
    let password_ = 'passy_';
    let id_ = 5;

    io.on('username',username=>{//on recupere l'username sur le socket
        console.log(username);
    })
    function test(user_,pass_,id_){//cette fonction permet de mettre les nom d'utilisateur dans la BDD

        let sql = "INSERT INTO new_table (Username,Password,id) VALUES (?,?,?)";
        con.query(sql,[user_,pass_,id_],(err) =>{
            if (err) throw err;
            console.log('Bonjour à tous');
            
        });

        con.query("SELECT * FROM new_table",(err,result) =>{
            if(err) throw err;
            console.log(result);
        });
    };
    test(username_,password_,id_);

    
});

/**** Code ****/

app.get('/', (req, res) => {
    let sessionData = req.session;

    // Test des modules 
    states.printServerStatus();
    states.printProfStatus();
    let test = new Bateaux();

    // Si l'utilisateur n'est pas connecté
    if (!sessionData.username) {
        res.sendFile(__dirname + '/front/html/login.html');
    } else {
        res.sendFile(__dirname + '/front/html/index.html');
    }
});

app.post('/login', body('login').isLength({ min: 3 }).trim().escape(), (req, res) => {
    const login = req.body.login

    // Error management
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        console.log(errors);
        //return res.status(400).json({ errors: errors.array() });
    } else {
        // Store login
        req.session.username = login;
        req.session.save()
        res.redirect('/');
    }
});

io.on('connection', (socket) => {
    console.log('Un élève s\'est connecté');

    socket.on("login", () => {
        let srvSockets = io.sockets.sockets;
        srvSockets.forEach(user => {
            console.log(user.handshake.session.username);
        });
        io.emit('new-message', 'Utilisateur ' + socket.handshake.session.username + ' vient de se connecter');
    });

    socket.on('disconnect', () => {
        io.emit('new-message', 'Serveur : Utilisateur ' + socket.handshake.session.username + ' vient de se déconnecter');
        console.log('Un élève s\'est déconnecté');
    });
});

con.on('error', function(err) {
    console.log("[mysql error]",err);
  });
  
http.listen(4200, () => {
    console.log('Serveur lancé sur le port 4200');
});
