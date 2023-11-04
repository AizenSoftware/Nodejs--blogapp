const fs = require("fs");
//Models
const Blog = require("../models/blog");
const Category = require("../models/category");


const adminBlogList = async (req, res) => {
  try {
    const blogs = await Blog.findAll({
      attributes: ["id", "baslik", "altbaslik", "resim"],
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
    const blog = await Blog.findByPk(blogid);
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
  let { baslik, aciklama, anasayfa, onay, kategori, blogid, altbaslik } = req.body;
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
    await Blog.update(
      {
        baslik,
        altbaslik,
        aciklama,
        resim,
        anasayfa,
        onay,
        categoryId: kategori,
      },
      {
        where: {
          id: blogid,
        },
      }
    );
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
    if (category) {
      return res.render("admin/category-edit", {
        url: req.protocol + "://" + req.headers.host,
        category: category.dataValues,
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
};
