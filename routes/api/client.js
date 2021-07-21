const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const gravatar = require('gravatar');
const { check, validationResult } = require('express-validator');

const Client = require('../../models/Client.js');

// @route   POST api/client
// @desc    Create client
// @access  Private

router.post('/', [
    auth,
    check('firstName', 'First Name is required')
        .not()
        .isEmpty(),
    check('lastName', 'Last Name is required')
        .not()
        .isEmpty(),
    check('phone', 'Please include a valid phone number').isMobilePhone(),

], async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { firstName, lastName, email, phone, address, notes } = req.body;
        let avatar = '';

        let clientFields = {};

        if (firstName) clientFields.firstName = firstName;
        if (lastName) clientFields.lastName = lastName;
        if (phone) clientFields.phone = phone;
        if (address) clientFields.address = address;
        if (notes) clientFields.notes = notes;

        if (email) {

            // get users gravatar
            avatar = gravatar.url(email, {
                s: '200',
                r: 'pg',
                d: 'mm'
            });

            clientFields.email = email;
            clientFields.avatar = avatar;
        }

        const client = new Client(clientFields);
        await client.save();

        res.json(client);

    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }

});

// @route   GET api/clients
// @desc    Get all clients
// @access  Private
router.get('/', auth, async (req, res) => {
    try {

        const clients = await Client.find();

        if (clients.isEmpty) {
            return res.status(400).json({ msg: 'There are no clients' });
        }

        res.send(clients);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/client/:client_id
// @desc    Get client by id
// @access  Private
router.get('/:client_id', auth, async (req, res) => {
    try {

        const client = await Client.findOne({ _id: req.params.client_id });

        if (!client) {
            return res.status(400).json({ msg: 'Client not found' });
        }

        res.send(client);

    } catch (err) {
        console.error(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Client not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/client/:client_id
// @desc    Delete client by id
// @access  Private

router.delete('/:client_id', auth, async (req, res) => {
    try {

        await Client.findByIdAndRemove({ _id: req.params.client_id });
        await Transaction.deleteMany({ clientId: req.params.client_id });

        res.send('Client Deleted');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;