// const mongo = require('mongodb')
// const MongoClient = mongo.MongoClient
// const ObjectID = mongo.ObjectID

const { MongoClient, ObjectID} = require('mongodb')

const connectionURL = 'mongodb://127.0.0.1:27017'
const databaseName = 'task-manager'

const id = new ObjectID()
console.log(id);
console.log(id.getTimestamp());

MongoClient.connect(connectionURL, { useUnifiedTopology: true }, (error, client) => {
    if(error){
        return console.log('Unable to connect to database!');
    }

    const db = client.db(databaseName)
    // db.collection('users').insertOne({
    //     name: 'Indrajit',
    //     age: 25
    // }, (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert user!');
    //     }

    //     console.log(result.ops);
    // })

    // db.collection('users').insertMany([
    //     {
    //         name: 'Sharma',
    //         age: 27
    //     },
    //     {
    //         name: 'John',
    //         age: 23
    //     }
    // ], (error, result) => {
    //     if(error){
    //         return console.log('Unable to insert!');
    //     }
    //     console.log(result.ops);
    // })


})  