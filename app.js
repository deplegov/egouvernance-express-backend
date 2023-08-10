require('dotenv').config();
// const express = require('express');
// const app = express();
// const port = process.env.PORT || 80;

// app.get('/', (req, res) => res.send('Hello World!'));

// app.listen(port, () => console.log(`App running on port ${port}!`));
const express = require('express');
const oracledb = require('oracledb');

const app = express();
const PORT = process.env.PORT || 3000;

// Oracle database connection configuration
const dbConfig = {
    user: 'anjess',
    password: 'anja1161',
    connectString: 'localhost:1521/orcl'
};

app.get('/', async (req, res) => {
    try {
        // Establish a connection to the database
        const connection = await oracledb.getConnection(dbConfig);

        // Execute a simple query
        const result = await connection.execute('SELECT * FROM employees');
        // Release the connection
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});