const express = require("express");
const adminController = require("../controller/adminController");
const imageUpload = require("../helpers/image-upload");

const router = express.Router();


router.route("/blogs").get(adminController.adminBlogList); // admin/blogs
router.route("/blog/create").get(adminController.blogCreate).post(imageUpload.upload.single("resim"),adminController.blogCreatePost);

router.route("/blogs/:blogid").get(adminController.adminBlogEdit).post(imageUpload.upload.single("resim"),adminController.adminBlogEditPost);
router.route("/blog/delete/:blogid").get(adminController.adminBlogDelete).post(adminController.adminBlogDeletePost);

router.route("/categories/remove").post(adminController.adminCategoryRemove)
router.route("/categories").get(adminController.adminCategoryList);
router.route("/category/create").get(adminController.categoryCreate).post(adminController.categoryCreatePost);
router.route("/category/:categoryid").get(adminController.adminCategoryEdit).post(adminController.adminCategoryEditPost);
router.route("/category/delete/:categoryid").get(adminController.adminCategoryDelete).post(adminController.adminCategoryDeletePost);



module.exports = router;