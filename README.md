

# Rule Engine with AST and Real-Time Data Processing System

## Overview
1. **Rule Engine with AST**: A dynamic rule engine application that validates user input based on rules stored in MongoDB, allowing dynamic rule creation using an Abstract Syntax Tree (AST).

---

## Application 1: Rule Engine with AST

### Objective:
To develop a 3-tier rule engine application (UI, API, Backend) that determines user eligibility based on various attributes such as age, department, salary, and experience. The system dynamically creates and manages rules using an AST.

### Features:
- **Dynamic Rule Creation**: Owners can add new rules dynamically.
- **AST Representation**: Rules are represented using an Abstract Syntax Tree (AST), supporting logical operators (AND/OR).
- **MongoDB Integration**: Rules are stored and retrieved from MongoDB for dynamic validation.
- **Form Validation**: User input is validated against the rules.

### Tech Stack:
- **Frontend**: React
- **Backend**: Express.js
- **Database**: MongoDB

### Installation & Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/Rule-Engine-Weather-Monitoring.git
   cd Rule-Engine-Weather-Monitoring/rule-engine-ast
   ```

2. **Install dependencies**:
   ```bash
   cd backend
   npm install

   cd ../frontend
   npm install
   ```

3. **Run MongoDB**:
   You can either run MongoDB locally or using Docker:
   ```bash
   docker run -d -p 27017:27017 --name rule-engine-mongo mongo:latest
   ```

4. **Start the Backend**:
   ```bash
   cd backend
   node server.js
   ```

5. **Start the Frontend**:
   ```bash
   cd frontend
   npm start
   ```

### API Endpoints:
- `POST /api/rules` - Add a new rule.
- `GET /api/rules` - Fetch all rules.
- `POST /api/user` - Submit user data for validation.

---


## Dependencies

### Application 1: Rule Engine
- Node.js
- Express
- React
- MongoDB
- Docker (optional for MongoDB)


---

