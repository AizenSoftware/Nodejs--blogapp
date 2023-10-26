const express = require("express");
const userRoute = require("./routes/userRoutes")
const adminRoute = require("./routes/adminRoutes")
const app = express();


app.set("view engine","ejs");

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));


app.use("/",userRoute);
app.use("/admin",adminRoute);


app.listen(3000,()=>{
    console.log("3000 portunda çalışıyor");
})