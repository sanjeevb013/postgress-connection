# Prisma PostgreSQL API

A professional Express API with Prisma ORM and PostgreSQL database connection.

## Project Structure

```
prisma-connection/
├── src/
│   ├── controllers/       # Business logic
│   │   └── userController.js
│   ├── routes/           # API routes
│   │   └── users.js
│   ├── middleware/       # Express middleware
│   │   └── errorHandler.js
│   └── app.js           # Express app configuration
├── prisma/
│   └── schema.prisma    # Database schema
├── .env                 # Environment variables (local - don't commit)
├── .env.example         # Example env file
├── .gitignore          # Git ignore rules
├── index.js            # Server entry point
├── package.json        # Dependencies
└── README.md          # This file
```

## Installation

1. Install dependencies:
```bash
npm install
```

2. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Update the `DATABASE_URL` with your PostgreSQL credentials

3. Run Prisma migrations:
```bash
npm run prisma:migrate
```

## Environment Setup

Update the `.env` file with your PostgreSQL credentials:

```env
DATABASE_URL="postgresql://postgres:YOUR_DB_PASSWORD@localhost:5432/prisma_db"
```

Replace `YOUR_DB_PASSWORD` with your actual PostgreSQL password.

## Running the Server

Development mode (with auto-reload):
```bash
npm run dev
```

Production mode:
```bash
npm start
```

## API Endpoints

### Add User (POST)
```
POST /api/users
Content-Type: application/json

{
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Get All Users (GET)
```
GET /api/users
```

### Get User by ID (GET)
```
GET /api/users/:id
```

## Prisma Commands

- `npm run prisma:generate` - Generate Prisma Client
- `npm run prisma:migrate` - Create and apply migrations
- `npm run prisma:studio` - Open Prisma Studio UI

## Database Models

- **User**: Stores user information with email and name
- **Post**: Stores posts with author relationship

## License

ISC
