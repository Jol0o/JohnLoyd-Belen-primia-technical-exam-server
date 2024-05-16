# HR Hiring Management Server

This is the server for the HR Hiring Management project. It's built with Express.js and other technologies.

## Installation

Before you start, make sure you have Node.js and npm installed on your machine.

1. Clone this repository:
    ```
    git clone https://github.com/yourusername/hr-hiring-management-server.git
    ```
2. Navigate into the project directory:
    ```
    cd JohnLoyd-Belen-primia-technical-exam-server
    ```
3. Install the dependencies:
    ```
    npm install
    ```
4. Run the server
    ```
    npm run dev
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
