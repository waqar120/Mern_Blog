import React, { useState, useEffect } from 'react'
import axios from 'axios'
import BlogCard from '../components/BlogCard';

const Blogs = () => {
	const [blog, setBlog] = useState([]);
	const gellAllBlog = async () => {
		try {
			const { data } = await axios.get('/api/v1/blog/all-blog')
			if (data?.success) {
				setBlog(data?.blogs)
			}
		} catch (error) {
			console.log(error)
		}
	}

	useEffect(() => {
		gellAllBlog()
	}, [])

	return (
		<div>
			{
				blog && blog.map((blog) => (
					<BlogCard
					  id={blog._id}
						isUser={localStorage.getItem("userId")=== blog._id}
						title={blog.title}
						description={blog.description}
						image={blog.image}
						username={blog.user?.username}
						time={blog.createdAt}
					/>
				))
			}
		</div>
	)
}

export default Blogs