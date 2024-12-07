//Hussam Alanazi 
//Database Management Systems
//12/5/2024
//Final Project - Health Database System -->

const db = require('../config/db');

// Add Patient Controller
exports.addPatient = async (req, res, next) => {
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
        next(error);
    }
};

// Update Patient Controller
exports.updatePatient = async (req, res, next) => {
    // Similar implementation to previous code
};

// Delete Patient Controller
exports.deletePatient = async (req, res, next) => {
    // Similar implementation to previous code
};

// Get Patients Controller
exports.getPatients = async (req, res, next) => {
    // Similar implementation to previous code
};
