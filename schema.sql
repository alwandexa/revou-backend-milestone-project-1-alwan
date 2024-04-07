DROP table sales;

DROP table books;

DROP table authors;

DROP table publishers;

CREATE TABLE authors (
    author_id INT AUTO PRIMARY KEY AUTO_INCREMENT,
    author_name VARCHAR(100)
);

CREATE TABLE publishers (
    publisher_id INT PRIMARY KEY AUTO_INCREMENT,
    publisher_name VARCHAR(100)
);

CREATE TABLE books (
    book_id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(255),
    author_id INT,
    publisher_id INT,
    genre VARCHAR(50),
    publication_date DATE,
    price DECIMAL(10, 2),
    FOREIGN KEY (author_id) REFERENCES authors(author_id),
    FOREIGN KEY (publisher_id) REFERENCES publishers(publisher_id)
);

CREATE TABLE sales (
    transaction_id INT PRIMARY KEY AUTO_INCREMENT,
    book_id INT,
    sale_date DATE,
    quantity INT,
    FOREIGN KEY (book_id) REFERENCES books(book_id)
);
