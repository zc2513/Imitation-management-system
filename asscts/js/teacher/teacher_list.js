
//点击页面获取数据,并使用模板展示出来;

define(["jquery","template","bootstrap"],function($,template){

	$.ajax({//1.---列表展示获取展示
		url:"/api/teacher",
		type:"get",
		success:function(res){
			if(res.code==200){
				var html = template("teacherListTemp",{list:res.result});
				$("#teacherData").html(html);				
			}
		}
	})
//2.---查看讲师信息数据获取展示：
	//--->需要使用给某一个存在的盒子里面的未来的一个元素添加事件
	$("#teacherData").on("click",".seeInfo",function(){//点击获取数据,展示数据
			//需要提供tc_id属性 也就是当前的用户的id值;
			var tcId=$(this).parent().attr("data-teacherId");
			$.ajax({
				url:"/api/teacher/view",
				type:"get",
				data:{
					tc_id:tcId
				},
				success:function(res){
					if(res.code==200){
						var html=template("moduleBox",res.result)
						$("#teacherTable").html(html);
						$('#teacherModal').modal('show');
					}
				}
			})
		})

//3.templata 里面 filter格式化 地区的信息：
	//方式一：
	template.defaults.imports.locationFilter=function(config){
		return config.split("|").join(" ");
	}
	//方式二：利用正则表达式和replace查找字符串替换实现
	var r= /\|/g;//--查找全局的|符号;
	template.defaults.imports.hometown=function(config){
		return config.replace( r ," ");//查找全局的|,替换成" ";
	}

//4.讲师状态的修改：依照webapi文档的提供条件修改：设置点击事件--
	var statusVal='启 用,注 销'.split(",");
	$("#teacherData").on("click",".teacherCancel",function(){
		// tc_id 与 tc_status 值获取---通过自定义属性
		var tcId=$(this).parent().attr("data-teacherId");
		var tcStatus=$(this).attr("data-teacherStatus");
		var that=this;
		$.ajax({
			url:"/api/teacher/handle",
			type:"post",
			data:{
				tc_id:tcId,
				tc_status:tcStatus
			},
			success:function(res){
				if(res.code==200){
					$(that).attr("data-teacherStatus",res.result.tc_status).text(statusVal[tcStatus]);
				}
			}
		})
	})
	return false;
})
