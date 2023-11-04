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


const sequelize = require("./data/db");
const dummyData = require("./data/dummy-data");
const Category = require('./models/category');
const Blog = require('./models/blog');

// İlişkiler
// one to many
Category.hasMany(Blog,{
    foreignKey:{
        name:"categoryId",
        allowNull: false
    }
});
Blog.belongsTo(Category)

// Uygulanması - sync


// IIFE
const run = async ()=>{
    await sequelize.sync({force: true})
    await dummyData();
};
run();

app.listen(3000,()=>{
    console.log("3000 portunda çalışıyor");
})