const express = require('express');
const router = express.Router();
const { getAll, getAllArticles, getArticleDetails,
    getCommentaire, getSoumissionAo } = require('../service/Example');

router.get('/', getAll);
router.get('/articles', getAllArticles);
router.get('/article', getArticleDetails);
router.get('/commentaire', getCommentaire);
router.get('/soumission_ao', getSoumissionAo);

module.exports = router;