const express = require('express');
const router = express.Router();
const VendorPayment = require('../models/vendorPayment');

// Create a new Invoice for Vendor
router.post('/', async (req, res) => {
  try {
    const vendorPayment = new VendorPayment(req.body);
    const savedPayment = await vendorPayment.save();
    res.json(savedPayment);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all Invoices
router.get('/', async (req, res) => {
  try {
    const vendorPayments = await VendorPayment.find();
    res.json(vendorPayments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get Invoices by payment_status [Unpaid, Partially Unpaid, Fully Paid]
router.get('/:payment_status', async (req, res) => {
  try {
    const vendorPayments = await VendorPayment.find({payment_status:req.params.payment_status});
    res.json(vendorPayments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific Vendor invoices
router.get('/:vendor_id', async (req, res) => {
  try {
    const vendorPayments = await VendorPayment.find({vendor_id:vendor_id});
    res.json(vendorPayments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update a Vendor Payment for a transaction
router.put('/:transaction_id', async (req, res) => {
  try {
    const transaction = await VendorPayment.find({transaction_id:req.params.transaction_id});
    if(transaction.length > 0) {
        const vendorPayment = new VendorPayment(req.body);
        transaction[0].balance_amount = transaction[0].balance_amount - vendorPayment.amount;
        if (transaction[0].balance_amount <= 0){
            transaction[0].payment_status = "Fully Paid"
        } else {
            transaction[0].payment_status = "Partially Paid"
        }
        transaction[0].payment_date = new Date();

        const savedPayment = await VendorPayment.updateOne({transaction_id:req.params.transaction_id},transaction[0]);
        res.json(savedPayment);
    } else {
            res.status(400).json({ message: "No such transaction found" });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
});

// Delete a Vendor transaction
router.delete('/:transaction_id', async (req, res) => {
try {
    const savedPayment = await VendorPayment.deleteOne({transaction_id:req.params.transaction_id})
    console.log(savedPayment);
    res.json({ message: 'Vendor Payment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;