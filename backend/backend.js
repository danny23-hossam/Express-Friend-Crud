const express=require("express");
const app=new express();
const cors = require('cors');
const session = require("express-session");
const jwt = require("jsonwebtoken");
const router= express.Router();
app.use(cors({ credentials: true, origin: "http://localhost:5173" }));
const port=3000;
let friends=[];

const users=[ {
   name: "danny",
   password:"123"
},

    
    {

name:"hossam",
password:"12345"
    }
    ];

app.get("/",(req,res)=>{
    res.send("Welcome")
});

app.use(session({
    secret:"mysecret",
    resave:false,
    saveUninitialized:false
}));




app.get("/login/:name/:password",(req,res)=>{
  const user = req.params.name;
  const pass = req.params.password;
  const find = users.find(u=>u.name===user && u.password===pass);

  if(find){
    const accesstoken = jwt.sign({data: find}, 'access', {expiresIn:"1h"});
    req.session.authorization = { accesstoken };
    res.json({ message:"successfully logged in"});
  } else {
    res.json({ message:"user not registered" });
  }
});

// Mount router for friends
app.use("/friends", router);

// read all friends
router.get("/",(req,res)=>{
    res.json(friends)
})

// add a friend

router.get("/add",(req,res)=>{
    const newfriend={
        firstname:req.query.firstname,
        lastname:req.query.lastname,
        age:req.query.age,
        sex:req.query.sex
    };
    let exists=friends.find((friend)=>friend.firstname===newfriend.firstname&&friend.lastname===newfriend.lastname&&friend.age===newfriend.age&&friend.sex===newfriend.sex);
    if(exists){
         res.json("this friend already exists");
    }
    else{
         friends.push(newfriend);
        res.send("friend is added ")
    }

})
// delete a friend
router.get("/delete/:id",(req,res)=>{
    const id=Number(req.params.id);
    if(id>=0&&id<friends.length){
   friends.splice(id,1);
   res.send("friend is deleted");
    }else{
        res.json("provided id is not available")
}
})


// update a friendinfo 
router.get("/update/:id",(req,res)=>{
     const id=Number(req.params.id);
     let updateduser=friends[id];
     
     if(updateduser){
        friends=friends.filter((user,index)=>id!==index);
if(req.query.firstname){
        updateduser.firstname=req.query.firstname;

    }
    if(req.query.lastname){
         updateduser.lastname=req.query.lastname;
    }
    if(req.query.age){
         updateduser.age=req.query.age;
    }
    if(req.query.sex){
         updateduser.sex=req.query.sex;
    }
    friends.push(updateduser);
    res.send("user is updated");
  
     }
     else{
        res.send("provided user is not available")
     }
})
app.listen(port,()=>{
    console.log(`listening at http://localhost:${port}`);
})





