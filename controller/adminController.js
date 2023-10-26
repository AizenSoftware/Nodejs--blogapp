const db = require("../data/db");
const fs = require("fs");

const adminBlogList = async (req, res) => {
  try {
    const [blogs,] = await db.execute("select blogid, baslik, altbaslik, resim from blog");

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
    const [blogs] = await db.execute("select * from blog");
    const [categories] = await db.execute("select * from category");

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
  let { baslik, aciklama, anasayfa, onay, kategori,altbaslik } = req.body;
  let resim = req.file.filename;
  anasayfa = anasayfa == "on" ? 1 : 0;
  onay = onay == "on" ? 1 : 0;
  try {
    console.log(resim);
     await db.execute(
      "INSERT INTO blog(baslik,altbaslik, aciklama, resim, anasayfa, onay, category) VALUES(?,?,?,?,?,?,?)",
      [baslik, altbaslik, aciklama, resim, anasayfa, onay, kategori]
    );
    res.redirect("/admin/blogs?action=create");
  } catch (error) {
    console.log(error);
  }
};

const adminBlogEdit = async(req, res)=>{
  try {
    const blogid = req.params.blogid
    const [blogs, ] = await db.execute("select * from blog where blogid=?",[blogid]);
    const [categories, ] = await db.execute("select * from category");
    const blog = blogs[0];
    if(blog){
      return res.render("admin/blog-edit",{
        url: req.protocol + "://" + req.headers.host,
        blog:blog,
        categories:categories,
      });
    }
    res.redirect("admin/blogs")
   
  } catch (error) {
    console.log(error);
  }
}

const adminBlogEditPost = async(req, res)=>{
  let {baslik, aciklama,anasayfa, onay, kategori, blogid, altbaslik} = req.body;
  let resim = req.body.resim;
  anasayfa = anasayfa == "on" ? 1 : 0;
  onay = onay == "on" ? 1 : 0;

  if(req.file){
    resim = req.file.filename;
    fs.unlink("./public/images/" + req.body.resim, err =>{
      console.log(err);
    });
    
  }

  try {
    await db.execute("UPDATE blog SET baslik=?, altbaslik=?, aciklama=?, resim=?, anasayfa=?, onay=?, category=? WHERE blogid=?",[baslik, altbaslik,aciklama,resim,anasayfa,onay,kategori,blogid]);
    res.redirect("/admin/blogs?action=edit&blogid="+blogid);
  } catch (error) {
      console.log(error);
  }
}

const adminBlogDelete = async(req,res)=>{
  const blogid = req.params.blogid;
  try {
    const [blogs, ] = await db.execute("select * from blog where blogid=?",[blogid]);
    res.render("admin/blog-delete",{
      url: req.protocol + "://" + req.headers.host,
      blog:blogs[0],
    })
  } catch (error) {
    console.log(error);
  }
}
const adminBlogDeletePost = async(req,res)=>{
  const blogid = req.params.blogid;
  try {
    await db.execute("DELETE FROM blog where blogid=?",[blogid]);
    res.redirect("/admin/blogs?action=delete&blogid="+blogid);
  } catch (error) {
    console.log(error);
  }
  
}

// Categories 
const adminCategoryList = async (req, res) => {
  try {
    const [categories] = await db.execute("select * from category");

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
    const [categories] = await db.execute("select * from category");
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
    await db.execute("INSERT INTO category(name) VALUES(?)",[name]);
    res.redirect("/admin/categories?action=create");
  } catch (error) {
    console.log(error);
  }
};

const adminCategoryEdit = async(req, res)=>{
  try {
    const categoryid = req.params.categoryid;
    const [categories, ] = await db.execute("select * from category where categoryid=?",[categoryid]);
    const category = categories[0];
    if(category){
      return res.render("admin/category-edit",{
        url: req.protocol + "://" + req.headers.host,
        category:category,
      });
    }
    res.redirect("admin/categories")
   
  } catch (error) {
    console.log(error);
  }
}

const adminCategoryEditPost = async(req, res)=>{
  const categoryid = req.body.categoryid
  const name = req.body.name
  try {
    await db.execute("UPDATE category SET name=? WHERE categoryid=?",[name, categoryid]);
    res.redirect("/admin/categories?action=edit&categoryid="+categoryid);
  } catch (error) {
      console.log(error);
  }
}
const adminCategoryDelete = async(req,res)=>{
  const categoryid = req.params.categoryid;
  try {
    const [categories, ] = await db.execute("select * from category where categoryid=?",[categoryid]);
    res.render("admin/category-delete",{
      url: req.protocol + "://" + req.headers.host,
      category:categories[0],
    })
  } catch (error) {
    console.log(error);
  }
}
const adminCategoryDeletePost = async(req,res)=>{
  const categoryid = req.params.categoryid;
  try {
    await db.execute("DELETE FROM category where categoryid=?",[categoryid]);
    res.redirect("/admin/categories?action=delet&categoryid="+categoryid);
  } catch (error) {
    console.log(error);
  }
  
}



module.exports = { adminBlogList, blogCreate, blogCreatePost, adminBlogEdit, adminBlogEditPost,adminBlogDelete,adminBlogDeletePost,adminCategoryList,categoryCreate,categoryCreatePost, adminCategoryEdit, adminCategoryEditPost,adminCategoryDelete, adminCategoryDeletePost};
