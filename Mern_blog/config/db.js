const mongoose =require('mongoose')

const connectDB=async()=>{
  await mongoose.connect(process.env.MONGO_URL)
	.then(()=>{
		console.log(`Data Base Connected ${mongoose.connection.host}`)
	})
	.catch((err)=>{
		console.log(`Mongo Connect Error ${err}`)
	})
}

module.exports=connectDB