<?php

include('dbConn.php');

echo "<option> </option>";

$sql = "SELECT * FROM address WHERE Address_ID = ".$_GET['var'];
$result = mysqli_query($db, $sql);

while($row = mysqli_fetch_array($result)){
    $r1 = $row['ID_Address_PK'];
    $r2 = $row['City'];
    $r3 = $row['Address_ID'];
    echo "<option value='$r1' name='$r2'>" . $row['City'] . "</option>";
}

?>