const express = require('express')
const app = express()
const bodyParser = require('body-parser');


const {
    postMessage,
    getAllMessages
} = require('./UserHandler')

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.use(bodyParser.json());
app.use(express.json());

//*********************************************************
// Endpoints for NewsFeed Posts
//*********************************************************

// post a message to the NewsFeed
app.post("/post-message", postMessage )

// get all the messages from the database
app.get("/get-all-messages", getAllMessages)

// app.post('/my-route', (req, res) => {
//     const myData = req.body;
//     console.log(myData);
//     res.send('Data received');
    
// });


app.listen('4000', () =>{
    console.log('app listening on port 4000')
})