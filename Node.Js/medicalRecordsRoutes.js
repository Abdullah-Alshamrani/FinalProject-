//Hussam Alanazi 
//Database Management Systems
//12/5/2024
//Final Project - Health Database System -->

const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Add Medical Record
router.post('/add', async (req, res) => {
    try {
        const { patientId, diagnosis, appointmentDate, treatmentPlan, prescriptions, recordDate, allergies } = req.body;

        if (!patientId || !diagnosis || !recordDate) {
            return res.status(400).json({ message: 'Patient ID, Diagnosis, and Record Date are required.' });
        }

        const [result] = await db.execute(
            `INSERT INTO MedicalRecords 
            (PatientID, Diagnosis, AppointmentDate, TreatmentPlan, Prescriptions, RecordDate, Allergies) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,
            [patientId, diagnosis, appointmentDate || null, treatmentPlan || null, prescriptions || null, recordDate, allergies || null]
        );

        res.status(201).json({ message: 'Medical record added successfully', recordId: result.insertId });
    } catch (error) {
        console.error('Error adding medical record:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete Medical Record
router.post('/delete', async (req, res) => {
    try {
        const { patientId } = req.body;

        if (!patientId) {
            return res.status(400).json({ message: 'Patient ID is required for deletion.' });
        }

        const [result] = await db.execute(
            `DELETE FROM MedicalRecords WHERE PatientID = ?`,
            [patientId]
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Medical record not found.' });
        }

        res.status(200).json({ message: 'Medical record deleted successfully.' });
    } catch (error) {
        console.error('Error deleting medical record:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Search Medical Records
router.post('/search', async (req, res) => {
    try {
        const { patientId } = req.body;

        if (!patientId) {
            return res.status(400).json({ message: 'Patient ID is required for searching.' });
        }

        const [records] = await db.execute(
            `SELECT * FROM MedicalRecords WHERE PatientID = ?`,
            [patientId]
        );

        if (records.length === 0) {
            return res.status(404).json({ message: 'No medical records found.' });
        }

        res.status(200).json({ records });
    } catch (error) {
        console.error('Error searching medical records:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update Medical Record
router.post('/update', async (req, res) => {
    try {
        const { patientId, diagnosis, appointmentDate, treatmentPlan, prescriptions, recordDate, allergies } = req.body;

        if (!patientId) {
            return res.status(400).json({ message: 'Patient ID is required for updating.' });
        }

        const updates = [];
        const values = [];

        if (diagnosis) {
            updates.push('Diagnosis = ?');
            values.push(diagnosis);
        }
        if (appointmentDate) {
            updates.push('AppointmentDate = ?');
            values.push(appointmentDate);
        }
        if (treatmentPlan) {
            updates.push('TreatmentPlan = ?');
            values.push(treatmentPlan);
        }
        if (prescriptions) {
            updates.push('Prescriptions = ?');
            values.push(prescriptions);
        }
        if (recordDate) {
            updates.push('RecordDate = ?');
            values.push(recordDate);
        }
        if (allergies) {
            updates.push('Allergies = ?');
            values.push(allergies);
        }

        if (updates.length === 0) {
            return res.status(400).json({ message: 'No fields provided for update.' });
        }

        values.push(patientId);

        const [result] = await db.execute(
            `UPDATE MedicalRecords SET ${updates.join(', ')} WHERE PatientID = ?`,
            values
        );

        if (result.affectedRows === 0) {
            return res.status(404).json({ message: 'Medical record not found.' });
        }

        res.status(200).json({ message: 'Medical record updated successfully.' });
    } catch (error) {
        console.error('Error updating medical record:', error.message);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
