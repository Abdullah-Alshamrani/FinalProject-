-- *************************************************************
-- Abdullah Alshamrani
-- Create the database
-- *************************************************************

CREATE DATABASE patient_crud;
USE patient_crud;

-- *************************************************************
-- Create Patients table to store patient information
-- *************************************************************

CREATE TABLE Patients (
    PatientID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each patient
    Name VARCHAR(100) NOT NULL, -- Patient's full name
    DateOfBirth DATE NOT NULL, -- Patient's date of birth
    PhoneNumber VARCHAR(15) NOT NULL, -- Patient's phone number
    EmailAddress VARCHAR(100), -- Optional email address of the patient
    InsuranceProvider VARCHAR(100), -- Name of the patient's insurance provider
    Address TEXT, -- Patient's residential address
    Gender ENUM('Male', 'Female', 'Other'), -- Gender of the patient
    EmergencyContactName VARCHAR(100), -- Emergency contact person's name
    EmergencyContactPhone VARCHAR(15), -- Emergency contact person's phone number
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP -- Record last updated timestamp
);

-- *************************************************************
-- Create Appointments table to manage patient appointments
-- *************************************************************

CREATE TABLE Appointments (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each appointment
    PatientID INT, -- Foreign key linking to Patients table
    DoctorName VARCHAR(100) NOT NULL, -- Name of the doctor for the appointment
    AppointmentDate DATE NOT NULL, -- Date of the appointment
    AppointmentTime TIME NOT NULL, -- Time of the appointment
    Notes TEXT, -- Additional notes for the appointment
    AppointmentType ENUM('Checkup', 'Follow-up', 'Consultation'), -- Type of the appointment
    Status ENUM('Scheduled', 'Completed', 'Cancelled'), -- Status of the appointment
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Record last updated timestamp
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID) -- Relationship to Patients table
);

-- *************************************************************
-- Create MedicalRecords table to store patient medical records
-- *************************************************************

CREATE TABLE MedicalRecords (
    RecordID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each medical record
    PatientID INT, -- Foreign key linking to Patients table
    Diagnosis TEXT NOT NULL, -- Medical diagnosis details
    TreatmentPlan TEXT, -- Treatment plan prescribed for the patient
    Prescriptions TEXT, -- Prescribed medications
    RecordDate DATE NOT NULL, -- Date when the medical record was created
    Allergies TEXT, -- Patient's allergies
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Record last updated timestamp
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID) -- Relationship to Patients table
);

-- *************************************************************
-- Create Billing table to handle billing information
-- *************************************************************

CREATE TABLE Billing (
    BillID INT AUTO_INCREMENT PRIMARY KEY, -- Unique identifier for each bill
    PatientID INT, -- Foreign key linking to Patients table
    AmountDue DECIMAL(10, 2) NOT NULL, -- Total amount due for the patient
    DueDate DATE NOT NULL, -- Due date for the bill
    PaymentStatus ENUM('Paid', 'Pending', 'Unpaid'), -- Payment status
    PaymentMethod ENUM('Credit Card', 'Cash', 'Insurance'), -- Payment method used
    PaidDate DATETIME, -- Date when the payment was made
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP, -- Record creation timestamp
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Record last updated timestamp
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID) -- Relationship to Patients table
);

-- *************************************************************
-- Insert sample data into Patients table
-- *************************************************************

INSERT INTO Patients (Name, DateOfBirth, PhoneNumber, EmailAddress, InsuranceProvider, Gender) 
VALUES ('John Doe', '1990-01-01', '1234567890', 'johndoe@example.com', 'ABC Insurance', 'Male');

-- *************************************************************
-- Insert sample data into Appointments table
-- *************************************************************

INSERT INTO Appointments (PatientID, DoctorName, AppointmentDate, AppointmentTime, AppointmentType, Status)
VALUES (1, 'Dr. Smith', '2024-11-15', '10:00:00', 'Checkup', 'Scheduled');

-- *************************************************************
-- Display all tables in the database
-- *************************************************************

SHOW TABLES;

-- *************************************************************
-- Retrieve all records from the Patients table
-- *************************************************************

SELECT * FROM Patients;

-- *************************************************************
-- Retrieve all appointments for a specific patient
-- *************************************************************

SELECT * FROM Appointments WHERE PatientID = 1;

-- *************************************************************
-- Create indexes for optimization of queries
-- *************************************************************

CREATE INDEX idx_patient_name ON Patients(Name); -- Index on patient names for faster searches
CREATE INDEX idx_patient_dob ON Patients(DateOfBirth); -- Index on date of birth for faster filtering
CREATE INDEX idx_appointment_date ON Appointments(AppointmentDate); -- Index on appointment dates for faster queries

-- *************************************************************
-- Insert another sample record into the Patients table
-- *************************************************************

INSERT INTO Patients (Name, DateOfBirth, PhoneNumber, EmailAddress, InsuranceProvider, Address, Gender, EmergencyContactName, EmergencyContactPhone) 
VALUES 
    ('John Doe', '1990-01-01', '1234567890', 'johndoe@example.com', 'ABC Insurance', '123 Main St', 'Male', 'Jane Doe', '9876543210');

-- *************************************************************
-- Update patient information in the Patients table
-- *************************************************************

UPDATE Patients 
SET 
    PhoneNumber = '0987654321',
    EmailAddress = 'john.doe_updated@example.com',
    Address = '456 Elm St',
    UpdatedAt = NOW()
WHERE 
    PatientID = 1;

-- *************************************************************
-- Delete a patient record if no associated appointments exist
-- *************************************************************

DELETE FROM Patients 
WHERE 
    PatientID = 1
    AND NOT EXISTS (
        SELECT 1 FROM Appointments WHERE Appointments.PatientID = Patients.PatientID
    );

-- *************************************************************
-- Retrieve all patient records
-- *************************************************************

SELECT * FROM Patients;

-- *************************************************************
-- Retrieve patients by specific criteria
-- *************************************************************

SELECT * 
FROM Patients 
WHERE 
    Name LIKE '%John%' 
    AND DateOfBirth = '1990-01-01';
