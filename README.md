# 📝 BlogHub Backend

Backend API for the **BlogHub** platform — a full-stack blogging application built with Express.js and MySQL.

## 💡 My Approach to Solving the Problem

To build the backend for BlogHub, I focused on creating a secure, scalable RESTful API using Node.js, Express, and MySQL. My approach was as follows:

- Defining the Data Model:
I started by designing the database schema using Sequelize ORM, including models for User, Post, and Category, with proper relationships and constraints.

- Authentication & Security:
I implemented JWT-based authentication to manage sessions securely and used bcrypt.js for password hashing. Routes were protected using middleware to restrict access to authorized users only.

- Modular Structure:
The backend was structured into clear folders — routes, controllers, models, and middleware — to separate concerns and improve readability and maintainability.

- RESTful API Design:
I followed REST principles for designing CRUD operations on posts and categories, with detailed route handling and validation logic.

- Custom Middleware:
Middleware functions were added for token validation, error handling, and request logging to keep the code clean and consistent.

- Developer Experience:
I used .env configuration for environment separation. The API was tested using Postman to ensure each route behaved as expected.



## 🚀 Features

- 🔐 User authentication (register, login, get current user)
- 📝 Blog post management (create, read, update, delete)
- 🗂️ Category management
- 🔍 Search functionality

## 🛠️ Technologies Used

- ⚙️ Node.js
- 🚂 Express.js
- 🐬 MySQL
- 🧵 Sequelize ORM
- 🔐 JSON Web Tokens (JWT)
- 🔑 bcrypt.js for password hashing

## ⚙️ Setup Instructions

1. **Clone the repository:**

   ```bash
   git clone <repository-url>
   cd backend
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**

   Create a `.env` file based on `.env.example` and add your configuration:

   ```env
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

4. **Create the database:**

   ```sql
   CREATE DATABASE bloghub;
   ```

5. **Start the development server:**

   ```bash
   npm run dev
   ```

## 📡 API Endpoints

### 🔐 Authentication

- `POST /api/auth/register` – Register a new user
- `POST /api/auth/login` – Log in a user
- `GET /api/auth/me` – Get current authenticated user

### 📝 Blog Posts

- `GET /api/posts` – Get all posts
- `GET /api/posts/:id` – Get a specific post
- `POST /api/posts` – Create a new post (authenticated)
- `PUT /api/posts/:id` – Update a post (authenticated)
- `DELETE /api/posts/:id` – Delete a post (authenticated)
- `GET /api/posts/user` – Get posts by authenticated user
- `GET /api/posts/category/:categoryId` – Get posts by category
- `GET /api/posts/search?q=query` – Search posts

### 🗂️ Categories

- `GET /api/categories` – Get all categories
- `GET /api/categories/:id` – Get a specific category
- `POST /api/categories` – Create a new category (authenticated)
- `PUT /api/categories/:id` – Update a category (authenticated)
- `DELETE /api/categories/:id` – Delete a category (authenticated)

## 📁 Project Structure

```
src/
├── config/            # Database configuration
│   └── database.js
├── controllers/       # Route controllers
├── middleware/        # Custom middleware
├── models/            # Sequelize models
├── routes/            # API routes
└── server.js          # Entry point
```

## 🎥 Demo Video

Watch a walkthrough of the BlogHub:  
👉 [Demo](https://drive.google.com/file/d/1uqzKmYOXtvmi2n7_jbkwpuTcZN0oS6Zp/view?usp=sharing)
👉 [Demo YouTube](https://youtu.be/4b6ShuIvaaQ?feature=shared)


## 🤖 How I Used AI to Build This

I used AI tools like ChatGPT to help with:

- 🧠 Planning the overall architecture and database schema
- 🧩 Generating mind maps to visualize the project structure
- 🐞 Debugging issues and suggesting optimizations
- 📝 Writing documentation and comments

The AI helped save time on boilerplate code, allowing me to focus on implementing the core business logic and ensuring code quality.
