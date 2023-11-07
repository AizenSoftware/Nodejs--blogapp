const { raw } = require("mysql2");
const Blog = require("../models/blog")
const Category = require("../models/category")

const { Op } = require("sequelize");

const getIndexPage = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where:{
       [Op.or]:[{anasayfa: true},{onay: true}]
      },
      raw: true, // raw: true ekstra parametre getirmiyor sadece istenilen.
    });
    const categories = await Category.findAll({raw: true});
    res.render("users/index", {
      url: req.protocol + "://" + req.headers.host,
      blogs: blogs,
      categories: categories,
      selectedCategory:null,
    });
  } catch (error) {
    console.log(error);
  }
};

const getBlogsPage = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      where:{
        onay: true,
      },
      raw : true
    });
    const categories = await Category.findAll({raw : true});
    const [categoryNames, ]= await Category.findAll({raw : true,})

    res.render("users/blogs", {
      url: req.protocol + "://" + req.headers.host,
      title: categoryNames,
      blogs: blogs,
      categories: categories,
      selectedCategory:null,
    });
  } catch (error) {
    console.log(error);
  }
};

const getBlogDetails = async (req, res) => {
  const blogid = req.params.id;
  try {
    const blog = await Blog.findOne({
      where:{
        id: blogid
      },
      raw : true,
    })
    console.log(blog);
    if (blog) {
      return res.render("users/blog-details", {
        url: req.protocol + "://" + req.headers.host,
        title: blog.baslik,
        blog: blog,
        selectedCategory:null,
      });
    }
    res.redirect("/");
  } catch (error) {
    console.log(error);
  }
};

const blogsCategory = async (req, res) => {
  const id = req.params.id;
  try {
    const blogs = await Blog.findAll({
      where:{
       onay:true,
      },
      include:{
        model:Category,
        where:{id:id}
      },
      raw : true,
    })
    const categories = await Category.findAll({raw : true})
    const [categoryNames, ]= await Category.findAll({
      where:{
        id:id
      },
      raw : true,
    })
  
    
    if (blogs[0] !== 0) {
      res.render("users/blogs", {
        url: req.protocol + "://" + req.headers.host,
        title: categoryNames,
        blogs: blogs,
        categories: categories,
        selectedCategory:id,
      });
    }else{
      console.log("Kategori boş");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { getIndexPage, getBlogsPage, getBlogDetails, blogsCategory };
