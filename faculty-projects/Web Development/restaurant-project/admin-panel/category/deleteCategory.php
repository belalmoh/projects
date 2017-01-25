<?php

include ('item_category.php');
$id = $_GET['id'];
item_category::DeleteCategory($id);

header('Location: http://localhost/Web/restaurant-project/admin-panel/category/listCategory.php');

?>