let express = require('express');
let router = express.Router();
let category = require('./admin/category');


router.get('/',function (req, res) {
    res.render('login',{data:'hello admin'});
});


router.use('/category',category)

module.exports = router;
