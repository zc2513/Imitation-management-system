//配置require.config 基本的属性/默认路径等---

  require.config({
	baseUrl:"/asscts",
	paths:{
		//公共样式
		jquery: 		"lib/jquery/jquery-3.2.0",
		jqueryCookie: 	"lib/jquery/jquery.cookie",
		template:  		"lib/template/template",
		bootstrap: 		"lib/bootstrap/js/bootstrap",
		NProgress: 		"lib/nprogress/nprogress",
		//自定义样式
		common:  		"js/common",
		login: 			"js/login/login",
		teacherList: 	"js/teacher/teacher_list",
		teacherAdd: 	"js/teacher/add"
	},
	shim:{
		bootstrap:{
			deps:["jquery"]
		}
	}
  })
  //所有页面公共部分的引入;
  require(["common"]);