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
		jqueryForm: 	"lib/jquery-form/jquery.form",
		datepicker: 	"lib/bootstrap-datepicker/js/bootstrap-datepicker",
		zhCN: 			"lib/bootstrap-datepicker/locales/bootstrap-datepicker.zh-CN.min",
		jqueryValidate: "lib/jquery-validate/jquery-validate",
		//自定义样式
		common:  		"js/common",
		login: 			"js/login/login",
		teacherList: 	"js/teacher/teacher_list",
		teacherAdd: 	"js/teacher/add",
		setting: 		"js/setting/setting"
	},
	shim:{
		bootstrap:{
			deps:["jquery"]
		},
		zhCN:{
			deps:["datepicker"]
		},
		jqueryValidate:{
			deps:["jquery"]
		}
	}
  })
  //所有页面公共部分的引入;
  require(["common"]);