const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Product = require('../../models/Product');
const upload = require('../../utils/fileUploadMiddleware');


// @route   POST api/product
// @desc    Create or update product
// @access  Private

router.post('/', [
    auth,
    upload.single('image'),
    check('name', 'Product name is required').not().isEmpty(),
    check('wholesalePrice', 'Wholesale price is required').not().isEmpty(),
    check('retailPrice', 'Retail price is required').not().isEmpty(),
    check('wholesaler', 'Wholesaler is required').not().isEmpty(),
    check('purchaseDate', 'Purchase date is required').not().isEmpty(),
    check('quantity', 'Quantity is required').not().isEmpty(),
    check('warrantyDate', 'Warranty date is required').not().isEmpty(),
    check('maxDiscount', 'Maximum discount is required').not().isEmpty(),
    check('image', 'Image is required').not().isEmpty(),

], async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            wholesalePrice,
            retailPrice,
            wholesaler,
            description,
            purchaseDate,
            quantity,
            warrantyDate,
            maxDiscount
        } = req.body;

        let image = '';
        if (req.file) image = req.file.filename;

        const product = new Product({
            name,
            wholesalePrice,
            retailPrice,
            wholesaler,
            description,
            purchaseDate,
            quantity,
            warrantyDate,
            maxDiscount,
            image
        });

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

        res.json(product);

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
router.patch('/:product_id', [
    auth,
    upload.single('image')
], async (req, res) => {


    try {

        const { name, wholesalePrice, retailPrice, wholesaler, description } = req.body;

        let productFields = {};

        let image;

        if (req.file) image = req.file.filename;

        if (name) productFields.name = name;
        if (wholesalePrice) productFields.wholesalePrice = wholesalePrice;
        if (retailPrice) productFields.retailPrice = retailPrice;
        if (wholesaler) productFields.wholesaler = wholesaler;
        if (description) productFields.description = description;
        if (image) productFields.image = image;

        const product = await Product.findByIdAndUpdate({ _id: req.params.product_id }, productFields);

        if (!product) {
            return res.status(400).json({ msg: 'Product not found' });
        }

        await product.save();

        res.json(product);

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

router.delete('/', auth, async (req, res) => {
    try {

        await Product.remove();

        res.send('All products deleted');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;