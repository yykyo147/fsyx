	var flag1 = false;
	var flag2 = false;
	var flag3 = false;
	var flag4 = false;
	var str1 = 0;
	var str2 = 0;
	$(".yhm").bind("blur",function(){
		var reg = /^(13|15|18)\d{9}/;
		if( reg.test( $(".yhm").val() ) && $(".yhm").val().length==11 ){
			flag1 = true;
			$(".yhms").html("");
		}else{
			flag1 = false;
			$(".yhms").html("请填写有效的11位手机号码");
		}
	})
	$(".yzm").bind("focus",function(){
		str1 = rand(100000,999999);
		$(".yzms").html("验证码为"+str1);
		$(".yzms").css("color","black");
	}).bind("blur",function(){
		if( $(".yzm").val()==str1 ){
			flag2 = true;
			$(".yzms").html("");
		}else{
			flag2 = false;
			$(".yzms").html("输入错误");
			$(".yzms").css("color","red");
		}
	})
	$(".mm").bind("blur",function(){
		var reg = /^\w{6,16}$/;
		str2 = $(".mm").val();
		if( reg.test( $(".mm").val() ) ){
			flag3 = true;
			$(".mms").html("");
		}else{
			flag3 = false;
			$(".mms").html("6-16位字符，可使用字母、数字或符号的组合");
		}
	})
	$(".qrmm").bind("blur",function(){
		if( $(".qrmm").val()==str2 && flag3==true ){
			flag4 = true;
			$(".qrmms").html("");
		}else{
			flag4 = false;
			$(".qrmms").html("请填写确认密码");
		}
	})
	$(".sub").bind("submit",function(){
		if( flag1&&flag2&&flag3&&flag4 ){
			return true;
		}else{
			return false;
		}
	})
