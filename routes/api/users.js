const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const User = require('../../models/User');
const { check, validationResult } = require('express-validator');


// @route   POST api/users
// @desc    Register user
// @access  Public
router.post('/', [
    check('firstName', 'First name is required')
        .not()
        .isEmpty(),
    check('lastName', 'Last name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { role, firstName, lastName, email, password, notes } = req.body;

        // see if user exist
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // get users gravatar
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

        user = new User({
            role,
            firstName,
            lastName,
            email,
            avatar,
            password,
            notes
        });

        await user.save();

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(
            payload,
            config.get('jwtSecret'),
            { expiresIn: 360000 },
            (err, token) => {
                if (err) throw err;
                res.json({ token });
            }
        );

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   POST api/users/add
// @desc    Create a user [only Top Admin can do this]
// @access  private
router.post('/add', auth, [
    check('firstName', 'First name is required')
        .not()
        .isEmpty(),
    check('lastName', 'Last name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { role, firstName, lastName, email, password, notes } = req.body;

        // see if user exist
        let user = await User.findOne({ email });

        if (user) {
            return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
        }

        // get users gravatar
        const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

        user = new User({
            role,
            firstName,
            lastName,
            email,
            avatar,
            password,
            notes
        });

        await user.save();

        res.json(user);

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   PATCH api/users/edit
// @desc    Update a user
// @access  private
router.patch('/edit', auth, [
    check('firstName', 'First name is required')
        .not()
        .isEmpty(),
    check('lastName', 'Last name is required')
        .not()
        .isEmpty(),
    check('email', 'Please include a valid email').isEmail(),

], async (req, res) => {

    try {

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { role, firstName, lastName, password, notes } = req.body;

        let email = req.body.email;

        let currentUser = await User.findById({ _id: req.user.id });

        const userFields = {};

        if (currentUser.email !== email) {

            // see if user exist with updated email
            let user = await User.findOne({ email });

            if (user) {
                return res.status(400).json({ errors: [{ msg: 'User already exists' }] });
            }

        }

        if (role) userFields.role = role;

        if (email) {

            userFields.email = email;
            const avatar = gravatar.url(email, { s: '200', r: 'pg', d: 'mm' });

            userFields.avatar = avatar;
        }

        if (firstName) userFields.firstName = firstName;
        if (lastName) userFields.lastName = lastName;
        if (password) {

            // encrypt password
            const salt = await bcrypt.genSalt(10);
            const newPassword = await bcrypt.hash(password, salt);

            userFields.password = newPassword;
        }
        if (notes) userFields.notes = notes;

        currentUser = await User.findOneAndUpdate(
            { _id: req.user.id },
            { $set: userFields },
            { new: true },
        );

        return res.json(currentUser);

    } catch (err) {

        console.error(err.message);
        res.status(500).send('Server Error');
    }

});

// @route   GET api/users
// @desc    Get all users
// @access  Private
router.get('/', auth, async (req, res) => {
    try {

        const users = await User.find();

        if (users.isEmpty) {
            return res.status(400).json({ msg: 'There are no users' });
        }

        res.send(users);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/users/:user_id
// @desc    Delete user by id
// @access  Private

router.delete('/:user_id', auth, async (req, res) => {
    try {

        await User.findByIdAndRemove({ _id: req.params.user_id });

        res.send('User Deleted');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;