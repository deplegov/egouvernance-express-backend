const express = require('express');
const router = express.Router();
const { getAll, getAllArticles, getArticleDetails,
    getCommentaire, getSoumissionAo, getSoumissionAoDetail, getAppelDOffre } = require('../service/Example');

router.get('/', getAll);
router.get('/articles', getAllArticles);
router.get('/article', getArticleDetails);
router.get('/commentaire', getCommentaire);
router.get('/soumission_ao', getSoumissionAo);
router.get('/soumission_ao_detail', getSoumissionAoDetail);
router.get('/appel_d_offre', getAppelDOffre);

module.exports = router;