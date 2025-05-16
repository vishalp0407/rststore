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
/**
 * @desc Create product
 * @route POST/api/v1/products
 * @access Private/Admin
 */

const createProduct = async (req, res) => {
  const product = new ProductModel({
    name: "sample name",
    price: 0,
    user: req.user._id,
    image: "/images/sample.jpg",
    brand: "sample brand",
    category: "Sample category",
    countInStock: 0,
    numReviews: 0,
    description: "Sample description",
    content: "Sample Content",
  });
  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
};

/**
 * @desc Update Product
 * @route PUT/api/v1/products/:id
 * @access Private/Admin
 */

const updateProduct = async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    countInStock,
    content,
  } = req.body;
  const product = await ProductModel.findById(req.params.id);
  if (product) {
    product.name = name;
    product.price = price;
    product.description = description;
    product.image = image;
    product.brand = brand;
    product.category = category;
    product.countInStock = countInStock;
    product.content = content;

    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404);
    throw new Errork("Product not found");
  }
};

export { getProductById, getProducts, createProduct, updateProduct };
