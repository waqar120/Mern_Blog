const mongoose = require('mongoose')
const blogModel = require("../models/blogModel");
const userModel = require("../models/userModel");

// Define the controller function
exports.getAllBlogController = async (req, res) => {
	try {
		// Retrieve all blogs from the database
		const blogs = await blogModel.find({}).populate("user")

		// Check if any blogs are found
		if (!blogs || blogs.length === 0) {
			return res.status(200).send({
				success: false,
				message: "No Blog Found",
			});
		}

		// Respond with the list of blogs
		return res.status(200).send({
			success: true,
			message: "All Blog Lists",
			blogs,
		});
	} catch (error) {
		// Handle errors and log them
		console.log(error);
		return res.status(500).send({
			success: false,
			message: "Error while Getting Blog",
			error,
		});
	}
};

// Create Blog
exports.createBlogController = async (req, res) => {
	try {
		const { title, description, image, user } = req.body;

		// validation
		if (!title || !description || !image || !user) {
			return res.status(400).send({
				success: false,
				message: "All Filed are Required",
			});
		}
		const existingUser = await userModel.findById(user)

		//validation
		if (!existingUser) {
			return res.status(404).send({
				success: false,
				message: "Unable to Find User"
			})
		}
		const newBlog = new blogModel({ title, description, image, user });
		const session = await mongoose.startSession()
		session.startTransaction()
		await newBlog.save({ session })
		existingUser.blogs.push(newBlog)
		await existingUser.save({ session })
		await session.commitTransaction()
		await newBlog.save();
		return res.status(201).send({
			success: true,
			message: "Blog Created Successfully",
			newBlog,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).send({
			success: false,
			message: "Error Creating Blog",
			error,
		});
	}
};

// Update Blog
exports.updateBlogController = async (req, res) => {
	try {
		const { id } = req.params;
		const { title, description, image } = req.body;
		const blog = await blogModel.findByIdAndUpdate(
			id,
			{ ...req.body },
			{ new: true }
		);
		return res.status(200).send({
			success: true,
			message: "Blog Update Created Successfully",
			blog,
		});
	} catch (error) {
		console.log(error);
		return res.status(400).send({
			success: false,
			message: "While Updating Error",
			error,
		});
	}
};

// Get Blog_By_Id
exports.getBlogByIdController = async (req, res) => {
	const { id } = req.params;

	try {
		const blog = await blogModel.findById(id);
		if (!blog) {
			return res.status(404).send({
				success: false,
				message: "No Blog Found",
			});
		}
		return res.status(200).send({
			success: true,
			message: "Blog Found Successfully",
			blog,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

//delete Blog
exports.deleteBlogController = async (req, res) => {
	try {
		const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user")
		await blog.user.blogs.pull(blog)
		await blog.user.save();
		return res.status(200).send({
			success: true,
			message: "Blog Delete Successfully",
			blog,
		});
	} catch (error) {
		console.error(error);
		return res.status(500).send({
			success: false,
			message: "Internal Server Error",
			error: error.message,
		});
	}
};

//GET USER BLOG

exports.userBlogController=async(req,res)=>{
	try{
   const userBlog=await userModel.findById(req.params.id).populate("blogs")
	if(!userBlog){
		return res.status(404).send({
			success:false,
			message:"Blog not found with this Id",

		})
	}
	return res.status(200).send({
    success:true,
		message:"user blogs",
		userBlog
	})
	}catch(error){
		console.log(error)
		return res.status(500).send({
			success:false,
			message:"error in user blog",
			error
		})
	}
}