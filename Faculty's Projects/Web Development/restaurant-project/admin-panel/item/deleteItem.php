<?php

include ('items.php');
$id = $_GET['id'];
items::DeleteItem($id);

header('Location: http://localhost/Web/restaurant-project/admin-panel/item/listItems.php');

?>