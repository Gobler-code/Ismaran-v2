# Ismaran-V2

A Node.js + Express backend API for a study assistant platform. This project supports user authentication, document management, and AI-powered content generation for learning resources.

## Tech Stack

- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB with Mongoose
- **Authentication:** JWT (JSON Web Tokens)
- **AI:** Groq SDK with `llama-3.3-70b-versatile`
- **Security:** bcryptjs for password hashing, CORS support
- **Validation:** express-validator

## Key Features

- User signup and login with JWT-based authentication
- Protected document CRUD for authenticated users
- Ownership checks to prevent unauthorized access/deletion
- AI generation endpoints for:
  - Flashcards
  - Multiple-choice quizzes
  - Smart highlights
  - Vocabulary insights
- Document-level data association for study resources
- JSON-based REST API with CORS enabled

## Project Structure

```
ismaran-v2/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route logic handlers
│   │   ├── middleware/      # Auth middleware and error handling
│   │   ├── models/          # Mongoose schemas
│   │   ├── routes/          # API endpoints
│   │   └── utils/           # Utility helpers
│   ├── package.json
│   └── server.js
├── frontend/                # Frontend application (not detailed here)
└── README.md
```

## Environment Variables

Create a `.env` file inside `backend/` with the following values:

```env
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=1d
GROQ_API_KEY=your_groq_api_key
PORT=5000
```

## Installation

1. Clone the repository.
2. Install backend dependencies:
   ```bash
   cd backend
   npm install
   ```

## Running the Server

```bash
cd backend
npm start
```

For development with auto-reload:

```bash
npm run dev
```

## API Endpoints

### Authentication

- `POST /api/auth/signup` — register a new user
- `POST /api/auth/login` — authenticate and receive a JWT

### Documents

- `POST /api/documents` — create a new document
- `GET /api/documents` — get all documents for the authenticated user
- `GET /api/documents/:id` — get a single document by ID
- `DELETE /api/documents/:id` — delete a document owned by the authenticated user

### AI Generation

- `POST /api/ai/flashcards/:documentId` — generate flashcards from document content
- `POST /api/ai/quiz/:documentId` — generate multiple-choice quiz questions
- `POST /api/ai/highlights/:documentId` — generate smart highlights
- `POST /api/ai/vocab/:documentId` — generate vocabulary insights for provided terms

## Notes

- The AI endpoints use the Groq SDK and a configured model to generate structured JSON responses.
- Document routes are protected with JWT and require a valid authorization token.
- The backend is ready to connect with a frontend client in the `frontend/` folder.

## License

ISC
