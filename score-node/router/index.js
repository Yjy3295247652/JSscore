let express = require('express');
let router = express.Router();
let connection = require('../config/db')

// 获取全部参赛人员信息
router.get('/getContestants', function(req, res) {
	let str = req.query.callback;
	connection.query("select * from contestants", function(err, result) {
		res.send(str + "(" + JSON.stringify(result) + ")");
	})
})

// 根据参赛人员ID获取对应的参赛人员信息
router.get('/getSpeakerInfo', function(req, res) {
	let speakerId = req.query.speakerId;
	let str = req.query.callback;
	connection.query("select * from contestants where speaker_id=?", speakerId, function(err, result) {
		res.send(str + "(" + JSON.stringify(result[0]) + ")");
	})
})

// 获取比赛规则
router.get('/getRules', function(req, res) {
	let str = req.query.callback;
	connection.query("select * from rules", function(err, result) {
		var rules = tree(result)

		function tree(rule) {
			var map = {};
			rule.forEach(element => map[element.rules_id] = element);
			var value = [];
			rule.forEach(element => {
				var pid = element.rules_pid;
				var parent = map[pid];
				if (parent) {
					if (!parent.children) {
						parent.children = [];
					}
					parent.children.push(element)
				} else {
					value.push(element)
				}
			});
			return value;
		}
		res.send(str + "(" + JSON.stringify(rules) + ")")
	})
})

// 对参赛人员进行打分
router.get('/score', function(req, res) {
	let str = req.query.callback;
	let speakerId = req.query.speakerId;
	let score = req.query.score.split(";");
	let total = new Number();
	let arr = new Array();
	let average = new Number();
	let sql = "insert into score (`cid`,`whole`, `content`, `skill`, `manner`, `effect`, `total_score`) values (" +
		speakerId + ",";
	score.forEach(function(value, index) {
		sql += value.split(':')[1] * 1 + ',';
		total += value.split(':')[1] * 1;
	})
	sql = sql + total + ")"
	connection.query(sql, function(err, result1) {
		if (result1.affectedRows == 1) {
			connection.query("select * from score where cid=?", speakerId, function(err, result) {

				result.forEach(function(value, index) {
					arr.push(value.total_score);
				})
				if(arr.length > 2){
					var max = arr[0];
					var min = arr[0];
					var sum = 0;
					for (var i = 0; i < arr.length; i++) {
						sum += arr[i];
						max = max < arr[i] ? arr[i] : max;
						min = min > arr[i] ? arr[i] : min;
					}
					average = ((sum - max - min) / (arr.length - 2)).toFixed(3) * 1
					connection.query("update contestants set speaker_average=?,speaker_number=? where speaker_id=?",[average,arr.length,speakerId],function(error,results){
						if(results.affectedRows == 1){
							res.send(str + "(" + JSON.stringify({"msg":"success"}) + ")");
						}else{
							res.send(str + "(" + JSON.stringify({"msg": "fail"}) + ")");
						}
					})
				}else{
					connection.query("update contestants set speaker_average=?,speaker_number=? where speaker_id=?",[0,arr.length,speakerId],function(error,results){
						if(results.affectedRows == 1){
							res.send(str + "(" + JSON.stringify({"msg":"success"}) + ")");
						}else{
							res.send(str + "(" + JSON.stringify({"msg": "fail"}) + ")");
						}
					})
				}
			})
		} else {
			res.send(str + "(" + JSON.stringify({"msg": "fail"}) + ")");
		}
	})
})

// 获取排名
router.get('/getRanking',function(req,res){
	let str = req.query.callback;
	connection.query("select * from contestants order by speaker_average desc",function(err,result){
		res.send(str + "(" + JSON.stringify(result) + ")")
	})
})


module.exports = router;
