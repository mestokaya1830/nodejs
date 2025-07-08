import mongoose from "mongoose";

const postsSC = new mongoose.Schema({
  title: {
    type: String, 
    required:[true, 'Title is required'],
    minlength:['3', 'Title must be more then 3'],
    maxlength:['255','Title must be less then 255']
  },
  body: {
    type: String, 
    required:[true, 'Body is required'],
    minlength:['3', 'Body must be more then 10'], 
    maxlength:['5000','Body must be less then 5000']
  },
  imageName: {
    type: String
  },
  owner: {
    type: String,
    required:[true, 'Owner is required'],
  },
},{timestamps: true})

export default mongoose.model('posts', postsSC)
