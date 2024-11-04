# User Form with Dynamic Rule Validation
This application allows users to fill out a form with dynamically validated fields. The owner can add rules to validate user form entries, which are stored in a MongoDB database. 

## Prerequisites
- Node.js (v14+)
- MongoDB (v4.4+)

## Dependencies (Install using npm)
- Express
- Mongoose
- CORS
- Body-parser


 Create a Dockerfile for both backend and frontend, and a docker-compose.yml to run the containers together.
 docker-compose up --build

 Install the dependencies and start the server.
cd backend
npm install
node server.js

cd frontend
npm install
npm start

#Instructions

- Start the backend server: `node server.js`
- Start the frontend server: `npm start`
- Open the application in a browser at `http://localhost:3000`.
- To add a new rule as an owner, navigate to the Owner section and submit the rule.

#Design Choice

- Frontend: React for dynamic form rendering and user interaction.
- Backend: Express for handling RESTful APIs and MongoDB integration.
- Rule validation: Rules are stored in MongoDB and evaluated using an Abstract Syntax Tree (AST) structure to support complex conditions.
