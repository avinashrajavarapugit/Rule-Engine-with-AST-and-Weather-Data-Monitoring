

# Rule Engine with AST and Real-Time Data Processing System for Weather Monitoring with Rollups and Aggregates

## Overview
This repository contains two distinct applications developed as part of the assignment:
1. **Rule Engine with AST**: A dynamic rule engine application that validates user input based on rules stored in MongoDB, allowing dynamic rule creation using an Abstract Syntax Tree (AST).
2. **Real-Time Weather Monitoring System**: A weather data monitoring system that processes real-time data from the OpenWeatherMap API, calculates daily rollups and aggregates, and sends email alerts for high temperatures.

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

## Application 2: Real-Time Data Processing System for Weather Monitoring with Rollups and Aggregates

### Objective:
This application monitors weather conditions in real time from the OpenWeatherMap API for various cities and provides summarized insights, including daily rollups (average, min, max temperatures) and alerts based on user-defined thresholds.

### Features:
- **Real-time Weather Data**: Fetches weather data for Indian metro cities (Delhi, Mumbai, etc.) at regular intervals.
- **Alerts**: Sends email alerts when the temperature exceeds a certain threshold for consecutive updates.
- **Daily Rollups**: Calculates average, max, and min temperatures, and determines the dominant weather condition.
- **Data Visualization**: Displays daily temperature trends using Matplotlib.

### Tech Stack:
- **Programming Language**: Python
- **APIs**: OpenWeatherMap API
- **Email Notifications**: smtplib

### Installation & Setup
1. **Clone the repository**:
   ```bash
   git clone https://github.com/yourusername/Rule-Engine-Weather-Monitoring.git
   cd Rule-Engine-Weather-Monitoring/weather-monitoring
   ```

2. **Install dependencies**:
   ```bash
   pip install -r requirements.txt
   ```

3. **Get OpenWeatherMap API Key**:
   Sign up at [OpenWeatherMap](https://openweathermap.org/) and get your API key.

4. **Configure Email**:
   Update the email credentials in the script for sending email alerts.

5. **Run the Application**:
   ```bash
   python weather_monitor.py
   ```

### Configuration:
- **Weather Monitoring Interval**: Set the frequency of API calls (default is every 5 minutes).
- **Alert Threshold**: Set a threshold temperature (e.g., 35°C) for email alerts.

---

## Design Choices

### Rule Engine with AST:
- **AST Design**: The Abstract Syntax Tree allows for flexibility in creating complex rules with logical operators such as AND/OR. Each rule is parsed into a tree structure and stored in MongoDB for easy retrieval and dynamic validation.
- **MongoDB**: Chosen for its flexibility in storing dynamic rule sets and application metadata.
- **React Frontend**: Provides a dynamic UI for users to enter form data and for owners to add rules.

### Weather Monitoring System:
- **OpenWeatherMap API**: Provides accurate real-time weather data.
- **Email Alerts**: Uses smtplib for simple email notifications when temperature thresholds are breached.
- **Matplotlib**: Used for visualizing daily weather summaries, including temperature trends over time.

---

## Dependencies

### Application 1: Rule Engine
- Node.js
- Express
- React
- MongoDB
- Docker (optional for MongoDB)

### Application 2: Weather Monitoring
- Python 3.8+
- `requests`
- `matplotlib`
- `smtplib`
- OpenWeatherMap API Key

---

