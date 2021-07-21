const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Product = require('../../models/Product');

// @route   POST api/profile
// @desc    Create or update product
// @access  Private

router.post('/', [
    auth,
    check('name').not().isEmpty(),
    check('wholesalePrice').not().isEmpty(),
    check('retailPrice').not().isEmpty(),
    check('wholesaler').not().isEmpty(),

], async (req, res) => {

    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, wholesalePrice, retailPrice, wholesaler, description, image } = req.body;

    let productFields = {};

    if (name) productFields.name = name;
    if (wholesalePrice) productFields.wholesalePrice = wholesalePrice;
    if (retailPrice) productFields.retailPrice = retailPrice;
    if (wholesaler) productFields.wholesaler = wholesaler;
    if (description) productFields.description = description;
    if (image) productFields.image = image;

    try {

        const product = new Product(productFields);
        await product.save();

        res.json(product);

    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }

});

// @route   GET api/product
// @desc    Get all products
// @access  Private
router.get('/', auth, async (req, res) => {
    try {

        const products = await Product.find();

        if (products.isEmpty) {
            return res.status(400).json({ msg: 'There are no products' });
        }

        res.send(products);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/product/:product_id
// @desc    Get product by id
// @access  Private
router.get('/:product_id', auth, async (req, res) => {
    try {

        const product = await Product.findOne({ _id: req.params.product_id });

        if (!product) {
            return res.status(400).json({ msg: 'This product does not exist' });
        }

        res.send(product);

    } catch (err) {
        console.error(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Product not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route   PATCH api/product/:product_id
// @desc    Update product by id
// @access  Private
router.patch('/:product_id', auth, async (req, res) => {

    const { name, wholesalePrice, retailPrice, wholesaler, description, image } = req.body;

    let productFields = {};

    if (name) productFields.name = name;
    if (wholesalePrice) productFields.wholesalePrice = wholesalePrice;
    if (retailPrice) productFields.retailPrice = retailPrice;
    if (wholesaler) productFields.wholesaler = wholesaler;
    if (description) productFields.description = description;
    if (image) productFields.image = image;

    try {

        const product = await Product.findByIdAndUpdate({ _id: req.params.product_id }, productFields);

        if (!product) {
            return res.status(400).json({ msg: 'Product not found' });
        }

        await product.save();

        res.send(product);

    } catch (err) {
        console.error(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Product not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/product/:product_id
// @desc    Delete product by id
// @access  Private

router.delete('/:product_id', auth, async (req, res) => {
    try {

        await Product.findByIdAndRemove({ _id: req.params.product_id });

        res.send('Product Deleted');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;