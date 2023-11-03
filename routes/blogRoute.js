import express from "express";
import {
  createBlogController,
  deleteBlogController,
  getAllBlogsController,
  updateBlogController,
} from "../controllers/blogController.js";
import userAuth from "../middelwares/authMiddleware.js";

const router = express.Router();

//routes
// CREATE BLOG || POST
router.post("/create-blog", userAuth, createBlogController);

//GET BLOGS || GET
router.get("/get-blog", userAuth, getAllBlogsController);

//UPDATE BLOGS ||  PATCH
router.patch("/update-blog/:id", userAuth, updateBlogController);

//DELETE BLOGS || DELETE
router.delete("/delete-blog/:id", userAuth, deleteBlogController);

export default router;
