const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //to bypass cors policy
const app = express();
const mysql = require('mysql');
require('dotenv').config()

const cookieParser = require('cookie-parser');
const session = require('express-session');

const bcrypt = require('bcrypt');
const saltRounds = 8;

const CronJob = require('cron').CronJob;
const cron = require('node-cron');
var time = require('./time');



//Pino logger-tracks each request: https://www.npmjs.com/package/express-pino-logger
const pino = require('express-pino-logger')();
const client = require('twilio')(
    //TWILIO_ACCOUNT_SID,
    //TWILIO_AUTH_TOKEN
    process.env.TWILIO_ACCOUNT_SID,
    process.env.TWILIO_AUTH_TOKEN
  );
  const service = client.notify.services(process.env.TWILIO_NOTIFY_SERVICE_SID);
//const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(pino);

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone' 
});

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'capstone' 
});
app.use(cors());
app.use(express.json()); //convert mysql result to json, to make it readable
app.use(bodyParser.urlencoded({extended: true}));

app.get('/api/greeting', (req, res) => {
    const name = req.query.name || 'World';
    res.setHeader('Content-Type', 'application/json');
    res.send(JSON.stringify({ greeting: `Hello ${name}!` }));
  });

app.post('/api/messages', (req, res) => {
    res.header('Content-Type', 'application/json');
    client.messages
    .create({
      from: process.env.TWILIO_PHONE_NUMBER,
      to: req.body.to,
      body: req.body.body
    })
    .then(() => {
      res.send(JSON.stringify({ success: true }));
    })
    .catch(err => {
      console.log(err);
      res.send(JSON.stringify({ success: false }));
    });
});
//get all events
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
    const userRole = req.body.userRole;

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
                                    console.log("error!",err);
                                }

                                const sqlInsert = "INSERT INTO user (phoneNum, password, role) VALUES (?,?,?)";
                                db.query(
                                    sqlInsert, 
                                    [userName, hash,userRole], 
                                    (err, result)=>{
                                        if(err){console.log("error#2!",err)}
                                        else{console.log("result!",result);
                                        // res.send({message2: "You signed up!"});
                                    }

                                });
                            })
                } 

            });
        }
    });

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





/* Twilio text scheduling */
function updateAppointment(list){
    console.log("updating...")
    //update appointment to notified=1
    list=list.join()
    var sql = "UPDATE event_notifications SET notified = 1 WHERE event_id IN ("+list+")"
    console.log(sql)
    connection.query(
        sql, 

        function(error, results, fields){
            if(!error){
                console.log('updated appointmen');
            }
            else{
                console.log("Error")
            }
        }
    );
}
   

    


 
   
 
    

function sendNotification(arr){
    console.log("sending message", arr)
    return;
    //##
//     const bindings = arr.map(number => {
//         return JSON.stringify({ binding_type: 'sms', address: number });
//       });
//       service.notifications
//   .create({
//         toBinding: bindings,
//         body: "hello, friend. You have an event coming up."
//   })
//   .then(notification => {
//         console.log("notification!!",notification);
//   })
//   .catch(err => {
//         console.error(err);
//   });
//##
    // Promise.all(
    //     arr.map(number => {
    //       return client.messages.create({
    //         from: process.env.TWILIO_MESSAGING_SERVICE_SID,
    //         to: number,
    //         body: "hello, friend. You have an event coming up."
    //       });
    //     })
    //   )
    //     .then(messages => {
    //       console.log('Messages sent!',messages);
    //     })
    //     .catch(err => console.error(err));
    //###
//    for(each in arr){
//         console.log("num",arr[each])
//         client.messages
//         .create({
//           from: process.env.TWILIO_PHONE_NUMBER,
//           to: arr[each],
//           body: "hiii! Please work! Testing take 2",
         
   
  
//    });
   //console.log("send for ", each)
   
   ////notification in the event_notification row to be 1
//}

}
var currentDate = new Date();
var day = currentDate.getDate()+1;
if(day<10)
{
    day="0"+day;
}
var month = currentDate.getMonth()+1;
if(month<10)
{
    month="0"+month;
}
var year = currentDate.getFullYear();
var total=year+'-'+month+'-'+day
console.log(total);
//Schedule tasks to be run on the server.
//run every day @ 8 am
var task = cron.schedule('* * * * *', ()=>{
    console.log("starting in getInfo...")
        var returnNum=[]
        var returnEvent=[]
        var sql = "SELECT DISTINCT(event_notifications.phoneNum), hunter_events.event_id FROM event_notifications, hunter_events WHERE DATE(date)= '"+total +"'";
        console.log(sql)
        connection.query(sql, function (err, results) 
        {
            
            if(results)
            {
            if(results.length){
                for(var i = 0; i < results.length;i++){
                    returnNum.push(results[i].phoneNum);
                    returnEvent.push(results[i].event_id);
                }
                var uniqueNums = Array.from(new Set(returnNum))
                sendNotification(uniqueNums);
                var uniqueItems = Array.from(new Set(returnEvent))
                console.log("here",uniqueItems);
                updateAppointment(uniqueItems);
            
            }
        }
        else{
            console.log("no dates")
        }
            
            
            console.log("end of query")
        });

}, 
{
scheduled: false,
    timezone: "America/New_York"
});
task.start();
/* End Twilio text scheduling */



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
});

app.listen(3000, () =>{
    console.log('running on port 3000');
 });