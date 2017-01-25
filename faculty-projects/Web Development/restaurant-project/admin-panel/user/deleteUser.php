<?php

include ('../../text-php/user.php');
$id = $_GET['id'];
user::DeleteUser($id);

//echo $sql;
//header('Location: http://cuisine.net23.net/restaurant-project/admin-panel/listUsers.php');

?>
