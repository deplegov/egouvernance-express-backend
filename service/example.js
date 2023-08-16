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

const getAllArticles = async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const result = await connection.execute('SELECT * FROM article');
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const getArticleDetails = async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const article_id = req.query.id;
        const result = await connection.execute(`SELECT * FROM article where id=${article_id}`);
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const getCommentaire = async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const article_id = req.query.article_id;
        const result = await connection.execute(`SELECT * FROM commentaire where article_id=${article_id}`);
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const getSoumissionAo = async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const societe_id = req.query.societe_id;
        const result = await connection.execute(`SELECT * FROM soumission_ao where societe_id=${societe_id}`);
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const getSoumissionAoDetail = async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const id = req.query.id;
        const result = await connection.execute(`SELECT * FROM soumission_ao sao join societe s in sao.societe_id=s.id join appel_d_offre
         a in a.id=sao.appel_d_offre_id where sao.id=${id}`);
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

const getAppelDOffre = async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const id = req.query.id;
        const result = await connection.execute(`SELECT * FROM critere c join appel_d_offre a in c.appel_d_offre_id=a.id where a.id=${id}`);
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = {
    getAll, getAllArticles, getArticleDetails,
    getCommentaire, getSoumissionAo, getSoumissionAoDetail, getAppelDOffre
};