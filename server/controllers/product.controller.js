import ProductModel from "#models/product.model.js";

/**
 * @desc		Fetch all products
 * @route		GET /api/v1/products
 * @access	public
 */
const getProducts = async (req, res) => {
  const products = await ProductModel.find({});
  res.json(products);
};

/**
 * @desc		Fetch single products
 * @route		GET /api/v1/products/:id
 * @access	public
 */
const getProductById = async (req, res) => {
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404);
    throw new Error("Product not found");
  }
};

export { getProductById, getProducts };
