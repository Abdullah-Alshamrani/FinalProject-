//Hussam Alanazi 
//Database Management Systems
//12/5/2024
//Final Project - Health Database System -->

const mysql = require('mysql2');
const dotenv = require('dotenv');

// Load environment variables from .env file
dotenv.config();

// Create a connection pool for the MySQL database
const pool = mysql.createPool({
    host: process.env.DB_HOST, // Database host
    user: process.env.DB_USER, // Database username
    password: process.env.DB_PASSWORD, // Database password
    database: process.env.DB_NAME, // Database name
});

// Test the database connection
pool.getConnection((err, connection) => {
    if (err) {
        console.error('Database connection failed:', err.message);
    } else {
        console.log('Connected to the database');
        connection.release();
    }
});

// Export the pool object for query execution
module.exports = pool.promise();
