//Hussam Alanazi 
//Database Management Systems
//12/5/2024
//Final Project - Health Database System -->

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add Patient
router.post('/add', async (req, res) => {
    try {
        const {
            name,
            dateOfBirth,
            phoneNumber,
            emailAddress,
            insuranceProvider,
            gender,
            address,
            emergencyContactName,
            emergencyContactPhone,
        } = req.body;

        if (!name || !dateOfBirth || !phoneNumber || !emailAddress || !insuranceProvider || !gender) {
            return res.status(400).json({ message: 'All required fields must be filled.' });
        }

        const [result] = await db.execute(
            `INSERT INTO Patients 
            (Name, DateOfBirth, PhoneNumber, EmailAddress, InsuranceProvider, Gender, Address, EmergencyContactName, EmergencyContactPhone) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                name,
                dateOfBirth,
                phoneNumber,
                emailAddress,
                insuranceProvider,
                gender,
                address || null,
                emergencyContactName || null,
                emergencyContactPhone || null,
            ]
        );

        res.status(201).json({ message: 'Patient added successfully', patientId: result.insertId });
    } catch (error) {
        console.error('Error adding patient:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete Patient
router.post('/delete', async (req, res) => {
    try {
        const { patientId } = req.body;

        if (!patientId) {
            return res.status(400).json({ message: 'Patient ID is required for deletion.' });
        }

        const [result] = await db.execute(
            `DELETE FROM Patients 
             WHERE PatientID = ? 
             AND NOT EXISTS (
                 SELECT 1 FROM Appointments WHERE Appointments.PatientID = Patients.PatientID
             )`,
            [patientId]
        );

        if (result.affectedRows === 0) {
            return res.status(400).json({ message: 'Cannot delete patient with existing appointments.' });
        }

        res.status(200).json({ message: 'Patient deleted successfully.' });
    } catch (error) {
        console.error('Error deleting patient:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Search Patient
router.post('/search', async (req, res) => {
    try {
        const { patientId } = req.body;

        let query = 'SELECT * FROM Patients';
        const params = [];

        if (patientId) {
            query += ' WHERE PatientID = ?';
            params.push(patientId);
        }

        const [records] = await db.execute(query, params);

        if (records.length === 0) {
            return res.status(404).json({ message: 'No patients found.' });
        }

        res.status(200).json({ patients: records });
    } catch (error) {
        console.error('Error searching patients:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update Patient
router.post('/update', async (req, res) => {
    try {
        const { patientId, phoneNumber, emailAddress, address } = req.body;

        if (!patientId) {
            return res.status(400).json({ message: 'Patient ID is required for updating.' });
        }

        const updates = [];
        const values = [];

        if (phoneNumber) {
            updates.push('PhoneNumber = ?');
            values.push(phoneNumber);
        }
        if (emailAddress) {
            updates.push('EmailAddress = ?');
            values.push(emailAddress);
        }
        if (address) {
            updates.push('Address = ?');
            values.push(address);
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: 'No fields provided for update.' });
        }

        values.push(patientId);

        const [result] = await db.execute(
            `UPDATE Patients SET ${updates.join(', ')}, UpdatedAt = NOW() WHERE PatientID = ?`,
            values
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Patient not found.' });
        }

        res.status(200).json({ message: 'Patient updated successfully.' });
    } catch (error) {
        console.error('Error updating patient:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
