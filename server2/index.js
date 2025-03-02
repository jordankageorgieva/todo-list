const express = require('express');
const cors = require('cors');
const app = express();
const port = 3001;

// Middleware to parse JSON request bodies
app.use(express.json());

// Middleware to enable CORS
app.use(cors());

app.listen(port, () => console.log(`Server is running on port ${port}`));

const data = {
    "todo_1": {
        "_id": "todo_1",
        "text": "Give dog a bath",
        "isCompleted": true
    },
    "todo_2": {
        "_id": "todo_2",
        "text": "Do laundry",
        "isCompleted": true
    },
    "todo_3": {
        "_id": "todo_3",
        "text": "Vacuum floor",
        "isCompleted": false
    },
    "todo_4": {
        "_id": "todo_4",
        "text": "Feed cat",
        "isCompleted": true
    },
    "todo_5": {
        "_id": "todo_5",
        "text": "Change light bulbs",
        "isCompleted": false
    },
    "todo_6": {
        "_id": "todo_6",
        "text": "Go to Store",
        "isCompleted": true
    },
    "todo_7": {
        "_id": "todo_7",
        "text": "Fill gas tank",
        "isCompleted": true
    },
    "todo_8": {
        "_id": "todo_8",
        "text": "Change linens",
        "isCompleted": false
    },
    "todo_9": {
        "_id": "todo_9",
        "text": "Rake leaves",
        "isCompleted": true
    },
    "1todo_0": {
        "_id": "todo_10",
        "text": "Bake Cookies",
        "isCompleted": false
    },
    "1todo_1": {
        "_id": "todo_11",
        "text": "Take nap",
        "isCompleted": true
    },
    "1todo_2": {
        "_id": "todo_12",
        "text": "Read book",
        "isCompleted": true
    },
    "1todo_3": {
        "_id": "todo_13",
        "text": "Exercise",
        "isCompleted": false
    },
    "1todo_4": {
        "_id": "todo_14",
        "text": "Give dog a bath",
        "isCompleted": false
    },
    "1todo_5": {
        "_id": "todo_15",
        "text": "Do laundry",
        "isCompleted": false
    },
    "1todo_6": {
        "_id": "todo_16",
        "text": "Vacuum floor",
        "isCompleted": false
    },
    "1todo_7": {
        "_id": "todo_17",
        "text": "Feed cat",
        "isCompleted": true
    },
    "1todo_8": {
        "_id": "todo_18",
        "text": "Change light bulbs",
        "isCompleted": false
    },
    "1todo_9": {
        "_id": "todo_19",
        "text": "Go to Store",
        "isCompleted": false
    },
    "2todo_0": {
        "_id": "todo_20",
        "text": "Fill gas tank",
        "isCompleted": false
    }
};

app.get('/data/todos', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json');
    res.status(200).json(data);
});

app.get('/data/todos/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json');
    res.status(200).json(data[req.params.id]);
});

app.put('/data/todos/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json');
    const id = req.params.id;
    console.log(`PUT request received for ID: ${id}`);
    if (!data[id]) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    data[id] = req.body;
    console.log(`Todo with ID: ${id} updated successfully`);
    res.status(200).json(data[id]);
});

app.post('/data/todos/:id', (req, res) => { 
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Origin, Content-Type, X-Auth-Token');
    const id = req.params.id;
    console.log(`POST request received for ID: ${id}`);
    if (data[id]) {
        return res.status(400).json({ error: 'Todo already exists' });
    }
    data[id] = req.body;
    console.log(`Todo with ID: ${id} created successfully`);
    res.status(201).json(data[id]);
});

app.delete('/data/todos/:id', (req, res) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Content-Type', 'application/json');
    const id = req.params.id;
    console.log(`DELETE request received for ID: ${id}`);
    if (!data[id]) {
        return res.status(404).json({ error: 'Todo not found' });
    }
    delete data[id];
    console.log(`Todo with ID: ${id} deleted successfully`);
    res.status(200).json({ message: 'Todo deleted successfully' });
});

app.use('/', (req, res) => {
    res.send('Hello from server.');
});