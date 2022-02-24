const express = require('express');
const mysql = require("mysql2");

const db = mysql.createConnection({
    user:"root",
    host: "localhost",
    password: "add-password",
    database: "loginsystem",
});


const app = express();

app.post('/register', (req, res) => {
    db.execute(
        "INSERT INTO users (username, password) VALUES (?,?)",
        [username, password],
        (err, result) => {
            console.log(err);
        }
    

    );
})

app.use(express.json());

app.listen(5050, () => {
    console.log("running server");
})