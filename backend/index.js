const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //to bypass cors policy
const app = express();
const mysql = require('mysql');
require('dotenv').config()

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


  

/* Twilio text scheduling */
function updateAppointment(id){
    //update appointment to notified=1
    connection.query(
        "UPDATE hunter_events SET notified = 1 WHERE id = ?", 
        [id], 
        function(error, results, fields){
            if(!error){
                console.log('updated appointment with ID of ' + id);
            }
        }
    );
}
   
    
    function getInfo(){
        console.log("starting in getInfo...")
        var returns=[]
        var sql = "SELECT DISTINCT(event_notifications.phoneNum) FROM event_notifications, hunter_events WHERE event_notifications.notified = 0 AND HOUR(TIMEDIFF(NOW(), date))<24";
        connection.query(sql, function (err, results) 
        {
            
            if(results.length){
                for(var i = 0; i < results.length;i++){
                    returns.push(results[i].phoneNum);
                }
            }
            sendNotification(returns);
            //console.log(results[i])
            return callback(returns);
            //return returns
            
            
        
      });
      
    };
    
    function test(result){
        var stuff_i_want =[];
        stuff_i_want=result;
        console.log("working??/",stuff_i_want)
        sendNotification(stuff_i_want)
    }

    getInfo(test);

    // getInfo(function(result){
    //     stuff_i_want=result;
    //     console.log("working??/",stuff_i_want)
    //     sendNotification(stuff_i_want)
    // });
   
 
    

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

//Schedule tasks to be run on the server.
cron.schedule('* * * * *', getInfo());
// getInfo();


/* End Twilio text scheduling */


app.listen(3001, () =>{
    console.log('running on port 3001');
});