const express = require('express');
const router = express.Router();
const { getBooks, 
        getBook, 
        createBook, 
        updateBook, 
        deleteBook, 
        deleteCopy 
    } = require('../controllers/bookController');

router.get('/', getBooks);
router.post('/', createBook);
router.get('/:id', getBook);
router.put('/:id', updateBook);
router.delete('/:id', deleteBook);
router.delete('/:id/copy', deleteCopy); 

module.exports = router;