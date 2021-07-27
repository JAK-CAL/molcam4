
const express = require('express');
const http = require('http');
const path = require("path");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const userRouter = require('./router/user');
const certRouter = require("./router/certemail");
//const certRouter = require("./router/certemail");
const cors = require('cors');


const dbURL = 'mongodb://localhost:27017/project4'

var app = express();
app.use("/static",express.static("uploads"));
app.use(cors({
  origin: true,
  credentials: true
}));

//mongodb 연결 및 설정
mongoose.connect(dbURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', function(){
    console.log('Connection Failed!');
});
db.once('open', function() {
    console.log('DB Connected!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.set('port', process.env.PORT || 80);

app.get('/', (req, res) => {
    res.status(418).send("4th Project");
});

//router 연결
app.use('/user', userRouter);
app.use("/certmail",certRouter);
// Express 서버 시작
http.createServer(app).listen(app.get('port'), function(){
    console.log(app.get('port') + "에서 express 실행 중");
});
