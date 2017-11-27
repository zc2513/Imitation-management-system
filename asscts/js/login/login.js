


 require(["jquery","jqueryCookie"],function($){
        $("#frm").on("submit",function(){
            var fromData=$(this).serialize();
            $.ajax({
                url:"/api/login",
                type:"post",
                data:fromData,
                success:function(res){
                    if(res.code==200){
                        alert("登录成功");
                    }
               
                    $.cookie("userinfo",JSON.stringify(res.result),{path:"/"});
                    location.pathname="/";
                }
            })
            return false;
        })        
    })

