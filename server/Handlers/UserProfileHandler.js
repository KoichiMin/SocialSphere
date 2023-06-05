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

const postUserProfile = async (req, res) =>{
    const UserInfo = req.body
    try {
        const uniqueId = uuidv4();
        const db = await connectToDatabase();
        const database = db.db("Users");
        await database.collection("UsersProfile").insertOne({
            _id: uniqueId,
            email: UserInfo.email,
            nickname: UserInfo.nickname,
            name: UserInfo.name,
            shared: [],
            ProfilePicture: UserInfo.ProfilePicture
        });
        res.status(200).json({ status: "success", message: "New user has been added to the database" });
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
    }

}


const getUserProfileInfo = async (req, res) =>{
    const { userEmail} = req.params;
    // console.log(user)
    try {
    const db = await connectToDatabase();
    const database = db.db("Users");
    const UserInfoInDatabase = await database.collection("UsersProfile").find({email: userEmail}).toArray();
    // console.log(UserInfoInDatabase)
    res.status(200).json({status: 200, userData: UserInfoInDatabase})
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
    }
}


const patchProfilePicture = async (req, res) =>{
    const { userEmail} = req.params;
    const {image} = req.body
    // console.log(userEmail)
    try {
    const db = await connectToDatabase();
    const database = db.db("Users");
    const UserInfoInDatabase = await database.collection("UsersProfile").find({email: userEmail}).toArray();
    // console.log(UserInfoInDatabase)
    const result = await database.collection("UsersProfile").updateOne({email: userEmail}, {$set:{ProfilePicture: image}})

    res.status(200).json({status: 200, userData: UserInfoInDatabase})
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
    }
}

const patchUsername = async (req, res) =>{
    const { email, oldNickname} = req.params;
    const {newNickname} = req.body
    // console.log(userEmail)
    try {
    const db = await connectToDatabase();
    const database = db.db("Users");
    const collection = db.db("NewsFeed").collection("SpherePost");
    const AllSpherePostInDatabase = await collection.find().toArray();
    // console.log(AllSpherePostInDatabase)
    for( let spherePost of AllSpherePostInDatabase){
        //  if SpherePost was created by the user changing the nickname
        if(spherePost.nickname === oldNickname){
            console.log("it went inside spherePost nickname", spherePost.nickname)
            // spherePost.nickname = newNickname
            await collection.updateOne({email:spherePost.email}, {$set: {nickname: newNickname}})
            console.log(spherePost.nickname)
        }
        //  if user that wants to change their nickname liked the SpherePost
        if(spherePost.numLikes > 0){
            for( let i = 0; i < spherePost.UsersLikedBy.length; i++){
                console.log("it went inside UsersLikedBy")
                // user can only Like a post once therefore you can update inside the if statement
                if(spherePost.UsersLikedBy[i]  === oldNickname){
                    spherePost.UsersLikedBy[i] = newNickname;
                    await collection.updateOne({email:spherePost.email}, {$set: {UsersLikedBy: spherePost.UsersLikedBy}})
                }
            }
        }

        // if user commented on a SpherePost
        if(spherePost.Comments.length > 0){
            // user can potentially comment multiple times inside a comment section so update after the for loop is finished iterating
            for(let i = 0; i < spherePost.Comments.length; i++){
                console.log("it went inside spherePost Comments")
                if(spherePost.Comments[i][0] === oldNickname){
                    spherePost.Comments[i][0] = newNickname;
                }
            }
            await collection.updateOne({email:spherePost.email}, {$set: {Comments: spherePost.Comments}})
        }
    }

    console.log(UserSpherePostInDatabase)
    await database.collection("UsersProfile").updateOne({email: email}, {$set:{nickname: newNickname}})
    await database.collection("UsersProfile").updateOne({email: email}, {$set:{nickname: newNickname}})
    
    res.status(200).json({status: 200, message:"update is complete"})
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
    }
}


module.exports = {
    postUserProfile,
    getUserProfileInfo,
    patchProfilePicture,
    patchUsername
}