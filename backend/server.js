const express = require('express');
const bodyparser = require('body-parser');
const { Notes } = require('./models');
const { dbConnection } = require('./dbConnection');

const PORT = 3000 || process.env.PORT;

const app = express();
app.use(bodyparser.json());

dbConnection();

/**
 * Server to listen on specified PORT
 */
app.listen(PORT, (error) => {
    if(error) console.error(`Error starting the Express server on port: ${PORT}`);
    console.log(`Express Server is running on port: ${PORT}`);
}); 

/**
 * ADD CORS
 */
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PATCH, DELETE");
    next();
});

/**
 * Routes
 */

// get all the documents in a collection
app.get('/notes', (req, res) => {
    Notes.find({}).then((noteDocument) => {
        res.send(noteDocument);
    });
});

// get one document in the collection using an id
app.get('/notes/:id', async (req, res) => {
    const getSingleDocument = await Notes.findById({ _id: req.params.id }).exec();
    res.json(getSingleDocument).send();
});

// post a document to the collection
app.post('/notes', (req, res) => {
    let title = req.body.title;
    let text = req.body.text;
    let insertNewNote = new Notes({ title, text});
    insertNewNote.save().then((newNoteDocument) => {
        res.send(newNoteDocument);
    });
});

// update a document in the collection using an id
app.patch('/notes/:id', (req, res) => {
    let options = { useFindAndModify: false, new: true };
    Notes.findOneAndUpdate({ _id: req.params.id }, { $set: req.body }, options).then(() => {
        res.json(req.body).send();
    });
});

// deleta all documents in the collection
app.delete('/notes', async (req, res) => {
    const deleteAllDocuments = await Notes.deleteMany({});
    res.json(deleteAllDocuments).send();
});

// delete single document from collection using an id
app.delete('/notes/:id', async (req, res) => {
    const deleteOneDocument = await Notes.deleteOne({ _id: req.params.id });
    res.send(deleteOneDocument).send();
});