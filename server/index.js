const express = require('express');
const mysql = require("mysql2");
const cors = require('cors');

const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "add-password",
    database: "loginsystem",
});


const app = express();

app.use(
    cors({
        origin: ["http://localhost:5050"],
        methods: ["GET", "POST"],
        credentials: true,
    })
);

app.post('/register', (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    db.execute(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            console.log(err);
        }
    

    );
})

app.post('/login', (req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    db.execute(
        "SELECT * FROM users WHERE username = ? AND password = ?",
        [username, password],
        (err, result) => {
            if (err) {
                res.send({err: err});
            }
            if (result.length > 0) {
                res.send(result);
            } else {
                ({message: "Wrong username/password combination:"});
            }
        }
    );
});

app.use(express.json());

app.listen(5050, () => {
    console.log("running server");
})