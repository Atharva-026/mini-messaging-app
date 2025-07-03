const mongoose = require('mongoose');
const path = require("path");
const Chat = require("./models/chats");

main()
.then(()=>{
    console.log("connection successful");
})
.catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

let allchats = [
    {
        from:"Amit",
        to:"Bob",
        msg:"Dwag",
        createdAt: new Date() ,
    },
    {
        from:"Pankaj",
        to:"Gourav",
        msg:"Fodrichya",
        createdAt: new Date() ,
    },
   {
        from:"Nikhil",
        to:"Om",
        msg:"Lavdya",
        createdAt: new Date() ,
    },
    {
        from:"Deepak",
        to:"Vaibhav",
        msg:"MC",
        createdAt: new Date() ,
    },
];

Chat.insertMany(allchats);
   
