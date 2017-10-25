const express = require('express');
const compression = require('compression');

var cors = require('cors');

const app = express();
app.use(express.static(__dirname));
const bodyParser = require('body-parser');
const jsonParser =bodyParser.json({limit:'10mb'});  //{
const urlEncoded = bodyParser.urlencoded({limit:'10mb',extended:true}); //

const appPort = require('config').get('APP').apphost;


// all environments
app.set('my_port', process.env.PORT || process.argv[2] || appPort);
app.disable("x-powered-by");


app.use(cors());
app.use(jsonParser);
app.use(urlEncoded);
app.use(compression());


app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST,DELETE");
    res.header("Access-Control-Allow-Headers", "Cache-Control,Pragma, Origin, Authorization, Content-Type, X-Requested-With,X-XSRF-TOKEN, query,x-access-token");
    next();
});


// Routes
const skillRoutes = require('./router/skill_router');


app.use('/skills',skillRoutes);


// Start Server
app.listen(appPort, function () {
console.log('Quezx Test Project API is listening on port '+ appPort+' !');
});