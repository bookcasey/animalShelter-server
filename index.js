const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const {PORT, CLIENT_ORIGIN} = require('./config');
const {dbConnect} = require('./db-mongoose');
// const {dbConnect} = require('./db-knex');

const Queue = require('./queue');

let cats = new Queue();
let dogs = new Queue();


for (let i = 0; i < 4; i++) {
  cats.enqueue({
     imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
     name: "Fluffy " + i,
     gender: 'Female',
     age: "2 yrs",
     breed: "Bengal",
     story: "Thrown on the street"
  });
}

for (let i = 0; i < 4; i++) {
  dogs.enqueue({
     imageURL:'https://assets3.thrillist.com/v1/image/2622128/size/tmg-slideshow_l.jpg',
     name: "Spot " + i,
     gender: 'Male',
     age: "3 yrs",
     breed: "Golden retriever",
     story: "Thrown on the sidewalk"
  });
}

const app = express();

app.use(
    morgan(process.env.NODE_ENV === 'production' ? 'common' : 'dev', {
        skip: (req, res) => process.env.NODE_ENV === 'test'
    })
);

app.use(
    cors({
        origin: CLIENT_ORIGIN
    })
);

app.get('/cat', (req, res) => {
  res.json(cats.dequeue());
})

app.get('/dog', (req, res) => {
  res.json(dogs.dequeue());
})

function runServer(port = PORT) {
    const server = app
        .listen(port, () => {
            console.info(`App listening on port ${server.address().port}`);
        })
        .on('error', err => {
            console.error('Express failed to start');
            console.error(err);
        });
}

if (require.main === module) {
    // dbConnect();
    runServer();
}

module.exports = {app};
