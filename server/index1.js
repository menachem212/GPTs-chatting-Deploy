const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const http = require("http");
const  openAi  = require('./api/openAi1');
const app = express();
const path = require('path');

app.use(express.json());

const server = http.createServer(app);
// קוד חשוב שכאשר נעלה את השרת לענן אז נעבוד מול הפורט של 
// השרת של הענן שלא תמיד יהיה 3000
let port  = process.env.PORT || "5000";

server.listen(port, () => console.log(`Server started on port ${port}`));

// להגדיר CORS-ORIGIN שיאפשר כניסה מכל דומיין
// או כל דומיין שנגדיר
exports.originCorsAccess = (app) => {
  app.all('*',  (req, res, next) => {
    if (!req.get('Origin')) return next();
    res.set('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.set('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type,x-auth-token');
    next();
  });
}

const router = express.Router();
 
router.use(bodyParser.urlencoded({extended: true}));
//const {routesInit,originCorsAccess} = require("./api/app_routes");

// Middleware
app.use(bodyParser.json());
app.use(cors());
//app.use(express.static(process.cwd() + "/dist"))
// קביעת תיקיית הסטטית עבור קבצים כמו CSS ו-JavaScript
app.use(express.static(path.join(__dirname, 'dist')));

// מסלול הצגת הדף הראשי
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Handle production
  // Static folder
 //app.use(express.static(__dirname + "/dist"));
  //originCorsAccess(app);
  //routesInit(app);
  // Handle SPA
 // app.get(/.*/, (req, res) => res.sendFile(__dirname + "/dist/index.html"));


app.get("/",(req,res) => {
  res.json({message:"all ok index1"});
});

app.get('/openAi1',  async (req, res) => {
  const query = await req.query.q;
  const data = await openAi.getData(query);
  res.send(data);
});

app.get('/openAi2',  async (req, res) => {
  const query = await req.query.q;
  const data = await openAi.getData(query);
  res.send(data);
});






