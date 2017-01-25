<?php
include ('../../text-php/dbConn.php');
include ('../../text-php/Tables.php');
$id=$_GET["id"];
$sql = "SELECT * FROM `table` WHERE Table_id = '$id';";
$result = mysqli_fetch_array(mysqli_query($db, $sql));

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $Max = $_POST['Update_Max'];
    $sql = "UPDATE `table` SET 	Maximum='$Max' WHERE `table`.`Table_id` = '$id' ;";
    mysqli_query($db, $sql);
}

?>

<form method="POST">
    <input type="text" placeholder="Max" value="<?php echo $result['Maximum'] ?>" name = "Update_Max">
    <input type="submit" value="update">
</form>
