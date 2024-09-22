const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const VendorPaymentsSchema = new Schema({
  transaction_id: {
    type: String,
    required: true,
    unique: true,
  },
  vendor_id: {
    type: String,
    required: true,
  },
  invoice_no: {
    type: Number,
    required: true,
  },
  payment_duedate: {
    type: Date,
    default: new Date(),
    required: true,
  },
  payment_date: {
    type: Date,
  },
  amount: {
    type: Number,
    required: true,
  },
  balance_amount: {
    type: Number,
    required: true,
  },
  payment_status: {
    type: String,
    enum: ['Unpaid', 'Partially Paid', 'Fully Paid'],
    required: true,
  }
}, {
  timestamps: true, // Adds createdAt and updatedAt fields
});

module.exports = mongoose.model('VendorPayments', VendorPaymentsSchema);