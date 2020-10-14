const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); //to bypass cors policy
const app = express();
const mysql = require('mysql');
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

    const sqlInsert = "INSERT INTO user (phoneNum, password) VALUES (?,?)";
    db.query(sqlInsert, [userName, userPassword], (err, result)=>{
        console.log(result);
    });
});
// app.get('/', (req,res)=>{
//     const sqlStatement = "INSERT INTO user (phoneNum, password) VALUES ('789456123', 'passwordTest')";
//     db.query(sqlStatement , (err ,result) => {
//         res.send("inserting");
//     });
// });

// Schedule tasks to be run on the server.
// cron.schedule('* * * * *', function() {
//     console.log('running a task every minute');
//   });
  
app.listen(3001, () =>{
    console.log('running on port 3001');
});