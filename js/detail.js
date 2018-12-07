//选项卡移入移出
$(".type").children("li").eq(0).bind( "mouseenter",function(){
	$(".u_list").css("display","block");
})
$("#search").bind("mouseleave",function(){
	$(".u_list").css("display","none");
})

//放大镜选项卡
$.ajax({
	type:"get",
	url:"img.json",
	async:true,
	success:function(res){
		for( var i = 0 ; i < $(".list li").length ; i++ ){
			$(".list li").eq(i).children("img").attr("src",res.src[i]);
		}
	}
});

$(".list li").bind("click",function(){
	$(".list li").css("border","1px solid white");
	$(this).css("border","1px solid darkred");
	$(".xiao").attr("src",$(this).children("img").attr("src") );
	$(".da").css("background","url("+($(this).children("img").attr("src"))+")" );
	$(".da").css("background-size","800px 800px" );
})
$(".box").hover(function(){
	$(".mask").css("display","block");
	$(".da").css("display","block");
	$(document).bind("mousemove",function(e){
		var x = e.pageX - 100 - $(".box").offset().left;
		var y = e.pageY - 100 - $(".box").offset().top;
		x = x < 0? 0 : x;
		x = x > 200? 200 : x;
		y = y < 0? 0 : y;
		y = y > 200? 200 : y;
		$(".mask").css( "left", x) ;
		$(".mask").css( "top", y) ;
		$(".da").css( "background-position-x", -2*x) ;
		$(".da").css( "background-position-y", -2*y) ;
	})
},function(){
	$(".mask").css("display","none");
	$(".da").css("display","none");
})

//添加购物车
$(".buy").bind("click",function(){
	alert("添加成功");
	var count = 0;
	if( localStorage.length == 0 ){
		count =1;
	}else{
		count = parseInt(JSON.parse( localStorage.list ).count) + 1
	}
	var json = {
			"name":$(".pname").html(),
			"src":$(".xiao").attr("src"),
			"price":$(".price").html(),
			"count":count
	}
	localStorage.list = JSON.stringify(json);
	tb();
})


//购物车图标
function tb(){
	if( localStorage.length == 0 ){
		$(".count").html("0");
	}else{
		$(".count").html(parseInt(JSON.parse( localStorage.list ).count));
	}
}
tb();
