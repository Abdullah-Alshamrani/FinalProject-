//Hussam Alanazi 
//Database Management Systems
//12/5/2024
//Final Project - Health Database System -->


const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// Import route files
const patientRoutes = require('./routes/patientRoutes');
const medicalRecordsRoutes = require('./routes/medicalRecordsRoutes');
const appointmentRoutes = require('./routes/appointmentRoutes');
const billingRoutes = require('./routes/billingRoutes');
const { errorHandler } = require('./middleware/errorMiddleware');

// Initialize environment variables
dotenv.config();

// Initialize express app
const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors()); // Enable Cross-Origin Resource Sharing
app.use(bodyParser.json()); // Parse JSON data
app.use(bodyParser.urlencoded({ extended: true })); // Parse URL-encoded data

// Serve static files (HTML, CSS, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Routes
app.use('/PAPatients', patientRoutes); // Patients routes
app.use('/PARecords', medicalRecordsRoutes); // Medical records routes
app.use('/PAAppointments', appointmentRoutes); // Appointments routes
app.use('/PABilling', billingRoutes); // Billing routes

// Health check route (optional, for testing server status)
app.get('/health', (req, res) => {
    res.status(200).json({ message: 'Server is healthy and running' });
});

// Error handling middleware
app.use(errorHandler);

// Start the server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
