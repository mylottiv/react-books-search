require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();
const apiRoutes = require('./router');
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'client', 'build')));
const mongoose = require('mongoose');
mongoose.connect((process.env.MONGODB_URI || 'mongodb://localhost/googlebooks'), {useNewUrlParser: true, useUnifiedTopology: true});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('successfully connected!');
    app.use('/api', apiRoutes);
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'));
    });

    app.listen(PORT, () => console.log('Server listening on ' + PORT));
});
