const { MongoClient } = require("mongodb");
require("dotenv").config();
const { cloudinary } = require('../cloudinaryConfig/cloudinaryConfig')
const { MONGO_URI } = process.env;
const {v4: uuidv4 } = require('uuid');
let client;

const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client;
};

const postMessage = async (req, res) => {

    try {

        const uniqueId = uuidv4();
        const db = await connectToDatabase();
        const database = db.db("NewsFeed");
        await database.collection("SpherePost").insertOne({
            _id: uniqueId,
            image: req.body.image || 'no image available',
            data: req.body.data,
            nickname: req.body.user,
            email: req.body.email,
            numLikes : 0,
            UserLikedBy: [],
            EmailLikedBy: [],
            Comments:[]
            
        });
        res.status(200).json({ status: "success", message: "post has been added to NewsFeed" });
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
    }
};

const getAllMessages = async (req, res) => {
    try {
        const db = await connectToDatabase();
        const database = db.db("NewsFeed");
        const messages = await database.collection("SpherePost").find().toArray();
        res.status(200).json({ status: "success", data: messages });
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
}
};

const getSpecificPost = async (req, res) =>{
    const {postId} = req.params
    try{
        const db = await connectToDatabase();
        const database = db.db("NewsFeed");
        // get access to the post through the postId
        const PostedMessageInfoInDatabase = await database.collection("SpherePost").find({_id: postId}).toArray();
        res.status(200).json({ status: "success", data: PostedMessageInfoInDatabase });
    }
    catch(err){
        res.status(404).json({ status: 404, message: err.message });
    }
}


const getStatusLiked = async (req, res) =>{
    const {userLiked, postId} = req.params
    try{
        const db = await connectToDatabase();
        const database = db.db("NewsFeed");
        // get access to the post through the postId
        const PostedMessageInfoInDatabase = await database.collection("SpherePost").find({_id: postId}).toArray();
        // console.log(PostedMessageInfoInDatabase);
        // console.log(PostedMessageInfoInDatabase[0].EmailLikedBy.indexOf(userLiked))
        if(PostedMessageInfoInDatabase[0].EmailLikedBy.indexOf(userLiked) >= 0){
            res.status(200).json({status:"success", message: "user liked picture", Liked: true})
        } else{
            res.status(200).json({status:"success", message: "user didn't like the picture", Liked: false})
        }


    } catch(err) {
        res.status(404).json({ status: 404, message: err.message });
    }
}


// get the user and postId, then you can update the post message object
const getLike = async (req, res) =>{
    const { userLiked, postId} = req.params
    
    try{
        const db = await connectToDatabase();
        const database = db.db("NewsFeed");
        // get access to the post through the postId
        const PostedMessageInfoInDatabase = await database.collection("SpherePost").find({_id: postId}).toArray();
        //  get access to the user 
        const UserInfoInDatabase = await db.db("Users").collection("UsersInfo").find({email: userLiked}).toArray();
        let changeEmailLikedBy = PostedMessageInfoInDatabase[0].EmailLikedBy 
        let changeUserLikedBy = PostedMessageInfoInDatabase[0].UserLikedBy 
        userId = UserInfoInDatabase[0].nickname
        userEmail = UserInfoInDatabase[0].email
        changeUserLikedBy.push(userId)
        changeEmailLikedBy.push(userEmail)
        //  update the values for numLikes, UserLikedBy and EmailLikedBy
        await database.collection("SpherePost").updateOne({_id: postId}, {$set:{numLikes:PostedMessageInfoInDatabase[0].numLikes += 1, UserLikedBy: changeUserLikedBy, EmailLikedBy: changeEmailLikedBy}})
        res.status(400).json({status: 200, message: "liked worked", userId: userId})

    } catch(err) {
        res.status(404).json({ status: 404, message: err.message });
    }
}
// get the user and postId, then you can update the post message object
const getRemoveLike = async (req, res) =>{
    const { userRemoveLike, postId} = req.params
    
    try{
        const db = await connectToDatabase();
        const database = db.db("NewsFeed");
        // get access to the post through the postId
        const PostedMessageInfoInDatabase = await database.collection("SpherePost").find({_id: postId}).toArray();
        //  get access to the user 
        const UserInfoInDatabase = await db.db("Users").collection("UsersInfo").find({email: userRemoveLike}).toArray();
        let changeEmailLikedBy = PostedMessageInfoInDatabase[0].EmailLikedBy 
        let changeUserLikedBy = PostedMessageInfoInDatabase[0].UserLikedBy

        userId = UserInfoInDatabase[0].nickname
        userEmail = UserInfoInDatabase[0].email

        changeUserLikedBy.splice(userId, 1)
        changeEmailLikedBy.splice(userEmail, 1)
        //  update the values for numLikes, UserLikedBy and EmailLikedBy
        await database.collection("SpherePost").updateOne({_id: postId}, {$set:{numLikes:PostedMessageInfoInDatabase[0].numLikes -= 1, UserLikedBy: changeUserLikedBy, EmailLikedBy: changeEmailLikedBy}})
        res.status(400).json({status: 200, message: "liked removed", userId: userId})

    } catch(err) {
        res.status(404).json({ status: 404, message: err.message });
    }
}

// get the user and postId, then add comment by the user to the Comments array inside the SpherePost NewsFeed post  
const postComment = async (req, res) =>{
    const { userCommented, postId} = req.params
    const {message} = req.body
    // console.log(userCommented, message)
    try{
        const db = await connectToDatabase();
        const database = db.db("NewsFeed");
        // get access to the post through the postId
        const PostedMessageInfoInDatabase = await database.collection("SpherePost").find({_id: postId}).toArray();
        //  get access to the user 
        const UserInfoInDatabase = await db.db("Users").collection("UsersInfo").find({email: userCommented}).toArray();
        
        let changeCommentsArray = PostedMessageInfoInDatabase[0].Comments 
        userId = UserInfoInDatabase[0].nickname
        changeCommentsArray.push([userId, message])
        //  update the value for Comments
        await database.collection("SpherePost").updateOne({_id: postId}, {$set:{Comments: changeCommentsArray}})
        res.status(400).json({status: 200, message: "comment has been posted", userId: userId})

    } catch(err) {
        res.status(404).json({ status: 404, message: err.message });
    }
}

const getAllCommentsInPost = async (req, res) =>{
    const {postId} = req.params
    try {
        const db = await connectToDatabase();
        const database = db.db("NewsFeed");
        const messages = await database.collection("SpherePost").find({_id: postId}).toArray();
        res.status(200).json({ status: "success", data: messages });
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
}
}

module.exports = {
    postMessage,
    getAllMessages,
    getSpecificPost,
    getStatusLiked,
    getLike,
    getRemoveLike,
    postComment,
    getAllCommentsInPost
};
