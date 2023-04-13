const { MongoClient} = require("mongodb");
require("dotenv").config();
const { MONGO_URI} = process.env
const client = new MongoClient(MONGO_URI)

const postMessage = async (req, res) =>{
    const  data = req.body;
    console.log(data)
    try{
        await client.connect()
        const database = client.db('NewsFeed')
        await database.collection("SpherePost").insertOne(data)
        res.status(200).json({status:"success", message:"post has been added to NewsFeed"})
        client.close();
    }
    catch(err){
        res.status(404).json({ status: 404, message: err.message })
        client.close()
    }
    
}

module.exports = {
    postMessage,
}