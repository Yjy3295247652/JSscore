let express = require('express');
let router = express.Router();
let connection = require('../config/db')

router.get('/getContestants', function(req, res) {
	let str = req.query.callback;
	connection.query("select * from contestants", function(err, result) {
		res.send(str + "(" + JSON.stringify(result) + ")");
	})
})

router.get('/getSpeakerInfo', function(req, res) {
	let speakerId = req.query.speakerId;
	let str = req.query.callback;
	connection.query("select * from contestants where speaker_id=?", speakerId, function(err, result) {
		res.send(str + "(" + JSON.stringify(result[0]) + ")");
	})
})

router.get('/getRules', function(req, res) {
	let str = req.query.callback;
	connection.query("select * from rules", function(err, result) {
		var rules = tree(result)
		function tree(rule) {
            var map = {};
            rule.forEach(element=>map[element.rules_id] = element);
            var value = [];
            rule.forEach(element=>{
                var pid = element.rules_pid;
                var parent = map[pid];
                if(parent){
                    if(!parent.children){
                        parent.children = [];
                    }
                    parent.children.push(element)
                }else{
                    value.push(element)
                }
            });
            return value;
        }
		res.send(str + "(" + JSON.stringify(rules) + ")")
	})
})

module.exports = router;
