const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const axios = require('axios');

// model
const Wholesaler = require('../../models/Wholesaler');


// @route   POST api/wholesaler
// @desc    Create wholesaler
// @access  Private

router.post('/', [
    auth,
    check('name', 'Wholesaler name is required').not().isEmpty(),
    check('cnpj', 'CNPJ is required').not().isEmpty(),
    check('stateRegistration', 'State Registration is required').not().isEmpty(),
    check('phone', 'Phone number is required').not().isEmpty(),

], async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const {
            name,
            cnpj,
            stateRegistration,
            phone,
            email,
            address,
            staff,
            notes
        } = req.body;

        const wholesaler = new Wholesaler({
            name,
            cnpj,
            stateRegistration,
            phone,
            email,
            address,
            staff,
            notes
        });

        await wholesaler.save();

        res.json(wholesaler);

    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }

});

// @route   GET api/wholesaler
// @desc    Get all wholesalers
// @access  Private
router.get('/', auth, async (req, res) => {
    try {

        const wholesalers = await Wholesaler.find();

        if (wholesalers.isEmpty) {
            return res.status(400).json({ msg: 'There are no wholesalers' });
        }

        res.send(wholesalers);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/wholesaler/:wholesaler_id
// @desc    Get wholesaler by id
// @access  Private
router.get('/:wholesaler_id', auth, async (req, res) => {
    try {

        const wholesaler = await Wholesaler.findOne({ _id: req.params.wholesaler_id });

        if (!wholesaler) {
            return res.status(400).json({ msg: 'This wholesaler does not exist' });
        }

        res.json(wholesaler);

    } catch (err) {
        console.error(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Wholesaler not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route   PATCH api/wholesaler/:wholesaler_id
// @desc    Update wholesaler by id
// @access  Private
router.patch('/:wholesaler_id', [
    auth,
], async (req, res) => {

    try {

        const {
            name,
            cnpj,
            stateRegistration,
            phone,
            email,
            address,
            staff,
            notes
        } = req.body;

        let wholesalerFields = {};

        if (name) wholesalerFields.name = name;
        if (cnpj) wholesalerFields.cnpj = cnpj;
        if (stateRegistration) wholesalerFields.stateRegistration = stateRegistration;
        if (phone) wholesalerFields.phone = phone;
        if (email) wholesalerFields.email = email;
        if (address) wholesalerFields.address = address;
        if (notes) wholesalerFields.notes = notes;
        if (staff && staff.length > 0) wholesalerFields.staff = staff;

        // const wholesaler = await Wholesaler.findByIdAndUpdate({ _id: req.params.wholesaler_id }, wholesalerFields);

        const wholesaler = await Wholesaler.findOneAndUpdate(
            { _id: req.params.wholesaler_id },
            { $set: wholesalerFields },
            { new: true },
        );

        if (!wholesaler) {
            return res.status(400).json({ msg: 'Wholesaler not found' });
        }

        await wholesaler.save();

        res.json(wholesaler);

    } catch (err) {
        console.error(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Wholesaler not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/wholesaler/:wholesaler_id
// @desc    Delete wholesaler by id
// @access  Private

router.delete('/:wholesaler_id', auth, async (req, res) => {
    try {

        await Wholesaler.findByIdAndRemove({ _id: req.params.wholesaler_id });

        res.send('Wholesaler Deleted');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   DELETE api/wholesaler
// @desc    Delete all wholesalers
// @access  Private

router.delete('/', auth, async (req, res) => {
    try {

        await Wholesaler.remove();

        res.send('All wholesalers deleted');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


// @route   POST api/wholesaler/search/address
// @desc    Get address based on zip code
// @access  Private

router.post('/search/address', auth, async (req, res) => {
    try {

        const config = {
            headers: {
                "Accept": "application/json",

            }
        };

        const address = await axios.get(`http://cep.la/${req.body.zipCodeSearch}`, config);

        res.json(address.data);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;