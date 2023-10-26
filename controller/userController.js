const db = require("../data/db");

const getIndexPage = async (req, res) => {
  try {
    const [blogs] = await db.execute("select * from blog");
    const [categories] = await db.execute("select * from category");
    res.render("users/index", {
      url: req.protocol + "://" + req.headers.host,
      title: blogs[0].baslik,
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
    const [blogs] = await db.execute("select * from blog");
    const [categories] = await db.execute("select * from category");
    res.render("users/blogs", {
      url: req.protocol + "://" + req.headers.host,
      title: blogs[0].baslik,
      blogs: blogs,
      categories: categories,
      selectedCategory:null,
    });
  } catch (error) {
    console.log(error);
  }
};

const getBlogDetails = async (req, res) => {
  const id = req.params.id;
  try {
    const [blog] = await db.execute("select * from blog where blogid=?", [id]);

    if (blog[0]) {
      return res.render("users/blog-details", {
        url: req.protocol + "://" + req.headers.host,
        title: blog[0].baslik,
        blog: blog[0],
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
    const [blogs] = await db.execute("select * from blog where category =?", [id]);
    const [categories] = await db.execute("select * from category");

    if (blogs[0] !== 0) {
      res.render("users/blogs", {
        url: req.protocol + "://" + req.headers.host,
        title: blogs.baslik,
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
