const getConnection = require('../database/connection');

const getAll = async (req, res) => {
    try {
        // Establish a connection to the database
        const connection = getConnection();
        // Execute a simple query
        const result = await connection.execute('SELECT * FROM employees');
        // Release the connection
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = {
    getAll
};