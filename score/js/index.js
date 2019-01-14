$(function() {
	getContestants();
	// 打开侧拉列表
	$('.mui-icon.mui-action-menu.mui-icon-bars.mui-pull-left').on('tap', function() {
		mui('.mui-off-canvas-wrap').offCanvas().show();
	})
	// 切换页面（首页/ 排名/ 评分记录）
	$('.mui-navigate-right.choose').on("tap", function() {
		let title = this.innerHTML;
		if (title == "首页") {
			$('#index').css({
				'display': 'block'
			});
			$('#ranking').css({
				'display': 'none'
			});
			$('#record').css({
				'display': 'none'
			});
		} else if (title == "排名") {
			$('#index').css({
				'display': 'none'
			});
			$('#ranking').css({
				'display': 'block'
			});
			$('#record').css({
				'display': 'none'
			});
		} else if (title == "评分记录") {
			$('#index').css({
				'display': 'none'
			});
			$('#ranking').css({
				'display': 'none'
			});
			$('#record').css({
				'display': 'block'
			});
		}
		$('h1.mui-title').html(title);
		mui('.mui-off-canvas-wrap').offCanvas().close();
	})

	// 获取参赛人员的信息
	function getContestants() {
		let html = '';
		$.ajax({
			url: 'http://localhost:3004/index/getContestants',
			dataType: "jsonp",
			//请求成功处理，和本地回调完全一样
			success: function(msg) {
				console.log(msg);
				for (var i = 0; i < msg.length; i++) {
					html += "<p id='" + i + "'>" + msg[i]['speaker_name'] + "</p>"
				}
				$('.mui-collapse-content.xiala').html(html);
				// 选择某一个参赛人员
				$('.mui-collapse-content.xiala').on("tap",'p',function(){
					let manInfo = msg[this.id];
					console.log(manInfo)
					$('.mui-navigate-right.chooseMan').html(manInfo.speaker_name);
					$('.hidden-speakerId').attr({'value':manInfo.speaker_id});
					$('.speech-show.speech-title').html(manInfo.speaker_subject);
					$('.speech-show.speech-department').html(manInfo.speaker_department);
					$('.speech-show.speech-number').html(manInfo.speaker_number);
					$('.mui-table-view-cell.mui-collapse.liShow').removeClass('mui-active');
				})
			},
			//请求出错处理
			error: function() {
				alert("请求出错啦")
			}
		})
	}
	
	// 点击按钮去评分
	$('.navigator').on('tap',function(){
		let speakerId = $('.hidden-speakerId').attr("value")
		if(speakerId){
			url = 'http://127.0.0.1:8849/score/score.html?id=' + speakerId
			$(location).attr('href', url);
		}else{
			alert("请选择要评分的参赛人员")
		}
		
	})
})
