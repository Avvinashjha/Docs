CREATE TABLE Genre(
    Genre_ID INT PRIMARY KEY,
    Genre_name VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE Author (
    Author_ID INT PRIMARY KEY,
    Author_name VARCHAR(255) NOT NULL UNIQUE
);

CREATE TABLE Book (
    Book_ID INT PRIMARY KEY,
    Title VARCHAR(255),
    ISBN VARCHAR(20) UNIQUE,
    Publisher VARCHAR(255),
    Publication_year INT,
    Total_copies INT,
    Available_copies INT
);

CREATE TABLE BookGenre (
    Book_ID INT,
    Genre_ID INT,
    PRIMARY KEY (Book_ID, Genre_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID),
    FOREIGN KEY (Genre_ID) REFERENCES Genre(Genre_ID)
);

CREATE TABLE BookAuthor (
    Book_ID INT,
    Author_ID INT,
    PRIMARY KEY (Book_ID, Author_ID),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID),
    FOREIGN KEY (Author_ID) REFERENCES Author(Author_ID)
);

CREATE TABLE BookCopy (
    Copy_ID INT PRIMARY KEY,
    Book_ID INT,
    Availability_status VARCHAR(20),
    FOREIGN KEY (Book_ID) REFERENCES Book(Book_ID)
);

CREATE TABLE Member (
    Member_ID INT PRIMARY KEY,
    Name VARCHAR(255),
    Email VARCHAR(255) UNIQUE,
    Phone VARCHAR(15),
    Address VARCHAR(255),
    Registration_date DATE
);

CREATE TABLE MembershipPlan (
    Plan_ID INT PRIMARY KEY,
    Plan_name VARCHAR(100),
    Description TEXT,
    Duration_in_months INT,
    Price DECIMAL(10, 2)
);

CREATE TABLE MembershipDetails (
    Membership_ID INT PRIMARY KEY,
    Member_ID INT,
    Plan_ID INT,
    Subscription_start_date DATE,
    Subscription_expiry_date DATE,
    Membership_status VARCHAR(20), -- e.g., Active, Inactive, Expired
    FOREIGN KEY (Member_ID) REFERENCES Member(Member_ID),
    FOREIGN KEY (Plan_ID) REFERENCES MembershipPlan(Plan_ID)
);