<?php
/**
 * Created by PhpStorm.
 * User: iBelal
 * Date: 5/17/2016
 * Time: 11:30 PM
 */

include ('../../text-php/user.php');

$users = user::getUsersByNameAndID();

if($_SERVER['REQUEST_METHOD'] == 'POST'){
    $from_email = $_POST['from_email'];
    $to_email = $_POST['to_email'];
    $body = $_POST['body_msg'];

    $sql1 = "SELECT User_ID FROM `user` WHERE Email ='".$to_email."'";
    $result = mysqli_fetch_array(mysqli_query($db, $sql1));
    $userID = $result['User_ID'];

    $sql = "INSERT INTO notifications (`FROM`, TO_User_ID, Body) VALUES ('$from_email', '$userID', '$body');";
    mysqli_query($db, $sql);
}

?>

<form method="post">
    FROM : <input type="email" name="from_email"> <br>
    TO : <?php
            echo '<select name="to_email">';
            while($row = mysqli_fetch_array($users)){
                echo '<option>' . $row['Email'] .'</option>';
                $id = $row['User_ID'];

            }
            echo '</select>';

            ?> <br>
    Body : <textarea rows="4" cols="50" name="body_msg" maxlength="200" required></textarea> <br>

    <input type="submit" value="Send Message">
</form>
