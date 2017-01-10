<?php
include ('dbConn.php');

if($_SERVER['REQUEST_METHOD']=='POST'){

    $email = $_POST['email'];
    $pass = $_POST['password'];

    $sql = "SELECT * FROM user WHERE Email = '" . $email . "' AND Password = '" . $pass . "';";
    $result = mysqli_query($db, $sql);

    $myUserName = mysqli_fetch_array($result);
    echo "Hello " . $myUserName['FirstName'] . "<br> <br>";
    session_start();
    $_SESSION['Name'] = $myUserName['FirstName'];
    $_SESSION['ID'] = $myUserName['User_ID'];

    $innerQuery = "SELECT Page_ID FROM user_type_page WHERE User_User_ID = " . $myUserName['User_ID'] . "";
    $sql = "SELECT Physical_Address FROM page WHERE Page_ID IN($innerQuery);";



    $result = mysqli_query($db, $sql);
    $myPage = mysqli_fetch_array($result);


    header('Location: http://localhost/Web/restaurant-project/' . $myPage['Physical_Address'] . ' ');
    
}

?>
	