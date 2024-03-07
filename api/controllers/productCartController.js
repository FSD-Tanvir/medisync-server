const ProductCarts = require("../models/productCart");

// get productCart using email
const getProductCartByEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const query = { email: email };
    const result = await ProductCarts.find(query).exec();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post  a cart when user click add-to-cart button
const addToCart = async (req, res) => {
  const {
    productItemId,
    quantity,
    name,
    weight,
    company,
    image,
    price,
    totalPrice,
    email,
  } = req.body;
  try {
    // existing product item
    const existingProductItem = await ProductCarts.findOne({
      productItemId,
      email,
    });
    if (existingProductItem) {
      return res
        .status(400)
        .json({ message: "Product already exist already on the cart" });
    }
    const productItem = await ProductCarts.create({
      productItemId,
      quantity,
      name,
      weight,
      company,
      image,
      price,
      totalPrice,
      email,
    });
    res.status(201).json(productItem);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a productCart Item by user

const deleteProduct = async (req, res) => {
  const cartId = req.params.id;
  try {
    const deleteCart = await ProductCarts.findByIdAndDelete(cartId);
    if (!deleteCart) {
      return res.status(401).json({ message: "Cart item notfound" });
    }
    res.status(200).json({ message: "Cart Item Deleted Successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// update product quantity - increment or decrement
const updateProduct = async (req, res) => {
  try {
    const {quantity,totalPrice} = req.body;
    console.log(quantity,totalPrice)
    const updateResult = await ProductCarts.updateOne(
      { _id: req.params?.id },
      { $set: { quantity,totalPrice} }
    );
    const result = await ProductCarts.up
    res.status(201).json({
      status: true,
      message: "Product updated successfully",
      updateResult,
    });
  } catch (err) {
    res.status(500).json({
      status: false,
      message: err.message,
    });
  }
};

module.exports = {
  getProductCartByEmail,
  addToCart,
  deleteProduct,
  updateProduct,
};
