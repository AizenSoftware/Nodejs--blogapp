const express = require("express");
const userController = require("../controller/userController");
const router = express.Router();

router.route("/").get(userController.getIndexPage);
router.route("/blogs").get(userController.getBlogsPage);
router.route("/blogs/:slug").get(userController.getBlogDetails)
router.route("/blogs/category/:slug").get(userController.getBlogsPage);




module.exports = router;