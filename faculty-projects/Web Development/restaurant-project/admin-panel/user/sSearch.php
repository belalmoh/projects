<?php
/**
 * Created by PhpStorm.
 * User: iBelal
 * Date: 5/10/2016
 * Time: 9:10 AM
 */


if($_SERVER['REQUEST_METHOD'] == 'GET'){

    include ('../../text-php/user.php');

    echo user::getSpecificUser($_GET['id'], $_GET['email']);


}

?>