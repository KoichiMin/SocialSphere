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


const getAllUsersEmail = async (req, res) =>{
    try {
        let usersEmailArray = [];
        const db = await connectToDatabase();
        const database = db.db("Users");
        const UsersInfoInDatabase = await database.collection("UsersInfo").find().toArray();

        // console.log(UsersInfoInDatabase[0])
        for(let i = 0; i < UsersInfoInDatabase.length; i++){
            usersEmailArray.push(UsersInfoInDatabase[i].UserInfo.email)
        }
        res.status(200).json({ status: "success", data: usersEmailArray });
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
}
};

const postUserInfo = async (req, res) =>{
    const UserInfo = req.body
    try {
        const uniqueId = uuidv4();
        const db = await connectToDatabase();
        const database = db.db("Users");
        await database.collection("UsersInfo").insertOne({
            _id: uniqueId,
            UserInfo
        });
        res.status(200).json({ status: "success", message: "New user has been added to the database" });
    } catch (err) {
        res.status(404).json({ status: 404, message: err.message });
    }

}


module.exports = {
    getAllUsersEmail,
    postUserInfo
};