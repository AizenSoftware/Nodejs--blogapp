const fs = require("fs");
//Models
const Blog = require("../models/blog");
const Category = require("../models/category");
const { Op } = require("sequelize");
const sequelize = require("../data/db");


const adminBlogList = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: ["id", "baslik", "altbaslik", "resim"],
      include:{
        model:Category,
        attributes:["name"]
      }
    });

    res.render("admin/blog-list", {
      url: req.protocol + "://" + req.headers.host,
      blogs: blogs,
      action: req.query.action,
      blogid: req.query.blogid,
    });
  } catch (error) {
    console.log(error);
  }
};

const blogCreate = async (req, res) => {
  try {
    const blogs = await Blog.findAll();
    const categories = await Category.findAll();

    res.render("admin/blog-create", {
      url: req.protocol + "://" + req.headers.host,
      blogs,
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};

const blogCreatePost = async (req, res) => {
  let { baslik, aciklama, anasayfa, onay, kategori, altbaslik } = req.body;
  let resim = req.file.filename;
  anasayfa = anasayfa == "on" ? 1 : 0;
  onay = onay == "on" ? 1 : 0;
  try {
    await Blog.create({
      baslik: baslik,
      altbaslik: altbaslik,
      aciklama: aciklama,
      resim: resim,
      anasayfa: anasayfa,
      onay: onay,
      categoryId: kategori,
    });
    res.redirect("/admin/blogs?action=create");
  } catch (error) {
    console.log(error);
  }
};

const adminBlogEdit = async (req, res) => {
  const blogid = req.params.blogid;
  try {
    const blog = await Blog.findOne({
      where:{
        id: blogid
      },
      include:{
        model:Category,
        attributes:["id"]
      }
    });
    const categories = await Category.findAll();

    if (blog) {
      return res.render("admin/blog-edit", {
        url: req.protocol + "://" + req.headers.host,
        blog: blog.dataValues,
        categories: categories,
      });
    }
    res.redirect("admin/blogs");
  } catch (error) {
    console.log(error);
  }
};

const adminBlogEditPost = async (req, res) => {
  let { baslik, aciklama, anasayfa, onay, blogid, altbaslik,kategoriIds } = req.body;
  let resim = req.body.resim;
  anasayfa = anasayfa == "on" ? 1 : 0;
  onay = onay == "on" ? 1 : 0;

  if (req.file) {
    resim = req.file.filename;
    fs.unlink("./public/images/" + req.body.resim, (err) => {
      console.log(err);
    });
  }

  try {
    const blog = await Blog.findOne({
      where:{
        id: blogid
      },
      include:{
        model:Category,
        attributes:["id"]
      }
    });
    console.log("KategoriIds",kategoriIds)
    if(blog){
      blog.baslik = baslik;
      blog.altbaslik = altbaslik;
      blog.aciklama = aciklama;
      blog.resim = resim;
      blog.anasayfa = anasayfa;
      blog.onay = onay;
      
      if(kategoriIds == undefined){
        await blog.removeCategories(blog.categories);
      }else{
        await blog.removeCategories(blog.categories);
        const selectedCategories = await Category.findAll({
          where:{
            id: {
              [Op.in] : kategoriIds,
            }
          }
        })
        await blog.addCategories(selectedCategories);
      }

    }
    res.redirect("/admin/blogs?action=edit&blogid=" + blogid);
  } catch (error) {
    console.log(error);
  }
};

const adminBlogDelete = async (req, res) => {
  const blogid = req.params.blogid;
  try {
    const blog = await Blog.findByPk(blogid);

    if (blog) {
      return res.render("admin/blog-delete", {
        url: req.protocol + "://" + req.headers.host,
        blog: blog,
      });
    }
    res.redirect("/admin/blogs")
  } catch (error) {
    console.log(error);
  }
};
const adminBlogDeletePost = async (req, res) => {
  const blogid = req.params.blogid;
  try {
    const blog = await Blog.findByPk(blogid);

    if(blog){
      await blog.destroy();
      return res.redirect("/admin/blogs?action=delete&blogid=" + blogid);
    }
    res.redirect("/admin/blogs");
  } catch (error) {
    console.log(error);
  }
};

// Categories
const adminCategoryList = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("admin/category-list", {
      url: req.protocol + "://" + req.headers.host,
      categories: categories,
      action: req.query.action,
      categoryid: req.query.categoryid,
    });
  } catch (error) {
    console.log(error);
  }
};
const categoryCreate = async (req, res) => {
  try {
    const categories = await Category.findAll();
    res.render("admin/category-create", {
      url: req.protocol + "://" + req.headers.host,
      categories,
    });
  } catch (error) {
    console.log(error);
  }
};    

const categoryCreatePost = async (req, res) => {
  let name = req.body.name;
  try {
    await Category.create({ name: name });
    res.redirect("/admin/categories?action=create");
  } catch (error) {
    console.log(error);
  }
};

const adminCategoryEdit = async (req, res) => {
  const categoryid = req.params.categoryid;
  try {
    const category = await Category.findByPk(categoryid);
    const blogs = await category.getBlogs();
    const countBlogs = await category.countBlogs();

    if (category) {
      return res.render("admin/category-edit", {
        url: req.protocol + "://" + req.headers.host,
        category: category.dataValues,
        blogs: blogs,
        countBlogs,
      });
    }
    res.redirect("admin/categories");
  } catch (error) {
    console.log(error);
  }
};

const adminCategoryEditPost = async (req, res) => {
  const categoryid = req.body.categoryid;
  const name = req.body.name;
  try {
    await Category.update({name: name,},
      {
        where: {
          id: categoryid,
        },
      }
    );
    res.redirect("/admin/categories?action=edit&categoryid=" + categoryid);
  } catch (error) {
    console.log(error);
  }
};
const adminCategoryRemove = async (req, res) =>{
  const {blogid, categoryid} = req.body;

  await sequelize.query(`delete from blogCategories where blogId=${blogid} and categoryId=${categoryid}`)
  res.redirect("/admin/category/" + categoryid);

}
const adminCategoryDelete = async (req, res) => {
  const categoryid = req.params.categoryid;
  try {
    const category = await Category.findByPk(categoryid);
    res.render("admin/category-delete", {
      url: req.protocol + "://" + req.headers.host,
      category: category,
    });
  } catch (error) {
    console.log(error);
  }
};
const adminCategoryDeletePost = async (req, res) => {
  const categoryid = req.params.categoryid;
  try {
    await Category.destroy({
      where:{
        id : categoryid,
      }
    })
    res.redirect("/admin/categories?action=delet&categoryid=" + categoryid);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  adminBlogList,
  blogCreate,
  blogCreatePost,
  adminBlogEdit,
  adminBlogEditPost,
  adminBlogDelete,
  adminBlogDeletePost,
  adminCategoryList,
  categoryCreate,
  categoryCreatePost,
  adminCategoryEdit,
  adminCategoryEditPost,
  adminCategoryDelete,
  adminCategoryDeletePost,
  adminCategoryRemove,
};
