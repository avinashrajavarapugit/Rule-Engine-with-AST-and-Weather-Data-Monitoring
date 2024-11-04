class Node {
    constructor(type, value = null, left = null, right = null) {
        this.type = type; // 'operator' or 'operand'
        this.value = value; // condition for operand nodes (e.g., 'age > 30')
        this.left = left; // left child (for operator nodes)
        this.right = right; // right child (for operator nodes)
    }
}

function createRule(ruleString) {
    // This function parses simple rule strings and constructs the AST.
    const tokens = ruleString.split(" ");

    if (tokens.length === 3) {
        // It's an operand node (e.g., 'age > 30')
        return new Node('operand', ruleString);
    }

    // It's an operator node (e.g., 'age > 30 AND department = Sales')
    let operatorIndex = tokens.indexOf('AND');
    if (operatorIndex === -1) {
        operatorIndex = tokens.indexOf('OR');
    }
    const operator = tokens[operatorIndex];

    // Split the rule into left and right conditions
    const left = tokens.slice(0, operatorIndex).join(" ");
    const right = tokens.slice(operatorIndex + 1).join(" ");

    return new Node('operator', operator, createRule(left), createRule(right));
}

function evaluateRule(node, data) {
    if (node.type === 'operand') {
        // Evaluate the condition against the data
        const condition = node.value;
        const [field, operator, value] = condition.split(" ");

        // Convert values for comparison
        const dataValue = data[field];
        const compareValue = isNaN(value) ? value.replace(/['"]+/g, '') : parseFloat(value);

        // Handle different operators
        switch (operator) {
            case '>': return dataValue > compareValue;
            case '<': return dataValue < compareValue;
            case '=': return dataValue === compareValue;
            default: return false;
        }
    } else if (node.type === 'operator') {
        // Evaluate left and right nodes recursively
        const leftResult = evaluateRule(node.left, data);
        const rightResult = evaluateRule(node.right, data);

        // Handle AND/OR logic
        if (node.value === 'AND') {
            return leftResult && rightResult;
        } else if (node.value === 'OR') {
            return leftResult || rightResult;
        }
    }
    return false;
}

function combineRules(rules) {
    // Combines rules into a single AST using AND/OR logic
    let combinedNode = null;

    rules.forEach((ruleString, index) => {
        const newNode = createRule(ruleString);
        if (combinedNode === null) {
            combinedNode = newNode;
        } else {
            combinedNode = new Node('operator', 'AND', combinedNode, newNode); // Example using AND
        }
    });

    return combinedNode;
}

// New function to check all rules with a specific department
function checkDeptRulesForEmployee(employeeData, rules) {
    // Extract the employee's department
    console.log(employeeData)
    const department = employeeData.department;

    // Filter rules that involve the employee's department
    const deptRules = rules.filter(ruleString => ruleString.includes(`department = '${department}'`));

    // If no rules found for the department, return true (no constraints)
    if (deptRules.length === 0) {
        console.log(`No rules found for department: ${department}`);
        return true;
    }

    // Evaluate all department-specific rules
    let allTrue = true;
    for (let rule of deptRules) {
        const ast = createRule(rule);  // Parse the rule into AST
        const result = evaluateRule(ast, employeeData);  // Evaluate the rule against the employee data
        
        if (!result) {
            allTrue = false;  // If any rule fails, mark allTrue as false
            break;
        }
    }

    // Print true if all rules pass, otherwise false
    console.log(`All rules satisfied for department '${department}':`, allTrue);
    return allTrue;
}

const employee1 = { age: 45, department: 'Marketing', salary: 6000000, experience: 7 };

// Sample rules
const rules = [
    "age > 30 AND department = 'Sales'",
    "age < 25 AND department = 'Marketing'",
    "experience > 5 AND salary > 60000",
    "department = 'Sales' AND experience > 5",
    "department = 'HR' AND age > 40 AND experience > 10",
    "department = 'Sales' AND salary > 90000"
];

// Check rules for employee1 (Sales department)
checkDeptRulesForEmployee(employee1, rules);  // Will check if employee1 satisfies all Sales-related rules
