const express = require('express')
const app = express()
const bodyParser = require('body-parser');
const cors = require('cors');

const {
    postUserProfile,
    getUserProfileInfo
} = require('./Handlers/UserProfileHandler')

const {
    postMessage,
    getAllMessages,
    getSpecificPost,
    getStatusLiked,
    getLike,
    getRemoveLike,
    postComment,
    getAllCommentsInPost
} = require('./Handlers/NewsFeedHandler')

const {
    getAllUsersEmail,
    postUserInfo, 
    getInfoSpecificUser
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

//  get a specific post in database
app.get("/get-specific-post/:postId", getSpecificPost)

//  get status if user liked post 
app.get("/get-status/:userLiked/:postId", getStatusLiked)

//  like a post 
app.get("/like-post/:userLiked/:postId", getLike)

//  remove liked post
app.get("/remove-like/:userRemoveLike/:postId", getRemoveLike)

// post a comment 
app.post("/comment-post/:userCommented/:postId", postComment)

//  get all comments in a post
app.get("/get-all-comments-in-post/:postId", getAllCommentsInPost)

//*********************************************************
// Endpoints for user info 
//*********************************************************

//  get access to all users emails
app.get("/get-all-users-email", getAllUsersEmail)

//  get access to a specific user 
app.get("/get-access-user/:user", getInfoSpecificUser)

//  update nickname for user 


//  post new user inside database
app.post("/post-user-database", postUserInfo)

//*********************************************************
// Endpoints for user Profile
//*********************************************************


// create a user profile for the first time
app.post("/post-profile-to-database" , postUserProfile)

//  get user profile info
app.get("/get-user-profile-info/:userEmail", getUserProfileInfo)


// app.post('/my-route', (req, res) => {
//     const myData = req.body;
//     console.log(myData);
//     res.send('Data received');
    
// });


app.listen('4000', () =>{
    console.log('app listening on port 4000')
})