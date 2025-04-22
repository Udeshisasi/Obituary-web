const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express()
app.use(bodyParser.json());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "amarar"
})

app.use(express.json());
app.use(cors());

//for display data on view tribute page
app.get("/viewtribute", (req, res) => {
    const sql = "SELECT * FROM amarar.tribute";
    db.query(sql, (err, result) => {
        if (err) {
            console.error(err);
            return res.json({ Message: 'Internal Server Error' });
        }
        return res.json(result);
    });
});


app.post("/tribute", (req, res) => {

    const sql = "INSERT INTO tribute (name, relationship, country, addTribute, Time) VALUES (?, ?, ?, ?, NOW())";
    const values = [
        req.body.name,
        req.body.relationship,
        req.body.country,
        req.body.addTribute
    ]

    db.query(sql, values, (err, data) => {
        if (err) {
            console.error("Database error:", err);
            return res.status(500).json(err);
        }
        console.log("Insert successful");
        return res.status(200).json({ message: 'Insert successful' });
    });
})

//Read data
app.get("/read/:id", (req, res) => {
    const sql = "SELECT * FROM tribute WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ Message: 'Internal Server Error' });
        }
        return res.json(result);
    });
});


//Update data
app.put('./Update/:id', (req, res) => {
    const sql = "UPDATE tribute SET `Name`=?, `Relationship`=?, `Country`=?, `AddTribute`=? 'NewTime'= NOW() WHERE ID =?";
    const id = req.params.id;
    db.query(sql, [req.body.name, req.body.relationship, req.body.country, req.body.addTribute, id], (err, result) => {
        if (err) {
            return res.json({ Message: 'Internal Server Error' });
        }
        return res.json(result);
    });
})

// Delete data
app.delete("/delete/:id", (req, res) => {
    const sql = "DELETE FROM tribute WHERE ID = ?";
    const id = req.params.id;
    db.query(sql, [id], (err, result) => {
        if (err) {
            return res.json({ Message: 'Internal Server Error' });
        }
        return res.json(result);
    });
});

app.listen(8081, () => {
    console.log("connected to backend!");
})