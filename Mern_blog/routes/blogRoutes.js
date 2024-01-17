const express = require("express");

const {
  getAllBlogController,
  createBlogController,
  updateBlogController,
  getBlogByIdController,
  deleteBlogController,
	userBlogController,
} = require("../controllers/blogController");

const router = express.Router();

// Get All Blog
router.get("/all-blog", getAllBlogController);

// Crete Blog
router.post("/create-blog", createBlogController);

//put || Update
router.put("/update-blog/:id", updateBlogController);

// Get || Single Blog Details
router.get("/get-blog/:id", getBlogByIdController);

//Delete || Delete Blog
router.delete("/delete-blog/:id", deleteBlogController);

// GET || user Blog
router.get('/user-blog/:id',userBlogController)

module.exports = router;
