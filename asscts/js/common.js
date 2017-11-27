
require(["jquery",
	"template",
	"NProgress",
	"jqueryCookie"],function($,
							 template,
							 NProgress){

//4.页面加载齿轮的使用--- 所有的ajax发起请求的的时候齿轮动画,ajax执行完成后将齿轮隐藏;
    // $(".loading").hide();
    //ajax全局请求监听--开始和结束事件监听：
    $( document ).ajaxStart(function(){
   		$(".loading").show();	
   		NProgress.start();
    });
    $( document ).ajaxStop(function(){
    	$(".loading").fadeOut();
    	NProgress.done();
    })	

//1.获取服务器给的phpsessid 有则正常,没有则让登录！
	var sessionId=$.cookie("PHPSESSID");//$需引入jquery.js与jquery.cookie.js的文件;
	if (!sessionId && location.pathname!="/login"){
		location.pathname="/login";
	}

//2.用户名和用户信息的获取;
if(location.pathname!="/login"){//如果不在首页的时候再去获取模板赋值--否则会报模板错误
	var userinfo=$.cookie("userinfo");
	userinfo=JSON.parse(userinfo||"{}");
	var html=template("usertemp",userinfo);
	$("#userprofile").html(html);
}


//3.退出登录操作--点击退出,删除cookie的phpsessid；
	$("#userOut").on("click",function(){
		$.ajax({
			url:"/api/logout",
			type:"post",
			success:function(res){
				console.log(res);
				if(res.code==200){					
					location.pathname="/login"	
				}	

			}
		})
	})



})




	


