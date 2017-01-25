<?php

include ('../../text-php/ReservationTableDB.php');
include ('../../text-php/dbConn.php');
echo reserve_table::SelectAllDeletedReservations();

?>