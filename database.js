const MongoClient = require("mongodb").MongoClient;
const url = "mongodb://127.0.0.1:27017/raven_messenger";
const client = new MongoClient(url);

const fs = require("fs");

fs.readFile('./data/messages_data.json', 'utf-8', (error, data)=>{

    //console.log(data);

    async function run() {
        try{
            const database = client.db("raven_messenger");
            const messages = database.collection("messages");

            //const res = await customers.insertMany(messages);
            console.log(`${res.insertedCount} added`);
        }finally{
            await client.close()
        }
      }
      run().catch(console.dir);
});



