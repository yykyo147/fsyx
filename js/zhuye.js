//轮播图
window.onload = function(){
	var index = 0;
	var timer = setInterval( Autoplay , 4000 );
	function Autoplay(){
		$(".banner>img").eq(index).siblings().not("div").fadeOut( 1000 );
		$(".banner>img").eq(index).fadeIn( 1000 );
		$(".banner>div").eq(index).siblings().not("img").css("background","white");
		$(".banner>div").eq(index).css("background","red");
		index++;
		if( index==3 ){
			index=0;
		}
	}
	$(".banner>div").bind("click",function(){
		index = $(this).index()-3;
		console.log(index)
		Autoplay();
	})
	$(".banner").hover(function(){
		clearInterval(timer);
	},function(){
		timer = setInterval( Autoplay , 4000 );
	})
	//地区选择
	$(".l_l a").bind("click",function(){
		$(".location>span").html( $(this).html() );
	})
	$(".l_r a").bind("click",function(){
		$(".location>span").html( $(this).html() );
	})
	//main 1移入移出
	$(".one_middle>div").hover(function(){
		$(this).children("div").animate({"height":"60px"},300);
	},function(){
		$(this).children("div").animate({"height":"0px"},300);
	})
	//main 2方框移入移出
	$(".main_two_b2").hover(function(){
		$(this).children(".main_two_b3").animate({"width":"70px"},200);
		$(this).children(".main_two_b4").css("color","white");
	},function(){
		$(this).children(".main_two_b3").animate({"width":"0px"},200);
		$(this).children(".main_two_b4").css("color","red");
	})
	
	//main 3选项卡
	$(".main_thr_a1 li").hover(function(){
		$(".main_thr_a1 li").siblings().css( "background","#D6D5D5" ).css( "color","black" );
		$(this).css( "background","darkred" );
		$(this).css( "color","white" );
		$(".l1").css("display","none");
		$(".l1").eq( $(this).index() ).css( "display","block" );
	},function(){
	})
	
	//main 3移入移出
	$(".main_thr_a2>div").hover(function(){
		$(this).children(".main_thr_a3").animate({"top":"0px"},200);
	},function(){
		$(this).children(".main_thr_a3").animate({"top":"130px"},200);
	})
	
	//main 5选项卡
	$(".main_five_l li").bind("click",function(){
		$(".main_five_l li").css("border-bottom","none");
		$(this).css("border-bottom","2px solid white");
		$(".main_five_l").children(".main_five_left").css("display","none");
		$(".main_five_l").children(".main_five_left").eq( $(this).index() ).css("display","block");
	})
	
	//main 6选项卡
	$(".main_six_right li").bind("click",function(){
		$(".main_six_right li").css("border-bottom","none");
		$(this).css("border-bottom","2px solid white");
		$(".main_six_right_r").css("display","none");
		$(".main_six_right_r").eq( $(this).index() ).css("display","block");
	})
	
	//吸顶效果
	$(window).bind("scroll",function(){
		if( $(document).scrollTop() > 700 ){
			$(".xiding").css("display","block");
			$(".louti").css("display","block");
		}else{
			$(".xiding").css("display","none");
			$(".louti").css("display","none");
		}
	})
	
	$(".louti li").bind( "click",function(){
		switch( $(this).index() ){
			case 0:$(document).scrollTop(600);break;
			case 1:$(document).scrollTop(1150);break;
			case 2:$(document).scrollTop(1300);break;
			case 3:$(document).scrollTop(1950);break;
			case 4:$(document).scrollTop(2800);break;
			case 5:$(document).scrollTop(3200);break;
			case 6:$(document).scrollTop(3850);break;
			case 7:$(document).scrollTop(4500);break;
			case 8:$(document).scrollTop(5200);break;
			case 9:$(document).scrollTop(0);break;
		}
	} )
}

