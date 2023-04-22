const { MongoClient } = require("mongodb");
require("dotenv").config();

const { MONGO_URI } = process.env;

let client;

const connectToDatabase = async () => {
    if (!client) {
        client = new MongoClient(MONGO_URI);
        await client.connect();
    }
    return client;
};

const postMessage = async (req, res) => {
    const data = req.body;
    // console.log(data);
    try {
        const db = await connectToDatabase();
        const database = db.db("NewsFeed");
        await database.collection("SpherePost").insertOne(data);
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
