const express = require("express");
const bodyParser = require("body-parser");
const mustacheExpress = require("mustache-express");
const path = require("path");
const session = require("express-session");
const app = express();
const engine = mustacheExpress();
app.engine("mustache", engine);
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())

app.set("view engine", "mustache");


app.use(session({
    secret: "#batatamuitoboa",
    resave: false,
    saveUninitialized: false
}))

var args = []

permitir = function (req, res, next)
{
    if(req.session.logar){
        return next();
    } 
    res.redirect("/")
}

app.get("/", (req, res) =>
{
    res.render("principal", args)
})

app.get("/intranet", permitir, (req,res) =>
{
    let nome = req.session.usuario;
    args = {nome}
    res.render("intranet", args)
})

app.post("/login", (req, res) =>
{
    let lembra = req.body.lembrarusuario;
    let login = req.body.usuario;
    let senha = req.body.senhausuario;
    let invertido = login.split('').reverse().join('');
    
    if(invertido == senha)
    {
        req.session.usuario = login
        req.session.logar = true
        res.redirect("/intranet");
    }else{
        res.redirect("/")
    }
})

app.get("/logout", (req, res) =>
{
    req.session.destroy()
    res.redirect("/")
})

app.post("/salvanome", (req, res) =>
{
    req.session.usuario = req.body.editadonome;
    res.redirect("/intranet")
})

app.listen(3003, () => {
    console.log("working..")
})
