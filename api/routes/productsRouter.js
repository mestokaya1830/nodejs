import express from "express";
const Router = express.Router();
import tryCatch from "../middleware/tryCatch.js";
import Products from "../models/schemas/productsSC.js";

Router.get(
  "/",
  tryCatch(async (req, res) => {
    const result = await Products.find({});
    res.status(200).json({ products: result });
  }),
);

Router.post(
  "/",
  tryCatch(async (req, res) => {
    const newProduct = new Products({
      name: req.body.name,
      price: req.body.price,
    });
    console.log(newProduct);
    await newProduct.save();
    res.status(200).json({ message: "New Product Added" });
  }),
);

Router.get(
  "/:id",
  tryCatch(async (req, res) => {
    const result = await Products.findOne({ _id: req.params.id });
    res.status(200).json({ product: result });
  }),
);

Router.patch(
  "/:id",
  tryCatch(async (req, res) => {
    await Products.updateOne(
      { _id: req.params.id },
      { $set: { price: req.body.price } },
    );
    res.status(200).json({ message: "Product Updated" });
  }),
);

Router.delete(
  "/:id",
  tryCatch(async (req, res) => {
    await Products.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: "Product Deleted" });
  }),
);

export default Router;
