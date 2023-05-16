const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    postMessage,
    getAllMessages
} = require('./Handlers/NewsFeedHandler')

const {
    getAllUsersEmail,
    postUserInfo
} = require('./Handlers/UsersHandler')
app.use(cors())
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     next();
// });
app.use(bodyParser.json());
app.use(express.json());
//higher limit to allow uploading of greater sized data
// app.use(express.json({ limit: '500mb' }));
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
// app.use(express.urlencoded({ limit: '500mb', extended: true }));


//*********************************************************
// Endpoints for NewsFeed Posts
//*********************************************************

// post a message to the NewsFeed
app.post("/post-message", postMessage )

// get all the messages from the database
app.get("/get-all-messages", getAllMessages)

//*********************************************************
// Endpoints for user info 
//*********************************************************

//  get access to all users emails
app.get("/get-all-users-email", getAllUsersEmail)

//  get access to a specific user 


//  update nickname for user 


//  post new user inside database
app.post("/post-user-database", postUserInfo)

//  


// app.post('/my-route', (req, res) => {
//     const myData = req.body;
//     console.log(myData);
//     res.send('Data received');
    
// });


app.listen('4000', () =>{
    console.log('app listening on port 4000')
})