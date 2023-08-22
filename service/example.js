const getConnection = require('../database/connection');
const bcrypt = require('bcrypt');

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

const insertComment = async (req,res) => {
    try {
        const { contenu, utilisateur_id, article_id } = req.body;
        const connection = await oracledb.getConnection(dbConfig);
        const insertQuery = `INSERT INTO commentaire (contenu, utilisateur_id, article_id) VALUES (:contenu, :utilisateur_id, :article_id)`;
        const bindParams = {
          contenu,
          utilisateur_id,
          article_id
        };
    
        const result = await connection.execute(insertQuery, bindParams, { autoCommit: true });
    
        await connection.close();
    
        res.json({ message: 'Row inserted successfully', inserted: result });
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
      }
}

async function getUserByEmail(email) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      const query = 'SELECT * FROM utilisateur WHERE email = :email';
      const result = await connection.execute(query, [email]);
      return result.rows[0];
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          console.error('Error closing connection:', error);
        }
      }
    }
  }

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        const user = await getUserByEmail(email);
    
        if (!user || (user && user.valide==0) || (user && user.active==0)) {
          return res.status(404).json({ message: 'Utilisateur introuvable' });
        }
    
        const passwordMatch = await bcrypt.compare(password, user.password);
    
        if (passwordMatch) {
          res.json({ message: 'Login successful' });
        } else {
          res.status(401).json({ message: 'Mot de passe incorrect' });
        }
      } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'An error occurred' });
      }
}

async function validateUser(userId) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
  
      const updateQuery = `
        UPDATE utilisateur
        SET valide=1
        WHERE id = :userId
      `;
  
      const bindParams = {
        userId
      };
  
      const result = await connection.execute(updateQuery, bindParams, { autoCommit: true });
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          console.error('Error closing connection:', error);
        }
      }
    }
  }

const validate = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const result = await validateUser(userId);
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }

  async function activateUser(userId) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
  
      const updateQuery = `
        UPDATE utilisateur
        SET active=1
        WHERE id = :userId
      `;
  
      const bindParams = {
        userId
      };
  
      const result = await connection.execute(updateQuery, bindParams, { autoCommit: true });
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          console.error('Error closing connection:', error);
        }
      }
    }
  }

  const activate = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const result = await activateUser(userId);
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }

  async function deactivateUser(userId) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
  
      const updateQuery = `
        UPDATE utilisateur
        SET active=0
        WHERE id = :userId
      `;
  
      const bindParams = {
        userId
      };
  
      const result = await connection.execute(updateQuery, bindParams, { autoCommit: true });
      return result;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    } finally {
      if (connection) {
        try {
          await connection.close();
        } catch (error) {
          console.error('Error closing connection:', error);
        }
      }
    }
  }

  const deactivate = async (req, res) => {
    try {
      const { userId } = req.params;
  
      const result = await activateUser(userId);
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }

module.exports = {
    getAll, getAllArticles, getArticleDetails, login, validate, activate,
    getCommentaire, getSoumissionAo, getSoumissionAoDetail, getAppelDOffre, insertComment
};