<?php
include ('../../text-php/dbConn.php');
include ('../../text-php/ReservationTableDB.php');
$id=$_GET["id"];
$sql = "SELECT * FROM reservation WHERE User_User_ID =" . $id;
$result = mysqli_fetch_array(mysqli_query($db, $sql));

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $FT = $_POST['update_FromTime'];
    $TT = $_POST['update_ToTime'];
    $date = $_POST['update_Date'];
    $NOP = $_POST['update_Persons'];
    $table = $_POST['update_Table'];
    $sql = "UPDATE reservation SET Time_From = '$FT' , Date_Reservation = '$date' , Time_To = '$TT' , Num_Users = '$NOP' , Table_Table_id = '$table'  WHERE `reservation`.`User_User_ID` = '$id' ;";
    mysqli_query($db, $sql);
}

?>
<form method="post">
    Time
    <br> <br>
    From: <input type="text" placeholder="FromTime" value="<?php echo $result['Time_From'] ?>" name="update_FromTime">
    To<input type="text" placeholder="ToTime" value="<?php echo $result['Time_To'] ?>" name="update_ToTime">
    <br> <br>
    Date: <input type="date" placeholder="Date" value="<?php echo $result['Date_Reservation'] ?>" name="update_Date">
    <br> <br>
    Persons: <input type="text" placeholder="Persons" value="<?php echo $result['Num_Users'] ?>" name="update_Persons">
    <br> <br>
    Table ID: <input type="text" placeholder="TableID" value="<?php echo $result['Table_Table_id'] ?>" name="update_Table">
    <br> <br>
    <input type="submit" value="Update">
</form>