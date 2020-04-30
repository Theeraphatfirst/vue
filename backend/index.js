const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const expressUpload = require('express-fileupload');
const path = require('path');

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "db_book"
});

db.connect(err => {
    if (err) throw err;
    console.log("Connects Database is success");
})

const app = express();

app.use(cors());
app.use(expressUpload());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route("/api/books")
    .get((req, res) => {
        let sql = "SELECT * FROM tb_books ORDER BY b_id DESC";
        
        db.query(sql, (error, results) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            return res.json(results)
        })
    })
    .post(async (req, res, next) => {
        
        let data = req.body;

        let sql = ' INSERT INTO tb_books SET ? '
        if(req.files !== null){
            
            const upload = req.files.b_img;
            
            await upload.mv("./upload/" + upload.name, err => {
                if (err) throw err;
                
                db.query(sql, {...data, b_img: '/'+upload.name}, (error, results) => {
                    if (error) return res.status(500).json({
                        "status": 500,
                        "message": "Internal Server Error" // error.sqlMessage
                    });
                    next();
                });
            });
        }else{
            await db.query(sql, {...data, b_img: "/ddd.jpg"}, (error, results) => {
                if (error) return res.status(500).json({
                    "status": 500,
                    "message": "Internal Server Error" // error.sqlMessage
                });
                next();
            });
        }
        // res.json({result: "Hello"})
    }, getDataAll)

app.route("/api/book/:id")
    .get((req, res, next) => {
        let sql = ' SELECT * FROM tb_books WHERE b_id = ? '
        db.query(sql, [req.params.id], (error, results) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Erroasdasdasdr" // error.sqlMessage
            })
            res.json(results);
        });
    })
    .put((req, res, next) => {
        
        let data = {
            b_name : req.body.b_name,
            b_cat: req.body.b_cat,
            b_detail: req.body.b_detail,
            b_by: req.body.b_by,
            b_img: req.body.b_img
           
        }
        
        let sql = ' UPDATE tb_books SET ? WHERE b_id = ? '
        db.query(sql, [data, req.params.id], (error) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            });
            next();
        });
    }, getDataAll)

    .delete((req, res, next) => {        
        let sql = ' DELETE FROM tb_books WHERE b_id = ? '
        db.query(sql, [req.params.id], error => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            })
            next();
        })
    }, getDataAll);


app.route("/api/comment/:id")
    .get(getComment)
    .post((req, res) => {
        let sql = ' INSERT INTO tb_comment SET ? ';
        db.query(sql, req.body, (error, results) => {
            if (error) return res.status(500).json({
                "status": 500,
                "message": "Internal Server Error" // error.sqlMessage
            });
            res.json(results);
        });
    })

function getDataAll(req, res){
    db.query("SELECT * FROM tb_books", (error, result) => {
        if (error) return res.status(500).json({
            "status": 500,
            "message": "Internal Server Error" // error.sqlMessage
        })
        return res.json(result);
    })
}

function getComment(req, res){
    db.query("SELECT * FROM tb_comment WHERE c_book = ? ORDER BY b_id DESC", [req.params.id], (error, result) => {
        if (error) return res.status(500).json({
            "status": 500,
            "message": "Internal Server Error" // error.sqlMessage
        })
        return res.json(result);
    })
}

app.use("/img", express.static(path.join(__dirname, "./upload")));


app.listen(3000, console.log("Server is running... port: 3000"));