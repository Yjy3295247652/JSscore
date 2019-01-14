let express = require('express');
let router = express.Router();


router.get('/',function (req, res) {
    res.render('category',{data:'hello category'});
});


module.exports = router;
