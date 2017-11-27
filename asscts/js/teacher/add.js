
//讲师添加的与讲师编辑的js---


//可以根据路由参数的传入,判断是进入讲师添加还是讲师编辑列表,根据webapi的接口文档知道进入讲师添加和编辑的不同之处
//在于编辑需要传入tc_id的值,而添加不需要,所以可以判断路由参数的长度来确定需要跳入添加还是编辑页面;

define(["template","jquery"],function(template,$){
	//1.获取路由参数;
	var search=location.search;

	//2.判断路由参数的长短跳转相对应的页面;
	if(search.length>0){//跳转编辑页面
		console.log("我是编辑页面,需要ajax数据填充基本的数据");
		editTeacherInfo();
	}else{//跳转添加页面
		console.log("我是添加页面,需要自己编写信息");
		addTeacherInfo();
	}

	//2.1--编辑页面内容实现;
	function editTeacherInfo(){		
		//点击编辑--获取用户id 请求ajax服务 渲染模板：
		var tcId = search.split("=")[1];
		$.ajax({
			url:"/api/teacher/edit",
			type:"get",
			data:{
				tc_id:tcId
			},
			success:function(res){
				res.result.tc_edit="讲师编辑";
				res.result.tc_btn_val="编 辑";
 				var html=template("addTeacherTemp",res.result)
				$("#addTeacher").html(html);
				//点击编辑按钮 将修改的值传给服务器,并跳转到讲师列表
				$("#addTeacher").on("submit","#teacherFrom",function(){
					//获取需要name与值的拼接字符串  请求服务器 添加数据;
					var editStr=$(this).serialize();
					$.ajax({
						url:"/api/teacher/update",
						type:"post",
						data:editStr,
						success:function(res){
							if(res.code==200){
								alert("修改成功！");
								location.pathname="/teacher/list"
							}
						}
					})
					return false;
				})
			}
		})


	}

	//2.2--添加页面内容实现;
	function addTeacherInfo(){
		var html=template("addTeacherTemp",{});
		$("#addTeacher").html(html);

		//请求ajax,将添加的内容添加到服务器;----获取用户的输入参数的拼接,使用jquery的serialize方法获取字符串的拼接
		//--->当点击按钮的时候请求
		$("#addTeacher").on("submit","#teacherFrom",function(){
			
			var params=$(this).serialize();
 			$.ajax({
				url:"/api/teacher/add",
				type:"post",
				data:params,
				success:function(res){
					console.log(res);
					if(res.code==200){
						alert("数据添加成功!");
						location.pathname="/teacher/list";
					}					
				}
			})
			return false;
		})
	}


})