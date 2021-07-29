var express = require("express")
var app = express()
var db = require("./database.js")
var md5 = require("md5")
var bodyParser = require("body-parser");
var moment = require("moment")
var crypto = require('crypto');


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Porta do servidor
var HTTP_PORT = 8000 


app.listen(HTTP_PORT, () => {
    console.log("Server executando na porta %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint

// Requisição de teste
app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});

// Traz total de votos de um empreendimento
app.get("/api/vote/enterprise/:id", (req, res, next) => {
    var sql = "select (count *) from vote where enterprise_Id = ?"
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});


// Traz total de votos
app.get("/api/Allvotes", (req, res, next) => {
    var sql = "select (count *) from vote"
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});


// Verifica sessão
app.get("/api/session/:id", (req, res, next) => {
    var sql = "select * from session where id = ?"
    var params = [req.params.id]
    db.all(sql, params, (err, rows) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":rows
        })
    });
});


app.get("/api/user/:id", (req, res, next) => {
    var sql = "select * from user where id = ?"
    var params = [req.params.id]
    db.get(sql, params, (err, row) => {
        if (err) {
            res.status(400).json({"error":err.message});
            return;
        }
        res.json({
            "message":"success",
            "data":row
        })
    });
});




// Criar usuário
app.post("/api/newUser/", (req, res, next) => {
    var errors=[]
    if (!req.body.email || !req.body.password || !req.body.name){
        res.status(400).json({"error":"sem dados"});
        return;
    }

    var data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }

    db.get('SELECT count(*) FROM user WHERE email LIKE ?', data.email, (err, row) => {
            
    })

    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})


// Insere novo voto
app.post("/api/vote/", (req, res, next) => {
    var errors=[]
    if (!req.body.userId){
        errors.push("Usuário sem permissão");
    }
    if (!req.body.vote){
        errors.push("Nenhum voto recebido");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }
    var data = {
        name: req.body.name,
        email: req.body.email,
        password : md5(req.body.password)
    }
    var sql ='INSERT INTO user (name, email, password) VALUES (?,?,?)'
    var params =[data.name, data.email, data.password]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})

// Login
app.post("/api/login/", (req, res, next) => {
    var errors=[]
    if (!req.body.password){
        errors.push("No password specified");
    }
    if (!req.body.email){
        errors.push("No email specified");
    }
    if (errors.length){
        res.status(400).json({"error":errors.join(",")});
        return;
    }

    var id = async (db) => {
        var consultaUser = 'SELECT id FROM user where email like ? and password like ?'
        await db.get(consultaUser, [req.body.email, md5(req.body.password)],(err, row) => {
            if (err || row.length === 0) return false

            return row.id
        })
    }

    if (id === false){
        res.status(400).json({"error":"Usuário ou senha incorreto!"});
        return;
    }


    console.log(moment().format("YYYY-MM-DD hh:mm:ss"))
    var data = {
        //email: req.body.email,
        //password: md5(req.body.password),
        userId: id,
        dataHora: moment().format("YYYY-MM-DD hh:mm:ss"),
        token: crypto.createHash('md5')
    }

    var sql ='INSERT INTO session (user_Id, date, token) VALUES (?,?,?)'
    var params =[data.userId, data.dataHora, data.token]
    db.run(sql, params, function (err, result) {
        if (err){
            res.status(400).json({"error": err.message})
            return;
        }
        res.json({
            "message": "success",
            "data": data,
            "id" : this.lastID
        })
    });
})


// Resposta padrão
app.use(function(req, res){
    res.status(404);
});