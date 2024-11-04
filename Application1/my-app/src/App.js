import React, { useState, useEffect } from 'react';

// UserForm Component
function UserForm() {
  const [formData, setFormData] = useState({
    user_id: '',
    name: '',
    age: '',
    department: '',
    salary: '',
    experience: ''
  });

  const [rules, setRules] = useState([]);
  const [validationResult, setValidationResult] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Fetch rules from the backend when the component mounts
  useEffect(() => {
    async function fetchRules() {
      try {
        const response = await fetch('http://localhost:5000/api/rules');
        const result = await response.json();
        setRules(result.map(r => r.rule));  // Assuming rules are stored as { rule: "ruleString" }
      } catch (err) {
        console.error('Error fetching rules:', err);
      }
    }
    fetchRules();
  }, []);

  // Handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Validation and rule evaluation logic (same as in your original code)
  class Node {
    constructor(type, value = null, left = null, right = null) {
      this.type = type;
      this.value = value;
      this.left = left;
      this.right = right;
    }
  }

  function createRule(ruleString) {
    const tokens = ruleString.split(" ");
    if (tokens.length === 3) {
      return new Node('operand', ruleString);
    }

    let operatorIndex = tokens.indexOf('AND');
    if (operatorIndex === -1) {
      operatorIndex = tokens.indexOf('OR');
    }
    const operator = tokens[operatorIndex];
    const left = tokens.slice(0, operatorIndex).join(" ");
    const right = tokens.slice(operatorIndex + 1).join(" ");

    return new Node('operator', operator, createRule(left), createRule(right));
  }

  function evaluateRule(node, data) {
    if (node.type === 'operand') {
      const condition = node.value;
      const [field, operator, value] = condition.split(" ");
      const dataValue = data[field];
      const compareValue = isNaN(value) ? value.replace(/['"]+/g, '') : parseFloat(value);

      switch (operator) {
        case '>': return dataValue > compareValue;
        case '<': return dataValue < compareValue;
        case '=': return dataValue === compareValue;
        default: return false;
      }
    } else if (node.type === 'operator') {
      const leftResult = evaluateRule(node.left, data);
      const rightResult = evaluateRule(node.right, data);

      if (node.value === 'AND') {
        return leftResult && rightResult;
      } else if (node.value === 'OR') {
        return leftResult || rightResult;
      }
    }
    return false;
  }

  function checkDeptRulesForEmployee(employeeData, rules) {
    const department = employeeData.department;
    const deptRules = rules.filter(ruleString => ruleString.includes(`department = '${department}'`));

    if (deptRules.length === 0) {
      return true;
    }

    let allTrue = true;
    for (let rule of deptRules) {
      const ast = createRule(rule);
      const result = evaluateRule(ast, employeeData);
      if (!result) {
        allTrue = false;
        break;
      }
    }
    return allTrue;
  }

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const employeeData = {
      ...formData,
      age: parseInt(formData.age),
      salary: parseInt(formData.salary),
      experience: parseInt(formData.experience),
      department: formData.department
    };

    const validationPassed = checkDeptRulesForEmployee(employeeData, rules);
    setValidationResult(validationPassed ? 'All rules satisfied!' : 'Some rules failed!');

    try {
      const response = await fetch('http://localhost:5000/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...employeeData, validation: validationPassed })
      });

      const result = await response.json();
      if (result.success) {
        setResponseMessage(result.message);
      } else {
        setResponseMessage('Failed to submit data.');
      }
    } catch (err) {
      console.error('Error:', err);
      setResponseMessage('Error submitting data.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>User Information Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="user_id"
          placeholder="User ID"
          value={formData.user_id}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <br />
        <select name="department" onChange={handleChange} value={formData.department} style={styles.input} required>
          <option disabled selected>Department</option>
          <option value="Sales">Sales</option>
          <option value="Marketing">Marketing</option>
          <option value="Management">Management</option>
          <option value="Development">Development</option>
          <option value="HR">HR</option>
        </select>
        <br />
        <input
          type="number"
          name="salary"
          placeholder="Salary"
          value={formData.salary}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="experience"
          placeholder="Experience (Years)"
          value={formData.experience}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Execute
        </button>
      </form>

      {validationResult && <p>{validationResult}</p>}
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

// OwnerForm Component
function OwnerForm() {
  const [newRule, setNewRule] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  // Handle form change
  const handleChange = (e) => {
    setNewRule(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/rules', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ rule: newRule })
      });

      const result = await response.json();
      setResponseMessage(result.success ? 'Rule added successfully!' : 'Failed to add rule.');
    } catch (err) {
      console.error('Error adding rule:', err);
      setResponseMessage('Error adding rule.');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Owner Rule Addition Form</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          name="rule"
          placeholder="Enter a new rule"
          value={newRule}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <button type="submit" style={styles.button}>
          Add Rule
        </button>
      </form>
      {responseMessage && <p>{responseMessage}</p>}
    </div>
  );
}

// Styles
const styles = {
  container: {
    maxWidth: '400px',
    margin: '0 auto',
    padding: '20px',
    backgroundColor: '#f4f4f4',
    borderRadius: '8px',
    boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
  },
  input: {
    padding: '10px',
    marginBottom: '10px',
    borderRadius: '4px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px',
    backgroundColor: '#5cb85c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  },
};

// Main App Component
function App() {
  return (
    <div>
      <UserForm />
      <OwnerForm />
    </div>
  );
}

export default App;
