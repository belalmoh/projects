<?php
include ('dbConn.php');
include ('ReservationTableDB.php');

if($_SERVER['REQUEST_METHOD']=='GET') {
    session_start();
    $ID = $_SESSION['ID'];
    echo reserve_table::user_HistoryOfReservations($ID);
}
?>