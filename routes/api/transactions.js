const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');

const Transaction = require('../../models/Transaction');
const Product = require('../../models/Product');
const Client = require('../../models/Client');

// @route   POST api/client/transaction/:client_id
// @desc    Create a transaction item
// @access  Private

router.post('/:client_id', [
    auth
], async (req, res) => {
    try {

        const client = await Client.findOne({ _id: req.params.client_id });

        const { details, totalAmountPaid, transactionTotal, items } = req.body;

        const transactionFields =
        {
            clientId: req.params.client_id,
            cwnerFirstName: client.firstName,
            ownerLastName: client.lastName,
            details,
            totalAmountPaid,
            transactionTotal,
            amountDue: transactionTotal - totalAmountPaid,
            items
        };

        const transaction = new Transaction(transactionFields);
        await transaction.save();

        res.json(transaction);

    } catch (err) {
        console.error(err.message);
        res.status(400).send('Server Error');
    }

});

// @route   GET api/client/transaction/all
// @desc    Get all transactions
// @access  Private
router.get('/all', auth, async (req, res) => {
    try {

        const transactions = await Transaction.find();

        if (transactions.isEmpty) {
            return res.status(400).json({ msg: 'There are no transactions' });
        }

        res.send(transactions);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/client/transaction/client/:client_id
// @desc    Get all transactions by Client ID
// @access  Private
router.get('/client/:client_id', auth, async (req, res) => {
    try {

        const transactions = await Transaction.find({ clientId: req.params.client_id });

        if (transactions.isEmpty) {
            return res.status(400).json({ msg: 'There are no transactions' });
        }

        res.send(transactions);

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/client/transaction/:transaction_id
// @desc    Get transaction by id
// @access  Private
router.get('/:transaction_id', auth, async (req, res) => {
    try {

        const transaction = await Transaction.findOne({ _id: req.params.transaction_id });

        if (!transaction) {
            return res.status(400).json({ msg: 'Transaction not found' });
        }

        res.send(transaction);

    } catch (err) {
        console.error(err.message);

        if (err.kind == 'ObjectId') {
            return res.status(400).json({ msg: 'Transaction not found' });
        }

        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/client/transaction/:transaction_id
// @desc    Delete transaction by id
// @access  Private

router.delete('/:transaction_id', auth, async (req, res) => {
    try {

        await Transaction.findByIdAndRemove(req.params.transaction_id);

        res.send('Transaction Deleted');

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});


module.exports = router;