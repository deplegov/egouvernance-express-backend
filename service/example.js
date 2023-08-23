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
        const result = await connection.execute('SELECT * FROM article', [] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
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
        const result = await connection.execute(`SELECT * FROM article where id=${article_id}`, [] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
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
        const result = await connection.execute(`SELECT * FROM commentaire where article_id=${article_id}`, [] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
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
        const result = await connection.execute(`SELECT * FROM soumission_ao where societe_id=${societe_id}`, [] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
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
         a in a.id=sao.appel_d_offre_id where sao.id=${id}`, [] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
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
        const result = await connection.execute(`SELECT * FROM critere c join appel_d_offre a in c.appel_d_offre_id=a.id where a.id=${id}`, [] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
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
      const result = await connection.execute(query, [email], { outFormat: oracledb.OUT_FORMAT_OBJECT });
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
    
        if (!user || (user && user.VALIDE==0) || (user && user.ACTIVE==0)) {
            return res.status(404).json({ message: 'User not found' });
          }
      
          const passwordMatch = await bcrypt.compare(password, user.PASSWORD);
      
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
  
      const result = await deactivateUser(userId);
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }

  async function insertUser(nom, prenom, email, password, role, type, societe_id) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
      const query = 'INSERT INTO utilisateur (id,nom,prenom,email,password,role,type,societe_id) VALUES (utilisateur_sequence.NEXTVAL, :nom, :prenom, :email, :password, :role, :type, :societe_id)';
      const bindParams = {
        nom,prenom,email,password,role,type,societe_id
      };
      const result = await connection.execute(query, bindParams, { autoCommit: true });
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

  const signup = async (req, res) => {
    try {
      const { nom,prenom,email,password,confirmPassword,role,type,societe_id } = req.body;
  
      if (password !== confirmPassword) {
        return res.status(400).json({ message: 'Veuillez confirmer le mot de passe' });
      }
  
      const hashedPassword = await bcrypt.hash(password, 10);
      await insertUser(nom,prenom,email,hashedPassword,role,type,societe_id);
  
      res.json({ message: 'User registered successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }

  async function updateUser(id, newData) {
    let connection;
    try {
      connection = await oracledb.getConnection(dbConfig);
  
      const updateQuery = `
        UPDATE utilisateur
        SET nom = :nom, prenom = :prenom, email = :email, password = :password
        , role = :role, type = :type, societe_id = :societe_id
        WHERE id = :id
      `;
  
      const bindParams = {
        id,
        nom: newData.nom,
        prenom: newData.prenom,
        email: newData.email,
        password: await bcrypt.hash(newData.password, 10),
        role: newData.role,
        type: newData.type,
        societe_id: newData.societe_id
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

  const updateUser = async (req, res) => {
    try {
      const { id } = req.params;
      const newData = req.body;

      if (newData.password !== '' && newData.password !== newData.confirmPassword) {
        return res.status(400).json({ message: 'Veuillez confirmer le mot de passe' });
      }
  
      const result = await updateUser(id, newData);
  
      res.json({ message: 'User updated successfully' });
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ message: 'An error occurred' });
    }
  }

  const nbAo = async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const filters = req.body;
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDateNow = `${year}-${month}-${day}`;
        let dt_emi_1 = '2000-01-01';
        let dt_emi_2 = formattedDateNow;
        let dt_lim_1 = '2000-01-01';
        let dt_lim_2 = formattedDateNow;
        if(filters.date_d_emission_1 && filters.date_d_emission_1 !== ''){
            dt_emi_1=filters.date_d_emission_1
        }
        if(filters.date_d_emission_2 && filters.date_d_emission_2 !== ''){
            dt_emi_2=filters.date_d_emission_2
        }
        if(filters.date_limite_1 && filters.date_limite_1 !== ''){
            dt_lim_1=filters.date_limite_1
        }
        if(filters.date_limite_2 && filters.date_limite_2 !== ''){
            dt_lim_2=filters.date_limite_2
        }
        const result = await connection.execute(`SELECT count(*) as nb FROM appel_d_offre a where (a.date_d_emission>TO_DATE('${dt_emi_1}', 'YYYY-MM-DD')
        and a.date_d_emission<TO_DATE('${dt_emi_2}', 'YYYY-MM-DD')) or (a.date_limite>TO_DATE('${dt_lim_1}', 'YYYY-MM-DD')
        and a.date_limite<TO_DATE('${dt_lim_2}', 'YYYY-MM-DD'))`,
         [] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}
const nbSoumission = async (req, res) => {
    try {
        const connection = await oracledb.getConnection(dbConfig);
        const filters = req.body;
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = (currentDate.getMonth() + 1).toString().padStart(2, '0'); // Adding 1 because months are zero-based
        const day = currentDate.getDate().toString().padStart(2, '0');
        const formattedDateNow = `${year}-${month}-${day}`;
        let dt_soum_1 = '2000-01-01';
        let dt_soum_2 = formattedDateNow;
        if(filters.date_soumission_1 && filters.date_soumission_1 !== ''){
            dt_soum_1=filters.date_soumission_1
        }
        if(filters.date_soumission_2 && filters.date_soumission_2 !== ''){
            dt_soum_2=filters.date_soumission_2
        }
        let request = `SELECT count(*) as nb FROM soumission_ao a where (a.date_soumission>TO_DATE('${dt_soum_1}', 'YYYY-MM-DD')
        and a.date_soumission<TO_DATE('${dt_soum_2}', 'YYYY-MM-DD'))`
        if(filters.statut && filters.statut !== ''){
            request=request + ` and a.statut='${filters.statut}'`
        }
        const result = await connection.execute(request,
         [] ,{ outFormat: oracledb.OUT_FORMAT_OBJECT });
        await connection.close();
        res.json(result.rows);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred' });
    }
}

module.exports = {
    getAll, getAllArticles, getArticleDetails, login, validate, activate, deactivate,
    nbSoumission, nbAo, updateUser, getCommentaire, signup, getSoumissionAo, getSoumissionAoDetail, getAppelDOffre, insertComment
};