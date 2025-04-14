# Create Database
CREATE DATABASE LMS_TEST;

# Use the database
USE LMS_TEST;

# Create Book table
CREATE TABLE Book(
	Book_ID INT PRIMARY KEY,
    Title VARCHAR(255),
    Author VARCHAR(255),
    Genre VARCHAR(100),
    ISBN VARCHAR(20),
    Publisher VARCHAR(100),
    Publication_year INT,
    Total_copies INT,
    Available_copies INT
);

# Create BookCopy table
CREATE TABLE BookCopy(
Copy_ID INT PRIMARY KEY,
Book_ID INT,
Availiablity_status VARCHAR(20),
FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

# Create Member Table
CREATE TABLE Member(
Member_ID INT PRIMARY KEY,
Member_name VARCHAR(255),
Member_email VARCHAR(100),
Member_phone VARCHAR(15),
Member_address VARCHAR(255),
Membership_type VARCHAR(50),
Membership_expiration_data DATE,
Registration_date DATE,
Membership_status VARCHAR(20)
);

# Loan Table
CREATE TABLE Loan(
Loan_ID INT PRIMARY KEY,
Member_ID INT,
Copy_ID INT,
Issue_date DATE,
Due_date DATE,
Return_date DATE,
Loan_status VARCHAR(20),
Fine_amount DECIMAL(10,2),
FOREIGN KEY (Member_ID) REFERENCES Member(Member_ID),
FOREIGN KEY (Copy_ID) REFERENCES BookCopy(Copy_ID)
);

# Reservation Table
CREATE TABLE RESERVATION(
Reservation_ID INT PRIMARY KEY,
Member_ID INT,
Book_ID INT,
Reservation_date DATE,
Reservation_status VARCHAR(20),
FOREIGN KEY (Member_ID) REFERENCES Member(Member_ID),
FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);
