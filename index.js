const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

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
        });

        // POST or ADD new user 1.1
        app.post('/user', async (req, res) => {
            const newUser = req.body;
            console.log('Adding new user', newUser);
            const result = await userCollection.insertOne(newUser);
            res.send(result)
        });

        // Delete a User 3.1
        app.delete('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.deleteOne(query);
            res.send(result);
        });

        // Find a User from Database by using ID 4.1
        app.get('/user/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await userCollection.findOne(query);
            res.send(result);
        });

        // Update User 4.2
        app.put('/user/:id', async (req, res) => {
            const id = req.params.id;
            const updatedUser = req.body;
            const filter = { _id: ObjectId(id) };
            const options = { upsert: true };
            const updateDoc = {
                $set: {
                    name: updatedUser.name,
                    email: updatedUser.email
                }
            };
            const result = await userCollection.updateOne(filter, updateDoc, options);
            res.send(result);
        })


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