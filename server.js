const express = require('express');
const bodyParser = require('body-parser');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const PORT = process.env.PORT || 3002;

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// SQLite database setup in memory
const db = new sqlite3.Database(':memory:');
db.serialize(() => {
    //Create messages table if it doesn't exist
    db.run('CREATE TABLE IF NOT EXISTS messages (id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT, email TEXT, message TEXT)');
});

// Route to handle form submission
app.post('/submit-form', (req, res) => {
    const { name, email, number, message } = req.body;

    //Insert form data into the messages table
    db.run('INSERT INTO messages (name, email, message) VALUES (?, ?, ?)', [name, email, message], function(err) {
        if (err) {
            console.error(err.message);
            res.status(500).send('Error saving the message');
        } else {
            res.status(200).send('Message sent successfully');
        }
    });
});

// Route to retrieve all messages
app.get('/messages', (req, res) => {
    db.all('SELECT * FROM messages', [], (err, rows) => {
        //Select all rows from the messages table
        if (err) {
            res.status(500).send('Error retrieving messages');
        } else {
            res.json(rows);
        }
    });
});


// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
