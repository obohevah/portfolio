<?php

$server_name = "localhost";
$db_username = "webmastcom_comments";
$db_password = "xqeL5k$=vo?v";
$db_name = "webmastcom_commentsdb";

$con = mysqli_connect($server_name, $db_username, $db_password, $db_name);

if($con){
  // echo "Database connected";
}else{
  echo "Database not connect: Error =".mysqli_connect_error();
}



?>