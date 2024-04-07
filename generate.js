const mysql = require("mysql2");
const { faker } = require("@faker-js/faker");

// Create a MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "revou",
});

// Connect to the database
connection.connect((err) => {
  if (err) throw err;
  console.log("Connected to the database");

  // Generate data for authors table
  const authors = [];
  for (let i = 0; i < 10000; i++) {
    // const author_id = i + 1;
    const author_name = faker.person.fullName();
    authors.push([ author_name]);
  }

  // Generate data for publishers table
  const publishers = [];
  for (let i = 0; i < 1000; i++) {
    // const publisher_id = i + 1;
    const publisher_name = faker.company.name();
    publishers.push([ publisher_name]);
  }

  // Generate data for books table
  const books = [];
  const genres = [
    "Fiction",
    "Non-Fiction",
    "Mystery",
    "Romance",
    "Science Fiction",
    "Fantasy",
  ];
  let startDate = new Date(2000, 0, 1);
  let endDate = new Date(2023, 0, 1);
  for (let i = 0; i < 50000; i++) {
    // const book_id = i + 1;
    const title = faker.lorem.sentence();
    const author_id = faker.number.int({ min: 1, max: 10000 });
    const publisher_id = faker.number.int({ min: 1, max: 1000 });
    const genre = faker.helpers.arrayElement(genres);
    const publication_date = faker.date.between({
      from: startDate,
      to: endDate,
    });
    const price = faker.finance.amount({ min: 9.99, max: 99.99, dec: 2 });
    books.push([
      // book_id,
      title,
      author_id,
      publisher_id,
      genre,
      publication_date,
      price,
    ]);
  }

  // Generate data for sales table
  const sales = [];
  startDate = new Date(2020, 0, 1);
  endDate = new Date(2024, 0, 1);
  for (let i = 0; i < 200000; i++) {
    // const transaction_id = i + 1;
    const book_id = faker.number.int({ min: 1, max: 50000 });
    const sale_date = faker.date.between({ startDate, endDate });
    const quantity = faker.number.int({ min: 1, max: 10 });
    sales.push([ book_id, sale_date, quantity]);
  }

  // Insert data into authors table
  const authorsQuery = "INSERT INTO authors ( author_name) VALUES ?";
  connection.query(authorsQuery, [authors], (err, result) => {
    if (err) throw err;
    console.log(`Inserted ${result.affectedRows} rows into authors table`);
  });

  // Insert data into publishers table
  const publishersQuery =
    "INSERT INTO publishers ( publisher_name) VALUES ?";
  connection.query(publishersQuery, [publishers], (err, result) => {
    if (err) throw err;
    console.log(`Inserted ${result.affectedRows} rows into publishers table`);
  });

  // Insert data into books table
  const booksQuery =
    "INSERT INTO books ( title, author_id, publisher_id, genre, publication_date, price) VALUES ?";
  connection.query(booksQuery, [books], (err, result) => {
    if (err) throw err;
    console.log(`Inserted ${result.affectedRows} rows into books table`);
  });

  // Insert data into sales table
  const salesQuery =
    "INSERT INTO sales ( book_id, sale_date, quantity) VALUES ?";
  connection.query(salesQuery, [sales], (err, result) => {
    if (err) throw err;
    console.log(`Inserted ${result.affectedRows} rows into sales table`);
  });

  // Close the database connection
  connection.end();
});
