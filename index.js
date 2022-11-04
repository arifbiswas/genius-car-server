const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 5000;
require('dotenv').config();

const app = express();

// middle wares
app.use(cors());
app.use(express.json())

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.7xyixxj.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


async function run(){
    try {
         const servicesCollection = client.db('geniusCar').collection('services');
         app.get('/services', async (req,res)=>{
            const query = {};
            const cursor =  servicesCollection.find(query);
            const services = await cursor.toArray();
            res.send(services);
         })
    } finally{
        
    }
}

run().catch(erro => console.error(erro.name ,erro.message))


app.get('/',(req,res,)=>{
    res.send('Yap This server is running')
})

app.listen(port , () =>{
    console.log('This server running Port ',port);
})
 
