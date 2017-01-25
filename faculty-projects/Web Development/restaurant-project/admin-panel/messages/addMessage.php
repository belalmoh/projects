<?php
/**
 * Created by PhpStorm.
 * User: iBelal
 * Date: 5/17/2016
 * Time: 11:08 PM
 */

if($_SERVER['REQUEST_METHOD'] == 'POST') {
    include ('../../text-php/dbConn.php');

    $name = $_POST['name'];
    $email = $_POST['email'];
    $number = $_POST['number'];
    $msg = $_POST['message'];

    $sql = "INSERT INTO `contactmessages` (`Name`, Email, Phone, Message) VALUES ('$name', '$email', '$number', '$msg'); ";
    $result = mysqli_query($db, $sql);

    echo $result;

}

?>