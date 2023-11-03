import blogModel from "../models/blogModel.js";
import mongoose from "mongoose";
import moment from "moment";
// ====== CREATE BLOG ======
export const createBlogController = async (req, res, next) => {
  const { blogtitle, blogdescription } = req.body;
  if (!blogtitle || !blogdescription) {
    next("Please Provide All Fields");
  }
  req.body.createdBy = req.user.userId;
  const blog = await blogModel.create(req.body);
  res.status(201).json({ blog });
};

// ======= GET BLOGS ===========
export const getAllBlogsController = async (req, res, next) => {
  const { status, workType, search, sort } = req.query;
  //conditons for searching filters
  const queryObject = {
    createdBy: req.user.userId,
  };
  let queryResult = blogModel.find(queryObject);

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  queryResult = queryResult.skip(skip).limit(limit);
  //blogs count
  const totalBlogs = await blogModel.countDocuments(queryResult);
  const numOfPage = Math.ceil(totalBlogs / limit);

  const blogs = await queryResult;

  // const jobs = await jobsModel.find({ createdBy: req.user.userId });
  res.status(200).json({
    totalBlogs,
    blogs,
    numOfPage,
  });
};

// ======= UPDATE BLOGS ===========
export const updateBlogController = async (req, res, next) => {
  const { id } = req.params;
  const { blogtitle, blogdescription } = req.body;
  //validation
  if (!blogtitle || !blogdescription) {
    next("Please Provide All Fields");
  }
  //find job
  const blog = await blogModel.findOne({ _id: id });
  //validation
  if (!blog) {
    next(`no blogs found with this id ${id}`);
  }
  if (!req.user.userId === blog.createdBy.toString()) {
    next("Your Not Authorized to update this job");
    return;
  }
  const updateblog = await blogModel.findOneAndUpdate({ _id: id }, req.body, {
    new: true,
    runValidators: true,
  });
  //res
  res.status(200).json({ updateblog });
};

// ======= DELETE BLOGS ===========
export const deleteBlogController = async (req, res, next) => {
  const { id } = req.params;
  //find job
  const blog = await blogModel.findOne({ _id: id });
  //validation
  if (!blog) {
    next(`No Blog Found With This ID ${id}`);
  }
  if (!req.user.userId === blog.createdBy.toString()) {
    next("Your Not Authorize to delete this blog");
    return;
  }
  await blog.deleteOne();
  res.status(200).json({ message: "Success, Blog Deleted!" });
};