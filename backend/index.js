const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //to bypass cors policy
const app = express();
const mysql = require('mysql');

const bcrypt = require('bcrypt');
const saltRounds = 8;
//const cron = require('node-cron');

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone' 
});
app.use(cors());
app.use(express.json()); //convert mysql result to json, to make it readable
app.use(bodyParser.urlencoded({extended: true}));

//get all events
app.get("/api/getEvents", (req, res) =>{
    const sqlGet = "select hunter_events.event_id, DATE_FORMAT(hunter_events.date, '%M %D %Y') as date, hunter_events.start_time, hunter_events.end_time, hunter_events.event_name, hunter_events.event_description, hunter_events.event_location, event_club.club_name, event_type.keyword_name FROM hunter_events, event_club, event_type WHERE hunter_events.event_club = event_club.club_id AND hunter_events.event_type = event_type.keyword_id";
    db.query(sqlGet, (err, result)=>{
        res.send(result);
        console.log(result);
    });

})

//to display everything in database. We do this by sending a json file to the front end containing all the information
app.get("/api/get", (req, res) =>{
    const sqlGet = "select * from user";
    db.query(sqlGet, (err, result)=>{
        res.send(result);
    });
})

//this is to insert into database
app.post('/api/insert', (req,res)=>{
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

                                const sqlInsert = "INSERT INTO user (phoneNum, password) VALUES (?,?)";
                                db.query(
                                    sqlInsert, 
                                    [userName, hash], 
                                    (err, result)=>{
                                        console.log(result);
                                });
                            })
                } 
        });
    }





    
});

// Schedule tasks to be run on the server.
// cron.schedule('* * * * *', function() {
//     console.log('running a task every minute');
//   });
  

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
                if(response){
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

app.listen(3001, () =>{
    console.log('running on port 3001');
});