import express from 'express';
import { MongoClient } from 'mongodb';
import dotenv from "dotenv";
// const { response } = require('express');
// const { request } = require('express');

//import (MongoClient)
// const express = require('express');

const app = express();
const PORT = process.env.PORT;
//const PORT = 5000;
dotenv.config();

app.use(express.json());
console.log(process.env);

// const users = [
//     {
//         "createdAt": "2021-10-01T00:49:47.780Z",
//         "name": "Bennie Aufderhar",
//         "avatar": "https://cdn.fakercloud.com/avatars/d_kobelyatsky_128.jpg",
//         "ageGt": 59,
//         "color": "silver",
//         "id": "5"
//     },
//     {
//         "createdAt": "2021-09-30T14:22:51.638Z",
//         "name": "Lana Witting",
//         "avatar": "https://cdn.fakercloud.com/avatars/afusinatto_128.jpg",
//         "ageGt": 77,
//         "color": "olive",
//         "id": "6"
//     },
//     {
//         "createdAt": "2021-09-30T18:01:06.642Z",
//         "name": "Vickie Brekke",
//         "avatar": "https://cdn.fakercloud.com/avatars/carlyson_128.jpg",
//         "ageGt": 80,
//         "color": "tan",
//         "id": "7"
//     },
//     {
//         "createdAt": "2021-09-30T09:39:22.586Z",
//         "name": "Al Runolfsdottir",
//         "avatar": "https://cdn.fakercloud.com/avatars/areus_128.jpg",
//         "ageGt": 28,
//         "color": "orange",
//         "id": "8"
//     },
//     {
//         "createdAt": "2021-09-30T18:22:41.955Z",
//         "name": "Sam Orn",
//         "avatar": "https://cdn.fakercloud.com/avatars/itolmach_128.jpg",
//         "ageGt": 49,
//         "color": "indigo",
//         "id": "9"
//     },
//     {
//         "createdAt": "2021-09-30T18:30:05.224Z",
//         "name": "Grace Grimes",
//         "avatar": "https://cdn.fakercloud.com/avatars/smalonso_128.jpg",
//         "ageGt": 72,
//         "color": "yellow",
//         "id": "10"
//     },
//     {
//         "createdAt": "2021-09-30T11:26:57.667Z",
//         "name": "Cindy Reinger",
//         "avatar": "https://cdn.fakercloud.com/avatars/vimarethomas_128.jpg",
//         "ageGt": 30,
//         "color": "yellow",
//         "id": "11"
//     },
//     {
//         "createdAt": "2021-10-01T06:26:55.203Z",
//         "name": "Beth Koelpin",
//         "avatar": "https://cdn.fakercloud.com/avatars/anatolinicolae_128.jpg",
//         "ageGt": 0,
//         "color": "purple",
//         "id": "12"
//     },
//     {
//         "createdAt": "2021-09-30T12:28:17.426Z",
//         "name": "Doug Mayer",
//         "avatar": "https://cdn.fakercloud.com/avatars/nerrsoft_128.jpg",
//         "ageGt": 25,
//         "color": "cyan",
//         "id": "13"
//     },
//     {
//         "createdAt": "2021-10-01T01:09:41.654Z",
//         "name": "Mrs. Garrett Becker",
//         "avatar": "https://cdn.fakercloud.com/avatars/increase_128.jpg",
//         "ageGt": 20,
//         "color": "yellow",
//         "id": "14"
//     }
// ];

async function createConnection() {
  
    const MONGO_URL = process.env.MONGO_URL;
    const client = new MongoClient(MONGO_URL);
    await client.connect();
    console.log("Successfully connected to Cloud MongoDB");
    //    const insertData=await client.db("users").collection("people").insertMany("users"); 

    return client;

    // const user = await client
    // .db("users")
    // .collection("people")
    // .findOne({id:"5"});

    // console.log(user);
}
//call the connection function
createConnection();

app.get('/', (request, response) => {
    response.send("Hello, !!! All Local ENV !!!");
});

app.get('/users/:id', async (request, response) => {

    console.log(request.params);
    //const id = request.params.id;
    const { id } = request.params;

    const client = await createConnection();
    const user = await client
        .db("users")
        .collection("people")
        .findOne({ id: id });

    //console.log(user);
    console.log(user);
    response.send(user);
    // response.send(users.filter(
    //     (user) => user.id == id));
});

app.get("/users", async (request, response) => {
    //const { color, ageGt } = request.query;

    const client = await createConnection();
    const users = await client
        .db("users")
        .collection("people")
        .find({})
        .toArray();

    console.log(users);
    response.send(users);
});

app.post("/users", async (request, response) => {
    //const { color, ageGt } = request.query;

    const client = await createConnection();
    const addUsers = request.body;

    const result = await client
        .db("users")
        .collection("people")
        .insertMany(addUsers)

    console.log(addUsers, result);
    response.send(result);

    // const users = await client
    //     .db("users")
    //     .collection("people")
    //     .find({})
    //     .toArray();

    // console.log(users);
    // response.send(users);
});

app.delete('/users/:id', async (request, response) => {

    console.log(request.params);
    //const id = request.params.id;
    const { id } = request.params;

    const client = await createConnection();
    const user = await client
        .db("users")
        .collection("people")
        .deleteOne({ id: id });

    //console.log(user);
    console.log(user);
    response.send(user);
    // response.send(users.filter(
    //     (user) => user.id == id));
});

app.patch('/users/:id', async (request, response) => {

    console.log(request.params);
    //const id = request.params.id;
    const { id } = request.params;

    const client = await createConnection();
    const newData = request.body;
    console.log(id, request.body);

    const user = await client
        .db("users")
        .collection("people")
        .updateOne({ id: id }, { $set: newData });

    console.log(user);
    response.send(user);

    // response.send(users.filter(
    //     (user) => user.id == id));
});

app.listen(PORT, () =>
    console.log("The server is started in ", PORT));

    //console.log(request.query, color, ageGt);
    // if (!color && !ageGt) {
    //     response.send(users);
    // } else if (color && !ageGt) {
    //     response.send(users.filter((user) => user.color === color));
    // } else if (!color && ageGt) {
    //     response.send(users.filter((user) => user.age >= ageGt));
    // } else {
    //     response.send(
    //         users.filter((user) => user.color === color && user.age >= ageGt));
    // }

    // // response.send(users.filter(
    // //     (user) => user.color === color
    // ));
