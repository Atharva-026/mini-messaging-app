const express = require("express");
const app = express();
const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chats");
const methodeOverride = require("method-override");

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")))
app.use(express.urlencoded({extended:true}));
app.use(methodeOverride("_method"));

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

//index route
app.get("/chats",async(req,res)=>{
    let chats = await Chat.find();
   console.log(chats);
    res.render("index.ejs",{chats});
})
//new route
app.get("/chats/new",(req,res)=>{
    res.render("new.ejs");
});

//create route      
app.post("/chats", async (req, res) => {
    let { from, to, msg } = req.body;

    let newChat = new Chat({ from, to, msg });

    try {
        await newChat.save();
        console.log("Chat was saved");
        res.redirect("/chats");
    } catch (err) {
        console.log("Error saving chat:", err);
        res.status(500).send("Failed to save chat.");
    }
});

//Edit route
app.get("/chats/:id/edit",async(req,res)=>{
    let {id} = req.params;
    let chat = await Chat.findById(id);
    res.render("edit.ejs",{chat});
});
//Update route
app.put("/chats/:id",async(req,res)=>{
    let{id} = req.params;
    let { msg : newMsg} = req.body;
    console.log(newMsg);
    let updateChat = await Chat.findByIdAndUpdate(id,
        {msg:newMsg},
        {runValidators:true,new:true}
    );
    console.log(updateChat);
    res.redirect("/chats");
});
//Distroy route
app.delete("/chats/:id",async(req,res)=>{
    let {id} = req.params;
    let deletedChat = await Chat.findByIdAndDelete(id);
    console.log(deletedChat);
    res.redirect("/chats");
});

app.get("/",(req,res)=>{
   res.send("root is working");
});

app.listen(8080,()=>{
    console.log("Server is running on port 8080");
});