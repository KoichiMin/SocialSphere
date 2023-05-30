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
    res.status(400).json({status: 200, userData: UserInfoInDatabase})
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
    }
}



module.exports = {
    postUserProfile,
    getUserProfileInfo
}