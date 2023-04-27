const { MongoClient } = require("mongodb");
require("dotenv").config();
const { cloudinary } = require('./cloudinaryConfig/cloudinaryConfig')
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
    // let codedImage = ''
    // console.log(req.body)
    const message = req.body.data;
    // if(req.body.image){
    //     codedImage = await cloudinary.uploader.upload(req.body.image, {
    //         upload_preset: 'SocialSphere'
    //         })
    // }
    // console.log(data);
    try {
        const uniqueId = uuidv4();
        const db = await connectToDatabase();
        const database = db.db("NewsFeed");
        await database.collection("SpherePost").insertOne({
            _id: uniqueId,
            image: req.body.image || 'no image available',
            data: message
            
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

module.exports = {
    postMessage,
    getAllMessages,
};
