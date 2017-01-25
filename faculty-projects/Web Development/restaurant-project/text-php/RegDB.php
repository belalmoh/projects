<?php

if(($_SERVER['REQUEST_METHOD'] == 'POST')) {
    include('dbConn.php');
    include ('user.php');
    $fname = $_POST['first_name'];
    $lname = $_POST['last_name'];
    $mob = $_POST['mob_num'];
    $email = $_POST['email_reg'];
    $address = $_POST['address_list'];
    $pass = $_POST['password'];
    

    $firstUser = new user($fname, $lname, $email, $pass, $address , $mob);
    $lastId = $firstUser->ListIDS($db);
    $lastId +=1;
    $firstUser->addUser();
    mysqli_query($db, $firstUser->setUserPrivilege(7, $lastId));

    
    header('Location: http://localhost/Web/restaurant-project/');
}

?>


