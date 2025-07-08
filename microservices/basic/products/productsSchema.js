import mongoose from "mongoose";

const ProductsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Name required!"],
    unique: true
  },
  price: {
    type: Number,
    required: [true, "Price required!"],
    minlength: [4, "Price must be less 2 charecters!"],
  },
  created_at: {
    type: Date,
    required: true,
    default: Date.now()
  }
});

export default new mongoose.model("Products", ProductsSchema);
