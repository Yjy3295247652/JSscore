$(function() {
	// 调用获取地址栏参数的函数
	var params = getParams();
	//获取地址栏上的id
	var speakerId = params.id;
	// 发送请求获取当前参赛选手的信息
	$.ajax({
		url:'http://localhost:3004/index/getSpeakerInfo?speakerId='+speakerId,
		dataType:'jsonp',
		success:function(msg){
			console.log(msg)
			$('.speech-title').html(msg.speaker_subject);
			$('.speech-info.userName').html("演讲人员："+ msg.speaker_name);
			$('.speech-info.deptName').html("所在部门："+ msg.speaker_department);
			$('.speech-info.plance').html("已投票数："+ msg.speaker_number);
		},
		error:function(){
			console.log('请求出错了')
		}
	})
	
	// 点击展开、收起卡片
	$('.scoreStandard .jiantou').on("tap",function(){
		$('.scoreStandard').toggleClass('hot')
	})
	
	//获取地址栏参数 
	//url为空时为调用当前url地址 
	function getParams(url) {
		var theRequest = new Object();
		if (!url) {
			url = location.href;
		}
		if (url.indexOf("?") !== -1) {
			var str = url.substr(url.indexOf("?") + 1) + "&";
			var strs = str.split("&");
			for (var i = 0; i < strs.length - 1; i++) {
				var key = strs[i].substring(0, strs[i].indexOf("="));
				var val = strs[i].substring(strs[i].indexOf("=") + 1);
				theRequest[key] = val;
			}
		}
		return theRequest;
	}
	
	
	// 获取评分规则
	$.ajax({
		url:'http://localhost:3004/index/getRules',
		dataType:'jsonp',
		success:function(msg){
			console.log(msg);
			let html = '';
			msg.forEach(function(value,index){
				let text = '';
					let pic = '';
					for(var i=0;i<values.rules_score;i++){
						pic += `<div class='image-box'>
									<img src='image/star-none.png'>
								</div>`
					}
					text += `<div class='standard-info'>
								<div class='info-text'>${values.rules_desc}（${values.rules_score}分）</div>
								<div class='info-box'>
									<div class='info-image'>
										${pic}
									</div>
									<div class='info-score'>+0</div>
								</div>
							</div>`
				})
				html += `<div class='scoreStandard hot'>
							<div class='standard-title'>${value.rules_desc}（<text>0</text>/${value.rules_score}分）</div>
							<div class='standard-desc'></div>
							${text}
							<div class='jiantou'></div>
						</div>`
			})
			$('.parent').html(html)
		},
		error:function(){
			console.log("请求出错了")
		}
		
	})
})
