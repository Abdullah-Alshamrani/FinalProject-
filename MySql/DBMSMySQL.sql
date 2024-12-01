USE dbmsproject;

CREATE TABLE Patients (
    PatientID INT AUTO_INCREMENT PRIMARY KEY,
    Name VARCHAR(100) NOT NULL,
    DateOfBirth DATE NOT NULL,
    PhoneNumber VARCHAR(15) NOT NULL,
    EmailAddress VARCHAR(100),
    InsuranceProvider VARCHAR(100),
    Address TEXT,
    Gender ENUM('Male', 'Female', 'Other'),
    EmergencyContactName VARCHAR(100),
    EmergencyContactPhone VARCHAR(15),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE Appointments (
    AppointmentID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    DoctorName VARCHAR(100) NOT NULL,
    AppointmentDate DATE NOT NULL,
    AppointmentTime TIME NOT NULL,
    Notes TEXT,
    AppointmentType ENUM('Checkup', 'Follow-up', 'Consultation'),
    Status ENUM('Scheduled', 'Completed', 'Cancelled'),
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
);

CREATE TABLE MedicalRecords (
    RecordID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    Diagnosis TEXT NOT NULL,
    TreatmentPlan TEXT,
    Prescriptions TEXT,
    RecordDate DATE NOT NULL,
    Allergies TEXT,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
);


CREATE TABLE Billing (
    BillID INT AUTO_INCREMENT PRIMARY KEY,
    PatientID INT,
    AmountDue DECIMAL(10, 2) NOT NULL,
    DueDate DATE NOT NULL,
    PaymentStatus ENUM('Paid', 'Pending', 'Unpaid'),
    PaymentMethod ENUM('Credit Card', 'Cash', 'Insurance'),
    PaidDate DATETIME,
    CreatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    UpdatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (PatientID) REFERENCES Patients(PatientID)
);


--  Sample data insertation
INSERT INTO Patients (Name, DateOfBirth, PhoneNumber, EmailAddress, InsuranceProvider, Gender) 
VALUES ('John Doe', '1990-01-01', '1234567890', 'johndoe@example.com', 'ABC Insurance', 'Male');

SELECT * FROM Appointments WHERE PatientID = 1;
SHOW TABLES;



INSERT INTO Appointments (PatientID, DoctorName, AppointmentDate, AppointmentTime, AppointmentType, Status)
VALUES (1, 'Dr. Smith', '2024-11-15', '10:00:00', 'Checkup', 'Scheduled');


SELECT * FROM Patients;
SELECT * FROM Appointments WHERE PatientID = 1;





-- Create Indexes for Optimization
CREATE INDEX idx_patient_name ON Patients(Name);
CREATE INDEX idx_patient_dob ON Patients(DateOfBirth);
CREATE INDEX idx_appointment_date ON Appointments(AppointmentDate);

-- Insert Query (Task 3.3.1)
INSERT INTO Patients (Name, DateOfBirth, PhoneNumber, EmailAddress, InsuranceProvider, Address, Gender, EmergencyContactName, EmergencyContactPhone) 
VALUES 
    ('John Doe', '1990-01-01', '1234567890', 'johndoe@example.com', 'ABC Insurance', '123 Main St', 'Male', 'Jane Doe', '9876543210');

-- Update Query (Task 3.3.2)
UPDATE Patients 
SET 
    PhoneNumber = '0987654321',
    EmailAddress = 'john.doe_updated@example.com',
    Address = '456 Elm St',
    UpdatedAt = NOW()
WHERE 
    PatientID = 1;

-- Delete Query (Task 3.3.3)
DELETE FROM Patients 
WHERE 
    PatientID = 1
    AND NOT EXISTS (
        SELECT 1 FROM Appointments WHERE Appointments.PatientID = Patients.PatientID
    );

-- Select Query (Task 3.3.4) - Retrieve all patient records
SELECT * FROM Patients;

-- Select Query (Task 3.3.4) - Retrieve patients by criteria
SELECT * 
FROM Patients 
WHERE 
    Name LIKE '%John%' 
    AND DateOfBirth = '1990-01-01';


