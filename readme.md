# Agents Management System (MERN Stack)

## Overview
This project is a **MERN stack application** that allows an **admin** to:
- Register and login as an admin.
- Create and manage agents.
- Upload a CSV file with tasks.
- Distribute tasks among agents and store them in a MongoDB database.

## Features
1. **Admin User Login**
   - Admin registration and login using **JWT authentication**.
   - Secure login system with token-based authentication.
   
2. **Agent Creation & Management**
   - Admin can create agents with the following details:
     - Name
     - Email
     - Mobile Number
     - Password (securely hashed using bcrypt)

3. **Upload CSV and Distribute Lists**
   - Upload a CSV file containing:
     - First Name
     - Phone Number
     - Notes
   - Validate and process the CSV file.
   - Distribute tasks evenly among agents.
   - Store the assigned tasks in **MongoDB**.
   - Display assigned tasks per agent on the frontend.

---
## Tech Stack

### **Frontend**
- **React.js** (UI Framework)
- **Tailwind CSS** (Styling)
- **Axios** (API Requests)

### **Backend**
- **Node.js** (Runtime Environment)
- **Express.js** (Server)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **JSON Web Tokens (JWT)** (Authentication)
- **bcrypt** (Password Hashing)

---
## Installation & Setup

### **Prerequisites**
Ensure you have the following installed:
- **Node.js** (v18+)
- **MongoDB** (Locally installed or use MongoDB Atlas)
- **npm** (Comes with Node.js)

### **1. Clone the Repository**
```sh
git clone https://github.com/your-repo-url.git
cd agents-management
```

### **2. Setup Backend**
```sh
cd backend
npm install
```

#### **Configure Environment Variables**
Create a `.env` file in the `backend` folder:
```sh
PORT=5000
MONGO_URI=your-mongodb-uri
JWT_SECRET=your-secret-key
```

#### **Run the Backend Server**
```sh
npm start
```

### **3. Setup Frontend**
```sh
cd ../frontend
npm install
```

#### **Run the Frontend**
```sh
npm start
```
The app will be available at **http://localhost:3000**.

---
## API Endpoints
### **Authentication**
- `POST /api/auth/register` - Register an admin.
- `POST /api/auth/login` - Admin login.

### **Agent Management**
- `POST /api/agents/add` - Add an agent.
- `GET /api/agents` - Get all agents.

### **CSV Upload & Task Distribution**
- `POST /api/tasks/upload` - Upload CSV file and distribute tasks.
- `GET /api/tasks` - Retrieve assigned tasks.

---
## Usage Guide
1. **Register as an admin.**
2. **Log in with admin credentials.**
3. **Add agents using the dashboard.**
4. **Upload a CSV file to assign tasks.**
5. **View assigned tasks per agent.**

---
## Troubleshooting
- **MongoDB Connection Error?**
  - Ensure MongoDB is running (`mongod` or **MongoDB Atlas** configured correctly).
  - Check `MONGO_URI` in `.env`.

- **CORS Errors?**
  - Ensure CORS is enabled in `server.js`:
    ```js
    const cors = require('cors');
    app.use(cors());
    ```

- **Invalid JWT Token?**
  - Generate a new token by logging in again.

---
## Contributing
Feel free to contribute by submitting pull requests!

---
## License
This project is **open-source** and free to use.