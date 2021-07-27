var express = require("express")
var app = express()

// Porta do servidor
var HTTP_PORT = 8000 


app.listen(HTTP_PORT, () => {
    console.log("Server executando na porta %PORT%".replace("%PORT%",HTTP_PORT))
});
// Root endpoint

app.get("/", (req, res, next) => {
    res.json({"message":"Ok"})
});


// Resposta padrão
app.use(function(req, res){
    res.status(404);
});