//选项卡移入移出
$(".type").children("li").eq(0).bind( "mouseenter",function(){
	$(".u_list").css("display","block");
})
$("#search").bind("mouseleave",function(){
	$(".u_list").css("display","none");
})

//动态创建
if(localStorage.length != 0){
	var str = "";
	for( var i = 0 ; i < localStorage.length ; i++ ){
		str += `<li>
					<div class="left">
						<input type="checkbox" class="qx" checked="checked"/>
						<img src=${JSON.parse(localStorage.list).src} />
					</div>
					<div class="right">
						<p>${JSON.parse(localStorage.list).pname}</p>
						<p>7</p>
						<p>颜色:金色</p>
						<p>套装:官方标配</p>
					</div>
				</li>
				<li>${JSON.parse(localStorage.list).price}</li>
				<li><div class="jian">-</div><input type="text" value="1" class="count"><div class="jia">+</div></li>
				<li>--</li>
				<li class="xj">${parseInt(JSON.parse(localStorage.list).price)*JSON.parse(localStorage.list).count}</li>
				<li class="rm">删除</li>`
	}
	$(".shen").html(str);
	$(".zj").html( $(".xj").html() );
	$(".count").val( JSON.parse(localStorage.list).count );
}
//计算
function js(){
		$(".xj").html( parseInt(JSON.parse(localStorage.list).price)* parseInt($(".count").val()) );
		$(".zj").html( $(".xj").html() );
}

//加减操作
$(".jia").bind("click",function(){
	$(".count").val( parseInt($(".count").val())+1 );
	js();
})
$(".jian").bind("click",function(){
	if( parseInt ( $(".count").val() )==1 ){
		return;
	}
	$(".count").val( parseInt($(".count").val())-1 );
	js();
})

//删除操作
$(".rm").bind("click",function(){
	$(".shen").html("");
	localStorage.clear();
})
