# HR Hiring Management Server

This is the server for the HR Hiring Management project. It's built with Express.js, MySQL, and other technologies.

## Installation

Before you start, make sure you have Node.js, npm, and MySQL installed on your machine.

1. Clone this repository:
    ```
    git clone https://github.com/yourusername/hr-hiring-management-server.git
    ```
2. Navigate into the project directory:
    ```
    cd hr-hiring-management-server
    ```
3. Install the dependencies:
    ```
    npm install
    ```

## Database Setup

To set up the MySQL database, follow these steps:

1.  Open XAMPP:
    ```
    start the Apache and MySQL then go to MySQL admin.
    ```
2. Run the following commands to create the database and tables:
    ```sql
    CREATE DATABASE hr_hiring;

    USE hr_hiring;

    CREATE TABLE positions (
      id INT AUTO_INCREMENT PRIMARY KEY,
      title VARCHAR(255) NOT NULL,
      description TEXT,
      status ENUM('open', 'closed') DEFAULT 'open'
    );

    CREATE TABLE candidates (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      position_id INT,
      FOREIGN KEY (position_id) REFERENCES positions(id)
    );

    CREATE TABLE users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      username VARCHAR(255) NOT NULL UNIQUE,
      password VARCHAR(255) NOT NULL
    );
    ```

## Usage

To start the server, run:

The server will start on [http://localhost:8080](http://localhost:8080).

## API Endpoints

The server provides the following API endpoints:

- `/api/auth`: For authentication related operations.
- `/api/positions`: For operations related to hiring positions.
- `/api/candidates`: For operations related to candidates.

All `/api/positions` and `/api/candidates` routes are protected and require a valid JWT token in the `Authorization` header.

## Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)
