var express= require("express"),
    app=express(),
    bodyParser=require("body-parser"),
    mongoose=require("mongoose"),
    passport=require("passport"),
    cors=require("cors"),
    path=require("path");

var users=require('./routes/users');
var config=require("./config/database");

mongoose.connect(config.database);

mongoose.connection.on('connected',()=>{
 console.log('database connected');
});

mongoose.connection.on('error',(err)=>{
    console.log('database not connected');
});

app.use(cors());

app.use(express.static(path.join(__dirname,'public')));

app.use(bodyParser.json());

app.use(passport.initialize());
app.use(passport.session());

require('./config/passport')(passport);
app.use('/users',users);

app.get('/',(req,res)=>{
    res.send("hello");
});

app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'public/index.html'));
});

app.listen(3000, () => {
    console.log("server has started");
});
