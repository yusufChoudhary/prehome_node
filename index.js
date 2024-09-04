// const { MongoClient } = require('mongodb');
// require('dotenv').config()  

// const uri = 'mongodb+srv://pre_home:pre1234home@cluster0.qsxrc.mongodb.net/';

// const client = new MongoClient(uri);

// async function run() {
//     try {
//         await client.connect();
//         const databasesList = await client.db().admin().listDatabases();
//         databasesList.databases.forEach(db => console.log(` - ${db.name}`));
//     } catch (error) {
//         console.error("An error occurred while connecting to MongoDB:", error);
//     } finally {
//         await client.close();
//     }
// }

// run().catch(console.dir);
