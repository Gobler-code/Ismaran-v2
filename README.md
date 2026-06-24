# Ismaran V2 - AI-Powered Study Assistant Platform

<div align="center">

<img src="landing/Ismaran-landing/src/assets/ismaran.png" alt="Ismaran Logo" width="120" />

**Transform any document into a complete study session - instantly.**

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Visit%20App-6366f1?style=for-the-badge&logo=vercel)](https://ismaran-landing.vercel.app/)
[![GitHub](https://img.shields.io/badge/GitHub-Gobler--code-181717?style=for-the-badge&logo=github)](https://github.com/Gobler-code/Ismaran-v2)
[![React](https://img.shields.io/badge/React-19.x-61DAFB?style=for-the-badge&logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-Build%20Tool-646CFF?style=for-the-badge&logo=vite)](https://vitejs.dev/)

</div>

A comprehensive, full-stack study assistant platform that leverages AI to generate personalized learning materials from documents. Ismaran helps students and educators create flashcards, quizzes, vocabulary lists, and highlighted summaries with intelligent content generation.

![Status](https://img.shields.io/badge/status-production-green)
![License](https://img.shields.io/badge/license-ISC-blue)
![Node](https://img.shields.io/badge/node-%3E%3D14-brightgreen)

---

## 🎯 Overview

Ismaran V2 is a modern web application designed to revolutionize how students study and retain information. Upload documents (PDFs, Word files, or plain text), and leverage AI-powered features to automatically generate:

- **Flashcards** - Interactive study cards with AI-generated content
- **Quizzes** - Multiple-choice assessments for self-evaluation
- **Vocabulary Tools** - Key term extraction and definitions
- **Highlight Manager** - Smart highlighting and summarization
- **Document Vault** - Organized personal document library

The platform features a responsive web interface, a landing page, and a robust REST API backend.

---


<video src="https://github.com/user-attachments/assets/13007139-a0f1-4032-a593-ff0000db4bfb" width="100%" controls>
</video>



## ✨ Key Features

### 🔐 Authentication & Security
- User registration and secure login with JWT-based authentication
- Password hashing with bcryptjs
- Protected routes and document ownership verification
- CORS-enabled for secure cross-origin requests

### 📖 Document Management
- Upload and store documents (supports PDF, DOCX, TXT)
- Document CRUD operations with full access control
- Organize documents in personal vault
- Document-level data association for all study materials

### 🤖 AI-Powered Content Generation
- **Flashcard Generator** - Creates study cards from document content
- **Quiz Generator** - Generates multiple-choice questions for assessment
- **Vocabulary Extractor** - Identifies and explains key terms
- **Smart Highlighter** - Highlights important sections and creates summaries
- Powered by Groq SDK with `llama-3.3-70b-versatile` model

### 💻 User Interface
- Modern, responsive web application with Tailwind CSS
- Beautiful landing page with feature showcase
- Interactive study tools with real-time feedback
- Dark mode support with context-based theming
- Document text editor with live processing

### 📱 Cross-Platform Compatibility
- Desktop and mobile responsive design
- Progressive web app capabilities
- Deployed and accessible from anywhere

---

## 🛠 Tech Stack

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js (v5.2.1)
- **Database:** MongoDB with Mongoose (v9.6.3)
- **Authentication:** JWT (jsonwebtoken v9.0.3)
- **Security:** bcryptjs (v3.0.3)
- **Validation:** express-validator (v7.3.2)
- **AI Integration:** Groq SDK (v1.2.1)
- **Environment:** dotenv (v17.4.2)

### Frontend
- **Framework:** React 19 with Vite
- **Styling:** Tailwind CSS v4.3
- **Routing:** React Router v7
- **HTTP Client:** Axios
- **Document Processing:** 
  - Mammoth (DOCX parsing)
  - PDF.js (PDF rendering)
  - Tesseract.js (OCR support)
- **Development:** ESLint, Tailwind CLI

### Landing Page
- **Framework:** React with TypeScript
- **Build Tool:** Vite
- **UI Components:** Radix UI + shadcn/ui components
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **State Management:** TanStack React Query
- **Form Handling:** React Hook Form

---

## 📁 Project Structure

```
ismaran-v2/
│
├── backend/                          # Node.js/Express API Server
│   ├── src/
│   │   ├── controllers/             # Business logic for routes
│   │   │   ├── aiController.js      # AI content generation logic
│   │   │   ├── authController.js    # Authentication handlers
│   │   │   └── documentController.js # Document CRUD operations
│   │   ├── middleware/
│   │   │   └── authMiddleware.js    # JWT verification
│   │   ├── models/                  # MongoDB Schemas
│   │   │   ├── User.js
│   │   │   ├── Document.js
│   │   │   ├── Flashcard.js
│   │   │   ├── Quiz.js
│   │   │   ├── Highlight.js
│   │   │   └── Vocab.js
│   │   ├── routes/                  # API Endpoints
│   │   │   ├── authRoutes.js        # Auth endpoints
│   │   │   ├── documentRoutes.js    # Document endpoints
│   │   │   └── aiRoutes.js          # AI generation endpoints
│   │   └── utils/                   # Helper utilities
│   ├── package.json
│   ├── server.js                    # Server entry point
│   └── .env                         # Environment variables
│
├── frontend/                         # React Web Application
│   ├── src/
│   │   ├── components/
│   │   │   ├── LeftSection/         # Document and vocab management
│   │   │   │   ├── LeftSection.jsx
│   │   │   │   ├── EditableDocument.jsx
│   │   │   │   ├── VocabManager.jsx
│   │   │   │   ├── VocabSelection.jsx
│   │   │   │   └── useFileProcessor.js
│   │   │   ├── RightSection/        # Study tools
│   │   │   │   ├── RightSection.jsx
│   │   │   │   ├── FlashcardTool.jsx
│   │   │   │   ├── QuizTool.jsx
│   │   │   │   ├── HighlightTool.jsx
│   │   │   │   └── VocabTool.jsx
│   │   │   └── ProtectedRoute.jsx   # Route protection
│   │   ├── pages/
│   │   │   ├── Login.jsx
│   │   │   ├── Signup.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Tools.jsx
│   │   ├── services/                # API service calls
│   │   ├── context/
│   │   │   └── ThemeContext.jsx     # Theme management
│   │   ├── assets/                  # Images and static files
│   │   ├── App.jsx                  # Main app component
│   │   ├── main.jsx                 # React entry point
│   │   ├── index.css
│   │   └── App.css
│   ├── public/
│   ├── package.json
│   ├── vite.config.js
│   ├── tailwind.config.cjs
│   └── .env
│
├── landing/                         # Marketing Landing Page
│   └── Ismaran-landing/
│       ├── src/
│       │   ├── components/
│       │   │   ├── landing/         # Landing page sections
│       │   │   │   ├── Hero.tsx
│       │   │   │   ├── Flashcards.tsx
│       │   │   │   ├── Quiz.tsx
│       │   │   │   ├── Highlighter.tsx
│       │   │   │   ├── Vocab.tsx
│       │   │   │   ├── Nav.tsx
│       │   │   │   ├── Logo.tsx
│       │   │   │   ├── Footer.tsx
│       │   │   │   ├── Pencil.tsx
│       │   │   │   └── SignInButton.tsx
│       │   │   └── ui/              # Shadcn UI components
│       │   ├── hooks/
│       │   ├── lib/
│       │   ├── assets/
│       │   ├── App.tsx
│       │   ├── main.tsx
│       │   └── styles.css
│       ├── package.json
│       ├── vite.config.ts
│       ├── tsconfig.json
│       └── tailwind.config.cjs
│
└── README.md                        # This file
```

---

## 📋 Prerequisites

Before getting started, ensure you have the following installed:

- **Node.js** (v14 or higher)
- **npm** (v6 or higher) or **yarn**
- **MongoDB** (v5.0 or higher)
  - Either locally installed or a MongoDB Atlas account (cloud)
- **Git** for version control
- **Groq API Key** for AI features (sign up at [Groq Console](https://console.groq.com))

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/ismaran-v2.git
cd ismaran-v2
```

### 2. Backend Setup

```bash
cd backend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables (see below)
# Edit .env with your values
nano .env
```

### 3. Frontend Setup

```bash
cd ../frontend

# Install dependencies
npm install

# Create .env file
cp .env.example .env

# Configure environment variables
nano .env
```

### 4. Landing Page Setup (Optional)

```bash
cd ../landing/Ismaran-landing

# Install dependencies
npm install

# Create .env file if needed
cp .env.example .env
```

---

## 🔧 Environment Configuration

### Backend (.env)

Create a `.env` file in the `backend/` directory:

```env
# MongoDB Connection
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/ismaran_v2

# Server Configuration
PORT=5000
NODE_ENV=development

# JWT Authentication
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
JWT_EXPIRE=7d

# Groq AI API
GROQ_API_KEY=your_groq_api_key_here

# CORS Settings (for frontend)
CLIENT_URL=http://localhost:5173
```

**Finding Your Credentials:**
- **MongoDB URI:** Get from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **Groq API Key:** Get from [Groq Console](https://console.groq.com)
- **JWT Secret:** Generate a strong random string

### Frontend (.env)

Create a `.env` file in the `frontend/` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### Landing Page (.env)

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 💻 Running the Application

### Development Mode

#### Terminal 1 - Start Backend Server

```bash
cd backend
npm run dev
```

The backend will start on `http://localhost:5000`

#### Terminal 2 - Start Frontend Development Server

```bash
cd frontend
npm run dev
```

The frontend will start on `http://localhost:5173`

#### Terminal 3 - Start Landing Page (Optional)

```bash
cd landing/Ismaran-landing
npm run dev
```

The landing page will start on a local Vite port (usually `http://localhost:5174`)

### Production Build

#### Build Frontend

```bash
cd frontend
npm run build
```

Output goes to `frontend/dist/`

#### Build Landing Page

```bash
cd landing/Ismaran-landing
npm run build
```

#### Start Backend Server (Production)

```bash
cd backend
npm start
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Register User
```http
POST /auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

#### Login User
```http
POST /auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securePassword123"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "_id": "...",
    "email": "user@example.com"
  }
}
```

### Document Management Endpoints

#### Get All Documents
```http
GET /documents
Authorization: Bearer {token}
```

#### Upload Document
```http
POST /documents
Authorization: Bearer {token}
Content-Type: application/json

{
  "title": "My Study Material",
  "content": "Document content here...",
  "fileType": "pdf" | "docx" | "txt"
}
```

#### Get Document by ID
```http
GET /documents/{documentId}
Authorization: Bearer {token}
```

#### Update Document
```http
PUT /documents/{documentId}
Authorization: Bearer {token}

{
  "title": "Updated Title",
  "content": "Updated content..."
}
```

#### Delete Document
```http
DELETE /documents/{documentId}
Authorization: Bearer {token}
```

### AI Generation Endpoints

All AI endpoints require authentication and a valid document.

#### Generate Flashcards
```http
POST /ai/flashcards
Authorization: Bearer {token}
Content-Type: application/json

{
  "documentId": "...",
  "numberOfCards": 10
}
```

#### Generate Quiz
```http
POST /ai/quiz
Authorization: Bearer {token}

{
  "documentId": "...",
  "numberOfQuestions": 5
}
```

#### Generate Highlights
```http
POST /ai/highlights
Authorization: Bearer {token}

{
  "documentId": "..."
}
```

#### Extract Vocabulary
```http
POST /ai/vocabulary
Authorization: Bearer {token}

{
  "documentId": "..."
}
```

---

## 🎓 Features in Detail

### Document Upload & Processing
- Supports multiple file formats (PDF, DOCX, TXT)
- Automatic text extraction with OCR support for scanned documents
- Real-time document preview and editing
- Document organization in personal vault

### Flashcard System
- AI-generated flashcards from document content
- Customizable number of cards
- Interactive study interface
- Progress tracking

### Quiz Generator
- AI-powered multiple-choice questions
- Automatic answer validation
- Score tracking
- Performance analytics

### Vocabulary Tool
- Automatic key term extraction
- AI-generated definitions
- Searchable vocabulary list
- Export functionality

### Highlight Tool
- Smart highlighting of important sections
- AI-generated summaries
- Custom color coding
- Note-taking capabilities

---

## 🔒 Security Features

- **JWT Authentication:** Secure token-based user sessions
- **Password Hashing:** bcryptjs for secure password storage
- **Ownership Verification:** Users can only access their own documents
- **CORS Protection:** Configured CORS headers
- **Input Validation:** express-validator for request validation
- **Environment Variables:** Sensitive data stored in .env files

---

## 📦 Dependencies

### Production Dependencies
- express (Web framework)
- mongoose (Database ODM)
- jsonwebtoken (Authentication)
- bcryptjs (Password hashing)
- groq-sdk (AI integration)
- cors (Cross-origin support)
- dotenv (Environment management)

### Development Dependencies
- nodemon (Auto-restart server)
- vite (Frontend bundler)
- tailwindcss (CSS framework)
- eslint (Code linting)

---

## 🤝 Contributing

We welcome contributions! To get started:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

Please ensure your code follows our style guidelines and includes appropriate tests.

---

## 📝 License

This project is licensed under the ISC License. See the LICENSE file for details.

---

## 🤖 AI Model

This project uses the **Groq API** with the `llama-3.3-70b-versatile` model for content generation. The model is optimized for:
- Quick content generation
- Educational material creation
- Question and answer formulation
- Text summarization and highlighting
- Vocabulary extraction

---

## 🆘 Troubleshooting

### MongoDB Connection Issues
- Verify your MongoDB URI is correct
- Check that MongoDB is running (if local)
- Ensure your IP is whitelisted in MongoDB Atlas
- Verify your username and password

### API 500 Errors
- Check server console for error messages
- Verify all environment variables are set
- Ensure MongoDB is connected
- Check Groq API key validity

### Frontend Not Loading
- Verify backend is running on port 5000
- Check browser console for CORS errors
- Verify `VITE_API_URL` environment variable
- Clear browser cache and try again

### Groq API Rate Limiting
- The free tier has rate limits
- Consider upgrading Groq API plan for production
- Implement request queuing if needed

---

## 📞 Support & Contact

For issues, questions, or suggestions:
- Open an issue on GitHub
- Contact the development team
- Check existing documentation

---

## 🎉 Acknowledgments

- Built with modern web technologies
- Powered by Groq API for intelligent content generation
- Styled with Tailwind CSS for beautiful UI
- Database by MongoDB
- Special thanks to all contributors

---

**Last Updated:** June 2026
**Status:** Production Ready ✅
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
