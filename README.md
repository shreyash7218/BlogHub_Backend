# BlogHub Backend

Backend API for the BlogHub platform, a full-stack blogging application built with Express.js and MySQL.

## Features

- User authentication (register, login, get current user)
- Blog post management (create, read, update, delete)
- Category management
- Search functionality

## Technologies Used

- Node.js
- Express.js
- MySQL
- Sequelize ORM
- JSON Web Tokens
- bcrypt.js for password hashing

## Setup Instructions

1. Clone the repository:
```bash
git clone <repository-url>
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example` and configure your database:
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=bloghub
JWT_SECRET=your-secret-key
CORS_ORIGIN=http://localhost:3000
```

4. Create the database in MySQL:
```sql
CREATE DATABASE bloghub;
```

5. Start the development server:
```bash
npm run dev
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Log in a user
- `GET /api/auth/me` - Get current authenticated user

### Blog Posts
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get a specific post
- `POST /api/posts` - Create a new post (authenticated)
- `PUT /api/posts/:id` - Update a post (authenticated)
- `DELETE /api/posts/:id` - Delete a post (authenticated)
- `GET /api/posts/user` - Get posts by authenticated user
- `GET /api/posts/category/:categoryId` - Get posts by category
- `GET /api/posts/search?q=query` - Search posts

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get a specific category
- `POST /api/categories` - Create a new category (authenticated)
- `PUT /api/categories/:id` - Update a category (authenticated)
- `DELETE /api/categories/:id` - Delete a category (authenticated)

## Project Structure

```
src/
├── config/
│   └── database.js    # Database configuration
├── controllers/       # Route controllers
├── middleware/        # Custom middleware
├── models/            # Sequelize models
├── routes/            # API routes
└── server.js          # Entry point
```

## How I Used AI to Build This

I used AI tools like ChatGPT to help with:

1. Planning the overall architecture and database schema
2. Generating code snippets for repetitive parts
3. Debugging issues and suggesting optimizations
4. Writing documentation and comments

The AI helped save time on boilerplate code, allowing me to focus on implementing the core business logic and ensuring code quality.