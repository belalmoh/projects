<?php

include ('../../text-php/Tables.php');
$id = $_GET['id'];
Tables::DeleteTable($id);

?>