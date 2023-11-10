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
    const size = 3;
    const {page = 0} = req.query;
    const slug = req.params.slug;
  try {
    const {rows, count} = await Blog.findAndCountAll({
      where:{
        onay: true,
      },
      raw : true,
      include: slug ? {model:Category,where:{url: slug}}:null,
      limit:size,
      offset: page * size // 0 * 3 il 3 tane al 1 * 3 3 tane ötele 
    });
    const categories = await Category.findAll({raw : true});
    const [categoryNames, ]= await Category.findAll({raw : true,})

    res.render("users/blogs", {
      url: req.protocol + "://" + req.headers.host,
      title: categoryNames,
      blogs: rows,
      totalItems:count,
      totalPages:Math.ceil(count / size),
      currentPage:page,
      categories: categories,
      selectedCategory:slug,
    });
  } catch (error) {
    console.log(error);
  }
};

const getBlogDetails = async (req, res) => {
  const slug = req.params.slug;
  try {
    const blog = await Blog.findOne({
      where:{
        url: slug
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



module.exports = { getIndexPage, getBlogsPage, getBlogDetails, };
