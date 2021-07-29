const express = require('express');
const multer = require('multer');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Category = require('../../models/Category');
const ProductCategory = require('../../models/ProductCategory');


// ======================= Role Category ===========================

// @route   POST api/category
// @desc    Create role category
// @access  Private

router.post('/', [
    auth,
    check('name', 'Category name is required').not().isEmpty(),

], async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;

        const category = new Category({ name });
        await category.save();

        res.json(category);

    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }

});

// @route   GET api/category
// @desc    Get all role categories
// @access  Private
router.get('/', auth, async (req, res) => {
    try {

        const categories = await Category.find();

        if (categories.length === 0) {
            return res.status(400).json({ msg: 'There are no categories' });
        }

        res.json(categories);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PATCH api/category/:category_id
// @desc    Update role category by id
// @access  Private
router.patch('/:category_id', auth, async (req, res) => {


    try {

        const { name } = req.body;

        const category = await Category.findByIdAndUpdate({ _id: req.params.category_id }, { name });

        if (!category) {
            return res.status(400).json({ msg: 'Category not found' });
        }

        await category.save();

        res.json({ msg: 'Product updated successfully' });

    } catch (err) {
        console.error(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Category not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/category/:category_id
// @desc    Delete role category by id
// @access  Private

router.delete('/:category_id', auth, async (req, res) => {
    try {

        const category = await Category.findByIdAndRemove({ _id: req.params.category_id });

        res.json(category);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

router.delete('/', auth, async (req, res) => {
    try {

        await Category.remove();

        res.send('All categories deleted');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// ======================= Product Category ===========================



// @route   POST api/category/product
// @desc    Create product category
// @access  Private

router.post('/product', [
    auth,
    check('name', 'Category name is required').not().isEmpty(),

], async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { name } = req.body;

        const category = new ProductCategory({ name });
        await category.save();

        res.json(category);

    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }

});

// @route   GET api/category/product
// @desc    Get all product categories
// @access  Private
router.get('/product', auth, async (req, res) => {
    try {

        const categories = await ProductCategory.find();

        if (categories.length === 0) {
            return res.status(400).json({ msg: 'There are no categories' });
        }

        res.json(categories);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   PATCH api/category/product/:category_id
// @desc    Update product category by id
// @access  Private
router.patch('/product/:category_id', auth, async (req, res) => {

    try {

        const { name } = req.body;

        const category = await ProductCategory.findByIdAndUpdate({ _id: req.params.category_id }, { name });

        if (!category) {
            return res.status(400).json({ msg: 'Product category not found' });
        }

        await category.save();

        res.json({ msg: 'Product updated successfully' });

    } catch (err) {
        console.error(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Product category not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/category/product/:category_id
// @desc    Delete product category by id
// @access  Private

router.delete('/product/:category_id', auth, async (req, res) => {
    try {

        const productCategory = await ProductCategory.findByIdAndRemove({ _id: req.params.category_id });

        res.json(productCategory);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/category/product
// @desc    Delete all product categories
// @access  Private
router.delete('/product', auth, async (req, res) => {
    try {

        await ProductCategory.remove();

        res.send('All categories deleted');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;