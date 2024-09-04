require('dotenv').config()
const { MongoClient } = require('mongodb');

// const uri = 'mongodb+srv://pre_home:pre1234home@cluster0.qsxrc.mongodb.net/';
const uri = process.env.MONGODB_URL

const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

async function run() {
    try {
        await client.connect();
        const databasesList = await client.db().admin().listDatabases();
        databasesList.databases.forEach(db => console.log(` - ${db.name}`));
    } catch (error) {
        console.error("An error occurred while connecting to MongoDB:", error);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);
