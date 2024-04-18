# Backend Milestone Project 1

## 1. Retrieve all books authored by authors whose names start with 'J' and published after 2010.

### Query

```sql
SELECT b.title, b.author_id, b.publication_date
FROM books b
JOIN authors a ON b.author_id = a.author_id
WHERE a.author_name LIKE 'J%' AND b.publication_date > '2010-01-01';
```

### Analysis

- The query performs a join between the `books` and `authors` tables, which can be a potential bottleneck if the tables are large.
- The join condition is on the `author_id` column, which is good to be indexed.
- The query includes a `WHERE` clause with two conditions:

  a. `author_name LIKE 'J%'`

  b. `publication_date > '2010-01-01'`

- The `publication_date` condition can be optimized using an index on the `publication_date` column in the `books` table.

### Optimization

```sql
CREATE INDEX idx_books_author_id ON books (author_id);
CREATE INDEX idx_authors_author_name ON authors (author_name);
CREATE INDEX idx_books_publication_date ON books (publication_date);
```

- Create an index on the `author_id `column in the `books` table to improve the join performance.
- Create an index on the `author_name` column in the `authors` table to improve the performance of the `WHERE` clause.
- Create an index on the `publication_date` column in the `books` table to improve the performance of the `WHERE` clause.

## 2. Retrieve top 10 bestselling books by total sales quantity

### Query

```sql
SELECT b.title, SUM(s.quantity) AS total_sales
FROM books b
JOIN sales s ON b.book_id = s.book_id
GROUP BY b.book_id
ORDER BY total_sales DESC
LIMIT 10;
```

### Analysis

- The main potential bottleneck in this query is the join operation between the `books` and `sales` tables.
- If the `sales` table is large, the join operation can be computationally expensive and slow down the query.

### Optimization

```sql
CREATE INDEX idx_sales_book_id ON sales (book_id);
```

- Create an index on the `book_id` column in the `sales` table to improve the performance of the join.

## 3. Retrieve the average price of books in each genre

### Query

```sql
SELECT genre, AVG(price) AS avg_price
FROM books
GROUP BY genre;
```

### Analysis

- The main bottleneck in this query is the `GROUP BY` operation, which can be computationally expensive, especially if there are a large number of unique genres.
- The full table scan required to perform the aggregation can also be a performance issue if the `books` table is large.

### Optimization

```sql
CREATE INDEX idx_books_genre ON books (genre);
```

- Create an index on the `genre` column in the `books` table. This will improve the performance of the `GROUP BY` operation.

## 4. Retrieve all sales transactions for a specific book

### Query

```sql
SELECT * FROM sales WHERE book_id = 456;
```

### Analysis

- This query is a simple lookup on the `sales` table, filtering the rows by the `book_id` column.
- The query is straightforward and should be relatively fast, as it doesn't involve any joins or complex operations.
- `SELECT *` often retrieving more columns from the database than application really needs to function.

### Optimization

- `book_id` column is indexed by default on MySQL so this query will be faster.
- By selecting required columns only, the query could be faster, for example :
  ```sql
  SELECT sale_date, quantity FROM sales WHERE book_id = 456
  ```

## 5. Retrieve the total sales for each book published in the last year

### Query

```sql
SELECT b.title, SUM(s.quantity) AS total_sales
FROM books b
JOIN sales s ON b.book_id = s.book_id
WHERE b.publication_date >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)
GROUP BY b.book_id;
```

### Analysis

- The main potential bottleneck in this query is the join operation between the `books` and `sales` tables.
- If the `sales` table is large, the join operation can be computationally expensive and slow down the query.
- The `WHERE` clause, which filters the books by the `publication_date` column, can also be a potential bottleneck.

### Optimization

```sql
CREATE INDEX idx_sales_book_id ON sales (book_id);
CREATE INDEX idx_books_publication_date ON books (publication_date);
```

- Create an index on the `book_id` column in the `sales` table to improve the performance of the join.
- Create an index on the `publication_date` column in the `books` table to improve the performance of the `WHERE` clause.
