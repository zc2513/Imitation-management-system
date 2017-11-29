define(["jquery","template"],function($,template){

	$.ajax({
		url:"/api/teacher/profile",
		type:"get",
		success:function(res){
			if(res.code==200){
				console.log(res.result);
				var html=template("settingTemp",res.result)
				$(".body .settings").html(html);
			}
		}
	})
})