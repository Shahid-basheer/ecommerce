import Product from '../models/products'
import APIFilters from '../utils/apiFilters'
import { uploads,cloudinary } from "../utils/cloudinary";
import fs from "fs";
export const newProduct = async (req, res, next) => {
    const { name, description, seller, price, stock, category, user: { _id } } = req.body
    const product = await new Product({
        name,
        description,
        seller,
        price,
        stock,
        category,
        user:_id
    })
    const productDetails = await product.save()
    res.status(200).json({ productDetails })

}

export const getProducts = async (req, res, next) => {
    const resPerPage = 3;
    const productsCount = await Product.countDocuments()
    const apiFilters = new APIFilters(Product.find(), req.query).search().filter()
    let products = await apiFilters.query
    const filteredProductsCount = products.length;
    apiFilters.pagination(resPerPage);
    products = await apiFilters.query.clone();
    res.status(200).json({ productsCount, resPerPage, filteredProductsCount, products })

}

export const getProductById = async (req, res, next) => {
    const products = await Product.findById(req.query.id).populate('reviews.user');
    res.status(200).json(products)
}

export const uploadProductImages = async (req, res, next) => {
    let product = await Product.findById(req.query.id);
    if (!product) {
      res.status(404).json({
        error: "Product not found.",
      });
    }
  
    const uploader = async (path) => await uploads(path, "images");
  
    const urls = [];
    const files = req.files;
  
    for (const file of files) {
      const { path } = file;
      const imgUrl = await uploader(path);
      urls.push(imgUrl);
      fs.unlinkSync(path);
    }
  
    product = await Product.findByIdAndUpdate(req.query.id, {
      images: urls,
    });
  
    res.status(200).json({
      data: urls,
      product,
    });
  };

  export const updateProduct = async (req, res, next) => {
    let product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found.", 404));
    }
  
    product = await Product.findByIdAndUpdate(req.query.id, req.body);
  
    res.status(200).json({
      product,
    });
  };
  
  export const deleteProduct = async (req, res, next) => {
    let product = await Product.findById(req.query.id);
  
    if (!product) {
      return next(new ErrorHandler("Product not found.", 404));
    }
  
    // Deleting images associated with the product
    for (let i = 0; i < product.images.length; i++) {
      const res = await cloudinary.v2.uploader.destroy(
        product.images[i].public_id
      );
    }
  
    await product.deleteOne();
  
    res.status(200).json({
      success: true,
    });
  };

  export const createProductReview = async (req, res, next) => {
    const { rating, comment, productId,userId } = req.body;
  
    const review = {
      user: userId,
      rating: Number(rating),
      comment,
    };
    let product = await Product.findById({_id:productId})
    const isReviewed = product?.reviews?.find(
    (r) => r.user.toString() !== userId.toString()
  );
  console.log(isReviewed,'***********8');
  if (isReviewed || isReviewed === undefined) {
    product?.reviews.push(review);
    product.ratings =
    product?.reviews?.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;
    await product.save()
  }
  
  
    res.status(200).json({
      success: true,
    });
  };