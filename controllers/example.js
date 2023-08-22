const express = require('express');
const router = express.Router();
const { getAll, getAllArticles, getArticleDetails,insertComment, login,
    getCommentaire, getSoumissionAo, getSoumissionAoDetail, getAppelDOffre,
    validate, activate } = require('../service/Example');

router.get('/', getAll);
router.get('/articles', getAllArticles);
router.get('/article', getArticleDetails);
router.get('/commentaire', getCommentaire);
router.get('/soumission_ao', getSoumissionAo);
router.get('/soumission_ao_detail', getSoumissionAoDetail);
router.get('/appel_d_offre', getAppelDOffre);
router.post('/insert_comment', insertComment);
router.post('/login', login);
router.put('/validate/:userId', validate);
router.put('/activate/:userId', activate);

module.exports = router;