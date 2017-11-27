<?php 
header("Content-type:text/html;charset=utf-8");

// echo "我是入口文档<br/>";

//引入文件的方式inculde(文件的路径);

// include("./views/index/index.html");

//1.查看url地址的方式：$_SERVER ---可以拿到所有的url数据。--包括index.php都能拿到
//var_dump($_SERVER); //---可以看到index.php包含的路径,在REQUEST_URL 属性里面会将路径全部显示出来
//2.使用PATH_INFO只能拿到index.php后面的内容---如果页面的网站后面没有编写任何内容则不存在该属性
 	//-->PATH_INFO同样是$_SERVER对象的一个属性;
	//var_dump($_SERVER["PATH_INFO"]);//---此属性只会拿到index.php后面的内容;
	//***结果是使用PATH_INFO的时候不管里面有没有数据都将规划为有数据，如果没有值则会报错,
	//***所以不管有没有属性都默认给它一个index.php后面加上/
	//--**所以最终使用PATH_INFO的时候,只有三种情况是可以正常显示内容;
		//1.index.php/---也就是只有一个/,指的是index.php后面显示的内容；
		//2./后面有一个名字
		//3./后面有两个名字  或者更多

//路由的配置：根据上面三个条件
	//1.获取$_SERVER里面是否包含PATH_INFO这个方法 ---判断$_SERVER对象中是否包含PATH_INFO属性方法
	$pathInfo=array_key_exists("PATH_INFO",$_SERVER);
	//2.若果存在则获取路由信息,不存在则给一个/
	if($pathInfo){
		$path_info=$_SERVER[ "PATH_INFO" ];//---获取路径信息赋值给新的变量
	}else{
		$path_info="/";
	}
	
	//2.1将字符串前面的/切割掉,防止切割后第一个字符是空的字符串;
	$path_info = substr($path_info, 1);

	//3.分割获取到的路径信 息：用于最后的页面路径跳转的拼接
	$path_infos=explode("/",$path_info);//explode类似于js的split方法 切割字符串--形成数组
	//4.判断字符串的长度,使用strlen();若果用户没有输入数据，则切割的数组第一项为空的时候，则直接显示主页；
		//否则将获取到的路径进行拼接,最后拼接在路径信息上显示对应的内容；
	if(strlen($path_infos[0])==0){//如果数组第一项为空---显示主页
		$path="index";
		$filename="index";
	}elseif(count($path_infos)==2){//如果数组长度为2,则拼接路径，显示对应内容;
		$path=$path_infos[0];
		$filename=$path_infos[1];
	}else{//否则是数组长度为一的，也就是用户输入了一个内容显示index.php下的对应页面
		$path="index";
		$filename=$path_infos[0];
	}
	//5.拼接路径 根据用户输入的路径显示对应的内容;
	
	include("/views/".$path."/".$filename.".html");
	// echo("./views/".$path."/".$filename.".html");
 ?>
