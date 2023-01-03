const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion } = require('mongodb');

// Use Middleware
app.use(cors());
app.use(express.json());


// User: practice1
// Pass: Wib6gZLejYCaDEKC



const uri = "mongodb+srv://practice1:Wib6gZLejYCaDEKC@cluster0.l8b5enj.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// client.connect(err => {
//     const collection = client.db("test").collection("devices");
//     console.log('db connected');
//     // perform actions on the collection object
//     client.close();
// });

async function run() {
    try {
        await client.connect();
        const userCollection = client.db("foodExpress").collection("user");

        // Get or Show user in Client site 2.1
        app.get('/user', async (req, res) => {
            const query = {};
            const cursor = userCollection.find(query);
            const users = await cursor.toArray();
            res.send(users);
        })

        // POST or ADD new user 1.1
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('Adding new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });

    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);


// Middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server running');
});

app.listen(port, () => {
    console.log('Port', port);
});