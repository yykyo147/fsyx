<?php
	include"public.php";
	$uname = $_GET["uname"];
	$upwd = $_GET["upwd"];
	$sql1 ="SELECT `name` FROM `users` WHERE `name` = '$uname'";
	$row1 = mysql_query( $sql1 );
	$arr = mysql_fetch_array( $row1 );
	if( $arr ){
		echo "<script> alert('该用户名已被使用');location.href='register.html'; </script>";
	}else{
		$sql2 = "INSERT INTO `users`(`name`, `pwd`) VALUES ('$uname','$upwd')";
		$row2 = mysql_query( $sql2 );
		echo "<script> alert('注册成功');location.href='login.html';</script>";
	}
?>