<?php

include('../../text-php/dbConn.php');

$sql = "SELECT COUNT(Report_Order_ID) FROM report_order;";
$result = mysqli_query($db, $sql);

$sql2 = "SELECT COUNT(Report_Reservations_ID) FROM report_reservations;";
$result2 = mysqli_query($db , $sql2);


while($row = mysqli_fetch_array($result)){
    echo "Number of orders are : " . $row['COUNT(Report_Order_ID)'].'<br>';
}

while($row1 = mysqli_fetch_array($result2)){
    echo "Number of Reservations are : " . $row1['COUNT(Report_Reservations_ID)'];
}



?>

