<?php

include ('../../text-php/ReservationTableDB.php');
$id = $_GET['id'];
reserve_table::DeleteReservation($id);

?>