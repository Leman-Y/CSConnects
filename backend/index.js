const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //to bypass cors policy
const app = express();
const mysql = require('mysql');

const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 8;
//const cron = require('node-cron');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone' 
});
app.use(cors({
    origin: ["http://localhost:3000"], //put the URL of what we want the session to work on. may have to change when deploying
    methods: ["GET", "POST"],
    credentials: true  //allows cookies to be enabled, enabling sessions
}));
app.use(cookieParser());
app.use(express.json()); //convert mysql result to json, to make it readable
app.use(bodyParser.urlencoded({extended: true}));

app.use(session({
    key: "userId",
    secret: "randomsecret",
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 3600000 //determines how long until the cookie expires. This is in miliseconds. It is currently set to 60 mins
    }
}))

//get all events from DB
app.get("/api/getEvents", (req, res) =>{
    try{
         const sqlGet = "select hunter_events.event_id, DATE_FORMAT(hunter_events.date, '%Y-%m-%d') as date, hunter_events.start_time, hunter_events.end_time, hunter_events.event_name, hunter_events.event_description, hunter_events.event_location, event_club.club_name, event_type.keyword_name FROM hunter_events, event_club, event_type WHERE hunter_events.event_club = event_club.club_id AND hunter_events.event_type = event_type.keyword_id";

        // Only gets a certain date
        // const sqlGet = "select hunter_events.event_id, DATE_FORMAT(hunter_events.date, '%Y-%m-%d') as date, hunter_events.start_time, hunter_events.end_time, hunter_events.event_name, hunter_events.event_description, hunter_events.event_location, event_club.club_name, event_type.keyword_name FROM hunter_events, event_club, event_type WHERE hunter_events.event_club = event_club.club_id AND hunter_events.event_type = event_type.keyword_id AND DATE >='2020-09-30' AND DATE <'2020-09-31'";

        db.query(sqlGet, (err, result)=>{
            res.send(result);
        });
    }
    catch (err) {
        console.error(err.message);
    }
})


//gets all events with specific date as parameter
app.post('/api/getEvents',(req,res)=>{
    try {
        const year = req.body.year;
        const month = req.body.month;
        const day = req.body.day;

        const convertedYear = Number(year);
        const convertedMonth = Number(month);
        const convertedDay = Number(day);
        // const sqlGet = "select hunter_events.event_id, DATE_FORMAT(hunter_events.date, '%Y-%m-%d') as date, hunter_events.start_time, hunter_events.end_time, hunter_events.event_name, hunter_events.event_description, hunter_events.event_location, event_club.club_name, event_type.keyword_name FROM hunter_events, event_club, event_type WHERE hunter_events.event_club = event_club.club_id AND hunter_events.event_type = event_type.keyword_id AND DATE >='2020-09-30' AND DATE <'2020-09-31'";

        //const sqlGet = 'SELECT * FROM hunter_events WHERE date >= \''+  convertedYear + '-' + convertedMonth + '-' + convertedDay + '\' AND date < \'' + convertedYear + '-' + convertedMonth + '-' + (convertedDay+1) + '\'';
        // const sqlGet = 'SELECT * FROM hunter_events WHERE date >=\'2020-11-30\' AND date < \'2020-11-31\'';
        const sqlGet = 'SELECT * FROM hunter_events WHERE DATE(date) = \''+  convertedYear + '-' + convertedMonth + '-' + convertedDay + '\'';

        db.query(sqlGet, (err, result)=>{
            res.send(result);
        });
    }
    catch(err) {
        console.error(err.message);
    }


})


//to display everything in database. We do this by sending a json file to the front end containing all the information
app.get("/api/get", (req, res) =>{
    try {
        const sqlGet = "select * from user";
        db.query(sqlGet, (err, result)=>{
            res.send(result);
        });
    }
    catch(err) {
        console.error(err.message);
    }
})

//this is to insert into database
app.post('/api/insert', (req,res)=>{
    try{
        //when localhost:3001/api/insert is called from the front end, 2 variables are passed through. userName and userPassword.
        //These two variables are passed into the db.query function, which inserts the values into the database.
        const userName = req.body.userName;
        const userPassword = req.body.userPassword;

        if(userName.length <= 0 || userPassword.length <=0){
            res.send({message: "Please enter a username or password"});
        }else if(isNaN(userName)){
            res.send({message: "Please enter a valid phone number"});
        }else{
            const checkphone = "SELECT * from user WHERE phoneNum = ?;";
            db.query(
                checkphone,
                userName,
                (err, result)=>{
                    if(result.length > 0){
                        res.send({message: "That number is already registered"});
                    }else{
                        res.send({message: "That number is valid inserting.."});
                        //hashes the password that the user inputted
                        bcrypt.hash(userPassword, saltRounds, (err, hash) =>{

                            if(err){
                                console.log(err);
                            }

                            const sqlInsert = "INSERT INTO user (phoneNum, password, role) VALUES (?,?, 'user')";
                            db.query(
                                sqlInsert,
                                [userName, hash],
                                (err, result)=>{
                                    //console.log(result);
                                });
                        })
                    }
                });
        }

    }
    catch(err) {
        console.error(err.message);
    }
    
});


app.get("/login", (req,res)=>{
    if(req.session.user){ //if there already exists a user session
        res.send({loggedIn: true, user: req.session.user});//send an object loggedIn as true, and send user session information
        console.log(req.session.user);
    }else{
        res.send({loggedIn: false}); //send object loggedIn as false, don't send user information
    }
})  


//handles login authentication
app.post('/login',(req,res)=>{
    const userName = req.body.userName; 
    const userPassword = req.body.userPassword;
    const sqlGet = "select * from user where phoneNum = ?;";
    db.query(
        sqlGet,
        userName ,
        (err, result)=>{
        if(err){
            res.send({err: err});
        }

        //if the result is greater than 0, meaning there is a username with that combination
        if(result.length > 0) { 
            bcrypt.compare(userPassword, result[0].password, (error, response) =>{
                if(response){//if user successfully logins
                    req.session.user = result; //create a session with user information passed into the session variable.
                    //console.log(req.session.user);
                    res.send(result);
                }else{
                    res.send({message: "Incorrect phone or password"});
                }
            })
        }else{
            res.send({message: "Phone number doesn't exist"});
        }
    });
})


//handles login authentication
app.get('/logout',(req,res)=>{
    if(req.session.user){ //if there already exists a user session
        console.log("there exists a session " + req.session.user + ". Destroying session now");
        res.clearCookie('user');
        req.session.destroy();
        res.send({loggedIn: false});
    }else{
        console.log("unsuccessful logout");
    }   
})

app.listen(3001, () =>{
    console.log('running on port 3001');
});