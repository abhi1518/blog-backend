import mongoose from "mongoose";

const blogSchema = new mongoose.Schema(
  {
    blogtitle: {
      type: String,
      requied: [true, "Blog Title is require"],
    },
    blogdescription: {
      type: String,
      required: [true, "Blog Description is required"],
      maxlength: 500,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

export default mongoose.model("blog", blogSchema);
