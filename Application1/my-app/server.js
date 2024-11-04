const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Employee_data', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((err) => {
  console.error("Error connecting to MongoDB:", err);
});

// Define a Schema for user data
const userSchema = new mongoose.Schema({
  user_id: String,
  name: String,
  age: Number,
  department: String,
  salary: Number,
  experience: Number
}, { collection: 'Data' });

// Create a Model from the schema
const User = mongoose.model('User', userSchema);

// Define a Schema for rules
const ruleSchema = new mongoose.Schema({
  rule: String
}, { collection: 'Rules' });

// Create a Model for rules
const Rule = mongoose.model('Rule', ruleSchema);

// API endpoint to receive and save data to MongoDB
app.post('/api/user', async (req, res) => {
    const { user_id, name, age, department, salary, experience, validation } = req.body;
  
    try {
      const newUser = new User({ user_id, name, age, department, salary, experience, validation });
      await newUser.save();
  
      res.json({ success: true, message: "Data and validation result saved successfully!" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: "Failed to save data." });
    }
  });
// API endpoint to fetch all users from MongoDB
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch users." });
  }
});
// API endpoint to get all rules from MongoDB
app.get('/api/rules', async (req, res) => {
  try {
    const rules = await Rule.find();
    res.json(rules);
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to fetch rules." });
  }
});

// API endpoint to add a new rule to MongoDB
app.post('/api/rules', async (req, res) => {
  const { rule } = req.body;

  try {
    const newRule = new Rule({ rule });
    await newRule.save();
    res.json({ success: true, message: "Rule added successfully!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Failed to add rule." });
  }
});

// Start the server
const port = 5000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
