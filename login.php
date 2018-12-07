<?php
	include"public.php";
	$uname = $_GET["uname"];
	$upwd = $_GET["upwd"];
	$sql = "SELECT `name`, `pwd` FROM `users` WHERE `name`='$uname' and `pwd`='$upwd'";
	$res = mysql_query( $sql );
	$arr = mysql_fetch_array( $res );
	if( $arr ){
		echo "<script> alert('登陆成功');location.href='zhuye.html?uname=$uname;'</script>";
	}else{
		echo "<script> alert('登陆失败');location.href='login.html'; </script>";
	}
?>