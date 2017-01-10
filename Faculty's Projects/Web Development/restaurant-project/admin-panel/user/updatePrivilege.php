<?php
/**
 * Created by PhpStorm.
 * User: iBelal
 * Date: 5/13/2016
 * Time: 2:55 PM
 */

include ('../../text-php/dbConn.php');

if($_SERVER['REQUEST_METHOD'] == 'GET'){
    $page = $_GET['page'];
    $user = $_GET['user'];
    

    $sql = "UPDATE `user_type_page` SET `Page_ID` = '$page' WHERE `user_type_page`.`User_User_ID` = '$user'";
    mysqli_query($db, $sql);
}

?>