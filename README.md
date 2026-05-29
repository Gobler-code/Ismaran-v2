# Ismaran

A Node.js Express backend application with MongoDB integration, JWT authentication, and user management.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **Security:** bcryptjs for password hashing, CORS support
- **Validation:** express-validator for input validation

## Project Structure

```
ismaran-v2/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route logic handlers
│   │   ├── models/          # MongoDB schemas
│   │   ├── routes/          # API endpoints
│   │   ├── middleware/      # Custom middleware
│   │   └── utils/           # Utility functions
│   └── package.json
├── server.js                # Main entry point
├── .env                     # Environment variables
└── README.md
```

## Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend
   npm install
   ```

3. Create a `.env` file in the root directory with:
   ```
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   ```

## Running the Server

```bash
npm start
```

For development with auto-reload:
```bash
npm run dev
```

## Features

- User authentication with JWT
- Password hashing with bcryptjs
- Input validation
- CORS enabled for cross-origin requests
- RESTful API architecture

## License

ISC
