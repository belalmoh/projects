
<?php
include ('../../text-php/dbConn.php');
include ('../../text-php/Tables.php');

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $Max = $_POST['add_table'];
    Tables::addtables($Max);
}

?>


<form method="POST">
    <input type="text" placeholder="Max"  name = "add_table">
    <input type="submit" value="Add">
</form>