//Hussam Alanazi 
//Database Management Systems
//12/5/2024
//Final Project - Health Database System -->


const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add Billing Info
router.post('/add', async (req, res) => {
    try {
        const { patientId, amountDue, dueDate, paymentStatus, paymentMethod, paidDate } = req.body;

        if (!patientId || !amountDue || !dueDate || !paymentStatus || !paymentMethod) {
            return res.status(400).json({ message: 'All required fields must be filled.' });
        }

        const [result] = await db.execute(
            `INSERT INTO Billing (PatientID, AmountDue, DueDate, PaymentStatus, PaymentMethod, PaidDate)
             VALUES (?, ?, ?, ?, ?, ?)`,
            [patientId, amountDue, dueDate, paymentStatus, paymentMethod, paidDate || null]
        );

        res.status(201).json({ message: 'Billing info added successfully', billId: result.insertId });
    } catch (error) {
        console.error('Error adding billing info:', error.message);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
});

module.exports = router;
